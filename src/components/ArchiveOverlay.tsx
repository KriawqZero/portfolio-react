import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { content } from '../data/content'

interface ArchiveOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function ArchiveOverlay({ isOpen, onClose }: ArchiveOverlayProps) {
  const [activeRowId, setActiveRowId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    if (isOpen) {
      wasOpen.current = true
      document.body.style.overflow = 'hidden'
      
      const tl = gsap.timeline()
      
      tl.set(containerRef.current, { display: 'flex' })
        .to(containerRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
        .fromTo(
          rowsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
          '-=0.2'
        )
    } else if (wasOpen.current) {
      // Pragmatic fix: Hard refresh to top of page to reset all GSAP instances
      window.location.href = window.location.pathname
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'none',
        opacity: 0,
        visibility: 'hidden',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--container-padding)',
        color: 'var(--text-primary)'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-primary)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
        }}
      >
        <style>
          {`
            .archive-grid {
              display: grid;
              grid-template-columns: 80px 2fr 1.5fr 2fr 1fr;
              gap: 1rem;
              align-items: center;
            }
            @media (max-width: 1024px) {
              .archive-grid {
                grid-template-columns: 60px 2fr 1.5fr 1fr;
              }
              .archive-stack { display: none !important; }
            }
            @media (max-width: 768px) {
              .archive-grid {
                grid-template-columns: 1fr;
                gap: 0.25rem;
                padding-top: 1rem !important;
                padding-bottom: 1rem !important;
              }
              .archive-year, .archive-type, .archive-header { display: none !important; }
              .archive-links { justify-content: flex-start !important; margin-top: 0.5rem; }
            }
          `}
        </style>

        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 className="text-xl text-primary font-display" style={{ marginBottom: '0.25rem' }}>Arquivo Completo</h2>
            <p className="text-sm text-secondary">Todos os {content.archive.length} projetos documentados.</p>
          </div>
          <button 
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'var(--glass-bg)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Table Header */}
        <div className="archive-grid archive-header" style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid var(--glass-border)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          fontWeight: 600
        }}>
          <div className="archive-year">Ano</div>
          <div>Projeto</div>
          <div className="archive-type">Tipo</div>
          <div className="archive-stack">Stack</div>
          <div style={{ textAlign: 'right' }}>Links</div>
        </div>

        {/* Table Body (Scrollable) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
        }}>
          {content.archive.map((project, i) => (
            <ArchiveRow
              key={i}
              project={project}
              isActive={activeRowId === i}
              onClick={() => setActiveRowId(activeRowId === i ? null : i)}
              onRef={(el) => { rowsRef.current[i] = el }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ArchiveRowProps {
  project: typeof content.archive[0]
  isActive: boolean
  onClick: () => void
  onRef: (el: HTMLDivElement | null) => void
}

function ArchiveRow({ project, isActive, onClick, onRef }: ArchiveRowProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    if (isActive) {
      gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: 'power3.inOut' })
    } else {
      gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut' })
    }
  }, [isActive])

  return (
    <div 
      ref={onRef}
      style={{
        borderBottom: '1px solid var(--glass-border)',
        transition: 'border-color 0.3s, background 0.3s',
        background: isActive ? 'var(--bg-card-hover)' : 'transparent',
      }}
    >
      <div
        className="archive-grid"
        onClick={onClick}
        style={{
          padding: '1.25rem 2rem',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
          background: isActive ? 'var(--bg-card-hover)' : 'transparent'
        }}
        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-card)' }}
        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
      >
        <div className="archive-year" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{project.year}</div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{project.name}</div>
        <div className="archive-type" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{project.type}</div>
        <div className="archive-stack" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.stack.map((tech, j) => (
            <span key={j} style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: '4px',
              color: 'var(--text-secondary)'
            }}>
              {tech}
            </span>
          ))}
        </div>
        <div className="archive-links" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--glass-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
            transition: 'transform 0.4s ease, color 0.3s',
            transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)'
          }}>
            +
          </div>
        </div>
      </div>

      <div 
        ref={contentRef}
        style={{ height: 0, overflow: 'hidden' }}
      >
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
              {'narrative' in project ? project.narrative as string : ''}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.links.map((link, j) => (
                <a 
                  key={j}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    padding: '0.5rem 1rem', 
                    fontSize: 'var(--text-xs)',
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
