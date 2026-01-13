// Animation configuration for consistent, smooth animations throughout the site

export const ANIMATION_CONFIG = {
  // Durations (in seconds)
  durations: {
    instant: 0.15,
    fast: 0.25,    // Reduced from 0.3 for snappier feel
    normal: 0.5,   // Reduced from 0.6 for better responsiveness
    slow: 0.8,     // Reduced from 0.9
    verySlow: 1.0, // Reduced from 1.2 - matches optimized Lenis duration
  },

  // Easing functions
  easings: {
    // Smooth, natural easing for most transitions
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    // Snappy for interactions
    snappy: [0.4, 0, 0.2, 1] as const,
    // Bouncy for playful effects
    bouncy: [0.68, -0.55, 0.265, 1.55] as const,
    // Gentle for scroll animations
    gentle: [0.21, 0.47, 0.32, 0.98] as const,
    // Emphasized for important elements
    emphasized: [0.77, 0, 0.175, 1] as const,
  },

  // Spring configurations
  springs: {
    // Gentle spring for hover effects
    gentle: { stiffness: 200, damping: 30 },    // Reduced stiffness from 300
    // Snappy spring for buttons
    snappy: { stiffness: 350, damping: 17 },    // Reduced stiffness from 400
    // Bouncy spring for playful elements
    bouncy: { stiffness: 260, damping: 20 },
    // Smooth spring for cards
    smooth: { stiffness: 180, damping: 25 },    // Reduced stiffness from 200
  },

  // Delays (in seconds)
  delays: {
    none: 0,
    short: 0.05,
    medium: 0.1,
    long: 0.2,
  },

  // Stagger configurations
  stagger: {
    fast: 0.02,    // Reduced from 0.03
    normal: 0.04,  // Reduced from 0.05
    slow: 0.08,    // Reduced from 0.1
  },
};

// Hover animation presets
export const HOVER_ANIMATIONS = {
  // Subtle scale up
  scaleUp: {
    scale: 1.02,
    transition: { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easings.smooth },
  },
  // More pronounced scale
  scaleUpMore: {
    scale: 1.05,
    transition: { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easings.smooth },
  },
  // Lift up effect
  liftUp: {
    y: -5,
    transition: { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easings.smooth },
  },
  // Gentle grow
  grow: {
    scale: 1.03,
    y: -3,
    transition: { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easings.smooth },
  },
};

// Scroll reveal animations
export const SCROLL_REVEALS = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
  fadeRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
};

// Page transition animations
export const PAGE_TRANSITIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easings.smooth },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: ANIMATION_CONFIG.durations.normal, ease: ANIMATION_CONFIG.easings.gentle },
  },
};
