import { useLanguage } from '../i18n/LanguageContext'
import SectionWrapper from './SectionWrapper'
import { motion } from 'framer-motion'

export default function Experience() {
  const { t } = useLanguage()

  const statIcons = [
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  ]

  return (
    <SectionWrapper id="experiencia" className="container mx-auto px-5 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title mb-3">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-12 sm:mb-16">
          {t.experience.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass-card p-4 sm:p-6 text-center"
            >
              <div className="mb-2" style={{ color: 'var(--accent-blue)' }}>{statIcons[index]}</div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text">{stat.number}</div>
              <div className="text-[11px] sm:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-5">
          {t.experience.items.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card overflow-hidden"
              style={exp.featured ? {
                background: 'linear-gradient(135deg, rgba(91,140,255,0.06), rgba(122,92,255,0.06))',
                borderColor: 'rgba(91,140,255,0.15)',
              } : undefined}
            >
              <div className="p-5 sm:p-7">
                {exp.featured && (
                  <div className="mb-4">
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-md"
                      style={{ background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', color: 'white' }}>
                      {t.experience.featuredLabel}
                    </span>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start gap-5 sm:gap-6">
                  <div className="lg:w-1/3">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {exp.title}
                    </h3>
                    <p className="text-sm font-medium mb-1" style={{ color: exp.featured ? 'var(--accent-blue)' : 'var(--accent-purple)' }}>
                      {exp.type}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {exp.period}
                    </p>
                  </div>

                  <div className="lg:w-2/3">
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                      {exp.description}
                    </p>

                    <div className="mb-5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                        {t.experience.achievementsLabel}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#4ade80' }}>
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span style={{ color: 'var(--text-secondary)' }}>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                        {t.experience.techLabel}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="tech-tag text-[11px] sm:text-xs">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-16"
        >
          <div className="glass-card-static p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t.experience.ctaTitle}
            </h3>
            <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
              {t.experience.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#contato" className="btn-primary text-center">{t.experience.ctaButton}</a>
              <a href="#projetos" className="btn-secondary text-center">{t.experience.ctaProjects}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
} 