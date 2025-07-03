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
              7+ anos de experiência • 30+ projetos entregues
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span>Freelancer</span>
              <span className="text-gray-500">•</span>
              <span>Remoto</span>
              <span className="text-gray-500">•</span>
              <span>Híbrido/Presencial</span>
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