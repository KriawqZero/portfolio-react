import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../hooks/useLanguage'
import ConviteIA from './ConviteIA'
import { SiReact, SiTypescript, SiNestjs, SiNodedotjs, SiPostgresql, SiDocker } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const techIcons: Record<string, React.ReactNode> = {
  react: <SiReact size={24} />,
  typescript: <SiTypescript size={24} />,
  nestjs: <SiNestjs size={24} />,
  nodejs: <SiNodedotjs size={24} />,
  postgresql: <SiPostgresql size={24} />,
  docker: <SiDocker size={24} />,
}

export default function Hero() {
  const { t, isFreelanceView } = useLanguage()
  const { hero } = t
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Cinematic scroll reveal masks with MatchMedia for responsiveness
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(min-width: 1024px)', () => {
      // Mouse Parallax 2.5D (Desktop only)
      const xSetPhoto = gsap.quickSetter(photoRef.current, "x", "px")
      const ySetPhoto = gsap.quickSetter(photoRef.current, "y", "px")
      const xSetLogo = gsap.quickSetter(logoRef.current, "x", "px")
      const ySetLogo = gsap.quickSetter(logoRef.current, "y", "px")
      const xSetGlow = gsap.quickSetter(glowRef.current, "x", "px")
      const ySetGlow = gsap.quickSetter(glowRef.current, "y", "px")

      const onMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window
        // Normalized coordinates from -0.5 to 0.5
        const x = (e.clientX / innerWidth - 0.5)
        const y = (e.clientY / innerHeight - 0.5)

        // Photo moves slightly towards the mouse
        xSetPhoto(x * 15)
        ySetPhoto(y * 15)

        // Glow moves away from the mouse
        xSetGlow(x * -30)
        ySetGlow(y * -30)

        // Logo moves away slightly slower
        xSetLogo(x * -10)
        ySetLogo(y * -10)
      }

      window.addEventListener('mousemove', onMouseMove)

      // Scroll Parallax out of Hero
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Photo scrolls up slightly slower than the page (stays longer)
      gsap.to(photoRef.current, {
        yPercent: -15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Logo scrolls down to increase depth separation
      gsap.to(logoRef.current, {
        yPercent: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
      }
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Mask reveals for initial load (All devices)
      gsap.fromTo('.hero-mask',
        { y: '100%' },
        { y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      )

      gsap.fromTo('.hero-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      )
    })

    // Sem movimento: mesmo estado final, sem transição
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero-mask', { y: '0%' })
      gsap.set('.hero-fade', { opacity: 1, y: 0 })
    })

    return () => mm.revert()
  }, [hero, isFreelanceView])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100dvh', // Responsive height (dvh for Safari)
        display: 'flex',
        alignItems: 'center',
        // Var permite que o mobile reserve a altura da navbar fixa sem !important
        paddingTop: 'var(--hero-padding-top, calc(var(--section-spacing) / 2))',
        paddingBottom: 'calc(var(--section-spacing) / 2)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', minHeight: '80vh' }}>

          {/* Left column */}
          <div ref={contentRef} className="hero-content" style={{ maxWidth: 800, position: 'relative', zIndex: 10 }}>
            <div className="mask-text-container hero-greeting" style={{ marginBottom: '2rem' }}>
              <p className="section-label mask-text hero-mask">{hero.greeting}</p>
            </div>

            <div className="mask-text-container hero-name" style={{ marginBottom: '3rem' }}>
              <p className="mask-text hero-mask" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                {hero.name}
              </p>
              <div className="mask-text hero-mask" style={{ width: '80px', height: '2px', background: 'linear-gradient(24deg, #F9FFFD, #3F18AB)', marginTop: '1.25rem' }} />
            </div>

            <h1 className="hero-heading" style={{ marginBottom: '2rem' }}>
              <div className="mask-text-container">
                <span className="text-hero mask-text hero-mask" style={{ display: 'block', color: 'var(--text-primary)' }}>
                  {hero.role[0]}
                </span>
              </div>
              <div className="mask-text-container">
                <span className="text-hero gradient-text mask-text hero-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                  {hero.role[1]}
                </span>
              </div>
            </h1>

            <p className="hero-fade hero-subtitle">
              {hero.subtitle}
            </p>

            {/* Availability status 
            <div className="hero-fade" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '3rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px', maxWidth: '520px' }}>
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#10B981', 
                boxShadow: '0 0 10px #10B981', 
                marginTop: '6px',
                flexShrink: 0
              }} />
              <div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  {isFreelanceView ? hero.availability.freelanceStatus : hero.availability.defaultStatus}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  {(isFreelanceView ? hero.availability.freelanceTypes : hero.availability.defaultTypes).join(' · ')}
                </p>
              </div>
            </div>*/}

            <div className="hero-fade hero-actions" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <a href="#freelance-portfolio" className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                {hero.ctaPrimary}
              </a>
              <a href="#sobre" className="btn-secondary">{hero.ctaSecondary}</a>
              {/* A outra porta, oferecida antes de qualquer rolagem: quem chega
                  com pressa vai direto perguntar em vez de ligar os pontos
                  sozinho. Fica na mesma linha dos CTAs porque abaixo dela caía
                  fora da dobra em telas de 900px, que é onde ela menos serve.
                  O ponto pulsante é o que a separa de um terceiro botão igual. */}
              <ConviteIA rotulo={t.aiChat.invite.hero} />
            </div>

            <div className="hero-fade">
              <p className="section-label" style={{ marginBottom: '1.5rem', fontSize: '0.65rem' }}>TECNOLOGIAS</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {hero.techs.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.15, y: -5 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => { (e.currentTarget.style.color = 'var(--accent-light)') }}
                    onMouseLeave={(e) => { (e.currentTarget.style.color = 'var(--text-muted)') }}
                    title={tech.name}
                  >
                    {techIcons[tech.icon] || <span style={{ fontSize: 28 }}>⚡</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Cinematic Photo Integration */}
          <div ref={artRef} className="hero-art-col" style={{ pointerEvents: 'none', zIndex: 5, display: 'flex', justifyContent: 'center' }}>
            {/* Layer -2: MO Logo Background */}
            <img
              ref={logoRef}
              className="hero-fade hero-logo"
              src="/marciliortiz-logo.svg"
              alt=""
            />
            {/* Layer -1: Purple Glow */}
            <div
              ref={glowRef}
              className="hero-fade hero-glow"
            />
            {/* Layer 1: Photo (Bleeding out of bottom) */}
            {/* Desktop recebe o corpo inteiro; mobile recebe o recorte gerado por `pnpm img:gen`,
                porque a proporção 1:2.94 do original vira uma silhueta minúscula em telas estreitas. */}
            <picture>
              <source media="(min-width: 1024px)" type="image/avif" srcSet="/generated/pose-full.avif" />
              <source media="(min-width: 1024px)" type="image/webp" srcSet="/generated/pose-full.webp" />
              <source type="image/avif" srcSet="/generated/pose-crop.avif" />
              <source type="image/webp" srcSet="/generated/pose-crop.webp" />
              <img
                ref={photoRef}
                className="hero-fade hero-photo"
                src="/marcilio-pose.png"
                alt="Marcilio Ortiz"
                width={472}
                height={1390}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>

      <style>{`
        .hero-art-col {
          position: absolute;
          bottom: 0;
          right: 5vw;
          height: 110%;
          width: 45vw;
          max-width: 700px;
        }
        .hero-logo {
          position: absolute; top: 15%; left: 50%; transform: translateX(-50%); width: 120%; opacity: 0.4; filter: blur(12px); user-select: none; z-index: -2;
        }
        .hero-glow {
          position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); width: 80%; aspect-ratio: 1/1; background: radial-gradient(circle, rgba(63, 24, 171, 0.25) 0%, transparent 60%); filter: blur(40px); z-index: -1;
        }
        .hero-photo {
          position: absolute; bottom: -25%; left: 48%; transform: translateX(-50%); height: 105%; object-fit: contain; user-select: none; filter: drop-shadow(0px 20px 40px rgba(0,0,0,0.4)); z-index: 1;
        }

        .hero-art-col picture { display: contents; }

        .hero-subtitle {
          font-size: var(--text-xl);
          color: var(--text-body);
          max-width: 520px;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.2fr 0.8fr !important; }
        }

        /* Mobile: texto e retrato ocupam blocos separados, sem sobreposição. */
        @media (max-width: 1023px) {
          :root { --hero-padding-top: calc(5.5rem + env(safe-area-inset-top, 0px)); }

          #inicio { min-height: auto !important; padding-bottom: 2rem !important; }
          .hero-grid {
            display: flex !important;
            flex-direction: column;
            min-height: auto !important;
            gap: 1.5rem !important;
          }
          .hero-content { width: 100%; padding-bottom: 0; }
          .hero-greeting { margin-bottom: 1rem !important; }
          .hero-name { margin-bottom: 1.5rem !important; }
          .hero-heading { margin-bottom: 1.25rem !important; }
          .hero-subtitle {
            width: 100%;
            max-width: 100%;
            font-size: 1rem;
            line-height: 1.65;
            margin-bottom: 1.5rem;
          }
          .hero-actions {
            gap: 0.75rem !important;
            margin-bottom: 1.75rem !important;
          }
          .hero-content .btn-primary,
          .hero-content .btn-secondary { max-width: 100%; }

          .hero-art-col {
            position: relative;
            inset: auto;
            height: clamp(22rem, 90vw, 30rem);
            width: 100%;
            max-width: 30rem;
            margin: 0 auto;
          }
          .hero-art-col picture {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
          }
          .hero-art-col::after {
            content: '';
            position: absolute;
            inset: auto 0 0 0;
            height: 20%;
            background: linear-gradient(to top, var(--bg-deep) 8%, transparent 100%);
            pointer-events: none;
            z-index: 3;
          }
          .hero-photo {
            position: relative;
            inset: auto;
            display: block;
            width: auto;
            height: 100%;
            max-width: 100%;
            margin: 0 auto;
            transform: none !important;
            object-fit: contain;
            object-position: center bottom;
            filter: none;
            -webkit-mask-image: none;
            mask-image: none;
          }
          .hero-logo {
            top: 15%;
            bottom: auto;
            left: 50%;
            right: auto;
            width: 85%;
            transform: translateX(-50%);
            opacity: 0.22;
            filter: blur(16px);
          }
          .hero-glow {
            bottom: 10%;
            left: 50%;
            right: auto;
            width: 100%;
            transform: translateX(-50%);
            opacity: 0.75;
          }
        }
      `}</style>
    </section>
  )
}