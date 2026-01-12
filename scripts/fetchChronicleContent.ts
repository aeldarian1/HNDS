// @ts-nocheck
/**
 * Fetch full HTML content for all chronicles from WordPress API
 */

(async () => {
  const chronicles = require('../data/chronicles.json');
  const fs = require('fs');
  const path = require('path');

  interface Chronicle {
    id: number;
    title: string;
    date: string;
    slug: string;
    link: string;
    description: string;
    formattedDate: string;
    content?: string;
  }

  async function fetchFullContent(postId: number): Promise<string> {
    try {
      console.log(`Fetching content for post ID ${postId}...`);
      const response = await fetch(`https://hnds.hr/wp-json/wp/v2/posts/${postId}`);
      if (!response.ok) {
        console.error(`Failed to fetch post ${postId}: ${response.status}`);
        return '';
      }
      const data = await response.json();
      return data.content?.rendered || '';
    } catch (error) {
      console.error(`Error fetching content for post ${postId}:`, error);
      return '';
    }
  }

  async function fetchAllChronicleContent() {
    const chroniclesWithContent: Chronicle[] = [];

    console.log(`Fetching full content for ${chronicles.length} chronicles...\n`);

    for (let i = 0; i < chronicles.length; i++) {
      const chronicle = chronicles[i];
      console.log(`[${i + 1}/${chronicles.length}] ${chronicle.title}`);
      
      const fullContent = await fetchFullContent(chronicle.id);
      
      chroniclesWithContent.push({
        ...chronicle,
        content: fullContent
      });
      
      // Add delay to avoid rate limiting (500ms between requests)
      if (i < chronicles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Save updated chronicles with full content
    fs.writeFileSync(
      path.join(__dirname, '../data/chronicles.json'),
      JSON.stringify(chroniclesWithContent, null, 2)
    );

    console.log(`\n✅ Successfully fetched content for ${chroniclesWithContent.length} chronicles`);
    console.log(`📝 Updated data/chronicles.json with full HTML content`);
  }

  await fetchAllChronicleContent();
})();

export {};
