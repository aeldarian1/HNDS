'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical components
const ScrollProgress = dynamic(() => import('./ScrollProgress'), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import('./SmoothScroll'), {
  ssr: false,
});

export function LayoutClientProviders() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
    </>
  );
}
