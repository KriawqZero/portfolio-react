export default function About() {
  const formacao = {
    graduacao: {
      curso: 'Sistemas de Informação',
      instituicao: 'UFMS',
      status: 'Cursando'
    },
    tecnico: {
      curso: 'Técnico em Informática',
      instituicao: 'IFMS',
      status: 'Concluído (2024)'
    }
  }

  const habilidades = [
    'Arquitetura de software escalável',
    'APIs RESTful e GraphQL',
    'Bancos de dados relacionais e NoSQL',
    'Infraestrutura em nuvem (AWS)',
    'DevOps e containerização'
  ]

  return (
    <section id="sobre" className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Sobre Mim
        </h2>
        <p className="text-xl text-center text-gray-300 mb-12">
          Desenvolvedor Full Stack com especialização em NestJS e React
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Desenvolvedor Full Stack com <strong>7+ anos de experiência</strong> e especialização em <strong>NestJS</strong>. 
            Já desenvolvi <strong>30+ projetos</strong>, incluindo sistemas em produção com mais de 1.000 usuários ativos.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            Foco em entregar soluções robustas e escaláveis. Disponível para projetos freelancer, 
            oportunidades remotas, híbridas ou presenciais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formação */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Formação
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <p className="font-semibold text-indigo-400">
                  {formacao.graduacao.curso}
                </p>
                <p className="text-gray-300 text-sm">
                  {formacao.graduacao.instituicao} • {formacao.graduacao.status}
                </p>
              </div>

              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="font-semibold text-blue-400">
                  {formacao.tecnico.curso}
                </p>
                <p className="text-gray-300 text-sm">
                  {formacao.tecnico.instituicao} • {formacao.tecnico.status}
                </p>
              </div>
            </div>
          </div>

          {/* Especialidades */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Especialidades
            </h3>
            
            <div className="space-y-3">
              {habilidades.map((habilidade, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{habilidade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 