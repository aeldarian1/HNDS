'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Consistent animation constants
const EASING = [0.22, 0.61, 0.36, 1] as const; // Elegant ease-out-cubic
const DURATION = 0.7;
const VIEWPORT_MARGIN = '-80px';
const STAGGER_DELAY = 0.08;

// Shared viewport config for performance
const VIEWPORT_CONFIG = {
  once: true,
  margin: VIEWPORT_MARGIN,
  amount: 0.3, // Trigger when 30% visible
} as const;

interface AnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Hero section animations - for page headers
export function HeroFadeIn({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// Standard fade in from bottom - most common animation
export function FadeIn({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DURATION, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// Slide animations for alternating content blocks
export function SlideLeft({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DURATION, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

export function SlideRight({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DURATION, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// Scale animation for featured cards and images
export function ScaleIn({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DURATION, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// Grid/List animations with stagger effect
export function StaggerContainer({ 
  children, 
  className = '', 
  stagger = STAGGER_DELAY 
}: AnimatedProps & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: DURATION, ease: EASING } 
        },
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
