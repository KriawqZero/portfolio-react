import { useScrollReveal } from '../hooks/useScrollReveal'

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

  // Scroll reveal hooks
  const titleReveal = useScrollReveal({ delay: 0 })
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const mainContentReveal = useScrollReveal({ delay: 400 })
  const leftCardReveal = useScrollReveal({ delay: 600 })
  const rightCardReveal = useScrollReveal({ delay: 800 })

  const formacao = {
    graduacao: {
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
        <div 
          ref={titleReveal.elementRef}
          className={`text-center mb-4 ${
            titleReveal.isVisible ? 'slide-down-visible' : 'slide-down-hidden'
          }`}
        >
          <h2 className="text-4xl font-bold text-white">
            Sobre Mim
          </h2>
        </div>
        
        <div 
          ref={descriptionReveal.elementRef}
          className={`text-center mb-12 ${
            descriptionReveal.isVisible ? 'fade-in-visible' : 'fade-in-hidden'
          }`}
        >
          <p className="text-xl text-gray-300">
            Desenvolvedor Full Stack com especialização em NestJS e React
          </p>
        </div>

        <div 
          ref={mainContentReveal.elementRef}
          className={`bg-gray-800 p-8 rounded-2xl shadow-lg mb-8 ${
            mainContentReveal.isVisible ? 'slide-up-visible' : 'slide-up-hidden'
          }`}
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Desenvolvedor Full Stack com <strong>{calculateAge()} anos</strong> e <strong>7+ anos de experiência</strong> e especialização em <strong>NestJS</strong>. 
            Já desenvolvi <strong>30+ projetos</strong>, incluindo sistemas em produção com mais de 1.000 usuários ativos.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            Foco em entregar soluções robustas e escaláveis. Disponível para projetos freelancer, 
            oportunidades remotas, híbridas ou presenciais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formação */}
          <div 
            ref={leftCardReveal.elementRef}
            className={`bg-gray-800 p-6 rounded-2xl shadow-lg ${
              leftCardReveal.isVisible ? 'slide-right-visible' : 'slide-right-hidden'
            }`}
          >
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
          <div 
            ref={rightCardReveal.elementRef}
            className={`bg-gray-800 p-6 rounded-2xl shadow-lg ${
              rightCardReveal.isVisible ? 'slide-left-visible' : 'slide-left-hidden'
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Especialidades
            </h3>
            
            <div className="space-y-3">
              {habilidades.map((habilidade, index) => (
                <div 
                  key={index} 
                  className={`flex items-center stagger-${Math.min(index + 1, 6)} ${
                    rightCardReveal.isVisible ? 'fade-in-visible' : 'fade-in-hidden'
                  }`}
                >
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