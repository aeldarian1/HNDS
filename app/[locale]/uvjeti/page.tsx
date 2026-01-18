"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { HeroFadeIn, FadeIn } from "@/app/components/ui/Animations";
import { Container, Section } from "@/app/components/ui/Common";
import { LegalAccordion, type LegalSection } from "@/app/components/ui/LegalAccordion";

const sections: LegalSection[] = [
  {
    title: "1. Prihvaćanje uvjeta korištenja",
    subtitle: "Slažete se sa svim odredbama",
    content: [
      "Korištenjem ove web stranice prihvaćate sve uvjete korištenja.",
      "Ako se ne slažete s uvjetima, molimo vas da prestanete koristiti stranicu",
      "Nastavkom korištenja dajete svoju eksplicitnu suglasnost",
      "Odgovorni ste za poštovanje svih primijenjenih zakona",
      "Možete biti odgovorni za neovlaštenu upotrebu",
    ],
  },
  {
    title: "2. Licenca korištenja web stranice",
    subtitle: "Ograničeni pristup sadržaju",
    content: [
      "Dodjeljujemo vam ograničenu, neisključivu licencu za osobnu upotrebu",
      "Možete pregledavati i koristiti sadržaj za osobne svrhe",
      "Zabranjeno je komercijalno korištenje bez dozvole",
      "Zabranjeno je reproduciranje i distribuiranje",
      "Zabranjeno je prepravljanje ili adaptacija sadržaja",
    ],
  },
  {
    title: "3. Intelektualno svojstvo",
    subtitle: "Zaštita autorskih prava",
    content: [
      "Sav sadržaj je zaštićen autorskim pravima Hrvatsko-njemačkog društva Split",
      "Uključuje tekstove, slike, grafike, videozapise, glazbu i kôd",
      "Zabranjeno je kopiranje bez pisane dozvole",
      "Zabranjena je reprodukcija, distribucija ili javna izvedba",
      "Zabranjeno je modificiranje ili stvaranje derivativnih radova",
    ],
  },
  {
    title: "4. Ograničenja odgovornosti",
    subtitle: "Ono što nismo odgovorni",
    content: [
      "Web stranica se pruža 'kakva jest' bez jamstava",
      "Ne jamčimo točnost, pouzdanost ili dostupnost sadržaja",
      "Nismo odgovorni za pogreške ili neprekidnu dostupnost",
      "Nismo odgovorni za štete iz korištenja stranice",
      "Nismo odgovorni za gubitke podataka ili financijske gubitke",
    ],
  },
  {
    title: "5. Ponašanje korisnika",
    subtitle: "Očekivano vladanje",
    content: [
      "Zabranjeno je objavljivanje uvredljivog ili diskriminatornog sadržaja",
      "Zabranjeno je objavljivanje spama ili marketinških poruka",
      "Zabranjeno je objavljivanje sadržaja koji krši autorska prava",
      "Zabranjeno je objavljivanje malvera ili štetnog koda",
      "Zabranjeno je hakiranje ili neovlašteni pristup",
      "Zabranjeno je uznemiravanje ili nasilje",
    ],
  },
  {
    title: "6. Vanjske poveznice",
    subtitle: "Treće web stranice",
    content: [
      "Stranica može sadržavati vanjske poveznice",
      "Nismo odgovorni za sadržaj vanjskih stranica",
      "Vanjske stranice imaju svoje Uvjete korištenja",
      "Preporučujemo da pročitate njihove Uvjete prije korištenja",
      "Vanjske poveznice se pružaju samo kao referenca",
    ],
  },
  {
    title: "7. Korisnički računi",
    subtitle: "Sigurnost lozinke i pristupa",
    content: [
      "Ako kreirate račun, odgovorni ste za lozinku",
      "Morate čuvati lozinku tajno i sigurno",
      "Morate nas odmah obavijestiti ako sumnjate na krađu",
      "Vi ste odgovorni za sve aktivnosti na svojem računu",
      "Ne smijete dijeliti pristup s drugim osobama",
    ],
  },
  {
    title: "8. Zabranjene aktivnosti",
    subtitle: "Što nije dozvoljeno",
    content: [
      "Skidanje web stranice ili njezinih dijelova bez dozvole",
      "Korištenje robota, pauka ili drugih alata za prikupljanje podataka",
      "Preusmjeravanje ili reprodukcija sadržaja na drugim stranicama",
      "Pokušaji pristupa neovlaštenim dijelovima",
      "Narušavanje rada web stranice (DDoS, itd.)",
      "Praćenje ili preusmjeravanje prometa",
    ],
  },
  {
    title: "9. Izmjene uvjeta korištenja",
    subtitle: "Ažuriranje Uvjeta",
    content: [
      "Zadržavamo pravo mijenjati ove Uvjete u bilo kojem trenutku",
      "Izmjene stupaju na snagu kad se objave na web stranici",
      "Nastavak korištenja znači prihvaćanje novih Uvjeta",
      "Preporučujemo da redovito provjerite ažuriranja",
      "Obavijestit ćemo vas o značajnim izmjenama",
    ],
  },
  {
    title: "10. Primjena zakona i rješavanje sporova",
    subtitle: "Pravni okvir i jurisdikcija",
    content: [
      "Ovi Uvjeti podliježu zakonima Republike Hrvatske",
      "Primijenjuje se Zakon o zaštiti potrošača",
      "Svi sporovi trebali bi biti razriješeni pred sudom u Splitu",
      "Međutim, pokušajmo prvo razriješiti spor dogovornim putem",
      "Komunikacija treba biti vođena u pisanom obliku na navedene adrese",
    ],
  },
];

export default function TermsOfUse() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="w-10 h-10 text-yellow-600" />
              <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">Uvjeti korištenja</h1>
            </div>
            <p className="text-xl text-gray-300 font-light mb-8">
              Pravila i uvjeti korištenja naše web stranice
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-yellow-600 to-transparent mx-auto" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Introduction */}
      <Section className="bg-slate-950 border-b border-yellow-600/30">
        <Container className="max-w-4xl">
          <FadeIn className="space-y-6 text-gray-300 font-light leading-relaxed">
            <p>
              Ovi Uvjeti korištenja (&ldquo;Uvjeti&rdquo;) predstavljaju pravni ugovor između vas i 
              Hrvatsko-njemačkog društva Split vezano uz korištenje ove web stranice. 
              Pročitajte pažljivo prije nego što nastavite.
            </p>
            <p>
              Korištenjem ove web stranice, vi prihvaćate sve Uvjete korištenja u cijelosti. 
              Ako se ne slažete s bilo kojim dijelom, molimo vas da prestanete koristiti stranicu.
            </p>
            <div className="bg-yellow-600/10 border-l-4 border-yellow-600 p-6 mt-8">
              <p className="text-yellow-100">
                Ove Uvjete redovito ažuriramo. Novi korisnici trebaju biti svjesni da se Uvjeti 
                mogu promijeniti. Preporučujemo da redovito provjerite ažuriranja.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Sections */}
      <Section className="bg-slate-900 border-b border-yellow-600/30">
        <Container className="max-w-4xl">
          <FadeIn className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Detaljni Uvjeti</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </FadeIn>

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
