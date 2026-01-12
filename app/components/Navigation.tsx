"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "O nama" },
    { href: "/#events", label: "Događaji" },
    { href: "/gallery", label: "Galerija" },
    { href: "/kronike", label: "Kronike" },
    { href: "/membership", label: "Članstvo" },
    { href: "/statut", label: "Statut" },
  ];

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

  const menuVariants = {
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
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-sm border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/cropped-HD_Ikona-1.jpg" 
                alt="HNDS Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-light tracking-widest text-yellow-600">HNDS</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-8 md:gap-12 items-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light text-white hover:text-yellow-600 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="px-6 py-2 border border-yellow-600 text-sm font-light text-white hover:bg-yellow-600 hover:text-white transition duration-300">
              Kontakt
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-600 transition z-50 relative"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden overflow-hidden bg-slate-950/98 border-b border-yellow-600/30"
            >
              <div className="px-4 py-6 space-y-1 max-w-7xl mx-auto">
                {navLinks.map((link, index) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block text-base font-light text-white hover:text-yellow-600 hover:bg-yellow-600/10 transition py-3 px-4 rounded-sm text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants} className="pt-4">
                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3 border border-yellow-600 text-base font-light text-white hover:bg-yellow-600 hover:text-white transition duration-300 text-center rounded-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Kontakt
                  </Link>
                </motion.div>

                {/* Social Links in Mobile Menu */}
                <motion.div variants={itemVariants} className="pt-6 border-t border-yellow-600/30 mt-6">
                  <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-3 px-4">Prati nas</p>
                  <div className="flex gap-6 px-4">
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-600 transition">Instagram</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-600 transition">Facebook</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-yellow-600 transition">YouTube</a>
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
