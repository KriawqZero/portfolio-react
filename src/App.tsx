import { useEffect, useState } from 'react'
import { useParallax, useScrollDirection } from './hooks/useParallax'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [mounted, setMounted] = useState(false)
  const { elementRef: parallaxRef, offset } = useParallax(0.3)
  const { scrollDirection, scrollY } = useScrollDirection()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background com parallax */}
      <div 
        ref={parallaxRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          transform: `translateY(${offset * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-grid-indigo-900 opacity-20"
          style={{
            backgroundSize: '80px 80px',
            transform: `translateY(${offset * 0.2}px)`
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '0s', transform: `translateY(${offset * 0.8}px)` }} />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '1s', transform: `translateY(${offset * 0.6}px)` }} />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '2s', transform: `translateY(${offset * 0.4}px)` }} />
      </div>

      {/* Navigation Indicator */}
      <div 
        className={`fixed left-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3 transition-all duration-300 ${
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
      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          id="hero" 
          className={`transition-all duration-500 ${
            scrollDirection === 'down' ? 'transform translate-y-0' : ''
          }`}
        >
          <Hero />
        </section>

        {/* Sections */}
        <div className="space-y-0">
          <section id="sobre" className="bg-gray-900/50 backdrop-blur-sm">
            <About />
          </section>

          <section id="habilidades" className="bg-gray-800/20 backdrop-blur-sm">
            <Skills />
          </section>

          <section id="projetos" className="bg-gray-900/50 backdrop-blur-sm">
            <Projects />
          </section>

          <section id="experiencia" className="bg-gray-800/20 backdrop-blur-sm">
            <Experience />
          </section>

          <section id="contato" className="bg-gray-900/50 backdrop-blur-sm">
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2024 Marcilio Ortiz. Feito com React, TypeScript e TailwindCSS.
            </p>
           </div>
        </footer>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 ${
          scrollY > 500 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

export default App
