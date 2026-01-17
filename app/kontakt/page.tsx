'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import {
  HeroFadeIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/app/components/ui/Animations';
import { SectionHeader, Container, Section, Badge } from '@/app/components/ui/Common';
import { MotionCard } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input, Textarea, Select, Checkbox } from '@/app/components/ui/Form';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresa',
    content: 'Matice hrvatske 2',
    subcontent: '21000 Split, Hrvatska',
    href: 'https://maps.google.com/?q=Matice+hrvatske+2+Split',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+385 21 344 561',
    subcontent: 'Radno vrijeme: pon-pet',
    href: 'tel:+38521344561',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@hnds.hr',
    subcontent: 'Odgovaramo unutar 24h',
    href: 'mailto:info@hnds.hr',
  },
  {
    icon: Clock,
    title: 'Radno vrijeme',
    content: 'Pon - Pet: 9:00 - 17:00',
    subcontent: 'Sub: prema dogovoru',
    href: null,
  },
];

const subjectOptions = [
  { value: '', label: 'Odaberite temu' },
  { value: 'membership', label: 'Članstvo u društvu' },
  { value: 'courses', label: 'Tečajevi njemačkog jezika' },
  { value: 'events', label: 'Događaji i aktivnosti' },
  { value: 'partnership', label: 'Suradnja i partnerstvo' },
  { value: 'media', label: 'Medijski upiti' },
  { value: 'other', label: 'Ostalo' },
];

export default function KontaktPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', privacy: false });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(234,179,8,0.08),transparent_50%)]" />
        <Container className="relative">
          <HeroFadeIn className="space-y-4 sm:space-y-6 max-w-3xl text-center mx-auto">
            <Badge variant="outline" className="mb-2 sm:mb-4">
              <Mail className="w-3 h-3 mr-1" />
              Javite nam se
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-tight">
              Kontaktirajte nas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed">
              Javite nam se za više informacija
            </p>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto" />
          </HeroFadeIn>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <Section>
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const Wrapper = info.href ? 'a' : 'div';
              const wrapperProps = info.href 
                ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined }
                : {};

              return (
                <StaggerItem key={index}>
                  <Wrapper {...wrapperProps}>
                    <MotionCard
                      className="bg-slate-900/50 border border-yellow-600/20 p-4 sm:p-5 md:p-6 h-full text-center cursor-pointer active:scale-[0.98] transition-transform"
                      hoverY={-8}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-yellow-600/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-light text-white mb-1 sm:mb-2">{info.title}</h3>
                      <p className="text-yellow-500 font-light text-xs sm:text-sm md:text-base break-all">{info.content}</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-light">{info.subcontent}</p>
                    </MotionCard>
                  </Wrapper>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            {/* Form */}
            <FadeIn>
              <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-5 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">Pošaljite upit</h2>
                <p className="text-gray-400 font-light mb-6 sm:mb-8 text-sm sm:text-base">
                  Ispunite obrazac i javit ćemo vam se u najkraćem roku.
                </p>

                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-light text-white mb-2">Hvala vam!</h3>
                    <p className="text-gray-400 font-light mb-6">
                      Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.
                    </p>
                    <Button onClick={() => setFormStatus('idle')}>
                      Pošalji novu poruku
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Input
                        label="Ime i prezime"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Vaše ime i prezime"
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="vasa@email.adresa"
                      />
                    </div>

                    <Select
                      label="Tema"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      options={subjectOptions}
                    />

                    <Textarea
                      label="Poruka"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Vaša poruka..."
                      rows={5}
                    />

                    <Checkbox
                      label={
                        <>
                          Slažem se s{' '}
                          <a href="/privatnost" className="text-yellow-500 hover:underline">
                            pravilima privatnosti
                          </a>
                        </>
                      }
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      required
                    />

                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Došlo je do pogreške. Pokušajte ponovno.
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={formStatus === 'loading' || !formData.privacy}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Slanje...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Pošalji poruku
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map */}
            <FadeIn delay={0.2}>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-2">Pronađite nas</h2>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Posjetite nas u našem uredu u centru Splita.
                </p>

                <div className="aspect-video bg-slate-900 border border-yellow-600/20 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.5461111111!2d16.4391111!3d43.5080556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355dfc6b4c0001%3A0x1234567890abcdef!2sMatice%20hrvatske%202%2C%20Split!5e0!3m2!1shr!2shr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HNDS Location"
                  />
                </div>

                <div className="bg-slate-900/50 border border-yellow-600/20 rounded-lg p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg font-light text-white mb-3 sm:mb-4">Kako do nas</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-400 font-light text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      Autobusne linije 1, 2, 5, 9 - stanica kod Matice hrvatske
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      Javni parking dostupan 50m od ureda
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      5 minuta hoda od Rive
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
}
