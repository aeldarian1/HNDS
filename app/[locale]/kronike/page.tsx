'use client';

import Link from 'next/link';
import { BookOpen, Calendar, TrendingUp } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  HeroFadeIn,
  FadeIn,
} from '@/app/components/ui/Animations';
import { Container, Section, Badge } from '@/app/components/ui/Common';
import { Button } from '@/app/components/ui/Button';
import { ChronicleFilterList } from '@/app/components/ui/ChronicleFilterList';
import chronicles from '@/data/chronicles.json';

// Calculate statistics
const years = chronicles.map(c => new Date(c.date).getFullYear());
const minYear = Math.min(...years);
const maxYear = Math.max(...years);
const yearSpan = maxYear - minYear + 1;

export default function ChroniclesPage() {

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

      {/* Chronicle List with Filters */}
      <Section>
        <Container>
          <ChronicleFilterList chronicles={chronicles} />
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
