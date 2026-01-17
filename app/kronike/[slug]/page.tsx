'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChronicleBadge } from '@/app/components/ChronicleBadge';
import chronicles from '@/data/chronicles.json';

export default function ChroniclePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const chronicle = chronicles.find(c => c.slug === slug);
  
  // Find previous and next chronicles
  const currentIndex = chronicles.findIndex(c => c.slug === slug);
  const previousChronicle = currentIndex > 0 ? chronicles[currentIndex - 1] : null;
  const nextChronicle = currentIndex < chronicles.length - 1 ? chronicles[currentIndex + 1] : null;

  if (!chronicle) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Kronika nije pronađena</h1>
          <Link href="/kronike" className="text-yellow-400 hover:text-yellow-300">
            ← Povratak na sve kronike
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link 
            href="/kronike" 
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Povratak na sve kronike
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex gap-8 items-start"
        >
          {/* Chronicle Badge */}
          <div className="flex-shrink-0">
            <ChronicleBadge
              number={chronicle.title.match(/#(\d+)/)?.[1] || '?'}
              year={new Date(chronicle.date).getFullYear().toString()}
              className="w-32 h-32"
            />
          </div>
          
          {/* Title and meta */}
          <div className="flex-1">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              dangerouslySetInnerHTML={{ __html: chronicle.title }}
            />
            
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={chronicle.date}>{chronicle.formattedDate}</time>
              </div>
              {chronicle.pdfUrl && (
                <a 
                  href={chronicle.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Preuzmi PDF
                </a>
              )}
            </div>
          </div>
        </motion.header>

        {/* PDF Viewer */}
        {chronicle.pdfUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-full bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
              <iframe
                src={`${chronicle.pdfUrl}#view=FitH`}
                className="w-full"
                style={{ height: '80vh', minHeight: '600px' }}
                title={chronicle.title}
              />
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              Ako ne možete vidjeti PDF, <a href={chronicle.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">preuzmite ga ovdje</a>.
            </p>
          </motion.div>
        )}

        {/* Description */}
        {chronicle.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none mb-8"
          >
            <p className="text-gray-300 leading-relaxed">{chronicle.description}</p>
          </motion.div>
        )}

        {/* Previous/Next Navigation */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-700"
        >
          <div className="mb-8">
            <Link 
              href="/kronike" 
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Sve kronike
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Chronicle */}
            {previousChronicle ? (
              <Link
                href={`/kronike/${previousChronicle.slug}`}
                className="group flex items-center gap-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-yellow-400 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-400 mb-1">Prethodna kronika</div>
                  <div 
                    className="text-white font-medium truncate group-hover:text-yellow-400 transition-colors"
                    dangerouslySetInnerHTML={{ __html: previousChronicle.title }}
                  />
                </div>
                <ChronicleBadge
                  number={previousChronicle.title.match(/#(\d+)/)?.[1] || '?'}
                  year={new Date(previousChronicle.date).getFullYear().toString()}
                  className="w-12 h-12 flex-shrink-0"
                />
              </Link>
            ) : (
              <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="text-sm text-gray-500">Nema prethodne kronike</div>
              </div>
            )}
            
            {/* Next Chronicle */}
            {nextChronicle ? (
              <Link
                href={`/kronike/${nextChronicle.slug}`}
                className="group flex items-center gap-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-yellow-400 transition-all"
              >
                <ChronicleBadge
                  number={nextChronicle.title.match(/#(\d+)/)?.[1] || '?'}
                  year={new Date(nextChronicle.date).getFullYear().toString()}
                  className="w-12 h-12 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-400 mb-1">Sljedeća kronika</div>
                  <div 
                    className="text-white font-medium truncate group-hover:text-yellow-400 transition-colors"
                    dangerouslySetInnerHTML={{ __html: nextChronicle.title }}
                  />
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 flex-shrink-0 rotate-180" />
              </Link>
            ) : (
              <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="text-sm text-gray-500">Nema sljedeće kronike</div>
              </div>
            )}
          </div>
        </motion.footer>
      </article>
    </main>
  );
}
