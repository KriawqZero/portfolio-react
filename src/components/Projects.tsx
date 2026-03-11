import { useLanguage } from '../i18n/LanguageContext'
import type { ReactNode } from 'react'

export default function Projects() {
  const { t } = useLanguage()

  const projectIcons: ReactNode[] = [
    <img src="https://condy.com.br/favicon.ico" alt="Condy" className="w-8 h-8" />,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>,
  ]

  const projectLinks = [
    { siteLink: 'https://condy.com.br', repo: null },
    { siteLink: null, repo: null, showInDevelopment: true },
    { siteLink: null, repo: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria' },
  ]

  const getStatusClass = (status: string) => {
    if (status === 'production') return 'bg-green-500/20 text-green-400'
    if (status === 'development') return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-blue-500/20 text-blue-400'
  }

  const getStatusLabel = (status: string) => {
    if (status === 'production') return t.projects.statusProduction
    if (status === 'development') return t.projects.statusDevelopment
    return t.projects.statusDone
  }

  return (
    <section id="projetos" className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          {t.projects.title}
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          {t.projects.subtitle}
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {t.projects.items.map((project, index) => {
            const links = projectLinks[index]
            return (
              <div
                key={project.title}
                className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-indigo-400 mr-4">{projectIcons[index]}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-medium">
                            {project.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">{t.projects.highlightsLabel}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">{t.projects.stackLabel}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {links.siteLink && (
                      <a
                        href={links.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg text-center hover:bg-indigo-700 transition-colors font-medium"
                      >
                        {t.projects.viewSite}
                      </a>
                    )}

                    {!links.siteLink && links.showInDevelopment && (
                      <div className="flex-1 bg-gray-700 text-gray-300 py-3 px-4 rounded-lg text-center font-medium">
                        {t.projects.inDevelopment}
                      </div>
                    )}

                    {links.repo ? (
                      <a
                        href={links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${
                          links.siteLink
                            ? 'border-2 border-indigo-600 text-indigo-400 hover:bg-gray-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        } py-3 px-4 rounded-lg text-center transition-colors font-medium`}
                      >
                        {t.projects.viewRepo}
                      </a>
                    ) : (
                      !links.siteLink &&
                      !links.showInDevelopment && (
                        <div className="flex-1 bg-gray-700 text-gray-400 py-3 px-4 rounded-lg text-center font-medium">
                          {t.projects.privateRepo}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t.projects.ctaTitle}
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                {t.projects.ctaDescription}
              </p>
              <a
                href="#contato"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 font-medium"
              >
                {t.projects.ctaButton}
              </a>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          </div>
        </div>
      </div>
    </section>
  )
}
