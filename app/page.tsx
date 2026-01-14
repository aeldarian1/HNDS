"use client";
import { ChevronRight, Calendar, Users, Zap, Globe, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { HeroFadeIn, FadeIn, StaggerContainer, StaggerItem, SlideLeft, SlideRight, ScaleIn } from "./components/AnimatedSection";
import {
  Container,
  Section,
  HeroSection,
  TwoColumnLayout,
  ResponsiveGrid,
  Card,
  FeatureCard,
  TextBlock,
  Badge,
  Stack,
  Divider,
  AspectBox,
} from "./components/LayoutComponents";
export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection background="pattern">
        <Container size="lg" className="py-20 relative z-10">
          <HeroFadeIn>
            <TwoColumnLayout
              left={
                <div className="space-y-8">
                  <HeroFadeIn delay={0.15}>
                    <Badge variant="primary" className="inline-block">
                      •
                    </Badge>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-white mb-6 mt-6">
                      Most između
                      <br />
                      <span className="font-serif italic bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                        kultura
                      </span>
                    </h1>
                  </HeroFadeIn>

                  <HeroFadeIn delay={0.3} className="text-xl text-gray-300 font-light leading-relaxed max-w-lg">
                    Promoviranje kulturnih, jezičnih i prijateljskih veza između Hrvatske i Njemačke kroz tečajeve jezika, kulturne događaje, izlete i radionice.
                  </HeroFadeIn>

                  <HeroFadeIn delay={0.45}>
                    <Stack direction="horizontal" gap="md" align="start">
                      <Link 
                        href="/#events" 
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-shadow duration-300"
                      >
                        Istraži događaje 
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link 
                        href="/about" 
                        className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
                      >
                        Saznaj više 
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Stack>
                  </HeroFadeIn>

                  {/* Stats */}
                  <HeroFadeIn delay={0.6} className="grid grid-cols-3 gap-8 pt-8 border-t border-yellow-600/20">
                    {[
                      { value: "35+", label: "Godina" },
                      { value: "500+", label: "Članova" },
                      { value: "6", label: "Lokacija" }
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="text-3xl font-light text-yellow-500 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </HeroFadeIn>
                </div>
              }
              right={
                <HeroFadeIn delay={0.4} className="relative hidden lg:block">
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 backdrop-blur-3xl rounded-3xl" />
                    <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center overflow-hidden">
                      <div className="text-center space-y-4 p-8">
                        <Globe className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-light text-white">Hrvatski ↔ Deutsch</h3>
                        <p className="text-gray-400 text-sm">Povezujemo ljude i kulture</p>
                      </div>
                    </div>
                  </div>
                </HeroFadeIn>
              }
              gap="lg"
            />
          </HeroFadeIn>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </HeroSection>
      
      {/* Featured Works Section */}
      <Section background="gradient" py="lg">
        <Container>
          <FadeIn className="text-center mb-20 space-y-8">
            <Badge variant="primary" className="inline-block">
              •
            </Badge>
            <h2 className="text-4xl md:text-6xl font-light text-white">
              
              <br />
              <span className="font-serif italic text-yellow-500"></span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              
            </p>
          </FadeIn>

          <StaggerContainer>
            <ResponsiveGrid columns="3" gap="lg">
              {[
                { 
                  title: "", 
                  desc: "",
                  icon: BookOpen,
                },
                { 
                  title: "", 
                  desc: "",
                  icon: Calendar,
                },
                { 
                  title: "", 
                  desc: "",
                  icon: MapPin,
                },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <FeatureCard 
                    icon={item.icon}
                    title={item.title}
                    description={item.desc}
                  />
                </StaggerItem>
              ))}
            </ResponsiveGrid>
          </StaggerContainer>
        </Container>
      </Section>
      
      {/* About Section */}
      <Section id="about" py="lg">
        <Container>
          <SlideLeft>
            <TwoColumnLayout
              left={
                <div className="space-y-8">
                  <div>
                    <Badge variant="primary" className="inline-block mb-6">
                      •
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-light text-white">
                      
                      <br />
                      <span className="font-serif italic text-yellow-500"></span>
                    </h2>
                  </div>

                  <TextBlock size="md">
                    <p>
                      
                    </p>
                    <p>
                      
                    </p>
                    <p>
                      
                    </p>
                  </TextBlock>

                  {/* Key Benefits */}
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    {[
                      { label: "Jezična edukacija", icon: BookOpen },
                      { label: "Kulturna razmjena", icon: Globe },
                      { label: "Putovanja", icon: MapPin },
                      { label: "Društveni događaji", icon: Users },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="text-yellow-500"><item.icon className="w-5 h-5" /></div>
                        <span className="text-sm font-light">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Pročitaj cijelu priču 
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              }
              right={
                <SlideRight>
                  <div className="relative aspect-[4/5]">
                    <div className="absolute -inset-4 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-3xl blur-2xl" />
                    <div className="relative h-full bg-slate-900/80 backdrop-blur-sm border border-yellow-600/30 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-yellow-600/20 flex items-center justify-center">
                        <Globe className="w-10 h-10 text-yellow-500" />
                      </div>
                      <h3 className="text-3xl font-light text-white">35+ godina</h3>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Kontinuirano djelovanje u službi kulturnog povezivanja Hrvatske i Njemačke
                      </p>
                      <div className="pt-4 flex gap-8">
                        <div>
                          <div className="text-2xl font-light text-yellow-500">6</div>
                          <div className="text-xs text-gray-500 uppercase">Lokacija</div>
                        </div>
                        <div>
                          <div className="text-2xl font-light text-yellow-500">500+</div>
                          <div className="text-xs text-gray-500 uppercase">Članova</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideRight>
              }
              gap="lg"
            />
          </SlideLeft>
        </Container>
      </Section>
      
      {/* Statistics Section */}
      <Section background="gradient" py="lg">
        <Container>
          <StaggerContainer>
            <ResponsiveGrid columns="3" gap="lg">
              {[
                { number: "35+", label: "Godina tradicije", icon: Zap, desc: "Kontinuirano djelovanje" },
                { number: "500+", label: "Aktivnih članova", icon: Users, desc: "U 6 lokacija" },
                { number: "55", label: "Godina partnerstva", icon: Globe, desc: "Split ↔ Berlin" },
              ].map((stat, i) => (
                <StaggerItem key={i}>
                  <Card className="text-center">
                    <stat.icon className="w-10 h-10 mx-auto text-yellow-500 mb-6" />
                    <div className="text-5xl md:text-6xl font-light text-yellow-500 mb-3">
                      {stat.number}
                    </div>
                    <p className="text-white font-light text-lg mb-2">
                      {stat.label}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {stat.desc}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </ResponsiveGrid>
          </StaggerContainer>
        </Container>
      </Section>
      
      {/* Berlin Partnership Section */}
      <Section py="lg">
        <Container>
          <SlideLeft>
            <TwoColumnLayout
              left={
                <div className="space-y-8">
                  <div>
                    <Badge variant="primary" className="inline-block mb-6">
                      •
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-light text-white">
                      
                      <br />
                      <span className="font-serif italic text-yellow-500"></span>
                    </h2>
                  </div>

                  <TextBlock>
                    •
                  </TextBlock>

                  <div className="space-y-4">
                    {[
                      { title: "", desc: "", icon: Globe },
                      { title: "", desc: "", icon: BookOpen },
                      { title: "", desc: "", icon: Calendar },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 border-l-2 border-yellow-600/50 hover:border-yellow-600 hover:bg-yellow-600/5 transition-all duration-300">
                        <div className="text-yellow-500"><item.icon className="w-5 h-5" /></div>
                        <div>
                          <h3 className="text-lg font-light text-white">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href="/kronike" 
                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
                  >
                    Kronike partnerstva
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              }
              right={
                <SlideRight>
                  <div className="relative aspect-square">
                    <div className="absolute -inset-8 bg-gradient-to-br from-yellow-600/30 via-yellow-500/20 to-transparent rounded-3xl blur-3xl" />
                    <div className="relative h-full bg-slate-900/80 backdrop-blur-sm border border-yellow-600/30 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-12 text-center space-y-6">
                      <div className="w-24 h-24 rounded-full bg-yellow-600/20 border-2 border-yellow-600/40 flex items-center justify-center">
                        <Globe className="w-12 h-12 text-yellow-500" />
                      </div>
                      <h3 className="text-5xl font-light text-white">
                        Split <span className="text-yellow-500">↔</span> Berlin
                      </h3>
                      <div className="inline-flex items-center gap-4">
                        <div className="text-4xl font-light text-yellow-500">55</div>
                        <div className="text-left">
                          <div className="text-sm text-gray-400">godina</div>
                          <div className="text-white font-light">Partnerstva</div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Charlottenburg-Wilmersdorf</p>
                    </div>
                  </div>
                </SlideRight>
              }
              gap="lg"
            />
          </SlideLeft>
        </Container>
      </Section>
      {/* Activities Section - Refreshed Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
              •
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              
              <br />
              <span className="font-serif italic text-yellow-500"></span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "", description: "", color: "from-yellow-600/20" },
              { icon: Globe, title: "", description: "", color: "from-yellow-500/20" },
              { icon: Users, title: "", description: "", color: "from-yellow-600/15" },
              { icon: MapPin, title: "", description: "", color: "from-yellow-500/15" },
            ].map((activity, i) => (
              <StaggerItem key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} to-transparent rounded-2xl blur-xl opacity-0`} />
                <div className="relative bg-slate-900/60 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-6 h-full">
                  <activity.icon className="w-10 h-10 text-yellow-500 mb-6" />
                  <h3 className="text-xl font-light text-white mb-3">{activity.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{activity.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      {/* Events Section - Modern Event Cards */}
      <section id="events" className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
              •
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              
              <br />
              <span className="font-serif italic text-yellow-500"></span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              { date: "", title: "", location: "", icon: Globe },
              { date: "", title: "", location: "", icon: Calendar },
              { date: "", title: "", location: "", icon: MapPin },
            ].map((event, i) => (
              <StaggerItem key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500">
                      <event.icon className="w-6 h-6" />
                    </div>
                    <span className="text-yellow-500 font-medium text-sm uppercase tracking-wider">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 leading-snug">
                    {event.title}
                  </h3>
                  <p className="flex items-center gap-2 text-gray-400 font-light text-sm">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                  <div className="mt-6 pt-6 border-t border-yellow-600/20">
                    <Link 
                      href="/events" 
                      className="inline-flex items-center gap-2 text-yellow-500 text-sm font-medium"
                    >
                      Više detalja
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn className="text-center">
            <Link 
              href="/events" 
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
            >
              Pogledaj sve događaje
              <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
      {/* Call to Action - Modern Gradient Design */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-yellow-950/20"></div>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>
        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
          <FadeIn className="space-y-8">
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest">
              •
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
              
              <br />
              <span className="font-serif italic bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-6 pt-8">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-base font-medium hover:shadow-2xl hover:shadow-yellow-600/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Postani član
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-yellow-600/50 text-white text-base font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
            >
              Kontaktirajte nas
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
          {/* Features grid */}
          <FadeIn delay={0.3} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-yellow-600/20">
            {[
              { icon: <BookOpen className="w-6 h-6" />, label: "" },
              { icon: <Calendar className="w-6 h-6" />, label: "" },
              { icon: <MapPin className="w-6 h-6" />, label: "" },
              { icon: <Users className="w-6 h-6" />, label: "" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <div className="text-yellow-500">{item.icon}</div>
                <span className="text-sm font-light text-center">{item.label}</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  );
}
