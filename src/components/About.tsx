import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre" className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.about.title}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-slate-300 leading-relaxed mb-16 max-w-3xl mx-auto text-center"
        >
          {t.about.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h3 className="text-xs font-semibold text-center text-slate-500 mb-6 uppercase tracking-[0.2em]">
            {t.expertise.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {t.expertise.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 rounded-xl text-center hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group"
              >
                <h4 className="font-semibold text-indigo-400 text-sm mb-1 group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-6 rounded-2xl hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
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
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {t.about.educationTitle}
                </h3>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
                <p className="font-semibold text-indigo-400 text-sm">
                  {t.about.education.course}
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  {t.about.education.institution}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-500">
                    {t.about.education.period}
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
                    {t.about.education.status}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-6 rounded-2xl hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-violet-500/10 rounded-lg border border-violet-500/20">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {t.about.focusTitle}
                </h3>
              </div>

              <div className="space-y-3">
                {t.about.focus.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]"
                  >
                    <h4 className="font-semibold text-sm text-indigo-400 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-6 rounded-2xl hover:border-white/10 transition-all duration-300 h-fit"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">
                {t.about.journeyTitle}
              </h3>
            </div>

            <div className="space-y-4">
              {t.about.journey.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
