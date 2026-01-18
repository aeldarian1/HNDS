'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Search, Download } from 'lucide-react';
import {
  StaggerContainer,
  StaggerItem,
} from '@/app/components/ui/Animations';
import { MotionCard } from '@/app/components/ui/Card';
import { Button, MotionButton } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Form';
import { ChronicleBadge } from '@/app/components/ChronicleBadge';

// Chronicle type
interface Chronicle {
  id: number | string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  description?: string;
  pdfUrl?: string;
}

interface ChronicleFilterListProps {
  chronicles: Chronicle[];
}

export function ChronicleFilterList({ chronicles }: ChronicleFilterListProps) {
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique decades
  const decades = useMemo(() => 
    Array.from(
      new Set(
        chronicles.map(c => Math.floor(new Date(c.date).getFullYear() / 10) * 10)
      )
    ).sort((a, b) => b - a),
    [chronicles]
  );

  // Filter chronicles
  const filteredChronicles = useMemo(() => {
    let result = chronicles;
    
    if (selectedDecade !== 'all') {
      result = result.filter(c => {
        const year = new Date(c.date).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        return decade.toString() === selectedDecade;
      });
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [chronicles, selectedDecade, searchQuery]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedDecade('all');
  }, []);

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-12 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Pretraži kronike..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {/* Decade filters */}
        <div className="flex flex-wrap gap-3">
          <MotionButton
            onClick={() => setSelectedDecade('all')}
            variant={selectedDecade === 'all' ? 'default' : 'outline'}
            size="sm"
          >
            Sve ({chronicles.length})
          </MotionButton>
          {decades.map(decade => {
            const count = chronicles.filter(c => {
              const year = new Date(c.date).getFullYear();
              return Math.floor(year / 10) * 10 === decade;
            }).length;
            return (
              <MotionButton
                key={decade}
                onClick={() => setSelectedDecade(decade.toString())}
                variant={selectedDecade === decade.toString() ? 'default' : 'outline'}
                size="sm"
              >
                {decade}e ({count})
              </MotionButton>
            );
          })}
        </div>
      </div>

      {/* Chronicles Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedDecade}-${searchQuery}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filteredChronicles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">Nema kronika za odabrano razdoblje.</p>
              <Button variant="outline" onClick={handleResetFilters}>
                Poništi filtre
              </Button>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChronicles.map((chronicle) => (
                <StaggerItem key={chronicle.id}>
                  <Link href={`/kronike/${chronicle.slug}`}>
                    <MotionCard
                      className="group bg-slate-900/50 border border-yellow-600/20 overflow-hidden h-full"
                      hoverY={-8}
                    >
                      {/* Chronicle Cover */}
                      <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center p-6">
                        <ChronicleBadge
                          number={chronicle.title.match(/#(\d+)/)?.[1] || '?'}
                          year={new Date(chronicle.date).getFullYear().toString()}
                          className="w-36 h-36 group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-yellow-600/0 group-hover:bg-yellow-600/5 transition-colors duration-300" />
                      </div>

                      {/* Chronicle Info */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4 text-yellow-500" />
                          <span>{chronicle.formattedDate}</span>
                        </div>

                        <h3 className="text-lg font-light text-white group-hover:text-yellow-500 transition line-clamp-2">
                          {chronicle.title.replace(/&#8211;/g, '–').replace(/&amp;/g, '&')}
                        </h3>

                        {chronicle.description && (
                          <p className="text-gray-400 font-light text-sm line-clamp-2">
                            {chronicle.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-yellow-600/10">
                          <span className="text-yellow-500 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Pročitaj više
                            <ArrowRight className="w-4 h-4" />
                          </span>
                          {chronicle.pdfUrl && (
                            <a
                              href={chronicle.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                              title="Preuzmi PDF"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </MotionCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
