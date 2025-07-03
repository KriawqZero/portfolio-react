export default function About() {
  const formacao = {
    graduacao: {
      curso: 'Sistemas de Informação',
      instituicao: 'UFMS - Universidade Federal de MS',
      periodo: 'Em andamento',
      status: 'Cursando'
    },
    tecnico: {
      curso: 'Técnico Integrado em Informática',
      instituicao: 'IFMS - Campus Corumbá',
      periodo: '2022 - 2024',
      status: 'Concluído'
    }
  }

  const trajetoria = [
    'Começou a programar aos 11 anos com Python',
    'Desenvolveu mais de 30 projetos de forma autodidata',
    'Especialização em arquiteturas robustas e código limpo',
    'Foco em soluções full-stack escaláveis'
  ]

  const habilidades = [
    'Desenvolvimento Full Stack Moderno',
    'Arquitetura de Sistemas Complexos',
    'Integração de APIs e Microserviços',
    'DevOps e Deploy em Cloud (AWS)',
    'Configuração de VPC e S3',
    'Gerenciamento de Projetos com OpenProject'
  ]

  return (
    <section id="sobre" className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Sobre Mim
        </h2>

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
                  Formação Acadêmica
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Graduação Atual */}
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-lg font-semibold text-indigo-400">
                    {formacao.graduacao.curso}
                  </p>
                  <p className="text-gray-300">
                    {formacao.graduacao.instituicao}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {formacao.graduacao.periodo}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {formacao.graduacao.status}
                    </span>
                  </div>
                </div>

                {/* Formação Técnica */}
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-lg font-semibold text-blue-400">
                    {formacao.tecnico.curso}
                  </p>
                  <p className="text-gray-300">
                    {formacao.tecnico.instituicao}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {formacao.tecnico.periodo}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {formacao.tecnico.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principais Habilidades */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Especialidades
                </h3>
              </div>
              
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
                  Minha Jornada
                </h3>
              </div>
              
              <div className="space-y-4">
                {trajetoria.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
                <p className="text-lg font-medium text-white italic">
                  "Acredito que bom código não é apenas funcional, mas elegante, escalável e sustentável"
                </p>
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
                  Foco Atual
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold text-indigo-400 mb-2">Desenvolvimento Freelancer</h4>
                  <p className="text-gray-300 text-sm">
                    Criando soluções robustas e escaláveis para clientes diversos, desde MVPs até sistemas complexos em produção.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">Arquitetura e Performance</h4>
                  <p className="text-gray-300 text-sm">
                    Especializando em arquiteturas modernas com NestJS, React e infraestrutura AWS para máxima eficiência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Sou um desenvolvedor apaixonado por criar soluções robustas e escaláveis, com mais de 7 anos de experiência em programação e especialização em NestJS. 
          Atualmente cursando Sistemas de Informação na UFMS, formado como técnico em informática pelo IFMS Campus Corumbá (2022-2024).
        </p>
        
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Tenho ampla experiência no desenvolvimento de aplicações full-stack, desde sistemas institucionais que atendem mais de 1.000 usuários até plataformas complexas com integrações em nuvem. 
          Meu foco está em entregar código limpo, arquiteturas bem estruturadas e soluções que realmente fazem a diferença.
        </p>
        
        <p className="text-lg text-gray-300 leading-relaxed">
          Estou sempre em busca de novos desafios, seja em projetos freelancer, oportunidades remotas, híbridas ou presenciais. Tenho disposição para mudança geográfica quando a oportunidade for alinhada aos meus objetivos profissionais.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
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
                  Formação Acadêmica
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Graduação Atual */}
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <p className="text-lg font-semibold text-indigo-400">
                    {formacao.graduacao.curso}
                  </p>
                  <p className="text-gray-300">
                    {formacao.graduacao.instituicao}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {formacao.graduacao.periodo}
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {formacao.graduacao.status}
                    </span>
                  </div>
                </div>

                {/* Formação Técnica */}
                <div className="p-4 bg-gray-700 rounded-lg">
                  <p className="text-lg font-semibold text-blue-400">
                    {formacao.tecnico.curso}
                  </p>
                  <p className="text-gray-300">
                    {formacao.tecnico.instituicao}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-400">
                      {formacao.tecnico.periodo}
                    </span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      {formacao.tecnico.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Principais Habilidades */}
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Especialidades
                </h3>
              </div>
              
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
                  Minha Jornada
                </h3>
              </div>
              
              <div className="space-y-4">
                {trajetoria.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg">
                <p className="text-lg font-medium text-white italic">
                  "Acredito que bom código não é apenas funcional, mas elegante, escalável e sustentável"
                </p>
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
                  Foco Atual
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold text-indigo-400 mb-2">Desenvolvimento Freelancer</h4>
                  <p className="text-gray-300 text-sm">
                    Criando soluções robustas e escaláveis para clientes diversos, desde MVPs até sistemas complexos em produção.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">Arquitetura e Performance</h4>
                  <p className="text-gray-300 text-sm">
                    Especializando em arquiteturas modernas com NestJS, React e infraestrutura AWS para máxima eficiência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 