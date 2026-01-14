'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('hr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get language from localStorage or browser preference
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && ['hr', 'de', 'en'].includes(saved)) {
      setLanguage(saved);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'de') {
        setLanguage('de');
      } else if (browserLang === 'en') {
        setLanguage('en');
      }
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {mounted ? children : null}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
