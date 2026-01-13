'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Disable smooth scroll on mobile for better performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 0.9, // Shorter on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: !isMobile, // Disable on mobile
      mouseMultiplier: 0.8, // Slightly reduced
      smoothTouch: false,
      touchMultiplier: 1.5, // Reduced from 2
      infinite: false,
    });

    let rafId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
