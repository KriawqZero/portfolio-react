import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-5 pt-20 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-2xl opacity-20 scale-110" />
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
              <div className="w-full h-full rounded-full bg-[#0c0c1d] flex items-center justify-center">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent select-none">
                  K
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center md:text-left flex-1 space-y-5"
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
                  Marcilio Ortiz
                </span>
              </h1>
              <p className="text-base sm:text-lg text-indigo-400 font-medium tracking-wide">
                @Kriawq
              </p>
            </div>

            <div className="space-y-2.5 max-w-xl mx-auto md:mx-0">
              <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
                {t.hero.role}
              </p>
              <p className="text-base text-slate-400 leading-relaxed">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.hero.available}
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t.hero.remote}
              </span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-1">
              {t.hero.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/[0.08] backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
              <a
                href="#contato"
                className="group px-7 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <span className="inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>
              <a
                href="#projetos"
                className="px-7 py-3 bg-white/5 text-slate-300 text-sm font-medium rounded-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/15 hover:text-white transition-all duration-300"
              >
                {t.hero.viewProjects}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
