/**
 * Tipos compartilhados entre a Vercel Function, os scripts de build e o front.
 * Nada aqui depende de runtime — é seguro importar de qualquer lado.
 */

export type DocType = 'profile' | 'project' | 'practice' | 'index'

/** Um documento do dossiê, já normalizado pelo build-index. */
export type KnowledgeDoc = {
  id: string
  title: string
  type: DocType
  topics: string[]
  aliases: string[]
  text: string
  /** Só quando o documento tem uma fonte pública que pode virar link. */
  sourceLabel?: string
  sourceHref?: string
}

export type AnswerStatus = 'answered' | 'unknown' | 'out_of_scope'

/** O que o modelo é obrigado a devolver. */
export type PortfolioAnswer = {
  status: AnswerStatus
  answer: string
  sourceIds: string[]
  followUps: string[]
  requiresHumanContact: boolean
}

/** O que o front recebe: IDs já resolvidos em links pela allowlist. */
export type AskResponse = {
  status: AnswerStatus
  answer: string
  sources: Array<{ id: string; label: string; href: string | null }>
  followUps: string[]
  requiresHumanContact: boolean
}

export type AskRequest = {
  question: string
  history?: Array<{ role: 'user' | 'assistant'; content: string }>
  sessionId: string
  lang: 'pt' | 'en'
  context?: 'default' | 'freelance'
  /** Token do Cloudflare Turnstile; quem valida é o servidor, a cada pergunta. */
  turnstileToken?: string
}

/**
 * Schema do structured output. `strict: true` exige additionalProperties:false
 * e todos os campos em required — limites de tamanho e quantidade não são
 * confiáveis aqui, então quem os impõe é validate-answer.ts.
 */
export const ANSWER_JSON_SCHEMA = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['answered', 'unknown', 'out_of_scope'] },
    answer: { type: 'string' },
    sourceIds: { type: 'array', items: { type: 'string' } },
    followUps: { type: 'array', items: { type: 'string' } },
    requiresHumanContact: { type: 'boolean' },
  },
  required: ['status', 'answer', 'sourceIds', 'followUps', 'requiresHumanContact'],
  additionalProperties: false,
} as const
