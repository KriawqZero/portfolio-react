import { useCallback, useState } from 'react'
import { useLanguage } from './useLanguage'
import type { AskResponse } from '../../lib/ai/types'

/**
 * Estado da conversa com a Marcilio IA.
 *
 * A mudança em relação à antiga seção: aqui a conversa é uma **lista de
 * turnos**, e não um turno só que era substituído pelo seguinte. Aquele
 * comportamento não era uma escolha — era consequência do painel de altura
 * travada entre dois ScrollTriggers pinados. Numa página própria a limitação
 * não existe, e mostrar apenas a última pergunta passaria a ler como defeito,
 * ainda mais porque a API sempre recebeu as dez últimas trocas.
 */

export const MAX_CARACTERES = 500

/**
 * Janela enviada à API: 10 perguntas e 10 respostas.
 *
 * Funciona como fila — quando a 11ª pergunta chega, o par mais antigo sai e
 * todo o resto permanece. Nunca cortamos no meio de um par, para que a IA não
 * receba uma pergunta sem a resposta que veio depois dela.
 */
const MAX_HISTORICO = 20
const CHAVE_SESSAO = 'portfolio-ai-session'

function idDeSessao(): string {
  const guardado = localStorage.getItem(CHAVE_SESSAO)
  if (guardado) return guardado
  const novo = crypto.randomUUID()
  localStorage.setItem(CHAVE_SESSAO, novo)
  return novo
}

export type EstadoDoTurno =
  | { fase: 'perguntando' }
  | { fase: 'respondido'; resposta: AskResponse }
  /** `curado` é true quando a IA está fora e há resposta pré-escrita para oferecer. */
  | { fase: 'erro'; mensagem: string; curado: boolean }
  | { fase: 'pre-escrito'; resposta: string }

export type Turno = {
  id: string
  pergunta: string
  estado: EstadoDoTurno
}

type ObterToken = () => Promise<string | undefined>

export function useConversaIA(obterToken: ObterToken) {
  const { t, language, isFreelanceView } = useLanguage()
  const data = t.aiChat

  const [turnos, setTurnos] = useState<Turno[]>([])
  const [historico, setHistorico] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([])

  const carregando = turnos.some(turno => turno.estado.fase === 'perguntando')

  const atualizarTurno = useCallback((id: string, estado: EstadoDoTurno) => {
    setTurnos(atuais => atuais.map(turno => (turno.id === id ? { ...turno, estado } : turno)))
  }, [])

  const enviar = useCallback(
    async (texto: string) => {
      const limpo = texto.trim()
      if (!limpo || carregando) return

      const id = crypto.randomUUID()
      setTurnos(atuais => [...atuais, { id, pergunta: limpo, estado: { fase: 'perguntando' } }])

      try {
        const turnstileToken = await obterToken()

        const r = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: limpo,
            history: historico.slice(-MAX_HISTORICO),
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
          // Rate limit é o único caso em que a IA está de pé — o visitante é que
          // passou do limite. Oferecer resposta pré-escrita ali soaria como
          // castigo disfarçado de ajuda.
          atualizarTurno(id, { fase: 'erro', mensagem, curado: r.status !== 429 })
          return
        }

        const resposta = (await r.json()) as AskResponse
        atualizarTurno(id, { fase: 'respondido', resposta })
        setHistorico(h => [
          // Abre espaço para o par novo descartando o par mais antigo.
          ...h.slice(-(MAX_HISTORICO - 2)),
          { role: 'user', content: limpo },
          { role: 'assistant', content: resposta.answer },
        ])
      } catch {
        atualizarTurno(id, { fase: 'erro', mensagem: data.errors.generic, curado: true })
      }
    },
    [atualizarTurno, carregando, data.errors, historico, isFreelanceView, language, obterToken],
  )

  /**
   * Resposta escrita à mão, escolhida pelo visitante enquanto a IA está fora.
   * Entra como um turno igual aos outros porque é isso que ela é: uma pergunta
   * feita e uma resposta dada — só que sem modelo nenhum no meio, e com rótulo
   * dizendo exatamente isso.
   */
  const responderPreEscrito = useCallback((pergunta: string, resposta: string) => {
    setTurnos(atuais => [
      ...atuais,
      { id: crypto.randomUUID(), pergunta, estado: { fase: 'pre-escrito', resposta } },
    ])
  }, [])

  const limpar = useCallback(() => {
    setTurnos([])
    setHistorico([])
  }, [])

  return { turnos, carregando, enviar, responderPreEscrito, limpar }
}
