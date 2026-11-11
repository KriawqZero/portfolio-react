import { useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../hooks/useLanguage'
import ConviteIA from './ConviteIA'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const { t, isFreelanceView } = useLanguage()
  const { contact: data } = t
  const phrases = useMemo(
    () => (isFreelanceView && data.narrativePhrasesClient ? data.narrativePhrasesClient : data.narrativePhrases),
    [isFreelanceView, data.narrativePhrasesClient, data.narrativePhrases]
  )

  useEffect(() => {
    if (!pinRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ─── DESKTOP: Full cinematic sticky scroll ───
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {

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
        const phrasesList = phrases
        phrasesList.forEach((_, i) => {
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
        tl.to(`.ep-phrase-${phrasesList.length - 1}`, { opacity: 1, duration: 0.1 }, 0.35 + phrasesList.length * 0.08)

        // ── O convite para a IA entra depois das frases ──
        tl.fromTo('.ep-ia',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
          0.66
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

      // ─── Sem movimento: estado final direto ───
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.ep-label, .ep-title, .ep-text, .ep-copyright, .ep-ia', { opacity: 1, y: 0 })
        phrases.forEach((_, i) => gsap.set(`.ep-phrase-${i}`, { opacity: 1, y: 0 }))
      })

      // ─── MOBILE: Sequential reveal without pin ───
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.ep-label', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-label', start: 'top 85%' } })
        gsap.fromTo('.ep-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-title', start: 'top 85%' } })
        gsap.fromTo('.ep-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.ep-text', start: 'top 85%' } })

        phrases.forEach((_, i) => {
          gsap.fromTo(`.ep-phrase-${i}`, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: `.ep-phrase-${i}`, start: 'top 90%' } })
        })

        gsap.fromTo('.ep-ia', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.ep-ia', start: 'top 90%' } })

        gsap.fromTo('.ep-copyright', { opacity: 0 }, { opacity: 1, duration: 1, scrollTrigger: { trigger: '.ep-copyright', start: 'top 95%' } })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [data, phrases])

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
          src="/marciliortiz-logo.svg"
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
              <span className="gradient-text">{isFreelanceView ? data.titleHighlightClient : data.titleHighlight}</span>
            </h2>

            {/* Paragraph */}
            <p className="ep-text" style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-body)',
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: '2rem',
              opacity: 0,
            }}>
              {data.text}
            </p>

            {/* Narrative Phrases */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {phrases.map((phrase, i) => (
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

            {/* Última chance de perguntar antes de escrever. Quem chegou até o
                epílogo já se interessou — e uma dúvida respondida agora vale
                mais do que um e-mail que talvez não seja enviado. */}
            <div className="ep-ia" style={{ marginBottom: '2.5rem', opacity: 0 }}>
              <a
                className="btn-primary"
                href={data.directContact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginBottom: '1.5rem' }}
              >
                {data.directContact.label}
              </a>
              <p className="ep-ia-prompt">{t.aiChat.invite.contactPrompt}</p>
              <ConviteIA rotulo={t.aiChat.invite.contactCta} />
            </div>

            {/* Copyright — End Credits */}
            <p className="ep-copyright" style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-body)',
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

        /* Mobile: show elements by default since no pin */
        @media (max-width: 767px) {
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
