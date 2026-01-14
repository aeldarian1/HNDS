'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { FadeIn, HeroFadeIn, StaggerContainer, StaggerItem } from '@/app/components/AnimatedSection';

export default function VijestiPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const news = [
    {
      id: 1,
      title: '•',
      excerpt: '•',
      date: '2026-01-14',
      author: '•',
      category: 'events',
      slug: 'vijest-1',
      image: '[Event Image]',
    },
    {
      id: 2,
      title: '•',
      excerpt: '•',
      date: '2026-01-10',
      author: '•',
      category: 'news',
      slug: 'vijest-2',
      image: '[Event Image]',
    },
    {
      id: 3,
      title: '•',
      excerpt: '•',
      date: '2026-01-05',
      author: '•',
      category: 'announcement',
      slug: 'vijest-3',
      image: '[Event Image]',
    },
    {
      id: 4,
      title: '•',
      excerpt: '•',
      date: '2025-12-28',
      author: '•',
      category: 'events',
      slug: 'vijest-4',
      image: '[Event Image]',
    },
    {
      id: 5,
      title: '•',
      excerpt: '•',
      date: '2025-12-20',
      author: '•',
      category: 'news',
      slug: 'vijest-5',
      image: '[Event Image]',
    },
    {
      id: 6,
      title: '•',
      excerpt: '•',
      date: '2025-12-15',
      author: '•',
      category: 'announcement',
      slug: 'vijest-6',
      image: '[Event Image]',
    },
  ];

  const categories = [
    { value: 'all', label: 'Sve vijesti' },
    { value: 'news', label: 'Novosti' },
    { value: 'events', label: 'Događaji' },
    { value: 'announcement', label: 'Obavijesti' },
  ];

  const filtered = selectedCategory === 'all' 
    ? news 
    : news.filter(n => n.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'events':
        return 'bg-yellow-600/20 text-yellow-600';
      case 'news':
        return 'bg-blue-600/20 text-blue-400';
      case 'announcement':
        return 'bg-emerald-600/20 text-emerald-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'events':
        return 'Događaj';
      case 'news':
        return 'Novost';
      case 'announcement':
        return 'Obavijest';
      default:
        return 'Vijest';
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
    <main className="bg-slate-950">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-white">Vijesti</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Pratite najnovije obavijesti, događaje i zanimljivosti iz našeg društva
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Category filters */}
          <FadeIn className="mb-12 flex flex-wrap gap-3">
            {categories.map(cat => (
              <motion.button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 font-light transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-yellow-600 text-white'
                    : 'border border-yellow-600/30 text-gray-300 hover:border-yellow-600'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </FadeIn>

          {/* News grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((article, i) => (
              <StaggerItem key={article.id}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-gray-600 text-sm font-light">
                    {article.image}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-light uppercase tracking-wide px-3 py-1 rounded ${getCategoryColor(article.category)}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-light">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </div>
                    </div>

                    <h3 className="text-2xl font-light text-white mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-400 font-light text-sm mb-6 flex-grow line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between pt-6 border-t border-yellow-600/20">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <Link 
                        href={`/vijesti/${article.slug}`}
                        className="text-yellow-600 hover:text-yellow-500 transition inline-flex items-center gap-2 text-sm font-light"
                      >
                        Pročitaj više
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 font-light text-lg">Nema vijesti u toj kategoriji</p>
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
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Pratite nas</h2>
            <p className="text-gray-300 font-light text-lg">
              Prijavite se na našu newsletter za najnovije vijesti i obavijesti
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
              href="/aktivnosti"
              className="px-8 py-3 border border-yellow-600 text-yellow-600 font-light hover:bg-yellow-600/10 transition duration-300"
            >
              Pogledaj aktivnosti
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
