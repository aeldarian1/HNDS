'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, ChevronRight, Home, Info, Activity, Newspaper, Image as ImageIcon, Mail, Instagram, Facebook, Youtube, Sun, Moon, Search } from 'lucide-react';
import { GlobalSearch, useGlobalSearch } from './GlobalSearch';
import { cn } from '@/lib/utils';

// Navigation link type
interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useGlobalSearch();

  // Navigation links configuration
  const navLinks: NavLink[] = useMemo(() => [
    { href: '/', label: 'Naslovna', icon: Home },
    { href: '/o-nama', label: 'O nama', icon: Info },
    { href: '/aktivnosti', label: 'Aktivnosti', icon: Activity },
    { href: '/vijesti', label: 'Vijesti', icon: Newspaper },
    { href: '/galerija', label: 'Galerija', icon: ImageIcon },
    { href: '/kontakt', label: 'Kontakt', icon: Mail },
  ], []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu handler
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  // Check if link is active
  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-lg border-b border-yellow-600/20 shadow-lg shadow-black/10'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-3 relative z-10"
              aria-label="Početna stranica"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/cropped-HD_Ikona-1.jpg"
                  alt="HNDS Logo"
                  width={44}
                  height={44}
                  className="relative rounded-full ring-2 ring-yellow-600/30 group-hover:ring-yellow-600/60 transition-all duration-300"
                  priority
                />
              </div>
              <span className="text-xl font-light tracking-widest text-yellow-500 group-hover:text-yellow-400 transition-colors">
                HNDS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'nav-link',
                    isActive(link.href) && 'active'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Search Button */}
              <button
                onClick={openSearch}
                className="nav-link flex items-center gap-2"
                aria-label="Pretraži..."
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden relative z-50 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:text-yellow-500 hover:border-yellow-600/30 hover:bg-yellow-600/10 transition-all duration-300"
              aria-label={isOpen ? 'Zatvori izbornik' : 'Otvori izbornik'}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full block origin-center"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full block"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    scaleX: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current rounded-full block origin-center"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -4 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="sync">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={closeMenu}
              style={{ willChange: 'opacity' }}
            />

            {/* Full-screen Menu Panel */}
            <motion.div
              key="mobile-menu-panel"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ 
                duration: 0.3, 
                ease: [0.32, 0.72, 0, 1],
                opacity: { duration: 0.2 }
              }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="h-full bg-slate-950 overflow-hidden">
                {/* Simplified background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

                <div className="relative flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between p-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/cropped-HD_Ikona-1.jpg"
                        alt="HNDS"
                        width={44}
                        height={44}
                        className="rounded-full ring-2 ring-yellow-600/30"
                      />
                      <div>
                        <span className="text-xl tracking-widest text-yellow-500 font-light">HNDS</span>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Split</p>
                      </div>
                    </div>
                    <button
                      onClick={closeMenu}
                      className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-yellow-500 active:scale-95 transition-all border border-white/10"
                      aria-label="Zatvori"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="grid gap-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className={cn(
                              'flex items-center gap-4 p-4 rounded-xl transition-colors duration-200',
                              'active:scale-[0.98]',
                              active
                                ? 'bg-yellow-600/15 text-yellow-400'
                                : 'text-white hover:bg-white/5 active:bg-white/10'
                            )}
                          >
                            <div 
                              className={cn(
                                'p-2.5 rounded-lg transition-colors',
                                active 
                                  ? 'bg-yellow-600/20 text-yellow-400' 
                                  : 'bg-white/5 text-gray-400'
                              )}
                            >
                              <Icon size={20} strokeWidth={1.5} />
                            </div>
                            <span className="text-base font-light tracking-wide flex-1">
                              {link.label}
                            </span>
                            {active && (
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Social Links */}
                    <div className="mt-6">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 px-1">Pratite nas</p>
                      <div className="flex gap-2">
                        {[
                          { href: 'https://www.instagram.com/hnjd.split/', icon: Instagram, label: 'Instagram' },
                          { href: 'https://www.facebook.com/people/Hrvatsko-njema%C4%8Dko-dru%C5%A1tvo-Split/61571711064231/', icon: Facebook, label: 'Facebook' },
                          { href: 'https://www.youtube.com/@hnds-hr', icon: Youtube, label: 'YouTube' },
                        ].map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 active:scale-95 active:bg-white/10 transition-all"
                            aria-label={social.label}
                          >
                            <social.icon size={20} className="text-gray-400" />
                            <span className="text-[10px] text-gray-500">{social.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>

                  {/* Footer */}
                  <div className="p-5 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600">
                        © 2026 HNDS Split
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-500">Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
