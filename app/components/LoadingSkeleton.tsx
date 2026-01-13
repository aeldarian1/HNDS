'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'image';
  count?: number;
}

export default function LoadingSkeleton({ 
  className = '', 
  variant = 'text',
  count = 1 
}: LoadingSkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse";
  
  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-64 w-full',
    avatar: 'h-12 w-12 rounded-full',
    image: 'aspect-square w-full'
  };

  const skeletonClass = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={skeletonClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </>
  );
}

// Card Skeleton Component
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-900 border border-yellow-600/30 rounded-lg overflow-hidden"
        >
          <div className="h-48 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-full" />
            <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-5/6" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Event Card Skeleton
export function EventCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-900 border border-yellow-600/30 rounded-lg p-6 space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-full" />
              <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-5/6" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-24" />
            <div className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-32" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Gallery Image Skeleton
export function GalleryImageSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
