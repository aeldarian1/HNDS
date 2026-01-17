"use client";
import { motion } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { HeroFadeIn, FadeIn } from "@/app/components/ui/Animations";
import { Container, Section } from "@/app/components/ui/Common";
import { useI18n } from "../context/I18nContext";

export default function PrivacyPolicy() {
  const { t, language } = useI18n();

  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  // Build sections from translation keys
  const sections = [
    {
      title: t("pages.privacy.intro.title"),
      content: [t("pages.privacy.intro.text")],
    },
    {
      title: t("pages.privacy.dataCollection.title"),
      content: [
        t("pages.privacy.dataCollection.intro"),
        `• ${t("pages.privacy.dataCollection.personal")}`,
        `• ${t("pages.privacy.dataCollection.technical")}`,
        `• ${t("pages.privacy.dataCollection.usage")}`,
        `• ${t("pages.privacy.dataCollection.cookies")}`,
      ],
    },
    {
      title: t("pages.privacy.dataUsage.title"),
      content: [
        t("pages.privacy.dataUsage.intro"),
        `• ${t("pages.privacy.dataUsage.use1")}`,
        `• ${t("pages.privacy.dataUsage.use2")}`,
        `• ${t("pages.privacy.dataUsage.use3")}`,
        `• ${t("pages.privacy.dataUsage.use4")}`,
        `• ${t("pages.privacy.dataUsage.use5")}`,
      ],
    },
    {
      title: t("pages.privacy.dataSharing.title"),
      content: [t("pages.privacy.dataSharing.text")],
    },
    {
      title: t("pages.privacy.dataSecurity.title"),
      content: [t("pages.privacy.dataSecurity.text")],
    },
    {
      title: t("pages.privacy.cookies.title"),
      content: [
        t("pages.privacy.cookies.intro"),
        `• ${t("pages.privacy.cookies.essential")}`,
        `• ${t("pages.privacy.cookies.analytics")}`,
        `• ${t("pages.privacy.cookies.preferences")}`,
        `• ${t("pages.privacy.cookies.manage")}`,
      ],
    },
    {
      title: t("pages.privacy.rights.title"),
      content: [
        t("pages.privacy.rights.intro"),
        `• ${t("pages.privacy.rights.access")}`,
        `• ${t("pages.privacy.rights.rectification")}`,
        `• ${t("pages.privacy.rights.erasure")}`,
        `• ${t("pages.privacy.rights.restriction")}`,
        `• ${t("pages.privacy.rights.portability")}`,
        `• ${t("pages.privacy.rights.objection")}`,
      ],
    },
    {
      title: t("pages.privacy.retention.title"),
      content: [t("pages.privacy.retention.text")],
    },
    {
      title: t("pages.privacy.changes.title"),
      content: [t("pages.privacy.changes.text")],
    },
    {
      title: t("pages.privacy.contact.title"),
      content: [t("pages.privacy.contact.text")],
    },
  ];

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-10 h-10 text-yellow-600" />
              <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">{t('pages.privacy.title')}</h1>
            </div>
            <p className="text-xl text-gray-300 font-light mb-8">{t('pages.privacy.subtitle')}</p>
            <div className="w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent mx-auto" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Sections */}
      <Section className="bg-slate-900 border-b border-yellow-600/30">
        <Container className="max-w-4xl">
          <div className="space-y-4">
            {sections.map((section: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-yellow-600/30 hover:border-yellow-600 transition duration-300"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  className="w-full p-6 flex items-start gap-4 hover:bg-yellow-600/5 transition duration-300 text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-white mb-1">{section.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-yellow-600" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedSection === index ? "auto" : 0,
                    opacity: expandedSection === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 border-t border-yellow-600/20 bg-yellow-600/5">
                    <div className="space-y-3 text-gray-300 font-light">
                      {section.content.map((item: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {item.startsWith("•") ? (
                            <div className="flex gap-3">
                              <span className="text-yellow-600 flex-shrink-0">•</span>
                              <span>{item.substring(1).trim()}</span>
                            </div>
                          ) : (
                            <p>{item}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-slate-950 border-b border-yellow-600/30">
        <Container className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('contact.title') || 'Kontaktirajte nas'}</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-yellow-600/30 p-8 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300"
          >
            <h3 className="text-2xl font-light text-white mb-6">Hrvatsko-njemačko društvo Split</h3>
            <div className="space-y-4 text-gray-300 font-light">
              <p><strong>{t('contact.email') || 'Email'}:</strong> hnjd.split@gmail.com</p>
              <p><strong>{t('contact.phone') || 'Telefon'}:</strong> +385 98 244 124</p>
              <p><strong>{t('contact.address') || 'Sjedište'}:</strong> Sinjska 3, 21000 Split</p>
              <p className="text-sm text-gray-400 pt-4">
                {language === 'de' ? 'Letzte Aktualisierung:' : 'Zadnja ažuriranja:'} {new Date().toLocaleDateString(language === 'de' ? 'de-DE' : 'hr-HR')}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
