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
