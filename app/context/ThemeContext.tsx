'use client';

import { createContext, useContext, useEffect, useCallback, useSyncExternalStore, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get system preference
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Theme store for useSyncExternalStore
let themeListeners: Array<() => void> = [];
let currentTheme: Theme = 'dark';
let currentResolved: 'dark' | 'light' = 'dark';

// Cached snapshots (must be stable references until theme changes)
const serverSnapshot: { theme: Theme; resolved: 'dark' | 'light' } = { theme: 'dark', resolved: 'dark' };
let clientSnapshot: { theme: Theme; resolved: 'dark' | 'light' } = { theme: currentTheme, resolved: currentResolved };

const themeStore = {
  subscribe(listener: () => void) {
    themeListeners.push(listener);
    return () => {
      themeListeners = themeListeners.filter(l => l !== listener);
    };
  },
  getSnapshot(): { theme: Theme; resolved: 'dark' | 'light' } {
    // Return cached snapshot (only updates when setTheme/updateResolved is called)
    return clientSnapshot;
  },
  getServerSnapshot(): { theme: Theme; resolved: 'dark' | 'light' } {
    // Return cached object to avoid infinite loop
    return serverSnapshot;
  },
  setTheme(newTheme: Theme) {
    currentTheme = newTheme;
    currentResolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    // Create new snapshot reference to trigger re-render
    clientSnapshot = { theme: currentTheme, resolved: currentResolved };
    localStorage.setItem('theme', newTheme);
    applyTheme(currentResolved);
    themeListeners.forEach(l => l());
  },
  updateResolved(resolved: 'dark' | 'light') {
    currentResolved = resolved;
    // Create new snapshot reference to trigger re-render
    clientSnapshot = { theme: currentTheme, resolved: currentResolved };
    applyTheme(resolved);
    themeListeners.forEach(l => l());
  },
  initialize() {
    if (typeof window === 'undefined') return;
    const stored = (localStorage.getItem('theme') as Theme) || 'dark';
    currentTheme = stored;
    currentResolved = stored === 'system' ? getSystemTheme() : stored;
    // Create new snapshot reference
    clientSnapshot = { theme: currentTheme, resolved: currentResolved };
    applyTheme(currentResolved);
  }
};

function applyTheme(resolved: 'dark' | 'light') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

// Initialize on module load (client-side only)
if (typeof window !== 'undefined') {
  themeStore.initialize();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use sync external store - no setState in effects needed
  const { theme, resolved: resolvedTheme } = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  // Listen for system theme changes via event listener (allowed in effects)
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      themeStore.updateResolved(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    themeStore.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    themeStore.setTheme(newTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
