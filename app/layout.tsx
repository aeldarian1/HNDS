import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/app/context/I18nContext";
import { draftMode } from "next/headers";
import { VisualEditingComponent } from "./components/VisualEditing";
import { LayoutClientProviders } from "./components/LayoutClientProviders";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Improved font loading
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // Improved font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "HNDS Split - Hrvatsko-njemačko društvo",
  description: "Most između kultura. Tečajevi jezika, kulturni događaji i zajednica za hrvatsko-njemačku kulturnu razmjenu u Splitu.",
  keywords: ["Hrvatsko", "Njemačko", "Društvo", "Split", "Kultura", "Jezik"],
  authors: [{ name: "HNDS Split" }],
  creator: "HNDS Split",
  publisher: "HNDS Split",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/cropped-HD_Ikona-1.jpg',
    apple: '/cropped-HD_Ikona-1.jpg',
  },
  openGraph: {
    title: "HNDS Split - Hrvatsko-njemačko društvo",
    description: "Most između kultura. Promoviranje kulturnih, jezičnih i prijateljskih veza između Hrvatske i Njemačke.",
    type: "website",
    locale: "hr_HR",
    siteName: "HNDS Split",
  },
  twitter: {
    card: "summary_large_image",
    title: "HNDS Split",
    description: "Most između kultura",
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
  verification: {
    google: 'google',
    yandex: 'yandex',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode()
  
  return (
    <html lang="hr">
      <body className={montserrat.variable + " " + lora.variable} suppressHydrationWarning>
        <LayoutClientProviders />
        <I18nProvider>
          {children}
        </I18nProvider>
        {draft.isEnabled && <VisualEditingComponent />}
      </body>
    </html>
  );
}
