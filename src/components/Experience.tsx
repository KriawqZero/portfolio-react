import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experiencia" className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.experience.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.experience.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-5 mb-14"
        >
          {t.experience.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 sm:p-6 text-center hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="space-y-5">
          {t.experience.items.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                exp.featured
                  ? "bg-gradient-to-br from-indigo-500/[0.08] to-violet-500/[0.04] border border-indigo-500/20 hover:border-indigo-500/30"
                  : "bg-white/[0.03] border border-white/[0.06] hover:border-white/10"
              }`}
            >
              {exp.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/30">
                    {t.experience.featuredLabel}
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="lg:w-1/3">
                  <h3 className="text-xl font-bold text-white mb-1.5 pr-20 lg:pr-0">
                    {exp.title}
                  </h3>
                  <p
                    className={`text-sm font-medium mb-1.5 ${
                      exp.featured ? "text-indigo-400" : "text-violet-400"
                    }`}
                  >
                    {exp.type}
                  </p>
                  <p className="text-xs text-slate-500">{exp.period}</p>
                </div>

                <div className="lg:w-2/3">
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                      {t.experience.achievementsLabel}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-slate-300 text-sm">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                      {t.experience.techLabel}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            exp.featured
                              ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                              : "bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {t.experience.ctaTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">
              {t.experience.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contato"
                className="px-7 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.experience.ctaButton}
              </a>
              <a
                href="#projetos"
                className="px-7 py-2.5 bg-white/[0.05] text-slate-300 rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              >
                {t.experience.ctaProjects}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
