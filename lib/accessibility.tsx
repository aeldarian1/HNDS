'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Accessibility utility hooks and helpers
 */

/**
 * Focus trap hook for modals and dialogs
 * Keeps focus within a container when open
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when activated
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}

/**
 * Announce messages to screen readers
 */
export function useAnnounce() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return announce;
}

/**
 * Restore focus after modal closes
 */
export function useRestoreFocus() {
  const previousFocus = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    previousFocus.current?.focus();
  }, []);

  return { saveFocus, restoreFocus };
}

/**
 * Keyboard navigation hook for lists
 */
export function useArrowNavigation(
  items: HTMLElement[],
  options: {
    loop?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
  } = {}
) {
  const { loop = true, orientation = 'vertical' } = options;
  const currentIndex = useRef(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    let nextIndex = currentIndex.current;

    if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
      e.preventDefault();
      nextIndex = currentIndex.current + 1;
      if (nextIndex >= items.length) {
        nextIndex = loop ? 0 : items.length - 1;
      }
    } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
      e.preventDefault();
      nextIndex = currentIndex.current - 1;
      if (nextIndex < 0) {
        nextIndex = loop ? items.length - 1 : 0;
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== currentIndex.current) {
      currentIndex.current = nextIndex;
      items[nextIndex]?.focus();
    }
  }, [items, loop, orientation]);

  return { handleKeyDown, currentIndex };
}

/**
 * Reduced motion preference hook
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Skip to content component
 */
interface SkipLinkProps {
  targetId?: string;
  children?: React.ReactNode;
}

export function SkipLink({ targetId = 'main-content', children }: SkipLinkProps) {
  return React.createElement('a', {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-yellow-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white',
  }, children || 'Preskoči na sadržaj');
}

/**
 * Visually hidden component for screen readers
 */
interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: 'span' | 'div' | 'p';
}

export function VisuallyHidden({ children, as = 'span' }: VisuallyHiddenProps) {
  return React.createElement(as, { className: 'sr-only' }, children);
}

/**
 * Accessible icon wrapper
 */
interface AccessibleIconProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function AccessibleIcon({ icon, label, className = '' }: AccessibleIconProps) {
  return React.createElement('span', {
    className,
    role: 'img',
    'aria-label': label,
  }, icon, React.createElement(VisuallyHidden, null, label));
}

/**
 * Live region for dynamic content announcements
 */
interface LiveRegionProps {
  children: React.ReactNode;
  mode?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export function LiveRegion({ 
  children, 
  mode = 'polite', 
  atomic = true,
  className = ''
}: LiveRegionProps) {
  return React.createElement('div', {
    role: 'status',
    'aria-live': mode,
    'aria-atomic': atomic,
    className: `sr-only ${className}`,
  }, children);
}

/**
 * Generate unique IDs for accessibility attributes
 */
let idCounter = 0;
export function useUniqueId(prefix: string = 'id'): string {
  const idRef = useRef<string>(undefined);

  if (!idRef.current) {
    idRef.current = `${prefix}-${++idCounter}`;
  }
  
  return idRef.current;
}

/**
 * Accessible loading state
 */
interface LoadingAnnouncerProps {
  isLoading: boolean;
  loadingMessage?: string;
  loadedMessage?: string;
}

export function LoadingAnnouncer({
  isLoading,
  loadingMessage = 'Učitavanje...',
  loadedMessage = 'Sadržaj učitan',
}: LoadingAnnouncerProps) {
  const [shouldAnnounce, setShouldAnnounce] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldAnnounce(true);
    } else if (shouldAnnounce) {
      const timer = setTimeout(() => {
        setShouldAnnounce(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, shouldAnnounce]);

  const content = isLoading ? loadingMessage : shouldAnnounce ? loadedMessage : null;
  return React.createElement(LiveRegion, { mode: 'polite', children: content });
}

/**
 * Accessible tabs component helpers
 */
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface UseTabsOptions {
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function useTabs(tabs: TabItem[], options: UseTabsOptions = {}) {
  const { defaultTab, onChange } = options;
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const tabListRef = useRef<HTMLDivElement>(null);

  const selectTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const newTab = tabs[newIndex];
    if (newTab) {
      selectTab(newTab.id);
      const tabButtons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      tabButtons?.[newIndex]?.focus();
    }
  }, [activeTab, tabs, selectTab]);

  return {
    activeTab,
    selectTab,
    handleKeyDown,
    tabListRef,
    getTabProps: (tab: TabItem) => ({
      id: `tab-${tab.id}`,
      role: 'tab' as const,
      'aria-selected': activeTab === tab.id,
      'aria-controls': `panel-${tab.id}`,
      tabIndex: activeTab === tab.id ? 0 : -1,
      onClick: () => selectTab(tab.id),
    }),
    getPanelProps: (tab: TabItem) => ({
      id: `panel-${tab.id}`,
      role: 'tabpanel' as const,
      'aria-labelledby': `tab-${tab.id}`,
      tabIndex: 0,
      hidden: activeTab !== tab.id,
    }),
  };
}
