"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X, Home, Info, Activity, Newspaper, Image as ImageIcon, Mail, ChevronRight, Instagram, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher, { LanguageSwitcherMobile } from "./LanguageSwitcher";
import { useI18n } from "@/app/context/I18nContext";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();

  // Memoize navigation links with icons
  const navLinks = useMemo(() => [
    { href: "/", label: t("navigation.home"), icon: Home },
    { href: "/o-nama", label: t("navigation.about"), icon: Info },
    { href: "/aktivnosti", label: t("navigation.activities"), icon: Activity },
    { href: "/vijesti", label: t("navigation.news"), icon: Newspaper },
    { href: "/galerija", label: t("navigation.gallery"), icon: ImageIcon },
    { href: "/kontakt", label: t("navigation.contact"), icon: Mail },
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
  const menuVariants: Variants = useMemo(() => ({
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      }
    }
  }) as Variants, []);

  const itemVariants: Variants = useMemo(() => ({
    closed: { 
      opacity: 0, 
      x: 50,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }) as Variants, []);

  const backdropVariants: Variants = useMemo(() => ({
    closed: { 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }) as Variants, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/98 backdrop-blur-md border-b border-yellow-600/20 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex items-center justify-between gap-8 h-20 md:h-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
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
              <span className="text-lg md:text-xl font-light tracking-widest text-yellow-500 group-hover:text-yellow-400 transition-colors whitespace-nowrap">HNDS</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex gap-1 lg:gap-2 items-center flex-1 justify-end"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-light text-gray-300 hover:text-white transition-colors group uppercase whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300" />
              </Link>
            ))}
            <div className="ml-3 lg:ml-4 flex-shrink-0">
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
              className="md:hidden fixed top-0 right-0 h-screen w-[85vw] max-w-sm bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-gradient-to-b from-slate-950/98 to-slate-950/80 backdrop-blur-lg px-6 py-6 border-b border-yellow-600/10 z-10 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-lg" />
                      <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-full p-1 border border-yellow-500/20">
                        <Image 
                          src="/cropped-HD_Ikona-1.jpg" 
                          alt="HNDS Logo" 
                          width={32} 
                          height={32}
                          className="relative object-contain rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-medium tracking-widest text-yellow-500">HNDS</span>
                      <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider">Menu</span>
                    </div>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="text-white hover:text-yellow-500 transition-all duration-300 p-2.5 hover:bg-yellow-600/10 rounded-xl active:scale-95 border border-transparent hover:border-yellow-600/20"
                    aria-label="Close menu"
                  >
                    <X size={22} className="text-yellow-500" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="px-6 py-6 space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  
                  return (
                    <motion.div 
                      key={link.href} 
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={link.href}
                        className={`group relative flex items-center justify-between py-4 px-5 rounded-2xl transition-all duration-300 overflow-hidden border
                          ${isActive 
                            ? 'bg-gradient-to-br from-yellow-600/25 to-yellow-500/15 text-yellow-400 shadow-xl shadow-yellow-600/20 border-yellow-500/40' 
                            : 'bg-gradient-to-br from-white/5 to-white/3 text-gray-300 hover:text-white hover:from-white/8 hover:to-white/5 border-white/5 hover:border-yellow-600/20'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Background shimmer effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`} />
                        
                        {/* Content */}
                        <div className="relative flex items-center gap-4 flex-1">
                          <div className={`p-2.5 rounded-xl transition-all duration-300 shadow-lg ${isActive ? 'bg-yellow-500/30 text-yellow-400 shadow-yellow-500/30' : 'bg-white/10 text-gray-400 group-hover:bg-yellow-600/15 group-hover:text-yellow-500 group-hover:shadow-yellow-600/20'}`}>
                            <Icon size={20} strokeWidth={1.5} />
                          </div>
                          <span className="text-sm font-light tracking-wider uppercase">{link.label}</span>
                        </div>
                        
                        {/* Arrow indicator */}
                        <ChevronRight 
                          size={18} 
                          className={`relative transition-all duration-300 ${isActive ? 'text-yellow-400 translate-x-1' : 'text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-1'}`}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-r-full shadow-lg shadow-yellow-500/50"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Language Switcher Section */}
              <motion.div 
                custom={navLinks.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-6 py-6 border-t border-yellow-600/10"
              >
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-600/20" />
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Jezik</p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-600/20" />
                </div>
                <LanguageSwitcherMobile />
              </motion.div>

              {/* Social Links Section */}
              <motion.div 
                custom={navLinks.length + 1}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-6 py-6 border-t border-yellow-600/10"
              >
                <div className="flex items-center gap-2 mb-5 px-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-600/20" />
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Društvene mreže</p>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-600/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <a 
                    href="https://www.instagram.com/hnjd.split/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center gap-3 py-4 px-4 bg-gradient-to-br from-white/8 to-white/3 hover:from-white/12 hover:to-white/6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-yellow-600/30 shadow-lg hover:shadow-xl hover:shadow-yellow-600/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-yellow-600/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                    <div className="relative p-3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 rounded-xl transition-all duration-300 shadow-lg">
                      <Instagram size={20} className="text-pink-400 group-hover:text-pink-300 transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="relative text-xs text-gray-400 group-hover:text-gray-200 transition-colors font-light">Instagram</span>
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/people/Hrvatsko-njema%C4%8Dko-dru%C5%A1tvo-Split/61571711064231/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center gap-3 py-4 px-4 bg-gradient-to-br from-white/8 to-white/3 hover:from-white/12 hover:to-white/6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-yellow-600/30 shadow-lg hover:shadow-xl hover:shadow-yellow-600/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-yellow-600/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                    <div className="relative p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 rounded-xl transition-all duration-300 shadow-lg">
                      <Facebook size={20} className="text-blue-400 group-hover:text-blue-300 transition-colors" strokeWidth={1.5} />
                    </div>
                    <span className="relative text-xs text-gray-400 group-hover:text-gray-200 transition-colors font-light">Facebook</span>
                  </a>
                </div>
                
                <a 
                  href="https://www.youtube.com/@hnds-hr" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-3 py-4 px-4 bg-gradient-to-br from-white/8 to-white/3 hover:from-white/12 hover:to-white/6 rounded-2xl transition-all duration-300 border border-white/10 hover:border-yellow-600/30 shadow-lg hover:shadow-xl hover:shadow-yellow-600/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-yellow-600/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  <div className="relative p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 rounded-xl transition-all duration-300 shadow-lg">
                    <Youtube size={20} className="text-red-400 group-hover:text-red-300 transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="relative text-sm text-gray-400 group-hover:text-gray-200 transition-colors font-light">YouTube</span>
                </a>
              </motion.div>

              {/* Footer info */}
              <motion.div 
                custom={navLinks.length + 2}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-6 py-8 border-t border-yellow-600/10 mb-6"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/3 rounded-2xl p-5 border border-white/10">
                  <p className="text-xs text-gray-500 font-light leading-relaxed text-center">
                    © 2026 Hrvatsko-njemačko društvo Split
                  </p>
                  <p className="text-[10px] text-gray-600 font-light text-center mt-2">
                    Sva prava pridržana
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
