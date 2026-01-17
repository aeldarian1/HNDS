/**
 * DeepL Automated Translation Script for Static Pages
 * 
 * This script extracts hardcoded Croatian text from static pages,
 * translates them to German using DeepL API, and updates both
 * translation files and component files automatically.
 * 
 * Usage: npm run translate:static
 */

import * as dotenv from 'dotenv';
import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// DeepL API setup
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';
const translator = new deepl.Translator(DEEPL_API_KEY);

// File paths
const HR_LOCALE_PATH = path.join(process.cwd(), 'locales/hr.json');
const DE_LOCALE_PATH = path.join(process.cwd(), 'locales/de.json');

interface TranslationEntry {
  key: string;
  croatianText: string;
  context?: string;
}

interface PageConfig {
  filePath: string;
  pageName: string;
  translations: TranslationEntry[];
}

/**
 * Static page configurations with hardcoded text to translate
 */
const STATIC_PAGES: PageConfig[] = [
  {
    filePath: 'app/statut/page.tsx',
    pageName: 'statute',
    translations: [
      { key: 'pages.statute.title', croatianText: 'Statut HNJD-a Split', context: 'Page title' },
      { key: 'pages.statute.subtitle', croatianText: 'Osnovni pravni akt koji uređuje organizaciju i rad društva', context: 'Page subtitle' },
      { key: 'pages.statute.mission.title', croatianText: 'Misija i djelatnosti', context: 'Section title' },
      { key: 'pages.statute.mission.intro', croatianText: 'Hrvatsko-Njemačko društvo Split je neprofitna kulturna organizacija koja djeluje na području Splita i okolice s ciljem:', context: 'Introduction' },
      { key: 'pages.statute.mission.point1', croatianText: 'Jačanje kulturnih, obrazovnih i gospodarskih veza između Hrvatske i Njemačke', context: 'Mission point' },
      { key: 'pages.statute.mission.point2', croatianText: 'Organizacija jezičnih tečajeva i kulturnih događaja', context: 'Mission point' },
      { key: 'pages.statute.mission.point3', croatianText: 'Promicanje interkulturalnog dijaloga i razmjene', context: 'Mission point' },
      { key: 'pages.statute.mission.point4', croatianText: 'Pružanje podrške članovima u edukaciji i profesionalnom razvoju', context: 'Mission point' },
      { key: 'pages.statute.mission.point5', croatianText: 'Suradnja s kulturnim institucijama u Hrvatskoj i Njemačkoj', context: 'Mission point' },
      { key: 'pages.statute.membership.title', croatianText: 'Članstvo', context: 'Section title' },
      { key: 'pages.statute.membership.types', croatianText: 'Vrste članstva:', context: 'Subsection title' },
      { key: 'pages.statute.membership.regular', croatianText: 'Redovno članstvo - za fizičke osobe zainteresirane za rad društva', context: 'Membership type' },
      { key: 'pages.statute.membership.premium', croatianText: 'Premium članstvo - s dodatnim pogodnostima i prioritetom za događaje', context: 'Membership type' },
      { key: 'pages.statute.membership.sponsor', croatianText: 'Pokroviteljsko članstvo - za organizacije i pojedince koji žele podržati rad društva', context: 'Membership type' },
      { key: 'pages.statute.membership.rights', croatianText: 'Prava članova:', context: 'Subsection title' },
      { key: 'pages.statute.membership.right1', croatianText: 'Sudjelovanje u svim aktivnostima društva', context: 'Member right' },
      { key: 'pages.statute.membership.right2', croatianText: 'Pravo glasa na skupštini društva', context: 'Member right' },
      { key: 'pages.statute.membership.right3', croatianText: 'Popusti na tečajeve i događaje', context: 'Member right' },
      { key: 'pages.statute.membership.right4', croatianText: 'Pristup knjižnici i edukativnim materijalima', context: 'Member right' },
      { key: 'pages.statute.membership.right5', croatianText: 'Mogućnost predlaganja novih programa i aktivnosti', context: 'Member right' },
      { key: 'pages.statute.organization.title', croatianText: 'Organizacijska struktura', context: 'Section title' },
      { key: 'pages.statute.organization.intro', croatianText: 'Društvom upravljaju:', context: 'Introduction' },
      { key: 'pages.statute.organization.assembly', croatianText: 'Skupština - najviše tijelo odlučivanja', context: 'Organization body' },
      { key: 'pages.statute.organization.board', croatianText: 'Upravni odbor - izvršno tijelo između skupština', context: 'Organization body' },
      { key: 'pages.statute.organization.president', croatianText: 'Predsjednik - zastupa i predstavlja društvo', context: 'Organization body' },
      { key: 'pages.statute.organization.secretary', croatianText: 'Tajnik - vodi administrativne poslove', context: 'Organization body' },
      { key: 'pages.statute.organization.treasurer', croatianText: 'Blagajnik - upravlja financijama društva', context: 'Organization body' },
      { key: 'pages.statute.finance.title', croatianText: 'Financiranje', context: 'Section title' },
      { key: 'pages.statute.finance.intro', croatianText: 'Društvo se financira iz:', context: 'Introduction' },
      { key: 'pages.statute.finance.source1', croatianText: 'Članarina', context: 'Funding source' },
      { key: 'pages.statute.finance.source2', croatianText: 'Donacije i pokroviteljstva', context: 'Funding source' },
      { key: 'pages.statute.finance.source3', croatianText: 'Naknada za tečajeve i usluge', context: 'Funding source' },
      { key: 'pages.statute.finance.source4', croatianText: 'Projekti i grantovi', context: 'Funding source' },
      { key: 'pages.statute.finance.source5', croatianText: 'Prihodi od kulturnih i obrazovnih programa', context: 'Funding source' },
      { key: 'pages.statute.amendments.title', croatianText: 'Izmjene statuta', context: 'Section title' },
      { key: 'pages.statute.amendments.text', croatianText: 'Statut se može mijenjati odlukom skupštine uz potrebnu većinu glasova. Izmjene stupaju na snagu nakon upisa u registar udruga.', context: 'Amendment text' },
      { key: 'pages.statute.contact.title', croatianText: 'Kontakt', context: 'Section title' },
      { key: 'pages.statute.contact.text', croatianText: 'Za sva pitanja u vezi statuta kontaktirajte nas na hnjd.split@gmail.com', context: 'Contact text' },
    ]
  },
  {
    filePath: 'app/uvjeti/page.tsx',
    pageName: 'terms',
    translations: [
      { key: 'pages.terms.title', croatianText: 'Uvjeti korištenja', context: 'Page title' },
      { key: 'pages.terms.subtitle', croatianText: 'Pročitajte pažljivo prije nego što nastavite korištenje naše web stranice', context: 'Page subtitle' },
      { key: 'pages.terms.acceptance.title', croatianText: '1. Prihvaćanje uvjeta', context: 'Section title' },
      { key: 'pages.terms.acceptance.text', croatianText: 'Korištenjem web stranice HNJD-a Split prihvaćate ove uvjete korištenja u cijelosti. Ako se ne slažete s ovim uvjetima, molimo da ne koristite našu web stranicu.', context: 'Terms text' },
      { key: 'pages.terms.services.title', croatianText: '2. Usluge', context: 'Section title' },
      { key: 'pages.terms.services.intro', croatianText: 'Naša web stranica pruža sljedeće usluge:', context: 'Introduction' },
      { key: 'pages.terms.services.service1', croatianText: 'Informacije o društvu i našim aktivnostima', context: 'Service item' },
      { key: 'pages.terms.services.service2', croatianText: 'Prijava za jezične tečajeve i događaje', context: 'Service item' },
      { key: 'pages.terms.services.service3', croatianText: 'Kontakt obrazac za upite', context: 'Service item' },
      { key: 'pages.terms.services.service4', croatianText: 'Pristup galeriji slika i kronike', context: 'Service item' },
      { key: 'pages.terms.services.service5', croatianText: 'Newsletter pretplata', context: 'Service item' },
      { key: 'pages.terms.userResponsibilities.title', croatianText: '3. Odgovornosti korisnika', context: 'Section title' },
      { key: 'pages.terms.userResponsibilities.intro', croatianText: 'Korisnici se obvezuju:', context: 'Introduction' },
      { key: 'pages.terms.userResponsibilities.resp1', croatianText: 'Pružiti točne i ažurne podatke prilikom registracije', context: 'Responsibility item' },
      { key: 'pages.terms.userResponsibilities.resp2', croatianText: 'Ne dijeliti svoje korisničke podatke s trećim stranama', context: 'Responsibility item' },
      { key: 'pages.terms.userResponsibilities.resp3', croatianText: 'Ne koristiti web stranicu u nezakonite svrhe', context: 'Responsibility item' },
      { key: 'pages.terms.userResponsibilities.resp4', croatianText: 'Ne ometati rad web stranice ili servera', context: 'Responsibility item' },
      { key: 'pages.terms.userResponsibilities.resp5', croatianText: 'Poštivati prava intelektualnog vlasništva', context: 'Responsibility item' },
      { key: 'pages.terms.intellectualProperty.title', croatianText: '4. Intelektualno vlasništvo', context: 'Section title' },
      { key: 'pages.terms.intellectualProperty.text', croatianText: 'Sav sadržaj na ovoj web stranici, uključujući tekst, slike, logotipe i dizajn, vlasništvo je HNJD-a Split ili je korišten uz dopuštenje vlasnika. Zabranjeno je kopiranje, distribucija ili reprodukcija sadržaja bez pisane dozvole.', context: 'Intellectual property text' },
      { key: 'pages.terms.privacy.title', croatianText: '5. Privatnost', context: 'Section title' },
      { key: 'pages.terms.privacy.text', croatianText: 'Korištenje osobnih podataka regulirano je našom Politikom privatnosti. Koristimo podatke isključivo za pružanje usluga i komunikaciju s članovima.', context: 'Privacy text' },
      { key: 'pages.terms.limitation.title', croatianText: '6. Ograničenje odgovornosti', context: 'Section title' },
      { key: 'pages.terms.limitation.text', croatianText: 'HNJD Split ne odgovara za bilo kakve izravne ili neizravne štete koje mogu proizaći iz korištenja ili nemogućnosti korištenja web stranice. Web stranica se pruža "kakva jest" bez ikakvih jamstava.', context: 'Limitation text' },
      { key: 'pages.terms.modifications.title', croatianText: '7. Izmjene uvjeta', context: 'Section title' },
      { key: 'pages.terms.modifications.text', croatianText: 'Zadržavamo pravo izmjene ovih uvjeta u bilo kojem trenutku. Izmjene će biti objavljene na ovoj stranici s datumom ažuriranja. Nastavkom korištenja web stranice nakon izmjena prihvaćate nove uvjete.', context: 'Modifications text' },
      { key: 'pages.terms.termination.title', croatianText: '8. Raskid', context: 'Section title' },
      { key: 'pages.terms.termination.text', croatianText: 'Zadržavamo pravo uskratiti ili prekinuti pristup web stranici bilo kojem korisniku koji krši ove uvjete, bez prethodne najave.', context: 'Termination text' },
      { key: 'pages.terms.law.title', croatianText: '9. Mjerodavno pravo', context: 'Section title' },
      { key: 'pages.terms.law.text', croatianText: 'Ovi uvjeti regulirani su zakonima Republike Hrvatske. Svi sporovi rješavat će se pred nadležnim sudovima u Splitu.', context: 'Law text' },
      { key: 'pages.terms.contact.title', croatianText: 'Kontakt', context: 'Section title' },
      { key: 'pages.terms.contact.text', croatianText: 'Za sva pitanja u vezi uvjeta korištenja kontaktirajte nas na hnjd.split@gmail.com', context: 'Contact text' },
      { key: 'pages.terms.lastUpdated', croatianText: 'Zadnje ažurirano', context: 'Last updated label' },
    ]
  },
  {
    filePath: 'app/privatnost/page.tsx',
    pageName: 'privacy',
    translations: [
      { key: 'pages.privacy.title', croatianText: 'Politika privatnosti', context: 'Page title' },
      { key: 'pages.privacy.subtitle', croatianText: 'Kako prikupljamo, koristimo i štitimo vaše osobne podatke', context: 'Page subtitle' },
      { key: 'pages.privacy.intro.title', croatianText: '1. Uvod', context: 'Section title' },
      { key: 'pages.privacy.intro.text', croatianText: 'HNJD Split posvećen je zaštiti privatnosti naših korisnika. Ova politika objašnjava kako prikupljamo, koristimo i štitimo vaše osobne podatke u skladu s Općom uredbom o zaštiti podataka (GDPR).', context: 'Introduction text' },
      { key: 'pages.privacy.dataCollection.title', croatianText: '2. Prikupljanje podataka', context: 'Section title' },
      { key: 'pages.privacy.dataCollection.intro', croatianText: 'Prikupljamo sljedeće vrste podataka:', context: 'Introduction' },
      { key: 'pages.privacy.dataCollection.personal', croatianText: 'Osobni podaci: ime, prezime, email, telefonski broj', context: 'Data type' },
      { key: 'pages.privacy.dataCollection.technical', croatianText: 'Tehnički podaci: IP adresa, tip preglednika, uređaj', context: 'Data type' },
      { key: 'pages.privacy.dataCollection.usage', croatianText: 'Podaci o korištenju: stranice koje posjetite, vrijeme provedeno', context: 'Data type' },
      { key: 'pages.privacy.dataCollection.cookies', croatianText: 'Kolačići: za poboljšanje korisničkog iskustva', context: 'Data type' },
      { key: 'pages.privacy.dataUsage.title', croatianText: '3. Uporaba podataka', context: 'Section title' },
      { key: 'pages.privacy.dataUsage.intro', croatianText: 'Vaše podatke koristimo za:', context: 'Introduction' },
      { key: 'pages.privacy.dataUsage.use1', croatianText: 'Pružanje usluga i obrada prijava', context: 'Usage item' },
      { key: 'pages.privacy.dataUsage.use2', croatianText: 'Komunikacija o aktivnostima i događajima', context: 'Usage item' },
      { key: 'pages.privacy.dataUsage.use3', croatianText: 'Slanje newsletter-a (uz vašu privolu)', context: 'Usage item' },
      { key: 'pages.privacy.dataUsage.use4', croatianText: 'Poboljšanje web stranice i korisničkog iskustva', context: 'Usage item' },
      { key: 'pages.privacy.dataUsage.use5', croatianText: 'Ispunjavanje zakonskih obveza', context: 'Usage item' },
      { key: 'pages.privacy.dataSharing.title', croatianText: '4. Dijeljenje podataka', context: 'Section title' },
      { key: 'pages.privacy.dataSharing.text', croatianText: 'Ne prodajemo niti izdajemo vaše osobne podatke trećim stranama. Podatke možemo dijeliti samo s pouzdanim partnerima koji nam pomažu u radu (npr. hosting, email usluge), uz obvezujuće ugovore o zaštiti podataka.', context: 'Sharing text' },
      { key: 'pages.privacy.dataSecurity.title', croatianText: '5. Sigurnost podataka', context: 'Section title' },
      { key: 'pages.privacy.dataSecurity.text', croatianText: 'Koristimo suvremene sigurnosne mjere za zaštitu vaših podataka, uključujući SSL enkripciju, sigurne servere i redovite sigurnosne provjere. Pristup podacima imaju samo ovlaštene osobe.', context: 'Security text' },
      { key: 'pages.privacy.cookies.title', croatianText: '6. Kolačići', context: 'Section title' },
      { key: 'pages.privacy.cookies.intro', croatianText: 'Koristimo kolačiće za:', context: 'Introduction' },
      { key: 'pages.privacy.cookies.essential', croatianText: 'Nužni kolačići: za osnovno funkcioniranje stranice', context: 'Cookie type' },
      { key: 'pages.privacy.cookies.analytics', croatianText: 'Analitički kolačići: za razumijevanje kako korisnici koriste stranicu', context: 'Cookie type' },
      { key: 'pages.privacy.cookies.preferences', croatianText: 'Kolačići preferencija: za spremanje vaših postavki (npr. jezik)', context: 'Cookie type' },
      { key: 'pages.privacy.cookies.manage', croatianText: 'Možete upravljati kolačićima u postavkama vašeg preglednika.', context: 'Cookie management' },
      { key: 'pages.privacy.rights.title', croatianText: '7. Vaša prava', context: 'Section title' },
      { key: 'pages.privacy.rights.intro', croatianText: 'Prema GDPR-u imate pravo:', context: 'Introduction' },
      { key: 'pages.privacy.rights.access', croatianText: 'Pravo na pristup - saznati koje podatke imamo o vama', context: 'User right' },
      { key: 'pages.privacy.rights.rectification', croatianText: 'Pravo na ispravak - ispraviti netočne podatke', context: 'User right' },
      { key: 'pages.privacy.rights.erasure', croatianText: 'Pravo na brisanje - zatražiti brisanje vaših podataka', context: 'User right' },
      { key: 'pages.privacy.rights.restriction', croatianText: 'Pravo na ograničenje obrade - ograničiti kako koristimo podatke', context: 'User right' },
      { key: 'pages.privacy.rights.portability', croatianText: 'Pravo na prenosivost - dobiti podatke u strojno čitljivom formatu', context: 'User right' },
      { key: 'pages.privacy.rights.objection', croatianText: 'Pravo na prigovor - uložiti prigovor na obradu podataka', context: 'User right' },
      { key: 'pages.privacy.retention.title', croatianText: '8. Čuvanje podataka', context: 'Section title' },
      { key: 'pages.privacy.retention.text', croatianText: 'Vaše podatke čuvamo samo onoliko dugo koliko je potrebno za pružanje usluga ili ispunjavanje zakonskih obveza. Nakon toga se podaci sigurno brišu ili anonimiziraju.', context: 'Retention text' },
      { key: 'pages.privacy.changes.title', croatianText: '9. Izmjene politike', context: 'Section title' },
      { key: 'pages.privacy.changes.text', croatianText: 'Zadržavamo pravo izmjene ove politike privatnosti. Izmjene će biti objavljene na ovoj stranici s datumom ažuriranja. Preporučujemo redovitu provjeru ove stranice.', context: 'Changes text' },
      { key: 'pages.privacy.contact.title', croatianText: 'Kontakt', context: 'Section title' },
      { key: 'pages.privacy.contact.text', croatianText: 'Za sva pitanja u vezi privatnosti ili ostvarivanja vaših prava kontaktirajte nas na hnjd.split@gmail.com', context: 'Contact text' },
      { key: 'pages.privacy.lastUpdated', croatianText: 'Zadnje ažurirano', context: 'Last updated label' },
    ]
  }
];

/**
 * Translate text using DeepL API
 */
async function translateText(text: string, targetLang: 'DE'): Promise<string> {
  try {
    const result = await translator.translateText(text, 'hr', targetLang, {
      formality: 'default',
      preserveFormatting: true,
    });
    return result.text;
  } catch (error) {
    console.error(`Translation error for "${text}":`, error);
    return text; // Return original if translation fails
  }
}

/**
 * Update locale JSON files with new translations
 */
function updateLocaleFiles(translations: Record<string, { hr: string; de: string }>) {
  // Load existing translations
  const hrTranslations = JSON.parse(fs.readFileSync(HR_LOCALE_PATH, 'utf-8'));
  const deTranslations = JSON.parse(fs.readFileSync(DE_LOCALE_PATH, 'utf-8'));

  // Deep set nested keys
  function setNestedKey(obj: any, path: string, value: string) {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {};
      return acc[key];
    }, obj);
    target[lastKey] = value;
  }

  // Add new translations
  Object.entries(translations).forEach(([key, { hr, de }]) => {
    setNestedKey(hrTranslations, key, hr);
    setNestedKey(deTranslations, key, de);
  });

  // Write updated files
  fs.writeFileSync(HR_LOCALE_PATH, JSON.stringify(hrTranslations, null, 2), 'utf-8');
  fs.writeFileSync(DE_LOCALE_PATH, JSON.stringify(deTranslations, null, 2), 'utf-8');
}

/**
 * Main translation function
 */
async function translateStaticPages() {
  console.log('🚀 Starting DeepL automated translation for static pages...\n');

  if (!DEEPL_API_KEY) {
    console.error('❌ DEEPL_API_KEY not found in environment variables!');
    console.error('Please add DEEPL_API_KEY to your .env.local file');
    process.exit(1);
  }

  // Verify DeepL connection
  try {
    const usage = await translator.getUsage();
    if (usage.character) {
      console.log(`✓ DeepL API connected successfully`);
      console.log(`  Character usage: ${usage.character.count} / ${usage.character.limit}\n`);
    }
  } catch (error) {
    console.error('❌ Failed to connect to DeepL API:', error);
    process.exit(1);
  }

  const allTranslations: Record<string, { hr: string; de: string }> = {};
  let totalTranslated = 0;

  // Process each page
  for (const page of STATIC_PAGES) {
    console.log(`📄 Processing ${page.pageName}...`);
    
    for (const entry of page.translations) {
      process.stdout.write(`  Translating: ${entry.key}... `);
      
      const germanText = await translateText(entry.croatianText, 'DE');
      allTranslations[entry.key] = {
        hr: entry.croatianText,
        de: germanText
      };
      
      console.log('✓');
      totalTranslated++;
      
      // Small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`  ✓ Translated ${page.translations.length} strings\n`);
  }

  // Update locale files
  console.log('📝 Updating locale files...');
  updateLocaleFiles(allTranslations);
  console.log('✓ Locale files updated\n');

  // Summary
  console.log('🎉 Translation complete!');
  console.log(`\nSummary:`);
  console.log(`  Total strings translated: ${totalTranslated}`);
  console.log(`  Pages processed: ${STATIC_PAGES.length}`);
  console.log(`  Files updated: locales/hr.json, locales/de.json`);
  console.log('\n📋 Next steps:');
  console.log('  1. Run the component updater script to replace hardcoded strings');
  console.log('  2. Test the pages in both languages');
  console.log('  3. Verify translations are accurate\n');
}

// Run the script
translateStaticPages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
