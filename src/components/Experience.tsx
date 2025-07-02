export default function Experience() {
  const experiences = [
    {
      title: 'Desenvolvedor Full Stack Freelancer',
      company: 'Autônomo',
      period: '2017 - Presente',
      location: 'Corumbá, MS - Remoto',
      description: 'Desenvolvimento de soluções completas para clientes diversos, desde MVPs até sistemas complexos em produção.',
      achievements: [
        'Mais de 30 projetos desenvolvidos de forma autodidata',
        'Especialização em NestJS, React/Next.js e Laravel',
        'Implementação de arquiteturas escaláveis com AWS',
        'Gerenciamento de múltiplos clientes simultaneamente'
      ],
      tech: ['NestJS', 'React', 'Next.js', 'Laravel', 'AWS', 'Docker'],
      type: 'work'
    },
    {
      title: 'Projeto Condy - Sistema de Segurança',
      company: 'Cliente Empresarial',
      period: '2024 - Presente',
      location: 'Remoto',
      description: 'Desenvolvimento de sistema com segurança extrema, arquitetura separada entre frontend e backend com infraestrutura AWS avançada.',
      achievements: [
        'Configuração de VPC personalizada para S3',
        'Implementação de segurança extrema',
        'Deploy em produção na AWS',
        'Arquitetura frontend/backend separada'
      ],
      tech: ['Laravel', 'Vue.js', 'AWS S3', 'AWS VPC', 'PostgreSQL'],
      type: 'project'
    },
    {
      title: 'Sistema IFMS - Automação Acadêmica',
      company: 'Instituto Federal de MS',
      period: '2023 - 2024',
      location: 'Corumbá, MS',
      description: 'Desenvolvimento de sistema institucional para automação de processos acadêmicos como projeto de TCC.',
      achievements: [
        'Redução de 80% no tempo de emissão de documentos',
        'Mais de 1.000 usuários ativos',
        'Adoção institucional oficial',
        'Interface moderna com Alpine.js e Tailwind'
      ],
      tech: ['Laravel 11', 'Alpine.js', 'TailwindCSS', 'MariaDB', 'Livewire'],
      type: 'education'
    },
    {
      title: 'Infraestrutura DevOps Multi-cliente',
      company: 'Projetos Freelancer',
      period: '2023 - Presente',
      location: 'Remoto',
      description: 'Implementação de infraestrutura Docker para gerenciar múltiplos projetos de clientes com isolamento completo.',
      achievements: [
        'Configuração de redes Docker isoladas',
        'Gerenciamento com OpenProject self-hosted',
        'Backup automatizado para múltiplos projetos',
        'Monitoramento centralizado'
      ],
      tech: ['Docker', 'NGINX', 'Linux', 'OpenProject', 'Docker Networks'],
      type: 'work'
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        )
      case 'project':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'education':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'work': return 'Profissional'
      case 'project': return 'Projeto'
      case 'education': return 'Acadêmico'
      default: return ''
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'from-blue-500 to-indigo-500'
      case 'project': return 'from-green-500 to-teal-500'
      case 'education': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="experiencia" className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Experiência & Trajetória
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          Jornada de desenvolvimento profissional e projetos realizados
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Linha central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-700 h-full"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12">
              {/* Indicador central */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${getTypeColor(exp.type)} rounded-full flex items-center justify-center text-white border-4 border-gray-900 z-10`}>
                {getIcon(exp.type)}
              </div>

              {/* Conteúdo */}
              <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover-lift">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 bg-gradient-to-r ${getTypeColor(exp.type)} text-white rounded-full text-sm font-medium`}>
                          {getTypeLabel(exp.type)}
                        </span>
                        <span className="text-sm text-gray-400">
                          {exp.period}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-300 mt-1">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m0 0H5m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                        </svg>
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Conquistas */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-2">Principais realizações:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tecnologias */}
                    <div>
                      <h4 className="font-semibold text-white mb-2">Tecnologias utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Estatísticas da Carreira
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-400">30+</div>
              <div className="text-gray-300">Projetos Desenvolvidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">7+</div>
              <div className="text-gray-300">Anos Programando</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">15+</div>
              <div className="text-gray-300">Tecnologias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">3</div>
              <div className="text-gray-300">Projetos em Produção</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 