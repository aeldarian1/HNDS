"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/app/context/I18nContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  // Memoize navigation links
  const navLinks = useMemo(() => [
    { href: "/", label: t("navigation.home") },
    { href: "/o-nama", label: t("navigation.about") },
    { href: "/aktivnosti", label: t("navigation.activities") },
    { href: "/vijesti", label: t("navigation.news") },
    { href: "/galerija", label: t("navigation.gallery") },
    { href: "/kontakt", label: t("navigation.contact") },
  ], [t]);

  // Memoize toggle function
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Memoize animation variants
  const menuVariants = useMemo(() => ({
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.07,
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }), []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/98 backdrop-blur-md border-b border-yellow-600/20 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between h-20 md:h-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                <Image 
                  src="/cropped-HD_Ikona-1.jpg" 
                  alt="HNDS Logo" 
                  width={40} 
                  height={40}
                  className="relative object-contain group-hover:scale-110 transition-transform duration-300 md:w-11 md:h-11"
                />
              </div>
              <span className="text-lg md:text-xl font-light tracking-widest text-yellow-500 group-hover:text-yellow-400 transition-colors">HNDS</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex gap-1 items-center"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-light text-gray-300 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300" />
              </Link>
            ))}
            <Link 
              href="/kontakt" 
              className="ml-4 px-6 py-2.5 bg-yellow-600/10 border border-yellow-600/40 text-sm font-medium text-yellow-500 hover:bg-yellow-600 hover:text-white hover:border-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/20"
            >
              {t("navigation.contact")}
            </Link>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-500 transition-colors z-50 relative p-2.5 hover:bg-yellow-600/10 rounded-lg active:scale-95"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={26} className="text-yellow-500" /> : <Menu size={26} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden bg-slate-900/98 backdrop-blur-lg border-b border-yellow-600/20 shadow-2xl"
            >
              <div className="px-6 py-8 space-y-2 max-w-7xl mx-auto">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block text-base font-light text-white hover:text-yellow-500 hover:bg-yellow-600/5 rounded-lg transition-all py-3.5 px-4 border-l-2 border-transparent hover:border-yellow-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="pt-2">
                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3.5 border border-yellow-600/40 text-base font-medium text-yellow-500 bg-yellow-600/10 hover:bg-yellow-600 hover:text-white transition-all duration-300 text-center rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Kontakt
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-6 border-t border-yellow-600/20">
                  <LanguageSwitcher />
                </motion.div>

                {/* Social Links in Mobile Menu */}
                <motion.div variants={itemVariants} className="pt-6 border-t border-yellow-600/20 mt-6">
                  <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-4 px-4">Prati nas</p>
                  <div className="flex gap-6 px-4">
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">Instagram</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">Facebook</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">YouTube</a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
