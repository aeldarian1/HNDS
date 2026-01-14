"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/context/I18nContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-slate-900 border-t border-yellow-600/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
        {/* Top section with logo and tagline */}
        <div className="mb-16 pb-12 border-b border-yellow-600/20">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-lg" />
                  <Image 
                    src="/cropped-HD_Ikona-1.jpg" 
                    alt="HNDS Logo" 
                    width={48} 
                    height={48}
                    className="relative object-contain"
                  />
                </div>
                <div className="text-2xl font-light tracking-widest text-yellow-500">HNDS</div>
              </div>
              <p className="text-sm font-light text-gray-400 max-w-md">
                {t("footer.tagline")}
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/membership" 
                className="px-6 py-3 bg-yellow-600/10 border border-yellow-600/40 text-yellow-500 hover:bg-yellow-600 hover:text-white rounded-lg transition-all duration-300 text-sm font-medium"
              >
                {t("footer.becomeMember")}
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 border border-yellow-600/40 text-white hover:bg-yellow-600/10 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                {t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest text-yellow-500">{t("footer.links")}</h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>
                <Link href="/o-nama" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link href="/aktivnosti" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("navigation.activities")}
                </Link>
              </li>
              <li>
                <Link href="/galerija" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("navigation.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/vijesti" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("navigation.news")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest text-yellow-500">{t("footer.membership")}</h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>
                <Link href="/membership" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("footer.howToJoin")}
                </Link>
              </li>
              <li>
                <Link href="/statut" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("footer.statute")}
                </Link>
              </li>
              <li>
                <Link href="/o-nama" className="hover:text-yellow-500 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 h-px bg-yellow-500 group-hover:w-4 transition-all" />
                  {t("footer.branches")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest text-yellow-500">{t("footer.locations")}</h4>
            <ul className="space-y-3 text-sm font-light text-gray-400">
              <li>Split</li>
              <li>Makarska</li>
              <li>Bra�</li>
              <li>Sinj</li>
              <li>Trogir</li>
              <li>Ka�tela</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-6 uppercase text-xs tracking-widest text-yellow-500">{t("footer.contactInfo")}</h4>
            <div className="space-y-3 text-sm font-light text-gray-400">
              <p>{t("footer.address")}</p>
              <p>{t("footer.city")}</p>
              <p className="pt-2">
                <a href="tel:+38598244124" className="hover:text-yellow-500 transition-colors">
                  +385 98 244 124
                </a>
              </p>
              <p>
                <a href="mailto:hnjd.split@gmail.com" className="hover:text-yellow-500 transition-colors">
                  hnjd.split@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-yellow-600/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light text-gray-500">
              � {currentYear} {t("footer.copyright")}
            </p>
            <div className="flex gap-6 text-xs font-light text-gray-500">
              <Link href="/privacy" className="hover:text-yellow-500 transition-colors">{t("footer.privacy")}</Link>
              <Link href="/terms" className="hover:text-yellow-500 transition-colors">{t("footer.terms")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
