import { useLanguage } from '../i18n/LanguageContext'

export default function Experience() {
  const { t } = useLanguage()

  const statIcons = ['🚀', '', '⚡']

  return (
    <section id="experiencia" className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          {t.experience.title}
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          {t.experience.subtitle}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {t.experience.stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-2xl text-center hover:bg-gray-700 transition-all duration-300 hover-lift"
            >
              <div className="text-2xl mb-2">{statIcons[index]}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {t.experience.items.map((exp, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl transition-all duration-300 hover-lift ${
                exp.featured 
                  ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30' 
                  : 'bg-gray-800'
              }`}
            >
              {exp.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-medium">
                    {t.experience.featuredLabel}
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className={`text-lg font-medium mb-2 ${
                    exp.featured ? 'text-indigo-400' : 'text-purple-400'
                  }`}>
                    {exp.type}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {exp.period}
                  </p>
                </div>

                <div className="lg:w-2/3">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {t.experience.achievementsLabel}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {t.experience.techLabel}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exp.featured 
                              ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.experience.ctaTitle}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t.experience.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contato"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 font-medium"
              >
                {t.experience.ctaButton}
              </a>
              <a
                href="#projetos"
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium"
              >
                {t.experience.ctaProjects}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 