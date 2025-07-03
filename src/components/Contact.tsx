export default function Contact() {
  const contactMethods = [
    {
      type: 'email',
      title: 'Email',
      value: 'marciliortizz@gmail.com',
      href: 'mailto:marciliortizz@gmail.com',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    {
      type: 'whatsapp',
      title: 'WhatsApp',
      value: '+55 (67) 9 8408-4389',
      href: 'https://wa.me/5567984084389',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      type: 'linkedin',
      title: 'LinkedIn',
      value: '/in/marcilio-ortiz',
      href: 'https://www.linkedin.com/in/marcilio-ortiz/',
      icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      type: 'github',
      title: 'GitHub',
      value: '@KriawqZero',
      href: 'https://github.com/KriawqZero',
      icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  ]

  const workModes = [
    {
      title: 'Freelancer',
      description: 'Projetos pontuais com foco em resultados',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6'
    },
    {
      title: 'Remoto',
      description: 'Trabalho 100% remoto com comunicação eficiente',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Híbrido/Presencial',
      description: 'Disponível para Campo Grande/MS e região',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m0 0H5m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5'
    }
  ]

  const quickInfo = [
    { label: 'Localização', value: 'Campo Grande, MS' },
    { label: 'Fuso Horário', value: 'UTC-4 (Brasília)' },
    { label: 'Idiomas', value: 'Português, Inglês Técnico' },
    { label: 'Disponibilidade', value: 'Imediata' }
  ]

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Entre em Contato
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-300 mt-6">
            Vamos conversar sobre seu próximo projeto
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informações de contato */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Canais de Comunicação
            </h3>
            
            {/* Lista de contatos */}
            <div className="grid md:grid-cols-2 gap-4">
              {contactMethods.map((contact) => (
                <a
                  key={contact.type}
                  href={contact.href}
                  target={contact.type !== 'email' ? '_blank' : undefined}
                  rel={contact.type !== 'email' ? 'noopener noreferrer' : undefined}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${contact.color} border group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={contact.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {contact.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{contact.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Modalidades de trabalho */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">
                Modalidades de Trabalho
              </h3>
              <div className="space-y-4">
                {workModes.map((mode, index) => (
                  <div 
                    key={mode.title}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mode.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{mode.title}</h4>
                        <p className="text-gray-400 text-sm">{mode.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Informações rápidas e CTA */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Informações Rápidas
            </h3>
            
            {/* Quick info grid */}
            <div className="grid gap-4">
              {quickInfo.map((info) => (
                <div 
                  key={info.label}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{info.label}:</span>
                    <span className="text-white font-medium">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA principal */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 border border-indigo-500/20 mt-8">
              <h3 className="text-xl font-bold text-white mb-4">
                🚀 Pronto para começar?
              </h3>
              <p className="text-gray-300 mb-6">
                Entre em contato para discutirmos seu projeto. Respondo rapidamente e sempre com propostas claras e objetivas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:marciliortizz@gmail.com"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar Email
                </a>
                
                <a
                  href="https://wa.me/5567984084389"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
              
              <p className="text-gray-400 text-sm mt-4 text-center">
                ⚡ Resposta em até 24 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 