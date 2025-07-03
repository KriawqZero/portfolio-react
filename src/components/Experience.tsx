import { useScrollReveal, useScrollRevealList } from '../hooks/useScrollReveal'

export default function Experience() {
  // Scroll reveal hooks
  const titleReveal = useScrollReveal({ delay: 0 })
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const mainExperienceReveal = useScrollReveal({ delay: 600 })
  const ctaReveal = useScrollReveal({ delay: 800 })

  const experiencias = [
    {
      titulo: 'Desenvolvedor Full Stack',
      periodo: '2017 - Presente',
      descricao: 'Desenvolvimento de soluções completas para diversos clientes e projetos institucionais.',
      realizacoes: [
        '30+ projetos desenvolvidos',
        'Sistema IFMS com 1000+ usuários',
        'Redução de 80% em processos manuais',
        'Infraestrutura AWS em produção'
      ],
      skills: ['NestJS', 'React', 'AWS', 'PostgreSQL'],
      destaque: true
    }
  ]

  const stats = [
    { numero: '7+', label: 'Anos programando' },
    { numero: '30+', label: 'Projetos desenvolvidos' },
    { numero: '1000+', label: 'Usuários ativos' },
    { numero: '80%', label: 'Redução de tempo' }
  ]

  // Hook para animar as estatísticas
  const { setElementRef: setStatRef, visibleItems: statsVisible } = useScrollRevealList(
    stats.length, 
    { delay: 400 }
  )

  return (
    <section id="experiencia" className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={titleReveal.elementRef}
          className={`text-center mb-4 ${
            titleReveal.isVisible ? 'slide-down-visible' : 'slide-down-hidden'
          }`}
        >
          <h2 className="text-4xl font-bold text-white">
            Experiência
          </h2>
        </div>
        
        <div 
          ref={descriptionReveal.elementRef}
          className={`text-center mb-16 ${
            descriptionReveal.isVisible ? 'fade-in-visible' : 'fade-in-hidden'
          }`}
        >
          <p className="text-xl text-gray-300">
            7+ anos criando soluções inovadoras
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={setStatRef(index)}
              className={`bg-gray-800 p-6 rounded-2xl text-center hover:bg-gray-700 transition-all duration-300 ${
                statsVisible[index] ? 'scale-visible' : 'scale-hidden'
              }`}
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.numero}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Experiência Principal */}
        <div 
          ref={mainExperienceReveal.elementRef}
          className={`bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 p-8 rounded-2xl ${
            mainExperienceReveal.isVisible ? 'slide-scale-visible' : 'slide-scale-hidden'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-bold text-white mb-2">
                {experiencias[0].titulo}
              </h3>
              <p className="text-indigo-400 text-lg font-medium mb-2">
                Freelancer & Projetos Pessoais
              </p>
              <p className="text-gray-400 text-sm">
                {experiencias[0].periodo}
              </p>
            </div>

            <div className="lg:w-2/3">
              <p className="text-gray-300 mb-6 leading-relaxed">
                {experiencias[0].descricao}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Principais Realizações:
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {experiencias[0].realizacoes.map((realizacao, i) => (
                    <div 
                      key={i} 
                      className={`flex items-start stagger-${Math.min(i + 1, 6)} ${
                        mainExperienceReveal.isVisible ? 'slide-right-visible' : 'slide-right-hidden'
                      }`}
                    >
                      <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{realizacao}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Stack Principal:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experiencias[0].skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-sm font-medium stagger-${Math.min(i + 1, 6)} ${
                        mainExperienceReveal.isVisible ? 'fade-in-visible' : 'fade-in-hidden'
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

        {/* CTA */}
        <div 
          ref={ctaReveal.elementRef}
          className={`mt-12 text-center ${
            ctaReveal.isVisible ? 'blur-visible' : 'blur-hidden'
          }`}
        >
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3">
              Pronto para o próximo desafio
            </h3>
            <p className="text-gray-300 mb-4">
              Disponível para freelancer, remoto, híbrido ou presencial
            </p>
            <a
              href="#contato"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium"
            >
              Vamos Conversar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 