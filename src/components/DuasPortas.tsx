import type { MouseEvent } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { navegar, type Rota } from '../hooks/useRota'

/**
 * As duas portas do site: o portfólio e a Marcilio IA.
 *
 * Os `href` são reais, e não `#`, de propósito — é o que faz clique do meio,
 * "abrir em nova aba" e "copiar endereço" funcionarem. O clique comum é
 * interceptado para a troca acontecer com transição; qualquer clique com
 * modificador passa direto para o navegador, que é o comportamento esperado.
 */

const CAMINHO: Record<Rota, string> = { portfolio: '/', ia: '/ia' }

export default function DuasPortas({ ativa }: { ativa: Rota }) {
  const { t } = useLanguage()
  const nav = t.aiChat.nav

  function aoClicar(evento: MouseEvent<HTMLAnchorElement>, destino: Rota) {
    if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return
    evento.preventDefault()
    navegar(destino)
  }

  return (
    <nav className="portas" aria-label={nav.label}>
      {(['portfolio', 'ia'] as const).map(destino => (
        <a
          key={destino}
          href={CAMINHO[destino]}
          className={`porta${ativa === destino ? ' porta-ativa' : ''}`}
          aria-current={ativa === destino ? 'page' : undefined}
          onClick={evento => aoClicar(evento, destino)}
        >
          {destino === 'portfolio' ? nav.portfolio : nav.ia}
        </a>
      ))}
    </nav>
  )
}
