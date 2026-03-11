import { useLanguage } from "../i18n/LanguageContext"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-0.5 bg-white/5 rounded-full p-0.5 border border-white/[0.08]">
      <button
        onClick={() => setLocale("pt")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          locale === "pt"
            ? "bg-indigo-500/90 text-white shadow-sm shadow-indigo-500/25"
            : "text-slate-400 hover:text-white"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          locale === "en"
            ? "bg-indigo-500/90 text-white shadow-sm shadow-indigo-500/25"
            : "text-slate-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  )
}
