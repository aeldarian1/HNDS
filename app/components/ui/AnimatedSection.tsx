'use client';

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale';
  className?: string;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function AnimatedSection({
  children,
  delay = 0,
  duration = 0.5,
  animation = 'fadeUp',
  className,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animations[animation]}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Pre-configured animation components for common use cases
export function FadeUp({ children, delay = 0, className, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="fadeUp" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

export function FadeLeft({ children, delay = 0, className, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="fadeLeft" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

export function FadeRight({ children, delay = 0, className, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="fadeRight" delay={delay} className={className} {...props}>
      {children}
    </AnimatedSection>
  );
}

export default AnimatedSection;
