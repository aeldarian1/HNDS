'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight, Calendar, BookOpen, Globe, MapPin } from 'lucide-react';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { NewsletterSignup } from './components/NewsletterSignup';

// UI Components
import {
  Button,
  Container,
  Section,
  SectionHeader,
  Grid,
  FeatureCard,
  StatsCard,
  NewsCard,
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from './components/ui';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax effect for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Stats data
  const stats = [
    { value: '35+', label: 'Godina tradicije' },
    { value: '500+', label: 'Članova' },
    { value: '6', label: 'Lokacija' },
    { value: '55', label: 'Godina prijateljstva' },
  ];

  // Features data
  const features = [
    {
      number: '01',
      title: 'Bogata povijest',
      description: 'Više od tri desetljeća promicanja hrvatsko-njemačkih veza.',
      href: '/o-nama',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Tečajevi jezika',
      description: 'Kvalitetni tečajevi njemačkog jezika za sve razine.',
      href: '/aktivnosti',
      icon: BookOpen,
    },
    {
      number: '03',
      title: 'Kulturni događaji',
      description: 'Izložbe, predavanja, koncerti i kulturne večeri.',
      href: '/aktivnosti',
      icon: Globe,
    },
    {
      number: '04',
      title: 'Izleti i putovanja',
      description: 'Organizirani izleti po Hrvatskoj i Njemačkoj.',
      href: '/aktivnosti',
      icon: MapPin,
    },
  ];

  // News data (placeholder)
  const newsItems = [
    {
      date: '15. siječnja 2026.',
      category: 'Događaji',
      title: 'Svečana proslava 55. obljetnice prijateljstva Split-Berlin',
      slug: 'vijest-1',
    },
    {
      date: '10. siječnja 2026.',
      category: 'Tečajevi',
      title: 'Novi tečajevi njemačkog jezika - upisi u tijeku',
      slug: 'vijest-2',
    },
    {
      date: '5. siječnja 2026.',
      category: 'Kultura',
      title: 'Najava: Kulturna večer s njemačkim filmom',
      slug: 'vijest-3',
    },
  ];

  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Navigation />

      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <Image
            src="/images/hero-poznati-nijemci.avif"
            alt="HNDS Hero"
            fill
            priority
            quality={75}
            className="object-cover object-center"
            style={{ filter: 'brightness(1.1) contrast(1.05)' }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
          <div className="absolute inset-0 bg-yellow-600/5 mix-blend-overlay" />
        </motion.div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[1]" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-center"
          style={{ opacity: heroOpacity }}
        >
          <HeroFadeIn className="space-y-6 md:space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-balance">
              <span className="block">Most između kultura</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light px-2">
              Hrvatsko-njemačko društvo Split - više od 35 godina prijateljstva i suradnje.
            </p>

            {/* CTA Buttons - Stack on mobile */}
            <HeroFadeIn delay={0.2} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 sm:px-0">
              <Link href="/aktivnosti" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto justify-center">
                  Istražite aktivnosti
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/o-nama" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                  Saznajte više
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </HeroFadeIn>

            {/* Stats Grid - 2x2 on mobile */}
            <HeroFadeIn delay={0.4} className="pt-8 sm:pt-16 mt-8 sm:mt-16 border-t border-yellow-600/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
                {stats.map((stat, i) => (
                  <StatsCard key={i} value={stat.value} label={stat.label} />
                ))}
              </div>
            </HeroFadeIn>
          </HeroFadeIn>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-yellow-600/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <Section variant="default" padding="lg">
        <Container size="xl">
          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="hidden md:block">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, i) => (
                <StaggerItem key={i}>
                  <FeatureCard
                    icon={feature.icon}
                    number={feature.number}
                    title={feature.title}
                    description={feature.description}
                    href={feature.href}
                    ctaText="Saznajte više"
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          {/* Mobile horizontal scroll */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {features.map((feature, i) => (
                <div key={i} className="flex-none w-[85%] min-w-[280px] snap-center">
                  <FeatureCard
                    icon={feature.icon}
                    number={feature.number}
                    title={feature.title}
                    description={feature.description}
                    href={feature.href}
                    ctaText="Saznajte više"
                  />
                </div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {features.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-yellow-600/30" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ==================== ABOUT PREVIEW SECTION ==================== */}
      <Section variant="alternate" border padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <FadeIn className="space-y-6">
              <div>
                <span className="text-yellow-500 text-sm uppercase tracking-widest font-light">
                  O nama
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-white mt-2">
                  Tko smo mi?
                </h2>
                <div className="w-12 h-px bg-yellow-600 mt-6" />
              </div>
              
              <p className="text-gray-300 font-light text-lg leading-relaxed">
                Hrvatsko-njemačko društvo Split od 1990. godine promiče kulturne, jezične i prijateljske veze između Hrvatske i Njemačke. Naša misija je graditi mostove između dviju kultura.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/o-nama">
                  <Button>
                    Saznajte više
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/membership">
                  <Button variant="ghost">
                    Postanite član
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Image/Visual */}
            <FadeIn delay={0.2} className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/gallery/1566.avif"
                  alt="HNDS događaj"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-yellow-600/30 rounded-lg -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-600/10 rounded-lg -z-10" />
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* ==================== NEWS SECTION ==================== */}
      <Section variant="default" padding="lg">
        <Container>
          <FadeIn className="mb-12">
            <SectionHeader
              title="Najnovije vijesti"
              subtitle="Pratite naše aktivnosti i događanja"
              align="center"
            />
          </FadeIn>

          <StaggerContainer>
            <Grid cols={3} gap="lg" className="mb-12">
              {newsItems.map((news, i) => (
                <StaggerItem key={i}>
                  <NewsCard
                    date={news.date}
                    category={news.category}
                    title={news.title}
                    slug={news.slug}
                  />
                </StaggerItem>
              ))}
            </Grid>
          </StaggerContainer>

          <FadeIn className="text-center">
            <Link href="/vijesti">
              <Button variant="outline">
                Sve vijesti
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <NewsletterSignup />

      {/* ==================== CTA SECTION ==================== */}
      <Section variant="default" padding="lg" className="border-t border-yellow-600/30">
        <Container size="md" className="text-center">
          <FadeIn className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-light text-white">
              Pridružite se zajednici
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
              Postanite dio naše zajednice i otkrijte bogate kulturne veze između Hrvatske i Njemačke.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/kontakt">
              <Button size="lg" variant="glow">
                Kontaktirajte nas
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/galerija">
              <Button size="lg" variant="outline">
                Pogledajte galeriju
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
