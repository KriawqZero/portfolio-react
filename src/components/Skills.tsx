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

  const competencyIcons = [
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  ]

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
                <div className="flex justify-center mb-3" style={{ color: 'var(--accent-blue)' }}>{competencyIcons[index]}</div>
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