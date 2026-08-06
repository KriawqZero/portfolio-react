/**
 * Verificação do Cloudflare Turnstile.
 *
 * O token que o navegador manda não vale nada até ser trocado com a Cloudflare
 * aqui no servidor. Validação no cliente é decoração.
 *
 * Falha fechado em produção: sem segredo configurado, sem token, token inválido
 * ou Cloudflare fora do ar, a requisição para antes da OpenAI.
 */

import { registrarTokenTurnstile, type Veredito } from './limits'

const ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export function turnstileConfigurado(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY)
}

/**
 * Em desenvolvimento dá para pular, mas só quando não é produção — a flag é
 * ignorada de propósito quando VERCEL_ENV=production, para que um deploy
 * distraído não desligue a proteção.
 */
export function podePular(producao: boolean): boolean {
  if (producao) return false
  return process.env.AI_SKIP_TURNSTILE === 'true' || !turnstileConfigurado()
}

export async function verificarTurnstile(
  token: string | undefined,
  ip: string,
  producao: boolean,
): Promise<Veredito> {
  if (podePular(producao)) return { ok: true }

  if (!turnstileConfigurado()) {
    return { ok: false, status: 503, codigo: 'verificacao_indisponivel', estado: 'upstream' }
  }
  if (!token) {
    return { ok: false, status: 403, codigo: 'verificacao_ausente' }
  }

  // Antes da ida à rede: um token repetido é recusado sem custo nenhum.
  const primeiroUso = await registrarTokenTurnstile(token)
  if (!primeiroUso.ok) return primeiroUso

  const corpo = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY as string,
    response: token,
  })
  if (ip && ip !== 'desconhecido') corpo.set('remoteip', ip)

  try {
    const resposta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: corpo,
      signal: AbortSignal.timeout(5000),
    })

    const dados = (await resposta.json()) as { success?: boolean }
    if (dados.success === true) return { ok: true }

    // Os códigos de erro da Cloudflare não vão para o visitante: para ele o
    // resultado é o mesmo, e para um atacante são pistas de graça.
    return { ok: false, status: 403, codigo: 'verificacao_invalida' }
  } catch {
    return { ok: false, status: 503, codigo: 'verificacao_indisponivel', estado: 'upstream' }
  }
}
