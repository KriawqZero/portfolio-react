import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function OtherProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const { otherProjects: data } = content

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 768px)', () => {
      // Sticky Card Stacking effect - Scale down only (Desktop only)
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        if (index < cardsRef.current.length - 1) {
          const nextCard = cardsRef.current[index + 1]
          if (nextCard) {
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.5,
              scrollTrigger: {
                trigger: nextCard,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              }
            })
          }
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
        zIndex: 10,
      }}
    >
      <span ref={numberRef} className="section-number" style={{ position: 'absolute', top: 0, left: '-2%' }}>
        {data.number}
      </span>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ marginBottom: '8rem', maxWidth: 600 }}>
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
          <h2 className="text-display">{data.title}</h2>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '5vh' }}>
          {data.items.map((project, index) => (
            <div 
              key={project.name}
              className="other-project-card"
              ref={el => { cardsRef.current[index] = el }}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--glass-border)',
                borderRadius: 40,
                padding: 'clamp(2rem, 6vw, 6rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
                overflow: 'hidden',
                willChange: 'transform, opacity',
                top: `calc(10svh + ${index * 20}px)`, // Used by sticky in desktop
              }}
            >
              {/* Card background glow */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(circle at 100% 0%, rgba(63, 24, 171, 0.08), transparent 70%)', pointerEvents: 'none' }} />

              <div className="project-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', position: 'relative', zIndex: 10 }}>
                {/* Left side */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: 480 }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                    {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>
                    Acessar projeto
                    <span style={{ marginLeft: '0.5rem' }}>↗</span>
                  </a>
                </div>

                {/* Right side - Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p className="section-label" style={{ marginBottom: '2rem', fontSize: '0.7rem' }}>DESTAQUES DA IMPLEMENTAÇÃO</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {project.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <svg width="24" height="24" fill="none" stroke="var(--accent)" viewBox="0 0 24 24" strokeWidth="2" style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .other-project-card {
          position: relative;
          min-height: auto;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .other-project-card {
            position: sticky !important;
            min-height: 60svh !important;
            margin-bottom: 0;
          }
        }
        @media (min-width: 1024px) {
          .project-card-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }
      `}</style>
    </section>
  )
}
