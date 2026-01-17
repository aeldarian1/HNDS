import { createClient, type ClientConfig, type QueryParams } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity Configuration
const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
};

// Create the Sanity client
export const client = createClient(config);

// Create a preview client for draft content
export const previewClient = createClient({
  ...config,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
});

// Helper to get the correct client based on preview mode
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

// Image URL Builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function for image URLs with options
interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

export function getImageUrl(source: SanityImageSource, options: ImageOptions = {}): string {
  const { width, height, quality = 80, format = 'auto', fit = 'max' } = options;
  
  let imageBuilder = builder.image(source).fit(fit).auto('format');
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (quality) imageBuilder = imageBuilder.quality(quality);
  if (format !== 'auto') imageBuilder = imageBuilder.format(format);
  
  return imageBuilder.url();
}

// Type-safe query helper
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = [],
  preview = false,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  preview?: boolean;
}): Promise<T> {
  const selectedClient = getClient(preview);
  
  return selectedClient.fetch<T>(query, params, {
    // Cache configuration for Next.js
    next: {
      revalidate: preview ? 0 : 60, // Revalidate every 60 seconds in production
      tags,
    },
  });
}

// Common GROQ queries
export const queries = {
  // Get all posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->{name, image}
  }`,
  
  // Get single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->{name, image, bio}
  }`,
  
  // Get all events
  allEvents: `*[_type == "event"] | order(date asc) {
    _id,
    title,
    slug,
    description,
    date,
    location,
    image,
    "category": category->title
  }`,
  
  // Get all pages
  allPages: `*[_type == "page"] {
    _id,
    title,
    slug,
    content
  }`,
  
  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    socialLinks
  }`,
};

// Revalidation helpers
export async function revalidateTag(tag: string) {
  try {
    const response = await fetch(`/api/revalidate?tag=${tag}`, {
      method: 'POST',
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to revalidate:', error);
    return false;
  }
}

export default client;

