"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresa",
      details: ["Sinjska 3", "21000 Split, Hrvatska"],
    },
    {
      icon: Phone,
      title: "Telefon",
      details: ["+385 98 244 124"],
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["hnjd.split@gmail.com"],
    },
  ];

  return (
    <main className="bg-slate-950 text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-7xl font-light text-white">
              Kontaktiraj nas
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light">
              Imaš pitanja? Voljeli bismo čuti od tebe. Javi nam se danas.
            </p>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-slate-950 border-b border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <info.icon className="w-8 h-8 text-yellow-600 mx-auto" />
                <h3 className="text-xl font-light text-white">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-300 font-light">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Branches Section */}
          <div className="mt-20 pt-20 border-t border-yellow-600/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                Naše podružnice
              </h2>
              <div className="w-12 h-px bg-yellow-600" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Split", desc: "Glavna podružnica i sjedište", contact: "+385 98 244 124" },
                { name: "Makarska", desc: "Obalna podružnica s aktivnostima", contact: "Lokalni kontakti" },
                { name: "Brač", desc: "Otočna kulturna razmjena", contact: "Lokalni kontakti" },
                { name: "Sinj", desc: "Nova inicijativa u razvoju", contact: "U osnivanju" },
                { name: "Trogir", desc: "Čuvanje svjetske baštine", contact: "Lokalni kontakti" },
                { name: "Berlin", desc: "Sestra organizacija - 55 godina", contact: "Charlottenburg-Wilmersdorf" },
              ].map((branch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-yellow-600/30 p-6 hover:border-yellow-600 hover:bg-yellow-600/5 transition duration-300"
                >
                  <h3 className="text-2xl font-light text-white mb-2">{branch.name}</h3>
                  <p className="text-gray-300 font-light text-sm mb-4">{branch.desc}</p>
                  <p className="text-yellow-600 font-light text-xs uppercase tracking-wider">{branch.contact}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-32 pt-20 border-t border-yellow-600/30">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
                  Pošalji nam poruku
                </h2>
                <div className="w-12 h-px bg-yellow-600" />
              </div>

              <p className="text-gray-300 font-light leading-relaxed">
                Bilo da te zanima prisutnost na našim događajima, uzimanje tječaja jezika ili
                samo želiš saznati više o HNDS-u, tu smo da ti pomognemo.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-light text-white mb-2">Vrijeme rada</h4>
                  <p className="text-gray-300 font-light">Ponedjeljak - Petak: 18:00 - 21:00</p>
                  <p className="text-gray-300 font-light">Subota: 10:00 - 14:00</p>
                </div>

                <div>
                  <h4 className="font-light text-white mb-2">Slijedi nas</h4>
                  <div className="flex gap-4">
                    <a href="#" className="text-yellow-600 hover:text-yellow-500 font-light">
                      Instagram
                    </a>
                    <a href="#" className="text-yellow-600 hover:text-yellow-500 font-light">
                      Facebook
                    </a>
                    <a href="#" className="text-yellow-600 hover:text-yellow-500 font-light">
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-light text-white mb-2">Ime</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-yellow-600/30 bg-slate-900 text-white focus:border-yellow-600 focus:outline-none font-light transition"
                    placeholder="Tvoje ime"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-white mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-yellow-600/30 bg-slate-900 text-white focus:border-yellow-600 focus:outline-none font-light transition"
                      placeholder="tvoj@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-yellow-600/30 bg-slate-900 text-white focus:border-yellow-600 focus:outline-none font-light transition"
                      placeholder="+385 98 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-white mb-2">Naslov</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-yellow-600/30 bg-slate-900 text-white focus:border-yellow-600 focus:outline-none font-light transition"
                    placeholder="Naslov poruke"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-white mb-2">Poruka</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-yellow-600/30 bg-slate-900 text-white focus:border-yellow-600 focus:outline-none font-light transition resize-none"
                    placeholder="Tvoja poruka..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition duration-300"
                >
                  {submitted ? "Poruka poslana! " : "Pošalji poruku"}
                </button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-light"
                >
                  Hvala! Javit ćemo ti se uskoro.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 md:py-32 bg-slate-900 border-t border-yellow-600/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Find Us
            </h2>
            <div className="w-12 h-px bg-yellow-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-sm flex items-center justify-center"
          >
            <p className="text-gray-500 font-light">Rezervirano mjesto za kartu - Split, Hrvatska</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
