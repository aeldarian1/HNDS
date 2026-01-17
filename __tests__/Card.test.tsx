import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  MotionCard,
} from '@/app/components/ui/Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card data-testid="card">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Card variant="default" data-testid="card">Default</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-slate-900/50');

    rerender(<Card variant="elevated" data-testid="card">Elevated</Card>);
    expect(screen.getByTestId('card')).toHaveClass('shadow-xl');

    rerender(<Card variant="outline" data-testid="card">Outline</Card>);
    expect(screen.getByTestId('card')).toHaveClass('border-2');

    rerender(<Card variant="ghost" data-testid="card">Ghost</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-transparent');

    rerender(<Card variant="gradient" data-testid="card">Gradient</Card>);
    expect(screen.getByTestId('card')).toHaveClass('bg-gradient-to-br');
  });

  it('applies hover effect by default', () => {
    render(<Card data-testid="card">Hoverable</Card>);
    expect(screen.getByTestId('card')).toHaveClass('hover:border-yellow-600/50');
  });

  it('removes hover effect when hover is false', () => {
    render(<Card hover={false} data-testid="card">No Hover</Card>);
    expect(screen.getByTestId('card')).not.toHaveClass('hover:border-yellow-600/50');
  });

  it('applies glow effect when glow is true', () => {
    render(<Card glow data-testid="card">Glow</Card>);
    expect(screen.getByTestId('card')).toHaveClass('hover:shadow-yellow-600/30');
  });

  it('accepts additional className', () => {
    render(<Card className="custom-class" data-testid="card">Custom</Card>);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });
});

describe('CardHeader Component', () => {
  it('renders with default props', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('p-6');
  });
});

describe('CardTitle Component', () => {
  it('renders as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Title');
  });

  it('applies default styles', () => {
    render(<CardTitle>Styled Title</CardTitle>);
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-light');
    expect(title).toHaveClass('text-white');
  });
});

describe('CardDescription Component', () => {
  it('renders with default props', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('text-sm');
    expect(desc).toHaveClass('text-gray-400');
  });
});

describe('CardContent Component', () => {
  it('renders with default props', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6');
  });
});

describe('CardFooter Component', () => {
  it('renders with default props', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('flex');
  });
});

describe('CardImage Component', () => {
  it('renders image with overlay by default', () => {
    const { container } = render(<CardImage src="/test.jpg" alt="Test" />);
    // Check image exists
    expect(container.querySelector('img')).toBeInTheDocument();
    // Check overlay div exists (has bg-gradient class)
    expect(container.querySelector('.bg-gradient-to-t')).toBeInTheDocument();
  });

  it('renders without overlay when overlay is false', () => {
    const { container } = render(<CardImage src="/test.jpg" alt="Test" overlay={false} />);
    // Image should exist
    expect(container.querySelector('img')).toBeInTheDocument();
    // Without overlay, there should be no gradient div
    expect(container.querySelector('.bg-gradient-to-t')).not.toBeInTheDocument();
  });
});

describe('MotionCard Component', () => {
  it('renders with default props', () => {
    render(<MotionCard>Motion Card Content</MotionCard>);
    expect(screen.getByText('Motion Card Content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<MotionCard variant="gradient"><span data-testid="child">Child</span></MotionCard>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
