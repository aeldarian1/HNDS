import './globals.css';

// Root layout - minimal wrapper for app router with i18n
// The actual layout content is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
