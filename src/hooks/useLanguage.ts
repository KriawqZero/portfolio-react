import { createContext, useContext } from 'react';
import { ptContent } from '../data/content';

export type Language = 'pt' | 'en';
export type Platform = 'workana' | 'upwork' | '99freelas' | 'freelancer' | null;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  platform: Platform;
  t: typeof ptContent;
  personalizedMessage: string | null;
  isFreelanceView: boolean;
}

// O contexto e o hook vivem separados do LanguageProvider (LanguageProvider.tsx)
// porque o Fast Refresh do Vite exige que um arquivo com componente exporte
// apenas componentes.
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
