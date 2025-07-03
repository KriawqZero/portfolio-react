export default function Experience() {
  const stats = [
    { number: '7+', label: 'Anos de Experiência', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { number: '30+', label: 'Projetos Concluídos', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { number: '1000+', label: 'Usuários Ativos', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
    { number: '80%', label: 'Redução de Tempo', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
  ]

  const achievements = [
    {
      title: 'Sistema IFMS em Produção',
      description: 'Desenvolvimento de sistema que automatizou processos acadêmicos, reduzindo tempo de emissão em 80%',
      year: '2024',
      icon: 'M12 14l9-5-9-5-9 5 9 5z',
      color: 'indigo'
    },
    {
      title: 'Condy.com.br - Segurança Extrema',
      description: 'Sistema de chamados com arquitetura VPC na AWS para máxima confidencialidade',
      year: '2024',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      color: 'green'
    },
    {
      title: 'Especialização em NestJS',
      description: 'Domínio completo do framework, incluindo microservices, guards, pipes e arquitetura modular',
      year: '2023',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Experiência & Conquistas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline de conquistas */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Principais Realizações
          </h3>
          
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.title}
              className="flex items-start gap-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
            >
              {/* Ícone e ano */}
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getColorClasses(achievement.color)} border`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={achievement.icon} />
                  </svg>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-400 font-medium">{achievement.year}</span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">{achievement.title}</h4>
                <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para o próximo desafio
            </h3>
            <p className="text-gray-300 mb-6">
              Com 7+ anos de experiência, estou preparado para contribuir com projetos inovadores e equipes de alto desempenho.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contato"
                className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Vamos Conversar
              </a>
              <a
                href="#projetos"
                className="inline-flex items-center px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Ver Projetos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 