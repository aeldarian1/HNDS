// Load existing locale files for General Translation
// This allows using the existing hr.json and de.json files from public/locales
export default async function loadDictionary(locale: string) {
  try {
    const translations = await import(`../public/locales/${locale}.json`);
    return translations.default;
  } catch {
    // Fallback to Croatian if locale file not found
    const fallback = await import('../public/locales/hr.json');
    return fallback.default;
  }
}
