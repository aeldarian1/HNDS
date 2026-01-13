'use client';

import { useI18n } from '@/app/context/I18nContext';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedLang, setSelectedLang] = useState(language);

  const languages = [
    { code: 'hr', label: 'Hrvatski', fullLabel: 'Croatian', flag: '🇭🇷' },
    { code: 'de', label: 'Deutsch', fullLabel: 'German', flag: '🇩🇪' },
  ];

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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  const handleLanguageChange = (code: 'hr' | 'de') => {
    setSelectedLang(code);
    setLanguage(code);
    // Delay closing to allow animation
    setTimeout(() => setIsOpen(false), 200);
  };

  const currentLang = languages.find(l => l.code === selectedLang);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
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
            className="absolute right-0 sm:right-0 mt-3 w-[calc(100vw-2rem)] sm:w-52 max-w-xs rounded-lg shadow-2xl z-50 overflow-hidden border border-yellow-600/30 bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm"
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
                    className={`w-full text-left px-4 py-3 sm:py-3 rounded-md flex items-center gap-3 transition-all duration-200 group relative overflow-hidden touch-none active:scale-95 ${
                      isSelected
                        ? 'bg-gradient-to-r from-yellow-600/40 to-yellow-500/20 text-yellow-300'
                        : 'text-white hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-yellow-500/10 active:bg-gradient-to-r active:from-yellow-600/30 active:to-yellow-500/20'
                    }`}
                  >
                    {/* Background gradient animation on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 to-yellow-500/0 group-hover:from-yellow-600/10 group-hover:to-yellow-500/5 -z-10"
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Flag with scaling animation */}
                    <motion.span
                      className="text-xl sm:text-2xl flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {lang.flag}
                    </motion.span>

                    {/* Text content */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-sm sm:text-sm font-medium truncate">{lang.label}</span>
                      <span className="text-xs opacity-60 group-hover:opacity-80 transition-opacity truncate">{lang.fullLabel}</span>
                    </div>

                    {/* Checkmark for selected language */}
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

            {/* Divider line */}
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent" />
            
            {/* Footer info */}
            <div className="px-3 sm:px-4 py-2 text-xs text-gray-500 text-center font-light">
              Jezična postavka je spremljena
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
