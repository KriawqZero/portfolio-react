import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const contactIcons: Record<string, React.ReactNode> = {
  email: <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  linkedin: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  github: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const { contact: data } = content
  const links = Object.entries(data.links) as [string, { label: string; value: string; href: string }][]

  useEffect(() => {
    if (!pinRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ─── DESKTOP: Full cinematic sticky scroll ───
      mm.add('(min-width: 768px)', () => {

        // Build the scrubbed timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=400%', // 4 viewport lengths of scroll
            pin: true,
            scrub: 1.5, // Deliberately slow scrub for cinematic feel
          }
        })

        // ── Act 1: Title and text reveal (0 → 0.15) ──
        tl.fromTo('.ep-label', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0)
        tl.fromTo('.ep-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.1)
        tl.fromTo('.ep-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.3)

        // ── Act 2: Logo gains presence (0.15 → 0.5) ──
        if (logoRef.current) {
          tl.to(logoRef.current, { opacity: 0.06, scale: 1.08, duration: 1.5, ease: 'power1.inOut' }, 0.4)
        }
        if (glowRef.current) {
          tl.to(glowRef.current, { opacity: 1, scale: 1.1, duration: 1.5, ease: 'power1.inOut' }, 0.4)
        }

        // ── Act 3: Narrative phrases cascade (0.3 → 0.7) ──
        const phrases = data.narrativePhrases
        phrases.forEach((_, i) => {
          const offset = 0.35 + (i * 0.08)
          tl.fromTo(`.ep-phrase-${i}`,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
            offset
          )
          // Fade previous phrase slightly as next arrives
          if (i > 0) {
            tl.to(`.ep-phrase-${i - 1}`, { opacity: 0.3, duration: 0.3 }, offset)
          }
        })
        // Keep last phrase fully visible
        tl.to(`.ep-phrase-${phrases.length - 1}`, { opacity: 1, duration: 0.1 }, 0.35 + phrases.length * 0.08)

        // ── Act 4: Contact links appear one by one (0.65 → 0.85) ──
        links.forEach((_, i) => {
          tl.fromTo(`.ep-link-${i}`,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
            0.7 + (i * 0.06)
          )
        })

        // Separators fade in after links
        tl.fromTo('.ep-separator',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          0.88
        )

        // ── Act 5: Credits (copyright) rise like end credits (0.9 → 1.0) ──
        tl.fromTo('.ep-copyright',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          0.92
        )

        // Final glow intensification
        if (glowRef.current) {
          tl.to(glowRef.current, { opacity: 1.2, duration: 0.5 }, 0.9)
        }

        // ── Hide Navbar when epilogue begins ──
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: 'top 30%',
          end: 'bottom top',
          onEnter: () => gsap.to('nav', { opacity: 0, y: -20, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'none' }),
          onLeaveBack: () => gsap.to('nav', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.inOut', pointerEvents: 'auto' }),
        })
      })

      // ─── MOBILE: Sequential reveal without pin ───
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.ep-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-label', start: 'top 85%' } })
        gsap.fromTo('.ep-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-title', start: 'top 85%' } })
        gsap.fromTo('.ep-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-text', start: 'top 85%' } })

        data.narrativePhrases.forEach((_, i) => {
          gsap.fromTo(`.ep-phrase-${i}`, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: `.ep-phrase-${i}`, start: 'top 90%' } })
        })

        links.forEach((_, i) => {
          gsap.fromTo(`.ep-link-${i}`, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: `.ep-link-${i}`, start: 'top 90%' } })
        })

        gsap.fromTo('.ep-copyright', { opacity: 0 }, { opacity: 1, duration: 1, scrollTrigger: { trigger: '.ep-copyright', start: 'top 95%' } })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contato" style={{ position: 'relative' }}>

      {/* Pinned Viewport */}
      <div
        ref={pinRef}
        style={{
          height: '100dvh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Breathing Glow */}
        <div
          ref={glowRef}
          className="epilogue-glow"
          style={{
            position: 'absolute',
            bottom: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90vw',
            height: '90vw',
            maxWidth: 1400,
            maxHeight: 1400,
            background: 'radial-gradient(circle, rgba(63, 24, 171, 0.10) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.4,
          }}
        />

        {/* Background Logo Watermark */}
        <img
          ref={logoRef}
          src="/marciliortiz-logo-light.svg"
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(65vw, 700px)',
            opacity: 0.02,
            filter: 'grayscale(1)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            willChange: 'opacity, transform',
          }}
        />

        {/* Foreground Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 700 }}>

            {/* Label */}
            <p className="section-label ep-label" style={{ marginBottom: '1rem', opacity: 0 }}>
              {data.label}
            </p>

            {/* Title */}
            <h2 className="text-display ep-title" style={{ marginBottom: '1rem', lineHeight: 1.1, opacity: 0 }}>
              {data.title}{' '}
              <span className="gradient-text">{data.titleHighlight}</span>
            </h2>

            {/* Paragraph */}
            <p className="ep-text" style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: '2rem',
              opacity: 0,
            }}>
              {data.text}
            </p>

            {/* Narrative Phrases */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {data.narrativePhrases.map((phrase, i) => (
                <span
                  key={i}
                  className={`ep-phrase-${i}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    opacity: 0,
                  }}
                >
                  {phrase}
                </span>
              ))}
            </div>

            {/* Contact Links */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}>
              {links.map(([key, link], index) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    href={link.href}
                    className={`epilogue-link ep-link-${index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.6s var(--ease-cinematic)',
                      padding: '0.5rem 0.25rem',
                      opacity: 0,
                    }}
                  >
                    <span className="link-icon" style={{
                      color: 'var(--text-muted)',
                      transition: 'all 0.6s var(--ease-cinematic)',
                    }}>
                      {contactIcons[key]}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                    }}>
                      {link.label}
                    </span>
                  </a>

                  {/* Separator */}
                  {index < links.length - 1 && (
                    <span className="ep-separator" style={{
                      marginLeft: '1.5rem',
                      color: 'rgba(0,0,0,0.15)',
                      userSelect: 'none',
                      fontSize: 'var(--text-sm)',
                      opacity: 0,
                    }}>|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Copyright — End Credits */}
            <p className="ep-copyright" style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              opacity: 0,
            }}>
              {data.copyright}
            </p>

          </div>
        </div>
      </div>

      <style>{`
        /* Breathing ambient glow */
        @keyframes epilogueBreathe {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.06); }
        }
        .epilogue-glow {
          animation: epilogueBreathe 10s ease-in-out infinite;
        }

        /* Link hover — minimal and elegant */
        @media (hover: hover) and (pointer: fine) {
          .epilogue-link:hover {
            color: var(--text-primary) !important;
            transform: translateY(-3px);
          }
          .epilogue-link:hover .link-icon {
            color: var(--accent-light) !important;
            filter: drop-shadow(0 0 8px rgba(106, 60, 232, 0.4));
          }
        }

        /* Mobile: show elements by default since no pin */
        @media (max-width: 767px) {
          .ep-separator { display: none !important; }
          #contato > div {
            height: auto !important;
            padding-top: var(--section-spacing) !important;
            padding-bottom: 4rem !important;
          }
          .ep-label, .ep-title, .ep-text, .ep-copyright { opacity: 0; }
        }
      `}</style>
    </section>
  )
}