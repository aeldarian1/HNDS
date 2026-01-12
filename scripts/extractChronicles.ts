// @ts-nocheck
/**
 * Extract chronicles from WordPress content
 */

const posts = require('../data/wordpress-posts-raw.json');
const events = require('../data/wordpress-events.json');

// Category 135 is Chronicles
const CHRONICLE_CATEGORY = 135;

const chronicles = posts
  .filter((post: any) => post.categories.includes(CHRONICLE_CATEGORY))
  .map((post: any) => {
    // Find the full event data
    const eventData = events.find((e: any) => e.slug === post.slug);
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      slug: post.slug,
      link: post.link,
      description: eventData?.description || '',
      formattedDate: new Date(post.date).toLocaleDateString('hr-HR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  })
  .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

console.log(`Found ${chronicles.length} chronicles`);
console.log('\nSample chronicles:');
chronicles.slice(0, 5).forEach((c: any, i: number) => {
  console.log(`${i + 1}. ${c.title} (${c.formattedDate})`);
});

// Save to file
const fs = require('fs');
const path = require('path');

fs.writeFileSync(
  path.join(__dirname, '../data/chronicles.json'),
  JSON.stringify(chronicles, null, 2)
);

console.log(`\n✅ Saved ${chronicles.length} chronicles to data/chronicles.json`);

export {};
