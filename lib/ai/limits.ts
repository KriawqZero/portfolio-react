/**
 * Camadas de contenção: kill switch, rate limit por sessão e IP, e o teto
 * global de gasto.
 *
 * Princípio que governa este arquivo: **falha fechado em produção**. Se o Redis
 * não responde, não existe contador confiável; sem contador confiável não
 * existe teto de gasto; sem teto de gasto a resposta correta é não gastar.
 *
 * Em desenvolvimento, sem Redis configurado, tudo passa — para não travar o
 * trabalho local. Essa exceção nunca vale quando VERCEL_ENV=production.
 */

import { createHash } from 'node:crypto'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export type Veredito =
  | { ok: true }
  | { ok: false; status: number; codigo: string; estado?: string; tentarEm?: number }

/**
 * Lido a cada chamada, não uma vez na carga do módulo: assim o comportamento
 * acompanha a configuração real e os testes conseguem exercitar cada camada
 * isoladamente.
 */
function configurado(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

let redis: Redis | null = null
function cliente(): Redis {
  if (!redis) redis = Redis.fromEnv()
  return redis
}

function numero(nome: string, padrao: number): number {
  const valor = Number(process.env[nome])
  return Number.isFinite(valor) && valor > 0 ? valor : padrao
}

/** Nunca guardamos IP em claro: a chave é um hash com segredo do servidor. */
export function chaveAnonima(valor: string): string {
  const segredo = process.env.RATE_LIMIT_HASH_SECRET ?? ''
  return createHash('sha256').update(`${valor}${segredo}`).digest('hex').slice(0, 32)
}

export function ipDaRequisicao(headers: Record<string, string | string[] | undefined>): string {
  const encaminhado = headers['x-forwarded-for']
  const bruto = Array.isArray(encaminhado) ? encaminhado[0] : encaminhado
  const real = headers['x-real-ip']
  return (bruto?.split(',')[0] ?? (typeof real === 'string' ? real : 'desconhecido')).trim()
}

// ─── Disponibilidade ──────────────────────────────────────────────────────────

/**
 * Produção sem Redis configurado é erro de configuração, não modo degradado:
 * seria exatamente o cenário em que uma conta cara acontece sem ninguém ver.
 */
export function dependenciasOk(producao: boolean): Veredito {
  if (configurado() || !producao) return { ok: true }
  return { ok: false, status: 503, codigo: 'sem_contadores', estado: 'upstream' }
}

// ─── Kill switch ──────────────────────────────────────────────────────────────

/**
 * Desligamento imediato, sem redeploy:
 *   curl -X POST "$UPSTASH_REDIS_REST_URL/set/ai:kill/1" -H "Authorization: Bearer $TOKEN"
 */
export async function desligadaNoRedis(): Promise<boolean> {
  if (!configurado()) return false
  try {
    return Boolean(await cliente().get('ai:kill'))
  } catch {
    // Redis fora do ar já é barrado por dependenciasOk; aqui não inventamos
    // um desligamento que ninguém pediu.
    return false
  }
}

// ─── Rate limit ───────────────────────────────────────────────────────────────

type Limitadores = { janela: Ratelimit; sessaoDia: Ratelimit; ipDia: Ratelimit }
let limitadoresCache: Limitadores | null = null

function limitadores(): Limitadores {
  if (!limitadoresCache) {
    const redis = cliente()
    limitadoresCache = {
      janela: new Ratelimit({
        redis,
        prefix: 'ai:rl:janela',
        analytics: false,
        limiter: Ratelimit.slidingWindow(
          numero('AI_RATE_LIMIT_REQUESTS', 8),
          `${numero('AI_RATE_LIMIT_WINDOW_SECONDS', 600)} s`,
        ),
      }),
      sessaoDia: new Ratelimit({
        redis,
        prefix: 'ai:rl:sessao-dia',
        analytics: false,
        limiter: Ratelimit.fixedWindow(numero('AI_SESSION_DAILY_LIMIT', 15), '86400 s'),
      }),
      ipDia: new Ratelimit({
        redis,
        prefix: 'ai:rl:ip-dia',
        analytics: false,
        limiter: Ratelimit.fixedWindow(numero('AI_IP_DAILY_LIMIT', 30), '86400 s'),
      }),
    }
  }
  return limitadoresCache
}

export async function dentroDoRateLimit(sessionId: string, ip: string): Promise<Veredito> {
  if (!configurado()) return { ok: true }

  const chaveSessao = chaveAnonima(sessionId)
  const chaveIp = chaveAnonima(ip)
  const { janela, sessaoDia, ipDia } = limitadores()

  try {
    const resultados = await Promise.all([
      janela.limit(chaveSessao),
      sessaoDia.limit(chaveSessao),
      ipDia.limit(chaveIp),
    ])

    const estourado = resultados.find(r => !r.success)
    if (!estourado) return { ok: true }

    return {
      ok: false,
      status: 429,
      codigo: 'muitas_perguntas',
      tentarEm: Math.max(1, Math.ceil((estourado.reset - Date.now()) / 1000)),
    }
  } catch {
    return { ok: false, status: 503, codigo: 'contador_indisponivel', estado: 'upstream' }
  }
}

// ─── Teto global de gasto ─────────────────────────────────────────────────────

function hoje(): string {
  return new Date().toISOString().slice(0, 10)
}

function mesAtual(): string {
  return new Date().toISOString().slice(0, 7)
}

/**
 * Incrementa antes de chamar a OpenAI e não devolve a cota em caso de erro.
 * É conservador de propósito: falha em laço não pode virar bypass do teto.
 */
export async function dentroDoOrcamento(): Promise<Veredito> {
  if (!configurado()) return { ok: true }

  const tetoDia = numero('AI_GLOBAL_DAILY_LIMIT', 100)
  const tetoMes = numero('AI_GLOBAL_MONTHLY_LIMIT', 1000)
  const chaveDia = `ai:orcamento:d:${hoje()}`
  const chaveMes = `ai:orcamento:m:${mesAtual()}`

  try {
    const redis = cliente()
    const [usoDia, usoMes] = await Promise.all([redis.incr(chaveDia), redis.incr(chaveMes)])

    // TTL só na criação: 48h para o diário, 40 dias para o mensal.
    if (usoDia === 1) await redis.expire(chaveDia, 172800)
    if (usoMes === 1) await redis.expire(chaveMes, 3456000)

    if (usoDia > tetoDia || usoMes > tetoMes) {
      return { ok: false, status: 503, codigo: 'orcamento_atingido', estado: 'budget' }
    }
    return { ok: true }
  } catch {
    return { ok: false, status: 503, codigo: 'orcamento_indisponivel', estado: 'upstream' }
  }
}

/** Consumo atual, usado pelo pnpm ai:stats. */
export async function consumo(): Promise<{ dia: number; mes: number } | null> {
  if (!configurado()) return null
  const redis = cliente()
  const [dia, mes] = await Promise.all([
    redis.get<number>(`ai:orcamento:d:${hoje()}`),
    redis.get<number>(`ai:orcamento:m:${mesAtual()}`),
  ])
  return { dia: dia ?? 0, mes: mes ?? 0 }
}
