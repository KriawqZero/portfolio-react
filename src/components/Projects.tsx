export default function Projects() {
  const projects = [
    {
      title: 'Condy.com.br',
      description: 'Sistema de chamados com segurança utilizando AWS S3. Desenvolvido para atender pequenas empresas com alta confidencialidade.',
      technologies: ['NestJS', 'PostgreSQL', 'AWS S3', 'Docker'],
      status: 'live',
      link: 'https://condy.com.br',
      highlight: true
    },
    {
      title: 'SmartAssistant',
      description: 'IA integrada ao WhatsApp Business para automação de atendimento, utilizando processamento de linguagem natural.',
      technologies: ['NestJS', 'OpenAI API', 'WhatsApp API', 'Redis'],
      status: 'development',
      highlight: true
    },
    {
      title: 'Sistema IFMS',
      description: 'Automação de processos acadêmicos para o IFMS, com mais de 1.000 usuários ativos. Reduziu tempo de processos em 80%.',
      technologies: ['Laravel', 'MySQL', 'TailwindCSS', 'Alpine.js'],
      status: 'repository',
      repo: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria',
      highlight: true
    }
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'live':
        return {
          label: 'Online',
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      case 'development':
        return {
          label: 'Em Desenvolvimento',
          color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
        }
      case 'private':
        return {
          label: 'Privado',
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
        }
      default:
        return {
          label: 'Projeto',
          color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4'
        }
    }
  }

  const renderProjectButton = (project: any) => {
    if (project.status === 'live' && project.link) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ver Site
        </a>
      )
    }

    if (project.status === 'development') {
      return (
        <span className="inline-flex items-center px-6 py-3 bg-yellow-600/20 text-yellow-400 rounded-lg font-medium border border-yellow-500/30">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Em Desenvolvimento
        </span>
      )
    }

    if (project.status === 'repository' && project.repo) {
      return (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-indigo-600/20 text-indigo-400 rounded-lg font-medium border border-indigo-500/30">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Ver Repositório 
        </a>
      )
    }

    return (
      <span className="inline-flex items-center px-6 py-3 bg-gray-600/20 text-gray-400 rounded-lg font-medium border border-gray-500/30">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Repositório Privado
      </span>
    )
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Projetos em Destaque
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid de projetos */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const statusInfo = getStatusInfo(project.status)
            
            return (
              <div 
                key={project.title}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500 ${
                  project.highlight ? 'hover:scale-105 hover:shadow-2xl' : ''
                }`}
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={statusInfo.icon} />
                    </svg>
                    {statusInfo.label}
                  </span>
                  
                  {project.highlight && (
                    <span className="inline-flex items-center px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs border border-indigo-500/30">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Destaque
                    </span>
                  )}
                </div>

                {/* Conteúdo do projeto */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tecnologias */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botão de ação */}
                  <div className="pt-4">
                    {renderProjectButton(project)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interessado em ver mais projetos?
            </h3>
            <p className="text-gray-300 mb-6">
              Tenho mais de 30 projetos desenvolvidos. Entre em contato para conhecer meu portfólio completo.
            </p>
            <a
              href="#contato"
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Vamos Conversar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
