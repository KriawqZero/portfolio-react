export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 text-center relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Container da Foto */}
        <div className="relative group md:w-1/3">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-2 mx-auto">
            <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-8xl font-bold text-gray-300">
              K
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-indigo-400/30 transition-all duration-300" />
        </div>

        {/* Texto */}
        <div className="md:w-2/3 text-left space-y-6 animate-fade-in-up">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Marcilio Ortiz
            </h1>
            <p className="text-xl text-indigo-400 font-medium">
              @Kriawq
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-xl text-gray-300">
              Desenvolvedor Full Stack
            </p>
            <p className="text-lg text-gray-400">
              Estudante de Sistemas de Informação - UFMS
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Freelancer
              </span>
              <span className="text-gray-500">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remoto
              </span>
              <span className="text-gray-500">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m0 0H5m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                </svg>
                Híbrido/Presencial
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <span className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/30">
              NestJS Expert
            </span>
            <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30">
              React/Next.js
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
              AWS Cloud
            </span>
          </div>

          <div className="pt-6">
            <p className="text-lg text-gray-300 italic">
              "Transformando problemas complexos em soluções elegantes com código limpo e arquitetura robusta"
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <a
              href="#contato"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Vamos Conversar
            </a>
            <a
              href="#projetos"
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg hover:bg-gray-800 transition-all duration-300"
            >
              Ver Projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 