import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const mockupContainerRef = useRef<HTMLDivElement>(null)
  const mockupInnerRef = useRef<HTMLDivElement>(null)

  const { featuredProject: data } = content
  const p = data.project

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 768px)', () => {
      // Decorative number parallax
      if (numberRef.current) {
        gsap.to(numberRef.current, {
          y: -150,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Pin text column when it reaches the top of the viewport
      ScrollTrigger.create({
        trigger: textColRef.current,
        start: 'top top',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false, // Right column controls the height natively
      })

      // Mockup cinematic zoom and parallax
      if (mockupContainerRef.current && mockupInnerRef.current) {
        gsap.to(mockupContainerRef.current, {
          scale: 1.15,
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        })
        
        gsap.to(mockupInnerRef.current, {
          y: -100,
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        })
      }
    })

    mm.add('all', () => {
      // Reveal animations for text content (all devices)
      gsap.fromTo('.fp-mask', 
        { y: '100%' }, 
        { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
      
      gsap.fromTo('.fp-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="featured-section"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
      }}
    >
      <span ref={numberRef} className="section-number" style={{ position: 'absolute', top: 0, left: '-2%' }}>
        {data.number}
      </span>

      <div className="container" style={{ position: 'relative', height: '100%' }}>
        <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(4rem, 10vw, 8rem)', height: '100%' }}>
          
          {/* Left — Text Content */}
          <div ref={textColRef} className="featured-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 600 }}>
            <div className="mask-text-container" style={{ marginBottom: '2rem' }}>
              <p className="section-label mask-text fp-mask">{data.label}</p>
            </div>

            <div className="mask-text-container" style={{ marginBottom: '1rem' }}>
              <h2 className="text-display mask-text fp-mask" style={{ fontSize: 'var(--text-hero)' }}>
                {p.name}
              </h2>
            </div>

            <div className="mask-text-container" style={{ marginBottom: '2rem' }}>
              <p className="mask-text fp-mask" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--accent-light)', fontWeight: 500 }}>
                {p.tagline}
              </p>
            </div>

            <p className="fp-fade" style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
              {p.description}
            </p>

            <div className="fp-fade" style={{ display: 'flex', gap: '3rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {p.stats.map((stat, i) => (
                <div key={i}>
                  <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="fp-fade" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
            </div>

            {p.link && (
              <div className="fp-fade">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '1.25rem 3rem' }}>
                  Explorar plataforma
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            )}
          </div>

          {/* Right — Mockup */}
          <div className="featured-mockup-col" style={{ display: 'flex', alignItems: 'center' }}>
            <div 
              ref={mockupContainerRef}
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 32,
                background: 'linear-gradient(135deg, rgba(63, 24, 171, 0.08), rgba(63, 24, 171, 0.02))',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                transformOrigin: 'center center'
              }}
            >
              {/* This inner div simulates the image that shifts faster than the container */}
              <div 
                ref={mockupInnerRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: p.image ? 'none' : 'radial-gradient(circle at 50% 30%, rgba(63, 24, 171, 0.15), transparent 60%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p.image ? (
                  <img src={p.image} alt={`${p.name} Interface`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'rgba(255,255,255,0.03)', transform: 'rotate(-5deg)' }}>
                    {p.name} UI
                  </span>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .featured-section { min-height: auto; }
        .featured-text-col { height: auto; padding-top: 4rem; }
        .featured-mockup-col { padding: 4rem 0; }

        @media (min-width: 768px) {
          .featured-grid { grid-template-columns: 1fr 1.2fr !important; }
          .featured-section { min-height: 200dvh; }
          .featured-text-col { height: 100dvh; padding-top: 0; }
          .featured-mockup-col { padding-top: 50dvh; padding-bottom: 50dvh; }
        }
        @media (max-width: 767px) {
          .featured-grid { gap: 3rem !important; }
          .featured-mockup-col { padding: 0 0 4rem 0; }
        }
      `}</style>
    </section>
  )
}
