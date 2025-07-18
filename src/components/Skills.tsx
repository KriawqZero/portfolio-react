import { useState, useEffect, useRef } from 'react'

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef<HTMLElement>(null)

  const skills = [
    {
      categoria: 'Backend Principal',
      color: 'from-red-500 to-pink-500',
      tecnologias: [
        { name: 'NestJS', level: 95, description: 'Framework Node.js expert' },
        { name: 'Node.js', level: 90, description: 'Runtime JavaScript avançado' },
        { name: 'Laravel', level: 85, description: 'Framework PHP robusto' },
        { name: 'C# (.NET)', level: 75, description: 'Desenvolvimento .NET' }
      ]
    },
    {
      categoria: 'Frontend Principal',
      color: 'from-blue-500 to-cyan-500',
      tecnologias: [
        { name: 'React', level: 90, description: 'Biblioteca JavaScript moderna' },
        { name: 'Next.js', level: 88, description: 'Framework React full-stack' },
        { name: 'TypeScript', level: 85, description: 'JavaScript tipado' },
        { name: 'Alpine.js', level: 80, description: 'Framework leve para Blade' }
      ]
    },
    {
      categoria: 'DevOps & Cloud',
      color: 'from-green-500 to-teal-500',
      tecnologias: [
        { name: 'Docker', level: 85, description: 'Containerização e orquestração' },
        { name: 'AWS S3', level: 80, description: 'Armazenamento em nuvem' },
        { name: 'AWS VPC', level: 75, description: 'Configuração de redes' },
        { name: 'NGINX', level: 78, description: 'Servidor web e proxy' }
      ]
    },
    {
      categoria: 'Banco de Dados',
      color: 'from-purple-500 to-indigo-500',
      tecnologias: [
        { name: 'PostgreSQL', level: 85, description: 'Banco relacional avançado' },
        { name: 'MariaDB/MySQL', level: 80, description: 'Bancos relacionais' },
        { name: 'MongoDB', level: 70, description: 'Banco NoSQL' },
        { name: 'Redis', level: 75, description: 'Cache e sessões' }
      ]
    },
    {
      categoria: 'Linguagens Exploradas',
      color: 'from-yellow-500 to-orange-500',
      tecnologias: [
        { name: 'C++', level: 70, description: 'GLFW, GLEW, GLM' },
        { name: 'Rust', level: 60, description: 'Linguagem systems (básico)' },
        { name: 'Golang', level: 55, description: 'Linguagem Go (inicial)' },
        { name: 'PHP', level: 85, description: 'Desenvolvimento web' }
      ]
    },
    {
      categoria: 'Ferramentas & APIs',
      color: 'from-gray-400 to-gray-600',
      tecnologias: [
        { name: 'OpenAI API', level: 85, description: 'Integração com IA' },
        { name: 'WhatsApp Business API', level: 80, description: 'Automação de mensagens' },
        { name: 'Vite', level: 85, description: 'Build tool moderno' },
        { name: 'OpenProject', level: 80, description: 'Gerenciamento de projetos' }
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="habilidades" ref={skillsRef} className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Stack Tecnológico
        </h2>
        <p className="text-xl text-center text-gray-300 mb-16">
          Tecnologias que domino e uso em projetos reais
        </p>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.map((categoria, categoryIndex) => (
            <div
              key={categoria.categoria}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover-lift"
              style={{
                animationDelay: `${categoryIndex * 150}ms`
              }}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${categoria.color} rounded-full mb-6`} />
              
              <h3 className="text-xl font-bold text-white mb-6">
                {categoria.categoria}
              </h3>

              <div className="space-y-6">
                {categoria.tecnologias.map((tech, techIndex) => (
                  <div key={tech.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-300">
                        {tech.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {tech.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full bg-gradient-to-r ${categoria.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${tech.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 150) + (techIndex * 100)}ms`
                        }}
                      />
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo das Competências */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            Competências Principais
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m13 0h-6m-2-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h2m2 5V4a2 2 0 012-2h4a2 2 0 012 2v1M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0V4" />
                </svg>
              </div>
              <h4 className="font-semibold text-white">Full Stack</h4>
              <p className="text-sm text-gray-300">Desenvolvimento completo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white">Arquitetura</h4>
              <p className="text-sm text-gray-300">Sistemas escaláveis</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h4 className="font-semibold text-white">Cloud & DevOps</h4>
              <p className="text-sm text-gray-300">Deploy e infraestrutura</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white">Performance</h4>
              <p className="text-sm text-gray-300">Otimização e qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 