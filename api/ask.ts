/**
 * POST /api/ask — a única peça server-side da seção "Marcilio IA".
 *
 * Ordem deliberada: tudo que é barato roda antes do que custa dinheiro.
 * Nesta fatia ainda não existem Turnstile, Redis nem teto global de gasto —
 * por isso ela só deve viver em preview, com AI_CHAT_ENABLED controlando.
 */

import { createHash } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

import { config } from '../lib/ai/config'
import { KNOWLEDGE, POLICIES } from '../lib/ai/generated/knowledge-index'
import { montarBlocoDocumentos, montarInstrucoes } from '../lib/ai/prompt'
import { selecionarDocumentos } from '../lib/ai/retrieval'
import { ANSWER_JSON_SCHEMA } from '../lib/ai/types'
import { validarResposta } from '../lib/ai/validate-answer'
import { origemPermitida, validarCorpo } from '../lib/ai/validate-request'

function erro(res: VercelResponse, status: number, codigo: string, estado?: string) {
  return res.status(status).json({ error: codigo, ...(estado ? { state: estado } : {}) })
}

function identificadorAnonimo(sessionId: string): string {
  const segredo = process.env.RATE_LIMIT_HASH_SECRET ?? ''
  return createHash('sha256').update(`${sessionId}${segredo}`).digest('hex').slice(0, 32)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origem = req.headers.origin
  const permitida = origemPermitida(origem, config.origensPermitidas(), !config.producao)

  if (permitida && origem) {
    res.setHeader('Access-Control-Allow-Origin', origem)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return erro(res, 405, 'metodo_nao_permitido')
  if (!req.headers['content-type']?.includes('application/json')) {
    return erro(res, 415, 'tipo_nao_suportado')
  }
  if (!permitida) return erro(res, 403, 'origem_nao_permitida')

  const tamanho = Number(req.headers['content-length'] ?? 0)
  if (tamanho > config.limites.bytesCorpo) return erro(res, 413, 'corpo_grande')

  const validacao = validarCorpo(req.body, {
    caracteresMensagem: config.limites.caracteresMensagem,
    mensagensHistorico: config.limites.mensagensHistorico,
  })
  if (!validacao.ok) return erro(res, validacao.status, validacao.erro)

  if (!config.habilitado) return erro(res, 503, 'desativado', 'disabled')
  if (!process.env.OPENAI_API_KEY) return erro(res, 503, 'sem_credencial', 'disabled')

  const { question, history, sessionId, lang, context } = validacao.dados

  const documentos = selecionarDocumentos(question, KNOWLEDGE, {
    maxDocumentos: config.limites.documentos,
    maxCaracteres: config.limites.caracteresContexto,
    contexto: context,
  })

  const inicio = Date.now()

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const resposta = await client.responses.create(
      {
        model: config.modelo,
        instructions: montarInstrucoes(POLICIES, lang),
        input: [
          ...(history ?? []).map(m => ({ role: m.role, content: m.content })),
          { role: 'developer' as const, content: montarBlocoDocumentos(documentos) },
          { role: 'user' as const, content: question },
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
        safety_identifier: identificadorAnonimo(sessionId),
      },
      { timeout: config.limites.timeoutMs },
    )

    let bruto: unknown = null
    try {
      bruto = JSON.parse(resposta.output_text)
    } catch {
      bruto = null
    }

    const validada = validarResposta(bruto, documentos, {
      caracteresResposta: config.limites.caracteresResposta,
    })

    // Log operacional: sem pergunta, sem resposta, sem contexto — só o que
    // serve para diagnosticar custo e relevância.
    console.log(
      JSON.stringify({
        evento: 'ask',
        status: validada.status,
        modelo: config.modelo,
        docs: documentos.map(d => d.id),
        tokensEntrada: resposta.usage?.input_tokens ?? null,
        tokensSaida: resposta.usage?.output_tokens ?? null,
        latenciaMs: Date.now() - inicio,
        lang,
      }),
    )

    return res.status(200).json(validada)
  } catch (e) {
    const nome = e instanceof Error ? e.name : 'desconhecido'
    const timeout = nome === 'APIUserAbortError' || nome === 'AbortError' || nome === 'TimeoutError'

    console.error(
      JSON.stringify({
        evento: 'ask_erro',
        tipo: nome,
        latenciaMs: Date.now() - inicio,
      }),
    )

    return timeout
      ? erro(res, 504, 'tempo_esgotado', 'upstream')
      : erro(res, 503, 'indisponivel', 'upstream')
  }
}
