'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertOctagon } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { HeroFadeIn } from '@/app/components/ui/Animations';
import { Container } from '@/app/components/ui/Common';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="hr">
      <body className="bg-slate-950">
        <main className="min-h-screen flex items-center justify-center px-4">
          <Container className="text-center py-20">
            <HeroFadeIn className="space-y-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 mx-auto rounded-full bg-red-600/20 flex items-center justify-center"
              >
                <AlertOctagon className="w-12 h-12 text-red-500" />
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-light text-white">
                  Kritična greška
                </h1>
                <p className="text-gray-400 font-light max-w-md mx-auto">
                  Došlo je do ozbiljne greške u aplikaciji. Naš tim je obaviješten i radimo na rješenju.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={reset} size="lg">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Pokušaj ponovo
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2" />
                    Početna stranica
                  </Link>
                </Button>
              </div>
            </HeroFadeIn>
          </Container>
        </main>
      </body>
    </html>
  );
}
