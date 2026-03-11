import { useState, useEffect } from "react"
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"
import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Hero from "./components/Hero"
import LanguageSwitcher from "./components/LanguageSwitcher"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#sobre", label: t.nav.about },
    { href: "#habilidades", label: t.nav.stack },
    { href: "#projetos", label: t.nav.projects },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#contato", label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060611]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
        >
          Kriawq<span className="text-indigo-400">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#060611]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-5 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function AppContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#060611]" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      </div>

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="relative border-t border-white/5 py-8 mt-24">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-sm text-slate-500">{t.footer.text}</p>
          <p className="text-xs text-slate-600 mt-1">{t.footer.builtWith}</p>
        </div>
      </footer>
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
