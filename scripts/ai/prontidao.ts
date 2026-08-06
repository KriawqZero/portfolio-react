/**
 * Confere se a configuração da Marcilio IA está completa antes de ligar no
 * domínio público — e, opcionalmente, bate no endpoint para ver qual porta
 * responde de verdade.
 *
 *   pnpm ai:prontidao                                  # confere o ambiente atual
 *   pnpm ai:prontidao https://www.marciliortiz.dev.br  # confere também o que está no ar
 *
 * Para checar produção, traga as variáveis antes: `vercel env pull .env.local`.
 *
 * O teste remoto envia uma requisição deliberadamente sem token do Turnstile.
 * Ela é barrada antes da OpenAI, então não custa nada e não consome orçamento.
 */

import { existsSync } from 'node:fs'

/**
 * Sem isto o script acusaria tudo ausente mesmo com o `.env.local` no lugar —
 * um falso negativo que faria você procurar problema onde não há.
 */
const ENV_LOCAL = new URL('../../.env.local', import.meta.url).pathname
if (existsSync(ENV_LOCAL)) {
  process.loadEnvFile(ENV_LOCAL)
  console.log(`\nlendo variáveis de .env.local`)
}

type Item = {
  nome: string
  obrigatoria: boolean
  momento: 'servidor' | 'build'
  porque: string
}

const VARIAVEIS: Item[] = [
  { nome: 'OPENAI_API_KEY', obrigatoria: true, momento: 'servidor', porque: 'sem ela o endpoint responde "desativado"' },
  { nome: 'UPSTASH_REDIS_REST_URL', obrigatoria: true, momento: 'servidor', porque: 'sem contador não há teto de gasto' },
  { nome: 'UPSTASH_REDIS_REST_TOKEN', obrigatoria: true, momento: 'servidor', porque: 'idem' },
  { nome: 'RATE_LIMIT_HASH_SECRET', obrigatoria: true, momento: 'servidor', porque: 'sem sal o hash de IP é reversível; produção falha fechado' },
  { nome: 'TURNSTILE_SECRET_KEY', obrigatoria: true, momento: 'servidor', porque: 'sem ela nenhuma pergunta passa da verificação' },
  { nome: 'AI_CHAT_ENABLED', obrigatoria: true, momento: 'servidor', porque: 'precisa ser exatamente "true"; qualquer outro valor mantém a IA desligada' },
  { nome: 'VITE_TURNSTILE_SITE_KEY', obrigatoria: true, momento: 'build', porque: 'entra no bundle — mudar exige novo build, não só redeploy' },
  { nome: 'OPENAI_MODEL', obrigatoria: false, momento: 'servidor', porque: 'default no config.ts' },
  { nome: 'AI_REASONING_EFFORT', obrigatoria: false, momento: 'servidor', porque: 'default: low' },
  { nome: 'AI_GLOBAL_DAILY_LIMIT', obrigatoria: false, momento: 'servidor', porque: 'default: 100 perguntas/dia' },
  { nome: 'AI_GLOBAL_MONTHLY_LIMIT', obrigatoria: false, momento: 'servidor', porque: 'default: 1000 perguntas/mês' },
]

const ok = (s: string) => `\x1b[32m${s}\x1b[0m`
const alerta = (s: string) => `\x1b[33m${s}\x1b[0m`
const erro = (s: string) => `\x1b[31m${s}\x1b[0m`

let faltando = 0

console.log('\nConfiguração no ambiente atual\n')

for (const v of VARIAVEIS) {
  const valor = process.env[v.nome]
  const presente = Boolean(valor)
  // AI_CHAT_ENABLED presente mas diferente de "true" mantém a IA desligada:
  // é o erro de deploy mais silencioso da lista.
  const ligado = v.nome !== 'AI_CHAT_ENABLED' || valor === 'true'

  if (presente && ligado) {
    console.log(`  ${ok('ok')}      ${v.nome}`)
  } else if (v.obrigatoria) {
    faltando++
    const motivo = presente ? `definida como "${valor}", esperado "true"` : 'ausente'
    console.log(`  ${erro('FALTA')}   ${v.nome} — ${motivo}`)
    console.log(`          ${v.porque}`)
  } else {
    console.log(`  ${alerta('padrão')}  ${v.nome} — ${v.porque}`)
  }
}

const build = VARIAVEIS.filter(v => v.momento === 'build' && !process.env[v.nome])
if (build.length) {
  console.log(`\n  ${alerta('atenção')} ${build.map(v => v.nome).join(', ')} é lida no build.`)
  console.log('          Se você adicionou na Vercel agora, um redeploy sem novo build não resolve.')
}

const alvo = process.argv[2]

console.log(
  faltando === 0
    ? `\n${ok('Nenhuma variável obrigatória faltando neste ambiente.')}\n`
    : `\n${erro(`${faltando} variável(is) obrigatória(s) faltando neste ambiente.`)}${
        alvo ? ` ${alerta('(não diz nada sobre o site publicado — a Vercel tem as dela)')}` : ''
      }\n`,
)

// ─── Verificação remota, opcional ─────────────────────────────────────────────

if (!alvo) {
  console.log('Para checar o que está no ar: pnpm ai:prontidao https://www.marciliortiz.dev.br\n')
  process.exit(faltando === 0 ? 0 : 1)
}

const origem = new URL(alvo).origin
console.log(`Testando ${origem}/api/ask — requisição sem token, barrada antes da OpenAI.\n`)

const resposta = await fetch(`${origem}/api/ask`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origem },
  body: JSON.stringify({
    question: 'teste de prontidao',
    sessionId: '00000000-0000-4000-8000-000000000000',
    lang: 'pt',
  }),
}).catch((e: unknown) => e as Error)

if (resposta instanceof Error) {
  console.log(`  ${erro('sem resposta')} — ${resposta.message}\n`)
  process.exit(1)
}

const corpo = (await resposta.json().catch(() => ({}))) as { error?: string; state?: string }

const LEITURA: Record<string, string> = {
  verificacao_ausente: `${ok('saudável')} — as camadas anteriores passaram e o Turnstile barrou por falta de token, que é o esperado neste teste`,
  verificacao_invalida: `${ok('saudável')} — o Turnstile está ativo e recusou`,
  origem_nao_permitida: `${erro('origem recusada')} — confira config.origensPermitidas()`,
  desativado: `${alerta('IA desligada')} — AI_CHAT_ENABLED não é "true", falta OPENAI_API_KEY, ou a chave ai:kill está no Redis`,
  sem_contadores: `${erro('Redis ausente')} — as duas variáveis do Upstash não chegaram à função`,
  sem_segredo_hash: `${erro('RATE_LIMIT_HASH_SECRET ausente')} — sem sal o hash de IP é reversível`,
  verificacao_indisponivel: `${erro('Turnstile indisponível')} — falta TURNSTILE_SECRET_KEY ou a Cloudflare não respondeu`,
  orcamento_atingido: `${alerta('teto de gasto atingido')} — a IA está no fallback até virar o período`,
  muitas_perguntas: `${alerta('rate limit')} — este IP já bateu o limite`,
}

console.log(`  HTTP ${resposta.status} · ${corpo.error ?? 'sem código'}`)
console.log(`  ${LEITURA[corpo.error ?? ''] ?? `${alerta('resposta inesperada')} — ${JSON.stringify(corpo)}`}\n`)

/**
 * Quando há alvo remoto, quem manda no código de saída é o site publicado.
 * Misturar com o resultado local fazia o script imprimir "saudável" em verde e
 * sair com erro assim mesmo — porque a máquina do desenvolvedor não precisa
 * ter as credenciais de produção.
 */
const saudavel = corpo.error === 'verificacao_ausente' || corpo.error === 'verificacao_invalida'
process.exit(saudavel ? 0 : 1)
