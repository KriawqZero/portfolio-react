import { useLanguage } from '../i18n/LanguageContext'
import SectionWrapper from './SectionWrapper'
import { motion } from 'framer-motion'

export default function About() {
  const { t } = useLanguage()

  const expertiseIcons = ['⚡', '🔗', '🏗️', '🤖', '☁️']

  return (
    <SectionWrapper id="sobre" className="container mx-auto px-5 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title mb-4">{t.about.title}</h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {t.about.bio}
          </p>
        </div>

        {/* Core Expertise */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-6 sm:mb-8" style={{ color: 'var(--text-primary)' }}>
            {t.expertise.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {t.expertise.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="glass-card p-4 sm:p-5 text-center"
              >
                <div className="text-xl mb-2">{expertiseIcons[index]}</div>
                <h4 className="font-medium text-xs sm:text-sm mb-1" style={{ color: 'var(--accent-blue)' }}>
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Education */}
            <div className="glass-card-static p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(91,140,255,0.1)' }}>
                  <svg className="w-4.5 h-4.5" fill="none" stroke="var(--accent-blue)" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t.about.educationTitle}
                </h3>
              </div>
              
              <div className="p-4 rounded-xl" style={{ background: 'rgba(91,140,255,0.04)', border: '1px solid rgba(91,140,255,0.1)' }}>
                <p className="font-medium text-sm" style={{ color: 'var(--accent-blue)' }}>
                  {t.about.education.course}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {t.about.education.institution}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t.about.education.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>
                    {t.about.education.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Focus */}
            <div className="glass-card-static p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(122,92,255,0.1)' }}>
                  <svg className="w-4.5 h-4.5" fill="none" stroke="var(--accent-purple)" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t.about.focusTitle}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl" style={{ background: 'rgba(91,140,255,0.04)', border: '1px solid rgba(91,140,255,0.08)' }}>
                  <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--accent-blue)' }}>{t.about.focus[0].title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {t.about.focus[0].description}
                  </p>
                </div>
                
                <div className="p-4 rounded-xl" style={{ background: 'rgba(122,92,255,0.04)', border: '1px solid rgba(122,92,255,0.08)' }}>
                  <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--accent-purple)' }}>{t.about.focus[1].title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {t.about.focus[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Journey */}
          <div className="glass-card-static p-6 sm:p-7 h-fit">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74,222,128,0.1)' }}>
                <svg className="w-4.5 h-4.5" fill="none" stroke="#4ade80" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t.about.journeyTitle}
              </h3>
            </div>
            
            <div className="space-y-4">
              {t.about.journey.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent-blue)' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
} 