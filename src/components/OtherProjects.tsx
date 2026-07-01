import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Custom mockups for each project
const WebGestorMockup = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', gap: '1rem', padding: '1rem' }}>
    <div style={{ width: '25%', height: '100%', borderRadius: 12, background: 'rgba(63, 24, 171, 0.15)', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem' }}>
      <div style={{ width: '60%', height: 12, borderRadius: 4, background: 'rgba(63, 24, 171, 0.3)', marginBottom: '1rem' }} />
      <div style={{ width: '80%', height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
      <div style={{ width: '90%', height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
      <div style={{ width: '70%', height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '40%', height: 12, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
        <div style={{ width: 32, height: 16, borderRadius: 8, background: 'rgba(63, 24, 171, 0.2)' }} />
      </div>
      <div style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
        <div style={{ flex: 1, height: 60, borderRadius: 12, background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))', border: '1px solid rgba(255,255,255,0.02)' }} />
        <div style={{ flex: 1, height: 60, borderRadius: 12, background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))', border: '1px solid rgba(255,255,255,0.02)' }} />
        <div style={{ flex: 1, height: 60, borderRadius: 12, background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))', border: '1px solid rgba(255,255,255,0.02)' }} />
      </div>
      <div style={{ width: '100%', flex: 1, borderRadius: 12, background: 'rgba(255, 255, 255, 0.02)' }} />
    </div>
  </div>
)

const SiscoMockup = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(63, 24, 171, 0.4)' }} />
        <div style={{ width: 60, height: 12, borderRadius: 4, background: 'rgba(255, 255, 255, 0.1)' }} />
      </div>
      <div style={{ width: 80, height: 24, borderRadius: 12, background: 'rgba(63, 24, 171, 0.15)', border: '1px solid rgba(63, 24, 171, 0.3)' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ width: '100%', height: 24, borderRadius: 6, background: 'rgba(255, 255, 255, 0.02)', display: 'flex', alignItems: 'center', padding: '0 0.5rem', gap: '1rem' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)' }} />
          <div style={{ width: '30%', height: 6, borderRadius: 3, background: 'rgba(255, 255, 255, 0.05)' }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 40, height: 12, borderRadius: 6, background: i % 2 === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)' }} />
        </div>
      ))}
    </div>
  </div>
)

export default function OtherProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const pulseBgRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  const { otherProjects: data } = content
  const projects = data.items

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isDesktop || !pinContainerRef.current) return

    const mm = gsap.matchMedia(sectionRef)
    const N = projects.length

    mm.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray('.project-panel') as HTMLElement[]
      
      // Set initial states for panels (first is visible, others are hidden/pushed down)
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { y: 100, opacity: 0, filter: 'blur(10px)', scale: 0.95, pointerEvents: 'none' })
        } else {
          gsap.set(panel, { pointerEvents: 'auto' })
        }
      })

      // The timeline that controls the whole sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top top',
          end: `+=${120 * (N - 1)}%`, // Scroll distance (1.2 viewports per transition)
          pin: true,
          scrub: 1, // Smooth scrubbing linking animation directly to scroll position
          onUpdate: (self) => {
            // Update the vertical progress bar
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleY: self.progress })
            }
            
            // Calculate active index based on progress (0 to N-1)
            // e.g. for N=2, progress < 0.5 means index 0, > 0.5 means index 1
            const newIndex = Math.min(Math.floor(self.progress * N), N - 1)
            
            if (counterRef.current) {
              counterRef.current.innerText = `0${newIndex + 1}`
            }

            // Update pointer events to prevent hidden panels from blocking clicks
            panels.forEach((panel, i) => {
              panel.style.pointerEvents = i === newIndex ? 'auto' : 'none'
            })

            // Pulse background opacity based on active project
            if (pulseBgRef.current) {
              gsap.to(pulseBgRef.current, {
                opacity: newIndex % 2 === 0 ? 0.5 : 1,
                duration: 0.5,
                ease: 'power2.out'
              })
            }
          }
        }
      })

      // Build the transitions
      panels.forEach((panel, i) => {
        if (i < panels.length - 1) {
          // 1. Current panel exits
          tl.to(panel, {
            y: -100,
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.95,
            ease: 'power2.inOut'
          }, i) // Start at time = i

          // 2. Next panel enters simultaneously
          tl.to(panels[i + 1], {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            ease: 'power2.inOut'
          }, i) // Start at time = i
        }
      })
    })

    return () => mm.revert()
  }, [isDesktop, projects.length])

  // Mobile rendering (vertical stack with whileInView)
  if (!isDesktop) {
    return (
      <section id="projetos-outros" style={{ padding: 'var(--section-spacing) 0', position: 'relative' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
          <h2 className="text-display" style={{ marginBottom: '4rem' }}>{data.title}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div style={{
                  width: '100%', aspectRatio: '16/9', borderRadius: 24,
                  background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
                  overflow: 'hidden', position: 'relative'
                }}>
                  {i === 0 ? <WebGestorMockup /> : <SiscoMockup />}
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {project.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {project.description}
                  </p>
                  
                  {project.stat && (
                    <div style={{ marginBottom: '1.5rem' }}>
                       <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, display: 'block' }}>
                        {project.stat.value}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {project.stat.label}
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                    Acessar <span style={{ marginLeft: '0.5rem' }}>↗</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop rendering (Cinematic Scrub Scroll)
  return (
    <section ref={sectionRef} id="projetos-outros" style={{ position: 'relative' }}>
      
      {/* Pinned Container - GSAP handles the padding/spacer automatically! */}
      <div 
        ref={pinContainerRef}
        style={{ 
          height: '100dvh', 
          width: '100vw', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background pulse */}
        <div 
          ref={pulseBgRef}
          style={{ 
            position: 'absolute', inset: 0, 
            background: 'radial-gradient(circle at 75% 50%, rgba(63, 24, 171, 0.06), transparent 50%)',
            opacity: 0.5,
            pointerEvents: 'none'
          }} 
        />

        <div className="container" style={{ height: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', height: '100%', alignItems: 'center' }}>
            
            {/* Left Column (Fixed Info) */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '50vh', justifyContent: 'center' }}>
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
              <h2 className="text-display" style={{ marginBottom: '4rem' }}>{data.title}</h2>
              
              {/* Progress Indicator */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginTop: 'auto' }}>
                <div style={{ position: 'relative', width: 2, height: 120, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                  <div 
                    ref={progressBarRef}
                    style={{ 
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                      background: 'linear-gradient(180deg, var(--accent), var(--accent-light))',
                      transformOrigin: 'top', transform: 'scaleY(0)',
                      borderRadius: 2
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span ref={counterRef} style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                    01
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                    / 0{projects.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Absolute Overlaid Panels) */}
            <div style={{ position: 'relative', height: '70vh', width: '100%' }}>
              
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="project-panel"
                  style={{ 
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', gap: '2rem',
                    justifyContent: 'center',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {/* Mockup */}
                  <div 
                    style={{ 
                      width: '100%', height: 260, borderRadius: 24,
                      background: 'var(--bg-surface)', border: '1px solid var(--glass-border)',
                      overflow: 'hidden', position: 'relative',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }}
                  >
                    {index === 0 ? <WebGestorMockup /> : <SiscoMockup />}
                  </div>

                  <div>
                    {/* Title */}
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', position: 'relative', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                      {project.name}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: '60%', background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                    </h3>

                    {/* Description & Stat */}
                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                      <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 400, flex: 1 }}>
                        {project.description}
                      </p>
                      
                      {project.stat && (
                        <div style={{ flexShrink: 0, paddingLeft: '2rem', borderLeft: '1px solid var(--glass-border)' }}>
                          <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, display: 'block', marginBottom: '0.25rem', lineHeight: 1 }}>
                            {project.stat.value}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {project.stat.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tech & CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
                        {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '1rem 2rem', flexShrink: 0 }}>
                        Acessar <span style={{ marginLeft: '0.5rem' }}>↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
