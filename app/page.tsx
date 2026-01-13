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

      {/* Hero Section - Modern Bold Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32">
        {/* Static background pattern - removed animation for performance */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        {/* Floating orbs - optimized for performance */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span 
                  className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6"
                >
                  Kulturni most
                </motion.span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] text-white mb-6">
                  Most između
                  <br />
                  <span className="font-serif italic bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                    kultura
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-300 font-light leading-relaxed max-w-lg"
              >
                Promoviranje kulturnih, jezičnih i prijateljskih veza između Hrvatske i Njemačke kroz tečajeve jezika, kulturne događaje, izlete i radionice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <motion.div>
                  <Link 
                    href="/#events" 
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-shadow duration-300"
                  >
                    Istraži događaje 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div>
                  <Link 
                    href="/about" 
                    className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
                  >
                    Saznaj više 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-yellow-600/20"
              >
                {[
                  { value: "35+", label: "Godina" },
                  { value: "500+", label: "Članova" },
                  { value: "6", label: "Lokacija" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <div className="text-3xl font-light text-yellow-500 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Decorative elements */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 backdrop-blur-3xl rounded-3xl"
                  animate={{ rotate: [6, 8, 6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center overflow-hidden"
                >
                  <div className="text-center space-y-4 p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Globe className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-light text-white">Hrvatski ↔ Deutsch</h3>
                    <p className="text-gray-400 text-sm">Povezujemo ljude i kulture</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Featured Works Section - Modern Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
              Istaknuto
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              Otkrijte naše
              <br />
              <span className="font-serif italic text-yellow-500">aktivnosti</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Bogatstvo programa kreiranih za povezivanje kultura i jezika
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                title: "Tečajevi jezika", 
                desc: "Stručno vodena nastava njemačkog jezika za sve razine znanja",
                icon: <BookOpen className="w-10 h-10" />,
                color: "from-yellow-600/20 to-yellow-500/10"
              },
              { 
                title: "Kulturni događaji", 
                desc: "Izložbe, koncerti i predstave koje oživljavaju tradiciju",
                icon: <Calendar className="w-10 h-10" />,
                color: "from-yellow-500/20 to-yellow-600/10"
              },
              { 
                title: "Kulturni izleti", 
                desc: "Putovanja koja obogaćuju i povezuju naše članove",
                icon: <MapPin className="w-10 h-10" />,
                color: "from-yellow-600/15 to-yellow-500/10"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-50`} />
                <div className="relative h-full bg-slate-900/90 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8">
                  <div className="flex flex-col h-full">
                    <div className="text-yellow-500 mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-light text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                    <Link 
                      href="/events" 
                      className="inline-flex items-center gap-2 text-yellow-500 text-sm font-medium mt-6"
                    >
                      Saznaj više
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Modern Elegant Layout */}
      <section id="about" className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Left: Content - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:col-span-3"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
                  Naša priča
                </span>
                <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
                  Most između 
                  <br />
                  <span className="font-serif italic text-yellow-500">naroda</span>
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Hrvatsko-njemačko društvo Split je most između hrvatske i njemačke kulture. Osnovano 1990. godine, kontinuirano djeluje na jačanju veza, razumijevanja i prijateljstva između naših naroda.
                </p>

                <p className="text-gray-400 font-light leading-relaxed">
                  S aktivnim podružnicama u Splitu, Makarskoj, Braču, Sinju i Trogiru, te 55 godina partnerstva s Berlinom (četvrt Charlottenburg-Wilmersdorf), organiziramo raznovrsne aktivnosti: jezične tečajeve, kulturne izložbe, znanstvena predavanja, putovanja i društvene događaje.
                </p>

                <p className="text-gray-400 font-light leading-relaxed">
                  Naša misija je promicati kulturnu razmjenu, jezičnu edukaciju i čvrsto prijateljstvo između Hrvatske i Njemačke, koristeći znanost, kulturu, sport i obrazovanje kao mostove za sporazumijevanje.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {[
                  { label: "Jezična edukacija", icon: <BookOpen className="w-5 h-5" /> },
                  { label: "Kulturna razmjena", icon: <Globe className="w-5 h-5" /> },
                  { label: "Putovanja", icon: <MapPin className="w-5 h-5" /> },
                  { label: "Društveni događaji", icon: <Users className="w-5 h-5" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="text-yellow-500">{item.icon}</div>
                    <span className="text-sm font-light">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/about" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Pročitaj cijelu priču 
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: Visual Element - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative lg:col-span-2"
            >
              <div className="relative aspect-[4/5]">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-3xl blur-2xl" />
                
                {/* Main container */}
                <div className="relative h-full bg-slate-900/80 backdrop-blur-sm border border-yellow-600/30 rounded-2xl overflow-hidden">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '30px 30px'}}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-yellow-600/20 flex items-center justify-center mb-4">
                      <Globe className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h3 className="text-3xl font-light text-white">35+ godina</h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Kontinuirano djelovanje u službi kulturnog povezivanja Hrvatske i Njemačke
                    </p>
                    <div className="pt-4 flex gap-8">
                      <div>
                        <div className="text-2xl font-light text-yellow-500">6</div>
                        <div className="text-xs text-gray-500 uppercase">Lokacija</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-yellow-500">500+</div>
                        <div className="text-xs text-gray-500 uppercase">Članova</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Elegant Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "35+", label: "Godina tradicije", icon: Zap, desc: "Kontinuirano djelovanje" },
              { number: "500+", label: "Aktivnih članova", icon: Users, desc: "U 6 lokacija" },
              { number: "55", label: "Godina partnerstva", icon: Globe, desc: "Split ↔ Berlin" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-slate-900/80 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-8 text-center">
                  <stat.icon className="w-10 h-10 mx-auto text-yellow-500 mb-6" />
                  <div className="text-5xl md:text-6xl font-light text-yellow-500 mb-3">
                    {stat.number}
                  </div>
                  <p className="text-white font-light text-lg mb-2">
                    {stat.label}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Berlin Partnership Section - Split Layout */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
                  Međunarodno partnerstvo
                </span>
                <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
                  Preko pola stoljeća
                  <br />
                  <span className="font-serif italic text-yellow-500">suradnje</span>
                </h2>
              </div>

              <p className="text-xl text-gray-300 font-light leading-relaxed">
                55 godina partnerstva između Splita i berlinske četvrti Charlottenburg-Wilmersdorf čini temelj dugogodišnje tradicije suradnje.
              </p>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Kulturna razmjena", desc: "Izleti, izložbe i gostovanja između Splita i Berlina", icon: <Globe className="w-5 h-5" /> },
                  { title: "Jezični programi", desc: "Njemački tečajevi i edukativni projekti", icon: <BookOpen className="w-5 h-5" /> },
                  { title: "Društveni događaji", desc: "Obilježavanje zajedničkih praznika i godišnjica", icon: <Calendar className="w-5 h-5" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border-l-2 border-yellow-600/50 hover:border-yellow-600 hover:bg-yellow-600/5 transition-all duration-300">
                    <div className="text-yellow-500 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                href="/chronicles" 
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
              >
                Kronike partnerstva
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <div className="absolute -inset-8 bg-gradient-to-br from-yellow-600/30 via-yellow-500/20 to-transparent rounded-3xl blur-3xl" />
                <div className="relative h-full bg-slate-900/80 backdrop-blur-sm border border-yellow-600/30 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 rounded-full bg-yellow-600/20 border-2 border-yellow-600/40 flex items-center justify-center mb-8">
                      <Globe className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h3 className="text-5xl font-light text-white mb-6">
                      Split <span className="text-yellow-500">↔</span> Berlin
                    </h3>
                    <div className="inline-flex items-center gap-4 mb-4">
                      <div className="text-4xl font-light text-yellow-500">55</div>
                      <div className="text-left">
                        <div className="text-sm text-gray-400">godina</div>
                        <div className="text-white font-light">Partnerstva</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Charlottenburg-Wilmersdorf</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section - Refreshed Cards */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
              Što činimo
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              Raznolike 
              <br />
              <span className="font-serif italic text-yellow-500">aktivnosti</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Od jezika do kulture - program za sve uzraste i interese
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Jezični tečajevi", description: "Učenje njemačkog jezika od početnika do napredne razine", color: "from-yellow-600/20" },
              { icon: Globe, title: "Kulturne izložbe", description: "Poznavanje njemačke i hrvatske kulture i tradicije", color: "from-yellow-500/20" },
              { icon: Users, title: "Društveni događaji", description: "Zajedništa, večere, manifestacije i okupljanja članova", color: "from-yellow-600/15" },
              { icon: MapPin, title: "Izleti i putovanja", description: "Istraživanje Balkana, posjete Berlinu i drugim europskim gradovima", color: "from-yellow-500/15" },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} to-transparent rounded-2xl blur-xl opacity-0`} />
                <div className="relative bg-slate-900/60 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-6 h-full">
                  <activity.icon className="w-10 h-10 text-yellow-500 mb-6" />
                  <h3 className="text-xl font-light text-white mb-3">{activity.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Modern Event Cards */}
      <section id="events" className="py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest mb-6">
              Nadolazeći
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              Događaji i
              <br />
              <span className="font-serif italic text-yellow-500">doživljaji</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Pridružite nam se na nadolazećim aktivnostima
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              { date: "25. siječnja", title: "Razgovor njemačkog jezika", location: "Centar Split", icon: Globe },
              { date: "15. veljače", title: "Večer njemačke kulture", location: "Makarska", icon: Calendar },
              { date: "10. ožujka", title: "Proljetni izlet - Otok Brač", location: "Brač", icon: MapPin },
            ].map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-yellow-600/20 rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500">
                      <event.icon className="w-6 h-6" />
                    </div>
                    <span className="text-yellow-500 font-medium text-sm uppercase tracking-wider">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 leading-snug">
                    {event.title}
                  </h3>
                  <p className="flex items-center gap-2 text-gray-400 font-light text-sm">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                  <div className="mt-6 pt-6 border-t border-yellow-600/20">
                    <Link 
                      href="/events" 
                      className="inline-flex items-center gap-2 text-yellow-500 text-sm font-medium"
                    >
                      Više detalja
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link 
              href="/events" 
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-yellow-600/50 text-white text-sm font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
            >
              Pogledaj sve događaje
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Modern Gradient Design */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-yellow-950/20"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-500 font-medium text-xs uppercase tracking-widest">
              Pridruži nam se
            </span>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
              Postanite dio
              <br />
              <span className="font-serif italic bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                naše zajednice
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              Otkrijte bogate veze između hrvatskih i njemačkih kultura. Pridružite se živahnoj zajednici posvećenoj kulturnoj razmjeni i međusobnom razumijevanju.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <Link
              href="/membership"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-base font-medium hover:shadow-2xl hover:shadow-yellow-600/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Postani član
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-yellow-600/50 text-white text-base font-medium hover:bg-yellow-600/10 hover:border-yellow-600 transition-all duration-300"
            >
              Kontaktirajte nas
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-yellow-600/20"
          >
            {[
              { icon: <BookOpen className="w-6 h-6" />, label: "Jezični tečajevi" },
              { icon: <Calendar className="w-6 h-6" />, label: "Kulturni događaji" },
              { icon: <MapPin className="w-6 h-6" />, label: "Putovanja" },
              { icon: <Users className="w-6 h-6" />, label: "Zajednica" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <div className="text-yellow-500">{item.icon}</div>
                <span className="text-sm font-light text-center">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

