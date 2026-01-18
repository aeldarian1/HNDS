'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List } from 'lucide-react';

type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  defaultView?: ViewMode;
  children: (viewMode: ViewMode) => ReactNode;
  className?: string;
}

export function ViewToggle({ defaultView = 'grid', children, className }: ViewToggleProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);

  return (
    <div className={className}>
      {/* Toggle buttons */}
      <div className="mb-6 sm:mb-8 flex justify-end">
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 rounded-lg p-1 border border-yellow-600/20">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 sm:p-2 rounded-md transition-all active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              viewMode === 'grid' 
                ? 'bg-yellow-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 sm:p-2 rounded-md transition-all active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              viewMode === 'list' 
                ? 'bg-yellow-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children(viewMode)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ViewToggle;
