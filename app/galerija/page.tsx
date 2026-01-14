'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { FadeIn, HeroFadeIn, StaggerContainer, StaggerItem } from '@/app/components/AnimatedSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function GalerijaPage() {
  const galleryCategories = [
    { name: '2025', slug: '2025', count: '12' },
    { name: '2024', slug: '2024', count: '18' },
    { name: '2023', slug: '2023', count: '15' },
    { name: 'Events', slug: 'events', count: '24' },
    { name: 'Školske aktivnosti', slug: 'skolske-aktivnosti', count: '10' },
    { name: 'Putovanja', slug: 'putovanja', count: '8' },
  ];

  return (
    <main className="bg-slate-950">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-white">Galerija</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Pogledajte fotogafije iz naših događaja i aktivnosti
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryCategories.map((category, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-lg border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 h-64"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-yellow-600/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-light text-yellow-600">{category.count}</span>
                      </div>
                      <h3 className="text-2xl font-light text-white">{category.name}</h3>
                      <p className="text-gray-400 font-light text-sm">fotografija</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link 
                      href={`/galerija/${category.slug}`}
                      className="flex items-center gap-2 text-yellow-600 hover:text-yellow-500 transition font-light"
                    >
                      Pogledaj <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Podijelite sa nama</h2>
            <p className="text-gray-300 font-light text-lg">
              Imate interesantnu fotografiju? Pošaljite nam je!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/kontakt"
              className="px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300 inline-flex items-center gap-2"
            >
              Kontaktiraj nas <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
