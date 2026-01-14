"use client";
import { ChevronRight, Calendar, Users, Zap, Globe, BookOpen, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { HeroFadeIn, FadeIn, StaggerContainer, StaggerItem } from "./components/AnimatedSection";
import { motion } from "framer-motion";
import { NewsletterSignup } from "./components/NewsletterSignup";
import { useI18n } from "@/app/context/I18nContext";

export default function Home() {
  const { t } = useI18n();
  const stats = [
    { value: "35+", label: t("stats.years") },
    { value: "500+", label: t("stats.members") },
    { value: "6", label: t("stats.locations") },
    { value: "55", label: t("stats.partnership") }
  ];

  const features = [
    {
      number: t("features.history.number"),
      title: t("features.history.title"),
      description: t("features.history.description"),
      link: "/o-nama",
      icon: Calendar,
    },
    {
      number: t("features.courses.number"),
      title: t("features.courses.title"),
      description: t("features.courses.description"),
      link: "/aktivnosti",
      icon: BookOpen,
    },
    {
      number: t("features.events.number"),
      title: t("features.events.title"),
      description: t("features.events.description"),
      link: "/aktivnosti",
      icon: Globe,
    },
    {
      number: t("features.trips.number"),
      title: t("features.trips.title"),
      description: t("features.trips.description"),
      link: "/aktivnosti",
      icon: MapPin,
    },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 relative overflow-hidden border-b border-yellow-600/30">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-8 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
              {t("hero.title")}
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              {t("hero.subtitle")}
            </p>

            <HeroFadeIn delay={0.2} className="flex gap-4 justify-center flex-wrap pt-4">
              <Link
                href="/aktivnosti"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-all duration-300"
              >
                {t("hero.exploreActivities")}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/o-nama"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
              >
                {t("hero.learnMore")}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </HeroFadeIn>

            {/* Stats Grid */}
            <HeroFadeIn delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-yellow-600/20 mt-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-light text-yellow-500 mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-light">{stat.label}</div>
                </motion.div>
              ))}
            </HeroFadeIn>
          </HeroFadeIn>
        </div>
      </section>

      {/* Featured Sections - 4 Columns */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative"
                  >
                    <Link href={feature.link} className="block">
                      <div className="relative overflow-hidden rounded-lg border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 h-full p-8 bg-gradient-to-br from-slate-900 to-slate-950 hover:shadow-lg hover:shadow-yellow-600/20">
                        {/* Number */}
                        <div className="text-6xl font-light text-yellow-600/20 mb-6 group-hover:text-yellow-600/40 transition-colors">
                          {feature.number}
                        </div>

                        {/* Icon */}
                        <Icon className="w-10 h-10 text-yellow-600 mb-6" />

                        {/* Title */}
                        <h3 className="text-2xl font-light text-white mb-3 group-hover:text-yellow-500 transition-colors">
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 font-light mb-6 text-sm leading-relaxed">
                          {feature.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-yellow-600 group-hover:gap-3 transition-all duration-300">
                          <span className="text-sm font-light">Saznaj više</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-24 md:py-32 bg-slate-900 border-y border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-4">{t("news.title")}</h2>
            <p className="text-gray-400 font-light text-lg">{t("news.subtitle")}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                date: "14. siječanj 2026",
                category: "Obavijest",
                title: "•",
                slug: "vijest-1",
              },
              {
                date: "10. siječanj 2026",
                category: "Događaj",
                title: "•",
                slug: "vijest-2",
              },
              {
                date: "5. siječanj 2026",
                category: "Novost",
                title: "•",
                slug: "vijest-3",
              },
            ].map((news, i) => (
              <StaggerItem key={i}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="border border-yellow-600/30 hover:border-yellow-600 transition-all duration-300 p-8 bg-slate-950"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-light uppercase tracking-wide text-yellow-600 px-3 py-1 bg-yellow-600/10 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500 font-light">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4 line-clamp-2">{news.title}</h3>
                  <Link
                    href={`/vijesti/${news.slug}`}
                    className="text-yellow-600 hover:text-yellow-500 transition flex items-center gap-2 text-sm font-light group"
                  >
                    {t("news.readMore")}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center">
            <Link
              href="/vijesti"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
            >
              {t("news.viewAll")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <FadeIn className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-light text-white">{t("cta.joinCommunity")}</h2>
            <p className="text-xl text-gray-300 font-light">
              {t("cta.joinDescription")}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="flex gap-4 justify-center flex-wrap pt-4">
            <Link
              href="/kontakt"
              className="px-8 py-4 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300 inline-flex items-center gap-2"
            >
              {t("cta.contactUs")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/galerija"
              className="px-8 py-4 border-2 border-yellow-600 text-yellow-600 font-light hover:bg-yellow-600/10 transition duration-300"
            >
              {t("cta.viewGallery")}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
