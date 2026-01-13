'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import wpEvents from '@/data/wordpress-events.json';
import { RevealOnScroll, ScaleOnHover } from '@/app/components/InteractiveElements';
import { FadeIn, HeroFadeIn, StaggerContainer, StaggerItem } from '@/app/components/AnimatedSection';

// Type definitions
interface BaseEvent {
  id: string | number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface WordPressEvent extends BaseEvent {
  slug: string;
  originalUrl: string;
  isWordPress: true;
}

interface CustomEvent extends BaseEvent {
  image: string;
  isWordPress?: never;
}

type Event = WordPressEvent | CustomEvent;

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Transform WordPress events for display
  const wordpressEvents: WordPressEvent[] = wpEvents.map((event, index) => ({
    id: `wp-${index}`,
    title: event.title,
    type: 'events',
    date: event.date,
    time: '',
    location: '',
    description: event.description || 'Pročitajte više na našoj web stranici.',
    slug: event.slug,
    originalUrl: event.originalUrl,
    isWordPress: true,
  }));

  const customEvents: CustomEvent[] = [
    {
      id: 1,
      title: 'Tečaj dalmatinske kuhinje',
      type: 'courses',
      date: 'January 25, 2026',
      time: '18:00',
      location: 'Split Cultural Center',
      description: 'Nauči tradicionalne dalmatinske recepte od naših kulinarskih stručnjaka. Uključuje degustaciju vina.',
      image: '[Event Image]',
    },
    {
      id: 2,
      title: 'Izlet po Jadranskoj obali',
      type: 'excursions',
      date: 'February 7, 2026',
      time: '09:00',
      location: 'Meeting Point: Harbor',
      description: 'Istražite skrivene plaže i historijske gradove duž dalmatinske obale.',
      image: '[Event Image]',
    },
    {
      id: 3,
      title: 'Tečaj hrvatskog jezika',
      type: 'courses',
      date: 'February 14, 2026',
      time: '19:00',
      location: 'Online & In-Person',
      description: 'Početnički uvod u hrvatski jezik i kulturu za početke.',
      image: '[Event Image]',
    },
    {
      id: 4,
      title: 'Proljetna galadona',
      type: 'events',
      date: 'March 1, 2026',
      time: '19:30',
      location: 'Peristyle Palace',
      description: 'Pridruži nam se na elegantnome večeru koji slavi hrvatsku kulturu s live glazbom i tradicionalnom kuhinjom.',
      image: '[Event Image]',
    },
    {
      id: 5,
      title: 'Obilazak srednjovjekovnog Dubrovnika',
      type: 'excursions',
      date: 'March 15, 2026',
      time: '08:00',
      location: 'Meeting Point: Downtown Split',
      description: 'Cjelodnevni vođeni obilazak kroz historijski stari grad i okolna srednjovjekovna mjesta.',
      image: '[Event Image]',
    },
    {
      id: 6,
      title: 'Tečaj tradicionalne glazbe i plesa',
      type: 'courses',
      date: 'March 22, 2026',
      time: '18:00',
      location: 'Cultural Center',
      description: 'Nauči tradicionalne hrvatske narodne plesove i glazbu od iskusnih instruktora.',
      image: '[Event Image]',
    },
    {
      id: 7,
      title: 'Ekspedicija degustacije vina',
      type: 'excursions',
      date: 'April 5, 2026',
      time: '10:00',
      location: 'Pelješac Peninsula',
      description: 'Posjeti obiteljske vinogradarnice i okusi premierna hrvatska vina s poznavaocem sommeliera.',
      image: '[Event Image]',
    },
    {
      id: 8,
      title: 'Degustacija istarskog maslinova ulja i hrane',
      type: 'courses',
      date: 'April 12, 2026',
      time: '16:00',
      location: 'Istrian Workshop',
      description: 'Otkrij ukuse Istre s tradicionalnim uljima, tartufima i lokalnim delicijama.',
      image: '[Event Image]',
    },
  ];

  const filters = [
    { value: 'all', label: 'Svi događaji' },
    { value: 'events', label: 'Događaji' },
    { value: 'courses', label: 'Tečajevi' },
    { value: 'excursions', label: 'Izleti' },
  ];

  // Combine WordPress events with custom events
  const allEvents: Event[] = useMemo(() => {
    return [...wordpressEvents, ...customEvents].sort((a, b) => {
      try {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return dateB - dateA; // Most recent first
      } catch {
        return 0;
      }
    });
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return allEvents;
    return allEvents.filter(e => e.type === activeFilter);
  }, [activeFilter, allEvents]);

  const displayedEvents = showAll ? filtered : filtered.slice(0, 12);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'events':
        return 'bg-yellow-600/20 text-yellow-600 border border-yellow-600/30';
      case 'courses':
        return 'bg-blue-600/20 text-blue-400 border border-blue-600/30';
      case 'excursions':
        return 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30';
      default:
        return 'bg-yellow-600/20 text-yellow-600 border border-yellow-600/30';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'events':
        return 'Događaj';
      case 'courses':
        return 'Tečaj';
      case 'excursions':
        return 'Izlet';
      default:
        return 'Događaj';
    }
  };

  return (
    <main className="bg-slate-950">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-white">Događaji</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Pridruži nam se za kulturna iskustva, edukativne tečajeve i nezaboravne izlete
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="flex gap-4 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={activeFilter === filter.value ? "px-6 py-2 text-sm font-light transition duration-300 border bg-yellow-600 text-white border-yellow-600" : "px-6 py-2 text-sm font-light transition duration-300 border border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"}
              >
                {filter.label}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <StaggerContainer
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {displayedEvents.map((event, index) => (
                <StaggerItem key={event.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group overflow-hidden border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-yellow-600/10"
                  >
                      <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center text-gray-600 font-light">
                        {'isWordPress' in event && event.isWordPress ? (
                          <motion.div 
                            className="text-yellow-600/40 text-4xl font-light"
                            animate={{ 
                              scale: [1, 1.05, 1],
                              opacity: [0.4, 0.6, 0.4]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            HNDS
                          </motion.div>
                        ) : (
                          'image' in event && event.image
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-yellow-600/0 group-hover:bg-yellow-600/5 transition-colors duration-300" />
                      </div>

                      <div className="p-8 bg-slate-900 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <motion.span 
                            className={`text-xs font-light uppercase tracking-wide px-3 py-1 ${getTypeColor(event.type)}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {getTypeLabel(event.type)}
                          </motion.span>
                          {'isWordPress' in event && event.isWordPress && (
                            <span className="text-xs text-yellow-600/60 border border-yellow-600/30 px-2 py-1">
                              hnds.hr
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-light text-white mb-4 group-hover:text-yellow-600 transition">
                          {event.title}
                        </h3>

                        <div className="space-y-3 mb-6 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600">📅</span>
                            <span>{event.date}{event.time && ` u ${event.time}`}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-600">📍</span>
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-300 font-light mb-6 flex-1">
                          {event.description}
                        </p>

                        {'isWordPress' in event && event.isWordPress ? (
                          <motion.a
                            href={event.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-yellow-600 font-light hover:text-yellow-500 transition group/btn"
                          >
                            Pročitajte više
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                          </motion.a>
                        ) : (
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-yellow-600 font-light hover:text-yellow-500 transition group/btn"
                      >
                        Saznaj više
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                      </motion.button>
                    )}
                      </div>
                    </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatePresence>

          {filtered.length > 12 && !showAll && (
            <div className="flex justify-center mt-12">
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition"
              >
                Prikaži sve događaje ({filtered.length})
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Nema mogu pronaći?</h2>
            <p className="text-gray-300 font-light text-lg">
              Kontaktiraj nas za privatne grupne događaje, prilagođene izlete ili posebne zahtjeve
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300"
            >
              Kontaktiraj nas
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border border-yellow-600 text-yellow-600 font-light hover:bg-yellow-600/10 transition duration-300"
            >
              Početna
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
