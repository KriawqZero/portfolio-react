import React, { createContext, useContext, useState } from 'react';
import { ptContent, enContent } from '../data/content';

type Language = 'pt' | 'en';
type Platform = 'workana' | 'upwork' | '99freelas' | 'freelancer' | null;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  platform: Platform;
  t: typeof ptContent;
  personalizedMessage: string | null;
  isFreelanceView: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [platform] = useState<Platform>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const platParam = params.get('platform')?.toLowerCase();
      if (platParam && ['workana', 'upwork', '99freelas', 'freelancer'].includes(platParam)) {
        return platParam as Platform;
      }
    }
    return null;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const platParam = params.get('platform')?.toLowerCase();
      if (platParam && ['workana', 'upwork', '99freelas', 'freelancer'].includes(platParam)) {
        if (platParam === 'upwork' || platParam === 'freelancer') {
          return 'en';
        }
        return 'pt';
      }
      const stored = localStorage.getItem('portfolio-lang');
      if (stored === 'en' || stored === 'pt') {
        return stored as Language;
      }
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
  };

  const t = language === 'pt' ? ptContent : enContent;

  // Determine personalized message based on platform
  let personalizedMessage: string | null = null;
  if (platform) {
    if (t.personalization && platform in t.personalization) {
      personalizedMessage = (t.personalization as any)[platform];
    }
  }

  const isFreelanceView = platform !== null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, platform, t, personalizedMessage, isFreelanceView }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
