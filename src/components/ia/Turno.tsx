import { motion } from 'framer-motion'
import { useLanguage } from '../../hooks/useLanguage'
import { navegarParaSecao } from '../../hooks/useRota'
import type { Turno as DadosDoTurno } from '../../hooks/useConversaIA'

/** Divide em frases para revelar em blocos — nunca em caracteres. */
function frases(texto: string): string[] {
  return texto.split(/(?<=[.!?])\s+/).filter(Boolean)
}

function Seta() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function MarcaDePergunta() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

/** Texto revelado frase a frase, no mesmo gesto das outras seções do site. */
function RespostaRevelada({ texto }: { texto: string }) {
  return (
    <p className="ai-answer">
      {frases(texto).map((frase, i) => (
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
  )
}

type Props = {
  turno: DadosDoTurno
  /** Última pergunta da conversa: só ela recebe o foco e as continuações. */
  ehOUltimo: boolean
  aoPerguntar: (texto: string) => void
  aoEscolherPreEscrito: (pergunta: string, resposta: string) => void
}

export default function Turno({ turno, ehOUltimo, aoPerguntar, aoEscolherPreEscrito }: Props) {
  const { t } = useLanguage()
  const data = t.aiChat
  const { estado } = turno

  const mostraFallback =
    (estado.fase === 'erro' && estado.curado) || estado.fase === 'pre-escrito'

  const fontes = estado.fase === 'respondido' ? estado.resposta.sources : []

  return (
    <article className="ai-turno">
      <h3 className="ai-question">
        <span className="ai-question-mark">
          <MarcaDePergunta />
        </span>
        {turno.pergunta}
      </h3>

      <div className="ai-turno-corpo">
        <div
          className="ai-answer-region"
          tabIndex={-1}
          role={ehOUltimo ? 'status' : undefined}
          aria-live={ehOUltimo ? 'polite' : undefined}
        >
          {estado.fase === 'perguntando' && (
            <div className="ai-loading">
              <span className="ai-scan" aria-hidden="true" />
              <span className="ai-loading-text">{data.thinking}</span>
            </div>
          )}

          {estado.fase === 'respondido' && (
            <>
              <RespostaRevelada texto={estado.resposta.answer} />

              {estado.resposta.requiresHumanContact && (
                <motion.button
                  type="button"
                  className="ai-contact"
                  onClick={() => navegarParaSecao('contato')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  {data.contactCta} <Seta />
                </motion.button>
              )}

              {estado.resposta.followUps.length > 0 && ehOUltimo && (
                <motion.div
                  className="ai-followups"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="ai-followups-label">{data.followUpsLabel}</span>
                  {estado.resposta.followUps.map(f => (
                    <button
                      key={f}
                      type="button"
                      className="ai-chip ai-chip-ghost"
                      onClick={() => aoPerguntar(f)}
                    >
                      {f}
                    </button>
                  ))}
                </motion.div>
              )}
            </>
          )}

          {/* A IA está fora: a resposta pré-escrita ocupa o lugar dela, com a
              mesma aparência de uma resposta real e um rótulo que não deixa
              dúvida sobre a origem. */}
          {estado.fase === 'pre-escrito' && (
            <>
              <p className="ai-fallback-label">{data.fallback.label}</p>
              <RespostaRevelada texto={estado.resposta} />
              <button
                type="button"
                className="ai-contact"
                onClick={() => navegarParaSecao('contato')}
              >
                {data.contactCta} <Seta />
              </button>
            </>
          )}

          {estado.fase === 'erro' && <p className="ai-error">{estado.mensagem}</p>}

          {mostraFallback && ehOUltimo && (
            <div className="ai-followups">
              <span className="ai-fallback-intro">{data.fallback.intro}</span>
              {data.fallback.items
                .filter(item => item.question !== turno.pergunta)
                .map(item => (
                  <button
                    key={item.question}
                    type="button"
                    className="ai-chip ai-chip-ghost"
                    onClick={() => aoEscolherPreEscrito(item.question, item.answer)}
                  >
                    {item.question}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Marginália de procedência.
            É o único dispositivo visual que só existe nesta página, e existe
            porque é a tese dela: a resposta não sai do nada, sai de um dossiê
            que o Marcilio escreveu e revisou. Na seção antiga isso era uma
            linha de links cinza no rodapé — a coisa mais autoral do projeto
            renderizada como nota de rodapé. */}
        {fontes.length > 0 && (
          <motion.aside
            className="ai-fontes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span className="ai-sources-label">{data.sourcesLabel}</span>
            <ol className="ai-fontes-lista">
              {fontes.map((fonte, i) => (
                <li key={fonte.id}>
                  <span className="ai-fonte-indice" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {fonte.href ? (
                    <a href={fonte.href} target="_blank" rel="noopener noreferrer">
                      {fonte.label}
                    </a>
                  ) : (
                    <span>{fonte.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.aside>
        )}
      </div>
    </article>
  )
}
