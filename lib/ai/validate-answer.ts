/**
 * O modelo obedeceu ao schema? Ótimo. Ainda assim nada do que ele devolve
 * chega ao visitante sem passar por aqui.
 *
 * Duas garantias que importam:
 *   - nenhuma URL inventada pelo modelo alcança a tela (links vêm da allowlist);
 *   - nenhum sourceId que não esteja no contexto vira citação.
 */

import type { AnswerStatus, AskResponse, KnowledgeDoc } from './types.js'

const STATUS_VALIDOS: AnswerStatus[] = ['answered', 'unknown', 'out_of_scope']

const PADRAO_URL = /(https?:\/\/\S+|www\.\S+|\S+\.(com|br|dev|io|net|org)(\/\S*)?)/gi
const PADRAO_HTML = /<[^>]+>/g

function limparTexto(bruto: string, maxCaracteres: number): string {
  const limpo = bruto
    .replace(PADRAO_HTML, '')
    .replace(PADRAO_URL, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  if (limpo.length <= maxCaracteres) return limpo

  // Corta na última frase completa que cabe, para não terminar no meio.
  const cortado = limpo.slice(0, maxCaracteres)
  const ultimoPonto = cortado.lastIndexOf('. ')
  return ultimoPonto > maxCaracteres * 0.5 ? cortado.slice(0, ultimoPonto + 1) : `${cortado.trim()}…`
}

export type Limites = {
  caracteresResposta: number
  maxFollowUps?: number
  caracteresFollowUp?: number
}

/**
 * `documentosNoContexto` são os que realmente foram enviados ao modelo. Citar
 * qualquer outro id é alucinação, e some silenciosamente.
 */
export function validarResposta(
  bruto: unknown,
  documentosNoContexto: KnowledgeDoc[],
  limites: Limites,
): AskResponse {
  const maxFollowUps = limites.maxFollowUps ?? 3
  const caracteresFollowUp = limites.caracteresFollowUp ?? 80

  const vazia: AskResponse = {
    status: 'unknown',
    answer: '',
    sources: [],
    followUps: [],
    requiresHumanContact: false,
  }

  if (typeof bruto !== 'object' || bruto === null) return vazia
  const r = bruto as Record<string, unknown>

  const status = STATUS_VALIDOS.includes(r.status as AnswerStatus)
    ? (r.status as AnswerStatus)
    : 'unknown'

  const answer = typeof r.answer === 'string' ? limparTexto(r.answer, limites.caracteresResposta) : ''
  if (!answer) return { ...vazia, status: status === 'answered' ? 'unknown' : status }

  const porId = new Map(documentosNoContexto.map(d => [d.id, d]))
  const sources = (Array.isArray(r.sourceIds) ? r.sourceIds : [])
    .filter((id): id is string => typeof id === 'string')
    .filter((id, i, todos) => todos.indexOf(id) === i)
    .map(id => porId.get(id))
    .filter((doc): doc is KnowledgeDoc => Boolean(doc))
    .filter(doc => Boolean(doc.sourceLabel))
    .map(doc => ({
      id: doc.id,
      label: doc.sourceLabel as string,
      href: doc.sourceHref ?? null,
    }))
    // Dois documentos podem descrever o mesmo projeto (um vindo do site, outro
    // do dossiê). Para o visitante isso é uma fonte só.
    .filter((fonte, i, todas) => todas.findIndex(f => f.label === fonte.label) === i)

  const followUps = (Array.isArray(r.followUps) ? r.followUps : [])
    .filter((f): f is string => typeof f === 'string')
    .map(f => f.trim())
    .filter(f => f.length > 0 && f.length <= caracteresFollowUp)
    .slice(0, maxFollowUps)

  return {
    status,
    answer,
    sources,
    followUps,
    requiresHumanContact: r.requiresHumanContact === true,
  }
}
