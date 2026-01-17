'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-yellow-600/50 hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50',
        outline:
          'border-2 border-yellow-600/50 bg-transparent text-white hover:bg-yellow-600/10 hover:border-yellow-600 hover:scale-[1.02]',
        secondary:
          'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700',
        ghost:
          'text-gray-300 hover:text-yellow-500 hover:bg-yellow-600/10',
        link:
          'text-yellow-500 underline-offset-4 hover:underline hover:text-yellow-400',
        glow:
          'bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg shadow-yellow-600/30 hover:shadow-yellow-600/60 hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-10 sm:h-9 px-4 text-xs',
        lg: 'h-12 sm:h-14 px-6 sm:px-8 text-base',
        xl: 'h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg',
        icon: 'h-10 w-10 sm:h-11 sm:w-11',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'none',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // When using asChild, Slot requires exactly one child element
    // So we cannot add icons - they must be in the child component itself
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, rounded, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    // For regular buttons, render with icons
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon}
        {loading ? 'Loading...' : children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

// Animated Button with Framer Motion
interface MotionButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'glow' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, rounded, children, disabled, onClick, type = 'button' }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.button>
    );
  }
);
MotionButton.displayName = 'MotionButton';

export { Button, MotionButton, buttonVariants };
