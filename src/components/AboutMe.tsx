import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)

  const { about: data } = content

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

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

      // Pin the Art element (Desktop only)
      if (artRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: artRef.current,
          pinSpacing: false,
        })
        
        // Gentle rotation while scrolling
        gsap.to(artRef.current, {
          rotation: 15,
          scale: 1.05,
          filter: 'blur(0px)',
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
      // Reveal text
      gsap.fromTo('.about-mask', 
        { y: '100%' }, 
        { y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      )

      gsap.fromTo('.about-fade',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' }
        }
      )

      // Stat counters
      const statElements = document.querySelectorAll('.stat-number')
      statElements.forEach((el) => {
        const targetValue = parseFloat(el.getAttribute('data-val') || '0')
        if (targetValue > 0) {
          gsap.fromTo(el,
            { innerHTML: 0 },
            { 
              innerHTML: targetValue,
              duration: 2,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 80%' },
              snap: { innerHTML: 1 },
              onUpdate: function() {
                const prefix = el.getAttribute('data-prefix') || ''
                el.innerHTML = prefix + Math.round(this.targets()[0].innerHTML)
              }
            }
          )
        }
      })

    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="about-section"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
        background: '#030407', // Slightly darker to blend with App.tsx storytelling
        overflow: 'hidden',
      }}
    >
      <span ref={numberRef} className="section-number" style={{ position: 'absolute', top: 0, right: '-2%' }}>
        {data.number}
      </span>

      <div className="container">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8rem', position: 'relative' }}>
          
          {/* Left Column — Text & Stats */}
          <div className="about-text-col" style={{ maxWidth: 600, zIndex: 10 }}>
            <div className="mask-text-container" style={{ marginBottom: '2.5rem' }}>
              <p className="section-label mask-text about-mask">{data.label}</p>
            </div>

            <h2 style={{ marginBottom: '4rem' }}>
              <div className="mask-text-container">
                <span className="text-display mask-text about-mask" style={{ display: 'block' }}>{data.title}</span>
              </div>
              <div className="mask-text-container">
                <span className="text-display gradient-text mask-text about-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                  {data.titleHighlight}
                </span>
              </div>
            </h2>

            <p className="about-fade" style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '5rem', paddingLeft: '2rem', borderLeft: '1px solid var(--glass-border)' }}>
              {data.text}
            </p>

            <div ref={statsContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {data.stats.map((stat, i) => {
                const numOnly = stat.value.replace(/[^0-9.]/g, '')
                const prefix = stat.value.replace(/[0-9.].*/g, '')
                const isInfinity = stat.value === '∞'
                
                return (
                  <div key={i} className="about-fade" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ width: 120, flexShrink: 0 }}>
                      <span 
                        className={`gradient-text ${!isInfinity ? 'stat-number' : ''}`}
                        data-val={numOnly}
                        data-prefix={prefix}
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1, display: 'block' }}
                      >
                        {isInfinity ? '∞' : '0'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                        {stat.label}
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                        {stat.sublabel}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="about-fade" style={{ marginTop: '5rem' }}>
              <a href="#processo" className="link-underline" style={{ fontSize: 'var(--text-base)', color: 'var(--accent-light)', fontWeight: 500, letterSpacing: '0.05em' }}>
                {data.cta} <span style={{ marginLeft: '0.5rem' }}>↓</span>
              </a>
            </div>
          </div>

          {/* Right Column — Pinned MO Art */}
          <div className="about-art-col">
            <div 
              ref={artRef}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(63, 24, 171, 0.08) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'blur(20px)',
                willChange: 'transform, filter'
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 20rem)', fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.05em' }}>MO</span>
              
              {/* Orbital rings */}
              <div style={{ position: 'absolute', inset: '10%', border: '1px solid rgba(63, 24, 171, 0.15)', borderRadius: '50%', borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
              <div style={{ position: 'absolute', inset: '20%', border: '1px dashed rgba(63, 24, 171, 0.08)', borderRadius: '50%', transform: 'rotate(45deg)' }} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section { min-height: auto; }
        .about-text-col { padding-top: 0; padding-bottom: 0; }
        .about-art-col {
          position: absolute;
          right: -20%;
          top: 10%;
          width: 100%;
          opacity: 0.3;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        @media (min-width: 1024px) { 
          .about-section { min-height: 150svh; }
          .about-text-col { padding-top: 10svh; padding-bottom: 30svh; }
          .about-grid { grid-template-columns: 1.2fr 0.8fr !important; } 
          .about-art-col { 
            position: static; 
            opacity: 1;
            height: 100svh;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
