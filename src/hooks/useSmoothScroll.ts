import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // A native dialog traps focus, but Lenis also needs to stop its current
    // animation so that the page behind the dialog keeps its scroll position.
    let modalWasOpen = false
    const syncModalScroll = () => {
      const modalIsOpen = document.querySelector('dialog[open]') !== null
      if (modalIsOpen === modalWasOpen) return
      modalWasOpen = modalIsOpen
      if (modalIsOpen) lenis.stop()
      else lenis.start()
    }
    const modalObserver = new MutationObserver(syncModalScroll)
    modalObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })
    syncModalScroll()

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Guardado numa variável porque quem entra no ticker é este wrapper, não
    // `lenis.raf` — remover a referência errada na limpeza deixava o callback
    // vivo chamando um Lenis já destruído a cada troca de rota.
    const avancarLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(avancarLenis)

    gsap.ticker.lagSmoothing(0)

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        e.preventDefault()
        const id = anchor.getAttribute('href')
        if (id && id !== '#') {
          const el = document.querySelector(id)
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      modalObserver.disconnect()
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(avancarLenis)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
