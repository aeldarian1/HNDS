"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-yellow-600/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/cropped-HD_Ikona-1.jpg" 
                alt="HNDS Logo" 
                width={32} 
                height={32}
                className="object-contain"
              />
              <div className="text-lg font-light tracking-widest text-yellow-600">HNDS</div>
            </div>
            <p className="text-sm font-light text-gray-400">
              Povezivanje kultura, izgradnja prijateljstava od 1990.
            </p>
          </div>
          <div>
            <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Povezave</h4>
            <ul className="space-y-2 text-sm font-light text-gray-400">
              <li><Link href="/about" className="hover:text-yellow-600 transition">O nama</Link></li>
              <li><Link href="/#events" className="hover:text-yellow-600 transition">Događaji</Link></li>
              <li><Link href="/gallery" className="hover:text-yellow-600 transition">Galerija</Link></li>              <li><Link href="/kronike" className="hover:text-yellow-600 transition">Kronike</Link></li>            </ul>
          </div>
          <div>
            <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Dokumenti</h4>
            <ul className="space-y-2 text-sm font-light text-gray-400">
              <li><Link href="/statut" className="hover:text-yellow-600 transition">Statut</Link></li>
              <li><Link href="/membership" className="hover:text-yellow-600 transition">Članstvo</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-600 transition">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-light text-white mb-4 uppercase text-sm tracking-wide">Kontakt</h4>
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              Sinjska 3<br />
              21000 Split<br />
              +385 98 244 124<br />
              hnjd.split@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-yellow-600/30 pt-8">
          <p className="text-center text-sm font-light text-gray-500">
            © 2026 Hrvatsko-njemačko društvo Split. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
