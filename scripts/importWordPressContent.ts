/**
 * Script to import content from WordPress API to new Next.js site
 * Run with: npx ts-node scripts/importWordPressContent.ts
 */

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  featured_media?: number;
  link: string;
}

interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  link: string;
}

interface TransformedEvent {
  title: string;
  date: string;
  description: string;
  slug: string;
  originalUrl: string;
}

// Fetch data from WordPress API
async function fetchWordPressContent() {
  const baseUrl = 'https://hnds.hr/wp-json/wp/v2';
  
  try {
    // Fetch all posts (100 per page, multiple pages if needed)
    let allPosts: WordPressPost[] = [];
    let page = 1;
    let hasMore = true;
    
    console.log('Fetching posts from WordPress...');
    while (hasMore && page <= 10) { // Limit to 10 pages (1000 posts max) for safety
      const postsResponse = await fetch(`${baseUrl}/posts?per_page=100&page=${page}`);
      
      if (!postsResponse.ok) {
        if (postsResponse.status === 400) {
          // No more pages
          hasMore = false;
          break;
        }
        throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
      }
      
      const posts: WordPressPost[] = await postsResponse.json();
      
      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts = [...allPosts, ...posts];
        console.log(`  Page ${page}: ${posts.length} posts`);
        page++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Fetch all pages
    const pagesResponse = await fetch(`${baseUrl}/pages?per_page=100`);
    const pages: WordPressPage[] = await pagesResponse.json();
    
    return { posts: allPosts, pages };
  } catch (error) {
    console.error('Error fetching WordPress content:', error);
    return { posts: [], pages: [] };
  }
}

// Clean HTML content to plain text
function cleanHtmlContent(html: string): string {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, ' ');
  
  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  
  // Remove multiple spaces and trim
  text = text.replace(/\s+/g, ' ').trim();
  
  // Limit length
  return text.substring(0, 300) + (text.length > 300 ? '...' : '');
}

// Transform posts into events
function transformPostsToEvents(posts: WordPressPost[]): TransformedEvent[] {
  return posts.map(post => ({
    title: post.title.rendered.replace(/&#8211;/g, '–').replace(/&amp;/g, '&'),
    date: new Date(post.date).toLocaleDateString('hr-HR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    description: cleanHtmlContent(post.excerpt.rendered || post.content.rendered),
    slug: post.slug,
    originalUrl: post.link
  }));
}

// Main execution
async function main() {
  console.log('🚀 Fetching content from WordPress...\n');
  
  const { posts, pages } = await fetchWordPressContent();
  
  console.log(`✅ Fetched ${posts.length} posts`);
  console.log(`✅ Fetched ${pages.length} pages\n`);
  
  // Transform posts to events
  const events = transformPostsToEvents(posts);
  
  // Display sample of transformed content
  console.log('📋 Sample of transformed events:\n');
  events.slice(0, 5).forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
    console.log(`   Date: ${event.date}`);
    console.log(`   Description: ${event.description.substring(0, 100)}...`);
    console.log(`   Original URL: ${event.originalUrl}\n`);
  });
  
  // Output JSON for integration
  const fs = require('fs');
  const path = require('path');
  
  const outputDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save events data
  fs.writeFileSync(
    path.join(outputDir, 'wordpress-events.json'),
    JSON.stringify(events, null, 2)
  );
  
  // Save raw posts for reference
  fs.writeFileSync(
    path.join(outputDir, 'wordpress-posts-raw.json'),
    JSON.stringify(posts.map(p => ({
      id: p.id,
      title: p.title.rendered,
      date: p.date,
      slug: p.slug,
      link: p.link,
      categories: p.categories
    })), null, 2)
  );
  
  // Save pages info
  fs.writeFileSync(
    path.join(outputDir, 'wordpress-pages.json'),
    JSON.stringify(pages.map(p => ({
      id: p.id,
      title: p.title.rendered,
      slug: p.slug,
      link: p.link
    })), null, 2)
  );
  
  console.log('\n✅ Data exported to:');
  console.log(`   - data/wordpress-events.json (${events.length} events)`);
  console.log(`   - data/wordpress-posts-raw.json (${posts.length} posts)`);
  console.log(`   - data/wordpress-pages.json (${pages.length} pages)`);
  
  console.log('\n🎯 Next steps:');
  console.log('   1. Review the exported JSON files');
  console.log('   2. Update app/events/page.tsx to use wordpress-events.json');
  console.log('   3. Consider creating individual event detail pages');
}

main();
