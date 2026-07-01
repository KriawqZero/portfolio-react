import { content } from '../data/content'

export default function Footer() {
  const { footer: data } = content

  return (
    <footer style={{ 
      background: 'transparent', 
      borderTop: '1px solid var(--glass-border)', 
      padding: '3rem 0', 
      position: 'relative', 
      zIndex: 10,
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)', 
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}>
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
