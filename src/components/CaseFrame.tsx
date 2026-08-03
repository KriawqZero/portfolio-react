interface CaseMedia {
  image: string
  alt: string
  url?: string
  video?: string
  poster?: string
}

interface CaseFrameProps {
  media: CaseMedia
  openLabel: string
  /** Índice do projeto no flatten da Trajectory — usado para play/pause do vídeo via timeline. */
  projectIndex: number
  /** false quando prefers-reduced-motion: renderiza poster estático no lugar do vídeo. */
  allowVideo: boolean
}

/**
 * Moldura de browser minimalista para o screenshot/vídeo do projeto ativo.
 * CSS custom inline (idioma do projeto). A moldura inteira vira link quando o
 * projeto está no ar — selo "Abrir ↗" reforça que é prova viva, não decoração.
 */
export default function CaseFrame({ media, openLabel, projectIndex, allowVideo }: CaseFrameProps) {
  const dominio = media.url ? new URL(media.url).hostname : null
  const mostraVideo = Boolean(media.video && allowVideo)

  const conteudo = (
    <div
      style={{
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid var(--glass-border)',
        background: 'rgba(10, 10, 14, 0.85)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
        position: 'relative',
      }}
    >
      {/* Barra do browser */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 0.9rem',
          borderBottom: '1px solid var(--glass-border)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        ))}
        {dominio && (
          <span
            style={{
              marginLeft: '0.75rem',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: 'var(--text-body)',
              letterSpacing: '0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {dominio}
          </span>
        )}
      </div>

      {mostraVideo ? (
        <video
          src={media.video}
          poster={media.poster ?? media.image}
          muted
          loop
          playsInline
          preload="none"
          width={1200}
          height={675}
          data-project-index={projectIndex}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      ) : (
        <img
          src={media.image}
          alt={media.alt}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      )}

      {media.url && (
        <span
          style={{
            position: 'absolute',
            right: '0.75rem',
            bottom: '0.75rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            background: 'rgba(2, 2, 3, 0.7)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {openLabel} ↗
        </span>
      )}
    </div>
  )

  if (media.url) {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${openLabel}: ${media.alt}`}
        style={{ display: 'block', width: '100%', textDecoration: 'none' }}
      >
        {conteudo}
      </a>
    )
  }
  return conteudo
}
