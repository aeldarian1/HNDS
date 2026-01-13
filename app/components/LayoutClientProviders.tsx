'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical components
const SmoothScroll = dynamic(() => import('./SmoothScroll'), {
  ssr: false,
});

export function LayoutClientProviders() {
  return (
    <>
      <SmoothScroll />
    </>
  );
}
