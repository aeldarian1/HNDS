"use client";
import { motion } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { HeroFadeIn, FadeIn } from "@/app/components/ui/Animations";
import { Container, Section } from "@/app/components/ui/Common";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  // Build sections with hardcoded Croatian text
  const sections = [
    {
      title: "Uvod",
      content: ["Hrvatsko-njemačko društvo Split posvećeno je zaštiti vaše privatnosti. Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo i štitimo vaše osobne podatke."],
    },
    {
      title: "Prikupljanje podataka",
      content: [
        "Prikupljamo sljedeće vrste podataka:",
        "• Osobni podaci: ime, email adresa, broj telefona",
        "• Tehnički podaci: IP adresa, vrsta preglednika, operativni sustav",
        "• Podaci o korištenju: posjećene stranice, vrijeme provedeno na stranici",
        "• Kolačići: za poboljšanje korisničkog iskustva",
      ],
    },
    {
      title: "Korištenje podataka",
      content: [
        "Vaše podatke koristimo za:",
        "• Pružanje i poboljšanje naših usluga",
        "• Komunikaciju s vama",
        "• Slanje newslettera (uz vašu suglasnost)",
        "• Analizu korištenja web stranice",
        "• Ispunjavanje zakonskih obveza",
      ],
    },
    {
      title: "Dijeljenje podataka",
      content: ["Vaše podatke ne prodajemo i ne dijelimo s trećim stranama, osim kada je to potrebno za pružanje usluga ili zakonski obavezno."],
    },
    {
      title: "Sigurnost podataka",
      content: ["Koristimo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših podataka od neovlaštenog pristupa, gubitka ili zlouporabe."],
    },
    {
      title: "Kolačići",
      content: [
        "Naša web stranica koristi kolačiće:",
        "• Nužni kolačići: potrebni za funkcioniranje stranice",
        "• Analitički kolačići: za razumijevanje kako koristite stranicu",
        "• Kolačići za postavke: za pamćenje vaših preferencija",
        "• Možete upravljati kolačićima kroz postavke preglednika",
      ],
    },
    {
      title: "Vaša prava",
      content: [
        "Prema GDPR-u imate pravo na:",
        "• Pristup vašim osobnim podacima",
        "• Ispravak netočnih podataka",
        "• Brisanje vaših podataka",
        "• Ograničenje obrade",
        "• Prenosivost podataka",
        "• Prigovor na obradu",
      ],
    },
    {
      title: "Zadržavanje podataka",
      content: ["Vaše podatke zadržavamo samo onoliko dugo koliko je potrebno za svrhe za koje su prikupljeni ili prema zakonskim zahtjevima."],
    },
    {
      title: "Promjene pravila",
      content: ["Možemo povremeno ažurirati ova pravila privatnosti. O svim značajnim promjenama obavijestit ćemo vas putem naše web stranice."],
    },
    {
      title: "Kontakt",
      content: ["Za sva pitanja vezana uz vaše osobne podatke možete nas kontaktirati na info@hnds.hr ili putem kontakt obrasca na našoj web stranici."],
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
              <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">Pravila privatnosti</h1>
            </div>
            <p className="text-xl text-gray-300 font-light mb-8">Kako štitimo vaše osobne podatke</p>
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
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Kontaktirajte nas</h2>
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
              <p><strong>Email:</strong> hnjd.split@gmail.com</p>
              <p><strong>Telefon:</strong> +385 98 244 124</p>
              <p><strong>Sjedište:</strong> Sinjska 3, 21000 Split</p>
              <p className="text-sm text-gray-400 pt-4">
                Zadnja ažuriranja: {new Date().toLocaleDateString('hr-HR')}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
