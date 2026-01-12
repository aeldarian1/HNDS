import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "./globals.css";

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
  title: "HNDS Split - Croatian-German Cultural Society",
  description: "Bridge between cultures. Language courses, cultural events, and community for Croatian-German cultural exchange in Split.",
  keywords: ["Croatian", "German", "Split", "Culture", "Language", "Society"],
  openGraph: {
    title: "HNDS Split",
    description: "Bridge between cultures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable + " " + lora.variable}>
        {children}
      </body>
    </html>
  );
}
