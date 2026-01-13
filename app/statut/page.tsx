"use client";

import { motion } from "framer-motion";
import { ChevronDown, FileText, BookOpen } from "lucide-react";
import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export default function Statut() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      title: "I. Opće odredbe",
      subtitle: "Osnovna pravila i informacije o udruzi",
      content: [
        "Naziv udruge: Hrvatsko-njemačko društvo Split",
        "Naziv na njemačkom: Kroatisch-Deutsche Gesellschaft Split",
        "Sjedište: Split - Sinjska 3",
        "Udruga je registrirana kao neprofitna pravna osoba",
        "Udrugu zastupa predsjednica/predsjednici",
      ],
    },
    {
      title: "II. Područje djelovanja, ciljevi i djelatnosti",
      subtitle: "Misija i aktivnosti udruge",
      content: [
        "Promicanje suradnje između Hrvatske i Njemačke",
        "Suradnja na znanstvenom, kulturnom, društvenom i gospodarskom polju",
        "Organiziranje seminara, predavanja, tečajeva jezika",
        "Organizacija izložbi, izleta i kulturnih aktivnosti",
        "Izdavanje stručnih publikacija i biltena",
        "Suradnja s organizacijama u zemlji i inozemstvu",
      ],
    },
    {
      title: "III. Članstvo u udruzi",
      subtitle: "Uvjeti i prava/obveze članova",
      content: [
        "Redovnim članstvom mogu postati sve zainteresirane osobe",
        "Počasnim članstvom mogu postati osobe koje su doprinjele ostvarenju ciljeva",
        "Članstvo se stječe upisom u službeni popis članova",
        "Pravo aktivnog sudjelovanja u radnim aktivnostima",
        "Pravo sudjelovanja u donošenju odluka",
        "Obveza plaćanja članarine",
        "Članstvo prestaje dobrovoljnim istupom, smrću ili isključenjem",
      ],
    },
    {
      title: "IV. Tijela udruge",
      subtitle: "Upravljačka struktura",
      content: [
        "Skupština - najviše upravljačko tijelo",
        "Upravni odbor - vodi poslove udruge",
        "Nadzorni odbor - nadzire zakonitost poslovanja",
        "Predsjednica/Predsjednici - zastupa udrugu",
        "Tajnik - obavlja administrativne poslove",
        "Komisije i radna tijela prema potrebi",
        "Ogranci u Split, Makarska, Brač, Sinj, Trogir i Berlin",
      ],
    },
    {
      title: "V. Skupština",
      subtitle: "Organ odlučivanja",
      content: [
        "Čine je svi članovi udruge",
        "Zasjeda jednom godišnje, izborna sjednica svake dvije godine",
        "Donosi odluke većinom glasova nazočnih članova",
        "Usvaja Statut i financijska izvješća",
        "Bira i razrješava vodstvo i tijela udruge",
        "Odlučuje o ključnim promjenama",
      ],
    },
    {
      title: "VI. Upravni odbor",
      subtitle: "Izvršno tijelo",
      content: [
        "Predsjednica/Predsjedniki, dva potpredsjednika i člani",
        "Mandat traje dvije godine",
        "Bira je Skupština",
        "Sastaje se najmanje jednom mjesečno",
        "Upravlja imovinom i poslovima udruge",
        "Priprema materijale za Skupštinu",
        "Odlučuje o prijemu novih članova",
      ],
    },
    {
      title: "VII. Nadzorni odbor",
      subtitle: "Kontrola financijskog poslovanja",
      content: [
        "Čine ga predsjednica/predsjedniki i dva člana",
        "Mandat traje dvije godine",
        "Nadzire zakonitost financijskog poslovanja",
        "Prati izvršenje zakonskih i ugovornih obveza",
        "Analizira ostvarenje financijskog plana",
        "Godišnje podnosi pismeno izvješće",
      ],
    },
    {
      title: "VIII. Članstvo i prava članova",
      subtitle: "Status i odgovornosti",
      content: [
        "Redovno ili počasno članstvo",
        "Pravo sudjelovanja u radnim aktivnostima",
        "Pravo sučlanstva u upravljanju",
        "Pravo uvida u dokumente i odluke",
        "Čuvanje ugleda udruge",
        "Pravovremeno plaćanje članarine",
        "Nadzor rada udruge",
      ],
    },
    {
      title: "IX. Financijsko poslovanje",
      subtitle: "Upravljanje sredstvima",
      content: [
        "Vođenje poslovnih knjiga prema važećim propisima",
        "Izvješćivanje o financijskom stanju",
        "Sredstva iz članarina i dobrovoljnih priloga",
        "Financijska sredstva iz programa i projekata",
        "Prikupljena sredstva koriste se isključivo za ostvarenje ciljeva",
        "Godišnje izvještavanje javnosti",
      ],
    },
    {
      title: "X. Zaštita osobnih podataka",
      subtitle: "Privatnost članova",
      content: [
        "Obrada podataka prema GDPR regulaciji",
        "Tajnik je odgovoran za vođenje evidencije",
        "Članovi imaju pravo pristupa i ispravka svojih podataka",
        "Tajnost i sigurnost podataka",
        "Pravo na brisanje podataka",
        "Transparentna politika zaštite privatnosti",
      ],
    },
    {
      title: "XI. Rješavanje sporova",
      subtitle: "Interno i vanjsko rješavanje",
      content: [
        "Arbitražno vijeće za rješavanje sporova između članova",
        "Pravilnik za rad arbitražnog vijeća",
        "Mogućnost tužbe pred nadležnim sudom",
        "Zaštita interesa maloljetnika",
        "Zaštita poslovne tajne",
        "Pravno regulirano rješavanje",
      ],
    },
    {
      title: "XII. Prestanak i likvidacija",
      subtitle: "Završetak djelovanja",
      content: [
        "Prestanak većinom glasova Skupštine",
        "Spajanje, pripajanje ili podjela udruge",
        "Pravomoćna sudska odluka",
        "Likvidator upravlja procesom likvidacije",
        "Imovina se prenosi na ustanovu s istim ciljevima",
        "Članovi ne dijele imovinu",
      ],
    },
    {
      title: "XIII. Izmjene Statuta",
      subtitle: "Redakcija i ažuriranje",
      content: [
        "Zadnji Statut usvođen: 2. ožujka 2024.",
        "Skupština donosi odluke većinom glasova",
        "Izmjene stupaju na snagu danom donošenja",
        "Dostavlja se nadležnom uredu državne uprave",
        "Primjenjuje se danom ovjere",
        "Objavljeno i dostupno svim članovima",
      ],
    },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-yellow-600" />
            <h1 className="text-6xl md:text-7xl font-light">Statut</h1>
          </div>
          <p className="text-xl text-gray-300 font-light mb-8">
            Ustav Hrvatsko-njemačkog društva Split - temeljni dokument koji uređuje rad i upravljanje udrugom
          </p>
          <div className="h-1 w-12 bg-yellow-600 mx-auto" />
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300 font-light leading-relaxed"
          >
            <p>
              Ovaj Statut donesen je na Skupštini udruge održanoj dana <strong>2. ožujka 2024. godine</strong> i služi kao temeljni ustavni dokument koji regulira sve aspekte rada Hrvatsko-njemačkog društva Split.
            </p>
            <p>
              Statut je izrađen u skladu s <strong>Zakonom o udrugama</strong> i definiše organizacijsku strukturu, prava i obveze članova, način upravljanja, financijsko poslovanje, te sve ostale bitne elemente funkcioniranja udruge.
            </p>
            <div className="bg-yellow-600/10 border-l-4 border-yellow-600 p-6 mt-8">
              <p className="text-yellow-100">
                Statut je dostupan svim članovima i javnosti. Sve izmjene Statuta donose se većinom glasova Skupštine i ovjerljavaju kod nadležnog tijela države.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Sadržaj Statuta</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="space-y-4">
            {sections.map((section, index) => (
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
                      {section.content.map((item, idx) => (
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

      {/* Key Information */}
      <section className="py-20 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Važne informacije</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Registracija",
                desc: "Udruga je registrirana pri Uredu državne uprave u Splitsko-dalmatinskoj županiji kao neprofitna pravna osoba",
              },
              {
                title: "Sjedište",
                desc: "Sinjska 3, 21000 Split, Hrvatska",
              },
              {
                title: "Kontakt",
                desc: "Telefon: +385 98 244 124 | Email: hnjd.split@gmail.com",
              },
              {
                title: "OIB",
                desc: "72936951527",
              },
              {
                title: "Bankovni račun",
                desc: "IBAN: HR5324070001024070003 | BIC: OTPVHR2X",
              },
              {
                title: "Predsjednica",
                desc: "Nikola Horvat",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-yellow-600/30 p-6 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300"
              >
                <h3 className="text-lg font-light text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="py-20 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Upravljačka struktura</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border border-yellow-600/20 p-8 rounded-sm">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-light text-white mb-2">Skupština</h4>
                  <p className="text-gray-300 font-light text-sm">
                    Najviše upravljačko tijelo sastavljeno od svih članova. Zasjeda jednom godišnje te donosi ključne odluke o Statutu, financijama i vodstvu udruge.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-6"
              >
                <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-light text-white mb-2">Upravni odbor</h4>
                  <p className="text-gray-300 font-light text-sm">
                    Izvršno tijelo koje vodi poslove udruge. Sastoji se od predsjednika/ice, dva potpredsjednika/ce i članova. Mandat traje 2 godine.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6"
              >
                <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-light text-white mb-2">Nadzorni odbor</h4>
                  <p className="text-gray-300 font-light text-sm">
                    Nadzire zakonitost financijskog poslovanja. Sastoji se od predsjednika/ice i dva člana, mandat 2 godine.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-6"
              >
                <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-light text-white mb-2">Ogranci (Podružnice)</h4>
                  <p className="text-gray-300 font-light text-sm">
                    Aktivne podružnice u Split, Makarska, Brač, Sinj, Trogir i Berlin. Svaki ogranak ima svojeg predsjednika/icu i vodi samostalno financiranje.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-4">Imaju pitanja?</p>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              Trebate više informacija?
            </h2>
            <p className="text-gray-300 font-light text-lg max-w-2xl mx-auto">
              Ako imate pitanja vezano uz Statut ili rad udruge, slobodno nas kontaktirajte. Dostupni smo tijekom radnih dana.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300">
              Kontaktiraj nas
            </a>
            <p className="text-sm text-gray-400 font-light">
              +385 98 244 124 | hnjd.split@gmail.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
