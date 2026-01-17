'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Camera, X, ZoomIn, Grid, List, Calendar } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard } from '@/app/components/ui/Card';
import { Button, MotionButton } from '@/app/components/ui/Button';

// Gallery categories with images
const galleryCategories = [
  { 
    name: '2025', 
    slug: '2025', 
    count: 12,
    description: 'Događanja i aktivnosti u 2025. godini',
    coverImage: '/images/gallery/2318.avif'
  },
  { 
    name: '2024', 
    slug: '2024', 
    count: 18,
    description: 'Proslava, izleti i kulturni programi',
    coverImage: '/images/gallery/1698.avif'
  },
  { 
    name: '2023', 
    slug: '2023', 
    count: 15,
    description: 'Memorabilni trenuci iz 2023.',
    coverImage: '/images/gallery/1628.avif'
  },
  { 
    name: 'Događaji', 
    slug: 'events', 
    count: 24,
    description: 'Sve vrste kulturnih i društvenih događanja',
    coverImage: '/images/gallery/1604.avif'
  },
  { 
    name: 'Tečajevi', 
    slug: 'tecajevi', 
    count: 10,
    description: 'Tečajevi njemačkog jezika i radionice',
    coverImage: '/images/gallery/1594.avif'
  },
  { 
    name: 'Putovanja', 
    slug: 'putovanja', 
    count: 8,
    description: 'Izleti i putovanja našeg društva',
    coverImage: '/images/gallery/1566.avif'
  },
];

// Sample featured images
const featuredImages = [
  { id: 1, src: '/images/gallery/2318.avif', alt: 'HNDS Event 1', category: '2025' },
  { id: 2, src: '/images/gallery/1698.avif', alt: 'HNDS Event 2', category: '2024' },
  { id: 3, src: '/images/gallery/1628.avif', alt: 'HNDS Event 3', category: '2023' },
  { id: 4, src: '/images/gallery/1604.avif', alt: 'HNDS Event 4', category: 'events' },
  { id: 5, src: '/images/gallery/1594.avif', alt: 'HNDS Event 5', category: 'tecajevi' },
  { id: 6, src: '/images/gallery/1566.avif', alt: 'HNDS Event 6', category: 'putovanja' },
];

export default function GalerijaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const totalPhotos = galleryCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-4 sm:space-y-6 max-w-3xl">
            <Badge variant="outline" className="mb-2 sm:mb-4">
              <Camera className="w-3 h-3 mr-1" />
              {totalPhotos} fotografija
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight">
              Galerija
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Fotografije s naših događanja
            </p>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* View Toggle & Gallery Categories */}
      <Section>
        <Container>
          {/* View toggle */}
          <FadeIn className="mb-6 sm:mb-8 flex justify-end">
            <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 rounded-lg p-1 border border-yellow-600/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 sm:p-2 rounded-md transition-all active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === 'grid' 
                    ? 'bg-yellow-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 sm:p-2 rounded-md transition-all active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === 'list' 
                    ? 'bg-yellow-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>

          {/* Categories */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer 
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" 
                  : "flex flex-col gap-3 sm:gap-4"
                }
              >
                {galleryCategories.map((category) => (
                  <StaggerItem key={category.slug}>
                    {viewMode === 'grid' ? (
                      <Link href={`/galerija/${category.slug}`}>
                        <MotionCard
                          className="group relative overflow-hidden h-56 sm:h-64 md:h-72 border border-yellow-600/30 active:scale-[0.98] transition-transform"
                          hoverY={-8}
                        >
                          {/* Background image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                            <Image
                              src={category.coverImage}
                              alt={category.name}
                              fill
                              className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
                            />
                          </div>
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                          
                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                              <Badge variant="primary" size="sm">
                                {category.count} fotografija
                              </Badge>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-1 sm:mb-2 group-hover:text-yellow-500 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-gray-400 font-light text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                              {category.description}
                            </p>
                            <span className="text-yellow-500 text-sm inline-flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              Pogledaj galeriju 
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </MotionCard>
                      </Link>
                    ) : (
                      <Link href={`/galerija/${category.slug}`}>
                        <MotionCard
                          className="group flex items-center gap-3 sm:gap-6 p-3 sm:p-4 border border-yellow-600/30 active:scale-[0.99] transition-transform min-h-[80px]"
                          hoverY={0}
                          hoverScale={1.02}
                        >
                          {/* Thumbnail */}
                          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={category.coverImage}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Info */}
                          <div className="flex-grow min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                              <h3 className="text-base sm:text-xl font-light text-white group-hover:text-yellow-500 transition-colors">
                                {category.name}
                              </h3>
                              <Badge variant="secondary" size="sm">
                                {category.count}
                              </Badge>
                            </div>
                            <p className="text-gray-400 font-light text-xs sm:text-sm truncate">
                              {category.description}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </MotionCard>
                      </Link>
                    )}
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* Featured Photos Section */}
      <Section className="bg-slate-900 border-y border-yellow-600/30">
        <Container>
          <FadeIn>
            <SectionHeader
              title="Izdvojene fotografije"
              subtitle="Najbolji trenuci iz naše galerije"
              centered
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12">
            {featuredImages.map((image) => (
              <StaggerItem key={image.id}>
                <motion.button
                  onClick={() => setLightboxImage(image.src)}
                  className="group relative aspect-square overflow-hidden rounded-lg active:scale-[0.98] transition-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Share CTA */}
      <Section>
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white">
              Imate fotografije s naših događanja?
            </h2>
            <p className="text-gray-300 font-light text-base sm:text-lg">
              Podijelite ih s nama i postanite dio naše galerije.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto min-h-[48px]">
                <Link href="/kontakt">Pošalji fotografije</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Gallery image"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
