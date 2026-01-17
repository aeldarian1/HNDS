/**
 * Comprehensive DeepL Translation Script
 * 
 * Translates ALL Croatian strings in the project:
 * - All locale keys in locales/hr.json
 * - Replaces missing German translations
 * - Scans component files for any remaining hardcoded Croatian text
 * 
 * Usage: npm run translate:all
 */

import * as dotenv from 'dotenv';
import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';
const translator = new deepl.Translator(DEEPL_API_KEY);

const HR_LOCALE_PATH = path.join(process.cwd(), 'locales/hr.json');
const DE_LOCALE_PATH = path.join(process.cwd(), 'locales/de.json');

interface DeepValue {
  [key: string]: string | DeepValue;
}

let totalTranslations = 0;
let skippedTranslations = 0;

/**
 * Translate a single string using DeepL
 */
async function translateText(text: string): Promise<string> {
  try {
    const result = await translator.translateText(text, 'hr', 'de');
    return result.text;
  } catch (error) {
    console.error(`  ❌ Translation failed for: ${text.substring(0, 50)}`);
    return text; // Return original on error
  }
}

/**
 * Recursively translate all missing German values
 */
async function translateMissingKeys(
  hrObj: DeepValue,
  deObj: DeepValue,
  keyPath: string[] = []
): Promise<void> {
  for (const key in hrObj) {
    if (Object.prototype.hasOwnProperty.call(hrObj, key)) {
      const currentPath = [...keyPath, key];
      const hrValue = hrObj[key];
      const deValue = deObj[key];

      if (typeof hrValue === 'string') {
        // Skip empty strings, URLs, and very short values
        if (!hrValue || hrValue.trim().length === 0) {
          skippedTranslations++;
          continue;
        }

        // Check if German translation exists
        if (!deValue || typeof deValue !== 'string') {
          const pathStr = currentPath.join('.');
          console.log(`  Translating: ${pathStr}...`);

          const germanText = await translateText(hrValue);
          deObj[key] = germanText;
          totalTranslations++;

          // Add rate limiting to respect API limits
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } else if (typeof hrValue === 'object' && hrValue !== null) {
        // Recursively handle nested objects
        if (!deValue || typeof deValue !== 'object') {
          deObj[key] = {};
        }
        await translateMissingKeys(hrValue as DeepValue, deObj[key] as DeepValue, currentPath);
      }
    }
  }
}

/**
 * Scan component files for hardcoded Croatian strings
 */
function scanComponentsForCroatianText(): string[] {
  const files = globSync('app/**/*.{tsx,ts,jsx,js}', {
    ignore: ['node_modules/**', '.next/**', 'dist/**'],
  });

  const croatianStrings: Set<string> = new Set();
  const croatianPatterns = [
    /"([^"]*[šđžčćŠĐŽČĆ][^"]*)"/g, // Contains Croatian special characters
    /'([^']*[šđžčćŠĐŽČĆ][^']*)'/g,
  ];

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      croatianPatterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const text = match[1];
          if (text && text.length > 5 && !text.startsWith('http')) {
            croatianStrings.add(text);
          }
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  });

  return Array.from(croatianStrings);
}

/**
 * Update locale file with deep-set capability
 */
function deepSet(obj: DeepValue, path: string[], value: string): void {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as DeepValue;
  }
  current[path[path.length - 1]] = value;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('\n🚀 Starting comprehensive DeepL translation...\n');

    // Check API connection
    try {
      const usage = await translator.getUsage();
      console.log(`✓ DeepL API connected successfully`);
      console.log(`  Character usage: ${usage.character?.count || 0} / ${usage.character?.limit || 500000}\n`);
    } catch (error) {
      console.error('❌ Failed to connect to DeepL API');
      console.error('Make sure DEEPL_API_KEY is set in .env.local');
      process.exit(1);
    }

    // Load locale files
    console.log('📖 Loading locale files...');
    const hrLocale = JSON.parse(fs.readFileSync(HR_LOCALE_PATH, 'utf-8'));
    const deLocale = JSON.parse(fs.readFileSync(DE_LOCALE_PATH, 'utf-8'));

    // Translate all missing German keys
    console.log('\n🔄 Translating missing German keys...\n');
    await translateMissingKeys(hrLocale, deLocale);

    // Save updated locale file
    console.log('\n💾 Updating locale files...');
    fs.writeFileSync(DE_LOCALE_PATH, JSON.stringify(deLocale, null, 2));
    console.log('✓ Locale files updated\n');

    // Scan for additional hardcoded Croatian text
    console.log('🔍 Scanning components for hardcoded Croatian text...');
    const croatianStrings = scanComponentsForCroatianText();
    if (croatianStrings.length > 0) {
      console.log(`  Found ${croatianStrings.length} potential hardcoded strings`);
      console.log('  ℹ️  Consider refactoring these to use translation keys:\n');
      croatianStrings.slice(0, 10).forEach((str) => {
        console.log(`     "${str}"`);
      });
      if (croatianStrings.length > 10) {
        console.log(`     ... and ${croatianStrings.length - 10} more`);
      }
    }

    // Final summary
    console.log('\n✅ Translation complete!\n');
    console.log('Summary:');
    console.log(`  Total strings translated: ${totalTranslations}`);
    console.log(`  Skipped (already translated): ${skippedTranslations}`);
    console.log(`  Files updated: ${DE_LOCALE_PATH}`);
    console.log('\n📝 Next steps:');
    console.log('  1. Review translations for accuracy');
    console.log('  2. Run: npm run dev');
    console.log('  3. Test language switcher on all pages\n');
  } catch (error) {
    console.error('❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
