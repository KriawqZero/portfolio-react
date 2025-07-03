export default function Experience() {
  const experiencias = [
    {
      titulo: 'Desenvolvedor Full Stack',
      tipo: 'Freelancer & Projetos Pessoais',
      periodo: '2017 - Presente',
      descricao: 'Desenvolvimento de soluções completas para diversos clientes e projetos institucionais, incluindo sistemas em produção com mais de 1.000 usuários ativos.',
      realizacoes: [
        'Criação de mais de 30 projetos diversos',
        'Redução de 80% no tempo de emissão de certificados no IFMS',
        'Implementação de infraestrutura Docker multi-cliente',
        'Desenvolvimento de sistema de segurança extrema em produção',
        'Arquitetura e deploy de aplicações na AWS'
      ],
      skills: ['NestJS', 'React', 'AWS', 'Docker', 'PostgreSQL', 'Laravel'],
      destaque: true
    },
    {
      titulo: 'Desenvolvedor Backend',
      tipo: 'Projetos Especializados',
      periodo: '2020 - Presente',
      descricao: 'Especialização em desenvolvimento backend robusto com foco em NestJS, criando APIs escaláveis e arquiteturas modernas.',
      realizacoes: [
        'Expert em NestJS com arquitetura limpa',
        'Integração com serviços AWS (S3, VPC)',
        'Desenvolvimento de APIs RESTful e GraphQL',
        'Implementação de autenticação e autorização segura',
        'Otimização de performance e escalabilidade'
      ],
      skills: ['NestJS', 'Node.js', 'TypeScript', 'AWS', 'Redis', 'MongoDB'],
      destaque: false
    },
    {
      titulo: 'Desenvolvedor Full Stack',
      tipo: 'Sistemas Institucionais',
      periodo: '2022 - 2024',
      descricao: 'Desenvolvimento de sistemas para instituições educacionais com foco em automação de processos e melhoria de eficiência.',
      realizacoes: [
        'Sistema IFMS com 1000+ usuários ativos',
        'Redução significativa em processos manuais',
        'Interface moderna e responsiva',
        'Implementação de workflows automatizados',
        'Manutenção e evolução contínua'
      ],
      skills: ['Laravel', 'Alpine.js', 'TailwindCSS', 'MariaDB', 'Livewire'],
      destaque: false
    }
  ]

  const stats = [
    { numero: '7+', label: 'Anos programando', icone: '🚀' },
    { numero: '30+', label: 'Projetos desenvolvidos', icone: '💻' },
    { numero: '1000+', label: 'Usuários ativos', icone: '👥' },
    { numero: '80%', label: 'Redução de tempo em processos', icone: '⚡' }
  ]

  return (
    <section id="experiencia" className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Experiência Profissional
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          Mais de 7 anos criando soluções inovadoras para diversos tipos de projetos e clientes
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-2xl text-center hover:bg-gray-700 transition-all duration-300 hover-lift"
            >
              <div className="text-2xl mb-2">{stat.icone}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.numero}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiencias.map((exp, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl transition-all duration-300 hover-lift ${
                exp.destaque 
                  ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30' 
                  : 'bg-gray-800'
              }`}
            >
              {exp.destaque && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-medium">
                    Principal
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Info Principal */}
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exp.titulo}
                  </h3>
                  <p className={`text-lg font-medium mb-2 ${
                    exp.destaque ? 'text-indigo-400' : 'text-purple-400'
                  }`}>
                    {exp.tipo}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {exp.periodo}
                  </p>
                </div>

                {/* Descrição e Realizações */}
                <div className="lg:w-2/3">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.descricao}
                  </p>

                  {/* Realizações */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Principais Realizações:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {exp.realizacoes.map((realizacao, i) => (
                        <div key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300 text-sm">{realizacao}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Tecnologias Utilizadas:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exp.destaque 
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
              Pronto para o próximo desafio
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Com essa experiência diversificada, estou preparado para contribuir em projetos freelancer, equipes remotas, híbridas ou presenciais. Vamos construir algo incrível juntos?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contato"
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 font-medium"
              >
                Vamos Conversar
              </a>
              <a
                href="#projetos"
                className="px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium"
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