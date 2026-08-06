import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { useTurnstile } from '../../hooks/useTurnstile'
import { MAX_CARACTERES, useConversaIA } from '../../hooks/useConversaIA'
import Turno from './Turno'

/**
 * O fio da conversa e a entrada.
 *
 * Diferente da antiga seção, aqui o Turnstile é armado assim que o componente
 * monta, sem esperar o IntersectionObserver: naquela versão a espera existia
 * para não disputar banda com a foto do Hero, que era o LCP da página. Nesta
 * página não há foto do Hero — a conversa é o conteúdo, e adiar a verificação
 * só atrasaria a primeira pergunta.
 */
export default function Conversa() {
  const { t, isFreelanceView } = useLanguage()
  const data = t.aiChat

  const { containerRef: turnstileRef, obterToken } = useTurnstile(true)
  const { turnos, carregando, enviar, responderPreEscrito, limpar } = useConversaIA(obterToken)

  const [pergunta, setPergunta] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const fioRef = useRef<HTMLDivElement>(null)

  const ultimo = turnos.at(-1)
  const quantidade = turnos.length

  // Pergunta nova entra em cena: a tela acompanha em vez de deixar o visitante
  // procurando onde a resposta vai aparecer.
  useEffect(() => {
    if (quantidade === 0) return
    const artigos = fioRef.current?.querySelectorAll('.ai-turno')
    artigos?.[artigos.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [quantidade])

  // Ao concluir, o foco vai para a resposta: leitor de tela anuncia e o teclado
  // continua de onde a leitura está. `preventScroll` é obrigatório — sem ele o
  // navegador rola até o elemento focado e desfaz o passo acima.
  useEffect(() => {
    if (ultimo?.estado.fase !== 'respondido' && ultimo?.estado.fase !== 'pre-escrito') return
    const regioes = fioRef.current?.querySelectorAll<HTMLElement>('.ai-answer-region')
    regioes?.[regioes.length - 1]?.focus({ preventScroll: true })
  }, [ultimo?.estado.fase, ultimo?.id])

  function perguntar(texto: string) {
    setPergunta('')
    void enviar(texto)
  }

  const sugestoes = isFreelanceView ? data.suggestionsFreelance : data.suggestions

  return (
    /* Sem conversa, a entrada não gruda no rodapé: ela desce logo depois das
       sugestões. Grudada, sobrepunha as próprias sugestões no mobile e abria
       um vão vazio de meia tela no desktop. */
    <div className={`ai-conversa${quantidade === 0 ? ' ai-conversa-vazia' : ''}`}>
      <div className="ai-fio" ref={fioRef}>
        {quantidade === 0 ? (
          <div className="ai-vazio">
            <p className="ai-empty">{data.emptyState}</p>
            <ul className="ai-suggestions">
              {sugestoes.map(s => (
                <li key={s}>
                  <button
                    type="button"
                    className="ai-chip"
                    disabled={carregando}
                    onClick={() => perguntar(s)}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          turnos.map(turno => (
            <Turno
              key={turno.id}
              turno={turno}
              ehOUltimo={turno.id === ultimo?.id}
              aoPerguntar={perguntar}
              aoEscolherPreEscrito={responderPreEscrito}
            />
          ))
        )}
      </div>

      <div className="ai-entrada">
        <form
          className="ai-form"
          onSubmit={e => {
            e.preventDefault()
            perguntar(pergunta)
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
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>

        {quantidade > 0 && (
          <button
            type="button"
            className="ai-clear"
            onClick={() => {
              limpar()
              inputRef.current?.focus()
            }}
          >
            {data.clear}
          </button>
        )}
      </div>

      {/* Âncora do widget invisível do Turnstile. */}
      <div ref={turnstileRef} aria-hidden="true" />
    </div>
  )
}
