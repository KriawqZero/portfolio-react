/**
 * Busca local determinística. Com poucas dezenas de documentos, um scorer
 * próprio resolve melhor que um índice invertido de biblioteca: é previsível,
 * depurável e não adiciona dependência.
 */

import type { KnowledgeDoc } from './types'

const STOPWORDS = new Set([
  'a', 'o', 'as', 'os', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'sem', 'que', 'qual', 'quais', 'quando', 'como', 'onde', 'e', 'ou', 'se',
  'voce', 'vc', 'seu', 'sua', 'seus', 'suas', 'me', 'meu', 'minha', 'ele', 'ela', 'isso', 'esse',
  'the', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'is', 'are', 'do',
  'does', 'did', 'you', 'your', 'yours', 'he', 'she', 'it', 'what', 'which', 'when', 'how', 'where',
])

/** Sempre no contexto: sem eles o modelo não sabe nem quem está representando. */
const FIXOS = ['profile-core', 'projects-overview']

export function tokenizar(texto: string): string[] {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t))
}

function pontuar(doc: KnowledgeDoc, termos: string[]): number {
  const campo = (texto: string) => new Set(tokenizar(texto))
  const titulo = campo(doc.title)
  const aliases = campo(doc.aliases.join(' '))
  const topicos = campo(doc.topics.join(' '))
  const corpo = tokenizar(doc.text)
  const corpoSet = new Set(corpo)

  let pontos = 0
  for (const termo of termos) {
    if (titulo.has(termo)) pontos += 5
    if (aliases.has(termo)) pontos += 4
    if (topicos.has(termo)) pontos += 3
    if (corpoSet.has(termo)) pontos += 1
  }

  // Normaliza pelo tamanho para que um documento longo não vença por volume.
  return pontos / Math.sqrt(Math.max(corpo.length, 1))
}

export type OpcoesBusca = {
  maxDocumentos: number
  maxCaracteres: number
  contexto?: 'default' | 'freelance'
}

/**
 * Devolve os documentos que vão para o modelo: os fixos, mais os de maior
 * pontuação, cortados pelo teto de caracteres.
 */
export function selecionarDocumentos(
  pergunta: string,
  documentos: KnowledgeDoc[],
  opcoes: OpcoesBusca,
): KnowledgeDoc[] {
  const termos = tokenizar(pergunta)
  const porId = new Map(documentos.map(d => [d.id, d]))

  const selecionados: KnowledgeDoc[] = []
  for (const id of FIXOS) {
    const doc = porId.get(id)
    if (doc) selecionados.push(doc)
  }

  const candidatos = documentos
    .filter(d => !FIXOS.includes(d.id))
    .map(doc => {
      let pontos = pontuar(doc, termos)
      // Visitante vindo de plataforma freelance: trabalho para cliente pesa mais.
      if (opcoes.contexto === 'freelance' && doc.id.startsWith('client-')) pontos *= 1.4
      return { doc, pontos }
    })
    .filter(c => c.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)

  let caracteres = selecionados.reduce((total, d) => total + d.text.length, 0)
  for (const { doc } of candidatos) {
    if (selecionados.length >= opcoes.maxDocumentos) break
    if (caracteres + doc.text.length > opcoes.maxCaracteres) continue
    selecionados.push(doc)
    caracteres += doc.text.length
  }

  return selecionados
}
