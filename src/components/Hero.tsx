import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Hero ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(91,140,255,0.15), transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(122,92,255,0.12), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', filter: 'blur(32px)' }} />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px]"
              style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' }}>
              <img 
                src="/foto-perfil.JPEG" 
                alt="Marcilio Ortiz" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name + Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
              Marcilio Ortiz
            </h1>
            <p className="text-lg sm:text-xl font-medium" style={{ color: 'var(--accent-blue)' }}>
              {t.hero.role}
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg max-w-xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Status badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            <span className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(74, 222, 128, 0.08)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.15)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t.hero.available}
            </span>
            <span className="text-xs sm:text-sm px-3 py-1.5 rounded-full"
              style={{ background: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
              {t.hero.remote}
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-2"
          >
            {t.hero.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
          >
            <a href="#contato" className="btn-primary text-center">{t.hero.cta}</a>
            <a href="#projetos" className="btn-secondary text-center">{t.hero.viewProjects}</a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: '1px solid var(--glass-border)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
} 