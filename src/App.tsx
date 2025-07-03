import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header fixo com logo */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50 transition-all duration-300 ${
          scrollY > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <img
              src="/logo-footer.png"
              alt="M</> Marcilio Ortiz Developer"
              className="h-8 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
            />
            {/* Fallback */}
            <div className="hidden items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-bold">
                M&lt;/&gt;
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Marcilio Ortiz
              </span>
            </div>
          </a>

          {/* Menu de navegação rápida */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { id: 'sobre', label: 'Sobre' },
              { id: 'habilidades', label: 'Skills' },
              { id: 'projetos', label: 'Projetos' },
              { id: 'contato', label: 'Contato' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="#contato"
            className="hidden sm:block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
          >
            Contato
          </a>
        </div>
      </header>

      {/* Navigation Indicator */}
      <div 
        className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3 transition-all duration-300 ${
          scrollY > 100 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {[
          { id: 'hero', label: 'Início' },
          { id: 'sobre', label: 'Sobre' },
          { id: 'habilidades', label: 'Skills' },
          { id: 'projetos', label: 'Projetos' },
          { id: 'experiencia', label: 'Experiência' },
          { id: 'contato', label: 'Contato' }
        ].map((section) => (
          <div key={section.id} className="group relative">
            <a
              href={`#${section.id}`}
              className="block w-3 h-3 bg-gray-600 rounded-full hover:bg-indigo-500 transition-all duration-300 transform hover:scale-125"
              aria-label={`Ir para seção ${section.label}`}
            />
            <span className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Sections */}
        <section id="sobre" className="bg-gray-900/50">
          <About />
        </section>

        <section id="habilidades" className="bg-gray-800/20">
          <Skills />
        </section>

        <section id="projetos" className="bg-gray-900/50">
          <Projects />
        </section>

        <section id="experiencia" className="bg-gray-800/20">
          <Experience />
        </section>

        <section id="contato" className="bg-gray-900/50">
          <Contact />
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2024 Marcilio Ortiz. Feito com React, TypeScript e TailwindCSS.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
