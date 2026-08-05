/**
 * CLI para conversar com o endpoint sem subir servidor nenhum: monta um par
 * request/response falso e chama o handler direto.
 *
 *   pnpm ai:ask "como você usa IA?"
 *   pnpm ai:ask --lang en "what have you built?"
 *
 * Serve para checar tom, custo e latência, e é a base da matriz adversarial.
 */

import handler from '../../api/ask'

type Resposta = Record<string, unknown>

async function perguntar(pergunta: string, lang: 'pt' | 'en') {
  let status = 0
  let corpo: Resposta = {}

  const res = {
    setHeader: () => res,
    status(codigo: number) {
      status = codigo
      return res
    },
    json(dados: Resposta) {
      corpo = dados
      return res
    },
    end() {
      return res
    },
  }

  const req = {
    method: 'POST',
    headers: {
      origin: 'http://localhost:5173',
      'content-type': 'application/json',
      'content-length': '400',
    },
    body: {
      question: pergunta,
      history: [],
      sessionId: 'cli-sessao-de-teste-0001',
      lang,
      context: 'default',
    },
  }

  const inicio = Date.now()
  // O handler espera os tipos da Vercel; aqui basta a superfície que ele usa.
  await handler(req as never, res as never)
  const ms = Date.now() - inicio

  console.log(`\n─── ${pergunta}`)
  console.log(`HTTP ${status} · ${ms} ms`)
  if (status !== 200) {
    console.log(corpo)
    return
  }
  console.log(`status: ${corpo.status} · contato humano: ${corpo.requiresHumanContact}`)
  console.log(`\n${corpo.answer}\n`)
  const fontes = corpo.sources as Array<{ label: string; href: string | null }>
  if (fontes.length) console.log(`fontes: ${fontes.map(f => f.label).join(' · ')}`)
  const seguintes = corpo.followUps as string[]
  if (seguintes.length) console.log(`sugestões: ${seguintes.join(' | ')}`)
}

const args = process.argv.slice(2)
const lang = args[0] === '--lang' ? (args[1] as 'pt' | 'en') : 'pt'
const pergunta = (args[0] === '--lang' ? args.slice(2) : args).join(' ')

if (!pergunta) {
  console.error('Uso: pnpm ai:ask [--lang en] "sua pergunta"')
  process.exit(1)
}

await perguntar(pergunta, lang)
