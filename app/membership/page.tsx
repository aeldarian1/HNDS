'use client';

import Link from 'next/link';
import { Check, Users, Heart, Globe, BookOpen, Music, Star, Shield, Award } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Counter,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard, FeatureCard } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { FAQAccordion } from '@/app/components/ui/FAQAccordion';

const membershipTiers = [
  {
    id: 1,
    name: 'Osnovni član',
    price: '50',
    currency: 'kn',
    period: 'godišnje',
    description: 'Savršeno za one koji žele biti dio zajednice',
    benefits: [
      'Pristup svim javnim događajima',
      'Mjesečni newsletter',
      'Popusti na tečajeve jezika',
      'Pristup knjižnici',
      'Pozivnice na godišnju skupštinu',
    ],
    cta: 'Postani član',
    highlighted: false,
    icon: Users,
  },
  {
    id: 2,
    name: 'Premium član',
    price: '150',
    currency: 'kn',
    period: 'godišnje',
    description: 'Za aktivne članove koji žele više',
    benefits: [
      'Sve pogodnosti osnovnog članstva',
      'Besplatan pristup jednom tečaju',
      'Prioritetne prijave na izlete',
      'Ekskluzivni članovi događaji',
      'Popusti kod partnera',
      'Članska iskaznica s pogodnostima',
      'Pristup online resursima',
    ],
    cta: 'Postani premium',
    highlighted: true,
    icon: Star,
  },
  {
    id: 3,
    name: 'Pokrovitelj',
    price: '300',
    currency: 'kn',
    period: 'godišnje',
    description: 'Podržite naše aktivnosti i misiju',
    benefits: [
      'Sve premium pogodnosti',
      'Priznanje na web stranici',
      'VIP pristup događajima',
      'Godišnji poklon paket',
      'Direktan kontakt s vodstvom',
      'Utjecaj na programske odluke',
      'Posebne zahvalnice',
    ],
    cta: 'Postani pokrovitelj',
    highlighted: false,
    icon: Award,
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Povezanost zajednice',
    description: 'Pridružite se živahnoj zajednici entuzijasta hrvatske i njemačke kulture i gradite trajne prijateljstva.',
  },
  {
    icon: Heart,
    title: 'Ekskluzivni događaji',
    description: 'Pristupite događajima samo za članove, okupljanjima i proslavama tijekom godine.',
  },
  {
    icon: Globe,
    title: 'Kulturna razmjena',
    description: 'Sudjelujte u kulturnim radionicama, tečajevima jezika i edukativnim programima.',
  },
  {
    icon: BookOpen,
    title: 'Resursi i knjižnica',
    description: 'Pristupite članskoj knjižnici s knjigama, člancima i resursima o njemačkoj kulturi.',
  },
  {
    icon: Music,
    title: 'Kulturni programi',
    description: 'Uživajte u sniženim ulaznicama za koncerte, izložbe i kulturne nastupe.',
  },
  {
    icon: Shield,
    title: 'Umrežavanje',
    description: 'Povežite se s istomišljenim pojedincima i proširite svoju profesionalnu mrežu.',
  },
];

const faqs = [
  {
    question: 'Kako se mogu učlaniti?',
    answer: 'Učlaniti se možete ispunjavanjem online obrasca ili osobno u našim prostorijama. Nakon prijave, primit ćete potvrdu i upute za plaćanje članarine.',
  },
  {
    question: 'Mogu li nadograditi članstvo?',
    answer: 'Da, možete nadograditi svoje članstvo u bilo kojem trenutku. Razlika u cijeni bit će proporcionalno obračunata za preostalo razdoblje.',
  },
  {
    question: 'Postoje li popusti za obitelji?',
    answer: 'Da, nudimo obiteljski paket s 20% popusta za dodatne članove iste obitelji. Kontaktirajte nas za više informacija.',
  },
  {
    question: 'Kako mogu koristiti pogodnosti kod partnera?',
    answer: 'Nakon učlanjenja dobit ćete člansku iskaznicu koju možete pokazati kod naših partnera za ostvarivanje popusta.',
  },
  {
    question: 'Što ako ne mogu prisustvovati događajima?',
    answer: 'Mnogi naši sadržaji dostupni su online. Također, snimke predavanja i materijali dostupni su članovima putem našeg portala.',
  },
  {
    question: 'Mogu li otkazati članstvo?',
    answer: 'Članstvo je na godišnjoj bazi i automatski se obnavlja. Otkazivanje je moguće 30 dana prije isteka tekućeg razdoblja.',
  },
];

export default function MembershipPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(234,179,8,0.1),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-6 max-w-3xl text-center mx-auto">
            <Badge variant="outline" className="mb-4">
              <Users className="w-3 h-3 mr-1" />
              Članstvo
            </Badge>
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
              Postanite član
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
              Pridružite se našoj zajednici i uživajte u brojnim pogodnostima članstva u Hrvatsko-njemačkom društvu Split.
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Stats */}
      <Section className="bg-slate-900 border-b border-yellow-600/30 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeIn>
              <Counter to={500} suffix="+" className="text-4xl md:text-5xl font-light text-yellow-500" />
              <p className="text-gray-400 font-light mt-2">Aktivnih članova</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Counter to={30} suffix="+" className="text-4xl md:text-5xl font-light text-yellow-500" />
              <p className="text-gray-400 font-light mt-2">Godina tradicije</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Counter to={50} suffix="+" className="text-4xl md:text-5xl font-light text-yellow-500" />
              <p className="text-gray-400 font-light mt-2">Godišnjih događanja</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Counter to={15} suffix="+" className="text-4xl md:text-5xl font-light text-yellow-500" />
              <p className="text-gray-400 font-light mt-2">Partnerskih organizacija</p>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Membership Tiers */}
      <Section>
        <Container>
          <FadeIn>
            <SectionHeader
              title="Odaberite članstvo"
              subtitle="Pronađite paket koji odgovara vašim potrebama"
              centered
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {membershipTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <StaggerItem key={tier.id}>
                  <MotionCard
                    className={`relative h-full flex flex-col p-8 border ${
                      tier.highlighted
                        ? 'border-yellow-500 bg-gradient-to-b from-yellow-600/10 to-slate-900/50'
                        : 'border-yellow-600/20 bg-slate-900/50'
                    }`}
                    hoverY={-8}
                  >
                    {tier.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge variant="primary">Najpopularnije</Badge>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        tier.highlighted ? 'bg-yellow-600' : 'bg-yellow-600/20'
                      }`}>
                        <Icon className={`w-8 h-8 ${tier.highlighted ? 'text-white' : 'text-yellow-500'}`} />
                      </div>
                      <h3 className="text-2xl font-light text-white mb-2">{tier.name}</h3>
                      <p className="text-gray-400 font-light text-sm">{tier.description}</p>
                    </div>

                    <div className="text-center mb-8">
                      <span className="text-5xl font-light text-white">{tier.price}</span>
                      <span className="text-gray-400 font-light ml-1">{tier.currency}/{tier.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 font-light text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={tier.highlighted ? 'default' : 'outline'}
                      className="w-full"
                      asChild
                    >
                      <Link href="/kontakt">{tier.cta}</Link>
                    </Button>
                  </MotionCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="bg-slate-900 border-y border-yellow-600/30">
        <Container>
          <FadeIn>
            <SectionHeader
              title="Pogodnosti članstva"
              subtitle="Što dobivate učlanjenjem u naše društvo"
              centered
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <FeatureCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <FadeIn>
            <SectionHeader
              title="Česta pitanja"
              subtitle="Odgovori na najčešća pitanja o članstvu"
              centered
            />
          </FadeIn>

          <div className="max-w-3xl mx-auto mt-12">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-yellow-600/30">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-light text-white">
              Spremni za pridruživanje?
            </h2>
            <p className="text-gray-300 font-light text-lg">
              Kontaktirajte nas danas i postanite dio naše zajednice.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/kontakt">Kontaktirajte nas</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/o-nama">Saznajte više</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
