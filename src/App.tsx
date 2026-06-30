import { useEffect, useRef } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import AboutMe from './components/AboutMe'
import OtherProjects from './components/OtherProjects'
import Avantis from './components/Avantis'
import StackAndDifferentials from './components/StackAndDifferentials'
import DevProcess from './components/DevProcess'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useSmoothScroll()
  const bgRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Global Storytelling background shift & connecting line
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global background color shifts
      ScrollTrigger.create({
        trigger: '#sobre',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => gsap.to('body', { backgroundColor: '#050506', duration: 1 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: '#09090B', duration: 1 }),
      })

      ScrollTrigger.create({
        trigger: '#processo', // We need to add this ID to DevProcess
        start: 'top center',
        onEnter: () => gsap.to('body', { backgroundColor: '#000000', duration: 1 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: '#050506', duration: 1 }),
      })

      // Central storytelling line
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          }
        })
      }

    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <div className="noise-overlay" />
      <CursorGlow />



      {/* Fixed ambient background layers */}
      <div ref={bgRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(63, 24, 171, 0.08), transparent)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(63, 24, 171, 0.04), transparent)',
        }} />
      </div>

      <Navbar />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <FeaturedProject />
        <AboutMe />
        <OtherProjects />
        <Avantis />
        <StackAndDifferentials />
        <DevProcess />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
