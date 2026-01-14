'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hr' | 'de';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  hr: require('../locales/hr.json'),
  de: require('../locales/de.json'),
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hr');
  useEffect(() => {
    // Get saved language from localStorage (client only)
    try {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved && (saved === 'hr' || saved === 'de')) {
        setLanguageState(saved);
      }
    } catch (e) {
      // ignore (localStorage may be unavailable in some environments)
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback for SSR/static rendering
    return {
      language: 'hr' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}
