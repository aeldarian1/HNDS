import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, MotionButton } from '@/app/components/ui/Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Button variant="default">Default</Button>);
    const button = screen.getByRole('button', { name: /default/i });
    expect(button).toHaveClass('bg-gradient-to-r');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-slate-800');
  });

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border-2');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('text-gray-300');
  });

  it('applies glow variant classes', () => {
    render(<Button variant="glow">Glow</Button>);
    const button = screen.getByRole('button', { name: /glow/i });
    expect(button).toHaveClass('shadow-lg');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10'); // Mobile-first: h-10 sm:h-9

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12'); // Mobile-first: h-12 sm:h-14

    rerender(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-14'); // Mobile-first: h-14 sm:h-16
  });

  it('applies rounded variants', () => {
    const { rerender } = render(<Button rounded="none">None</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-none');

    rerender(<Button rounded="lg">Rounded</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-lg');

    rerender(<Button rounded="full">Full</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });

  it('renders with left icon', () => {
    const TestIcon = <span data-testid="left-icon">→</span>;
    render(<Button leftIcon={TestIcon}>With Icon</Button>);
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const TestIcon = <span data-testid="right-icon">←</span>;
    render(<Button rightIcon={TestIcon}>With Icon</Button>);
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('accepts additional className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});

describe('MotionButton Component', () => {
  it('renders as motion button', () => {
    render(<MotionButton>Motion</MotionButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Motion');
  });

  it('applies variant classes', () => {
    render(<MotionButton variant="glow">Glow Motion</MotionButton>);
    expect(screen.getByRole('button')).toHaveClass('shadow-lg');
  });
});
