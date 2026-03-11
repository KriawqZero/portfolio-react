import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#sobre', label: t.nav.about },
    { href: '#habilidades', label: t.nav.stack },
    { href: '#projetos', label: t.nav.projects },
    { href: '#experiencia', label: t.nav.experience },
    { href: '#contato', label: t.nav.contact },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' }}
            >
              K
            </div>
            <span className="text-sm font-semibold text-white hidden sm:block">
              Kriawq
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm rounded-lg transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="flex items-center rounded-lg p-0.5"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              <button
                onClick={() => setLocale('pt')}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300"
                style={{
                  background: locale === 'pt' ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
                  color: locale === 'pt' ? 'white' : 'var(--text-muted)',
                }}
              >
                PT
              </button>
              <button
                onClick={() => setLocale('en')}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300"
                style={{
                  background: locale === 'en' ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
                  color: locale === 'en' ? 'white' : 'var(--text-muted)',
                }}
              >
                EN
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden mx-4 rounded-2xl p-4"
            style={{
              background: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
