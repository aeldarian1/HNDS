'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';

// Card Container
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost' | 'gradient';
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, glow = false, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-900/50 border border-yellow-600/20',
      elevated: 'bg-slate-900 border border-slate-800 shadow-xl',
      outline: 'bg-transparent border-2 border-yellow-600/30',
      ghost: 'bg-transparent',
      gradient: 'bg-gradient-to-br from-slate-900 to-slate-950 border border-yellow-600/30',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-300',
          variants[variant],
          hover && 'hover:border-yellow-600/50 hover:shadow-lg hover:shadow-yellow-600/10',
          glow && 'hover:shadow-yellow-600/30',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// Animated Card with Motion
interface MotionCardProps {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost' | 'gradient';
  hover?: boolean;
  glow?: boolean;
  hoverScale?: number;
  hoverY?: number;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, variant = 'default', hover = true, glow = false, hoverScale = 1, hoverY = -8, children, onClick }, ref) => {
    const variants = {
      default: 'bg-slate-900/50 border border-yellow-600/20',
      elevated: 'bg-slate-900 border border-slate-800 shadow-xl',
      outline: 'bg-transparent border-2 border-yellow-600/30',
      ghost: 'bg-transparent',
      gradient: 'bg-gradient-to-br from-slate-900 to-slate-950 border border-yellow-600/30',
    };

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={cn(
          'rounded-lg transition-colors duration-300',
          variants[variant],
          hover && 'hover:border-yellow-600/50 hover:shadow-lg hover:shadow-yellow-600/10',
          glow && 'hover:shadow-yellow-600/30',
          className
        )}
        whileHover={{ y: hoverY, scale: hoverScale }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }
);
MotionCard.displayName = 'MotionCard';

// Card Header
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-light text-white leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-400 font-light', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

// Card Image
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  overlay?: boolean;
  overlayGradient?: string;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, overlay = true, overlayGradient, ...props }, ref) => (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" {...props} />
      {overlay && (
        <div
          className={cn(
            'absolute inset-0',
            overlayGradient || 'bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent'
          )}
        />
      )}
    </div>
  )
);
CardImage.displayName = 'CardImage';

// Feature Card - Pre-styled card for features/services
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  number?: string;
  href?: string;
  ctaText?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  number,
  href,
  ctaText = 'Saznaj više',
  className,
}) => {
  const content = (
    <MotionCard variant="gradient" className={cn('group h-full p-5 sm:p-6 md:p-8 active:scale-[0.98] transition-transform', className)} hoverY={-4}>
      {number && (
        <div className="text-4xl sm:text-5xl md:text-6xl font-light text-yellow-600/20 mb-4 sm:mb-6 group-hover:text-yellow-600/40 transition-colors">
          {number}
        </div>
      )}
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 mb-4 sm:mb-6" />
      <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-2 sm:mb-3 group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 font-light mb-4 sm:mb-6 text-sm leading-relaxed line-clamp-3">{description}</p>
      <div className="flex items-center gap-2 text-yellow-600 group-hover:gap-3 transition-all duration-300">
        <span className="text-sm font-light">{ctaText}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </MotionCard>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

// Stats Card - Mobile optimized
interface StatsCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      'backdrop-blur-md bg-slate-950/50 p-3 sm:p-4 rounded-lg border border-yellow-600/30 shadow-lg shadow-yellow-600/10 hover:bg-slate-950/60 hover:border-yellow-600/50 hover:shadow-yellow-600/20 transition-all duration-300',
      className
    )}
  >
    <div className="text-2xl sm:text-3xl md:text-4xl font-light text-yellow-500 mb-1 sm:mb-2">{value}</div>
    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider font-light leading-tight">{label}</div>
  </motion.div>
);

// News Card - Mobile optimized
interface NewsCardProps {
  date: string;
  category: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  date,
  category,
  title,
  slug,
  excerpt,
  image,
  className,
}) => (
  <MotionCard variant="outline" className={cn('group overflow-hidden active:scale-[0.98] transition-transform', className)} hoverY={-4}>
    {image && <CardImage src={image} alt={title} className="h-40 sm:h-48" />}
    <div className="p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <span className="text-[10px] sm:text-xs font-light uppercase tracking-wide text-yellow-600 px-2 sm:px-3 py-1 bg-yellow-600/10 rounded">
          {category}
        </span>
        <span className="text-[10px] sm:text-xs text-gray-500 font-light whitespace-nowrap">{date}</span>
      </div>
      <h3 className="text-lg sm:text-xl font-light text-white mb-3 sm:mb-4 line-clamp-2 group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>
      {excerpt && <p className="text-gray-400 font-light text-sm mb-4 line-clamp-2 sm:line-clamp-3">{excerpt}</p>}
      <Link
        href={`/vijesti/${slug}`}
        className="text-yellow-600 hover:text-yellow-500 transition flex items-center gap-2 text-sm font-light group/link"
      >
        Pročitaj više
        <svg
          className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </MotionCard>
);

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
};
