import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { useTurnstile } from '../hooks/useTurnstile'
import type { AskResponse } from '../../lib/ai/types'

/**
 * Seção "Marcilio IA".
 *
 * Duas decisões de layout que não são estéticas, são estruturais:
 *
 *  1. A altura do painel é fixa e a conversa rola por dentro. A seção fica
 *     entre dois ScrollTriggers pinados (DevProcess e Contact) — se ela
 *     crescesse a cada resposta, os pins vizinhos precisariam ser recalculados
 *     no meio da interação, e isso salta na tela.
 *  2. A área de rolagem leva data-lenis-prevent, senão o Lenis captura a roda
 *     do mouse e move a página inteira em vez do conteúdo do painel.
 */

type Estado =
  | { fase: 'ocioso' }
  | { fase: 'perguntando'; pergunta: string }
  | { fase: 'respondido'; pergunta: string; resposta: AskResponse }
  | { fase: 'erro'; pergunta: string; mensagem: string }

const MAX_CARACTERES = 500
const CHAVE_SESSAO = 'portfolio-ai-session'

function idDeSessao(): string {
  const guardado = localStorage.getItem(CHAVE_SESSAO)
  if (guardado) return guardado
  const novo = crypto.randomUUID()
  localStorage.setItem(CHAVE_SESSAO, novo)
  return novo
}

/** Divide em frases para revelar em blocos — nunca em caracteres. */
function frases(texto: string): string[] {
  return texto.split(/(?<=[.!?])\s+/).filter(Boolean)
}

export default function AiChat() {
  const { t, language, isFreelanceView } = useLanguage()
  const data = t.aiChat

  const [pergunta, setPergunta] = useState('')
  const [estado, setEstado] = useState<Estado>({ fase: 'ocioso' })
  const [historico, setHistorico] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const respostaRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<HTMLDivElement>(null)
  const secaoRef = useRef<HTMLElement>(null)

  // O script da Cloudflare só entra quando a seção chega perto da tela: ele não
  // tem por que disputar banda com a foto do Hero, que é o LCP da página.
  const [visivel, setVisivel] = useState(false)
  const { containerRef: turnstileRef, obterToken } = useTurnstile(visivel)

  useEffect(() => {
    const alvo = secaoRef.current
    if (!alvo || visivel) return
    const observador = new IntersectionObserver(
      entradas => {
        if (entradas.some(e => e.isIntersecting)) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    observador.observe(alvo)
    return () => observador.disconnect()
  }, [visivel])

  const sugestoes = isFreelanceView ? data.suggestionsFreelance : data.suggestions
  const carregando = estado.fase === 'perguntando'

  // Ao concluir, o foco vai para a resposta: leitor de tela anuncia e o teclado
  // continua de onde a leitura está. preventScroll é obrigatório aqui — sem ele
  // o navegador rola o painel para o elemento focado e a pergunta some de vista.
  useEffect(() => {
    if (estado.fase !== 'respondido') return
    respostaRef.current?.focus({ preventScroll: true })
    streamRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [estado.fase])

  async function enviar(texto: string) {
    const limpo = texto.trim()
    if (!limpo || carregando) return

    setPergunta('')
    setEstado({ fase: 'perguntando', pergunta: limpo })

    try {
      const turnstileToken = await obterToken()

      const r = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: limpo,
          history: historico.slice(-6),
          sessionId: idDeSessao(),
          lang: language,
          context: isFreelanceView ? 'freelance' : 'default',
          turnstileToken,
        }),
      })

      if (!r.ok) {
        const corpo = (await r.json().catch(() => ({}))) as { state?: string }
        const mensagem =
          corpo.state === 'disabled'
            ? data.errors.disabled
            : corpo.state === 'budget'
              ? data.errors.budget
              : r.status === 429
                ? data.errors.rateLimit
                : r.status === 504
                  ? data.errors.timeout
                  : data.errors.generic
        setEstado({ fase: 'erro', pergunta: limpo, mensagem })
        return
      }

      const resposta = (await r.json()) as AskResponse
      setEstado({ fase: 'respondido', pergunta: limpo, resposta })
      setHistorico(h => [
        ...h.slice(-4),
        { role: 'user', content: limpo },
        { role: 'assistant', content: resposta.answer },
      ])
    } catch {
      setEstado({ fase: 'erro', pergunta: limpo, mensagem: data.errors.generic })
    }
  }

  function limpar() {
    setEstado({ fase: 'ocioso' })
    setHistorico([])
    setPergunta('')
    inputRef.current?.focus()
  }

  return (
    <section id="ia" className="ai-section" ref={secaoRef}>
      <div className="container ai-grid">
        {/* ── Coluna editorial ───────────────────────────────────────────── */}
        <div className="ai-intro">
          <p className="section-label">{data.label}</p>
          <h2 className="text-display ai-title">
            {data.title} <span className="ai-title-accent">{data.titleHighlight}</span>
          </h2>
          <p className="ai-description">{data.description}</p>

          <p className="ai-disclaimer">
            <span aria-hidden="true" className="ai-disclaimer-mark" />
            {data.disclaimer}
          </p>

          <ul className="ai-suggestions">
            {sugestoes.map(s => (
              <li key={s}>
                <button
                  type="button"
                  className="ai-chip"
                  disabled={carregando}
                  onClick={() => enviar(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Painel de diálogo ──────────────────────────────────────────── */}
        <div className="ai-panel">
          <div className="ai-stream" data-lenis-prevent ref={streamRef}>
            {estado.fase === 'ocioso' && <p className="ai-empty">{data.emptyState}</p>}

            {estado.fase !== 'ocioso' && (
              <p className="ai-question">
                <span aria-hidden="true">›</span> {estado.pergunta}
              </p>
            )}

            {carregando && (
              <div className="ai-loading">
                <span className="ai-scan" aria-hidden="true" />
                <span className="ai-loading-text">{data.thinking}</span>
              </div>
            )}

            <div
              ref={respostaRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="ai-answer-region"
            >
              {estado.fase === 'respondido' && (
                <>
                  <p className="ai-answer">
                    {frases(estado.resposta.answer).map((frase, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {frase}{' '}
                      </motion.span>
                    ))}
                  </p>

                  {estado.resposta.sources.length > 0 && (
                    <motion.p
                      className="ai-sources"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      <span className="ai-sources-label">{data.sourcesLabel}</span>
                      {estado.resposta.sources.map(f =>
                        f.href ? (
                          <a key={f.id} href={f.href} target="_blank" rel="noopener noreferrer">
                            {f.label}
                          </a>
                        ) : (
                          <span key={f.id}>{f.label}</span>
                        ),
                      )}
                    </motion.p>
                  )}

                  {estado.resposta.requiresHumanContact && (
                    <motion.a
                      href="#contato"
                      className="ai-contact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.5 }}
                    >
                      {data.contactCta} →
                    </motion.a>
                  )}

                  {estado.resposta.followUps.length > 0 && (
                    <motion.div
                      className="ai-followups"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <span className="ai-followups-label">{data.followUpsLabel}</span>
                      {estado.resposta.followUps.map(f => (
                        <button key={f} type="button" className="ai-chip ai-chip-ghost" onClick={() => enviar(f)}>
                          {f}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </>
              )}

              {estado.fase === 'erro' && <p className="ai-error">{estado.mensagem}</p>}
            </div>
          </div>

          {/* ── Entrada ──────────────────────────────────────────────────── */}
          <form
            className="ai-form"
            onSubmit={e => {
              e.preventDefault()
              enviar(pergunta)
            }}
          >
            <label htmlFor="ai-input" className="sr-only">
              {data.inputLabel}
            </label>
            <input
              id="ai-input"
              ref={inputRef}
              type="text"
              className="ai-input"
              placeholder={data.placeholder}
              value={pergunta}
              maxLength={MAX_CARACTERES}
              disabled={carregando}
              onChange={e => setPergunta(e.target.value)}
            />
            {/* Só aparece quando há o que contar — vazio, ele apenas disputa
                espaço com o placeholder em telas estreitas. */}
            {pergunta.length > 0 && (
              <span className="ai-counter" aria-live="off">
                {pergunta.length}/{MAX_CARACTERES}
              </span>
            )}
            <button
              type="submit"
              className="ai-send"
              aria-label={data.sendLabel}
              disabled={carregando || pergunta.trim().length === 0}
            >
              →
            </button>
          </form>

          {estado.fase !== 'ocioso' && (
            <button type="button" className="ai-clear" onClick={limpar}>
              {data.clear}
            </button>
          )}

          {/* Âncora do widget invisível do Turnstile. */}
          <div ref={turnstileRef} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
