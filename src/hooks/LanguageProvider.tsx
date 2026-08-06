import React, { useState } from 'react';
import { ptContent, enContent } from '../data/content';
import { LanguageContext, type Language, type Platform } from './useLanguage';

const PLATAFORMAS: readonly string[] = ['workana', 'upwork', '99freelas', 'freelancer'];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [platform] = useState<Platform>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const platParam = params.get('platform')?.toLowerCase();
      if (platParam && PLATAFORMAS.includes(platParam)) {
        return platParam as Platform;
      }
    }
    return null;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const platParam = params.get('platform')?.toLowerCase();
      if (platParam && PLATAFORMAS.includes(platParam)) {
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
  const personalizedMessage: string | null = platform
    ? t.personalization?.[platform] ?? null
    : null;

  const isFreelanceView = platform !== null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, platform, t, personalizedMessage, isFreelanceView }}>
      {children}
    </LanguageContext.Provider>
  );
}
