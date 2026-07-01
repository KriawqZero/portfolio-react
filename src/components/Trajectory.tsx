import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'
import ArchiveOverlay from './ArchiveOverlay'

gsap.registerPlugin(ScrollTrigger)

export default function Trajectory() {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)
  const activeEraIdRef = useRef(content.trajectory.eras[0].id)

  const { trajectory: data } = content

  // Flatten all projects with era info
  const allProjects = data.eras.flatMap(era =>
    era.projects.map(p => ({ ...p, era }))
  )
  const N = allProjects.length

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isDesktop || !pinContainerRef.current) return

    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray('.traj-panel') as HTMLElement[]
      const eraLabels = gsap.utils.toArray('.era-label') as HTMLElement[]
      const eraVisuals = gsap.utils.toArray('.era-visual') as HTMLElement[]

      // Set initial states
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { y: 100, opacity: 0, filter: 'blur(10px)', pointerEvents: 'none' })
        } else {
          gsap.set(panel, { pointerEvents: 'auto' })
        }
      })

      eraLabels.forEach((label, i) => {
        if (i > 0) gsap.set(label, { opacity: 0, y: 20 })
      })

      eraVisuals.forEach((visual, i) => {
        if (i > 0) gsap.set(visual, { opacity: 0 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'trajectory-pin',
          trigger: pinContainerRef.current,
          start: 'top top',
          end: `+=${70 * (N - 1)}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleY: self.progress })
            }

            const activeIndex = Math.min(Math.floor(self.progress * N), N - 1)
            const activeProject = allProjects[activeIndex]

            if (activeProject && activeProject.era.id !== activeEraIdRef.current) {
              activeEraIdRef.current = activeProject.era.id

              // Update fast travel buttons opacity without triggering re-render
              document.querySelectorAll('.era-nav-btn').forEach((btn) => {
                (btn as HTMLElement).style.opacity = '0.3'
              })
              const activeBtn = document.querySelector(`.era-nav-${activeProject.era.id}`)
              if (activeBtn) {
                (activeBtn as HTMLElement).style.opacity = '1'
              }
            }

            // Update mini-steppers
            if (activeProject) {
              const safeName = activeProject.name.replace(/[^a-zA-Z0-9]/g, '-')
              document.querySelectorAll('.project-stepper').forEach(el => {
                (el as HTMLElement).style.opacity = '0.2';
                (el as HTMLElement).style.width = '8px';
                (el as HTMLElement).style.background = 'var(--text-muted)';
              })
              const activeStepper = document.querySelector(`.project-stepper-${safeName}`)
              if (activeStepper) {
                (activeStepper as HTMLElement).style.opacity = '1';
                (activeStepper as HTMLElement).style.width = '24px';
                (activeStepper as HTMLElement).style.background = 'var(--text-primary)';
              }
            }

            if (counterRef.current) {
              counterRef.current.innerText = String(activeIndex + 1).padStart(2, '0')
            }

            panels.forEach((panel, i) => {
              panel.style.pointerEvents = i === activeIndex ? 'auto' : 'none'
            })
          }
        }
      })

      panels.forEach((panel, i) => {
        if (i < panels.length - 1) {
          // Exit current
          tl.to(panel, {
            y: -80,
            opacity: 0,
            filter: 'blur(6px)',
            ease: 'power2.inOut'
          }, i)

          // Enter next
          tl.to(panels[i + 1], {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.inOut'
          }, i)

          // Era transitions
          const currEraId = allProjects[i]?.era.id
          const nextEraId = allProjects[i + 1]?.era.id

          if (currEraId !== nextEraId) {
            // Find era indices
            const currEraIdx = data.eras.findIndex(e => e.id === currEraId)
            const nextEraIdx = data.eras.findIndex(e => e.id === nextEraId)

            // Shift glow
            if (glowRef.current) {
              tl.to(glowRef.current, {
                background: `radial-gradient(circle at 75% 50%, ${allProjects[i + 1].era.glowColor}, transparent 50%)`,
                duration: 0.5
              }, i)
            }

            // Crossfade labels
            if (eraLabels[currEraIdx]) {
              tl.to(eraLabels[currEraIdx], { opacity: 0, y: -20, duration: 0.4 }, i)
            }
            if (eraLabels[nextEraIdx]) {
              tl.to(eraLabels[nextEraIdx], { opacity: 0.02, y: 0, duration: 0.4 }, i + 0.2)
            }

            // Crossfade visuals
            if (eraVisuals[currEraIdx]) {
              tl.to(eraVisuals[currEraIdx], { opacity: 0, duration: 0.5 }, i)
            }
            if (eraVisuals[nextEraIdx]) {
              tl.to(eraVisuals[nextEraIdx], { opacity: 1, duration: 0.5 }, i + 0.2)
            }
          }
        }
      })

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2

        gsap.to('.parallax-bg', {
          x: x * 40,
          y: y * 40,
          ease: 'power2.out',
          duration: 1.5
        })

        gsap.to('.parallax-fg', {
          x: x * -15,
          y: y * -15,
          ease: 'power2.out',
          duration: 1.5
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    })

    return () => mm.revert()
  }, [isDesktop, N, allProjects, data.eras])

  const handleFastTravel = (eraId: string) => {
    const st = ScrollTrigger.getById('trajectory-pin')
    if (!st) return

    const projectIndex = allProjects.findIndex(p => p.era.id === eraId)
    if (projectIndex === -1) return

    const targetScroll = st.start + (projectIndex * window.innerHeight * 0.8)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  /* const handleSkip = () => {
    const st = ScrollTrigger.getById('trajectory-pin')
    if (!st) return
    window.scrollTo({
      top: st.end + 10,
      behavior: 'smooth'
    })
  } */

  // Mobile rendering (vertical stack)
  if (!isDesktop) {
    return (
      <section id="projetos" style={{ padding: 'var(--section-spacing) 0', position: 'relative' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
          <h2 className="text-display" style={{ marginBottom: '4rem' }}>{data.title} <span className="gradient-text">{data.titleHighlight}</span></h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {data.eras.map((era) => (
              <div key={era.id} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{era.name}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{era.subtitle}</p>
                </div>

                {era.projects.map((project) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.8 }}
                  >
                    {'type' in project && project.type && (
                      <span style={{
                        display: 'inline-block',
                        width: 'fit-content',
                        padding: '0.25rem 0.5rem',
                        marginBottom: '0.75rem',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '4px',
                        fontFamily: 'monospace'
                      }}>
                        {project.type}
                      </span>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {project.name}
                      </h4>
                      <span className="section-label">{project.year}</span>
                    </div>

                    <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                      {project.narrative}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em', fontStyle: 'italic', marginBottom: '2rem' }}>
                      {project.stack}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                      {'stat' in project && project.stat && (
                        <div>
                          <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, display: 'block' }}>
                            {project.stat.value}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {project.stat.label}
                          </span>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {'links' in project && project.links ? (
                          (project.links as { label: string, href: string }[]).map((link, idx) => (
                            <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: 'var(--text-xs)' }}>
                              {link.label} <span style={{ marginLeft: '0.5rem' }}>↗</span>
                            </a>
                          ))
                        ) : 'link' in project && project.link ? (
                          <a href={project.link as string} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                            Acessar <span style={{ marginLeft: '0.5rem' }}>↗</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile Archive Trigger */}
          <div style={{ padding: '4rem 0 2rem 0', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => setIsArchiveOpen(true)}
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid var(--glass-border)',
                borderRadius: '100px',
                padding: '1rem 2rem',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              Explorar Arquivo Completo ↗
            </button>
          </div>
        </div>
        <ArchiveOverlay isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />
      </section>
    )
  }

  // Desktop rendering (Cinematic Layers)
  return (
    <section ref={sectionRef} id="projetos" style={{ position: 'relative' }}>
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
        {/* ========================================================= */}
        {/* LAYER 0: Fundo Ambiental e Glows                          */}
        {/* ========================================================= */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div
            ref={glowRef}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 75% 50%, ${data.eras[0].glowColor}, transparent 50%)`,
              opacity: 0.6,
            }}
          />

          {/* Surface Grid */}
          <div className="era-visual" style={{ position: 'absolute', inset: 0, opacity: 1, backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '100px 100px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)' }} />

          {/* Infra Logs */}
          <div className="era-visual" style={{ position: 'absolute', inset: 0, opacity: 0, padding: '4rem', fontFamily: 'monospace', color: 'rgba(16, 185, 129, 0.3)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
            {Array.from({ length: 40 }).map((_, i) => <div key={i}>[WORKER-{Math.floor(Math.random() * 9999)}] SYNC STORE_{Math.floor(Math.random() * 99)} OK - EXTRACTED {Math.floor(Math.random() * 50)} RECORDS {Date.now() - i * 1000}ms</div>)}
          </div>

          {/* LowLevel Wireframe */}
          <div className="era-visual" style={{ position: 'absolute', inset: 0, opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40vw', height: '40vw', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50%', transform: 'rotateX(75deg) rotateY(15deg) rotateZ(45deg)', position: 'absolute' }} />
            <div style={{ width: '30vw', height: '30vw', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50%', transform: 'rotateX(75deg) rotateY(15deg) rotateZ(45deg)', position: 'absolute' }} />
            <div style={{ width: '20vw', height: '20vw', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50%', transform: 'rotateX(75deg) rotateY(15deg) rotateZ(45deg)', position: 'absolute' }} />
          </div>

          {/* Roots Terminal */}
          <div className="era-visual" style={{ position: 'absolute', inset: 0, opacity: 0, padding: '4rem', fontFamily: 'monospace', color: 'rgba(245, 158, 11, 0.4)', fontSize: '14px', whiteSpace: 'pre-line' }}>
            {`C:\\marcilinho\\PythonP\\Player> python main.py
[INFO] Loading dependencies...
[INFO] Found 342 .mp3 files
[INFO] Starting Kivy UI
C:\\Users\\Marcilio\\Desktop\\vbmod> gradlew build
:compileJava
:processResources
:classes
:jar
BUILD SUCCESSFUL`}
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 1: Texto Decorativo Gigante                         */}
        {/* ========================================================= */}
        <div className="parallax-bg" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1, overflow: 'hidden', willChange: 'transform' }}>
          {data.eras.map((era, i) => (
            <div
              key={era.id}
              className="era-label"
              style={{
                position: 'absolute',
                fontFamily: 'var(--font-display)',
                fontSize: '15vw',
                fontWeight: 900,
                color: 'var(--text-primary)',
                opacity: i === 0 ? 0.02 : 0,
                whiteSpace: 'nowrap',
                letterSpacing: '-0.05em',
                userSelect: 'none'
              }}
            >
              {era.name.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* LAYER 2: Conteúdo Interativo                              */}
        {/* ========================================================= */}
        <div className="container" style={{ height: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', height: '100%', alignItems: 'center' }}>

            {/* Coluna Esquerda: Títulos e Progresso */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '60vh', justifyContent: 'center' }}>
              <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
              <h2 className="text-display" style={{ marginBottom: '2rem' }}>{data.title} <span className="gradient-text">{data.titleHighlight}</span></h2>

              {/* Interactive Index (Fast Travel) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {data.eras.map((era, index) => {
                  const isInitialActive = index === 0;

                  return (
                    <div key={era.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <button
                        className={`era-nav-btn era-nav-${era.id}`}
                        onClick={() => handleFastTravel(era.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          color: 'var(--text-primary)',
                          opacity: isInitialActive ? 1 : 0.3,
                          transition: 'opacity 0.3s ease',
                          cursor: 'pointer',
                          padding: 0,
                          width: 'fit-content'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => {
                          if (activeEraIdRef.current !== era.id) e.currentTarget.style.opacity = '0.3'
                        }}
                      >
                        {era.name}
                      </button>

                      {/* Mini-stepper */}
                      <div style={{ display: 'flex', gap: '0.35rem', paddingLeft: '2px' }}>
                        {era.projects.map((p, pIdx) => {
                          const isProjectInitialActive = index === 0 && pIdx === 0;
                          const safeName = p.name.replace(/[^a-zA-Z0-9]/g, '-')
                          return (
                            <div
                              key={p.name}
                              className={`project-stepper project-stepper-${safeName}`}
                              style={{
                                height: '4px',
                                width: isProjectInitialActive ? '24px' : '8px',
                                background: isProjectInitialActive ? 'var(--text-primary)' : 'var(--text-muted)',
                                borderRadius: '2px',
                                opacity: isProjectInitialActive ? 1 : 0.2,
                                transition: 'all 0.3s ease'
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                <div style={{ position: 'relative', width: 2, height: 120, background: 'rgba(0,0,0,0.06)', borderRadius: 2 }}>
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
                    / {String(N).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Extras (Desktop Bottom Nav) */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <button
                  onClick={() => setIsArchiveOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)'
                  }}>+</span>
                  Explorar Arquivo Completo
                </button>
              </div>
            </div>

            {/* Coluna Direita: Painéis de Projeto */}
            <div className="parallax-fg" style={{ position: 'relative', height: '60vh', width: '100%', willChange: 'transform' }}>
              {allProjects.map((project) => (
                <div
                  key={project.name}
                  className="traj-panel"
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {'type' in project && project.type && (
                    <span style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      padding: '0.25rem 0.625rem',
                      marginBottom: '1rem',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '4px',
                      fontFamily: 'monospace'
                    }}>
                      {project.type}
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {project.name}
                    </h3>
                    <span className="section-label" style={{ color: 'var(--text-muted)' }}>{project.year}</span>
                  </div>

                  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '90%' }}>
                    {project.narrative}
                  </p>

                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em', fontStyle: 'italic', marginBottom: '3rem' }}>
                    {project.stack}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    {'stat' in project && project.stat ? (
                      <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid var(--glass-border)' }}>
                        <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, display: 'block', lineHeight: 1, marginBottom: '0.25rem' }}>
                          {project.stat.value}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {project.stat.label}
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '50%' }}>
                      {'links' in project && project.links ? (
                        (project.links as { label: string, href: string }[]).map((link, idx) => (
                          <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: 'var(--text-sm)' }}>
                            {link.label} <span style={{ marginLeft: '0.5rem' }}>↗</span>
                          </a>
                        ))
                      ) : 'link' in project && project.link ? (
                        <a href={project.link as string} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '1rem 2rem' }}>
                          Explorar <span style={{ marginLeft: '0.5rem' }}>↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <ArchiveOverlay isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} />
    </section>
  )
}
