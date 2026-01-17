'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Types
export type Language = 'hr' | 'de';

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

// Default translations to avoid flash
const defaultTranslations: Record<Language, Record<string, unknown>> = {
  hr: {},
  de: {},
};

// Context
const I18nContext = createContext<I18nContextType | null>(null);

// Load translations dynamically
async function loadTranslations(lang: Language): Promise<Record<string, unknown>> {
  try {
    const translations = await import(`../locales/${lang}.json`);
    return translations.default || translations;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    return {};
  }
}

// Get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : undefined;
}

// Replace parameters in string
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return params[key]?.toString() ?? `{{${key}}}`;
  });
}

// Provider Component
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hr');
  const [translations, setTranslations] = useState<Record<Language, Record<string, unknown>>>(defaultTranslations);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial language from localStorage
  useEffect(() => {
    const loadInitialLanguage = async () => {
      try {
        const saved = localStorage.getItem('hnds-language') as Language | null;
        const initialLang = saved && (saved === 'hr' || saved === 'de') ? saved : 'hr';
        
        // Load both languages for smoother switching
        const [hrTranslations, deTranslations] = await Promise.all([
          loadTranslations('hr'),
          loadTranslations('de'),
        ]);

        setTranslations({
          hr: hrTranslations,
          de: deTranslations,
        });
        
        setLanguageState(initialLang);
      } catch (error) {
        console.error('Failed to load initial language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialLanguage();
  }, []);

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hnds-language', lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, []);

  // Translation function
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = getNestedValue(translations[language], key);
      
      if (value === undefined) {
        // Fallback to other language
        const fallbackLang = language === 'hr' ? 'de' : 'hr';
        const fallbackValue = getNestedValue(translations[fallbackLang], key);
        
        if (fallbackValue !== undefined) {
          console.warn(`Translation missing for "${key}" in "${language}", using fallback`);
          return interpolate(fallbackValue, params);
        }
        
        // Return the key itself as last resort
        console.warn(`Translation missing for "${key}" in all languages`);
        return key;
      }

      return interpolate(value, params);
    },
    [language, translations]
  );

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isLoading,
    }),
    [language, setLanguage, t, isLoading]
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use i18n
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  
  if (!context) {
    // Provide fallback for SSR/static rendering
    return {
      language: 'hr',
      setLanguage: () => {},
      t: (key: string) => key,
      isLoading: false,
    };
  }
  
  return context;
}

// Hook for just the translation function (optimized)
export function useTranslation() {
  const { t, language } = useI18n();
  return { t, language };
}

// Hook for language switching
export function useLanguage() {
  const { language, setLanguage, isLoading } = useI18n();
  return { language, setLanguage, isLoading };
}

// Language names for display
export const languageNames: Record<Language, { native: string; english: string; flag: string }> = {
  hr: { native: 'Hrvatski', english: 'Croatian', flag: '🇭🇷' },
  de: { native: 'Deutsch', english: 'German', flag: '🇩🇪' },
};

// Available languages
export const availableLanguages: Language[] = ['hr', 'de'];
