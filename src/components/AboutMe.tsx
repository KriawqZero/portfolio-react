import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function AboutMe() {
  const data = content.about
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const logoRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const logoScrollRef = useRef<HTMLDivElement>(null)
  const glowScrollRef = useRef<HTMLDivElement>(null)
  const photoScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // 1. Scroll Parallax effect (3 layers)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // true (immediate) prevents fighting with snap
        }
      })

      // Logo moves slowly up (parallax back layer)
      tl.to(logoScrollRef.current, { yPercent: -10, ease: 'none' }, 0)
      
      // Glow moves a bit faster (middle layer)
      tl.to(glowScrollRef.current, { yPercent: -15, ease: 'none' }, 0)
      
      // Photo moves very gently so the head doesn't leave the viewport
      tl.to(photoScrollRef.current, { y: -30, ease: 'none' }, 0)

      // 2. Mouse 2.5D Parallax
      const xToLogo = gsap.quickTo(logoRef.current, "x", { duration: 0.8, ease: "power3" })
      const yToLogo = gsap.quickTo(logoRef.current, "y", { duration: 0.8, ease: "power3" })
      
      const xToGlow = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3" })
      const yToGlow = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3" })
      
      const xToPhoto = gsap.quickTo(photoRef.current, "x", { duration: 0.4, ease: "power3" })
      const yToPhoto = gsap.quickTo(photoRef.current, "y", { duration: 0.4, ease: "power3" })

      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        
        // Only apply mouse effect if the section is in view
        if (rect.top > window.innerHeight || rect.bottom < 0) return

        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        
        // Normalize mouse coordinates from -1 to 1 based on screen
        const xPos = (clientX / innerWidth - 0.5) * 2
        const yPos = (clientY / innerHeight - 0.5) * 2
        
        // Move elements in opposite directions with different magnitudes
        xToLogo(xPos * -20)
        yToLogo(yPos * -20)
        
        xToGlow(xPos * 30)
        yToGlow(yPos * 30)
        
        xToPhoto(xPos * -15)
        yToPhoto(yPos * -15)
      }

      window.addEventListener('mousemove', handleMouseMove)
      
      // Reveal Text
      gsap.fromTo('.about-reveal', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: textColRef.current, start: 'top 75%' }
        }
      )

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    })

    // Mobile reveal (No mouse interaction, simpler parallax)
    mm.add('(max-width: 1023px)', () => {
       gsap.to(photoRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
      
      gsap.fromTo('.about-reveal', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
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
        background: '#030407', // Darker to blend with cinematic vibe
        overflow: 'hidden', // Contains the logo and glow
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Texture: Huge MO Logo */}
      <div ref={logoScrollRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'clamp(600px, 120vw, 1200px)', zIndex: 0, pointerEvents: 'none' }}>
        <img
          ref={logoRef}
          src="/marciliortiz-logo.svg"
          alt=""
          style={{
            width: '100%',
            opacity: 0.04,
            filter: 'blur(8px) grayscale(1)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>

      <div className="container" ref={containerRef} style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <div className="about-grid">
          
          {/* Left: Typography */}
          <div ref={textColRef} className="about-text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="about-reveal section-label" style={{ marginBottom: '2rem' }}>
              {data.label}
            </p>

            <h2 className="about-reveal text-display" style={{ marginBottom: '0.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {data.name}
            </h2>
            
            <p className="about-reveal gradient-text" style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              {data.role}
            </p>

            <p className="about-reveal" style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '90%' }}>
              {data.text}
            </p>
          </div>

          {/* Right: Photography with Parallax */}
          <div className="about-photo-col" style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
            
            {/* Glow Layer Behind Photo */}
            <div ref={glowScrollRef} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', aspectRatio: '1/1', zIndex: 1, pointerEvents: 'none' }}>
              <div
                ref={glowRef}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(63, 24, 171, 0.25) 0%, transparent 65%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                }}
              />
            </div>

            {/* The Photo */}
            <div ref={photoScrollRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 2, pointerEvents: 'none', marginTop: '3rem' }}>
              <img 
                ref={photoRef}
                src="/marcilio-pose.png" 
                alt={data.name}
                style={{
                  width: '100%',
                  maxWidth: '460px',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'top center',
                  filter: 'drop-shadow(0px 30px 60px rgba(0,0,0,0.8))',
                  userSelect: 'none',
                  willChange: 'transform',
                  // Smooth gradient mask so the legs fade cleanly into the dark floor
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 95%)',
                }}
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section {
          min-height: 100svh;
          padding-top: var(--section-spacing);
          padding-bottom: var(--section-spacing);
        }
        
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          min-height: 100%;
        }

        .about-text-col {
          padding-bottom: 2rem;
        }

        .about-photo-col {
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .about-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
            /* Do not lock height to 100svh to prevent cutting off text */
          }
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            align-items: flex-start; /* Align photo and text to the top */
          }
          .about-text-col {
            padding-bottom: 0;
            margin-top: 2rem; /* Push text down slightly to balance with the photo head */
          }
          .about-photo-col {
            overflow: visible;
          }
        }
      `}</style>
    </section>
  )
}
