'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Users, Heart, Globe, BookOpen, Music } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { RevealOnScroll, ScaleOnHover } from '@/app/components/InteractiveElements';

export default function MembershipPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const membershipTiers = [
    {
      id: 1,
      name: 'Učenik',
      price: '50 kn',
      period: 'godišnje',
      description: 'Savršeno za studente i mlade profesionalce',
      benefits: [
        'Popust na ulaznice za događaje (20% popusta)',
        'Pristup događajima samo za članove',
        'Mjesečni newsletter',
        'Značka člana zajednice',
        'Glasačko pravo na sjednicama podružnice',
      ],
      cta: 'Pridruži se kao učenik',
      highlighted: false,
    },
    {
      id: 2,
      name: 'Pojedinac',
      price: '150 kn',
      period: 'godišnje',
      description: 'Naš najpopularniji nivo članstva',
      benefits: [
        'Svi benefiti učenika',
        'Popust na ulaznice za događaje (30% popusta)',
        'Prioritetna registracija za događaje',
        'Ekskluzivni događaji samo za članove',
        'Pristup digitalnom direktoriju članova',
        'Popusti na robu',
        'Privilegije za goste (voditi 1 gosta na događaje)',
      ],
      cta: 'Pridruži se kao pojedinac',
      highlighted: true,
    },
    {
      id: 3,
      name: 'Obitelj',
      price: '300 kn',
      period: 'godišnje',
      description: 'Za obitelji koje žele sudjelovati zajedno',
      benefits: [
        'Svi benefiti pojedinca za do 4 člana',
        'Popusti za obiteljske događaje (40% popusta)',
        'Prioritetna registracija za obiteljske događaje',
        'Namjenski koordinator obitelji',
        'Obiteljska sekcija u direktoriju članova',
        'Ekskluzivna obiteljska okupljanja',
        'Plus 2 gostoprimstva po članu',
      ],
      cta: 'Pridruži se kao obitelj',
      highlighted: false,
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Povezanost zajednice',
      description: 'Pridruži se živahnoj zajednici entuzijasta hrvatske kulture i gradi trajne prijateljstva.',
    },
    {
      icon: Heart,
      title: 'Ekskluzivni događaji',
      description: 'Pristupite događajima samo za članove, okupljanjima i proslavama tijekom godine.',
    },
    {
      icon: Globe,
      title: 'Kulturna razmjena',
      description: 'Sudjeluj u kulturnim radionicama, tečajevima jezika i edukativnim programima.',
    },
    {
      icon: BookOpen,
      title: 'Resursi i knjižnica',
      description: 'Pristupite članskoj knjižnici s knjigama, člancima i resursima o hrvatskoj kulturi.',
    },
    {
      icon: Music,
      title: 'Događaji i nastopi',
      description: 'Uživajte u sniženim ulaznicama za koncerte, izložbe i kulturne nastupe.',
    },
    {
      icon: Globe,
      title: 'Umrežavanje',
      description: 'Povežite se s umno istomišljenim pojedincima i proširite svoju poslovnu mrežu.',
    },
  ];

  const faqs = [
    {
      question: 'Kako postati član?',
      answer: 'Možete se pridružiti online putem našeg obrasca za članstvo ili nas posjetiti osobno na našem uredu. Odaberite nivo članstva i dovršite registraciju. Članstvo je aktivno odmah nakon uplate.',
    },
    {
      question: 'Mogu li promijeniti nivo članstva kasnije?',
      answer: 'Da! Možete nadograditi ili sniziti članstvo bilo kada. Ako nadogradite sredinom godine, razmotriti ćemo razliku. Snižavanja stupaju na snagu na datum vašeg sljedećeg obnavljanja.',
    },
    {
      question: 'Se li članstva automatski obnavljaju?',
      answer: 'Da, članstva se automatski obnavljaju na datum vaše godišnjice. Poslat ćemo vam email podsjetnika prije obnavljanja. Možete otkazati bilo kada kontaktiranjem našeg ureda.',
    },
    {
      question: 'Postoje li dodatne naknade?',
      answer: 'Članarine uključuju sve navedene benefite. Pojedini događaji mogu imati dodatne naknade za materijale, hranu ili transport, ali članovi uvijek dobijaju popuste na njih.',
    },
    {
      question: 'Mogu li se nečlanovi pojaviti na našim događajima?',
      answer: 'Da! Nečlanovi mogu sudjelovati na većini naših javnih događaja po punoj cijeni. Članovi dobijaju značajne popuste i pristup ranoj registraciji.',
    },
    {
      question: 'Što ako želim otkazati članstvo?',
      answer: 'Možete otkazati bilo kada obavijestom našeg ureda. Ne nudimo povrat za trenutni period članstva, ali vaše članstvo ostaje aktivno do datuma obnavljanja.',
    },
  ];

  return (
    <main className="bg-slate-950">
      <Navigation />

      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-light text-white">Članstvo</h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Pridruži se našoj zajednici i postani dio nečega posebnog
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <RevealOnScroll key={tier.id} delay={index * 0.1} direction="up">
                <ScaleOnHover scale={tier.highlighted ? 1.05 : 1.02}>
                  <motion.div
                    className={`relative overflow-hidden transition duration-300 h-full flex flex-col ${
                      tier.highlighted
                        ? 'border-2 border-yellow-600 shadow-2xl shadow-yellow-600/20'
                        : 'border border-yellow-600/30 hover:border-yellow-600'
                    }`}
                    whileHover={tier.highlighted ? { y: -8 } : {}}
                  >
                    {tier.highlighted && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 to-yellow-500">
                        <motion.div
                          className="h-full bg-white/50"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          style={{ width: '30%' }}
                        />
                      </div>
                    )}

                    <div className={`p-8 flex-1 flex flex-col ${tier.highlighted ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
                      {tier.highlighted && (
                        <motion.div 
                          className="inline-block px-3 py-1 mb-4 bg-yellow-600/20 border border-yellow-600 text-yellow-600 text-xs font-light uppercase tracking-wide w-fit"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Najpopularnije
                        </motion.div>
                      )}

                      <h3 className="text-2xl font-light text-white mb-2">{tier.name}</h3>
                      <p className="text-gray-400 text-sm font-light mb-6">{tier.description}</p>

                      <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                          <motion.span 
                            className="text-4xl font-light text-yellow-600"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tier.price}
                          </motion.span>
                          <span className="text-gray-400 font-light">{tier.period}</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 font-light transition duration-300 mb-8 ${
                          tier.highlighted
                            ? 'bg-yellow-600 text-white hover:bg-yellow-500'
                            : 'border border-yellow-600 text-yellow-600 hover:bg-yellow-600/10'
                        }`}
                      >
                        {tier.cta}
                      </motion.button>

                      <div className="space-y-4 flex-1">
                        {tier.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-300 font-light">{benefit}</span>
                      </motion.div>
                    ))}
                      </div>
                    </div>
                  </motion.div>
                </ScaleOnHover>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-y border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Zašto se pridružiti?</h2>
            <p className="text-xl text-gray-300 font-light">Benefiti članstva HNDS-a</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <RevealOnScroll key={index} delay={index * 0.1} direction="up">
                  <ScaleOnHover scale={1.03}>
                    <div className="p-8 border border-yellow-600/30 hover:border-yellow-600 hover:bg-slate-800/50 transition duration-300 h-full">
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-yellow-600 mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-light text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-400 font-light text-sm">{benefit.description}</p>
                    </div>
                  </ScaleOnHover>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Česta pitanja</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border border-yellow-600/30 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-slate-900 transition duration-300 flex items-center justify-between"
                >
                  <h3 className="text-lg font-light text-white">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-yellow-600"
                  >
                    ▼
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedFaq === index ? 'auto' : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-slate-900/50 border-t border-yellow-600/30"
                >
                  <p className="p-6 text-gray-300 font-light">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Spreman/sprema za pridruživanje?</h2>
            <p className="text-gray-300 font-light text-lg mb-8">
              Odaberite nivo članstva i počnite uživati benefite danas
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/contact"
              className="px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300"
            >
              Kontaktiraj nas
            </Link>
            <Link
              href="/events"
              className="px-8 py-3 border border-yellow-600 text-yellow-600 font-light hover:bg-yellow-600/10 transition duration-300"
            >
              Pogledaj događaje
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
