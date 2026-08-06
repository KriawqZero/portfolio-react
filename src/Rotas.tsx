import { Suspense, lazy } from 'react'
import { carregarPagina, useRota } from './hooks/useRota'

const Portfolio = lazy(carregarPagina.portfolio)
const MarcilioIA = lazy(carregarPagina.ia)

/**
 * As duas páginas do site, cada uma no seu chunk.
 *
 * O fallback é vazio de propósito. O `html` e o `body` já são do tom do site,
 * então a espera é um fundo escuro parado — e não um spinner que aparece por
 * 80ms só para piscar. Na troca de rota ele nunca chega a ser visto: o chunk
 * é carregado antes de a transição começar.
 */
export default function Rotas() {
  const rota = useRota()
  return <Suspense fallback={null}>{rota === 'ia' ? <MarcilioIA /> : <Portfolio />}</Suspense>
}
