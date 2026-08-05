/**
 * Conversa de verdade, com histórico, para conferir três coisas:
 *
 *   1. a IA lembra do que foi dito antes;
 *   2. a janela desliza como fila — o par mais antigo sai, o resto fica;
 *   3. o cache não vaza resposta de uma conversa para outra.
 *
 *   pnpm ai:conversa
 *
 * Chama a OpenAI de verdade, então custa dinheiro.
 */

import handler from '../../api/ask'
import type { AskResponse } from '../../lib/ai/types'

const MAX_HISTORICO = 20

type Mensagem = { role: 'user' | 'assistant'; content: string }

async function perguntar(pergunta: string, historico: Mensagem[]): Promise<AskResponse> {
  let corpo: Record<string, unknown> = {}
  const res = {
    setHeader: () => res,
    status: () => res,
    json(d: Record<string, unknown>) {
      corpo = d
      return res
    },
    end: () => res,
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
      history: historico.slice(-MAX_HISTORICO),
      sessionId: 'teste-conversa-0001',
      lang: 'pt',
      context: 'default',
    },
  }
  await handler(req as never, res as never)
  return corpo as unknown as AskResponse
}

const historico: Mensagem[] = []

async function turno(pergunta: string) {
  const r = await perguntar(pergunta, historico)
  historico.push(
    { role: 'user', content: pergunta },
    { role: 'assistant', content: r.answer },
  )
  // Mesma janela deslizante do componente.
  while (historico.length > MAX_HISTORICO) historico.shift()

  console.log(`\n› ${pergunta}`)
  console.log(`  ${r.answer}`)
  console.log(`  [histórico: ${historico.length}/${MAX_HISTORICO} mensagens]`)
  return r
}

console.log('═══ memória dentro da janela ═══')
await turno('Oi, meu nome é Fulano.')
await turno('Qual é a sua stack principal?')
await turno('Você lembra o meu nome?')

console.log('\n═══ referência ao turno anterior ═══')
await turno('Me fala do VamoAgendar.')
await turno('E quem é seu sócio nele?')

console.log(`\n─────────────────────────────────────────`)
console.log(`histórico final: ${historico.length} mensagens`)
console.log(`primeira guardada: "${historico[0]?.content.slice(0, 50)}..."`)
