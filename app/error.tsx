'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { HeroFadeIn, FadeIn } from '@/app/components/ui/Animations';
import { Container } from '@/app/components/ui/Common';
import { useI18n } from '@/app/context/I18nContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();
  
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Container className="text-center py-20">
        <HeroFadeIn className="space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto rounded-full bg-red-600/20 flex items-center justify-center"
          >
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-light text-white">
              {t('errors.title')}
            </h1>
            <p className="text-gray-400 font-light max-w-md mx-auto">
              {t('errors.description')}
            </p>
            {error.digest && (
              <p className="text-gray-500 text-sm font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={reset} size="lg">
                <RefreshCw className="w-5 h-5 mr-2" />
                {t('errors.tryAgain')}
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  {t('errors.backHome')}
                </Link>
              </Button>
            </div>
          </FadeIn>
        </HeroFadeIn>
      </Container>
    </main>
  );
}
