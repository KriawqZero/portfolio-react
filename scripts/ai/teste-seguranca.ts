/**
 * Exercita cada camada de contenção do /api/ask.
 *
 *   pnpm ai:seguranca
 *
 * Nenhum caso aqui chega na OpenAI — é justamente isso que está sendo
 * verificado — então o script é gratuito e pode rodar quantas vezes quiser.
 */

import handler from '../../api/ask'

type Caso = {
  nome: string
  esperado: number
  env?: Record<string, string | undefined>
  headers?: Record<string, string>
  body?: unknown
  metodo?: string
}

const ORIGEM_PROD = 'https://www.marciliortiz.dev.br'

const corpoValido = {
  question: 'o que você já construiu?',
  history: [],
  sessionId: 'teste-seguranca-0001',
  lang: 'pt',
  context: 'default',
}

const CASOS: Caso[] = [
  {
    nome: 'método GET é recusado',
    metodo: 'GET',
    esperado: 405,
  },
  {
    nome: 'Content-Type errado é recusado',
    headers: { 'content-type': 'text/plain' },
    esperado: 415,
  },
  {
    nome: 'origem desconhecida é recusada em produção',
    env: { VERCEL_ENV: 'production' },
    headers: { origin: 'https://site-do-atacante.com' },
    esperado: 403,
  },
  {
    nome: 'sem header Origin é recusado em produção',
    env: { VERCEL_ENV: 'production' },
    headers: { origin: undefined as unknown as string },
    esperado: 403,
  },
  {
    nome: 'corpo acima de 8 KB é recusado antes do parse',
    headers: { 'content-length': '99999' },
    esperado: 413,
  },
  {
    nome: 'pergunta acima de 500 caracteres é recusada',
    body: { ...corpoValido, question: 'a'.repeat(501) },
    esperado: 400,
  },
  {
    nome: 'histórico de 20 mensagens é aceito (janela cheia)',
    body: {
      ...corpoValido,
      history: Array.from({ length: 20 }, (_, i) => ({
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: 'mensagem da conversa',
      })),
      question: 'a'.repeat(501), // barra depois, no tamanho: prova que passou pelo histórico
    },
    esperado: 400,
  },
  {
    nome: 'histórico acima de 20 mensagens é recusado',
    body: {
      ...corpoValido,
      history: Array.from({ length: 21 }, () => ({ role: 'user', content: 'oi' })),
    },
    esperado: 400,
  },
  {
    nome: 'mensagem de histórico acima de 1000 caracteres é recusada',
    body: {
      ...corpoValido,
      history: [{ role: 'assistant', content: 'a'.repeat(1001) }],
    },
    esperado: 400,
  },
  {
    nome: 'sessão inválida é recusada',
    body: { ...corpoValido, sessionId: 'x' },
    esperado: 400,
  },
  {
    nome: 'produção sem Redis configurado bloqueia (falha fechado)',
    env: { VERCEL_ENV: 'production', UPSTASH_REDIS_REST_URL: undefined, UPSTASH_REDIS_REST_TOKEN: undefined },
    headers: { origin: ORIGEM_PROD },
    esperado: 503,
  },
  {
    nome: 'produção sem Turnstile configurado bloqueia (falha fechado)',
    env: {
      VERCEL_ENV: 'production',
      UPSTASH_REDIS_REST_URL: 'https://exemplo.upstash.io',
      UPSTASH_REDIS_REST_TOKEN: 'token-de-teste',
      TURNSTILE_SECRET_KEY: undefined,
      AI_SKIP_TURNSTILE: 'true',
    },
    headers: { origin: ORIGEM_PROD },
    esperado: 503,
  },
  {
    nome: 'kill switch por variável desliga',
    env: { AI_CHAT_ENABLED: 'false' },
    esperado: 503,
  },
]

async function executar(caso: Caso): Promise<{ status: number; corpo: Record<string, unknown> }> {
  const anterior: Record<string, string | undefined> = {}
  for (const [chave, valor] of Object.entries(caso.env ?? {})) {
    anterior[chave] = process.env[chave]
    if (valor === undefined) delete process.env[chave]
    else process.env[chave] = valor
  }

  let status = 0
  let corpo: Record<string, unknown> = {}
  const res = {
    setHeader: () => res,
    status(c: number) {
      status = c
      return res
    },
    json(d: Record<string, unknown>) {
      corpo = d
      return res
    },
    end: () => res,
  }

  const headers: Record<string, string | undefined> = {
    origin: 'http://localhost:5173',
    'content-type': 'application/json',
    'content-length': '400',
    ...caso.headers,
  }
  for (const [k, v] of Object.entries(headers)) if (v === undefined) delete headers[k]

  const req = { method: caso.metodo ?? 'POST', headers, body: caso.body ?? corpoValido }

  try {
    await handler(req as never, res as never)
  } finally {
    for (const [chave, valor] of Object.entries(anterior)) {
      if (valor === undefined) delete process.env[chave]
      else process.env[chave] = valor
    }
  }

  return { status, corpo }
}

// O módulo lê variáveis na carga, então garantimos o estado inicial esperado.
process.env.AI_CHAT_ENABLED = 'true'

let falhas = 0
for (const caso of CASOS) {
  const { status, corpo } = await executar(caso)
  const ok = status === caso.esperado
  if (!ok) falhas++
  console.log(
    `${ok ? '✓' : '✗'} ${caso.nome}\n   HTTP ${status}${ok ? '' : ` (esperado ${caso.esperado})`} · ${JSON.stringify(corpo)}`,
  )
}

console.log(`\n${CASOS.length} camadas testadas · ${falhas} falha(s)`)
if (falhas > 0) process.exit(1)
