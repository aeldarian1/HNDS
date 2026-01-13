"use client";

import { motion } from "framer-motion";
import { MapPin, Users, BookOpen, Globe, Calendar, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { RevealOnScroll, ScaleOnHover } from "../components/InteractiveElements";
export default function About() {
  const chapters = [
    { name: "Split", location: "Glavna podružnica", description: "Sjedište organizacije i kulturni centar. Organizira jezične tečajeve, predavanja, izložbe i društvene događaje", icon: MapPin },
    { name: "Makarska", location: "Obalna podružnica - Najaktivnije članske aktivnosti", description: "Opslužuje Makarske rivijere s aktivnostima uključujući kulinarskih događaka, izložbe i izlete", icon: Users },
    { name: "Brač", location: "Otočka podružnica", description: "Kulturna razmjena na otoku s fokusom na lokalne tradicije i okupljanja članova", icon: Globe },
    { name: "Sinj", location: "Cetinska krajina - U razvoju", description: "Nova inicijativa za jačanje suradnje s Cetinskom krajinom i lokalnom zajednicom", icon: BookOpen },
    { name: "Trogir", location: "Povijesna gradska podružnica", description: "Čuvanje i promicanje svjetske kulturne baštine Trogira", icon: MapPin },
    { name: "Berlin", location: "Sestra organizacija", description: "Dugo trajuća suradnja s četvrti Charlottenburg-Wilmersdorf - 55 godina partnerstva", icon: Globe },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-light text-white">O HNDS-u</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Naslijeđe razvoja kulturnog mosta između Hrvatske i Njemačke
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naša misija</h2>
                <div className="w-12 h-px bg-yellow-600" />
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  Hrvatsko-njemačko društvo Split promiče kulturne, jezične i prijateljske veze između Hrvatske i Njemačke. Kao most između dviju kultura, organiziramo jezične tečajeve, kulturna događanja, izlete i putovanja, predavanja i radionice.
                </p>

                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  Tijekom više od 35 godina naši članovi su izgradili trajne veze kroz razumijevanje, suradnju i iskreno prijateljstvo. Naš rad obuhvaća sve vrste kulturne razmjene, od edukativnih programa do društvenih događaja i izleta po našoj lijepoj hrvatskoj obali.
                </p>

                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  S ogranima u Splitu, Makarskoj, Braču, Sinju i Trogiru, te snažnom vezom s Berlinom, nastavljamo tradiciju spajanja naroda kroz kulturu, jezik i zajedničke vrijednosti.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <Users className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Zajednica</h3>
                      <p className="text-gray-300 font-light">Okupljanje ljudi preko granica i jezika</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <BookOpen className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Učenje</h3>
                      <p className="text-gray-300 font-light">Jezični tečajevi, predavanja i kulturne radionice</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Globe className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Veza</h3>
                      <p className="text-gray-300 font-light">Međunarodno prijateljstvo i suradnja između naroda</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-96 md:h-[500px] relative overflow-hidden rounded-lg"
            >
              {/* Decorative background with floating elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                {/* Animated grid pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Floating icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute top-1/4 left-1/4"
                      animate={{
                        y: [-20, 20, -20],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Calendar className="w-16 h-16 text-yellow-600/40" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute top-1/3 right-1/4"
                      animate={{
                        y: [20, -20, 20],
                        rotate: [5, -5, 5],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="w-20 h-20 text-yellow-600/30" />
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-1/3 left-1/3"
                      animate={{
                        y: [-15, 15, -15],
                        rotate: [-3, 3, -3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-14 h-14 text-yellow-600/50" />
                    </motion.div>
                    
                    {/* Central logo */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-3xl" />
                        <Globe className="w-32 h-32 text-yellow-600 relative z-10" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naša povijest</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="space-y-12">
            {[
              { year: "1990", title: "Osnivanje", description: "HNDS osnovan kako bi promovira kulturnu razmjenu između Hrvatske i Njemačke" },
              { year: "2000", title: "Ekspanzija", description: "Uspostavljene podružnice u Makarskoj, Brču i Sinju" },
              { year: "2010", title: "Rast", description: "Proširenje u Trogir i osnivanje sestre organizacije u Berlinu" },
              { year: "2024", title: "Prema sadašnjosti", description: "500+ članova na 6 lokacija, 50+ događaja godišnje" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-600 text-white flex items-center justify-center font-light rounded-full">
                    {item.year.slice(-2)}
                  </div>
                  {i < 3 && <div className="w-px h-20 bg-yellow-600/30 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-light text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Naše podružnice</h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, i) => (
              <RevealOnScroll key={i} delay={i * 0.1} direction="up">
                <ScaleOnHover scale={1.03}>
                  <div className="border border-yellow-600/30 p-8 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300 h-full">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      <chapter.icon className="w-8 h-8 text-yellow-600 mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-light text-white mb-2">{chapter.name}</h3>
                    <p className="text-sm text-yellow-600 font-light uppercase tracking-wide mb-3">
                      {chapter.location}
                    </p>
                    <p className="text-gray-300 font-light">{chapter.description}</p>
                  </div>
                </ScaleOnHover>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Što vrijedujemo</h2>
            <div className="w-12 h-px bg-yellow-600 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Kulturni poštovanje", description: "Poštovanje hrvatskih i njemačkih tradicija s jednakom vrijednosti. Čuvanje baštine i moderna perspektiva zajedno oblikuju našu kulturnu misiju." },
              { title: "Jezična edukacija", description: "Pružanje pristupačnih i kvalitetnih tečajeva koji jačaju međusobnu komunikaciju i razumijevanje. Jezik je most između naroda." },
              { title: "Međunarodno prijateljstvo", description: "55 godina aktivne suradnje s Berlinom dokazuje da dugotrajne veze nastaju kroz doslednost, zajedničke vrijednosti i autentično čovjekovo prijateljstvo." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <h3 className="text-2xl font-light text-white">{value.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-yellow-600 text-white border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-4">Pridruži se našoj zajednici</h2>
            <p className="text-yellow-100 font-light text-lg">Postani dio nečeg smislenog</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="px-8 py-3 bg-white text-yellow-600 font-light hover:bg-yellow-100 transition duration-300"
          >
            Kontaktiraj nas
          </motion.button>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
              <div className="text-lg font-light tracking-widest text-yellow-600 mb-4">HNDS</div>
              <p className="text-sm font-light text-gray-400">
                Povezivanje kultura, izgradnja prijateljstava od 1990.
              </p>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Povezave</h4>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><Link href="/about" className="hover:text-yellow-600 transition">O nama</Link></li>
                <li><Link href="/#events" className="hover:text-yellow-600 transition">Događaji</Link></li>
                <li><Link href="/gallery" className="hover:text-yellow-600 transition">Galerija</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Slijedi</h4>
              <ul className="space-y-2 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-yellow-600 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition">Facebook</a></li>
                <li><a href="#" className="hover:text-yellow-600 transition">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Kontakt</h4>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Sinjska 3<br />21000 Split<br />+385 98 244 124<br />hnjd.split@gmail.com
              </p>
            </div>
          </div>
          <div className="border-t border-yellow-600/30 pt-8 text-center text-xs font-light text-gray-600 tracking-wide">
            <p>&copy; 2026 HNDS SPLIT. SVI PRAVA ZADRŽANA.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
