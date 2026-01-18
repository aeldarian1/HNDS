// Internationalization configuration
export const locales = ['hr', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'hr';

export const localeNames: Record<Locale, string> = {
  hr: 'Hrvatski',
  de: 'Deutsch',
};

export const localeFlags: Record<Locale, string> = {
  hr: '🇭🇷',
  de: '🇩🇪',
};
