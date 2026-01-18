'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, localeFlags } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'hr' | 'de' });
    setIsOpen(false);
  };

  const currentFlag = localeFlags[locale as keyof typeof localeFlags];
  const currentName = localeNames[locale as keyof typeof localeNames];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50
          text-slate-700 dark:text-slate-200 transition-colors duration-200
          border border-slate-200/20 dark:border-slate-700/50"
        aria-label={`Current language: ${currentName}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg" aria-hidden="true">{currentFlag}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg
              bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
              overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
          >
            {locales.map((loc) => {
              const isSelected = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                    transition-colors duration-150
                    ${isSelected 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' 
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="text-lg" aria-hidden="true">
                    {localeFlags[loc as keyof typeof localeFlags]}
                  </span>
                  <span className="flex-1 text-left">
                    {localeNames[loc as keyof typeof localeNames]}
                  </span>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Compact version for mobile navigation
export function LanguageSwitcherCompact() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale = locale === 'hr' ? 'de' : 'hr';
    router.replace(pathname, { locale: newLocale });
  };

  const nextFlag = locale === 'hr' ? localeFlags.de : localeFlags.hr;
  const nextName = locale === 'hr' ? localeNames.de : localeNames.hr;

  return (
    <button
      onClick={handleLocaleChange}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
        bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50
        text-slate-700 dark:text-slate-200 transition-colors duration-200
        border border-slate-200/20 dark:border-slate-700/50"
      aria-label={`Switch to ${nextName}`}
    >
      <span className="text-lg" aria-hidden="true">{nextFlag}</span>
      <span className="sr-only">Switch to {nextName}</span>
    </button>
  );
}
