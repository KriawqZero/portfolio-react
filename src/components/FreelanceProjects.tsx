import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../hooks/useLanguage'

gsap.registerPlugin(ScrollTrigger)

// Palavras-chave editoriais para a textura de fundo (watermark)
const WATERMARK_KEYWORDS = ["AUTOMATION", "GENERATION", "REAL-TIME"]

export default function FreelanceProjects() {
  const { t, language } = useLanguage()
  const { freelance } = t
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef)

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.freelance-mask', { y: '0%' })
      gsap.set('.narrative-step, .case-metadata-content', { opacity: 1, y: 0 })
    })

    // Global title animation
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.freelance-mask',
        { y: '100%' },
        {
          y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    })

    // Desktop: Pinned viewport, sequential cinematic scroll
    mm.add('(min-width: 1024px)', () => {
      const wrappers = gsap.utils.toArray('.freelance-case-wrapper') as HTMLElement[]
      
      wrappers.forEach((wrapper) => {
        const watermark = wrapper.querySelector('.editorial-watermark')
        const num = wrapper.querySelector('.giant-case-number')
        
        const narrativeCol = wrapper.querySelector('.case-narrative-col')
        const problem = wrapper.querySelector('.step-problem')
        const solution = wrapper.querySelector('.step-solution')
        const review = wrapper.querySelector('.step-review')

        // Initial setup for heavy crossfading
        gsap.set([solution, review], { opacity: 0.05, y: 40 })
        gsap.set(problem, { opacity: 1, y: 0 })
        if (num) gsap.set(num, { opacity: 0.08, y: 0 })

        // Create a scroll timeline based on the wrapper's reduced height
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        // Background Watermark Parallax (slow and deep)
        if (watermark) tl.to(watermark, { y: -150, ease: 'none' }, 0)
        if (num) tl.to(num, { y: -30, opacity: 0.3, ease: 'none' }, 0)
        
        // Left Column Parallax (Drifts up noticeably while right side stays completely pinned)
        if (narrativeCol) tl.to(narrativeCol, { y: '-50vh', ease: 'none', duration: 9.5 }, 0)

        // Narrative Crossfades (Synchronized for denser reading rhythm)
        // 0 to 2: Problem is active
        
        // 2 to 4.5: Transition Problem out, Solution in (Synchronous Crossfade)
        tl.to(problem, { opacity: 0.05, y: -30, duration: 2.5, ease: 'power2.inOut' }, 2)
        tl.to(solution, { opacity: 1, y: 0, duration: 2.5, ease: 'power2.inOut' }, 2)
        
        // 4.5 to 7: Solution is active
        
        // 7 to 9.5: Transition Solution out, Review in (Synchronous Crossfade)
        tl.to(solution, { opacity: 0.05, y: -30, duration: 2.5, ease: 'power2.inOut' }, 7)
        tl.to(review, { opacity: 1, y: 0, duration: 2.5, ease: 'power2.inOut' }, 7)
        
        // The outro fade is removed. The case will unpin naturally and be pushed up by the next chapter.
      })

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2

        gsap.to('.mouse-parallax-bg', {
          x: x * 40,
          y: y * 40,
          ease: 'power2.out',
          duration: 1.5
        })

        gsap.to('.mouse-parallax-fg', {
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

    // Mobile: Simple stacked clean blocks
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const cases = gsap.utils.toArray('.freelance-case-wrapper') as HTMLElement[]
      
      cases.forEach((item) => {
        const steps = item.querySelectorAll('.narrative-step')
        const content = item.querySelector('.case-metadata-content')

        gsap.fromTo(steps,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%'
            }
          }
        )

        if (content) {
          gsap.fromTo(content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: content,
                start: 'top 85%'
              }
            }
          )
        }
      })
    })

    return () => mm.revert()
  }, [freelance])

  return (
    <section
      ref={sectionRef}
      id="freelance-portfolio"
      className="freelance-section"
      style={{
        position: 'relative',
        paddingTop: 'var(--section-spacing)',
        paddingBottom: 'clamp(4rem, 10vw, 8rem)',
        overflow: 'clip',
        background: '#040508'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Title Section */}
        <div style={{ marginBottom: '8rem' }}>
          <div className="mask-text-container" style={{ marginBottom: '1rem' }}>
            <p className="section-label mask-text freelance-mask">{freelance.label}</p>
          </div>
          <h2>
            <div className="mask-text-container">
              <span className="text-display mask-text freelance-mask" style={{ display: 'block' }}>
                {freelance.freelanceProjectsTitle || 'Projetos para'}
              </span>
            </div>
            <div className="mask-text-container">
              <span className="text-display gradient-text mask-text freelance-mask" style={{ display: 'block', paddingBottom: '0.1em' }}>
                {freelance.freelanceProjectsTitleHighlight || 'Clientes.'}
              </span>
            </div>
          </h2>
        </div>
      </div>

      {/* Editorial Chapters */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {freelance.projects.map((project, i) => {
          const review = freelance.reviews[i]
          const watermarkKeyword = WATERMARK_KEYWORDS[i % WATERMARK_KEYWORDS.length]
          
          return (
            <div key={i} className="freelance-case-wrapper">
              <div className="case-viewport">
                
                {/* Deep Editorial Texture (Watermark) */}
                <div className="mouse-parallax-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, willChange: 'transform' }}>
                  <div className="editorial-watermark">
                    {watermarkKeyword}
                  </div>
                </div>

                {/* Case Grid Layout */}
                <div className="case-content-grid container">
                  
                  {/* Left Column - Story Narrative */}
                  <div className="case-narrative-col">
                    <div className="mouse-parallax-fg" style={{ willChange: 'transform' }}>
                      <div className="narrative-step step-problem">
                        <span className="narrative-label">{freelance.problemLabel}</span>
                        <p className="narrative-text">{project.problem}</p>
                      </div>

                      <div className="narrative-step step-solution">
                        <span className="narrative-label">{freelance.solutionLabel}</span>
                        <p className="narrative-text">{project.solution}</p>
                      </div>

                      {review && (
                        <div className="narrative-step step-review">
                          <blockquote className="case-quote">
                            <p className="case-quote-text">
                              "{review.quote}"
                            </p>
                            <cite className="case-quote-cite">
                              — {review.name} ({review.project})
                            </cite>
                          </blockquote>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Pure Typography Metadata */}
                  <div className="case-metadata-col">
                    <div className="case-metadata-content">
                      
                      <span className="giant-case-number">0{i + 1} /</span>
                      <span className="meta-case-tag">{project.type}</span>
                      <h3 className="meta-case-title">{project.name}</h3>
                      
                      <div className="meta-divider" />
                      
                      <div className="meta-tech-stack">
                        <span className="meta-tech-label">{freelance.techsLabel}</span>
                        <p className="meta-tech-list">{project.stack}</p>
                      </div>
                      
                      <div className="meta-year-badge">
                        {project.year}
                      </div>

                      {project.url && (
                        <div style={{ marginTop: '2.5rem' }}>
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="meta-external-link"
                          >
                            <span>{language === 'en' ? 'VIEW PROJECT' : 'ACESSAR PROJETO'}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </a>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* Epilogue */}
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '20vh 0 10vh 0', display: 'flex', justifyContent: 'center' }}>
        <p style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
          fontWeight: 400, 
          color: 'var(--text-secondary)', 
          textAlign: 'center',
          maxWidth: '800px',
          lineHeight: 1.6,
          letterSpacing: '-0.02em',
          opacity: 0.5
        }}>
          {freelance.epilogue}
        </p>
      </div>

      <style>{`
        .freelance-section {
          position: relative;
          background: var(--bg-deep);
          color: var(--text-secondary);
        }

        .freelance-case-wrapper {
          position: relative;
        }

        @media (min-width: 1024px) {
          .freelance-case-wrapper {
            /* Tighter scroll for denser, dynamic reading pace */
            height: 250vh;
            margin-bottom: 0; /* Continuous push effect, no empty silence */
          }
          .freelance-case-wrapper:last-child {
            margin-bottom: 10vh;
          }
        }

        .case-viewport {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .case-viewport {
            height: 100vh;
            position: sticky;
            top: 0;
          }
        }

        /* Watermark Background */
        .editorial-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(10rem, 25vw, 30rem);
          font-weight: 900;
          color: var(--text-primary);
          opacity: 0.02;
          filter: blur(8px);
          white-space: nowrap;
          pointer-events: none;
          z-index: 1;
          letter-spacing: -0.05em;
          user-select: none;
        }

        /* Grid */
        .case-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding: 4rem var(--container-padding);
          position: relative;
          z-index: 10;
        }

        @media (min-width: 1024px) {
          .case-content-grid {
            grid-template-columns: 7fr 5fr;
            gap: 10rem;
            height: 100vh;
            align-items: center;
            padding: 0 var(--container-padding);
          }
        }

        /* Left Column - Story */
        .case-narrative-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
        }

        @media (min-width: 1024px) {
          .case-narrative-col {
            height: 100%;
            justify-content: center;
          }
        }

        .narrative-step {
          margin-bottom: 4rem;
          position: relative;
        }

        @media (min-width: 1024px) {
          .narrative-step {
            margin-bottom: 8vh;
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
          .narrative-step:last-child {
            margin-bottom: 0;
          }
        }

        .narrative-label {
          font-family: monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-light);
          opacity: 0.5; /* Subdued for editorial feel */
          display: block;
          margin-bottom: 1.5rem;
        }

        .narrative-text {
          font-family: 'Space Grotesk', var(--font-display);
          font-size: clamp(1.125rem, 2vw, 1.35rem);
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 300;
          max-width: 680px;
        }

        /* Testimonial Quote */
        .case-quote {
          position: relative;
          max-width: 600px;
        }

        .case-quote-text {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          color: var(--text-primary);
          font-weight: 400;
          line-height: 1.4;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .case-quote-cite {
          font-size: var(--text-sm);
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-body);
          display: block;
          font-style: normal;
        }

        /* Right Column - Metadata Typography */
        .case-metadata-col {
          position: relative;
        }

        @media (min-width: 1024px) {
          .case-metadata-col {
            display: flex;
            justify-content: flex-end;
          }
        }

        /* Removed background, borders, and border-radius entirely */
        .case-metadata-content {
          width: 100%;
          max-width: 420px;
          position: relative;
          padding: 2rem 0;
        }

        .giant-case-number {
          font-family: var(--font-display);
          font-size: clamp(4rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1;
          color: var(--accent-light);
          opacity: 0.08;
          display: block;
          margin-bottom: 2rem;
          transition: opacity 0.3s ease, transform 0.3s ease;
          letter-spacing: -0.03em;
        }

        .meta-case-tag {
          font-family: monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-body);
          display: block;
          margin-bottom: 1rem;
        }

        .meta-case-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .meta-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05); /* Extremely faint */
          margin: 3rem 0;
        }

        .meta-tech-label {
          font-family: monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-body);
          display: block;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .meta-tech-list {
          font-family: monospace;
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.8;
          letter-spacing: 0.05em;
        }

        .meta-year-badge {
          position: absolute;
          top: 2rem;
          right: 0;
          font-family: monospace;
          font-size: var(--text-xs);
          color: var(--accent-light);
          font-weight: 400;
          opacity: 0.4;
        }

        /* External Link */
        .meta-external-link {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .meta-external-link:hover {
          color: var(--accent-light);
          border-bottom-color: var(--accent-light);
        }

        .meta-external-link svg {
          transition: transform 0.3s ease;
        }

        .meta-external-link:hover svg {
          transform: translate(3px, -3px);
        }
      `}</style>
    </section>
  )
}
