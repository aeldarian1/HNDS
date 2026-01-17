// UI Component Library - Main Export
// All reusable UI components for the HNDS website

// Buttons
export { Button, MotionButton, buttonVariants } from './Button';
export type { ButtonProps } from './Button';

// Cards
export {
  Card,
  MotionCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  FeatureCard,
  StatsCard,
  NewsCard,
} from './Card';

// Form Components
export { Input, Textarea, Select, Checkbox, Radio } from './Form';

// Common Components
export {
  Badge,
  badgeVariants,
  Divider,
  SectionHeader,
  Container,
  Section,
  Grid,
  Skeleton,
  Avatar,
  IconButton,
} from './Common';

// Loading Components
export {
  Skeleton as LoadingSkeleton,
  PageLoadingSkeleton,
  CardSkeleton,
  HeroSkeleton,
} from './Loading';

// Animations
export {
  // Hero animations
  HeroFadeIn,
  HeroSlideIn,
  // Scroll animations
  FadeIn,
  FadeInUp,
  FadeInDown,
  SlideLeft,
  SlideRight,
  ScaleIn,
  BlurIn,
  // Stagger animations
  StaggerContainer,
  StaggerItem,
  // Special animations
  Counter,
  Reveal,
  TextReveal,
  Parallax,
  // Hover animations
  HoverScale,
  HoverLift,
  // Continuous animations
  Floating,
  Pulse,
  // Page transition
  PageTransition,
  // Motion export
  motion,
} from './Animations';
