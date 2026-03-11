import { useLanguage } from '../i18n/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()

  const competencyIcons = [
    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m13 0h-6m-2-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h2m2 5V4a2 2 0 012-2h4a2 2 0 012 2v1M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0V4" />
    </svg>,
    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>,
    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
  ]

  const competencyColors = [
    'bg-indigo-500/20',
    'bg-green-500/20',
    'bg-blue-500/20',
    'bg-purple-500/20',
  ]

  return (
    <section id="habilidades" className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          {t.skills.title}
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          {t.skills.subtitle}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {t.skills.categories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover-lift"
              style={{
                animationDelay: `${categoryIndex * 150}ms`
              }}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${category.color} rounded-full mb-6`} />
              
              <h3 className="text-xl font-bold text-white mb-6">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Competências */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            {t.skills.competenciesTitle}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.skills.competencies.map((comp, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${competencyColors[index]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {competencyIcons[index]}
                </div>
                <h4 className="font-semibold text-white">{comp.title}</h4>
                <p className="text-sm text-gray-300">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 