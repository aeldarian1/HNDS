'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

// Transition variants
const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

const slideInVariants: Variants = {
  initial: { opacity: 0, x: 30 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

// Variant type options
export type TransitionType = 'fade' | 'slideUp' | 'slideIn' | 'scale';

const variantsMap: Record<TransitionType, Variants> = {
  fade: fadeVariants,
  slideUp: slideUpVariants,
  slideIn: slideInVariants,
  scale: scaleVariants,
};

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  className?: string;
}

/**
 * Wrapper component for page transitions
 * Wrap your page content with this component for smooth transitions
 */
export function PageTransition({ 
  children, 
  type = 'slideUp',
  className = ''
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variantsMap[type]}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Page wrapper that includes transition + layout
 * Use this for consistent page structure
 */
interface PageWrapperProps {
  children: ReactNode;
  transition?: TransitionType;
  className?: string;
}

export function PageWrapper({ 
  children, 
  transition = 'slideUp',
  className = ''
}: PageWrapperProps) {
  return (
    <PageTransition type={transition}>
      <main className={`min-h-screen ${className}`}>
        {children}
      </main>
    </PageTransition>
  );
}

/**
 * Staggered children animation
 * Animates children one by one with a delay
 */
interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const staggerContainerVariants: Variants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const staggerItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  },
};

export function StaggerChildren({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={{
        ...staggerContainerVariants,
        enter: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual staggered item
 * Use inside StaggerChildren
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Reveal on scroll animation
 * Element appears when it enters the viewport
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({ 
  children, 
  className = '',
  delay = 0,
  once = true,
  threshold = 0.2
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.22, 0.61, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax effect on scroll
 */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ 
  children, 
  className = '',
  speed = 0.5 
}: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 50 * speed }}
      transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Text reveal animation - letter by letter
 */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <motion.span 
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: delay }
        }
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em]">
          {word.split('').map((char, j) => (
            <motion.span
              key={j}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

// Export preset motion values for consistent animations
export const transitionPresets = {
  spring: { type: 'spring', damping: 25, stiffness: 300 },
  smooth: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
  snappy: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  bounce: { type: 'spring', damping: 10, stiffness: 400 },
};
