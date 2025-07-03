import { useState, useEffect, useRef } from 'react'
import { useScrollReveal, useScrollRevealList } from '../hooks/useScrollReveal'

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef<HTMLElement>(null)

  // Scroll reveal hooks
  const titleReveal = useScrollReveal({ delay: 0 })
  const descriptionReveal = useScrollReveal({ delay: 200 })
  const competenciesReveal = useScrollReveal({ delay: 400 })

  const skills = [
    {
      categoria: 'Backend',
      color: 'from-red-500 to-pink-500',
      tecnologias: [
        { name: 'NestJS', level: 95, description: 'Framework Node.js expert' },
        { name: 'Node.js', level: 90, description: 'Runtime JavaScript' },
        { name: 'Laravel', level: 85, description: 'Framework PHP' },
        { name: 'PostgreSQL', level: 85, description: 'Banco relacional' }
      ]
    },
    {
      categoria: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      tecnologias: [
        { name: 'React', level: 90, description: 'Biblioteca JavaScript' },
        { name: 'Next.js', level: 88, description: 'Framework React' },
        { name: 'TypeScript', level: 85, description: 'JavaScript tipado' },
        { name: 'TailwindCSS', level: 80, description: 'Framework CSS' }
      ]
    },
    {
      categoria: 'DevOps & Cloud',
      color: 'from-green-500 to-teal-500',
      tecnologias: [
        { name: 'Docker', level: 85, description: 'Containerização' },
        { name: 'AWS S3', level: 80, description: 'Storage em nuvem' },
        { name: 'NGINX', level: 78, description: 'Servidor web' },
        { name: 'Redis', level: 75, description: 'Cache e sessões' }
      ]
    }
  ]

  // Hook para animar cada categoria de skill
  const { setElementRef: setSkillRef, visibleItems: skillsVisible } = useScrollRevealList(
    skills.length, 
    { delay: 600 }
  )

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
      <div className="max-w-5xl mx-auto">
        <div 
          ref={titleReveal.elementRef}
          className={`text-center mb-4 ${
            titleReveal.isVisible ? 'slide-down-visible' : 'slide-down-hidden'
          }`}
        >
          <h2 className="text-4xl font-bold text-white">
            Stack Principal
          </h2>
        </div>
        
        <div 
          ref={descriptionReveal.elementRef}
          className={`text-center mb-16 ${
            descriptionReveal.isVisible ? 'fade-in-visible' : 'fade-in-hidden'
          }`}
        >
          <p className="text-xl text-gray-300">
            Tecnologias que domino em projetos reais
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skills.map((categoria, categoryIndex) => (
            <div
              key={categoria.categoria}
              ref={setSkillRef(categoryIndex)}
              className={`bg-gray-800 p-6 rounded-2xl shadow-lg hover-lift ${
                skillsVisible[categoryIndex] ? 'slide-scale-visible' : 'slide-scale-hidden'
              }`}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${categoria.color} rounded-full mb-6`} />
              
              <h3 className="text-xl font-bold text-white mb-6">
                {categoria.categoria}
              </h3>

              <div className="space-y-6">
                {categoria.tecnologias.map((tech, techIndex) => (
                  <div 
                    key={tech.name} 
                    className={`space-y-2 stagger-${techIndex + 1} ${
                      skillsVisible[categoryIndex] ? 'fade-in-visible' : 'fade-in-hidden'
                    }`}
                  >
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
                          width: isVisible && skillsVisible[categoryIndex] ? `${tech.level}%` : '0%',
                          transitionDelay: `${600 + (categoryIndex * 150) + (techIndex * 100)}ms`
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

        {/* Competências */}
        <div 
          ref={competenciesReveal.elementRef}
          className={`mt-16 bg-gray-800 p-8 rounded-2xl ${
            competenciesReveal.isVisible ? 'blur-visible' : 'blur-hidden'
          }`}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            Especialidades
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Full Stack',
                description: 'Desenvolvimento completo',
                icon: 'M8 9l3 3-3 3m13 0h-6m-2-5v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h2m2 5V4a2 2 0 012-2h4a2 2 0 012 2v1M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0V4',
                color: 'bg-indigo-500/20'
              },
              {
                title: 'APIs Robustas',
                description: 'Arquiteturas escaláveis',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                color: 'bg-green-500/20'
              },
              {
                title: 'Cloud AWS',
                description: 'Deploy e infraestrutura',
                icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
                color: 'bg-blue-500/20'
              },
              {
                title: 'Performance',
                description: 'Otimização e qualidade',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                color: 'bg-purple-500/20'
              }
            ].map((competency, index) => (
              <div 
                key={competency.title}
                className={`text-center stagger-${index + 1} ${
                  competenciesReveal.isVisible ? 'scale-visible' : 'scale-hidden'
                }`}
              >
                <div className={`w-16 h-16 ${competency.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-8 h-8 ${
                    competency.title === 'Full Stack' ? 'text-indigo-400' :
                    competency.title === 'APIs Robustas' ? 'text-green-400' :
                    competency.title === 'Cloud AWS' ? 'text-blue-400' :
                    'text-purple-400'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={competency.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-white">{competency.title}</h4>
                <p className="text-sm text-gray-300">{competency.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 