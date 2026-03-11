import { useLanguage } from '../i18n/LanguageContext'
import SectionWrapper from './SectionWrapper'
import { motion } from 'framer-motion'

export default function Projects() {
  const { t } = useLanguage()

  const projectLinks = [
    { siteLink: 'https://condy.com.br', repo: null },
    { siteLink: null, repo: null, showInDevelopment: true },
    { siteLink: null, repo: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria' },
  ]

  const getStatusStyle = (status: string) => {
    if (status === 'production')
      return { background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }
    if (status === 'development')
      return { background: 'rgba(250,204,21,0.08)', color: '#facc15', border: '1px solid rgba(250,204,21,0.15)' }
    return { background: 'rgba(91,140,255,0.08)', color: 'var(--accent-blue)', border: '1px solid rgba(91,140,255,0.15)' }
  }

  const getStatusLabel = (status: string) => {
    if (status === 'production') return t.projects.statusProduction
    if (status === 'development') return t.projects.statusDevelopment
    return t.projects.statusDone
  }

  return (
    <SectionWrapper id="projetos" className="container mx-auto px-5 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title mb-3">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </div>

        {/* Project Cards */}
        <div className="space-y-5">
          {t.projects.items.map((project, index) => {
            const links = projectLinks[index]
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-5 sm:p-7">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs px-2.5 py-1 rounded-md"
                          style={{ background: 'rgba(91,140,255,0.08)', color: 'var(--accent-blue)', border: '1px solid rgba(91,140,255,0.12)' }}>
                          {project.category}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-md" style={getStatusStyle(project.status)}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                      {t.projects.highlightsLabel}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#4ade80' }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span style={{ color: 'var(--text-secondary)' }}>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech + Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag text-[11px] sm:text-xs">{tech}</span>
                      ))}
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {links.siteLink && (
                        <a href={links.siteLink} target="_blank" rel="noopener noreferrer"
                          className="btn-primary text-xs py-2 px-4">{t.projects.viewSite}</a>
                      )}
                      {!links.siteLink && links.showInDevelopment && (
                        <span className="text-xs py-2 px-4 rounded-lg font-medium"
                          style={{ background: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
                          {t.projects.inDevelopment}
                        </span>
                      )}
                      {links.repo && (
                        <a href={links.repo} target="_blank" rel="noopener noreferrer"
                          className="btn-secondary text-xs py-2 px-4">{t.projects.viewRepo}</a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <div className="relative rounded-2xl p-8 sm:p-10 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(91,140,255,0.12), rgba(122,92,255,0.12))', border: '1px solid rgba(91,140,255,0.15)' }}>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                {t.projects.ctaTitle}
              </h3>
              <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
                {t.projects.ctaDescription}
              </p>
              <a href="#contato" className="btn-primary inline-block">{t.projects.ctaButton}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
