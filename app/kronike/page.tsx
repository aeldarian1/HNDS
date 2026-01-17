'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, BookOpen, TrendingUp, Search, Download, ExternalLink } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useI18n } from '@/app/context/I18nContext';
import {
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Counter,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard } from '@/app/components/ui/Card';
import { Button, MotionButton } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Form';
import { ChronicleBadge } from '@/app/components/ChronicleBadge';
import chronicles from '@/data/chronicles.json';

export default function ChroniclesPage() {
  const { t } = useI18n();
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique decades
  const decades = useMemo(() => 
    Array.from(
      new Set(
        chronicles.map(c => Math.floor(new Date(c.date).getFullYear() / 10) * 10)
      )
    ).sort((a, b) => b - a),
    []
  );

  // Filter chronicles
  const filteredChronicles = useMemo(() => {
    let result = chronicles;
    
    if (selectedDecade !== 'all') {
      result = result.filter(c => {
        const year = new Date(c.date).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        return decade.toString() === selectedDecade;
      });
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [selectedDecade, searchQuery]);

  // Calculate statistics
  const years = chronicles.map(c => new Date(c.date).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearSpan = maxYear - minYear + 1;

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="w-10 h-10 text-yellow-500" />
              <Badge variant="outline">
                {chronicles.length} izdanja
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
              Kronike
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Povijesni zapis naših aktivnosti i događanja kroz godine. 
              Otkrijte bogatu povijest Hrvatsko-njemačkog društva Split od {minYear}. godine.
            </p>
            
            {/* Statistics */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-white">{chronicles.length}</span>
                <span>izdanja</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">📚</span>
                <span>{minYear} - {maxYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                <span>{yearSpan} godina povijesti</span>
              </div>
            </div>
            
            <div className="w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Search & Filters */}
      <Section>
        <Container>
          <FadeIn className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t('ui.search.chroniclesPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Decade filters */}
            <div className="flex flex-wrap gap-3">
              <MotionButton
                onClick={() => setSelectedDecade('all')}
                variant={selectedDecade === 'all' ? 'default' : 'outline'}
                size="sm"
              >
                Sve ({chronicles.length})
              </MotionButton>
              {decades.map(decade => {
                const count = chronicles.filter(c => {
                  const year = new Date(c.date).getFullYear();
                  return Math.floor(year / 10) * 10 === decade;
                }).length;
                return (
                  <MotionButton
                    key={decade}
                    onClick={() => setSelectedDecade(decade.toString())}
                    variant={selectedDecade === decade.toString() ? 'default' : 'outline'}
                    size="sm"
                  >
                    {decade}e ({count})
                  </MotionButton>
                );
              })}
            </div>
          </FadeIn>

          {/* Chronicles Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDecade}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredChronicles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg mb-4">Nema kronika za odabrano razdoblje.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDecade('all');
                    }}
                  >
                    Poništi filtre
                  </Button>
                </div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChronicles.map((chronicle) => (
                    <StaggerItem key={chronicle.id}>
                      <Link href={`/kronike/${chronicle.slug}`}>
                        <MotionCard
                          className="group bg-slate-900/50 border border-yellow-600/20 overflow-hidden h-full"
                          hoverY={-8}
                        >
                          {/* Chronicle Cover */}
                          <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center p-6">
                            <ChronicleBadge
                              number={chronicle.title.match(/#(\d+)/)?.[1] || '?'}
                              year={new Date(chronicle.date).getFullYear().toString()}
                              className="w-36 h-36 group-hover:scale-110 transition-transform duration-300"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-yellow-600/0 group-hover:bg-yellow-600/5 transition-colors duration-300" />
                          </div>

                          {/* Chronicle Info */}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-4 h-4 text-yellow-500" />
                              <span>{chronicle.formattedDate}</span>
                            </div>

                            <h3 className="text-lg font-light text-white group-hover:text-yellow-500 transition line-clamp-2">
                              {chronicle.title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&')}
                            </h3>

                            {chronicle.description && (
                              <p className="text-gray-400 font-light text-sm line-clamp-2">
                                {chronicle.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-yellow-600/10">
                              <span className="text-yellow-500 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                Pročitaj više
                                <ArrowRight className="w-4 h-4" />
                              </span>
                              {chronicle.pdfUrl && (
                                <a
                                  href={chronicle.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                                  title={t('common.downloadPDF')}
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </MotionCard>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* Archive CTA */}
      <Section className="bg-slate-900 border-t border-yellow-600/30">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-white">
              Istražite našu povijest
            </h2>
            <p className="text-gray-300 font-light text-lg">
              Kronike dokumentiraju više od {yearSpan} godina aktivnosti našeg društva - od tečajeva jezika do kulturnih razmjena i prijateljstava.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/o-nama">O nama</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/galerija">Pogledaj galeriju</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
