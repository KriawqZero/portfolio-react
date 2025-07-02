export default function Projects() {
  const projects = [
    {
      title: 'Condy.com.br - Sistema de Chamados',
      description: 'Sistema de segurança extrema com sistema de chamados multi-etapas, upload dinâmico de anexos via Amazon S3 e arquitetura separada entre frontend Vue e backend Laravel.',
      longDescription: 'Projeto focado em segurança máxima com workflow complexo de chamados, integração com S3 para anexos e configuração avançada de AWS com VPC customizada.',
      tech: ['Laravel', 'Vue.js', 'AWS S3', 'AWS VPC', 'PostgreSQL', 'Docker'],
      highlights: [
        'Segurança extrema implementada',
        'VPC configurada para domínio customizado',
        'Workflow de chamados em múltiplas etapas',
        'Upload dinâmico para S3',
        'Painel admin com permissões granulares'
      ],
      status: 'Em produção',
      category: 'Full Stack',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      siteLink: 'https://condy.com.br',
      repo: null // Privado
    },
    {
      title: 'SmartAssistant',
      description: 'Plataforma de atendimento humanizado com IA via WhatsApp para estabelecimentos e conveniências, oferecendo suporte automatizado inteligente com interações naturais.',
      longDescription: 'Sistema inovador que permite estabelecimentos oferecerem atendimento 24/7 via WhatsApp com IA, mantendo o tom humano e personalizado.',
      tech: ['NestJS', 'React', 'OpenAI API', 'WhatsApp Business API', 'PostgreSQL', 'Redis'],
      highlights: [
        'Integração com WhatsApp Business API',
        'IA conversacional humanizada',
        'Dashboard para gerenciar conversas',
        'Métricas de satisfação do cliente',
        'Configuração personalizada por estabelecimento'
      ],
      status: 'Em desenvolvimento',
      category: 'IA & Automação',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      siteLink: null,
      repo: null // Privado
    },
    {
      title: 'Plataforma Imobiliária',
      description: 'Sistema de centralização de venda e aluguel de imóveis com monetização por "boost" nas publicações e sistema de recomendações baseado no perfil do usuário.',
      longDescription: 'Marketplace imobiliário completo com sistema de monetização inovador e algoritmo de recomendações personalizadas.',
      tech: ['NestJS', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      highlights: [
        'Sistema de boost monetizado',
        'Recomendações por perfil',
        'Gestão completa de imóveis',
        'Dashboard para imobiliárias',
        'Sistema de avaliações e reviews'
      ],
      status: 'Em desenvolvimento',
      category: 'Marketplace',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      siteLink: null,
      repo: null // Cliente
    },
    {
      title: 'Sistema IFMS - Certificados',
      description: 'Solução institucional para automação de processos acadêmicos com redução de 80% no tempo de emissão de documentos.',
      longDescription: 'Sistema desenvolvido para o IFMS focado na gestão e emissão automatizada de certificados e documentos acadêmicos.',
      tech: ['Laravel 11', 'Alpine.js', 'TailwindCSS', 'MariaDB', 'Livewire'],
      highlights: [
        'Redução de 80% no tempo de emissão',
        'Automação de processos acadêmicos',
        'Interface moderna e responsiva',
        'Mais de 1.000 usuários ativos',
        'Adoção institucional oficial'
      ],
      status: 'Em produção',
      category: 'Institucional',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      siteLink: null,
      repo: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria'
    },
    {
      title: 'Infraestrutura Docker Multi-cliente',
      description: 'Arquitetura Docker robusta para gerenciar múltiplos monolitos por cliente usando NGINX e redes Docker isoladas.',
      longDescription: 'Sistema de infraestrutura escalável para hospedar múltiplos projetos de clientes diferentes com isolamento completo.',
      tech: ['Docker', 'NGINX', 'Docker Networks', 'Linux', 'OpenProject'],
      highlights: [
        'Isolamento por cliente',
        'Gerenciamento automatizado',
        'Monitoramento centralizado',
        'Backup automatizado',
        'Escalabilidade horizontal'
      ],
      status: 'Em produção',
      category: 'DevOps',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      siteLink: null,
      repo: null // Interno
    },
    {
      title: 'Portfolio React Moderno',
      description: 'Portfolio responsivo e moderno desenvolvido em React com TypeScript e TailwindCSS, incluindo animações avançadas e design profissional.',
      longDescription: 'Showcase pessoal desenvolvido com as melhores práticas de desenvolvimento frontend moderno.',
      tech: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Responsive Design'],
      highlights: [
        'Design moderno e responsivo',
        'Animações suaves',
        'Performance otimizada',
        'SEO otimizado',
        'Acessibilidade web'
      ],
      status: 'Concluído',
      category: 'Frontend',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      siteLink: null,
      repo: 'https://github.com/KriawqZero/portfolio-react'
    }
  ]

  return (
    <section id="projetos" className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Projetos em Destaque
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          Soluções reais desenvolvidas para clientes e projetos pessoais
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift"
            >
              {/* Header do Projeto */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-indigo-400 mr-4">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Em produção' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'Em desenvolvimento' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Destaques:</h4>
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

                {/* Tecnologias */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.siteLink && (
                    <a
                      href={project.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg text-center hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Ver Site
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 border-2 border-indigo-600 text-indigo-400 py-3 px-4 rounded-lg text-center hover:bg-gray-700 transition-colors font-medium ${project.siteLink ? '' : 'bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600'}`}
                    >
                      Ver Repositório
                    </a>
                  )}
                  {!project.siteLink && !project.repo && (
                    <div className="flex-1 bg-gray-700 text-gray-400 py-3 px-4 rounded-lg text-center font-medium">
                      Repositório Privado
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interessado em uma colaboração?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Estou sempre aberto a novos desafios e projetos interessantes. Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
            </p>
            <a
              href="#contato"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 font-medium"
            >
              Vamos Conversar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 