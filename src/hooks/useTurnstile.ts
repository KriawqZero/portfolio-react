import { useCallback, useEffect, useRef } from 'react'

/**
 * Cloudflare Turnstile em modo invisível.
 *
 * Duas decisões que valem explicação:
 *
 *  - O script só é carregado quando a seção entra no viewport. Carregá-lo no
 *    topo custaria requisição de terceiro no caminho do LCP, que é a foto do
 *    Hero, para um recurso que a maioria dos visitantes nunca vai usar.
 *  - Cada pergunta gera um token novo. Token do Turnstile vale uma vez só e
 *    expira em poucos minutos; reaproveitar daria 403 no meio da conversa.
 *
 * Sem VITE_TURNSTILE_SITE_KEY o hook vira no-op e devolve undefined — é assim
 * que o desenvolvimento local funciona sem depender da Cloudflare.
 */

type TurnstileApi = {
  render: (
    container: HTMLElement,
    opcoes: {
      sitekey: string
      size: 'invisible'
      callback: (token: string) => void
      'error-callback': () => void
      'expired-callback': () => void
    },
  ) => string
  execute: (widgetId: string) => void
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

function carregarScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()

  const existente = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`)
  if (existente) {
    return new Promise(resolve => existente.addEventListener('load', () => resolve(), { once: true }))
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('turnstile indisponível'))
    document.head.appendChild(script)
  })
}

export function useTurnstile(ativo: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<string | null>(null)
  const pendenteRef = useRef<{ resolver: (t?: string) => void } | null>(null)

  useEffect(() => {
    if (!ativo || !SITE_KEY || widgetRef.current) return

    let cancelado = false

    carregarScript()
      .then(() => {
        if (cancelado || !containerRef.current || !window.turnstile) return
        widgetRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          size: 'invisible',
          callback: token => {
            pendenteRef.current?.resolver(token)
            pendenteRef.current = null
          },
          'error-callback': () => {
            pendenteRef.current?.resolver(undefined)
            pendenteRef.current = null
          },
          'expired-callback': () => {
            pendenteRef.current?.resolver(undefined)
            pendenteRef.current = null
          },
        })
      })
      .catch(() => {
        // Sem verificação o servidor recusa em produção, e é isso que deve
        // acontecer: falhar fechado.
      })

    return () => {
      cancelado = true
      const id = widgetRef.current
      if (id && window.turnstile) {
        window.turnstile.remove(id)
        widgetRef.current = null
      }
    }
  }, [ativo])

  const obterToken = useCallback(async (): Promise<string | undefined> => {
    if (!SITE_KEY || !widgetRef.current || !window.turnstile) return undefined

    window.turnstile.reset(widgetRef.current)

    return new Promise<string | undefined>(resolver => {
      pendenteRef.current = { resolver }
      // Rede lenta não pode travar o envio para sempre; sem token o servidor
      // decide o que fazer.
      const tempo = setTimeout(() => {
        if (pendenteRef.current) {
          pendenteRef.current = null
          resolver(undefined)
        }
      }, 8000)

      const original = resolver
      pendenteRef.current = {
        resolver: token => {
          clearTimeout(tempo)
          original(token)
        },
      }

      window.turnstile!.execute(widgetRef.current!)
    })
  }, [])

  return { containerRef, obterToken, habilitado: Boolean(SITE_KEY) }
}
