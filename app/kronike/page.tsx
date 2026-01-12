'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { ChronicleBadge } from '@/app/components/ChronicleBadge';
import chronicles from '@/data/chronicles.json';

export default function ChroniclesPage() {
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  // Get unique decades
  const decades = Array.from(
    new Set(
      chronicles.map(c => Math.floor(new Date(c.date).getFullYear() / 10) * 10)
    )
  ).sort((a, b) => b - a);

  // Filter chronicles by decade
  const filteredChronicles = selectedDecade === 'all'
    ? chronicles
    : chronicles.filter(c => {
        const year = new Date(c.date).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        return decade.toString() === selectedDecade;
      });

  // Calculate statistics
  const years = chronicles.map(c => new Date(c.date).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearSpan = maxYear - minYear + 1;
  return (
    <main className="bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-yellow-600" />
              <h1 className="text-6xl md:text-7xl font-light text-white">Kronike</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl font-light">
              Povijesni zapis naših aktivnosti i događanja kroz godine. 
              Otkrijte bogatu povijest Hrvatsko-njemačkog društva Split od 1990. godine.
            </p>
            {/* Statistics */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-white">{chronicles.length}</span>
                <span>izdanja</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">📚</span>
                <span>{minYear} - {maxYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span>{yearSpan} godina povijesti</span>
              </div>
            </div>
            
            {/* Year Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedDecade('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDecade === 'all'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                Sve ({chronicles.length})
              </button>
              {decades.map(decade => {
                const count = chronicles.filter(c => {
                  const year = new Date(c.date).getFullYear();
                  return Math.floor(year / 10) * 10 === decade;
                }).length;
                return (
                  <button
                    key={decade}
                    onClick={() => setSelectedDecade(decade.toString())}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDecade === decade.toString()
                        ? 'bg-yellow-600 text-white'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    {decade}e ({count})
                  </button>
                );
              })}
            </div>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>
        </div>
      </section>

      {/* Chronicles Grid */}
      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {filteredChronicles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nema kronika za odabrano razdoblje.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChronicles.map((chronicle, index) => (
              <motion.div
                key={chronicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/kronike/${chronicle.slug}`}
                  className="group block bg-slate-900 border border-yellow-600/30 hover:border-yellow-600 transition duration-300 overflow-hidden h-full"
                >
                  {/* Chronicle Cover */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center p-6">
                    <ChronicleBadge
                      number={chronicle.title.match(/#(\d+)/)?.[1] || '?'}
                      year={new Date(chronicle.date).getFullYear().toString()}
                      className="w-40 h-40 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Chronicle Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                      <span>{chronicle.formattedDate}</span>
                    </div>

                    <h3 className="text-xl font-light text-white group-hover:text-yellow-600 transition line-clamp-2">
                      {chronicle.title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&')}
                    </h3>

                    {chronicle.description && (
                      <p className="text-gray-400 font-light text-sm line-clamp-3">
                        {chronicle.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-yellow-600 text-sm font-light pt-2">
                      Pročitaj kroniku
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* About Chronicles Section */}
      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white">
              O našim kronikama
            </h2>
            
            <div className="space-y-6 text-gray-300 font-light text-lg max-w-3xl mx-auto text-left">
              <p>
                HD Kronike su povijesni zapis aktivnosti Hrvatsko-njemačkog društva Split. 
                Svako izdanje dokumentira događaje, susrete, kulturne razmjene i projekte 
                koji su obilježili rad našeg društva kroz godine.
              </p>
              
              <p>
                Od osnivanja 1990. godine, naše društvo potiče kulturnu suradnju između 
                Hrvatske i Njemačke. Kronike čuvaju uspomene na brojne prijateljstva, 
                putovanja, kulturne manifestacije i obrazovne programe koji su povezali 
                naše dvije zemlje.
              </p>

              <p>
                Pregledajte kronike i otkrijte kako je Društvo raslo i razvijalo se kroz 
                desetljeća, doprinoseći međunarodnoj suradnji i kulturnom obogaćivanju 
                zajednice.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <a
                href="/about"
                className="inline-block px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition border border-yellow-600"
              >
                Saznaj više o nama
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
