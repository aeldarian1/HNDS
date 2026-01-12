/**
 * Extract PDF URLs from chronicle HTML content
 */

const chronicles = require('../data/chronicles.json');
const fs = require('fs');
const path = require('path');

interface Chronicle {
  id: number;
  title: string;
  date: string;
  slug: string;
  description: string;
  formattedDate: string;
  content?: string;
  pdfUrl?: string;
}

function extractPdfUrl(htmlContent: string): string | null {
  // Look for PDF URL in data-src attribute
  const match = htmlContent.match(/data-src="[^"]*url=([^"&]+)/);
  if (match && match[1]) {
    // Decode URL-encoded string
    const decoded = decodeURIComponent(match[1]);
    return decoded;
  }
  return null;
}

const chroniclesWithPdfUrls: Chronicle[] = chronicles.map((chronicle: Chronicle) => {
  const pdfUrl = extractPdfUrl(chronicle.content || '');
  
  if (pdfUrl) {
    console.log(`✓ ${chronicle.title}`);
    console.log(`  PDF: ${pdfUrl}\n`);
  } else {
    console.log(`✗ ${chronicle.title} - No PDF found\n`);
  }
  
  return {
    ...chronicle,
    pdfUrl: pdfUrl || undefined
  };
});

// Save updated chronicles
fs.writeFileSync(
  path.join(__dirname, '../data/chronicles.json'),
  JSON.stringify(chroniclesWithPdfUrls, null, 2)
);

const pdfCount = chroniclesWithPdfUrls.filter(c => c.pdfUrl).length;
console.log(`\n✅ Extracted ${pdfCount}/${chronicles.length} PDF URLs`);
console.log(`📝 Updated data/chronicles.json with PDF URLs`);
