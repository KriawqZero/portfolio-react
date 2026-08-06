import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

/**
 * Roteador de duas portas: o portfólio e a Marcilio IA.
 *
 * Não é uma biblioteca porque não há nada aqui que justifique uma. São duas
 * rotas, sem parâmetros, sem rotas aninhadas e sem carregamento de dados por
 * rota — a History API resolve, e o que sobraria de uma lib seria peso.
 *
 * `/ia` é URL de verdade, e não overlay, porque o objetivo é poder mandar o
 * endereço por link — no LinkedIn, no currículo, numa proposta.
 */

export type Rota = 'portfolio' | 'ia'

const CAMINHO: Record<Rota, string> = { portfolio: '/', ia: '/ia' }

/**
 * Cada página é um chunk separado. Quem chega direto em `/ia` não baixa nem
 * interpreta GSAP, Lenis e as oito seções do portfólio, que é o que faz a
 * página da IA abrir rápido para quem só quer perguntar.
 */
export const carregarPagina = {
  portfolio: () => import('../App'),
  ia: () => import('../PaginaIA'),
}

function daUrl(caminho: string): Rota {
  return caminho.replace(/\/+$/, '') === '/ia' ? 'ia' : 'portfolio'
}

let rota: Rota = daUrl(window.location.pathname)
const ouvintes = new Set<() => void>()

/**
 * Onde o portfólio estava quando o visitante saiu dele. Guardado aqui, e não
 * no componente, porque o componente é justamente quem desmonta na troca.
 */
let posicaoDoPortfolio = 0

export function ultimaPosicaoDoPortfolio(): number {
  return posicaoDoPortfolio
}

function inscrever(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte)
  return () => {
    ouvintes.delete(ouvinte)
  }
}

function ler(): Rota {
  return rota
}

export function useRota(): Rota {
  return useSyncExternalStore(inscrever, ler, ler)
}

type DocumentoComTransicao = Document & {
  startViewTransition?: (atualizar: () => void) => { finished: Promise<void> }
}

function aplicar(nova: Rota) {
  rota = nova
  for (const ouvinte of ouvintes) ouvinte()
}

/**
 * A troca precisa acontecer dentro do callback de `startViewTransition`: é ali
 * que o navegador congela o retrato de antes e mede o depois. Daí o `flushSync`
 * — sem ele o React agendaria a renderização para fora dessa janela e o
 * navegador dissolveria uma tela para ela mesma.
 *
 * Sem suporte à API, ou com movimento reduzido, a troca é seca. O destino é o
 * mesmo; o que muda é só o caminho até ele.
 */
function trocar(nova: Rota) {
  const documento = document as DocumentoComTransicao
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (movimentoReduzido || typeof documento.startViewTransition !== 'function') {
    aplicar(nova)
    return
  }

  documento.startViewTransition(() => flushSync(() => aplicar(nova)))
}

async function irPara(destino: Rota, empurrarHistorico: boolean) {
  if (destino === rota) return

  // Sem esperar o chunk, o retrato "depois" seria o fallback do Suspense e a
  // transição dissolveria para uma tela vazia antes de mostrar a página.
  await carregarPagina[destino]()

  if (rota === 'portfolio') posicaoDoPortfolio = window.scrollY

  if (empurrarHistorico) {
    // A query sobrevive à troca: é ela que carrega `?platform=`, e perdê-la no
    // caminho tiraria o visitante da visão de freelancer sem ele pedir.
    window.history.pushState(null, '', CAMINHO[destino] + window.location.search)
  }

  trocar(destino)
}

export function navegar(destino: Rota): void {
  void irPara(destino, true)
}

/**
 * Âncora pedida de fora do portfólio. A página da IA oferece "falar com o
 * Marcilio", que mora no epílogo do portfólio — o alvo só existe depois que a
 * outra página montar, então o pedido fica guardado e é consumido lá.
 */
let ancoraPendente: string | null = null

export function navegarParaSecao(id: string): void {
  if (rota === 'portfolio') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  ancoraPendente = id
  void irPara('portfolio', true)
}

export function consumirAncoraPendente(): string | null {
  const id = ancoraPendente
  ancoraPendente = null
  return id
}

window.addEventListener('popstate', () => {
  void irPara(daUrl(window.location.pathname), false)
})
