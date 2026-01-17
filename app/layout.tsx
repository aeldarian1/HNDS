import type { Metadata, Viewport } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { draftMode } from 'next/headers';
import { VisualEditingComponent } from './components/VisualEditing';
import { LayoutClientProviders } from './components/LayoutClientProviders';

// Font configurations with display swap for better performance
const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    { media: '(prefers-color-scheme: light)', color: '#0f172a' },
  ],
};

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hnds.hr'),
  title: {
    default: 'HNDS Split - Hrvatsko-njemačko društvo',
    template: '%s | HNDS Split',
  },
  description:
    'Most između kultura. Hrvatsko-njemačko društvo Split - tečajevi njemačkog jezika, kulturni događaji, izleti i međukulturna razmjena.',
  keywords: [
    'Hrvatsko-njemačko društvo',
    'HNDS',
    'Split',
    'Njemački jezik',
    'Tečaj njemačkog',
    'Kultura',
    'Međukulturna razmjena',
    'Berlin',
    'Hrvatska',
    'Njemačka',
  ],
  authors: [{ name: 'HNDS Split', url: 'https://hnds.hr' }],
  creator: 'HNDS Split',
  publisher: 'HNDS Split',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/cropped-HD_Ikona-1.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/cropped-HD_Ikona-1.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    apple: [{ url: '/cropped-HD_Ikona-1.jpg', sizes: '180x180', type: 'image/jpeg' }],
    shortcut: '/cropped-HD_Ikona-1.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    alternateLocale: 'de_DE',
    url: 'https://hnds.hr',
    siteName: 'HNDS Split',
    title: 'HNDS Split - Hrvatsko-njemačko društvo',
    description:
      'Most između kultura. Promoviranje kulturnih, jezičnih i prijateljskih veza između Hrvatske i Njemačke.',
    images: [
      {
        url: '/images/hero-poznati-nijemci.avif',
        width: 1200,
        height: 630,
        alt: 'HNDS Split - Hrvatsko-njemačko društvo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HNDS Split - Hrvatsko-njemačko društvo',
    description: 'Most između kultura',
    images: ['/images/hero-poznati-nijemci.avif'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hnds.hr',
    languages: {
      'hr-HR': 'https://hnds.hr',
      'de-DE': 'https://hnds.hr/de',
    },
  },
  category: 'education',
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hrvatsko-njemačko društvo Split',
  alternateName: 'HNDS Split',
  url: 'https://hnds.hr',
  logo: 'https://hnds.hr/cropped-HD_Ikona-1.jpg',
  sameAs: [
    'https://www.facebook.com/people/Hrvatsko-njema%C4%8Dko-dru%C5%A1tvo-Split/61571711064231/',
    'https://www.instagram.com/hnjd.split/',
    'https://www.youtube.com/@hnds-hr',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+385-98-244-124',
    contactType: 'customer service',
    availableLanguage: ['Croatian', 'German'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Split',
    addressCountry: 'HR',
  },
  foundingDate: '1990',
  description:
    'Hrvatsko-njemačko društvo Split promiče kulturne, jezične i prijateljske veze između Hrvatske i Njemačke.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();

  return (
    <html lang="hr" className="scroll-smooth dark" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Theme initialization script - runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var resolved = theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(resolved);
                  document.documentElement.style.colorScheme = resolved;
                } catch (e) {}
              })();
            `,
          }}
          suppressHydrationWarning
        />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body
        className={`${montserrat.variable} ${lora.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LayoutClientProviders />
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-yellow-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Preskoči na sadržaj
          </a>
          
          <div id="main-content">{children}</div>
          
          {/* Analytics */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        
        {/* Visual editing for Sanity preview */}
        {draft.isEnabled && <VisualEditingComponent />}
      </body>
    </html>
  );
}
