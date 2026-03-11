import { useLanguage } from "../i18n/LanguageContext"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function Contact() {
  const { t } = useLanguage()

  const contactItems = [
    {
      label: t.contact.email.label,
      value: "marciliortizz@gmail.com",
      href: "mailto:marciliortizz@gmail.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-indigo-500 to-violet-500",
      description: t.contact.email.description,
    },
    {
      label: t.contact.linkedin.label,
      value: "Marcílio Ortiz Barbosa",
      href: "https://www.linkedin.com/in/marc%C3%ADlio-ortiz-barbosa-7b5a35165/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
      description: t.contact.linkedin.description,
    },
    {
      label: t.contact.github.label,
      value: "@KriawqZero",
      href: "https://github.com/KriawqZero",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      gradient: "from-slate-400 to-slate-500",
      description: t.contact.github.description,
    },
    {
      label: t.contact.whatsapp.label,
      value: "+55 (67) 98407-9762",
      href: "https://api.whatsapp.com/send?phone=5567984079762",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      gradient: "from-emerald-500 to-emerald-600",
      description: t.contact.whatsapp.description,
    },
  ]

  const modalityIcons: ReactNode[] = [
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>,
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m0 0H5m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5"
      />
    </svg>,
  ]

  return (
    <section id="contato" className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {contactItems.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : "_self"}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-5 rounded-2xl hover:border-white/10 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 bg-gradient-to-br ${contact.gradient} rounded-xl text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm mb-0.5">
                      {contact.label}
                    </h3>
                    <p className="text-slate-300 text-sm truncate">
                      {contact.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {contact.description}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-5 rounded-2xl"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {t.contact.locationTitle}
                </h3>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  {t.contact.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.contact.timezone}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-5 rounded-2xl"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <svg
                    className="w-4 h-4 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 14a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {t.contact.modalitiesTitle}
                </h3>
              </div>
              <div className="space-y-2.5">
                {t.contact.modalities.map((modality, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs">
                    <div className="text-indigo-400 mt-0.5 flex-shrink-0">
                      {modalityIcons[index]}
                    </div>
                    <div>
                      <div className="text-slate-300 font-medium">
                        {modality.type}
                      </div>
                      <div className="text-slate-500">
                        {modality.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-500/[0.06] to-transparent border border-emerald-500/15 p-5 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-semibold text-white text-sm">
                  {t.contact.statusTitle}
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t.contact.statusAvailable}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t.contact.statusStart}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t.contact.statusRelocation}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <div className="relative bg-gradient-to-r from-indigo-500/[0.08] to-violet-500/[0.08] p-8 sm:p-10 rounded-2xl border border-indigo-500/15 overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {t.contact.ctaTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-2xl mx-auto">
              {t.contact.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:marciliortizz@gmail.com"
                className="px-7 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.contact.ctaSendEmail}
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5567984079762"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-2.5 bg-white/[0.05] text-slate-300 rounded-xl text-sm font-medium border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              >
                {t.contact.ctaWhatsApp}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
