#!/usr/bin/env node

/**
 * Sync translations from Lokalise
 * Downloads JSON translations from Lokalise project and saves to locales/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const unzipper = require('unzipper');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');

// Load .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const token = process.env.LOKALISE_TOKEN;
const projectId = process.env.LOKALISE_PROJECT_ID;

if (!token || !projectId) {
  console.error('Error: LOKALISE_TOKEN and LOKALISE_PROJECT_ID must be set in .env.local');
  process.exit(1);
}

const localesDir = path.join(__dirname, '..', 'locales');
const tmpDir = path.join(__dirname, '..', '.tmp-lokalise');

// Ensure locales directory exists
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
}

// Ensure temp directory exists
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// Language mappings (Lokalise lang code -> file name)
const languages = {
  'hr': 'hr.json',
  'de': 'de.json',
};

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadFile(response.headers.location).then(resolve).catch(reject);
      } else if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      } else {
        resolve(response);
      }
    }).on('error', reject);
  });
}

async function fetchBundleUrl(langCode) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      format: 'json',
      lang_ids: [langCode],
      original_filenames: true,
      directory_prefix: '',
      include_comments: false,
      convert_emoji: 'none',
    });

    const options = {
      hostname: 'api.lokalise.com',
      port: 443,
      path: `/api2/projects/${projectId}/files/download`,
      method: 'POST',
      headers: {
        'X-Api-Token': token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.bundle_url) {
            resolve(response.bundle_url);
          } else if (response.error) {
            reject(new Error(`Lokalise API error: ${response.error.message}`));
          } else {
            reject(new Error(`No bundle_url in response: ${JSON.stringify(response)}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse Lokalise response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function extractJsonFromZip(zipStream, langCode) {
  return new Promise((resolve, reject) => {
    const files = {};

    zipStream
      .pipe(unzipper.Parse())
      .on('entry', (entry) => {
        const fileName = entry.path;
        
        if (fileName.endsWith('.json') && !fileName.includes('/')) {
          let content = '';
          entry.on('data', (chunk) => {
            content += chunk;
          });
          entry.on('end', () => {
            try {
              files[fileName] = JSON.parse(content);
            } catch (e) {
              console.error(`Failed to parse ${fileName}: ${e.message}`);
            }
          });
        } else {
          entry.autodrain();
        }
      })
      .on('error', reject)
      .on('close', () => {
        resolve(files);
      });
  });
}

async function syncTranslations() {
  console.log(`\n📦 Syncing translations from Lokalise (Project: ${projectId.substring(0, 20)}...)\n`);

  try {
    for (const [langCode, fileName] of Object.entries(languages)) {
      try {
        console.log(`📥 Downloading ${langCode.toUpperCase()} translations...`);
        
        const bundleUrl = await fetchBundleUrl(langCode);
        const response = await downloadFile(bundleUrl);
        
        // Extract JSON from ZIP
        const files = await extractJsonFromZip(response, langCode);
        
        // Find the JSON file in the extracted files
        const jsonFile = Object.entries(files)[0];
        if (!jsonFile) {
          throw new Error('No JSON file found in bundle');
        }

        const [, jsonContent] = jsonFile;
        const filePath = path.join(localesDir, fileName);
        
        fs.writeFileSync(filePath, JSON.stringify(jsonContent, null, 2));
        console.log(`✅ Saved to locales/${fileName}\n`);
      } catch (error) {
        console.error(`❌ Failed to sync ${langCode}: ${error.message}\n`);
      }
    }

    // Cleanup temp directory
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }

    console.log('✨ Translation sync complete!');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

syncTranslations();
