import { LanguageProvider } from "./i18n/LanguageContext"
import { useLanguage } from "./i18n/LanguageContext"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

function AppContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(91, 140, 255, 0.08), transparent)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(122, 92, 255, 0.04), transparent)' }} />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      </div>

      <Navbar />

      <div className="relative z-10">
        <Hero />

        <div className="section-divider" />
        <About />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Experience />

        <div className="section-divider" />
        <Contact />
        
        {/* Footer */}
        <footer className="mt-24 py-10 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t.footer.text}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
              {t.footer.builtWith}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
