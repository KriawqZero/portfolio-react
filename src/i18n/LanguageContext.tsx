import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Locale, type Translations } from './translations'

interface LanguageContextType {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt')

  const value: LanguageContextType = {
    locale,
    t: translations[locale],
    setLocale,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
