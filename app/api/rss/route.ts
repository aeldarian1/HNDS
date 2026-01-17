import { NextResponse } from 'next/server';
import chronicles from '@/data/chronicles.json';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hnds.hr';

// Sample news data - in production this would come from Sanity
const news = [
  {
    title: 'Svečana proslava 55. obljetnice prijateljstva Split-Berlin',
    description: 'Hrvatsko-njemačko društvo Split obilježilo je 55 godina prijateljstva između Splita i Berlina.',
    link: `${BASE_URL}/vijesti/proslava-55-obljetnice`,
    pubDate: new Date('2026-01-14').toUTCString(),
    category: 'Događaji',
  },
  {
    title: 'Novi tečajevi njemačkog jezika - upisi u tijeku',
    description: 'Otvoreni su upisi za proljetni semestar tečajeva njemačkog jezika.',
    link: `${BASE_URL}/vijesti/novi-tecajevi-njemackog`,
    pubDate: new Date('2026-01-10').toUTCString(),
    category: 'Vijesti',
  },
];

function generateRssFeed() {
  const items = [
    // Add news items
    ...news.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`),
    // Add chronicle items
    ...chronicles.slice(0, 10).map(chronicle => `
    <item>
      <title><![CDATA[${chronicle.title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&')}]]></title>
      <link>${BASE_URL}/kronike/${chronicle.slug}</link>
      <description><![CDATA[${chronicle.description || `Kronika ${chronicle.title}`}]]></description>
      <pubDate>${new Date(chronicle.date).toUTCString()}</pubDate>
      <category>Kronike</category>
      <guid isPermaLink="true">${BASE_URL}/kronike/${chronicle.slug}</guid>
    </item>`),
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Hrvatsko-njemačko društvo Split</title>
    <link>${BASE_URL}</link>
    <description>Najnovije vijesti i događanja iz Hrvatsko-njemačkog društva Split. Tečajevi njemačkog jezika, kulturni događaji, izleti i više.</description>
    <language>hr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/images/logo.png</url>
      <title>HNDS</title>
      <link>${BASE_URL}</link>
    </image>
    <copyright>© ${new Date().getFullYear()} Hrvatsko-njemačko društvo Split</copyright>
    <managingEditor>info@hnds.hr (HNDS)</managingEditor>
    <webMaster>info@hnds.hr (HNDS)</webMaster>
    <category>Kultura</category>
    <category>Obrazovanje</category>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;
}

export async function GET() {
  const feed = generateRssFeed();

  return new NextResponse(feed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
