import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'
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
  const { hero } = content
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

    mm.add('(max-width: 1023px)', () => {
      // Subtle mobile fade out instead of large parallax
      gsap.to(contentRef.current, {
        opacity: 0.2,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
      gsap.to(photoRef.current, {
        yPercent: -5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })

    mm.add('all', () => {
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

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100dvh', // Responsive height (dvh for Safari)
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--section-spacing) / 2)',
        paddingBottom: 'calc(var(--section-spacing) / 2)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center', minHeight: '80vh' }}>

          {/* Left column */}
          <div ref={contentRef} style={{ maxWidth: 800, position: 'relative', zIndex: 10 }}>
            <div className="mask-text-container" style={{ marginBottom: '2rem' }}>
              <p className="section-label mask-text hero-mask">{hero.greeting}</p>
            </div>

            <div className="mask-text-container" style={{ marginBottom: '3rem' }}>
              <p className="mask-text hero-mask" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                {hero.name}
              </p>
              <div className="mask-text hero-mask" style={{ width: '80px', height: '2px', background: 'linear-gradient(24deg, #F9FFFD, #3F18AB)', marginTop: '1.25rem' }} />
            </div>

            <h1 style={{ marginBottom: '2rem' }}>
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

            <p className="hero-fade" style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.6, marginBottom: '3rem' }}>
              {hero.subtitle}
            </p>

            <div className="hero-fade" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <a href="#projetos" className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                {hero.ctaPrimary}
              </a>
              <a href="#sobre" className="btn-secondary">{hero.ctaSecondary}</a>
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
            <img
              ref={photoRef}
              className="hero-fade hero-photo"
              src="/marcilio-pose.png"
              alt="Marcilio Ortiz"
            />
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

        @media (min-width: 1024px) { 
          .hero-grid { grid-template-columns: 1.2fr 0.8fr !important; } 
        }
        @media (max-width: 1023px) {
          .hero-art-col {
            position: relative !important;
            height: 40vh !important;
            min-height: 300px;
            width: 100% !important;
            margin-top: 2rem;
            right: auto;
          }
          .hero-grid { display: flex !important; flex-direction: column; }
          .hero-photo {
            bottom: 0 !important;
            height: 100% !important;
            max-width: 100vw;
            left: 50% !important;
          }
        }
      `}</style>
    </section>
  )
}