import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function StackAndDifferentials() {
  const sectionRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<(HTMLDivElement | null)[]>([])

  const { stack: data } = content

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 768px)', () => {
      // Float / Parallax for skill tags (Desktop only to save mobile battery/fps)
      skillsRef.current.forEach((skill) => {
        if (!skill) return
        
        const speed = 0.5 + Math.random() * 1.5
        const yDist = -50 - Math.random() * 100
        
        gsap.to(skill, {
          y: yDist,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed,
          }
        })

        gsap.to(skill, {
          y: `+=${10 + Math.random() * 15}`,
          x: `+=${-5 + Math.random() * 10}`,
          rotation: -2 + Math.random() * 4,
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })
    })

    mm.add('all', () => {

      // Mask reveal for differentials
      gsap.fromTo('.diff-mask',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.differentials-list',
            start: 'top 70%',
          }
        }
      )

      // Line drawer
      gsap.fromTo('.diff-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, stagger: 0.15, ease: 'power3.inOut', transformOrigin: 'left center',
          scrollTrigger: {
            trigger: '.differentials-list',
            start: 'top 70%',
          }
        }
      )

    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
        overflow: 'hidden' // Important for parallaxing elements
      }}
    >
      <div className="container">
        <div className="stack-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8rem' }}>
          
          {/* Left — Titles & Differentials */}
          <div style={{ maxWidth: 600 }}>
            <p className="section-label" style={{ marginBottom: '2rem' }}>{data.label}</p>
            <h2 className="text-display" style={{ marginBottom: '1.5rem' }}>
              {data.title} <span className="gradient-text">{data.titleHighlight}</span>
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', marginBottom: '5rem', lineHeight: 1.8 }}>
              {data.subtitle}
            </p>

            <div className="differentials-list" style={{ display: 'flex', flexDirection: 'column' }}>
              {data.differentials.map((diff, i) => (
                <div key={i} style={{ position: 'relative', padding: '2rem 0' }}>
                  <div className="diff-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1, background: 'var(--glass-border)' }} />
                  
                  <div className="mask-text-container">
                    <h3 className="diff-mask" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      {diff.title}
                    </h3>
                  </div>
                  <div className="mask-text-container">
                    <p className="diff-mask" style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="diff-line" style={{ width: '100%', height: 1, background: 'var(--glass-border)' }} />
            </div>
          </div>

          {/* Right — Constellation of Skills */}
          <div className="skills-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ambient background glow for the skills */}
            <div style={{ position: 'absolute', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(63, 24, 171, 0.08) 0%, transparent 60%)', filter: 'blur(40px)' }} />
            
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {data.skills.map((skill, index) => {
                // Generate a pseudo-random but fixed looking layout
                const isEven = index % 2 === 0
                const col = index % 3
                const row = Math.floor(index / 3)
                
                // Adjust left position to avoid overflow on mobile
                let leftPos = 10 + (col * 30) + (isEven ? 10 : 0) + (Math.random() * 10 - 5)
                if (leftPos > 65) leftPos = 65 // Prevent overflow on the right edge
                
                const topPos = 10 + (row * 18) + (isEven ? 0 : 10) + (Math.random() * 10 - 5)

                return (
                  <div
                    key={skill.name}
                    ref={el => { skillsRef.current[index] = el }}
                    style={{
                      position: 'absolute',
                      left: `${leftPos}%`,
                      top: `${topPos}%`,
                      padding: '1rem 1.5rem',
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 100,
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      willChange: 'transform',
                      zIndex: 10 + (index % 5)
                    }}
                  >
                    <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{skill.category}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .stack-grid { grid-template-columns: 1fr; }
        .skills-container { min-height: 400px; }
        @media (min-width: 768px) { 
          .stack-grid { grid-template-columns: 1fr 1fr !important; } 
          .skills-container { min-height: 600px !important; }
        }
      `}</style>
    </section>
  )
}
