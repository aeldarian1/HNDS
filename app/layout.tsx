import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/app/context/I18nContext";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={montserrat.variable + " " + lora.variable}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
