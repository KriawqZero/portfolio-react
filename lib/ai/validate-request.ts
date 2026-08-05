/**
 * Validação da entrada. Roda antes de qualquer coisa cara: nada chega na
 * OpenAI sem passar por aqui.
 */

import type { AskRequest } from './types'

export type Validacao =
  | { ok: true; dados: AskRequest }
  | { ok: false; status: number; erro: string }

type Limites = {
  caracteresMensagem: number
  mensagensHistorico: number
}

/**
 * Origin ausente acontece em requisição que não vem de browser. Tratamos como
 * não permitida — é higiene, não segurança: um cliente forja o header à vontade.
 */
export function origemPermitida(
  origin: string | undefined,
  permitidas: string[],
  permitirLocal = false,
): boolean {
  if (!origin) return false
  if (permitidas.includes(origin)) return true
  // Previews da Vercel: https://<algo>.vercel.app
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return true
  // Fora de produção, qualquer porta local serve — dev server, preview, teste.
  return permitirLocal && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
}

export function validarCorpo(corpo: unknown, limites: Limites): Validacao {
  if (typeof corpo !== 'object' || corpo === null) {
    return { ok: false, status: 400, erro: 'corpo_invalido' }
  }

  const c = corpo as Record<string, unknown>

  if (typeof c.question !== 'string') return { ok: false, status: 400, erro: 'pergunta_ausente' }
  const question = c.question.trim()
  if (question.length < 1) return { ok: false, status: 400, erro: 'pergunta_vazia' }
  if (question.length > limites.caracteresMensagem) {
    return { ok: false, status: 400, erro: 'pergunta_longa' }
  }

  if (typeof c.sessionId !== 'string' || c.sessionId.length < 8 || c.sessionId.length > 64) {
    return { ok: false, status: 400, erro: 'sessao_invalida' }
  }

  const lang = c.lang === 'en' ? 'en' : 'pt'
  const context = c.context === 'freelance' ? 'freelance' : 'default'

  // Token do Turnstile: só conferimos formato aqui. Quem diz se vale é a
  // Cloudflare, no servidor.
  const turnstileToken =
    typeof c.turnstileToken === 'string' && c.turnstileToken.length <= 2048
      ? c.turnstileToken
      : undefined

  let history: AskRequest['history'] = []
  if (c.history !== undefined) {
    if (!Array.isArray(c.history)) return { ok: false, status: 400, erro: 'historico_invalido' }
    if (c.history.length > limites.mensagensHistorico) {
      return { ok: false, status: 400, erro: 'historico_longo' }
    }
    for (const item of c.history) {
      if (typeof item !== 'object' || item === null) {
        return { ok: false, status: 400, erro: 'historico_invalido' }
      }
      const m = item as Record<string, unknown>
      if (m.role !== 'user' && m.role !== 'assistant') {
        return { ok: false, status: 400, erro: 'historico_invalido' }
      }
      if (typeof m.content !== 'string' || m.content.length > limites.caracteresMensagem) {
        return { ok: false, status: 400, erro: 'historico_invalido' }
      }
    }
    history = c.history as AskRequest['history']
  }

  return {
    ok: true,
    dados: { question, history, sessionId: c.sessionId, lang, context, turnstileToken },
  }
}
