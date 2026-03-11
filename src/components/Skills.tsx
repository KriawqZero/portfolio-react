import { useLanguage } from '../i18n/LanguageContext'
import SectionWrapper from './SectionWrapper'
import { motion } from 'framer-motion'

export default function Skills() {
  const { t } = useLanguage()

  const categoryAccents = [
    { gradient: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' },
    { gradient: 'linear-gradient(135deg, var(--accent-purple), var(--accent-violet))' },
    { gradient: 'linear-gradient(135deg, var(--accent-violet), var(--accent-blue))' },
  ]

  const competencyEmojis = ['💻', '🛡️', '☁️', '⚡']

  return (
    <SectionWrapper id="habilidades" className="container mx-auto px-5 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title mb-3">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>
        </div>

        {/* Tech Stack Categories */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {t.skills.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="glass-card p-5 sm:p-6"
            >
              {/* Accent bar */}
              <div className="h-0.5 w-12 rounded-full mb-5" style={{ background: categoryAccents[categoryIndex].gradient }} />
              
              <h3 className="text-base sm:text-lg font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-static p-6 sm:p-8"
        >
          <h3 className="text-lg font-semibold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
            {t.skills.competenciesTitle}
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.skills.competencies.map((comp, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-3">{competencyEmojis[index]}</div>
                <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{comp.title}</h4>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{comp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
} 