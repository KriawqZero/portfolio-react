import type { MouseEvent } from 'react'
import { navegar } from '../hooks/useRota'

/**
 * Convite para a Marcilio IA, usado dentro do portfólio.
 *
 * Mesma regra do componente das duas portas: `href` real para clique do meio e
 * "copiar endereço" funcionarem, clique comum interceptado para a troca ter
 * transição, clique com modificador entregue ao navegador.
 */
export default function ConviteIA({
  rotulo,
  className,
}: {
  rotulo: string
  className?: string
}) {
  function aoClicar(evento: MouseEvent<HTMLAnchorElement>) {
    if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return
    evento.preventDefault()
    navegar('ia')
  }

  return (
    <a href="/ia" className={`convite-ia${className ? ` ${className}` : ''}`} onClick={aoClicar}>
      <span className="convite-ia-ponto" aria-hidden="true" />
      {rotulo}
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}
