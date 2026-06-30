import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
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

      // Pin text column when it reaches the top
      ScrollTrigger.create({
        trigger: textColRef.current,
        start: 'top top',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      })

      // Gentle rotation of background Art
      if (artRef.current) {
        gsap.to(artRef.current, {
          rotation: 15,
          scale: 1.05,
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
        {
          y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
        }
      )

      gsap.fromTo('.about-fade',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 50%' }
        }
      )

      // Stats Micro-animations
      gsap.utils.toArray('.stat-item').forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        )
      })

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
              onUpdate: function () {
                const prefix = el.getAttribute('data-prefix') || ''
                const suffix = el.getAttribute('data-suffix') || ''
                el.innerHTML = prefix + Math.round(this.targets()[0].innerHTML) + suffix
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
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(4rem, 8vw, 8rem)', position: 'relative' }}>

          {/* Left Column — Text */}
          <div ref={textColRef} className="about-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 600, zIndex: 10 }}>
            <div className="mask-text-container" style={{ marginBottom: '1rem' }}>
              <p className="section-label mask-text about-mask">{data.label}</p>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>
              <div className="mask-text-container">
                <span className="text-display mask-text about-mask" style={{ display: 'block' }}>{data.title}</span>
              </div>
              <div className="mask-text-container">
                <span className="text-display gradient-text mask-text about-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                  {data.titleHighlight}
                </span>
              </div>
            </h2>

            <p className="about-fade" style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem', maxWidth: '90%', paddingLeft: '1.5rem', borderLeft: '1px solid var(--glass-border)' }}>
              {data.text}
            </p>

            <div className="about-fade" style={{ marginTop: '0.5rem' }}>
              <a href="#processo" className="link-underline" style={{ fontSize: 'var(--text-base)', color: 'var(--accent-light)', fontWeight: 500, letterSpacing: '0.05em' }}>
                {data.cta} <span style={{ marginLeft: '0.5rem' }}>↓</span>
              </a>
            </div>
          </div>

          {/* Right Column — Scrolling Stats */}
          <div className="about-stats-col" style={{ display: 'flex', alignItems: 'center', zIndex: 10 }}>
            <div ref={statsContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
              {data.stats.map((stat, i) => {
                const numOnly = stat.value.replace(/[^0-9.]/g, '')
                const prefix = stat.value.replace(/[0-9.].*/g, '')
                const suffix = stat.value.replace(/^[^0-9.]*[0-9.]*/, '')
                const isInfinity = stat.value === '∞'

                return (
                  <div key={i} className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ minWidth: 'clamp(140px, 15vw, 220px)', flexShrink: 0 }}>
                      <span
                        className={`gradient-text ${!isInfinity ? 'stat-number' : ''}`}
                        data-val={numOnly}
                        data-prefix={prefix}
                        data-suffix={suffix}
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
          </div>

          {/* Background Ambient MO Art */}
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
              <img src="/logo-simple.svg" alt="MO" style={{ width: 'clamp(200px, 30vw, 400px)', opacity: 0.1, userSelect: 'none', pointerEvents: 'none', position: 'relative', filter: 'grayscale(1)' }} />

              {/* Orbital rings */}
              <div style={{ position: 'absolute', inset: '10%', border: '1px solid rgba(63, 24, 171, 0.15)', borderRadius: '50%', borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
              <div style={{ position: 'absolute', inset: '20%', border: '1px dashed rgba(63, 24, 171, 0.08)', borderRadius: '50%', transform: 'rotate(45deg)' }} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section { min-height: auto; }
        .about-text-col { height: auto; padding-top: 0; padding-bottom: 2rem; }
        .about-stats-col { padding-top: 2rem; padding-bottom: 4rem; }
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
          .about-section { min-height: 200dvh; }
          .about-text-col { height: 100dvh; padding-top: 0; padding-bottom: 0; }
          .about-stats-col { padding-top: 50dvh; padding-bottom: 50dvh; }
          .about-grid { grid-template-columns: 1fr 1fr !important; gap: 4rem !important; } 
          .about-art-col { 
            right: -10%;
            top: 20%;
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  )
}
