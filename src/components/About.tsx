export default function About() {
  // Calcular idade dinamicamente
  const calculateAge = () => {
    const birthDate = new Date('2006-09-01'); // Ajuste a data de nascimento aqui
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  const formacao = {
    superior: {
      curso: 'Sistemas de Informação',
      instituicao: 'UFMS',
      status: 'Futuro'
    },
    tecnico: {
      curso: 'Técnico em Informática',
      instituicao: 'IFMS',
      status: '2023 - Atualmente'
    }
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sobre Mim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Desenvolvedor Full Stack com <strong>{calculateAge()} anos</strong> e <strong>7+ anos de experiência</strong> e especialização em <strong>NestJS</strong>. 
              Já desenvolvi <strong>30+ projetos</strong>, incluindo sistemas em produção com mais de 1.000 usuários ativos.
            </p>
            
            <p className="text-gray-400 leading-relaxed mb-8">
              Minha paixão é criar soluções tecnológicas que resolvem problemas reais. Especializo-me em arquiteturas escaláveis, 
              APIs robustas e experiências de usuário intuitivas. Combino conhecimento técnico sólido com visão de negócio 
              para entregar produtos que fazem a diferença.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-300">Especialista em <strong>NestJS</strong> e <strong>Node.js</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">Experiência com <strong>AWS Cloud</strong> e <strong>Docker</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Frontend moderno com <strong>React</strong> e <strong>Next.js</strong></span>
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-3">💼 Disponibilidade</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Projetos Freelancer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Trabalho CLT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">100% Remoto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Mudança Geográfica</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Localizado em Corumbá-MS, disponível para oportunidades em todo o Brasil
              </p>
            </div>
          </div>

          {/* Cards de formação */}
          <div className="space-y-6">
            {/* Card Superior */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
                  {formacao.superior.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{formacao.superior.curso}</h3>
              <p className="text-gray-400">{formacao.superior.instituicao}</p>
            </div>

            {/* Card Técnico */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                  {formacao.tecnico.status}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{formacao.tecnico.curso}</h3>
              <p className="text-gray-400">{formacao.tecnico.instituicao}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 