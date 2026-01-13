/**
 * Reusable Layout Components for consistent page structure
 * Provides flexible containers, sections, and grids with proper spacing and responsiveness
 */

import React, { ReactNode } from 'react';

// ============ CONTAINER COMPONENTS ============

/**
 * MaxWidth Container - Constrains content to max width with proper padding
 * Used as the base wrapper for all page sections
 */
export function Container({
  children,
  className = '',
  size = 'lg',
}: {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) {
  const sizes = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <div className={`mx-auto px-4 md:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section - Full-width section with optional background and border
 * Provides consistent vertical padding and background styling
 */
export function Section({
  children,
  className = '',
  background = 'default',
  border = 'bottom',
  py = 'lg',
  id,
}: {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alt' | 'gradient' | 'none';
  border?: 'none' | 'top' | 'bottom' | 'both';
  py?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}) {
  const bgClasses = {
    default: 'bg-slate-950',
    alt: 'bg-slate-900',
    gradient: 'bg-gradient-to-b from-slate-900 to-slate-950',
    none: 'bg-transparent',
  };

  const paddingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
  };

  const borderClasses = {
    none: '',
    top: 'border-t border-yellow-600/30',
    bottom: 'border-b border-yellow-600/30',
    both: 'border-t border-b border-yellow-600/30',
  };

  return (
    <section
      id={id}
      className={`${bgClasses[background]} ${paddingClasses[py]} ${borderClasses[border]} ${className}`}
    >
      {children}
    </section>
  );
}

// ============ HERO SECTION COMPONENTS ============

/**
 * HeroSection - Full-height hero with background variants
 * Perfect for page headers with large typography
 */
export function HeroSection({
  children,
  className = '',
  background = 'gradient',
}: {
  children: ReactNode;
  className?: string;
  background?: 'gradient' | 'solid' | 'pattern';
}) {
  const bgClasses = {
    gradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
    solid: 'bg-slate-950',
    pattern:
      'bg-slate-950 before:absolute before:inset-0 before:opacity-5 before:pointer-events-none',
  };

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden pt-32 ${bgClasses[background]} ${className}`}
    >
      {/* Background pattern - optional */}
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgb(234, 179, 8) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      )}

      {/* Floating orbs - static background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

/**
 * PageHeader - Standard page header with title and description
 * Used on About, Gallery, Events, etc.
 */
export function PageHeader({
  title,
  description,
  subtitle,
  icon: Icon,
  className = '',
}: {
  title: string;
  description?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <Section background="gradient" border="bottom" py="md" className={className}>
      <Container>
        <div className="space-y-6">
          {Icon && <Icon className="w-12 h-12 text-yellow-600" />}
          <div>
            {subtitle && (
              <p className="text-sm font-light text-yellow-500 uppercase tracking-widest mb-2">
                {subtitle}
              </p>
            )}
            <h1 className="text-6xl md:text-7xl font-light text-white">{title}</h1>
          </div>
          {description && (
            <p className="text-xl text-gray-300 max-w-2xl font-light">{description}</p>
          )}
          <div className="w-12 h-px bg-yellow-600" />
        </div>
      </Container>
    </Section>
  );
}

// ============ GRID & LAYOUT COMPONENTS ============

/**
 * TwoColumnLayout - Flexible 2-column layout for content and visuals
 */
export function TwoColumnLayout({
  left,
  right,
  reverseOnMobile = false,
  gap = 'lg',
  verticalAlign = 'center',
}: {
  left: ReactNode;
  right: ReactNode;
  reverseOnMobile?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  verticalAlign?: 'start' | 'center' | 'end';
}) {
  const gapClasses = {
    sm: 'gap-8',
    md: 'gap-12',
    lg: 'gap-16',
    xl: 'gap-20',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 ${gapClasses[gap]} ${alignClasses[verticalAlign]} ${
        reverseOnMobile ? 'lg:grid-cols-2' : ''
      }`}
    >
      <div className={reverseOnMobile ? 'lg:order-2' : ''}>{left}</div>
      <div className={reverseOnMobile ? 'lg:order-1' : ''}>{right}</div>
    </div>
  );
}

/**
 * ResponsiveGrid - Flexible multi-column grid with responsive columns
 */
export function ResponsiveGrid({
  children,
  columns = '3',
  gap = 'md',
}: {
  children: ReactNode;
  columns?: '1' | '2' | '3' | '4';
  gap?: 'sm' | 'md' | 'lg';
}) {
  const colClasses = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]}`}>{children}</div>
  );
}

// ============ CARD COMPONENTS ============

/**
 * Card - Flexible card component with hover effects
 */
export function Card({
  children,
  className = '',
  hover = true,
  border = true,
  padding = 'md',
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  border?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover
    ? 'hover:bg-slate-800/50 hover:border-yellow-600/50 transition-all duration-300'
    : '';
  const borderClass = border ? 'border border-slate-800/50' : '';

  return (
    <div
      className={`rounded-lg bg-slate-900/30 backdrop-blur-sm ${borderClass} ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * FeatureCard - Card designed for features/benefits
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className = '',
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="space-y-4">
        <Icon className="w-8 h-8 text-yellow-600" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}

// ============ CONTENT COMPONENTS ============

/**
 * TextBlock - Consistent text styling and spacing
 */
export function TextBlock({
  children,
  size = 'md',
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} text-gray-300 font-light leading-relaxed space-y-4 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Divider - Visual separator between sections
 */
export function Divider({
  className = '',
  color = 'yellow',
}: {
  className?: string;
  color?: 'yellow' | 'gray';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600/30',
  };

  return <div className={`h-px ${colorClasses[color]} ${className}`} />;
}

/**
 * Badge - Inline badge for tags, labels, etc.
 */
export function Badge({
  children,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}) {
  const variantClasses = {
    primary: 'bg-yellow-600/20 border border-yellow-600/40 text-yellow-500',
    secondary: 'bg-slate-800 border border-slate-700 text-gray-300',
    ghost: 'text-gray-400 border-l-2 border-yellow-600/50 pl-3',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded text-xs font-medium uppercase tracking-widest ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ============ LIST COMPONENTS ============

/**
 * SimpleList - Styled list with icons
 */
export function SimpleList({
  items,
  icon: Icon,
}: {
  items: Array<{ title: string; description: string }>;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <Icon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm font-light mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ UTILITY COMPONENTS ============

/**
 * Stack - Flexible vertical/horizontal stacking
 */
export function Stack({
  children,
  direction = 'vertical',
  gap = 'md',
  align = 'start',
}: {
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'between';
}) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  const directionClasses = direction === 'vertical' ? 'flex flex-col' : 'flex flex-row';

  return (
    <div className={`${directionClasses} ${gapClasses[gap]} ${alignClasses[align]}`}>
      {children}
    </div>
  );
}

/**
 * AspectBox - Maintain aspect ratio for images/videos
 */
export function AspectBox({
  children,
  ratio = '1/1',
  className = '',
}: {
  children: ReactNode;
  ratio?: '1/1' | '16/9' | '4/3' | '3/2';
  className?: string;
}) {
  const ratioClasses = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
  };

  return (
    <div className={`overflow-hidden rounded-lg ${ratioClasses[ratio]} ${className}`}>
      {children}
    </div>
  );
}
