import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (classNames)', () => {
    it('merges class names correctly', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      const result = cn('base', true && 'active', false && 'hidden');
      expect(result).toBe('base active');
    });

    it('handles arrays of classes', () => {
      const result = cn(['class1', 'class2']);
      expect(result).toBe('class1 class2');
    });

    it('handles undefined and null values', () => {
      const result = cn('base', undefined, null, 'end');
      expect(result).toBe('base end');
    });

    it('merges Tailwind classes correctly', () => {
      // Later classes should override earlier ones for conflicting properties
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('handles objects with boolean values', () => {
      const result = cn({
        'base': true,
        'active': true,
        'disabled': false,
      });
      expect(result).toBe('base active');
    });

    it('handles empty inputs', () => {
      const result = cn('', '', '');
      expect(result).toBe('');
    });

    it('handles complex combinations', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled',
        ['array-class-1', 'array-class-2'],
        { 'object-class': true, 'skip-class': false }
      );
      expect(result).toContain('base-class');
      expect(result).toContain('active');
      expect(result).not.toContain('disabled');
      expect(result).toContain('array-class-1');
      expect(result).toContain('array-class-2');
      expect(result).toContain('object-class');
      expect(result).not.toContain('skip-class');
    });
  });
});
