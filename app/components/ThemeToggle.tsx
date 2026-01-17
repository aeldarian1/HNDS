'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'simple' | 'dropdown';
  className?: string;
}

export function ThemeToggle({ variant = 'simple', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('ThemeToggle clicked! Current theme:', resolvedTheme);
    toggleTheme();
  };

  if (variant === 'simple') {
    return (
      <button
        onClick={handleClick}
        className={`nav-link p-2 rounded-lg transition-all ${className}`}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        type="button"
      >
        <span className="block" style={{ transform: resolvedTheme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
          {resolvedTheme === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </span>
      </button>
    );
  }

  // Dropdown variant with system option
  const options = [
    { value: 'light', label: 'Svijetla', icon: Sun },
    { value: 'dark', label: 'Tamna', icon: Moon },
    { value: 'system', label: 'Sustav', icon: Monitor },
  ] as const;

  return (
    <div className={`relative group ${className}`}>
      <motion.button
        className="p-2 rounded-lg bg-slate-800/50 border border-yellow-600/20 text-gray-300 hover:text-yellow-500 hover:border-yellow-600/50 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme options"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.button>

      <div className="absolute right-0 top-full mt-2 py-2 bg-slate-900 border border-yellow-600/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                theme === option.value
                  ? 'text-yellow-500 bg-yellow-600/10'
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
