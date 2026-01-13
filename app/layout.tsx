import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { I18nProvider } from "@/app/context/I18nContext";
import { draftMode } from "next/headers";
import { VisualEditingComponent } from "./components/VisualEditing";

// Dynamically load non-critical components for better initial page load
const ScrollProgress = dynamic(() => import("./components/ScrollProgress"), {
  ssr: false, // Don't render on server
});

const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
  ssr: false, // Don't render on server
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HNDS Split - Hrvatsko-njemačko društvo",
  description: "Most između kultura. Tečajevi jezika, kulturni događaji i zajednica za hrvatsko-njemačku kulturnu razmjenu u Splitu.",
  keywords: ["Hrvatsko", "Njemačko", "Društvo", "Split", "Kultura", "Jezik"],
  icons: {
    icon: '/cropped-HD_Ikona-1.jpg',
    apple: '/cropped-HD_Ikona-1.jpg',
  },
  openGraph: {
    title: "HNDS Split",
    description: "Most između kultura",
    type: "website",
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
        <SmoothScroll />
        <ScrollProgress />
        <I18nProvider>
          {children}
        </I18nProvider>
        {draft.isEnabled && <VisualEditingComponent />}
      </body>
    </html>
  );
}
