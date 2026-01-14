"use client";

import { motion } from "framer-motion";
import { MapPin, Users, BookOpen, Globe, Calendar, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { HeroFadeIn, FadeIn, SlideLeft, SlideRight, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import { RevealOnScroll, ScaleOnHover } from "../components/InteractiveElements";
import { useI18n } from "@/app/context/I18nContext";

export default function About() {
  const { t } = useI18n();
  const chapters = [
    { name: "Split", location: "", description: "", icon: MapPin },
    { name: "Makarska", location: "", description: "", icon: Users },
    { name: "Brač", location: "", description: "", icon: Globe },
    { name: "Sinj", location: "", description: "", icon: BookOpen },
    { name: "Trogir", location: "", description: "", icon: MapPin },
    { name: "Berlin", location: "", description: "", icon: Globe },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-light text-white">{t("pages.about.title")}</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              {t("pages.about.subtitle")}
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </HeroFadeIn>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SlideLeft className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naša misija</h2>
                <div className="w-12 h-px bg-yellow-600" />
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  •
                </p>

                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  •
                </p>

                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  •
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <Users className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Zajednica</h3>
                      <p className="text-gray-300 font-light">Okupljanje ljudi preko granica i jezika</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Učenje</h3>
                      <p className="text-gray-300 font-light">Jezični tečajevi, predavanja i kulturne radionice</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Veza</h3>
                      <p className="text-gray-300 font-light">Međunarodno prijateljstvo i suradnja između naroda</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideLeft>

            <SlideRight className="h-96 md:h-[500px] relative overflow-hidden rounded-lg">
              {/* Decorative background with floating elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                {/* Animated grid pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Floating icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute top-1/4 left-1/4"
                      animate={{
                        y: [-20, 20, -20],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Calendar className="w-16 h-16 text-yellow-600/40" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute top-1/3 right-1/4"
                      animate={{
                        y: [20, -20, 20],
                        rotate: [5, -5, 5],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="w-20 h-20 text-yellow-600/30" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-1/3 left-1/3"
                      animate={{
                        y: [-15, 15, -15],
                        rotate: [-3, 3, -3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-14 h-14 text-yellow-600/50" />
                    </motion.div>
                    
                    {/* Central logo */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-3xl" />
                        <Globe className="w-32 h-32 text-yellow-600 relative z-10" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/80" />
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naša povijest</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </FadeIn>

          <StaggerContainer>
            {[
              { year: "1990", title: "•", description: "•" },
              { year: "2000", title: "•", description: "•" },
              { year: "2010", title: "•", description: "•" },
              { year: "2024", title: "•", description: "•" },
            ].map((item, i) => (
              <StaggerItem key={i} className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-600 text-white flex items-center justify-center font-light rounded-full">
                    {item.year.slice(-2)}
                  </div>
                  {i < 3 && <div className="w-px h-20 bg-yellow-600/30 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-light text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 font-light">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naše podružnice</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, i) => (
              <StaggerItem key={i}>
                  <div className="border border-yellow-600/30 p-8 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300 h-full">
                    <div className="mb-4">
                      <chapter.icon className="w-8 h-8 text-yellow-600 mb-4" />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-2">{chapter.name}</h3>
                    <p className="text-sm text-yellow-600 font-light uppercase tracking-wide mb-3">
                      {chapter.location}
                    </p>
                    <p className="text-gray-300 font-light">{chapter.description}</p>
                  </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">•</h2>
            <div className="w-12 h-px bg-yellow-600 mx-auto" />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "•", description: "•" },
              { title: "•", description: "•" },
              { title: "•", description: "•" },
            ].map((value, i) => (
              <StaggerItem key={i} className="text-center space-y-4">
                <h3 className="text-2xl font-light text-white">{value.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{value.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-yellow-600 text-white border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-light mb-4">•</h2>
            <p className="text-yellow-100 font-light text-lg">•</p>
          </FadeIn>

          <FadeIn>
            <button
              className="px-8 py-3 bg-white text-yellow-600 font-light hover:bg-yellow-100 transition duration-300"
            >
              Kontaktiraj nas
            </button>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
              <div className="text-lg font-light tracking-widest text-yellow-600 mb-4">HNDS</div>
              <p className="text-sm font-light text-gray-400">
                Povezivanje kultura, izgradnja prijateljstava od 1990.
              </p>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Povezave</h4>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><Link href="/o-nama" className="hover:text-yellow-600 transition">O nama</Link></li>
                <li><Link href="/aktivnosti" className="hover:text-yellow-600 transition">Aktivnosti</Link></li>
                <li><Link href="/galerija" className="hover:text-yellow-600 transition">Galerija</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Slijedi</h4>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-yellow-600 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition">Facebook</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Kontakt</h4>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Sinjska 3<br />21000 Split<br />+385 98 244 124<br />hnjd.split@gmail.com
              </p>
            </div>
          </div>
          <div className="border-t border-yellow-600/30 pt-8 text-center text-xs font-light text-gray-600 tracking-wide">
            <p>&copy; 2026 HNDS SPLIT. SVI PRAVA ZADRŽANA.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
