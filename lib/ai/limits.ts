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

/**
 * Nunca guardamos IP em claro: a chave é um hash com segredo do servidor.
 *
 * O segredo não é decoração. Sem ele isto vira `sha256(ip)`, e o espaço inteiro
 * de IPv4 são 4 bilhões de entradas — qualquer um que leia o Redis reverte a
 * tabela toda em minutos e o "anônimo" deixa de existir. Por isso produção sem
 * `RATE_LIMIT_HASH_SECRET` é barrada em dependenciasOk, e não silenciosamente
 * aceita aqui.
 */
export function chaveAnonima(valor: string): string {
  const segredo = process.env.RATE_LIMIT_HASH_SECRET ?? ''
  return createHash('sha256').update(`${valor}${segredo}`).digest('hex').slice(0, 32)
}

export function segredoDeHashConfigurado(): boolean {
  return Boolean(process.env.RATE_LIMIT_HASH_SECRET)
}

export function ipDaRequisicao(headers: Record<string, string | string[] | undefined>): string {
  const encaminhado = headers['x-forwarded-for']
  const bruto = Array.isArray(encaminhado) ? encaminhado[0] : encaminhado
  const real = headers['x-real-ip']
  return (bruto?.split(',')[0] ?? (typeof real === 'string' ? real : 'desconhecido')).trim()
}

// ─── Disponibilidade ──────────────────────────────────────────────────────────

/**
 * Sem Redis não existe contador compartilhado entre as instâncias da função, e
 * portanto não existe teto de gasto próprio nem rate limit confiável. O padrão
 * é barrar: é exatamente o cenário em que uma conta cara acontece sem ninguém
 * ver.
 *
 * `AI_NO_REDIS=true` assume esse risco de propósito, para quem prefere manter o
 * teto de gasto na própria plataforma do modelo em vez de operar mais um
 * serviço. A flag precisa ser explícita porque a diferença entre "decidi operar
 * assim" e "esqueci de configurar" é grande demais para ser inferida do
 * silêncio — e quando ela está ligada, o que sobra de proteção é o Turnstile,
 * o limite em memória por instância e o teto configurado no provedor.
 */
export function semRedisPorDecisao(): boolean {
  return process.env.AI_NO_REDIS === 'true'
}

export function dependenciasOk(producao: boolean): Veredito {
  if (!producao) return { ok: true }

  if (!configurado() && !semRedisPorDecisao()) {
    return { ok: false, status: 503, codigo: 'sem_contadores', estado: 'upstream' }
  }
  // Sem sal, o hash de IP é reversível e a promessa de anonimato do resto do
  // arquivo deixa de valer. Erro de configuração, não modo degradado.
  if (!segredoDeHashConfigurado()) {
    return { ok: false, status: 503, codigo: 'sem_segredo_hash', estado: 'upstream' }
  }
  return { ok: true }
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

// ─── Uso único do token do Turnstile ──────────────────────────────────────────

/**
 * Queima o token do Turnstile na primeira vez que ele aparece.
 *
 * A Cloudflare já resgata cada token uma única vez, então isto é defesa em
 * profundidade, e vale por duas coisas que ela não cobre: fecha a janela em
 * que duas requisições com o mesmo token chegam juntas, antes de o resgate ser
 * registrado lá; e evita pagar uma ida à rede para um replay que já dá para
 * recusar aqui.
 *
 * O TTL acompanha a validade do próprio token — 300s. Guardar por mais tempo
 * seria ocupar memória para vigiar um token que já expirou sozinho.
 *
 * O token nunca é gravado em claro: a chave é o mesmo hash com segredo usado
 * para IP e sessão.
 */
export async function registrarTokenTurnstile(token: string): Promise<Veredito> {
  if (!configurado()) return { ok: true }

  try {
    const primeiroUso = await cliente().set(`ai:turnstile:${chaveAnonima(token)}`, 1, {
      nx: true,
      ex: 300,
    })
    if (primeiroUso === null) return { ok: false, status: 403, codigo: 'verificacao_repetida' }
    return { ok: true }
  } catch {
    // Mesma regra do resto do arquivo: sem contador confiável, não passa.
    return { ok: false, status: 503, codigo: 'verificacao_indisponivel', estado: 'upstream' }
  }
}

// ─── Rate limit ───────────────────────────────────────────────────────────────

/**
 * Limite de emergência para quando não há Redis.
 *
 * Vive na memória da instância da função, então não é confiável: a plataforma
 * cria instâncias novas sob carga, e cada uma começa com o contador zerado.
 * Quem quiser passar por cima consegue.
 *
 * Ainda assim vale mais que nada. Ele barra o caso comum — um laço batendo no
 * endpoint da mesma origem — que é justamente o que esvaziaria o teto de gasto
 * do provedor numa tarde. Só entra em cena com AI_NO_REDIS=true.
 */
const memoria = new Map<string, number[]>()

function dentroDoLimiteEmMemoria(chave: string, teto: number, janelaMs: number): boolean {
  const agora = Date.now()
  const recentes = (memoria.get(chave) ?? []).filter(t => agora - t < janelaMs)

  if (recentes.length >= teto) {
    memoria.set(chave, recentes)
    return false
  }

  recentes.push(agora)
  memoria.set(chave, recentes)

  // A instância pode viver horas: sem esta poda o mapa cresce com cada
  // visitante que passou por aqui e nunca mais voltou.
  if (memoria.size > 5000) {
    for (const [k, marcas] of memoria) {
      if (marcas.every(t => agora - t >= janelaMs)) memoria.delete(k)
    }
  }

  return true
}

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
  if (!configurado()) {
    if (!semRedisPorDecisao()) return { ok: true } // desenvolvimento: passa

    const janelaSegundos = numero('AI_RATE_LIMIT_WINDOW_SECONDS', 600)
    const teto = numero('AI_RATE_LIMIT_REQUESTS', 8)
    const passou =
      dentroDoLimiteEmMemoria(`s:${chaveAnonima(sessionId)}`, teto, janelaSegundos * 1000) &&
      dentroDoLimiteEmMemoria(`i:${chaveAnonima(ip)}`, teto * 2, janelaSegundos * 1000)

    return passou
      ? { ok: true }
      : { ok: false, status: 429, codigo: 'muitas_perguntas', tentarEm: janelaSegundos }
  }

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
