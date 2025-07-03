export default function Skills() {
  const skillCategories = [
    {
      title: 'Backend',
      icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
      color: 'indigo',
      skills: [
        { name: 'NestJS', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'Laravel', level: 85 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 80 }
      ]
    },
    {
      title: 'Frontend',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'purple',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'TailwindCSS', level: 92 },
        { name: 'JavaScript', level: 95 }
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      color: 'blue',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS S3', level: 80 },
        { name: 'NGINX', level: 75 },
        { name: 'Redis', level: 78 },
        { name: 'Git/GitHub', level: 90 }
      ]
    }
  ]


  const getColorClasses = (color: string) => {
    const colorMap = {
      indigo: {
        bg: 'bg-indigo-500/20',
        text: 'text-indigo-400',
        border: 'border-indigo-500/30',
        progress: 'bg-indigo-500'
      },
      purple: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        progress: 'bg-purple-500'
      },
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        progress: 'bg-blue-500'
      }
    }
    return colorMap[color as keyof typeof colorMap]
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Tecnologias
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid de categorias */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => {
            const colors = getColorClasses(category.color)
            
            return (
              <div 
                key={category.title}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              >
                {/* Header da categoria */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 ${colors.bg} rounded-lg border ${colors.border}`}>
                    <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                {/* Lista de skills */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className={`text-sm ${colors.text} font-semibold`}>{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${colors.progress} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Destaque especial */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl p-8 border border-indigo-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Especialização Principal</h3>
            <p className="text-lg text-gray-300 mb-4">
              <strong className="text-indigo-400">NestJS Expert</strong> - Framework favorito para desenvolvimento backend
            </p>
            <p className="text-gray-400">
              Experiência profunda em arquitetura modular, decorators, guards, pipes e microservices
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 