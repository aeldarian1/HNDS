'use client';

import { useI18n } from '@/app/context/I18nContext';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Desktop version (dropdown)
export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedLang, setSelectedLang] = useState(language);
  const [mounted, setMounted] = useState(false);

  const languages = [
    { code: 'hr', label: 'Hrvatski', fullLabel: 'Croatian', flag: '🇭🇷' },
    { code: 'de', label: 'Deutsch', fullLabel: 'German', flag: '🇩🇪' },
  ];

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setSelectedLang(language);
  }, [language]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (code: 'hr' | 'de') => {
    setSelectedLang(code);
    setLanguage(code);
    setTimeout(() => setIsOpen(false), 200);
  };

  const currentLang = languages.find(l => l.code === selectedLang);

  // Render placeholder during SSR to match initial server render
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-white text-sm font-light transition-all duration-300 group hover:bg-gradient-to-r hover:from-yellow-600/30 hover:to-yellow-500/20 border border-transparent hover:border-yellow-600/50 min-h-[44px] min-w-[44px] justify-center sm:justify-start"
          aria-label="Select language"
        >
          <Globe size={18} className="text-yellow-500" />
          <span className="text-lg">🇭🇷</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-white text-sm font-light transition-all duration-300 group hover:bg-gradient-to-r hover:from-yellow-600/30 hover:to-yellow-500/20 border border-transparent hover:border-yellow-600/50 min-h-[44px] min-w-[44px] justify-center sm:justify-start"
        aria-label="Select language"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Globe size={18} className="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
        </motion.div>
        <span className="text-lg">{currentLang?.flag}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 sm:right-0 mt-3 w-52 rounded-lg shadow-2xl z-50 overflow-hidden border border-yellow-600/30 bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm"
          >
            <div className="p-2 space-y-1">
              {languages.map((lang, index) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'hr' | 'de')}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-all duration-200 group relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-r from-yellow-600/40 to-yellow-500/20 text-yellow-300'
                        : 'text-white hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-yellow-500/10'
                    }`}
                  >
                    <motion.span
                      className="text-2xl flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {lang.flag}
                    </motion.span>
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{lang.label}</span>
                      <span className="text-xs opacity-60 group-hover:opacity-80 transition-opacity truncate">{lang.fullLabel}</span>
                    </div>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check size={18} className="text-yellow-400" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent" />
            <div className="px-4 py-2 text-xs text-gray-500 text-center font-light">
              Jezična postavka je spremljena
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile version (toggle buttons with flags)
export function LanguageSwitcherMobile() {
  const { language, setLanguage } = useI18n();
  const [selectedLang, setSelectedLang] = useState(language);

  const languages = [
    { code: 'hr', label: 'Hrvatski', shortLabel: 'HR', flagUrl: 'https://flagcdn.com/hr.svg' },
    { code: 'de', label: 'Deutsch', shortLabel: 'DE', flagUrl: 'https://flagcdn.com/de.svg' },
  ];

  const handleLanguageChange = (code: 'hr' | 'de') => {
    setSelectedLang(code);
    setLanguage(code);
  };

  return (
    <div className="relative bg-gradient-to-br from-white/8 to-white/3 rounded-2xl p-2 border border-white/10 backdrop-blur-sm shadow-xl">
      <div className="relative flex gap-3">
        {languages.map((lang) => {
          const isSelected = selectedLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as 'hr' | 'de')}
              className="relative flex-1 flex flex-col items-center justify-center gap-2 py-4 px-5 rounded-xl transition-all duration-300 z-10 group"
              aria-label={lang.label}
            >
              <div className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-300 ${
                isSelected 
                  ? 'scale-110 shadow-xl shadow-yellow-500/40 ring-2 ring-yellow-500/70' 
                  : 'scale-100 opacity-50 group-hover:opacity-80 group-hover:scale-105 shadow-lg'
              }`}>
                <Image
                  src={lang.flagUrl}
                  alt={`${lang.label} flag`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className={`text-[10px] font-medium uppercase tracking-widest transition-all duration-300 ${
                isSelected 
                  ? 'text-yellow-400 opacity-100' 
                  : 'text-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-gray-400'
              }`}>
                {lang.shortLabel}
              </span>
            </button>
          );
        })}
        
        {/* Sliding background indicator */}
        <motion.div
          className="absolute inset-y-1 bg-gradient-to-br from-yellow-600/25 to-yellow-500/15 rounded-xl border border-yellow-500/40 shadow-2xl shadow-yellow-600/30"
          initial={false}
          animate={{
            left: selectedLang === 'hr' ? '0.5rem' : 'calc(50% + 0.375rem)',
            right: selectedLang === 'hr' ? 'calc(50% + 0.375rem)' : '0.5rem',
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      </div>
    </div>
  );
}
