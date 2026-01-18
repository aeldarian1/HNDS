'use client';

import Image from 'next/image';
import { MapPin, Users, BookOpen, Globe, Award, Building2, LucideIcon } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  Container,
  Section,
  SectionHeader,
  MotionCard,
  HeroFadeIn,
  FadeIn,
  SlideLeft,
  SlideRight,
  StaggerContainer,
  StaggerItem,
  Badge,
} from '@/app/components/ui';

// ==================== DATA DEFINITIONS ====================

interface LeadershipMember {
  name: string;
  role: string;
  icon: LucideIcon;
  image: string;
}

interface Branch {
  name: string;
  president: string;
  icon: LucideIcon;
  color: string;
  image: string;
}

// Leadership data
const leadership: LeadershipMember[] = [
  {
    name: 'Nikola Horvat',
    role: 'Predsjednik',
    icon: Award,
    image: '/images/leadership/nikola-horvat.avif',
  },
  {
    name: 'Dragutin Korlaet',
    role: 'Potpredsjednik',
    icon: Users,
    image: '/images/leadership/dragutin-korlaet.avif',
  },
  {
    name: 'Petar Fabijanović',
    role: 'Potpredsjednik',
    icon: Users,
    image: '/images/leadership/petar-fabjanovic.avif',
  },
  {
    name: 'Tomislav Drašković',
    role: 'Predsjednik Upravnog odbora',
    icon: Building2,
    image: '/images/leadership/tomislav-draskovic.avif',
  },
];

// Branches data
const branches: Branch[] = [
  {
    name: 'Ogranak Makarska',
    president: 'Herbert Buche',
    icon: MapPin,
    color: 'from-blue-600/20 to-cyan-600/20',
    image: '/images/cities/Makarska-Riviera-Kroatien-Tipps-e1726048350267.webp',
  },
  {
    name: 'Ogranak Brač',
    president: 'Petar Fabijanović',
    icon: Globe,
    color: 'from-emerald-600/20 to-green-600/20',
    image: '/images/cities/1679584344Island_of_Brac-e1726048476766.avif',
  },
  {
    name: 'Ogranak Sinj',
    president: 'U osnivanju',
    icon: BookOpen,
    color: 'from-purple-600/20 to-pink-600/20',
    image: '/images/cities/Slike-sa-snimanja-Grad-Sinj-2-2022-no-logo-27-1024x682-1.jpg.webp',
  },
];

// Stats data
const stats = [
  { value: '30+', label: 'Godina tradicije' },
  { value: '500+', label: 'Aktivnih članova' },
  { value: '50+', label: 'Godišnjih događanja' },
  { value: '5', label: 'Ogranaka' },
];

// Mission points
const missionPoints = [
  { icon: Users, title: 'Izgradnja zajednice', desc: 'Povezivanje ljudi koji dijele strast prema hrvatsko-njemačkoj kulturnoj razmjeni' },
  { icon: BookOpen, title: 'Edukacija', desc: 'Pružanje tečajeva njemačkog jezika i kulturnih obrazovnih programa' },
  { icon: Globe, title: 'Povezivanje', desc: 'Njegovanje međunarodnih veza i suradnje' },
];

// Partners data
const partners = [
  { name: 'AHK Hrvatska', image: '/images/partners/ahk_kroatien_njema_ko_hrvatska_industrijska_i_trgovinska_komora_logo.png' },
  { name: 'Grad Mainz', image: '/images/partners/Coat_of_arms_of_Mainz-2008_new.png' },
  { name: 'Grad Berlin', image: '/images/partners/Country_symbol_of_Berlin_color.png.webp' },
];

// ==================== COMPONENT ====================

export default function About() {

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* ==================== HERO SECTION ==================== */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <Container>
          <HeroFadeIn className="space-y-4 sm:space-y-6">
            <Badge variant="default" className="mb-2 sm:mb-4">
              Od 1990. godine
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light text-white text-balance">
              O nama
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl font-light">
              Hrvatsko-njemačko društvo Split
            </p>
            <div className="w-10 sm:w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* ==================== MISSION SECTION ==================== */}
      <Section variant="default" border padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <SlideLeft className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4">
                  Naša misija
                </h2>
                <div className="w-10 sm:w-12 h-px bg-yellow-600" />
              </div>

              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                Hrvatsko-njemačko društvo Split posvećeno je promicanju kulturne razmjene, obrazovanja i trajnog prijateljstva između Hrvatske i Njemačke.
              </p>

              {/* Quote */}
              <blockquote className="border-l-2 border-yellow-600 pl-4 sm:pl-6 py-3 sm:py-4">
                <p className="text-base sm:text-lg text-gray-300 font-light italic leading-relaxed mb-3 sm:mb-4">
                  &ldquo;Gradimo mostove razumijevanja i prijateljstva između naših naroda već više od tri desetljeća.&rdquo;
                </p>
                <footer>
                  <cite className="not-italic text-yellow-600 font-medium">
                    Nikola Horvat
                  </cite>
                  <p className="text-gray-400 text-sm">Predsjednik HNDS-a</p>
                </footer>
              </blockquote>

              {/* Mission Points */}
              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                {missionPoints.map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h3 className="font-medium text-white text-sm sm:text-base">{item.title}</h3>
                      <p className="text-gray-400 font-light text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SlideLeft>

            <SlideRight delay={0.2} className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/images/gallery/2318.avif"
                  alt="HNDS Split"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-600/10 rounded-lg -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-yellow-600/30 rounded-lg -z-10" />
            </SlideRight>
          </div>
        </Container>
      </Section>

      {/* ==================== STATS SECTION ==================== */}
      <Section variant="alternate" padding="md">
        <Container>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <StaggerItem key={i}>
                  <MotionCard variant="gradient" className="p-4 sm:p-6 text-center active:scale-[0.98] transition-transform" hoverY={-4}>
                    <div className="text-2xl sm:text-4xl md:text-5xl font-light text-yellow-500 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider font-light leading-tight">
                      {stat.label}
                    </div>
                  </MotionCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* ==================== LEADERSHIP SECTION ==================== */}
      <Section variant="default" border padding="lg">
        <Container>
          <FadeIn className="mb-8 sm:mb-12">
            <SectionHeader
              title="Vodstvo"
              subtitle="Upoznajte tim iza HNDS-a"
              align="center"
            />
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {leadership.map((person, i) => {
                const Icon = person.icon;
                return (
                  <StaggerItem key={i}>
                    <MotionCard variant="gradient" className="group overflow-hidden active:scale-[0.98] transition-transform" hoverY={-8}>
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        
                        {/* Icon Badge */}
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-yellow-600/20 backdrop-blur-sm rounded-lg border border-yellow-600/30">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4 md:p-6">
                        <h3 className="text-sm sm:text-lg md:text-xl font-light text-white group-hover:text-yellow-500 transition-colors line-clamp-2">
                          {person.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-yellow-600 font-light mt-0.5 sm:mt-1 line-clamp-1">{person.role}</p>
                      </div>
                    </MotionCard>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* ==================== BRANCHES SECTION ==================== */}
      <Section variant="alternate" border padding="lg">
        <Container>
          <FadeIn className="mb-8 sm:mb-12">
            <SectionHeader
              title="Naši ogranci"
              subtitle="Širimo kulturu diljem Dalmacije"
              align="center"
            />
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {branches.map((branch, i) => {
                const Icon = branch.icon;
                return (
                  <StaggerItem key={i}>
                    <MotionCard variant="gradient" className="group overflow-hidden h-full active:scale-[0.98] transition-transform" hoverY={-8}>
                      {/* Image */}
                      <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                        <Image
                          src={branch.image}
                          alt={branch.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${branch.color} mix-blend-overlay`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="p-1.5 sm:p-2 bg-yellow-600/20 rounded-lg">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-light text-white group-hover:text-yellow-500 transition-colors">
                            {branch.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 font-light">
                          <span className="text-gray-500">Predsjednik:</span>{' '}
                          {branch.president}
                        </p>
                      </div>
                    </MotionCard>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* ==================== PARTNERS SECTION ==================== */}
      <Section variant="default" padding="lg">
        <Container>
          <FadeIn className="mb-8 sm:mb-12">
            <SectionHeader
              title="Naši partneri"
              subtitle="Zajedno gradimo jače veze"
              align="center"
            />
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {partners.map((partner, i) => (
                <StaggerItem key={i}>
                  <MotionCard variant="outline" className="p-5 sm:p-6 md:p-8 flex flex-col items-center text-center h-full active:scale-[0.98] transition-transform" hoverY={-4}>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 sm:mb-6">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-light text-white">{partner.name}</h3>
                  </MotionCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
