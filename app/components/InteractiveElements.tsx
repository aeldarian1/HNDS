'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { ANIMATION_CONFIG } from '@/lib/animations';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const InteractiveCard = memo(function InteractiveCard({ 
  children, 
  className = '',
  intensity = 10
}: InteractiveCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, ANIMATION_CONFIG.springs.gentle);
  const mouseYSpring = useSpring(y, ANIMATION_CONFIG.springs.gentle);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${className} cursor-pointer`}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  );
});

export default InteractiveCard;

// Magnetic Button Component
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const MagneticButton = memo(function MagneticButton({ children, className = '', href, onClick }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, ANIMATION_CONFIG.springs.snappy);
  const mouseYSpring = useSpring(y, ANIMATION_CONFIG.springs.snappy);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </Component>
  );
});

// Floating Element Component
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export const FloatingElement = memo(function FloatingElement({ 
  children, 
  className = '',
  duration = 3,
  delay = 0
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
});

// Reveal on Scroll Component
interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const RevealOnScroll = memo(function RevealOnScroll({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0
}: RevealOnScrollProps) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: ANIMATION_CONFIG.durations.normal, 
        delay,
        ease: ANIMATION_CONFIG.easings.gentle
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

// Stagger Children Component
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerChildren = memo(function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.03  // Reduced from 0.1 for smoother reveals
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

// Scale on Hover Component
interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export const ScaleOnHover = memo(function ScaleOnHover({ 
  children, 
  className = '',
  scale = 1.05
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ 
        type: 'spring', 
        ...ANIMATION_CONFIG.springs.snappy
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
