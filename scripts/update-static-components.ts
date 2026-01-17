/**
 * Component Updater Script
 * 
 * Automatically replaces hardcoded Croatian text in components
 * with translation function calls after DeepL translation is complete.
 * 
 * Usage: npm run update:static-components
 */

import * as fs from 'fs';
import * as path from 'path';

interface Replacement {
  old: string;
  new: string;
  context?: string;
}

interface ComponentUpdate {
  filePath: string;
  pageName: string;
  replacements: Replacement[];
  needsImport: boolean;
}

/**
 * Component update configurations
 */
const COMPONENT_UPDATES: ComponentUpdate[] = [
  {
    filePath: 'app/statut/page.tsx',
    pageName: 'statute',
    needsImport: true,
    replacements: [
      { old: '"Statut HNJD-a Split"', new: '{t("pages.statute.title")}' },
      { old: '"Osnovni pravni akt koji uređuje organizaciju i rad društva"', new: '{t("pages.statute.subtitle")}' },
      { old: '"Misija i djelatnosti"', new: '{t("pages.statute.mission.title")}' },
      { old: '"Hrvatsko-Njemačko društvo Split je neprofitna kulturna organizacija koja djeluje na području Splita i okolice s ciljem:"', new: '{t("pages.statute.mission.intro")}' },
      { old: '"Jačanje kulturnih, obrazovnih i gospodarskih veza između Hrvatske i Njemačke"', new: '{t("pages.statute.mission.point1")}' },
      { old: '"Organizacija jezičnih tečajeva i kulturnih događaja"', new: '{t("pages.statute.mission.point2")}' },
      { old: '"Promicanje interkulturalnog dijaloga i razmjene"', new: '{t("pages.statute.mission.point3")}' },
      { old: '"Pružanje podrške članovima u edukaciji i profesionalnom razvoju"', new: '{t("pages.statute.mission.point4")}' },
      { old: '"Suradnja s kulturnim institucijama u Hrvatskoj i Njemačkoj"', new: '{t("pages.statute.mission.point5")}' },
      { old: '"Članstvo"', new: '{t("pages.statute.membership.title")}' },
      { old: '"Vrste članstva:"', new: '{t("pages.statute.membership.types")}' },
      { old: '"Redovno članstvo - za fizičke osobe zainteresirane za rad društva"', new: '{t("pages.statute.membership.regular")}' },
      { old: '"Premium članstvo - s dodatnim pogodnostima i prioritetom za događaje"', new: '{t("pages.statute.membership.premium")}' },
      { old: '"Pokroviteljsko članstvo - za organizacije i pojedince koji žele podržati rad društva"', new: '{t("pages.statute.membership.sponsor")}' },
      { old: '"Prava članova:"', new: '{t("pages.statute.membership.rights")}' },
      { old: '"Sudjelovanje u svim aktivnostima društva"', new: '{t("pages.statute.membership.right1")}' },
      { old: '"Pravo glasa na skupštini društva"', new: '{t("pages.statute.membership.right2")}' },
      { old: '"Popusti na tečajeve i događaje"', new: '{t("pages.statute.membership.right3")}' },
      { old: '"Pristup knjižnici i edukativnim materijalima"', new: '{t("pages.statute.membership.right4")}' },
      { old: '"Mogućnost predlaganja novih programa i aktivnosti"', new: '{t("pages.statute.membership.right5")}' },
      { old: '"Organizacijska struktura"', new: '{t("pages.statute.organization.title")}' },
      { old: '"Društvom upravljaju:"', new: '{t("pages.statute.organization.intro")}' },
      { old: '"Skupština - najviše tijelo odlučivanja"', new: '{t("pages.statute.organization.assembly")}' },
      { old: '"Upravni odbor - izvršno tijelo između skupština"', new: '{t("pages.statute.organization.board")}' },
      { old: '"Predsjednik - zastupa i predstavlja društvo"', new: '{t("pages.statute.organization.president")}' },
      { old: '"Tajnik - vodi administrativne poslove"', new: '{t("pages.statute.organization.secretary")}' },
      { old: '"Blagajnik - upravlja financijama društva"', new: '{t("pages.statute.organization.treasurer")}' },
      { old: '"Financiranje"', new: '{t("pages.statute.finance.title")}' },
      { old: '"Društvo se financira iz:"', new: '{t("pages.statute.finance.intro")}' },
      { old: '"Članarina"', new: '{t("pages.statute.finance.source1")}' },
      { old: '"Donacije i pokroviteljstva"', new: '{t("pages.statute.finance.source2")}' },
      { old: '"Naknada za tečajeve i usluge"', new: '{t("pages.statute.finance.source3")}' },
      { old: '"Projekti i grantovi"', new: '{t("pages.statute.finance.source4")}' },
      { old: '"Prihodi od kulturnih i obrazovnih programa"', new: '{t("pages.statute.finance.source5")}' },
      { old: '"Izmjene statuta"', new: '{t("pages.statute.amendments.title")}' },
      { old: '"Statut se može mijenjati odlukom skupštine uz potrebnu većinu glasova. Izmjene stupaju na snagu nakon upisa u registar udruga."', new: '{t("pages.statute.amendments.text")}' },
      { old: '"Za sva pitanja u vezi statuta kontaktirajte nas na hnjd.split@gmail.com"', new: '{t("pages.statute.contact.text")}' },
    ]
  },
  {
    filePath: 'app/uvjeti/page.tsx',
    pageName: 'terms',
    needsImport: true,
    replacements: [
      { old: '"Uvjeti korištenja"', new: '{t("pages.terms.title")}' },
      { old: '"Pročitajte pažljivo prije nego što nastavite korištenje naše web stranice"', new: '{t("pages.terms.subtitle")}' },
      { old: '"1. Prihvaćanje uvjeta"', new: '{t("pages.terms.acceptance.title")}' },
      { old: '"Korištenjem web stranice HNJD-a Split prihvaćate ove uvjete korištenja u cijelosti. Ako se ne slažete s ovim uvjetima, molimo da ne koristite našu web stranicu."', new: '{t("pages.terms.acceptance.text")}' },
      { old: '"2. Usluge"', new: '{t("pages.terms.services.title")}' },
      { old: '"Naša web stranica pruža sljedeće usluge:"', new: '{t("pages.terms.services.intro")}' },
      { old: '"Informacije o društvu i našim aktivnostima"', new: '{t("pages.terms.services.service1")}' },
      { old: '"Prijava za jezične tečajeve i događaje"', new: '{t("pages.terms.services.service2")}' },
      { old: '"Kontakt obrazac za upite"', new: '{t("pages.terms.services.service3")}' },
      { old: '"Pristup galeriji slika i kronike"', new: '{t("pages.terms.services.service4")}' },
      { old: '"Newsletter pretplata"', new: '{t("pages.terms.services.service5")}' },
      { old: '"3. Odgovornosti korisnika"', new: '{t("pages.terms.userResponsibilities.title")}' },
      { old: '"Korisnici se obvezuju:"', new: '{t("pages.terms.userResponsibilities.intro")}' },
      { old: '"Pružiti točne i ažurne podatke prilikom registracije"', new: '{t("pages.terms.userResponsibilities.resp1")}' },
      { old: '"Ne dijeliti svoje korisničke podatke s trećim stranama"', new: '{t("pages.terms.userResponsibilities.resp2")}' },
      { old: '"Ne koristiti web stranicu u nezakonite svrhe"', new: '{t("pages.terms.userResponsibilities.resp3")}' },
      { old: '"Ne ometati rad web stranice ili servera"', new: '{t("pages.terms.userResponsibilities.resp4")}' },
      { old: '"Poštivati prava intelektualnog vlasništva"', new: '{t("pages.terms.userResponsibilities.resp5")}' },
      { old: '"4. Intelektualno vlasništvo"', new: '{t("pages.terms.intellectualProperty.title")}' },
      { old: '"Sav sadržaj na ovoj web stranici, uključujući tekst, slike, logotipe i dizajn, vlasništvo je HNJD-a Split ili je korišten uz dopuštenje vlasnika. Zabranjeno je kopiranje, distribucija ili reprodukcija sadržaja bez pisane dozvole."', new: '{t("pages.terms.intellectualProperty.text")}' },
      { old: '"5. Privatnost"', new: '{t("pages.terms.privacy.title")}' },
      { old: '"Korištenje osobnih podataka regulirano je našom Politikom privatnosti. Koristimo podatke isključivo za pružanje usluga i komunikaciju s članovima."', new: '{t("pages.terms.privacy.text")}' },
      { old: '"6. Ograničenje odgovornosti"', new: '{t("pages.terms.limitation.title")}' },
      { old: '"HNJD Split ne odgovara za bilo kakve izravne ili neizravne štete koje mogu proizaći iz korištenja ili nemogućnosti korištenja web stranice. Web stranica se pruža "kakva jest" bez ikakvih jamstava."', new: '{t("pages.terms.limitation.text")}' },
      { old: '"7. Izmjene uvjeta"', new: '{t("pages.terms.modifications.title")}' },
      { old: '"Zadržavamo pravo izmjene ovih uvjeta u bilo kojem trenutku. Izmjene će biti objavljene na ovoj stranici s datumom ažuriranja. Nastavkom korištenja web stranice nakon izmjena prihvaćate nove uvjete."', new: '{t("pages.terms.modifications.text")}' },
      { old: '"8. Raskid"', new: '{t("pages.terms.termination.title")}' },
      { old: '"Zadržavamo pravo uskratiti ili prekinuti pristup web stranici bilo kojem korisniku koji krši ove uvjete, bez prethodne najave."', new: '{t("pages.terms.termination.text")}' },
      { old: '"9. Mjerodavno pravo"', new: '{t("pages.terms.law.title")}' },
      { old: '"Ovi uvjeti regulirani su zakonima Republike Hrvatske. Svi sporovi rješavat će se pred nadležnim sudovima u Splitu."', new: '{t("pages.terms.law.text")}' },
      { old: '"Za sva pitanja u vezi uvjeta korištenja kontaktirajte nas na hnjd.split@gmail.com"', new: '{t("pages.terms.contact.text")}' },
      { old: '"Zadnje ažurirano"', new: '{t("pages.terms.lastUpdated")}' },
    ]
  },
  {
    filePath: 'app/privatnost/page.tsx',
    pageName: 'privacy',
    needsImport: true,
    replacements: [
      { old: '"Politika privatnosti"', new: '{t("pages.privacy.title")}' },
      { old: '"Kako prikupljamo, koristimo i štitimo vaše osobne podatke"', new: '{t("pages.privacy.subtitle")}' },
      { old: '"1. Uvod"', new: '{t("pages.privacy.intro.title")}' },
      { old: '"HNJD Split posvećen je zaštiti privatnosti naših korisnika. Ova politika objašnjava kako prikupljamo, koristimo i štitimo vaše osobne podatke u skladu s Općom uredbom o zaštiti podataka (GDPR)."', new: '{t("pages.privacy.intro.text")}' },
      { old: '"2. Prikupljanje podataka"', new: '{t("pages.privacy.dataCollection.title")}' },
      { old: '"Prikupljamo sljedeće vrste podataka:"', new: '{t("pages.privacy.dataCollection.intro")}' },
      { old: '"Osobni podaci: ime, prezime, email, telefonski broj"', new: '{t("pages.privacy.dataCollection.personal")}' },
      { old: '"Tehnički podaci: IP adresa, tip preglednika, uređaj"', new: '{t("pages.privacy.dataCollection.technical")}' },
      { old: '"Podaci o korištenju: stranice koje posjetite, vrijeme provedeno"', new: '{t("pages.privacy.dataCollection.usage")}' },
      { old: '"Kolačići: za poboljšanje korisničkog iskustva"', new: '{t("pages.privacy.dataCollection.cookies")}' },
      { old: '"3. Uporaba podataka"', new: '{t("pages.privacy.dataUsage.title")}' },
      { old: '"Vaše podatke koristimo za:"', new: '{t("pages.privacy.dataUsage.intro")}' },
      { old: '"Pružanje usluga i obrada prijava"', new: '{t("pages.privacy.dataUsage.use1")}' },
      { old: '"Komunikacija o aktivnostima i događajima"', new: '{t("pages.privacy.dataUsage.use2")}' },
      { old: '"Slanje newsletter-a (uz vašu privolu)"', new: '{t("pages.privacy.dataUsage.use3")}' },
      { old: '"Poboljšanje web stranice i korisničkog iskustva"', new: '{t("pages.privacy.dataUsage.use4")}' },
      { old: '"Ispunjavanje zakonskih obveza"', new: '{t("pages.privacy.dataUsage.use5")}' },
      { old: '"4. Dijeljenje podataka"', new: '{t("pages.privacy.dataSharing.title")}' },
      { old: '"Ne prodajemo niti izdajemo vaše osobne podatke trećim stranama. Podatke možemo dijeliti samo s pouzdanim partnerima koji nam pomažu u radu (npr. hosting, email usluge), uz obvezujuće ugovore o zaštiti podataka."', new: '{t("pages.privacy.dataSharing.text")}' },
      { old: '"5. Sigurnost podataka"', new: '{t("pages.privacy.dataSecurity.title")}' },
      { old: '"Koristimo suvremene sigurnosne mjere za zaštitu vaših podataka, uključujući SSL enkripciju, sigurne servere i redovite sigurnosne provjere. Pristup podacima imaju samo ovlaštene osobe."', new: '{t("pages.privacy.dataSecurity.text")}' },
      { old: '"6. Kolačići"', new: '{t("pages.privacy.cookies.title")}' },
      { old: '"Koristimo kolačiće za:"', new: '{t("pages.privacy.cookies.intro")}' },
      { old: '"Nužni kolačići: za osnovno funkcioniranje stranice"', new: '{t("pages.privacy.cookies.essential")}' },
      { old: '"Analitički kolačići: za razumijevanje kako korisnici koriste stranicu"', new: '{t("pages.privacy.cookies.analytics")}' },
      { old: '"Kolačići preferencija: za spremanje vaših postavki (npr. jezik)"', new: '{t("pages.privacy.cookies.preferences")}' },
      { old: '"Možete upravljati kolačićima u postavkama vašeg preglednika."', new: '{t("pages.privacy.cookies.manage")}' },
      { old: '"7. Vaša prava"', new: '{t("pages.privacy.rights.title")}' },
      { old: '"Prema GDPR-u imate pravo:"', new: '{t("pages.privacy.rights.intro")}' },
      { old: '"Pravo na pristup - saznati koje podatke imamo o vama"', new: '{t("pages.privacy.rights.access")}' },
      { old: '"Pravo na ispravak - ispraviti netočne podatke"', new: '{t("pages.privacy.rights.rectification")}' },
      { old: '"Pravo na brisanje - zatražiti brisanje vaših podataka"', new: '{t("pages.privacy.rights.erasure")}' },
      { old: '"Pravo na ograničenje obrade - ograničiti kako koristimo podatke"', new: '{t("pages.privacy.rights.restriction")}' },
      { old: '"Pravo na prenosivost - dobiti podatke u strojno čitljivom formatu"', new: '{t("pages.privacy.rights.portability")}' },
      { old: '"Pravo na prigovor - uložiti prigovor na obradu podataka"', new: '{t("pages.privacy.rights.objection")}' },
      { old: '"8. Čuvanje podataka"', new: '{t("pages.privacy.retention.title")}' },
      { old: '"Vaše podatke čuvamo samo onoliko dugo koliko je potrebno za pružanje usluga ili ispunjavanje zakonskih obveza. Nakon toga se podaci sigurno brišu ili anonimiziraju."', new: '{t("pages.privacy.retention.text")}' },
      { old: '"9. Izmjene politike"', new: '{t("pages.privacy.changes.title")}' },
      { old: '"Zadržavamo pravo izmjene ove politike privatnosti. Izmjene će biti objavljene na ovoj stranici s datumom ažuriranja. Preporučujemo redovitu provjeru ove stranice."', new: '{t("pages.privacy.changes.text")}' },
      { old: '"Za sva pitanja u vezi privatnosti ili ostvarivanja vaših prava kontaktirajte nas na hnjd.split@gmail.com"', new: '{t("pages.privacy.contact.text")}' },
      { old: '"Zadnje ažurirano"', new: '{t("pages.privacy.lastUpdated")}' },
    ]
  }
];

/**
 * Check if file needs import statement
 */
function needsI18nImport(content: string): boolean {
  return !content.includes("import { useI18n }") && !content.includes("from '@/app/context/I18nContext'");
}

/**
 * Add import statement at the top of the file
 */
function addI18nImport(content: string): string {
  // Find the position after 'use client' directive if it exists
  const useClientMatch = content.match(/['"]use client['"]\s*;?\s*\n/);
  
  const importStatement = "import { useI18n } from '@/app/context/I18nContext';\n";
  
  if (useClientMatch) {
    const insertPos = useClientMatch.index! + useClientMatch[0].length;
    return content.slice(0, insertPos) + importStatement + content.slice(insertPos);
  }
  
  // Otherwise, add at the very top
  return importStatement + content;
}

/**
 * Check if component already has useI18n() hook
 */
function hasUseI18nHook(content: string): boolean {
  return /const\s+{\s*t\s*}\s*=\s*useI18n\(\)/.test(content);
}

/**
 * Add useI18n() hook to component
 */
function addUseI18nHook(content: string): string {
  // Find the component function declaration
  const functionMatch = content.match(/export default function \w+\([^)]*\)\s*{/);
  
  if (!functionMatch) {
    console.error('Could not find component function declaration');
    return content;
  }
  
  const insertPos = functionMatch.index! + functionMatch[0].length;
  const hookStatement = "\n  const { t } = useI18n();\n";
  
  return content.slice(0, insertPos) + hookStatement + content.slice(insertPos);
}

/**
 * Apply replacements to file content
 */
function applyReplacements(content: string, replacements: Replacement[]): string {
  let updated = content;
  let replacedCount = 0;
  
  for (const { old: oldText, new: newText } of replacements) {
    if (updated.includes(oldText)) {
      updated = updated.replace(oldText, newText);
      replacedCount++;
    }
  }
  
  console.log(`  ✓ Replaced ${replacedCount} / ${replacements.length} strings`);
  
  if (replacedCount < replacements.length) {
    console.log(`  ⚠ Warning: ${replacements.length - replacedCount} strings not found`);
  }
  
  return updated;
}

/**
 * Update a single component file
 */
function updateComponent(config: ComponentUpdate) {
  const filePath = path.join(process.cwd(), config.filePath);
  
  console.log(`\n📄 Updating ${config.pageName} (${config.filePath})...`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Add import if needed
  if (config.needsImport && needsI18nImport(content)) {
    console.log('  + Adding import statement');
    content = addI18nImport(content);
  }
  
  // Add useI18n hook if needed
  if (!hasUseI18nHook(content)) {
    console.log('  + Adding useI18n() hook');
    content = addUseI18nHook(content);
  }
  
  // Apply replacements
  content = applyReplacements(content, config.replacements);
  
  // Write updated file
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ File updated successfully`);
  
  return true;
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Starting component update process...\n');
  console.log('This script will:');
  console.log('  1. Add import statements');
  console.log('  2. Add useI18n() hooks');
  console.log('  3. Replace hardcoded text with t() calls\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const config of COMPONENT_UPDATES) {
    const success = updateComponent(config);
    if (success) successCount++;
    else failCount++;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Component update complete!\n');
  console.log(`Summary:`);
  console.log(`  ✓ Successfully updated: ${successCount} files`);
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} files`);
  }
  console.log('\n📋 Next steps:');
  console.log('  1. Review the updated files');
  console.log('  2. Test each page in both languages');
  console.log('  3. Check for any missed hardcoded strings');
  console.log('  4. Commit your changes\n');
}

// Run the script
main();
