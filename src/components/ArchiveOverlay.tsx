import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../hooks/useLanguage'

interface ArchiveOverlayProps {
  isOpen: boolean
  onClose: () => void
}

interface ProjectItem {
  year: string
  name: string
  type: string
  stack: string[]
  link?: string
  links: { label: string; href: string }[]
  narrative?: string
  details?: string
  media?: { image: string; alt: string }
}

export default function ArchiveOverlay({ isOpen, onClose }: ArchiveOverlayProps) {
  const [activeRowId, setActiveRowId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])
  const wasOpen = useRef(false)

  const { t, language } = useLanguage()
  const { archive } = t

  // Localized headers mapping
  const headers = language === 'en' ? {
    title: 'Full Archive',
    subtitle: `All ${archive.length} documented projects.`,
    year: 'Year',
    project: 'Project',
    type: 'Type',
    stack: 'Stack',
    links: 'Links'
  } : {
    title: 'Arquivo Completo',
    subtitle: `Todos os ${archive.length} projetos documentados.`,
    year: 'Ano',
    project: 'Projeto',
    type: 'Tipo',
    stack: 'Stack',
    links: 'Links'
  }

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
      // Pragmatic fix: Hard refresh to top of page to reset all GSAP instances, keeping query params
      window.location.href = window.location.pathname + window.location.search
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
        background: 'rgba(2, 2, 3, 0.95)',
        backdropFilter: 'blur(30px)',
        zIndex: 9999,
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        opacity: 0,
        visibility: 'hidden'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: '85vh',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 className="text-xl text-primary font-display" style={{ marginBottom: '0.25rem' }}>{headers.title}</h2>
            <p className="text-sm text-secondary">{headers.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={language === 'en' ? 'Close archive' : 'Fechar arquivo'}
            style={{
              width: '48px',
              height: '48px',
              flexShrink: 0,
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
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
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
          color: 'var(--text-body)',
          fontWeight: 600
        }}>
          <div className="archive-year">{headers.year}</div>
          <div>{headers.project}</div>
          <div className="archive-type">{headers.type}</div>
          <div className="archive-stack">{headers.stack}</div>
          <div style={{ textAlign: 'right' }}>{headers.links}</div>
        </div>

        {/* Table Body (Scrollable) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
        }}>
          {archive.map((project, i) => (
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
  project: ProjectItem
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
      className={`archive-row ${isActive ? 'active' : ''}`}
      style={{
        borderBottom: '1px solid var(--glass-border)',
        background: isActive ? 'rgba(255,255,255,0.01)' : 'transparent',
        transition: 'background 0.3s'
      }}
    >
      <div 
        onClick={onClick}
        className="archive-grid"
        style={{
          padding: '1.5rem 2rem',
          cursor: 'pointer',
          alignItems: 'center',
        }}
      >
        <div className="archive-year" style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
          {project.year}
        </div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          {project.name}
        </div>
        <div className="archive-type" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {project.type}
        </div>
        <div className="archive-stack" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.stack.map((tech, j) => (
            <span key={j} style={{
              fontSize: '10px',
              padding: '0.25rem 0.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
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
          <div style={{ display: 'flex', gap: '1.5rem', maxWidth: '800px', flexWrap: 'wrap' }}>
            {project.media && (
              <img
                src={project.media.image}
                alt={project.media.alt}
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: '260px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                {project.narrative || ''}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {project.links.map((link, j) => (
                  <a
                    key={j}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="archive-link"
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: 'var(--text-xs)',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
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
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
