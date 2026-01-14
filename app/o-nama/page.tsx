"use client";

import { motion } from "framer-motion";
import { MapPin, Users, BookOpen, Globe, Award, Building2 } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { HeroFadeIn, FadeIn, SlideLeft, SlideRight } from "../components/AnimatedSection";
import { useI18n } from "@/app/context/I18nContext";

export default function About() {
  const { t } = useI18n();

  const leadership = [
    { 
      name: t("pages.about.leadership.members.nikolaHorvat"), 
      role: t("pages.about.leadership.president"),
      icon: Award 
    },
    { 
      name: t("pages.about.leadership.members.dragutinKorlaet"), 
      role: t("pages.about.leadership.vicePresident"),
      icon: Users 
    },
    { 
      name: t("pages.about.leadership.members.petarFabjanovic"), 
      role: t("pages.about.leadership.vicePresident"),
      icon: Users 
    },
    { 
      name: t("pages.about.leadership.members.tomislavDraskovic"), 
      role: t("pages.about.leadership.boardChair"),
      icon: Building2 
    },
  ];

  const branches = [
    { 
      name: t("pages.about.branches.makarska"), 
      president: "Herbert Buche", 
      icon: MapPin 
    },
    { 
      name: t("pages.about.branches.brac"), 
      president: t("pages.about.leadership.members.petarFabjanovic"), 
      icon: Globe 
    },
    { 
      name: t("pages.about.branches.sinj"), 
      president: t("pages.about.branches.inFormation"), 
      icon: BookOpen 
    },
  ];

  const partners = [
    {
      name: t("pages.about.partners.ahk"),
      icon: Building2
    },
    {
      name: t("pages.about.partners.mainz"),
      icon: Globe
    },
    {
      name: t("pages.about.partners.berlin"),
      icon: Globe
    },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section */}
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

      {/* Mission Section */}
      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <SlideLeft className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-light text-white mb-4">{t("pages.about.mission.title")}</h2>
                <div className="w-12 h-px bg-yellow-600" />
              </div>

              <p className="text-lg text-gray-300 font-light leading-relaxed">
                {t("pages.about.mission.description")}
              </p>

              <div className="border-l-2 border-yellow-600 pl-6 py-4">
                <p className="text-lg text-gray-300 font-light italic leading-relaxed mb-4">
                  "{t("pages.about.mission.quote")}"
                </p>
                <p className="text-yellow-600 font-medium">{t("pages.about.mission.quoteAuthor")}</p>
                <p className="text-gray-400 text-sm">{t("pages.about.mission.quoteTitle")}</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <Users className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">{t("pages.about.mission.community")}</h3>
                    <p className="text-gray-300 font-light">{t("pages.about.mission.communityDesc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">{t("pages.about.mission.learning")}</h3>
                    <p className="text-gray-300 font-light">{t("pages.about.mission.learningDesc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Globe className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">{t("pages.about.mission.connection")}</h3>
                    <p className="text-gray-300 font-light">{t("pages.about.mission.connectionDesc")}</p>
                  </div>
                </div>
              </div>
            </SlideLeft>

            {/* Stats Section */}
            <SlideRight className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-6">
                  <div className="text-5xl font-light text-yellow-600 mb-2">{t("pages.about.stats.years")}</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">{t("pages.about.stats.yearsLabel")}</div>
                </div>
                <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-6">
                  <div className="text-5xl font-light text-yellow-600 mb-2">{t("pages.about.stats.members")}</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">{t("pages.about.stats.membersLabel")}</div>
                </div>
                <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-6">
                  <div className="text-5xl font-light text-yellow-600 mb-2">{t("pages.about.stats.events")}</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">{t("pages.about.stats.eventsLabel")}</div>
                </div>
                <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-6">
                  <div className="text-5xl font-light text-yellow-600 mb-2">{t("pages.about.stats.branches")}</div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider">{t("pages.about.stats.branchesLabel")}</div>
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-32 bg-slate-900/50 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">{t("pages.about.leadership.title")}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
              {t("pages.about.leadership.subtitle")}
            </p>
            <div className="w-12 h-px bg-yellow-600 mx-auto mt-6" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-6 text-center hover:border-yellow-600/40 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600/10 rounded-full flex items-center justify-center">
                  <member.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">{t("pages.about.branches.title")}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
              {t("pages.about.branches.subtitle")}</p>
            <div className="w-12 h-px bg-yellow-600 mx-auto mt-6" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-8 hover:border-yellow-600/40 transition-all"
              >
                <branch.icon className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">{branch.name}</h3>
                <div className="border-t border-yellow-600/20 pt-4 mt-4">
                  <p className="text-gray-400 text-sm mb-2">{t("pages.about.branches.president")}</p>
                  <p className="text-gray-300">{branch.president}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-32 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">{t("pages.about.partners.title")}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
              {t("pages.about.partners.subtitle")}
            </p>
            <div className="w-12 h-px bg-yellow-600 mx-auto mt-6" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-8 text-center hover:border-yellow-600/40 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600/10 rounded-full flex items-center justify-center">
                  <partner.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-medium text-white">{partner.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
