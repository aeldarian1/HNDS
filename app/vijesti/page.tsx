'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard, NewsCard } from '@/app/components/ui/Card';
import { Button, MotionButton } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Form';

// Sample news data - in production, this would come from Sanity CMS
const news = [
  {
    id: 1,
    title: 'Svečana proslava 55. obljetnice prijateljstva Split-Berlin',
    excerpt: 'Hrvatsko-njemačko društvo Split obilježilo je 55 godina prijateljstva između Splita i Berlina uz bogat kulturni program i ugledne goste.',
    date: '2026-01-14',
    author: 'HNDS Tim',
    category: 'events',
    slug: 'proslava-55-obljetnice',
    image: '/images/events/berlin-split.jpg',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Novi tečajevi njemačkog jezika - upisi u tijeku',
    excerpt: 'Otvoreni su upisi za proljetni semestar tečajeva njemačkog jezika. Nudimo programe za sve razine - od početnika do naprednih.',
    date: '2026-01-10',
    author: 'HNDS Tim',
    category: 'news',
    slug: 'novi-tecajevi-njemackog',
    image: '/images/events/language-course.jpg',
    readTime: '3 min',
  },
  {
    id: 3,
    title: 'Najava: Kulturna večer s njemačkim filmom',
    excerpt: 'Pozivamo vas na projekciju nagrađivanog njemačkog filma s hrvatskim titlovima, uz uvod filmskog kritičara i diskusiju nakon filma.',
    date: '2026-01-05',
    author: 'Kulturna sekcija',
    category: 'announcement',
    slug: 'kulturna-vecer-film',
    image: '/images/events/film-night.jpg',
    readTime: '2 min',
  },
  {
    id: 4,
    title: 'Uspješno održan Božićni domjenak 2025',
    excerpt: 'Tradicionalni Božićni domjenak okupio je preko 100 članova i prijatelja društva uz tradicijsku glazbu, hranu i druženje.',
    date: '2025-12-28',
    author: 'HNDS Tim',
    category: 'events',
    slug: 'bozicni-domjenak-2025',
    image: '/images/events/christmas.jpg',
    readTime: '4 min',
  },
  {
    id: 5,
    title: 'Stipendije za studij u Njemačkoj - rok prijave',
    excerpt: 'DAAD stipendije za studij u Njemačkoj - informacije o programima i rokovima prijave za akademsku godinu 2026/2027.',
    date: '2025-12-20',
    author: 'Akademska sekcija',
    category: 'news',
    slug: 'stipendije-njemacka-2026',
    image: '/images/events/scholarship.jpg',
    readTime: '6 min',
  },
  {
    id: 6,
    title: 'Godišnja skupština HNDS-a - sažetak odluka',
    excerpt: 'Na godišnjoj skupštini usvojeni su izvještaji o radu, financijski plan i plan aktivnosti za 2026. godinu.',
    date: '2025-12-15',
    author: 'Tajništvo',
    category: 'announcement',
    slug: 'godisnja-skupstina-2025',
    image: '/images/events/assembly.jpg',
    readTime: '4 min',
  },
];

const ITEMS_PER_PAGE = 6;

export default function VijestiPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { value: 'all', label: 'Sve' },
    { value: 'news', label: 'Vijesti' },
    { value: 'events', label: 'Događaji' },
    { value: 'announcement', label: 'Najave' },
  ];

  const filtered = useMemo(() => {
    let result = news;
    
    if (selectedCategory !== 'all') {
      result = result.filter(n => n.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.excerpt.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedNews = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'events':
        return 'bg-yellow-600/20 text-yellow-500 border-yellow-600/30';
      case 'news':
        return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
      case 'announcement':
        return 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'events': return 'Događaj';
      case 'news': return 'Vijest';
      case 'announcement': return 'Najava';
      default: return 'Ostalo';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hr-HR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-4 sm:space-y-6 max-w-3xl">
            <Badge variant="outline" className="mb-2 sm:mb-4">
              <Tag className="w-3 h-3 mr-1" />
              {news.length} objava
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight">
              Vijesti
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Najnovije vijesti i obavijesti
            </p>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Filters & Search */}
      <Section>
        <Container>
          <FadeIn className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Pretraži vijesti..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <MotionButton
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setCurrentPage(1);
                  }}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                >
                  {cat.label}
                </MotionButton>
              ))}
            </div>
          </FadeIn>

          {/* News grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {paginatedNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {paginatedNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <MotionCard
                        className="bg-slate-900/50 border border-yellow-600/20 overflow-hidden h-full flex flex-col active:scale-[0.98] transition-transform"
                        hoverY={-8}
                      >
                        {/* Image placeholder */}
                        <div className="relative h-36 sm:h-44 md:h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                          <span className="text-3xl sm:text-4xl">📰</span>
                        </div>

                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                          {/* Category & Date */}
                          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                            <Badge className={getCategoryColor(item.category)}>
                              {getCategoryLabel(item.category)}
                            </Badge>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                              <Clock className="w-3 h-3" />
                              {item.readTime}
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-light text-white mb-2 sm:mb-3 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 font-light text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                            {item.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-yellow-600/10">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span className="truncate max-w-[100px] sm:max-w-none">{formatDate(item.date)}</span>
                            </div>
                            <Link
                              href={`/vijesti/${item.slug}`}
                              className="text-yellow-500 hover:text-yellow-400 text-sm inline-flex items-center gap-1 group min-h-[44px] items-center"
                            >
                              Pročitaj više
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </MotionCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg mb-4">Nema rezultata za vašu pretragu.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Poništi filtre
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4" />
                Prethodna
              </Button>
              
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-2 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[40px] w-10 h-10 sm:min-w-[44px] sm:w-11 sm:h-11 rounded-lg font-medium transition-all flex-shrink-0 ${
                      currentPage === page
                        ? 'bg-yellow-600 text-white'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700 active:scale-95'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto min-h-[44px]"
              >
                Sljedeća
                <ChevronRight className="w-4 h-4" />
              </Button>
            </FadeIn>
          )}
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-slate-900 border-t border-yellow-600/30">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white">
              Prijavite se na newsletter
            </h2>
            <p className="text-gray-300 font-light text-base sm:text-lg px-4">
              Primajte najnovije vijesti i obavijesti direktno u vaš inbox.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-md mx-auto pt-2 sm:pt-4">
              <Input
                type="email"
                placeholder="Vaša email adresa"
                className="flex-grow min-h-[48px]"
              />
              <Button type="submit" className="min-h-[48px] w-full sm:w-auto">Prijavi se</Button>
            </form>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
