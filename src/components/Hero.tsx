import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'
import { SiReact, SiTypescript, SiNestjs, SiNodedotjs, SiPostgresql, SiDocker } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const techIcons: Record<string, React.ReactNode> = {
  react: <SiReact size={24} />,
  typescript: <SiTypescript size={24} />,
  nestjs: <SiNestjs size={24} />,
  nodejs: <SiNodedotjs size={24} />,
  postgresql: <SiPostgresql size={24} />,
  docker: <SiDocker size={24} />,
}

export default function Hero() {
  const { hero } = content
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cinematic scroll reveal masks with MatchMedia for responsiveness
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 768px)', () => {
      // Parallax effect out of Hero (Desktop only)
      gsap.to(contentRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Art space scales down and blurs out
      gsap.to(artRef.current, {
        scale: 0.8,
        filter: 'blur(10px)',
        y: 100,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })

    mm.add('(max-width: 767px)', () => {
       // Subtle mobile fade out instead of large parallax
       gsap.to([contentRef.current, artRef.current], {
        opacity: 0.2,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })

    mm.add('all', () => {
      // Mask reveals for initial load (All devices)
      gsap.fromTo('.hero-mask', 
        { y: '100%' }, 
        { y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      )
      
      gsap.fromTo('.hero-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100svh', // Responsive height
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'calc(var(--section-spacing) / 2)',
        paddingBottom: 'calc(var(--section-spacing) / 2)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(4rem, 10vw, 8rem)', alignItems: 'center' }}>
          {/* Left column */}
          <div ref={contentRef} style={{ maxWidth: 1000 }}>
            <div className="mask-text-container" style={{ marginBottom: '2rem' }}>
              <p className="section-label mask-text hero-mask">{hero.greeting}</p>
            </div>
            
            <div className="mask-text-container" style={{ marginBottom: '3rem' }}>
              <p className="mask-text hero-mask" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                {hero.name}
              </p>
              <div className="mask-text hero-mask" style={{ width: '80px', height: '2px', background: 'linear-gradient(24deg, #F9FFFD, #3F18AB)', marginTop: '1.25rem' }} />
            </div>

            <h1 style={{ marginBottom: '2rem' }}>
              <div className="mask-text-container">
                <span className="text-hero mask-text hero-mask" style={{ display: 'block', color: 'var(--text-primary)' }}>
                  {hero.role[0]}
                </span>
              </div>
              <div className="mask-text-container">
                <span className="text-hero gradient-text mask-text hero-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                  {hero.role[1]}
                </span>
              </div>
            </h1>

            <p className="hero-fade" style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.6, marginBottom: '3rem' }}>
              {hero.subtitle}
            </p>

            <div className="hero-fade" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <a href="#projetos" className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                {hero.ctaPrimary}
              </a>
              <a href="#sobre" className="btn-secondary">{hero.ctaSecondary}</a>
            </div>

            <div className="hero-fade">
              <p className="section-label" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>TECNOLOGIAS</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {hero.techs.map((tech) => (
                  <motion.div 
                    key={tech.name} 
                    whileHover={{ scale: 1.15, y: -5 }} 
                    transition={{ duration: 0.2 }} 
                    style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.3s' }} 
                    onMouseEnter={(e) => { (e.currentTarget.style.color = 'var(--accent-light)') }} 
                    onMouseLeave={(e) => { (e.currentTarget.style.color = 'var(--text-muted)') }} 
                    title={tech.name}
                  >
                    {techIcons[tech.icon] || <span style={{ fontSize: 28 }}>⚡</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Art space + availability */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={artRef} style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 520, borderRadius: 32, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: '-30%', background: 'radial-gradient(circle, rgba(63,24,171,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <span className="hero-fade" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem, 15vw, 14rem)', fontWeight: 800, color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.04em', userSelect: 'none', position: 'relative' }}>MO</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .hero-grid { grid-template-columns: 1.2fr 0.8fr !important; } }
      `}</style>
    </section>
  )
}