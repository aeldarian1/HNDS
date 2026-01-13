'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ReactNode } from 'react';

// Skeleton loader for dynamic imports
const DynamicSkeleton = () => (
  <div className="w-full h-full bg-slate-800 animate-pulse rounded" />
);

// Dynamically load heavy components with suspense fallback
export const DynamicLoadingSkeleton = dynamic(
  () => import('@/app/components/LoadingSkeleton'),
  {
    loading: () => <DynamicSkeleton />,
    ssr: false, // Don't render on server for quicker initial load
  }
);

export const DynamicInteractiveElements = dynamic(
  () => import('@/app/components/InteractiveElements'),
  {
    loading: () => <DynamicSkeleton />,
    ssr: true, // Render on server for initial content
  }
);

// Lazy load ScrollProgress to improve initial render
export const DynamicScrollProgress = dynamic(
  () => import('@/app/components/ScrollProgress'),
  {
    loading: () => null,
    ssr: false,
  }
);

// Lazy load SmoothScroll to avoid blocking initial render
export const DynamicSmoothScroll = dynamic(
  () => import('@/app/components/SmoothScroll'),
  {
    loading: () => null,
    ssr: false,
  }
);

// Wrapper for components that should load dynamically
interface DynamicWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function DynamicWrapper({ children, fallback }: DynamicWrapperProps) {
  return (
    <Suspense fallback={fallback || <DynamicSkeleton />}>
      {children}
    </Suspense>
  );
}
