import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function Projects() {
  const { t } = useLanguage()

  const projectIcons: ReactNode[] = [
    <img
      src="https://condy.com.br/favicon.ico"
      alt="Condy"
      className="w-6 h-6 rounded"
    />,
    <svg
      className="w-6 h-6 text-indigo-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>,
    <svg
      className="w-6 h-6 text-indigo-400"
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
    </svg>,
  ]

  const projectLinks = [
    { siteLink: "https://condy.com.br", repo: null },
    { siteLink: null, repo: null, showInDevelopment: true },
    {
      siteLink: null,
      repo: "https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria",
    },
  ]

  const getStatusStyle = (status: string) => {
    if (status === "production")
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    if (status === "development")
      return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    return "bg-sky-500/10 text-sky-400 border-sky-500/20"
  }

  const getStatusLabel = (status: string) => {
    if (status === "production") return t.projects.statusProduction
    if (status === "development") return t.projects.statusDevelopment
    return t.projects.statusDone
  }

  return (
    <section id="projetos" className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.projects.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {t.projects.items.map((project, index) => {
            const links = projectLinks[index]
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/[0.05] rounded-xl flex items-center justify-center border border-white/[0.06]">
                      {projectIcons[index]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md text-xs font-medium border border-indigo-500/20">
                          {project.category}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStatusStyle(project.status)}`}
                        >
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                      {t.projects.highlightsLabel}
                    </h4>
                    <div className="space-y-1.5">
                      {project.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-slate-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                      {t.projects.stackLabel}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white/[0.04] text-slate-400 rounded-md text-xs border border-white/[0.05]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-2 mt-auto">
                    {links.siteLink && (
                      <a
                        href={links.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2.5 px-4 rounded-xl text-center text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                      >
                        {t.projects.viewSite}
                      </a>
                    )}

                    {!links.siteLink && links.showInDevelopment && (
                      <div className="flex-1 bg-white/[0.04] text-slate-500 py-2.5 px-4 rounded-xl text-center text-sm font-medium border border-white/[0.06]">
                        {t.projects.inDevelopment}
                      </div>
                    )}

                    {links.repo ? (
                      <a
                        href={links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-2.5 px-4 rounded-xl text-center text-sm font-medium transition-all duration-300 ${
                          links.siteLink
                            ? "bg-white/[0.05] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                            : "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg hover:shadow-indigo-500/20"
                        }`}
                      >
                        {t.projects.viewRepo}
                      </a>
                    ) : (
                      !links.siteLink &&
                      !links.showInDevelopment && (
                        <div className="flex-1 bg-white/[0.03] text-slate-600 py-2.5 px-4 rounded-xl text-center text-sm font-medium border border-white/[0.05]">
                          {t.projects.privateRepo}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-r from-indigo-500/[0.08] to-violet-500/[0.08] p-10 sm:p-14 rounded-3xl border border-indigo-500/15 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.06] rounded-full -translate-y-32 translate-x-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/[0.04] rounded-full translate-y-24 -translate-x-24 blur-2xl" />

            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t.projects.ctaTitle}
              </h3>
              <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm sm:text-base">
                {t.projects.ctaDescription}
              </p>
              <a
                href="#contato"
                className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 py-3 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.projects.ctaButton}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
