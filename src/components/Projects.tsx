export default function Projects() {
  const projects = [
    {
      title: "condy.com.br - Sistema de Chamados",
      description: "Sistema de segurança extrema com workflow de chamados multi-etapas e integração AWS S3.",
      tech: ["NestJS", "React", "NextJS", "PostgreSQL", "Docker", "AWS S3"],
      highlights: [
        "Sistema em produção com segurança extrema",
        "VPC configurada para domínio customizado",
        "Workflow de chamados em múltiplas etapas"
      ],
      status: "Em produção",
      category: "Full Stack",
      icon: (
        <img src="https://condy.com.br/favicon.ico" alt="Condy" className="w-8 h-8" />
      ),
      siteLink: "https://condy.com.br",
      repo: null
    },
    {
      title: "SmartAssistant",
      description: "Plataforma de atendimento humanizado com IA via WhatsApp Business para estabelecimentos.",
      tech: ["NestJS", "React", "OpenAI API", "WhatsApp Business API", "PostgreSQL"],
      highlights: [
        "Integração com WhatsApp Business API",
        "IA conversacional humanizada",
        "Dashboard para gerenciar conversas"
      ],
      status: "Em desenvolvimento",
      category: "IA & Automação",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      siteLink: null,
      repo: null,
      showInDevelopment: true
    },
    {
      title: "Sistema IFMS - Certificados",
      description: "Automação de processos acadêmicos com redução de 80% no tempo de emissão de documentos.",
      tech: ["Laravel 11", "Alpine.js", "TailwindCSS", "MariaDB"],
      highlights: [
        "Redução de 80% no tempo de emissão",
        "Mais de 1.000 usuários ativos",
        "Adoção institucional oficial"
      ],
      status: "Em produção",
      category: "Institucional",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      siteLink: null,
      repo: "https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria"
    }
  ]

  return (
    <section id="projetos" className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Projetos em Destaque
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          Seleção dos principais projetos desenvolvidos
        </p>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-indigo-400 mr-4">{project.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                        {project.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Em produção" ? "bg-green-500/20 text-green-400" :
                        project.status === "Em desenvolvimento" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <div className="space-y-2">
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

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
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

                {!project.siteLink && project.showInDevelopment && (
                  <div className="flex-1 bg-gray-700 text-gray-300 py-3 px-4 rounded-lg text-center font-medium">
                    Em desenvolvimento
                  </div>
                )}

                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 ${
                      project.siteLink
                        ? "border-2 border-indigo-600 text-indigo-400 hover:bg-gray-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    } py-3 px-4 rounded-lg text-center transition-colors font-medium`}
                  >
                    Ver Repositório
                  </a>
                ) : (
                  !project.siteLink &&
                  !project.showInDevelopment && (
                    <div className="flex-1 bg-gray-700 text-gray-400 py-3 px-4 rounded-lg text-center font-medium">
                      Repositório Privado
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Gostou dos projetos?
            </h3>
            <p className="text-indigo-100 mb-6">
              Vamos conversar sobre sua próxima ideia
            </p>
            <a
              href="#contato"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 font-medium"
            >
              Falar Comigo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
