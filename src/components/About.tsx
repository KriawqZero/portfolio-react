import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          {t.about.title}
        </h2>

        {/* Bio */}
        <p className="text-lg text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto text-center">
          {t.about.bio}
        </p>

        {/* Core Expertise */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            {t.expertise.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.expertise.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-5 rounded-2xl text-center hover-lift"
              >
                <h4 className="font-semibold text-indigo-400 mb-1 text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Coluna Esquerda - Formação */}
          <div className="space-y-8">
            {/* Formação Acadêmica */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.about.educationTitle}
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-lg font-semibold text-indigo-400">
                    {t.about.education.course}
                  </p>
                  <p className="text-gray-300">
                    {t.about.education.institution}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {t.about.education.period}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {t.about.education.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Foco Profissional */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-500/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.about.focusTitle}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold text-indigo-400 mb-2">{t.about.focus[0].title}</h4>
                  <p className="text-gray-300 text-sm">
                    {t.about.focus[0].description}
                  </p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">{t.about.focus[1].title}</h4>
                  <p className="text-gray-300 text-sm">
                    {t.about.focus[1].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Trajetória */}
          <div className="space-y-8">
            {/* Trajetória */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-500/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.about.journeyTitle}
                </h3>
              </div>
              
              <div className="space-y-4">
                {t.about.journey.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 