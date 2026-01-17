"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, ChevronRight } from "lucide-react";
import { useI18n } from "@/app/context/I18nContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const quickLinks = [
    { href: "/", label: t("navigation.home") },
    { href: "/o-nama", label: t("navigation.about") },
    { href: "/aktivnosti", label: t("navigation.activities") },
    { href: "/vijesti", label: t("navigation.news") },
    { href: "/galerija", label: t("navigation.gallery") },
    { href: "/kronike", label: t("footer.chronicles") },
  ];

  const legalLinks = [
    { href: "/statut", label: t("footer.statute") },
    { href: "/privatnost", label: t("footer.privacy") },
    { href: "/uvjeti", label: t("footer.terms") },
  ];

  const locations = ["Split", "Makarska", "Brač", "Sinj"];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Hrvatsko-njema%C4%8Dko-dru%C5%A1tvo-Split/61571711064231/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/hnjd.split/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@hnds-hr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Top CTA Section */}
        <div className="py-16 md:py-20 border-b border-white/5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3"
              >
                {t("footer.ctaTitle") || "Postanite dio naše zajednice"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 font-light max-w-lg text-sm sm:text-base"
              >
                {t("footer.tagline")}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Link
                href="/membership"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-yellow-600 text-white font-light hover:bg-yellow-500 transition-all duration-300 text-sm sm:text-base"
              >
                {t("footer.becomeMember")}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-light hover:bg-white/5 hover:border-white/30 transition-all duration-300 text-sm sm:text-base"
              >
                {t("footer.contact")}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Links Grid - Improved mobile layout */}
        <div className="py-12 sm:py-16 md:py-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-8">
          {/* Brand Column - Full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8 pb-6 sm:pb-0 border-b sm:border-b-0 border-white/5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/30 rounded-full blur-md" />
                <Image
                  src="/cropped-HD_Ikona-1.jpg"
                  alt="HNDS Logo"
                  width={40}
                  height={40}
                  className="relative rounded-sm"
                />
              </div>
              <span className="text-xl font-light tracking-wider text-white">HNDS</span>
            </div>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-4 sm:mb-6">
              {t("footer.hnds")}
            </p>
            {/* Social Links - Larger touch targets on mobile */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all duration-300 active:scale-95"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-yellow-600 mb-6">
              {t("footer.usefulLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white font-light transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-yellow-600 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-yellow-600 mb-6">
              {t("footer.legal") || "Pravno"}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white font-light transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-yellow-600 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-yellow-600 mb-6">
              {t("footer.locations")}
            </h4>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location} className="text-sm text-gray-400 font-light flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-yellow-600/50" />
                  {location}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-yellow-600 mb-6">
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hnjd.split@gmail.com"
                  className="text-sm text-gray-400 hover:text-white font-light transition-colors duration-200 flex items-start gap-3 group"
                >
                  <Mail className="w-4 h-4 text-yellow-600/50 mt-0.5 flex-shrink-0" />
                  <span>hnjd.split@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+38598244124"
                  className="text-sm text-gray-400 hover:text-white font-light transition-colors duration-200 flex items-start gap-3 group"
                >
                  <Phone className="w-4 h-4 text-yellow-600/50 mt-0.5 flex-shrink-0" />
                  <span>+385 98 244 124</span>
                </a>
              </li>
              <li className="text-sm text-gray-400 font-light flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-600/50 mt-0.5 flex-shrink-0" />
                <span>
                  {t("footer.address")}
                  <br />
                  {t("footer.city")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bank Details Bar */}
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-gray-500 font-light">
            <span>
              <span className="text-gray-400">OIB:</span> 72936951527
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span>
              <span className="text-gray-400">IBAN:</span> HR5324070001024070003
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span>
              <span className="text-gray-400">BIC:</span> OTPVHR2X
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span>
              <span className="text-gray-400">{t("footer.bank")}:</span> OTP Bank
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-xs text-gray-600 font-light">
              © {currentYear} {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
