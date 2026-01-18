'use client';

import { useState, useMemo, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { MotionButton } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Form';
import { Button } from '@/app/components/ui/Button';

// Types
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterableListProps<T> {
  items: T[];
  filterOptions: FilterOption[];
  filterKey: keyof T;
  searchKeys: (keyof T)[];
  renderItem: (item: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
  searchPlaceholder?: string;
  showFilterLabel?: boolean;
  filterLabel?: string;
  itemsPerPage?: number;
  className?: string;
  gridClassName?: string;
}

export function FilterableList<T extends object>({
  items,
  filterOptions,
  filterKey,
  searchKeys,
  renderItem,
  renderEmpty,
  searchPlaceholder = 'Pretraži...',
  showFilterLabel = true,
  filterLabel = 'Filtriraj',
  itemsPerPage,
  className = '',
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
}: FilterableListProps<T>) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search items
  const filtered = useMemo(() => {
    let result = items;

    // Apply category filter
    if (selectedFilter !== 'all') {
      result = result.filter((item) => item[filterKey] === selectedFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          return typeof value === 'string' && value.toLowerCase().includes(query);
        })
      );
    }

    return result;
  }, [items, selectedFilter, searchQuery, filterKey, searchKeys]);

  // Pagination
  const totalPages = itemsPerPage ? Math.ceil(filtered.length / itemsPerPage) : 1;
  const paginatedItems = itemsPerPage
    ? filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filtered;

  // Handlers
  const handleFilterChange = useCallback((value: string) => {
    setSelectedFilter(value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilter('all');
    setCurrentPage(1);
  }, []);

  return (
    <div className={className}>
      {/* Filters & Search */}
      <div className="mb-8 sm:mb-12 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-12"
          />
        </div>

        {/* Filter buttons */}
        <div>
          {showFilterLabel && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-light">{filterLabel}</span>
            </div>
          )}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {filterOptions.map((option) => (
              <MotionButton
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                variant={selectedFilter === option.value ? 'default' : 'outline'}
                size="sm"
                className="gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 min-h-[40px] active:scale-95"
              >
                {option.label}
                {option.count !== undefined && (
                  <span
                    className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded ${
                      selectedFilter === option.value
                        ? 'bg-white/20'
                        : 'bg-yellow-600/20 text-yellow-600'
                    }`}
                  >
                    {option.count}
                  </span>
                )}
              </MotionButton>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedFilter}-${searchQuery}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {paginatedItems.length > 0 ? (
            <div className={gridClassName}>{paginatedItems.map(renderItem)}</div>
          ) : (
            renderEmpty ? (
              renderEmpty()
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">Nema rezultata za vašu pretragu.</p>
                <Button variant="outline" onClick={handleResetFilters}>
                  Poništi filtre
                </Button>
              </div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {itemsPerPage && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-full sm:w-auto min-h-[44px]"
      >
        Prethodna
      </Button>

      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-2 px-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] w-10 h-10 sm:min-w-[44px] sm:w-11 sm:h-11 rounded-lg font-medium transition-all flex-shrink-0 ${
              currentPage === page
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700 active:scale-95'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-full sm:w-auto min-h-[44px]"
      >
        Sljedeća
      </Button>
    </div>
  );
}

export { Pagination };
