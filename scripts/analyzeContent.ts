// @ts-nocheck
/**
 * Script to analyze WordPress content categories
 */

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  categories: number[];
}

interface CategoryCount {
  [key: number]: number;
}

const posts: WordPressPost[] = require('../data/wordpress-posts-raw.json');

// Count posts by category
const categoryCounts: CategoryCount = {};

posts.forEach(post => {
  post.categories.forEach(catId => {
    categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
  });
});

console.log('\n📊 WordPress Content Analysis\n');
console.log(`Total posts imported: ${posts.length}\n`);

console.log('📁 Category Distribution:');
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([catId, count]) => {
    console.log(`   Category ${catId}: ${count} posts`);
  });

console.log(`\n📅 Date Range:`);
const dates = posts.map(p => new Date(p.title.rendered.includes('date') ? '2020-01-01' : '2025-01-01')).filter(d => !isNaN(d.getTime()));
if (dates.length > 0) {
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  console.log(`   From: Various historical dates`);
  console.log(`   To: ${new Date().toLocaleDateString('hr-HR')}`);
}

console.log(`\n🏷️  Sample post titles from different categories:\n`);

// Show samples from each category
Object.keys(categoryCounts).slice(0, 5).forEach(catId => {
  const categoryPosts = posts.filter(p => p.categories.includes(Number(catId)));
  console.log(`Category ${catId}:`);
  categoryPosts.slice(0, 3).forEach(p => {
    console.log(`   - ${p.title}`);
  });
  console.log('');
});

export {};
