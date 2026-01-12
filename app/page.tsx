"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, Users, Zap, Globe, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section - Dark Baroque */}
      <section className="pt-32 pb-0 md:pt-40 relative overflow-hidden bg-slate-950 border-b border-yellow-600/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[600px]">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="px-4 md:px-8 py-20 md:py-0 space-y-8"
          >
            <div>
              <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-4">Kulturni most</p>
              <h1 className="text-6xl md:text-7xl font-light leading-tight text-white">
                Most između<br />
                <span className="italic text-yellow-600">kultura</span>
              </h1>
            </div>

            <p className="text-lg text-gray-300 max-w-xl font-light leading-relaxed">
              Promoviranje kulturnih, jezičnih i prijateljskih veza između Hrvatske i Njemačke kroz tečajeve jezika, kulturne događaje, izlete i radionice.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex gap-6 pt-4"
            >
              <Link href="/#events" className="inline-flex items-center gap-3 px-8 py-3 bg-yellow-600 text-white text-sm font-light hover:bg-yellow-500 transition duration-300">
                Istraži događaje <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-3 px-8 py-3 border border-yellow-600 text-white text-sm font-light hover:bg-yellow-600/10 transition duration-300">
                Saznaj više <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-full bg-gradient-to-b from-slate-800 to-slate-950"
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-light">
              [Featured Image]
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-2">Istaknuto</p>
            <h2 className="text-5xl md:text-6xl font-light text-white">
              Otkrij našu<br />baštinu
            </h2>
            <div className="w-12 h-px bg-yellow-600 mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Tečajevi jezika", desc: "Savladaj njemački kroz stručnu nastavu" },
              { title: "Kulturni događaji", desc: "Povežite se s živim tradicijama" },
              { title: "Izleti", desc: "Istražite lijepe destinacije" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-56 bg-gradient-to-b from-slate-800 to-slate-950 border border-yellow-600/20 overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                    [Image]
                  </div>
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition duration-500" />
                </div>
                <h3 className="text-2xl font-light text-white group-hover:text-yellow-600 transition mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 font-light text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Alternating Layout */}
      <section id="about" className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-2 md:order-1"
            >
              <div>
                <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-2">Naša priča</p>
                <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
                  Tko smo
                </h2>
                <div className="w-12 h-px bg-yellow-600" />
              </div>

              <p className="text-gray-300 font-light leading-relaxed text-lg">
                Hrvatsko-německo društvo Split je most između hrvatske i njemačke kulture. Osnovano 1990. godine, kontinuirano je djeluje na jačanju veza, razumijevanja i prijateljstva između naših naroda.
              </p>

              <p className="text-gray-400 font-light leading-relaxed">
                Sa aktivnim podružnicama u Splitu, Makarskoj, Brču, Sinju i Trogiru, te 55 godina partnerstva sa Berlinom (četvrt Charlottenburg-Wilmersdorf), organiziramo raznovrsne aktivnosti: jezične tečajeve, kulturne izložbe, znanstvena predavanja, putovanja i društvene događaje.</p>

              <p className="text-gray-400 font-light leading-relaxed">
                Naša misija je promicati kulturnu razmjenu, jezičnu edukaciju i čvrsto prijateljstvo između Hrvatski i Njemačke, koristeći umjetnost, znanost, sport i obrazovanje kao mostove za sporazumijevanje.
              </p>

              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-600 text-white text-sm font-light hover:bg-yellow-500 transition duration-300">
                Pročitaj cijelu priču <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-[500px] bg-gradient-to-b from-slate-800 to-slate-950 border border-yellow-600/20 order-1 md:order-2"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                [Organization Image]
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { number: "35+", label: "Godina tradicije", icon: Zap },
              { number: "500+", label: "Članova u 6 lokacija", icon: Users },
              { number: "55", label: "Godina berlinska suradnja", icon: Globe },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <stat.icon className="w-8 h-8 mx-auto text-yellow-600" />
                <div className="text-5xl md:text-6xl font-light text-yellow-600">
                  {stat.number}
                </div>
                <p className="text-gray-400 font-light text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Berlin Partnership Section */}
      <section className="py-20 md:py-32 bg-slate-900 border-y border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8 mb-16"
          >
            <div>
              <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-4">Međunarodno partnerstvo</p>
              <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
                55 godina prijateljstva
              </h2>
              <p className="text-gray-300 font-light text-lg max-w-3xl mx-auto">
                Naša dugo trajuća suradnja sa Berlinom – posebno s četvrti Charlottenburg-Wilmersdorf – krasi našu zajedničku posvećenost kulturnom dijalogu, obrazovanju i međunarodnom razumijevanju.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="border-l-2 border-yellow-600 pl-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-light text-white mb-2">Kulturna razmjena</h3>
                  <p className="text-gray-300 font-light">Izleti, izložbe i gostovanja između Split i Berlina</p>
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-2">Jezični programi</h3>
                  <p className="text-gray-300 font-light">Njemački tečajevi i edukativni projekti</p>
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-2">Društveni događaji</h3>
                  <p className="text-gray-300 font-light">Obilježavanje zajedničkih praznika i godišnjica</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-96 bg-gradient-to-b from-slate-800 to-slate-950 rounded-sm flex items-center justify-center border border-yellow-600/30"
            >
              <div className="text-gray-600 font-light text-center">
                <p className="text-sm">[Berlin Partnership Image]</p>
                <p className="text-xs text-gray-700 mt-2">Split ↔ Berlin: 55 godina</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 md:py-32 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-2">Što činimo</p>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
              Naše aktivnosti
            </h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Jezični tečajevi", description: "Učenje njemačkog jezika od početnika do napredne razine" },
              { icon: Globe, title: "Kulturne izložbe", description: "Poznavanje njemačke i hrvatske kulture i tradicije" },
              { icon: Users, title: "Society Događaji", description: "Zazajedništa, večere, manifestacije i okupljanja članova" },
              { icon: MapPin, title: "Izleti i putovanja", description: "Istraživanje Balkana, posjete Berlinu i drugim europskim gradovima" },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-yellow-600/30 p-6 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300"
              >
                <activity.icon className="w-8 h-8 text-yellow-600 mb-4" />
                <h3 className="text-xl font-light text-white mb-2">{activity.title}</h3>
                <p className="text-gray-300 font-light text-sm">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-2">Nadolazeći</p>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
              Događaji i doživljaji
            </h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: "25. siječnja", title: "Razgovor njemačkog jezika", location: "Centar Split", icon: Globe },
              { date: "15. veljače", title: "Večer njemačke kulture", location: "Makarska" },
              { date: "10. ožujka", title: "Proljetni izlet - Otok Brač", location: "Brač" },
            ].map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-yellow-600/30 p-8 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300"
              >
                <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-3">
                  {event.date}
                </p>
                <h3 className="text-2xl font-light text-white mb-4 group-hover:text-amber-700 transition">
                  {event.title}
                </h3>
                <p className="text-gray-400 font-light text-sm">{event.location}</p>
              </motion.div>
            ))}
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
            <p className="text-yellow-600 font-light text-xs uppercase tracking-widest mb-4">Pridruži nam se</p>
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              Iskusite kulturnu razmjenu
            </h2>
            <p className="text-gray-300 font-light text-lg max-w-2xl mx-auto">
              Otkrijte bogate veze između hrvatskih i njemačkih kultura. Postanite dio živahne zajednice posvećene kulturnoj razmjeni i međusobnom razumijevanju.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300">
              Kontaktiraj nas <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

