"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { HeroFadeIn } from "@/app/components/ui/Animations";
import { Container, Section } from "@/app/components/ui/Common";
import { LegalAccordion, type LegalSection } from "@/app/components/ui/LegalAccordion";

const sections: LegalSection[] = [
  {
    title: "Uvod",
    content: ["Hrvatsko-njemačko društvo Split posvećeno je zaštiti vaše privatnosti. Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo i štitimo vaše osobne podatke."],
  },
  {
    title: "Prikupljanje podataka",
    content: [
      "Prikupljamo sljedeće vrste podataka:",
      "Osobni podaci: ime, email adresa, broj telefona",
      "Tehnički podaci: IP adresa, vrsta preglednika, operativni sustav",
      "Podaci o korištenju: posjećene stranice, vrijeme provedeno na stranici",
      "Kolačići: za poboljšanje korisničkog iskustva",
    ],
  },
  {
    title: "Korištenje podataka",
    content: [
      "Vaše podatke koristimo za:",
      "Pružanje i poboljšanje naših usluga",
      "Komunikaciju s vama",
      "Slanje newslettera (uz vašu suglasnost)",
      "Analizu korištenja web stranice",
      "Ispunjavanje zakonskih obveza",
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
      "Nužni kolačići: potrebni za funkcioniranje stranice",
      "Analitički kolačići: za razumijevanje kako koristite stranicu",
      "Kolačići za postavke: za pamćenje vaših preferencija",
      "Možete upravljati kolačićima kroz postavke preglednika",
    ],
  },
  {
    title: "Vaša prava",
    content: [
      "Prema GDPR-u imate pravo na:",
      "Pristup vašim osobnim podacima",
      "Ispravak netočnih podataka",
      "Brisanje vaših podataka",
      "Ograničenje obrade",
      "Prenosivost podataka",
      "Prigovor na obradu",
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

export default function PrivacyPolicy() {
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
          <LegalAccordion sections={sections} />
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
