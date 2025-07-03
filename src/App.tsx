import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

function App() {
  return (
    <div className="min-h-screen bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Fundo Global */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/90 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/5 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 animate-grid opacity-[2%]">
          <div className="h-full w-full bg-[length:80px_80px] bg-grid-indigo-900" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-5" />
      </div>

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        
        {/* Footer */}
        <footer className="bg-gray-800 mt-16 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-300 text-sm">
              © 2025 Marcilio Ortiz (Kriawq).<br />
              Desenvolvido com React, TypeScript e Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
