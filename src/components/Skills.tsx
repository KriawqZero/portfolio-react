import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function Skills() {
  const { t } = useLanguage()

  const competencyIcons: ReactNode[] = [
    <svg
      className="w-5 h-5 text-indigo-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>,
    <svg
      className="w-5 h-5 text-violet-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>,
    <svg
      className="w-5 h-5 text-cyan-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>,
    <svg
      className="w-5 h-5 text-emerald-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>,
  ]

  return (
    <section id="habilidades" className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.skills.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.skills.categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div
                className={`h-1 w-12 bg-gradient-to-r ${category.color} rounded-full mb-5 group-hover:w-20 transition-all duration-500`}
              />

              <h3 className="text-lg font-bold text-white mb-5">
                {category.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 bg-white/[0.04] text-slate-300 rounded-lg text-sm border border-white/[0.06] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg font-semibold text-center text-white mb-8">
            {t.skills.competenciesTitle}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.skills.competencies.map((comp, index) => (
              <div key={index} className="text-center group">
                <div className="w-11 h-11 bg-white/[0.05] rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:border-white/10 transition-all duration-300">
                  {competencyIcons[index]}
                </div>
                <h4 className="font-semibold text-white text-sm">
                  {comp.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
