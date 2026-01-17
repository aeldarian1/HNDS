'use client';

import { useTranslations } from 'gt-next/client';

/**
 * Hook for translations using GT dictionary
 */
export function useTranslation() {
  const t = useTranslations();
  
  return { 
    t: (id: string) => {
      try {
        return t(id) || id;
      } catch {
        return id;
      }
    }
  };
}
