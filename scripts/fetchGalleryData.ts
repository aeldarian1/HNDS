// @ts-nocheck
/**
 * Fetch gallery posts from WordPress (category 20 = Fotogalerija)
 * and download featured images
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  slug: string;
  link: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      media_details: {
        sizes: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
  };
}

interface GalleryImage {
  id: number;
  url: string;
  thumbnail: string;
  ext: string;
  type: 'image' | 'video';
  mimeType?: string;
}

interface GalleryItem {
  id: number;
  title: string;
  date: string;
  slug: string;
  description: string;
  formattedDate: string;
  link: string;
  year: number;
  imageUrl?: string;
  localImage?: string;
  images: GalleryImage[];
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response: any) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err: any) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function fetchGalleryImages(postId: number, content: string): Promise<GalleryImage[]> {
  // Try to extract gallery_ids - handle both decoded and encoded HTML
  let galleryIdsMatch = content.match(/gallery_ids=&#8221;([^&]+)&#8221;/);
  
  if (!galleryIdsMatch) {
    // Try with decoded quotes
    const decodedContent = content
      .replace(/&#8221;/g, '"')
      .replace(/&#8243;/g, '"')
      .replace(/&#8220;/g, '"')
      .replace(/&quot;/g, '"')
      .replace(/&#034;/g, '"');
    
    galleryIdsMatch = decodedContent.match(/gallery_ids="([^"]+)"/);
  }
  
  if (!galleryIdsMatch) {
    // Debug: check if gallery_ids exists at all
    if (content.includes('gallery_ids')) {
      console.log(`   DEBUG: gallery_ids found in content but regex didn't match`);
      const snippet = content.substring(content.indexOf('gallery_ids'), content.indexOf('gallery_ids') + 100);
      console.log(`   Snippet: ${snippet}`);
    }
    console.log(`   No gallery_ids found for post ${postId}`);
    return [];
  }

  const imageIds = galleryIdsMatch[1].split(',').map(id => id.trim());
  console.log(`   Found ${imageIds.length} media items in gallery`);

  const images: GalleryImage[] = [];

  for (const imageId of imageIds) {
    try {
      const response = await fetch(`https://hnds.hr/wp-json/wp/v2/media/${imageId}`);
      if (!response.ok) continue;

      const mediaData: any = await response.json();
      
      // Check if it's a video or image
      const mimeType = mediaData.mime_type as string;
      const isVideo = mimeType.startsWith('video/');
      
      // Get the highest quality available image (prefer full or large size)
      let fullUrl = mediaData.source_url as string;
      const sizes = mediaData.media_details?.sizes || {};
      
      // Priority: full > large > medium, prioritizing non-webp versions
      if (sizes.full?.source_url) {
        fullUrl = sizes.full.source_url;
      } else if (sizes.large?.source_url) {
        fullUrl = sizes.large.source_url;
      }
      
      const thumbnailUrl = (sizes.medium?.source_url || fullUrl) as string;

      // Download media file
      const mediaDir = path.join(__dirname, '..', 'public', 'images', 'gallery', postId.toString());
      if (!fs.existsSync(mediaDir)) {
        fs.mkdirSync(mediaDir, { recursive: true });
      }

      // Determine file extension from URL
      let fileExt = path.extname(fullUrl).split('?')[0];
      if (!fileExt) {
        fileExt = isVideo ? '.mp4' : '.jpg';
      }
      const filePath = path.join(mediaDir, `${imageId}${fileExt}`);
      await downloadImage(fullUrl, filePath);

      images.push({
        id: parseInt(imageId),
        url: fullUrl,
        thumbnail: thumbnailUrl,
        ext: fileExt,
        type: isVideo ? 'video' : 'image',
        mimeType: mimeType,
      });

      process.stdout.write('.');
    } catch (error) {
      console.error(`\n   Error fetching image ${imageId}:`, error);
    }
  }

  console.log(''); // New line after dots
  return images;
}
async function fetchGalleryPosts(): Promise<GalleryItem[]> {
  // First, get the list of posts
  const listResponse = await fetch('https://hnds.hr/wp-json/wp/v2/posts?categories=20&per_page=100&_embed');
  const posts = await listResponse.json() as WordPressPost[];
  
  const galleryDir = path.join(__dirname, '../public/images/gallery');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }
  
  const items: GalleryItem[] = [];
  let totalImages = 0;
  
  for (const post of posts) {
    const date = new Date(post.date);
    const year = date.getFullYear();
    
    const description = post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .trim()
      .substring(0, 150) + '...';
    
    let localImage: string | undefined;
    let imageUrl: string | undefined;
    
    // Get featured image if available
    if (post._embedded?.['wp:featuredmedia']?.[0]) {
      const media = post._embedded['wp:featuredmedia'][0];
      // Prefer full-size for gallery covers
      const sizes = media.media_details?.sizes || {};
      if (sizes.full?.source_url) {
        imageUrl = sizes.full.source_url;
      } else if (sizes.large?.source_url) {
        imageUrl = sizes.large.source_url;
      } else {
        imageUrl = media.source_url;
      }
      
      if (imageUrl) {
        const ext = path.extname(imageUrl).split('?')[0] || '.jpg';
        const filename = `${post.id}${ext}`;
        const filepath = path.join(galleryDir, filename);
        
        try {
          await downloadImage(imageUrl, filepath);
          localImage = `/images/gallery/${filename}`;
          console.log(`✓ Downloaded featured image for: ${post.title.rendered}`);
        } catch (error) {
          console.error(`✗ Failed to download featured image for ${post.title.rendered}:`, error);
        }
      }
    }
    
    // Fetch all gallery images
    console.log(`📸 Fetching gallery images for: ${post.title.rendered} (ID: ${post.id})`);
    
    // Fetch individual post to get raw content with shortcodes
    const postResponse = await fetch(`https://hnds.hr/wp-json/wp/v2/posts/${post.id}`);
    const fullPost = await postResponse.json() as WordPressPost;
    
    const contentLength = fullPost.content?.rendered?.length || 0;
    const hasGalleryIds = fullPost.content?.rendered?.includes('gallery_ids') || false;
    if (contentLength === 0) {
      console.log(`   WARNING: Post ${post.id} has no content!`);
    }
    const galleryImages = await fetchGalleryImages(post.id, fullPost.content.rendered);
    totalImages += galleryImages.length;
    
    items.push({
      id: post.id,
      title: post.title.rendered
        .replace(/&#8211;/g, '–')
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&amp;/g, '&'),
      date: post.date,
      slug: post.slug,
      description,
      formattedDate: date.toLocaleDateString('hr-HR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      link: post.link,
      year,
      imageUrl,
      localImage,
      images: galleryImages
    });
  }
  
  console.log(`\n🖼️  Total gallery images downloaded: ${totalImages}`);
  
  return items;
}

async function main() {
  console.log('🖼️  Fetching gallery posts from WordPress...\n');
  
  try {
    const gallery = await fetchGalleryPosts();
    
    console.log(`\n✅ Fetched ${gallery.length} gallery items\n`);
    
    const withImages = gallery.filter(g => g.localImage).length;
    console.log(`📸 Downloaded ${withImages}/${gallery.length} images\n`);
    
    // Show first few items
    gallery.slice(0, 5).forEach((item, i) => {
      console.log(`${i + 1}. ${item.title} (${item.year}) ${item.localImage ? '✓' : '✗'}`);
    });
    
    // Save to file
    const outputPath = path.join(__dirname, '../data/gallery.json');
    fs.writeFileSync(outputPath, JSON.stringify(gallery, null, 2));
    
    console.log(`\n📝 Saved gallery data to data/gallery.json`);
    
  } catch (error) {
    console.error('❌ Error fetching gallery:', error);
    process.exit(1);
  }
}

main();

export {};
