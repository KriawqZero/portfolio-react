import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const stepIcons = [
  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L12 17.25 6.43 14.25m11.14 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25" /></svg>,
  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
]

export default function DevProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const { process: data } = content

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !trackRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const totalScroll = track.scrollWidth - window.innerWidth

      // Main horizontal scroll
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Progress line drawing based on horizontal scroll
      if (progressLineRef.current) {
        gsap.fromTo(progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalScroll}`,
              scrub: true,
            }
          }
        )
      }

      // Parallax inner items slightly as they scroll horizontally
      gsap.utils.toArray('.process-card').forEach((card: any) => {
        gsap.to(card, {
          y: () => -50 + Math.random() * 100, // Float up/down slightly
          rotation: () => -5 + Math.random() * 10,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 2,
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  // Mobile: vertical layout
  if (isMobile) {
    return (
      <section id="processo" style={{ padding: 'var(--section-spacing) 0', position: 'relative' }}>
        <div className="container">
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
          <h2 className="text-display" style={{ marginBottom: '4rem' }}>{data.title}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {data.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  padding: 'clamp(1.25rem, 5vw, 2rem)',
                  borderRadius: 16,
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  position: 'relative',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 800,
                  color: 'rgba(0,0,0,0.03)',
                  position: 'absolute',
                  top: 12,
                  right: 'clamp(1rem, 4vw, 1.5rem)',
                }}>
                  {step.number}
                </span>
                <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>{stepIcons[i]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop: horizontal sticky scroll
  return (
    <section
      ref={sectionRef}
      id="processo"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Background color handled by global App.tsx ScrollTrigger
      }}
    >
      {/* Background connector line */}
      <div style={{ position: 'absolute', top: '50%', left: '50vw', width: '200vw', height: 2, background: 'rgba(0,0,0,0.05)', zIndex: 0 }} />
      <div 
        ref={progressLineRef} 
        style={{ 
          position: 'absolute', top: '50%', left: '50vw', width: '200vw', height: 2, 
          background: 'linear-gradient(90deg, var(--accent), var(--accent-light))', 
          zIndex: 1,
          transformOrigin: 'left center'
        }} 
      />

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100dvh',
          width: 'fit-content',
          willChange: 'transform',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Intro panel */}
        <div style={{
          width: '50vw',
          minWidth: 600,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 'var(--container-padding)',
          paddingRight: '6rem',
          flexShrink: 0,
        }}>
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>{data.label}</p>
          <h2 className="text-display" style={{ marginBottom: '1rem' }}>{data.title}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', maxWidth: 480 }}>
            Cada projeto segue um processo pensado para entregar qualidade em cada etapa, do planejamento ao deploy.
          </p>

          {/* Scroll indicator */}
          <div style={{
            marginTop: '4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>role para avançar</span>
          </div>
        </div>

        {/* Step panels */}
        {data.steps.map((step, i) => (
          <div
            key={step.number}
            style={{
              width: '45vw',
              minWidth: 450,
              height: '100dvh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '2rem',
            }}
          >
            <div 
              className="process-card"
              style={{
                width: '100%',
                maxWidth: 480,
                padding: '4rem',
                borderRadius: 32,
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(63, 24, 171, 0.12) 0%, transparent 60%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 8vw, 8rem)',
                fontWeight: 800,
                color: 'rgba(0,0,0,0.03)',
                position: 'absolute',
                top: -20,
                right: 20,
                lineHeight: 1,
              }}>
                {step.number}
              </span>

              <div style={{ color: 'var(--accent)', marginBottom: '2rem' }}>
                {stepIcons[i]}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
              }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div style={{ width: '20vw', flexShrink: 0 }} />
      </div>
    </section>
  )
}
