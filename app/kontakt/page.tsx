"use client";

import { useI18n } from "@/app/context/I18nContext";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { HeroFadeIn, FadeIn } from "@/app/components/AnimatedSection";
import { ContactForm } from "@/app/components/ContactForm";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-56 md:pb-32 relative overflow-hidden border-b border-yellow-600/30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
          <HeroFadeIn className="space-y-6 text-center">
            <h1 className="text-5xl md:text-7xl font-light leading-tight">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              {t("contact.subtitle")}
            </p>
          </HeroFadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 md:py-20 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center space-y-6">
            <h2 className="text-3xl font-light text-white">
              {useI18n().language === "de"
                ? "Finden Sie uns"
                : "Pronađite nas"}
            </h2>
            <div className="aspect-video bg-slate-800 border border-yellow-600/30 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 font-light">
                {useI18n().language === "de"
                  ? "Google Maps wird in Kürze integriert"
                  : "Google Maps će uskoro biti integriran"}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
