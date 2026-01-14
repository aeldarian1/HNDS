"use client";
import { motion } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { HeroFadeIn, FadeIn } from "../components/AnimatedSection";
import { useI18n } from "../context/I18nContext";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const { t, language } = useI18n();

  // Default Croatian content (fallback)
  const defaultSections = [
    {
      title: "1. Uvod i odgovornost",
      subtitle: "O zaštiti vaših podataka",
      content: [
        "Hrvatsko-njemačko društvo Split vodi ovu web stranicu",
        "Zaštita vaših osobnih podataka naš je prioritet",
        "Ova stranica objašnjava kako prikupljamo, koristimo i štitimo vaše podatke",
        "Ova stranica je usklađena s GDPR-om",
        "Za sva pitanja kontaktirajte nas na hnjd.split@gmail.com",
      ],
    },
    {
      title: "2. Vrste podataka koje prikupljamo",
      subtitle: "Kakve podatke od vas prikupljamo",
      content: [
        "Osobni podaci (ime, prezime, email, telefonski broj)",
        "Adresni podaci (adresa, grad, poštanski broj)",
        "Podaci iz obrazaca koje dobrovoljno popunjavate",
        "Tehnički podaci (IP adresa, vrsta preglednika, vrijeme pristupa)",
        "Kolačiće i podatke o vašoj aktivnosti na stranici",
      ],
    },
    {
      title: "3. Kako koristimo vaše podatke",
      subtitle: "Namjena obrade podataka",
      content: [
        "Pružanje i poboljšanje naših usluga i web stranice",
        "Komunikacija s vama o našim aktivnostima i događanjima",
        "Odgovori na vaše upite i zahtjeve",
        "Analiza korištenja web stranice radi poboljšanja",
        "Sukladnost sa zakonskim i regulatornim obvezama",
        "Analitika i statistika",
      ],
    },
    {
      title: "4. Osnova za obradu podataka",
      subtitle: "Pravni temelj naše aktivnosti",
      content: [
        "Vaš pristanak na obradu podataka",
        "Ispunjavanje ugovornih obveza",
        "Poštovanje zakonskih obveza",
        "Legitimni interesi Hrvatsko-njemačkog društva Split",
        "Zaštita vaših i tuđih prava",
      ],
    },
    {
      title: "5. Sigurnost podataka",
      subtitle: "Kako štitimo vaše podatke",
      content: [
        "Tehničke mjere zaštite: šifriranje, vatrozidi",
        "Organizacijske mjere zaštite: pristupne dozvole, obuka zaposlenika",
        "Redoviti auditi i provjere sigurnosti",
        "Ograničen pristup samo ovlaštenom osoblju",
        "Brzo obavješćivanje u slučaju sigurnosnog incidenta",
      ],
    },
    {
      title: "6. Vaša prava",
      subtitle: "Što možete učiniti s vašim podacima",
      content: [
        "Pravo na pristup vašim osobnim podacima",
        "Pravo na ispravak netočnih podataka",
        "Pravo na brisanje podataka ('pravo na zaboravljanje')",
        "Pravo na ograničenje obrade podataka",
        "Pravo na prijenosivost podataka",
        "Pravo na prigovor obrade podataka",
        "Pravo na izbor i kontrolu automatizirane obrade",
      ],
    },
    {
      title: "7. Kolačići",
      subtitle: "Kako koristimo kolačiće",
      content: [
        "Kolačići se koriste za poboljšanje vašeg doživljaja",
        "Tehnički kolačići koji omogućuju osnovnu funkcionalnost",
        "Analitički kolačići koji prate korištenje stranice",
        "Možete odbiti kolačiće kroz postavke preglednika",
        "Odbijanje kolačića može utjecati na funkcionalnost stranice",
      ],
    },
    {
      title: "8. Dijeljenje podataka",
      subtitle: "S kim dijelimo vaše podatke",
      content: [
        "Podaci se ne dijele s trećim stranama bez vašeg pristanka",
        "Iznimka: zakonske obveze i sudska naređenja",
        "Vanjski partneri (web hosting, email servisi) s ugovornom obvezom zaštite",
        "Svi partneri su obvezani čuvanjem povjerljivosti",
        "Podaci ostaju pod kontrolom Hrvatsko-njemačkog društva Split",
      ],
    },
    {
      title: "9. Razdoblje čuvanja podataka",
      subtitle: "Koliko dugo čuvamo vaše podatke",
      content: [
        "Podaci se čuvaju dok su potrebni za navedenu svrhu",
        "Članski podaci se čuvaju tijekom članstva i nakon toga",
        "Tehnički podaci se brišu nakon 12 mjeseci",
        "Možete zahtijevati brisanje podataka u bilo koje vrijeme",
        "Zakonske obveze mogu zahtijevati duže čuvanje podataka",
      ],
    },
    {
      title: "10. Kontakt i ostvarivanje prava",
      subtitle: "Kako ostvariti svoja prava",
      content: [
        "Za ostvarenje prava pošaljite zahtjev na hnjd.split@gmail.com",
        "Odgovor je obvezan u roku od 30 dana",
        "Ako niste zadovoljni odgovorom, možete se obratiti Agenciji za zaštitu osobnih podataka (AZOP)",
        "Kontakt: Agencija za zaštitu osobnih podataka (AZOP)",
        "Email: info@azop.hr | Tel: +385 1 6109 0800",
      ],
    },
  ];

  // Try to load translations from i18n; if missing, fall back to defaults
  const privacyTrans: any = (t as any)("pages.privacy");

  // Debug info to help identify why translations may not load
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("I18n debug -> language:", language, "pages.privacy:", privacyTrans);
  }

  const headerTitle = privacyTrans && typeof privacyTrans === "object" && privacyTrans.header?.title
    ? privacyTrans.header.title
    : "Pravila privatnosti";

  const headerSubtitle = privacyTrans && typeof privacyTrans === "object" && privacyTrans.header?.subtitle
    ? privacyTrans.header.subtitle
    : "Kako čuvamo i štitimo vaše osobne podatke";

  const intro: string[] = privacyTrans && typeof privacyTrans === "object" && Array.isArray(privacyTrans.intro)
    ? privacyTrans.intro
    : [
        "Zaštita vaše privatnosti je temeljna vrijednost Hrvatsko-njemačkog društva Split.",
        "Ova pravila privatnosti objašnjavaju kako prikupljamo, koristimo, štitimo i dijelimo ",
        "vaše osobne podatke kada koristite našu web stranicu i naše usluge.",
      ];

  const note: string = privacyTrans && typeof privacyTrans === "object" && privacyTrans.note
    ? privacyTrans.note
    : "Vaši podaci se čuvaju sigurno i koriste se isključivo za namjene opisane u ovim pravilima. Imate potpuna prava na pristup, ispravak i brisanje vaših podataka.";

  const sections = privacyTrans && typeof privacyTrans === "object" && Array.isArray(privacyTrans.sections)
    ? privacyTrans.sections
    : defaultSections;

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 px-4 pt-20">
        <HeroFadeIn className="text-center max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-10 h-10 text-yellow-600" />
            <h1 className="text-6xl md:text-7xl font-light">{headerTitle}</h1>
          </div>
          <p className="text-xl text-gray-300 font-light mb-8">{headerSubtitle}</p>
          <div className="h-1 w-12 bg-yellow-600 mx-auto" />
        </HeroFadeIn>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeIn className="space-y-6 text-gray-300 font-light leading-relaxed">
            {intro.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}

            <div className="bg-yellow-600/10 border-l-4 border-yellow-600 p-6 mt-8">
              <p className="text-yellow-100">{note}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeIn className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">{t('pages.privacy.details') || 'Detaljne informacije'}</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </FadeIn>

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
                    <p className="text-sm text-gray-400 font-light">{section.subtitle}</p>
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
                    <ul className="space-y-3">
                      {section.content.map((item: any, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex gap-3 text-gray-300 font-light"
                        >
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
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
              <p><strong>{t('contact.email') || 'Email'}:</strong> hnjd.split@gmail.com</p>
              <p><strong>{t('contact.phone') || 'Telefon'}:</strong> +385 98 244 124</p>
              <p><strong>{t('contact.address') || 'Sjedište'}:</strong> Sinjska 3, 21000 Split</p>
              <p className="text-sm text-gray-400 pt-4">
                {language === 'de' ? 'Letzte Aktualisierung:' : 'Zadnja ažuriranja:'} {new Date().toLocaleDateString(language === 'de' ? 'de-DE' : 'hr-HR')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
