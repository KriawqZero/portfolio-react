/**
 * Mede de onde vem o custo de uma resposta: entrada, entrada em cache, saída
 * e — o que costuma surpreender — tokens de raciocínio, cobrados como saída
 * mesmo sem aparecer no texto.
 *
 *   pnpm ai:custo ["sua pergunta"]
 *
 * Faz a mesma pergunta duas vezes de propósito: a segunda mostra quanto do
 * prompt entrou em cache.
 */

import OpenAI from 'openai'
import { config } from '../../lib/ai/config'
import { KNOWLEDGE, POLICIES } from '../../lib/ai/generated/knowledge-index'
import { montarBlocoDocumentos, montarInstrucoes } from '../../lib/ai/prompt'
import { selecionarDocumentos } from '../../lib/ai/retrieval'
import { ANSWER_JSON_SCHEMA } from '../../lib/ai/types'

const pergunta = process.argv[2] ?? 'O que você já construiu em produção?'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const documentos = selecionarDocumentos(pergunta, KNOWLEDGE, {
  maxDocumentos: config.limites.documentos,
  maxCaracteres: config.limites.caracteresContexto,
})

const instrucoes = montarInstrucoes(POLICIES, 'pt')
const blocoDocs = montarBlocoDocumentos(documentos)

console.log(`modelo: ${config.modelo} · esforço: ${config.esforco}`)
console.log(`instruções: ${instrucoes.length} chars · documentos: ${blocoDocs.length} chars`)
console.log(`selecionados: ${documentos.map(d => d.id).join(', ')}\n`)

async function medir(rodada: number) {
  const inicio = Date.now()
  const r = await client.responses.create({
    model: config.modelo,
    instructions: instrucoes,
    input: [
      { role: 'developer' as const, content: blocoDocs },
      { role: 'user' as const, content: pergunta },
    ],
    store: false,
    reasoning: { effort: config.esforco },
    max_output_tokens: config.limites.tokensSaida,
    text: {
      verbosity: 'low',
      format: {
        type: 'json_schema',
        name: 'portfolio_answer',
        strict: true,
        schema: ANSWER_JSON_SCHEMA,
      },
    },
  })

  const u = r.usage
  const entrada = u?.input_tokens ?? 0
  const cache = u?.input_tokens_details?.cached_tokens ?? 0
  const saida = u?.output_tokens ?? 0
  const raciocinio = u?.output_tokens_details?.reasoning_tokens ?? 0

  console.log(`── rodada ${rodada} · ${Date.now() - inicio}ms`)
  console.log(
    `   entrada: ${entrada} (em cache: ${cache} → ${entrada ? Math.round((cache / entrada) * 100) : 0}%)`,
  )
  console.log(`   saída:   ${saida}`)
  console.log(
    `     raciocínio: ${raciocinio}${saida ? ` (${Math.round((raciocinio / saida) * 100)}% da saída — cobrado e invisível)` : ''}`,
  )
  console.log(`     texto:      ${saida - raciocinio}`)
  return { entrada, cache, saida, raciocinio }
}

const a = await medir(1)
const b = await medir(2)

console.log(`\n── projeção para 1000 perguntas`)
console.log(`   entrada sem cache: ${(a.entrada * 1000).toLocaleString('pt-BR')} tokens`)
console.log(
  `   entrada com cache: ${((b.entrada - b.cache) * 1000).toLocaleString('pt-BR')} cheios + ${(b.cache * 1000).toLocaleString('pt-BR')} com desconto`,
)
console.log(
  `   saída: ${(b.saida * 1000).toLocaleString('pt-BR')}, sendo ${(b.raciocinio * 1000).toLocaleString('pt-BR')} de raciocínio\n`,
)
