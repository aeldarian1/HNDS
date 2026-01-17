import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Container } from '@/app/components/ui/Common';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Container className="text-center py-20">
        <div className="space-y-8">
          {/* 404 Display */}
          <div className="relative">
            <span className="text-[12rem] md:text-[16rem] font-light text-yellow-600/10 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-light text-yellow-500">
                404
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Stranica nije pronađena
            </h1>
            <p className="text-gray-400 font-light max-w-md mx-auto">
              Stranica koju tražite ne postoji ili je premještena.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Natrag na naslovnu
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">
                <Search className="w-5 h-5 mr-2" />
                Kontaktirajte nas
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-yellow-600/20 max-w-md mx-auto">
            <p className="text-gray-500 text-sm mb-4">Možda tražite:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/o-nama" className="text-yellow-500 hover:text-yellow-400 transition">
                O nama
              </Link>
              <Link href="/aktivnosti" className="text-yellow-500 hover:text-yellow-400 transition">
                Aktivnosti
              </Link>
              <Link href="/vijesti" className="text-yellow-500 hover:text-yellow-400 transition">
                Vijesti
              </Link>
              <Link href="/galerija" className="text-yellow-500 hover:text-yellow-400 transition">
                Galerija
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
