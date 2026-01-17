'use client'

import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import i18n from '@/lib/i18n.config'

type Language = 'hr' | 'de'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

/**
 * i18next Provider wrapper for the application
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

/**
 * Custom hook that wraps react-i18next's useTranslation
 * for backward compatibility with existing components
 */
export function useI18n(): I18nContextType {
  const { i18n: i18nInstance, t: i18nextT } = useTranslation()

  return {
    language: i18nInstance.language as Language,
    setLanguage: (lang: Language) => {
      i18nInstance.changeLanguage(lang)
    },
    t: (key: string): string => {
      const value = i18nextT(key)
      // i18next returns the key if translation not found
      return value === key ? key : value
    },
  }
}
