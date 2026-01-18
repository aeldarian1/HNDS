'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Calendar, Image, Users, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/app/components/ui/Common';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'page' | 'news' | 'chronicle' | 'gallery' | 'activity';
  url: string;
  date?: string;
}

// Sample searchable content - in production, this would come from an API
const searchableContent: SearchResult[] = [
  { id: '1', title: 'O nama', description: 'Saznajte više o Hrvatsko-njemačkom društvu Split', type: 'page', url: '/o-nama' },
  { id: '2', title: 'Aktivnosti', description: 'Naše aktivnosti i programi', type: 'page', url: '/aktivnosti' },
  { id: '3', title: 'Vijesti', description: 'Najnovije vijesti iz društva', type: 'page', url: '/vijesti' },
  { id: '4', title: 'Galerija', description: 'Fotografije s naših događanja', type: 'page', url: '/galerija' },
  { id: '5', title: 'Kontakt', description: 'Kontaktirajte nas', type: 'page', url: '/kontakt' },
  { id: '6', title: 'Članstvo', description: 'Postanite član društva', type: 'page', url: '/membership' },
  { id: '7', title: 'Kronike', description: 'Povijesni zapisi društva', type: 'page', url: '/kronike' },
  { id: '8', title: 'Tečajevi njemačkog jezika', description: 'Učite njemački jezik s nama', type: 'activity', url: '/aktivnosti' },
  { id: '9', title: 'Kulturni događaji', description: 'Izložbe, koncerti i predavanja', type: 'activity', url: '/aktivnosti' },
  { id: '10', title: 'Izleti i putovanja', description: 'Organizirani izleti i putovanja', type: 'activity', url: '/aktivnosti' },
];

const typeIcons = {
  page: FileText,
  news: Calendar,
  chronicle: FileText,
  gallery: Image,
  activity: Users,
};

const typeLabels: Record<string, string> = {
  page: 'Stranica',
  news: 'Vijesti',
  chronicle: 'Kronika',
  gallery: 'Galerija',
  activity: 'Aktivnost',
};

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when closed - defer updates to avoid cascading renders
  const prevIsOpenRef = useRef(isOpen);
  useEffect(() => {
    if (prevIsOpenRef.current && !isOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        setResults([]);
        setSelectedIndex(0);
      }, 0);
      return () => clearTimeout(timer);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Search function
  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const normalizedQuery = searchQuery.toLowerCase();
      const filtered = searchableContent.filter(item =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description?.toLowerCase().includes(normalizedQuery)
      );
      setResults(filtered);
      setIsSearching(false);
      setSelectedIndex(0);
    }, 150);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => search(query), 200);
    return () => clearTimeout(timer);
  }, [query, search]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => Math.min(i + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].url;
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="global-search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="bg-slate-900 border border-yellow-600/30 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-yellow-600/20">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pretraži..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg font-light"
                />
                {isSearching && <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />}
                <button
                  onClick={onClose}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query && results.length === 0 && !isSearching && (
                  <div className="p-8 text-center text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Nema rezultata za &ldquo;{query}&rdquo;</p>
                  </div>
                )}

                {results.length > 0 && (
                  <ul className="py-2">
                    {results.map((result, index) => {
                      const Icon = typeIcons[result.type];
                      return (
                        <li key={result.id}>
                          <Link
                            href={result.url}
                            onClick={onClose}
                            className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                              index === selectedIndex
                                ? 'bg-yellow-600/20 text-white'
                                : 'text-gray-300 hover:bg-slate-800'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              index === selectedIndex ? 'bg-yellow-600/30' : 'bg-slate-800'
                            }`}>
                              <Icon className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{result.title}</p>
                              {result.description && (
                                <p className="text-sm text-gray-400 truncate">{result.description}</p>
                              )}
                            </div>
                            <Badge variant="secondary" size="sm">
                              {typeLabels[result.type]}
                            </Badge>
                            <ArrowRight className={`w-4 h-4 transition-transform ${
                              index === selectedIndex ? 'translate-x-1' : ''
                            }`} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {!query && (
                  <div className="p-6">
                    <p className="text-gray-500 text-sm mb-4">Brze veze</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { href: '/o-nama', label: 'O nama' },
                        { href: '/aktivnosti', label: 'Aktivnosti' },
                        { href: '/vijesti', label: 'Vijesti' },
                        { href: '/kontakt', label: 'Kontakt' }
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="p-3 bg-slate-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-yellow-600/20 bg-slate-950/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↑↓</kbd> za navigaciju</span>
                    <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↵</kbd> za otvaranje</span>
                  </div>
                  <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">esc</kbd> za zatvaranje</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to trigger search with keyboard shortcut
export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
