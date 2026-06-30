import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const contactIcons: Record<string, React.ReactNode> = {
  email: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  linkedin: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  github: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
  resume: <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { contact: data } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax number
      if (numberRef.current) {
        gsap.to(numberRef.current, {
          y: -100,
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // Massive MO Art rising up from the bottom
      if (artRef.current) {
        gsap.fromTo(artRef.current,
          { y: 300, scale: 0.8, opacity: 0 },
          {
            y: 0, scale: 1, opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 1,
            }
          }
        )
      }

      // Form float in
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
            }
          }
        )
      }

      // Link staggers
      gsap.fromTo('.contact-link',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          }
        }
      )

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const links = Object.entries(data.links) as [string, { label: string; value: string; href: string }][]

  return (
    <section
      ref={sectionRef}
      id="contato"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
        overflow: 'hidden',
        // Background blends back naturally as part of App.tsx
      }}
    >
      <span ref={numberRef} className="section-number" style={{ position: 'absolute', top: '0', left: '-2%' }}>
        {data.number}
      </span>

      {/* Massive MO Art glow at the bottom center */}
      <div
        ref={artRef}
        style={{
          position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '100vw', height: '100vw', maxWidth: 1000, maxHeight: 1000,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63, 24, 171, 0.15) 0%, transparent 60%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(0px)',
          willChange: 'transform, filter'
        }}
      >
        <img src="/marciliortiz-logo.svg" alt="MO" style={{ width: 'clamp(250px, 40vw, 500px)', opacity: 0.2, filter: 'grayscale(1)', userSelect: 'none' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="contact-grid" style={{ display: 'grid', gap: '6rem', alignItems: 'center' }}>

          {/* Left — Info */}
          <div>
            <p className="section-label" style={{ marginBottom: '2rem' }}>{data.label}</p>

            <h2 style={{ marginBottom: '1.5rem' }}>
              <span className="text-display" style={{ display: 'block' }}>{data.title}</span>
              <span className="text-display gradient-text" style={{ display: 'block' }}>{data.titleHighlight}</span>
              <span className="text-display" style={{ display: 'block' }}>{data.titleEnd}</span>
            </h2>

            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: 420, lineHeight: 1.8 }}>
              {data.subtitle}
            </p>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map(([key, link]) => (
                <a
                  key={key}
                  href={link.href}
                  className="contact-link"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    borderRadius: 16,
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.4s var(--ease-cinematic)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                    {contactIcons[key]}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
                      {link.label}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                      {link.value}
                    </span>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="var(--text-muted)" viewBox="0 0 24 24" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Floating Form */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
              style={{
                width: '100%',
                maxWidth: 500,
                padding: 'clamp(2rem, 5vw, 4rem)',
                borderRadius: 32,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <label className="section-label" style={{ display: 'block', marginBottom: '0.75rem' }}>{data.formLabels.name}</label>
                <input type="text" className="form-input" placeholder={data.formLabels.namePlaceholder} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label className="section-label" style={{ display: 'block', marginBottom: '0.75rem' }}>{data.formLabels.email}</label>
                <input type="email" className="form-input" placeholder={data.formLabels.emailPlaceholder} />
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <label className="section-label" style={{ display: 'block', marginBottom: '0.75rem' }}>{data.formLabels.message}</label>
                <textarea
                  className="form-input"
                  placeholder={data.formLabels.messagePlaceholder}
                  rows={5}
                  style={{ resize: 'vertical', minHeight: 150 }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.25rem' }}>
                {data.formLabels.submit}
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (hover: hover) and (pointer: fine) {
          .contact-link:hover {
            border-color: var(--glass-border-hover) !important;
            background: rgba(63, 24, 171, 0.1) !important;
            transform: translateX(8px);
          }
        }
      `}</style>
    </section>
  )
}