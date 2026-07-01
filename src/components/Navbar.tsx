import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        pointerEvents: 'none', // So it doesn't block clicks on the rest of the screen
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {/* Logo */}
        <a
          href="#inicio"
          style={{
            pointerEvents: 'auto', // Re-enable clicks for the logo
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'all 0.4s var(--ease-cinematic)',
            opacity: scrolled ? 0.4 : 0, // Becomes very subtle when scrolled
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.opacity = scrolled ? '0.4' : '1'
          }}
        >
          <img
            src="/marciliortiz-logo-light.svg"
            alt="MO"
            style={{ height: 48, width: 'auto' }}
          />
        </a>
      </div>
    </motion.nav>
  )
}
