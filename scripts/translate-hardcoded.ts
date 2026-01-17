/**
 * Hardcoded Croatian String Extraction & Translation
 * 
 * This script:
 * 1. Scans all component files for hardcoded Croatian strings
 * 2. Translates them using DeepL
 * 3. Adds them to locale files with generated keys
 * 4. Generates a report of replacements needed
 * 
 * Usage: npm run translate:hardcoded
 */

import * as dotenv from 'dotenv';
import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';
const translator = new deepl.Translator(DEEPL_API_KEY);

const HR_LOCALE_PATH = path.join(process.cwd(), 'locales/hr.json');
const DE_LOCALE_PATH = path.join(process.cwd(), 'locales/de.json');

interface HardcodedString {
  text: string;
  file: string;
  lineNumber: number;
  context: string;
}

interface DeepValue {
  [key: string]: string | DeepValue;
}

let totalTranslated = 0;

/**
 * Translate text using DeepL
 */
async function translateText(text: string): Promise<string> {
  try {
    const result = await translator.translateText(text, 'hr', 'de');
    return result.text;
  } catch (error) {
    console.error(`  ❌ Failed to translate: ${text.substring(0, 50)}`);
    return text;
  }
}

/**
 * Detect Croatian strings in text
 */
function isCroatianString(text: string): boolean {
  // Skip if too short
  if (text.length < 5) return false;

  // Skip URLs, paths, and code-like strings
  if (
    text.includes('://') ||
    text.includes('://') ||
    text.startsWith('.') ||
    text.startsWith('-') ||
    text.includes('::') ||
    text.includes('${') ||
    text.includes('...') ||
    text.includes('[') ||
    text.includes(']')
  ) {
    return false;
  }

  // Skip if it's mostly numbers or special characters
  const alphaCount = (text.match(/[a-zA-ZšđžčćŠĐŽČĆ]/g) || []).length;
  if (alphaCount < text.length * 0.6) return false;

  // Skip if it contains too many spaces (likely code)
  const spaceCount = (text.match(/ /g) || []).length;
  if (spaceCount > 15) return false;

  // Check for Croatian characters (š, đ, ž, č, ć)
  const hasCroatianChars = /[šđžčćŠĐŽČĆ]/.test(text);

  // Skip if contains className patterns or HTML
  if (text.includes('class') || text.includes('grid') || text.includes('flex') || text.includes('text-')) {
    return false;
  }

  return hasCroatianChars;
}

/**
 * Extract hardcoded strings from files
 */
function extractHardcodedStrings(): HardcodedString[] {
  const files = globSync('app/**/*.{tsx,ts,jsx,js}', {
    ignore: ['node_modules/**', '.next/**', 'dist/**', '**/*.test.*', '**/*.spec.*'],
  });

  const strings: HardcodedString[] = [];
  const seen = new Set<string>();

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      // Match quoted strings in JSX/code
      const stringPattern = /["'`]([^"'`]{5,300})["'`]/g;

      lines.forEach((line, lineNum) => {
        let match;
        while ((match = stringPattern.exec(line)) !== null) {
          const text = match[1].trim();

          // Skip if already seen or doesn't look Croatian
          if (seen.has(text) || !isCroatianString(text)) {
            continue;
          }

          seen.add(text);
          strings.push({
            text,
            file,
            lineNumber: lineNum + 1,
            context: line.trim().substring(0, 80),
          });
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  });

  return strings;
}

/**
 * Generate a valid key from text
 */
function generateKey(text: string, index: number): string {
  // Create a slug from the text
  let key = text
    .toLowerCase()
    .replace(/[^a-zšđžčć0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '.')
    .substring(0, 40);

  // Ensure it's unique
  return `hardcoded.${key}.${index}`;
}

/**
 * Add translations to locale files
 */
function addToLocales(
  hrLocale: DeepValue,
  deLocale: DeepValue,
  key: string,
  hrText: string,
  deText: string
): void {
  const parts = key.split('.');

  // Add to Croatian locale
  let hrCurrent: any = hrLocale;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!hrCurrent[parts[i]]) {
      hrCurrent[parts[i]] = {};
    }
    hrCurrent = hrCurrent[parts[i]];
  }
  hrCurrent[parts[parts.length - 1]] = hrText;

  // Add to German locale
  let deCurrent: any = deLocale;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!deCurrent[parts[i]]) {
      deCurrent[parts[i]] = {};
    }
    deCurrent = deCurrent[parts[i]];
  }
  deCurrent[parts[parts.length - 1]] = deText;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('\n🔍 Extracting hardcoded Croatian strings...\n');

    // Check API
    try {
      const usage = await translator.getUsage();
      console.log(`✓ DeepL API connected`);
      console.log(`  Character usage: ${usage.character?.count || 0} / ${usage.character?.limit || 500000}\n`);
    } catch (error) {
      console.error('❌ Failed to connect to DeepL API');
      process.exit(1);
    }

    // Extract hardcoded strings
    const hardcodedStrings = extractHardcodedStrings();
    console.log(`📊 Found ${hardcodedStrings.length} hardcoded Croatian strings\n`);

    if (hardcodedStrings.length === 0) {
      console.log('✅ No hardcoded Croatian strings found!');
      return;
    }

    // Load locales
    const hrLocale = JSON.parse(fs.readFileSync(HR_LOCALE_PATH, 'utf-8'));
    const deLocale = JSON.parse(fs.readFileSync(DE_LOCALE_PATH, 'utf-8'));

    // Translate and add to locales
    console.log('🔄 Translating strings using DeepL...\n');

    for (let i = 0; i < Math.min(hardcodedStrings.length, 100); i++) {
      const str = hardcodedStrings[i];
      const key = generateKey(str.text, i);

      console.log(`  [${i + 1}/${Math.min(hardcodedStrings.length, 100)}] ${str.text.substring(0, 50)}...`);

      const deText = await translateText(str.text);
      addToLocales(hrLocale, deLocale, key, str.text, deText);
      totalTranslated++;

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Save updated locales
    console.log('\n💾 Updating locale files...');
    fs.writeFileSync(HR_LOCALE_PATH, JSON.stringify(hrLocale, null, 2));
    fs.writeFileSync(DE_LOCALE_PATH, JSON.stringify(deLocale, null, 2));
    console.log('✓ Locales updated\n');

    // Generate replacement report
    console.log('📋 Replacement Report:\n');
    console.log('Use these keys to replace hardcoded strings:\n');
    hardcodedStrings.slice(0, Math.min(20, totalTranslated)).forEach((str, idx) => {
      const key = generateKey(str.text, idx);
      console.log(`File: ${str.file}:${str.lineNumber}`);
      console.log(`  Old: "${str.text}"`);
      console.log(`  New: {t('${key}')}`);
      console.log(`  Key: "${key}"\n`);
    });

    if (hardcodedStrings.length > 20) {
      console.log(`... and ${hardcodedStrings.length - 20} more strings\n`);
    }

    console.log('✅ Complete!\n');
    console.log('Summary:');
    console.log(`  Strings translated: ${totalTranslated}`);
    console.log(`  Files updated: locales/hr.json, locales/de.json`);
    console.log(`\n📝 Next: Manually update components to use translation keys`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
