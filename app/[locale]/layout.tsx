import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Lora, Montserrat } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { draftMode } from 'next/headers';
import { VisualEditingComponent } from '@/app/components/VisualEditing';
import { LayoutClientProviders } from '@/app/components/LayoutClientProviders';

// Font configurations
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

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Dynamic metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    hr: 'HNDS Split - Hrvatsko-njemačko društvo',
    de: 'HNDS Split - Kroatisch-Deutsche Gesellschaft',
  };
  
  const descriptions = {
    hr: 'Most između kultura. Hrvatsko-njemačko društvo Split - tečajevi njemačkog jezika, kulturni događaji, izleti i međukulturna razmjena.',
    de: 'Brücke zwischen Kulturen. Kroatisch-Deutsche Gesellschaft Split - Deutschkurse, Kulturveranstaltungen, Ausflüge und interkultureller Austausch.',
  };

  return {
    title: {
      default: titles[locale as keyof typeof titles] || titles.hr,
      template: `%s | HNDS Split`,
    },
    description: descriptions[locale as keyof typeof descriptions] || descriptions.hr,
    alternates: {
      canonical: locale === 'hr' ? 'https://hnds.hr' : `https://hnds.hr/${locale}`,
      languages: {
        'hr-HR': 'https://hnds.hr',
        'de-DE': 'https://hnds.hr/de',
      },
    },
  };
}

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
  description: 'Hrvatsko-njemačko društvo Split promiče kulturne, jezične i prijateljske veze između Hrvatske i Njemačke.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'hr' | 'de')) {
    notFound();
  }

  // Load messages for the locale
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const draft = await draftMode();

  return (
    <html lang={locale} className="scroll-smooth dark" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Theme initialization script */}
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
          {/* Skip to main content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-yellow-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            {locale === 'de' ? 'Zum Inhalt springen' : 'Preskoči na sadržaj'}
          </a>
          
          <div id="main-content" className="relative">{children}</div>
          
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
