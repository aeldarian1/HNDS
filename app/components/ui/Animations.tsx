'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect, useRef } from 'react';

// Animation constants
const EASING = [0.22, 0.61, 0.36, 1] as const;
const DURATION = 0.7;
const VIEWPORT_MARGIN = '-80px';
const STAGGER_DELAY = 0.08;

// Viewport config - adjusted for better mobile detection
const VIEWPORT_CONFIG = {
  once: true,
  margin: VIEWPORT_MARGIN,
  amount: 0.1, // Reduced from 0.3 for better mobile triggering
} as const;

interface AnimatedProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Hero animations - for page headers (trigger on mount)
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

export function HeroSlideIn({ children, className = '', delay = 0 }: AnimatedProps & { direction?: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay, ease: EASING }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered animations
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

export function FadeInUp({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
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

export function FadeInDown({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
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

export function BlurIn({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DURATION, delay, ease: EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger animations for lists/grids
interface StaggerContainerProps extends AnimatedProps {
  staggerDelay?: number;
}

// Mobile-friendly viewport config for stagger containers
const STAGGER_VIEWPORT_CONFIG = {
  once: true,
  margin: '-20px', // Smaller margin for mobile
  amount: 0.05, // Very small amount to trigger earlier
} as const;

export function StaggerContainer({ children, className = '', staggerDelay = STAGGER_DELAY }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={STAGGER_VIEWPORT_CONFIG}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: Omit<AnimatedProps, 'delay'>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: EASING,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter animation
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({ from = 0, to, duration = 2, className = '', suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasAnimated) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Ease out function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = from + (to - from) * easeOut;
      
      setCount(Math.round(currentCount));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasAnimated, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT_CONFIG}
      onViewportEnter={() => setHasAnimated(true)}
      className={className}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
}

// Reveal animation (clip-path based)
export function Reveal({ children, className = '', delay = 0 }: AnimatedProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.8, delay, ease: EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation (character by character)
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}

export function TextReveal({ text, className = '', delay = 0, charDelay = 0.03 }: TextRevealProps) {
  const characters = text.split('');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + i * charDelay,
                duration: 0.4,
                ease: EASING,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Parallax wrapper
interface ParallaxProps extends AnimatedProps {
  speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      style={{ y: `calc(var(--scroll-y, 0) * ${speed})` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover animations
export function HoverScale({ children, className = '', scale = 1.05 }: AnimatedProps & { scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ children, className = '', y = -8 }: AnimatedProps & { y?: number }) {
  return (
    <motion.div
      whileHover={{ y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating animation (continuous)
interface FloatingProps extends AnimatedProps {
  amplitude?: number;
  duration?: number;
}

export function Floating({ children, className = '', amplitude = 10, duration = 3 }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation
export function Pulse({ children, className = '' }: Omit<AnimatedProps, 'delay'>) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ children, className = '' }: Omit<AnimatedProps, 'delay'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export motion components for custom use
export { motion };
