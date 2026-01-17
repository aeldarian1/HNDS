import { MetadataRoute } from 'next';
import chronicles from '@/data/chronicles.json';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hnds.hr';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/o-nama', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/aktivnosti', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/vijesti', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/galerija', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/kronike', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/kontakt', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/membership', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privatnost', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/uvjeti', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/statut', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Chronicle pages
  const chroniclePages = chronicles.map((chronicle) => ({
    url: `/kronike/${chronicle.slug}`,
    lastModified: new Date(chronicle.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  // Combine all pages
  const allPages = [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...chroniclePages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ];

  return allPages;
}
