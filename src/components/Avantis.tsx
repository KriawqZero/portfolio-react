import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Avantis() {
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  const { avantis: data } = content

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    // General reveals (both mobile and desktop)
    mm.add('all', () => {
      gsap.fromTo('.avantis-mask',
        { y: '100%' },
        {
          y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      )

      gsap.fromTo('.avantis-fade',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' }
        }
      )
    })

    // Desktop: Pin text and scroll logo
    mm.add('(min-width: 1024px)', () => {
      if (numberRef.current) {
        gsap.to(numberRef.current, {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Pin the left text column when it reaches the top
      ScrollTrigger.create({
        trigger: textColRef.current,
        start: 'top top',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })

      // Elegant Logo reveal on scroll
      if (logoContainerRef.current) {
        gsap.fromTo(logoContainerRef.current,
          { opacity: 0.2, filter: 'blur(20px)', scale: 0.8 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            scrollTrigger: {
              trigger: logoContainerRef.current,
              start: 'top 75%',
              end: 'center center',
              scrub: 1,
            }
          }
        )
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="avantis"
      className="avantis-section"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
        overflow: 'hidden',
      }}
    >
      <span ref={numberRef} className="section-number" style={{ position: 'absolute', top: 0, right: '-2%' }}>
        {data.number}
      </span>

      <div className="container" style={{ position: 'relative', height: '100%' }}>
        <div className="avantis-grid" style={{ display: 'grid', gap: 'clamp(4rem, 10vw, 8rem)', height: '100%' }}>
          
          {/* Left — Text Content */}
          <div ref={textColRef} className="avantis-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 600 }}>
            <div className="mask-text-container" style={{ marginBottom: '1rem' }}>
              <p className="section-label mask-text avantis-mask">{data.label}</p>
            </div>

            <h2 style={{ marginBottom: '1rem' }}>
              <div className="mask-text-container">
                <span className="text-display mask-text avantis-mask" style={{ display: 'block' }}>{data.title}</span>
              </div>
              <div className="mask-text-container">
                <span className="text-display gradient-text mask-text avantis-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                  {data.titleHighlight}
                </span>
              </div>
            </h2>



            <p className="avantis-fade" style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', lineHeight: 1.5, paddingLeft: '1.5rem', borderLeft: '1px solid var(--glass-border)' }}>
              {data.text}
            </p>

            {/* Mini Business Card / Links */}
            <div className="avantis-fade" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
              <div>
                <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                  Avantis
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Marca utilizada nos meus projetos freelance e trabalhos para clientes.
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                {data.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="avantis-card-link"
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
                      fontSize: 'var(--text-sm)', color: 'var(--text-muted)', 
                      width: 'fit-content', transition: 'all 0.3s var(--ease-cinematic)' 
                    }}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — The Avantis Logo/Identity */}
          <div className="avantis-logo-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div 
              ref={logoContainerRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Glassmorphism backing for the logo */}
              <div style={{
                position: 'absolute',
                inset: '-10%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />
              
              <img 
                src="/avantis-logo.png" 
                alt="Avantis" 
                style={{
                  width: '60%',
                  height: 'auto',
                  filter: 'drop-shadow(0px 20px 40px rgba(139, 92, 246, 0.2))',
                }} 
              />
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .avantis-section { min-height: auto; }
        .avantis-text-col { height: auto; padding-top: 0; padding-bottom: 2rem; }
        .avantis-logo-col { padding: 4rem 0; }
        .avantis-grid { grid-template-columns: 1fr; }

        @media (min-width: 1024px) {
          .avantis-grid { grid-template-columns: 1fr 1.2fr !important; }
          .avantis-section { min-height: 200svh; padding-top: 0; }
          .avantis-text-col { height: 100svh; padding-top: 0; }
          .avantis-logo-col { padding-top: 50svh; padding-bottom: 50svh; }
        }

        @media (hover: hover) and (pointer: fine) {
          .avantis-card-link:hover {
            color: var(--text-primary) !important;
            transform: translateX(4px);
          }
        }
      `}</style>
    </section>
  )
}
