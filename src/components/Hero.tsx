export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 text-center relative" role="banner">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Container da Foto */}
        <div className="relative group md:w-1/3">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-2 mx-auto">
            <img
              src="/foto-perfil.jpg"
              alt="Foto de perfil de Marcilio Ortiz"
              className="w-full h-full rounded-full object-cover bg-gray-700"
              aria-label="Foto de perfil de Marcilio Ortiz"
            />
          </div>
        </div>

        {/* Texto */}
        <div className="md:w-2/3 text-left space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Marcilio Ortiz
            </h1>
            <p className="text-xl text-indigo-400 font-medium" aria-label="Nome de usuário">
              @Kriawq
            </p>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl text-gray-300">
              Desenvolvedor Full Stack
            </h2>
            <p className="text-lg text-gray-400">
              Estudante de Técnico em Informática - IFMS
            </p>
            
            {/* Lista de modalidades como lista vertical com pontos */}
            <div className="space-y-2" role="list" aria-label="Modalidades de trabalho disponíveis">
              {[
                { text: 'Freelancer', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' },
                { text: 'CLT', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m0 0H5m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5' },
                { text: 'Remoto/Presencial', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { text: 'Mudança Geográfica', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-400" role="listitem">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0"></div>
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 italic">
              *Disponível para mudança de cidade/estado conforme a oportunidade
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4" role="list" aria-label="Principais tecnologias">
            {[
              { text: 'NestJS', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
              { text: 'React/Next.js', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
              { text: 'Laravel', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
              { text: 'AWS Cloud', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
              { text: 'Docker', color: 'bg-[#0db7ed]/20 text-[#0db7ed] border-[#0db7ed]/40' }
            ].map((tech) => (
              <span 
                key={tech.text}
                className={`px-4 py-2 ${tech.color} rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105`} 
                role="listitem"
              >
                {tech.text}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href="#contato"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:text-indigo-600 hover:border-2 hover:border-indigo-600 hover:scale-105 border-2 border-transparent"
              aria-label="Entrar em contato com Marcilio Ortiz"
            >
              Vamos Conversar
            </a>
            <a
              href="#projetos"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:scale-105 shadow-lg hover:shadow-xl"
              aria-label="Ver projetos desenvolvidos por Marcilio Ortiz"
            >
              Ver Projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 