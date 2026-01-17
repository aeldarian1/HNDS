'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Badge Component
const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-yellow-600/20 text-yellow-600 border border-yellow-600/30',
        primary: 'bg-yellow-600 text-white',
        secondary: 'bg-slate-800 text-gray-300 border border-slate-700',
        outline: 'border-2 border-yellow-600/50 text-yellow-600',
        success: 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30',
        warning: 'bg-amber-600/20 text-amber-400 border border-amber-600/30',
        error: 'bg-red-600/20 text-red-400 border border-red-600/30',
        info: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ className, variant, size, ...props }) => (
  <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
);

// Divider Component
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  decorative = false,
  ...props
}) => (
  <div
    role={decorative ? 'presentation' : 'separator'}
    aria-orientation={orientation}
    className={cn(
      'bg-yellow-600/20',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
);

// Section Header
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  /** Shorthand for align="center" */
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showDivider?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  centered,
  className,
  titleClassName,
  subtitleClassName,
  showDivider = true,
}) => {
  // centered prop takes precedence
  const effectiveAlign = centered ? 'center' : align;
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn(alignments[effectiveAlign], className)}>
      <h2 className={cn('text-3xl sm:text-4xl md:text-6xl font-light text-white mb-3 sm:mb-4', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-gray-400 font-light text-base sm:text-lg', subtitleClassName)}>{subtitle}</p>
      )}
      {showDivider && (
        <div
          className={cn(
            'w-12 h-px bg-yellow-600 mt-4 sm:mt-6',
            effectiveAlign === 'center' && 'mx-auto',
            effectiveAlign === 'right' && 'ml-auto'
          )}
        />
      )}
    </div>
  );
};

// Container
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({ className, size = 'lg', children, ...props }) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 md:px-8', sizes[size], className)} {...props}>
      {children}
    </div>
  );
};

// Section
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'dark' | 'gradient';
  border?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section: React.FC<SectionProps> = ({
  className,
  variant = 'default',
  border = false,
  padding = 'lg',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-950',
    alternate: 'bg-slate-900',
    dark: 'bg-slate-950',
    gradient: 'bg-gradient-to-b from-slate-900 to-slate-950',
  };

  const paddings = {
    sm: 'py-10 sm:py-12 md:py-16',
    md: 'py-12 sm:py-16 md:py-24',
    lg: 'py-16 sm:py-20 md:py-32',
    xl: 'py-20 sm:py-24 md:py-40',
  };

  return (
    <section
      className={cn(
        variants[variant],
        paddings[padding],
        border && 'border-y border-yellow-600/30',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

// Grid
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid: React.FC<GridProps> = ({
  className,
  cols = 3,
  gap = 'lg',
  responsive = true,
  children,
  ...props
}) => {
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const columns = responsive
    ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      }
    : {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
      };

  return (
    <div className={cn('grid', columns[cols], gaps[gap], className)} {...props}>
      {children}
    </div>
  );
};

// Skeleton Loader
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-slate-800/50',
        variants[variant],
        animations[animation],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  );
};

// Avatar
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt,
  fallback,
  size = 'md',
  ...props
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const [error, setError] = React.useState(false);

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-slate-800 border border-yellow-600/30',
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-slate-800 text-yellow-600 font-medium">
          {fallback || alt?.charAt(0).toUpperCase() || '?'}
        </span>
      )}
    </div>
  );
};

// Icon Button
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-yellow-600/10 text-yellow-600 hover:bg-yellow-600/20 border border-yellow-600/30',
      ghost: 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-600/10',
      outline: 'border-2 border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10',
    };

    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all duration-300',
          variants[variant],
          sizes[size],
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      />
    );
  }
);
IconButton.displayName = 'IconButton';

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
};
