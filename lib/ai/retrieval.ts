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

/**
 * Sempre no contexto — mas entregues pelas instruções, não pelo bloco de
 * documentos. Como não mudam de uma pergunta para outra, ficam no prefixo
 * estático do prompt, que é a parte que a OpenAI cobra com desconto quando
 * está em cache.
 */
export const FIXOS = ['profile-core', 'projects-overview']

export function documentosFixos(documentos: KnowledgeDoc[]): KnowledgeDoc[] {
  return FIXOS.map(id => documentos.find(d => d.id === id)).filter(
    (d): d is KnowledgeDoc => Boolean(d),
  )
}

export function tokenizar(texto: string): string[] {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t))
}

/**
 * Fração mínima dos termos da pergunta que um documento precisa casar para
 * entrar no contexto, quando não casa nenhum metadado.
 *
 * Sem esse piso, um único termo em comum bastava, e o desempate acabava sendo
 * o tamanho do texto — documentos curtos derivados do `content.ts` venciam os
 * escritos à mão por uma coincidência de vocabulário. Documento irrelevante no
 * prompt não é neutro: custa token e dá ao modelo material para divagar.
 *
 * Quando nada passa no piso, a resposta sai só com os documentos fixos. É o
 * comportamento certo: sem base, o certo é dizer que não sabe.
 */
const COBERTURA_MINIMA = 1 / 3

export function pontuar(doc: KnowledgeDoc, termos: string[]): number {
  const campo = (texto: string) => new Set(tokenizar(texto))
  const titulo = campo(doc.title)
  const aliases = campo(doc.aliases.join(' '))
  const topicos = campo(doc.topics.join(' '))
  const corpo = tokenizar(doc.text)
  const corpoSet = new Set(corpo)

  let metadados = 0
  let ocorrencias = 0
  let casados = 0
  for (const termo of termos) {
    let casou = false
    if (titulo.has(termo)) { metadados += 5; casou = true }
    if (aliases.has(termo)) { metadados += 4; casou = true }
    if (topicos.has(termo)) { metadados += 3; casou = true }
    if (corpoSet.has(termo)) { ocorrencias += 1; casou = true }
    if (casou) casados += 1
  }

  if (casados === 0) return 0
  if (metadados === 0 && casados / termos.length < COBERTURA_MINIMA) return 0

  // Só o corpo é normalizado pelo tamanho, para que um documento longo não
  // vença por volume. Título, alias e tópico são curadoria — foram escritos
  // justamente para rotear a pergunta — e diluí-los pelo tamanho do texto
  // punia o documento detalhado pelo próprio detalhe.
  return metadados + ocorrencias / Math.sqrt(Math.max(corpo.length, 1))
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

  const selecionados: KnowledgeDoc[] = []

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

  let caracteres = 0
  for (const { doc } of candidatos) {
    if (selecionados.length >= opcoes.maxDocumentos) break
    if (caracteres + doc.text.length > opcoes.maxCaracteres) continue
    selecionados.push(doc)
    caracteres += doc.text.length
  }

  return selecionados
}
