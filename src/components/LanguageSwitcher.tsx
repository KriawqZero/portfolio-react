import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700 p-1">
        <button
          onClick={() => setLocale('pt')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            locale === 'pt'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            locale === 'en'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
