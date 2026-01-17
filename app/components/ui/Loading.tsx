'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded w-full',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'bg-slate-800/50 animate-pulse',
              variants.text,
              i === lines - 1 && 'w-3/4'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('bg-slate-800/50 animate-pulse', variants[variant], className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav Skeleton */}
      <div className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-lg border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={44} height={44} />
            <Skeleton width={80} height={24} className="rounded" />
          </div>
          <div className="hidden md:flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width={80} height={20} className="rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center space-y-6">
          <Skeleton width={200} height={32} className="mx-auto rounded-full" />
          <Skeleton width="70%" height={64} className="mx-auto rounded" />
          <Skeleton width="50%" height={24} className="mx-auto rounded" />
          <div className="flex gap-4 justify-center pt-4">
            <Skeleton width={180} height={48} className="rounded" />
            <Skeleton width={150} height={48} className="rounded" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton height={200} className="rounded-lg" />
                <Skeleton height={24} width="60%" className="rounded" />
                <Skeleton lines={3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Card Loading Skeleton
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-yellow-600/20 p-6 space-y-4">
          <Skeleton height={160} className="rounded-lg" />
          <div className="flex justify-between items-center">
            <Skeleton width={80} height={20} className="rounded-full" />
            <Skeleton width={100} height={16} className="rounded" />
          </div>
          <Skeleton height={24} width="80%" className="rounded" />
          <Skeleton lines={2} />
        </div>
      ))}
    </div>
  );
}

// Hero Loading Skeleton
export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
      <Skeleton className="absolute inset-0" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-center space-y-8">
        <Skeleton width="60%" height={80} className="mx-auto rounded" />
        <Skeleton width="50%" height={28} className="mx-auto rounded" />
        <div className="flex gap-4 justify-center">
          <Skeleton width={180} height={48} className="rounded" />
          <Skeleton width={150} height={48} className="rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={100} className="rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return <PageLoadingSkeleton />;
}
