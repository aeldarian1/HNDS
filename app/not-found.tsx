'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Container } from '@/app/components/ui/Common';
import { useI18n } from '@/app/context/I18nContext';

export default function NotFound() {
  const { t } = useI18n();
  
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Container className="text-center py-20">
        <div className="space-y-8">
          {/* 404 Display */}
          <div className="relative">
            <span className="text-[12rem] md:text-[16rem] font-light text-yellow-600/10 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-light text-yellow-500">
                404
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light text-white">
              {t('errors.notFound.title')}
            </h1>
            <p className="text-gray-400 font-light max-w-md mx-auto">
              {t('errors.notFound.description')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                {t('errors.backHome')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">
                <Search className="w-5 h-5 mr-2" />
                {t('cta.contactUs')}
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-yellow-600/20 max-w-md mx-auto">
            <p className="text-gray-500 text-sm mb-4">{t('errors.notFound.suggestions')}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/o-nama" className="text-yellow-500 hover:text-yellow-400 transition">
                {t('navigation.about')}
              </Link>
              <Link href="/aktivnosti" className="text-yellow-500 hover:text-yellow-400 transition">
                {t('navigation.activities')}
              </Link>
              <Link href="/vijesti" className="text-yellow-500 hover:text-yellow-400 transition">
                {t('navigation.news')}
              </Link>
              <Link href="/galerija" className="text-yellow-500 hover:text-yellow-400 transition">
                {t('navigation.gallery')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
