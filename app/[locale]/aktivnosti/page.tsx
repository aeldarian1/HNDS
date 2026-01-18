'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Calendar, MapPin, Users, Music, Globe } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import dynamic from 'next/dynamic';
import {
  HeroFadeIn,
  FadeIn,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { FilterableList } from '@/app/components/ui/FilterableList';
import type { FilterOption } from '@/app/components/ui/FilterableList';

const EventCalendar = dynamic(
  () => import('@/app/components/EventCalendar').then(mod => ({ default: mod.EventCalendar })),
  { 
    ssr: false, 
    loading: () => (
      <div className="min-h-[300px] bg-slate-900/50 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Učitavanje kalendara...</span>
      </div>
    )
  }
);

const activities = [
  {
    id: 1,
    title: 'Tečajevi njemačkog jezika',
    type: 'courses',
    category: 'Tečajevi jezika',
    description: 'Stručno vodena nastava njemačkog jezika za sve razine - od početnika do naprednih. Programi prilagođeni različitim dobnim skupinama i potrebama.',
    icon: BookOpen,
    gradient: 'from-blue-600/20 to-blue-800/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-600/30 hover:border-blue-500',
  },
  {
    id: 2,
    title: 'Kulturni događaji i izložbe',
    type: 'events',
    category: 'Događaji',
    description: 'Organizacija kulturnih događanja, izložbi slika, fotografija, književnih večeri, koncerta i predavanja koja promiču hrvatsko-njemačku kulturu.',
    icon: Music,
    gradient: 'from-yellow-600/20 to-yellow-800/20',
    iconColor: 'text-yellow-500',
    borderColor: 'border-yellow-600/30 hover:border-yellow-500',
  },
  {
    id: 3,
    title: 'Izleti i putovanja',
    type: 'excursions',
    category: 'Izleti',
    description: 'Organizirani izleti po Hrvatskoj i Njemačkoj - upoznavanje kulturne baštine, znamenitosti i tradicije. Berlin, Sinj, Cetinska krajina, Brač, Makarska Rivijera.',
    icon: MapPin,
    gradient: 'from-emerald-600/20 to-emerald-800/20',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-600/30 hover:border-emerald-500',
  },
  {
    id: 4,
    title: 'Društvena okupljanja',
    type: 'social',
    category: 'Društveni događaji',
    description: 'Redovita druženja članova, proslave blagdana, obilježavanje Dana grada Splita, Dan njemačkog jedinstva i posebnih prigoda s prijateljima iz Berlina.',
    icon: Users,
    gradient: 'from-purple-600/20 to-purple-800/20',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-600/30 hover:border-purple-500',
  },
  {
    id: 5,
    title: 'Međunarodna suradnja',
    type: 'cultural',
    category: 'Kultura',
    description: 'Partnerstva s njemačkim institucijama, gradovima i društvima. 55 godina prijateljstva Split-Berlin, suradnja s Veleposlanstvom SR Njemačke.',
    icon: Globe,
    gradient: 'from-pink-600/20 to-pink-800/20',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-600/30 hover:border-pink-500',
  },
];

// Activity type
interface Activity {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  icon: typeof BookOpen;
  gradient: string;
  iconColor: string;
  borderColor: string;
}

// Filter configuration
const filters: FilterOption[] = [
  { value: 'all', label: 'Sve', count: activities.length },
  { value: 'courses', label: 'Tečajevi', count: activities.filter(a => a.type === 'courses').length },
  { value: 'events', label: 'Događaji', count: activities.filter(a => a.type === 'events').length },
  { value: 'excursions', label: 'Izleti', count: activities.filter(a => a.type === 'excursions').length },
  { value: 'social', label: 'Društveni', count: activities.filter(a => a.type === 'social').length },
  { value: 'cultural', label: 'Kulturni', count: activities.filter(a => a.type === 'cultural').length },
];

// Activity card component
function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const Icon = activity.icon;
  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <MotionCard
        className={`bg-gradient-to-br ${activity.gradient} border ${activity.borderColor} p-5 sm:p-6 md:p-8 h-full flex flex-col active:scale-[0.98] transition-transform`}
        hoverY={-8}
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
          <div className={`p-2.5 sm:p-3 rounded-lg bg-slate-900/50 ${activity.iconColor}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <Badge variant="secondary" size="sm" className="text-[10px] sm:text-xs">
            {activity.category}
          </Badge>
        </div>
        <h3 className="text-lg sm:text-xl font-light text-white mb-2 sm:mb-3">{activity.title}</h3>
        <p className="text-gray-300 font-light text-sm mb-4 sm:mb-6 flex-grow leading-relaxed line-clamp-3 sm:line-clamp-none">
          {activity.description}
        </p>
        <Link 
          href="#" 
          className="text-yellow-500 font-light text-sm hover:text-yellow-400 transition inline-flex items-center gap-2 group min-h-[44px] items-center"
        >
          Saznaj više 
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </MotionCard>
    </motion.div>
  );
}

export default function AktivnostiPage() {

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-4 sm:space-y-6 max-w-3xl">
            <Badge variant="outline" className="mb-2 sm:mb-4">
              <Calendar className="w-3 h-3 mr-1" />
              {activities.length} aktivnosti
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight">
              Aktivnosti
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Naši događaji i programi
            </p>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Event Calendar */}
      <Section className="bg-slate-900 border-y border-yellow-600/30">
        <Container>
          <FadeIn>
            <SectionHeader
              title="Kalendar aktivnosti"
              subtitle="Pogledajte nadolazeće tečajeve, događaje i izlete"
              centered
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <EventCalendar />
          </FadeIn>
        </Container>
      </Section>

      {/* Activities Grid */}
      <Section>
        <Container>
          <FilterableList<Activity>
            items={activities}
            filterOptions={filters}
            filterKey="type"
            searchKeys={['title', 'description']}
            searchPlaceholder="Pretraži aktivnosti..."
            filterLabel="Filtriraj aktivnosti"
            gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            renderItem={(activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            )}
          />
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-900 border-t border-yellow-600/30">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white">
              Želite sudjelovati?
            </h2>
            <p className="text-gray-300 font-light text-base sm:text-lg">
              Pridružite se našim aktivnostima i postanite dio zajednice koja njeguje hrvatsko-njemačke veze.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto min-h-[48px]">
                <Link href="/membership">Postanite član</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px]">
                <Link href="/kontakt">Kontaktirajte nas</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
