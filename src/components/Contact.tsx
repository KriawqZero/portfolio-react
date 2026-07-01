import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const contactIcons: Record<string, React.ReactNode> = {
  email: <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
  linkedin: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  github: <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { contact: data } = content
  const links = Object.entries(data.links) as [string, { label: string; value: string; href: string }][]

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Massive MO Art very slow parallax
      if (artRef.current) {
        gsap.to(artRef.current, {
          y: -150,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2, // Very slow scrub for majestic feel
          }
        })
      }

      // Elegant, slow text reveal
      if (textRef.current) {
        const els = textRef.current.querySelectorAll('.epilogue-anim')
        
        gsap.fromTo(els,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          }
        )
      }

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contato"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'var(--section-spacing)',
      }}
    >
      {/* Ambient Breathing Glow */}
      <div className="epilogue-glow" style={{
        position: 'absolute',
        bottom: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '80vw',
        maxWidth: 1200,
        maxHeight: 1200,
        background: 'radial-gradient(circle, rgba(63, 24, 171, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Massive Background Logo Watermark */}
      <div
        ref={artRef}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          maxWidth: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <img 
          src="/marciliortiz-logo.svg" 
          alt="" 
          style={{ 
            width: '100%', 
            opacity: 0.03, 
            filter: 'grayscale(1)',
            userSelect: 'none' 
          }} 
        />
      </div>

      {/* Foreground Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 800 }}>
          
          <p className="section-label epilogue-anim" style={{ marginBottom: '2rem' }}>
            {data.label}
          </p>

          <h2 className="text-display epilogue-anim" style={{ marginBottom: '2.5rem', lineHeight: 1.1 }}>
            {data.title}{' '}
            <span className="gradient-text">{data.titleHighlight}</span>
          </h2>

          <p className="epilogue-anim" style={{ 
            fontSize: 'var(--text-xl)', 
            color: 'var(--text-muted)', 
            lineHeight: 1.8, 
            maxWidth: 580,
            marginBottom: '6rem'
          }}>
            {data.text}
          </p>

          {/* Minimalist Contact Links */}
          <div className="epilogue-anim" style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem' 
          }}>
            {links.map(([key, link], index) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={link.href}
                  className="epilogue-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.5s var(--ease-cinematic)',
                    padding: '0.5rem',
                  }}
                >
                  <span className="link-icon" style={{ 
                    color: 'var(--text-muted)',
                    transition: 'color 0.5s var(--ease-cinematic)'
                  }}>
                    {contactIcons[key]}
                  </span>
                  <span style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 500,
                  }}>
                    {link.label}
                  </span>
                </a>
                
                {/* Separator */}
                {index < links.length - 1 && (
                  <span className="epilogue-separator" style={{ 
                    marginLeft: '2rem',
                    color: 'rgba(255,255,255,0.1)',
                    userSelect: 'none'
                  }}>|</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        /* Breathing animation for ambient glow */
        @keyframes epilogueBreathe {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }
        .epilogue-glow {
          animation: epilogueBreathe 8s ease-in-out infinite;
        }

        /* Minimalist link hover effects */
        @media (hover: hover) and (pointer: fine) {
          .epilogue-link:hover {
            color: var(--text-primary) !important;
            transform: translateY(-4px);
          }
          .epilogue-link:hover .link-icon {
            color: var(--accent-light) !important;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .epilogue-separator {
            display: none !important;
          }
          .epilogue-anim > div { /* The container of links */
            flex-direction: column;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}