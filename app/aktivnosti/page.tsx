'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink, BookOpen, Calendar, MapPin, Users, Music, Globe } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { FadeIn, HeroFadeIn, StaggerContainer, StaggerItem } from '@/app/components/AnimatedSection';
import { EventCalendar } from '@/app/components/EventCalendar';
import { useI18n } from '@/app/context/I18nContext';

export default function AktivnostiPage() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');

  const activities = [
    {
      id: 1,
      title: '•',
      type: 'courses',
      category: 'Tečajevi jezika',
      description: '•',
      icon: BookOpen,
      color: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
    },
    {
      id: 2,
      title: '•',
      type: 'events',
      category: 'Događaji',
      description: '•',
      icon: Music,
      color: 'bg-yellow-600/20 text-yellow-600 border border-yellow-600/30',
    },
    {
      id: 3,
      title: '•',
      type: 'excursions',
      category: 'Izleti',
      description: '•',
      icon: MapPin,
      color: 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30',
    },
    {
      id: 4,
      title: '•',
      type: 'social',
      category: 'Društveni događaji',
      description: '•',
      icon: Users,
      color: 'bg-purple-600/20 text-purple-400 border border-purple-600/30',
    },
    {
      id: 5,
      title: '•',
      type: 'cultural',
      category: 'Kultura',
      description: '•',
      icon: Globe,
      color: 'bg-pink-600/20 text-pink-400 border border-pink-600/30',
    },
  ];

  const filters = [
    { value: 'all', label: 'Sve aktivnosti' },
    { value: 'courses', label: 'Tečajevi' },
    { value: 'events', label: 'Događaji' },
    { value: 'excursions', label: 'Izleti' },
    { value: 'social', label: 'Društveni' },
    { value: 'cultural', label: 'Kultura' },
  ];

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return activities;
    return activities.filter(a => a.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-slate-950">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-white">{t('pages.activities.title')}</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              {t('pages.activities.subtitle')}
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </div>
      </section>

          {/* Event Calendar */}
          <section className="py-20 md:py-32 bg-slate-900 border-y border-yellow-600/30">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <FadeIn className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light text-white">Kalendar aktivnosti</h2>
                <p className="text-gray-300 font-light">Pogledajte nadolazeće tečajeve, događaje i izlete</p>
              </FadeIn>
              <EventCalendar />
            </div>
          </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Filter buttons */}
          <FadeIn className="mb-12 flex flex-wrap gap-3">
            {filters.map(filter => (
              <motion.button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 font-light transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-yellow-600 text-white'
                    : 'border border-yellow-600/30 text-gray-300 hover:border-yellow-600'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </FadeIn>

          {/* Activities grid */}
          <AnimatePresence mode="wait">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <StaggerItem key={activity.id}>
                    <motion.div
                      layout
                      className={`${activity.color} p-8 rounded-lg hover:shadow-lg hover:shadow-yellow-600/20 transition-all duration-300 h-full flex flex-col`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8" />
                        <span className="text-xs font-light uppercase tracking-wide bg-black/30 px-2 py-1 rounded">
                          {activity.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-light text-white mb-3">{activity.title}</h3>
                      <p className="text-gray-300 font-light text-sm mb-6 flex-grow">{activity.description}</p>
                      <Link href="#" className="text-yellow-600 font-light text-sm hover:text-yellow-500 transition inline-flex items-center gap-2">
                        Saznaj više <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">•</h2>
            <p className="text-gray-300 font-light text-lg">
              •
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/kontakt"
              className="px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300"
            >
              Kontaktiraj nas
            </Link>
            <Link
              href="/vijesti"
              className="px-8 py-3 border border-yellow-600 text-yellow-600 font-light hover:bg-yellow-600/10 transition duration-300"
            >
              Pročitaj vijesti
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
