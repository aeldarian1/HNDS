# Animation Implementation Guide

## Quick Reference

### Using AnimatedSection Components

All animation components are exported from `app/components/AnimatedSection.tsx` and designed for easy, consistent use across the website.

---

## 1. HeroFadeIn - Page Load Animations

**Use Case:** Hero sections and main page headlines

**Features:**
- Fades in with upward motion on page load
- Staggered text animation with individual delays
- Smooth cubic-bezier easing

**Example:**
```tsx
import { HeroFadeIn } from "@/app/components/AnimatedSection";

<HeroFadeIn className="space-y-6">
  <h1 className="text-6xl md:text-7xl font-light text-white">Page Title</h1>
  <p className="text-xl text-gray-300">Subtitle or description</p>
  <div className="w-12 h-px bg-yellow-600" />
</HeroFadeIn>
```

**Animation Details:**
- Initial: opacity 0, y: 20px
- Final: opacity 1, y: 0
- Duration: 0.7s
- Easing: cubic-bezier(0.22, 0.61, 0.36, 1)
- Stagger children with 0.12s delay each

---

## 2. FadeIn - Scroll-Triggered Fade

**Use Case:** Section headers, content blocks that appear on scroll

**Features:**
- Fades in when scrolled into view
- Smooth fade transition
- Only animates once (on first scroll)

**Example:**
```tsx
import { FadeIn } from "@/app/components/AnimatedSection";

<FadeIn className="mb-16">
  <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Section Title</h2>
  <div className="w-12 h-px bg-yellow-600" />
</FadeIn>
```

**Animation Details:**
- Triggers: whileInView when 30% visible
- Initial: opacity 0
- Final: opacity 1
- Duration: 0.7s
- Viewport margin: -80px (starts early)
- Once: true (animates only once)

---

## 3. SlideLeft - Left Slide Animation

**Use Case:** Content blocks that appear from the left side

**Features:**
- Slides in from left with fade
- Smooth motion with fade-in
- Perfect for alternating left/right layouts

**Example:**
```tsx
import { SlideLeft } from "@/app/components/AnimatedSection";

<div className="grid grid-cols-2 gap-16">
  <SlideLeft className="space-y-8">
    <h2>Left Column</h2>
    <p>Content appears from the left...</p>
  </SlideLeft>
  
  <SlideRight className="...">
    {/* Right column content */}
  </SlideRight>
</div>
```

**Animation Details:**
- Initial: opacity 0, x: -30px
- Final: opacity 1, x: 0
- Duration: 0.7s
- Triggers on scroll
- Once: true

---

## 4. SlideRight - Right Slide Animation

**Use Case:** Content blocks that appear from the right side

**Features:**
- Slides in from right with fade
- Mirror of SlideLeft
- Complements left-side animations

**Example:**
```tsx
<SlideRight className="relative h-96">
  <div className="absolute inset-0 bg-gradient-to-br...">
    {/* Decorative or image content */}
  </div>
</SlideRight>
```

**Animation Details:**
- Initial: opacity 0, x: 30px
- Final: opacity 1, x: 0
- Duration: 0.7s
- Triggers on scroll
- Once: true

---

## 5. ScaleIn - Spring Scale Animation

**Use Case:** Featured cards, highlight elements, important visual elements

**Features:**
- Scales up with spring physics
- Elegant "pop" appearance
- Great for emphasis

**Example:**
```tsx
import { ScaleIn } from "@/app/components/AnimatedSection";

<ScaleIn className="border border-yellow-600/30 p-8">
  <h3 className="text-2xl font-light text-white">Featured Item</h3>
  <p className="text-gray-300">This item will scale in with spring animation</p>
</ScaleIn>
```

**Animation Details:**
- Initial: scale 0
- Final: scale 1
- Type: spring
- Stiffness: 200
- Triggers on scroll
- Once: true

---

## 6. StaggerContainer + StaggerItem - Grid Animations

**Use Case:** Gallery grids, list items, any repeated elements

**Features:**
- Coordinates animations across multiple items
- Each item fades in with upward motion
- Staggered timing for wave effect

**Example:**
```tsx
import { StaggerContainer, StaggerItem } from "@/app/components/AnimatedSection";

<StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <StaggerItem key={index} className="border border-yellow-600/30 p-6">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </StaggerItem>
  ))}
</StaggerContainer>
```

**Animation Details:**
- Container: Manages stagger timing
- Item Initial: opacity 0, y: 20px
- Item Final: opacity 1, y: 0
- Duration: 0.7s
- Stagger Delay: 0.08s between items
- Triggers on scroll
- Once: true

---

## Timing Constants Reference

All animations use these unified values for consistency:

```typescript
// Easing function (cubic-bezier)
EASING = [0.22, 0.61, 0.36, 1]

// Animation duration (seconds)
DURATION = 0.7

// Viewport settings (pixels)
VIEWPORT_MARGIN = -80

// Grid animation stagger (seconds)
STAGGER_DELAY = 0.08

// Intersection observer threshold
VIEWPORT_AMOUNT = 0.3 (30% visibility)
```

---

## Common Patterns

### Pattern 1: Alternating Left-Right Sections
```tsx
<section className="py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    <SlideLeft className="space-y-8">
      {/* Left content */}
    </SlideLeft>
    
    <SlideRight className="...">
      {/* Right content */}
    </SlideRight>
  </div>
</section>
```

### Pattern 2: Animated Grid
```tsx
<StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item, idx) => (
    <StaggerItem key={idx}>
      {/* Card content */}
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Pattern 3: Section with Header
```tsx
<section className="py-20">
  <FadeIn className="mb-16">
    <h2 className="text-5xl md:text-6xl font-light text-white mb-4">Title</h2>
    <div className="w-12 h-px bg-yellow-600" />
  </FadeIn>
  
  <StaggerContainer className="grid ...">
    {/* Content */}
  </StaggerContainer>
</section>
```

### Pattern 4: Hero Section
```tsx
<section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-slate-900 to-slate-950">
  <div className="max-w-6xl mx-auto px-4 md:px-8">
    <HeroFadeIn className="space-y-6">
      <h1 className="text-6xl md:text-7xl font-light text-white">Title</h1>
      <p className="text-xl text-gray-300 max-w-2xl font-light">Description</p>
      <div className="w-12 h-px bg-yellow-600" />
    </HeroFadeIn>
  </div>
</section>
```

---

## Performance Tips

### ✅ DO:
- Use `className` prop to pass styling
- Wrap full sections with animation components
- Combine with `RevealOnScroll` and `ScaleOnHover` for extra polish
- Use consistent timing across the page
- Let animations run at 0.7s (matches all configured animations)

### ❌ DON'T:
- Override the animation timing (all are set to 0.7s for consistency)
- Use multiple animation components for the same element
- Add custom framer-motion animations to animated components
- Change the easing function (all use the same cubic-bezier)
- Nest StaggerContainers (use only one level of stagger)

---

## Custom Animation Examples

### Combining with motion.div
For custom animations not covered by the components:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{
    duration: 0.7,
    ease: [0.22, 0.61, 0.36, 1]
  }}
>
  {/* Your content */}
</motion.div>
```

### Using RevealOnScroll (Alternative)
```tsx
import { RevealOnScroll, ScaleOnHover } from "@/app/components/InteractiveElements";

<RevealOnScroll delay={0.1} direction="up">
  <ScaleOnHover scale={1.03}>
    {/* Content that reveals on scroll */}
  </ScaleOnHover>
</RevealOnScroll>
```

---

## Troubleshooting

### Animation Not Triggering
- Check if component is within viewport when page loads
- Animations start at -80px above visible area
- Use browser DevTools to verify viewport visibility

### Animation Janky/Stuttering
- Ensure `willChange: 'transform'` is applied
- Check for heavy CPU operations during animation
- Reduce motion in components if needed
- Verify browser hardware acceleration is enabled

### Multiple Animations Conflicting
- Only use ONE animation component per element
- Don't nest StaggerContainers
- Use `once: true` to prevent repeated animations

### Stagger Not Working
- Must use StaggerContainer + StaggerItem together
- Items must be direct children of StaggerContainer
- Use `.map()` to iterate properly

---

## Adding New Animations

To add a new animation component to `AnimatedSection.tsx`:

```tsx
export const MyAnimation = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className = "" }, ref) => (
  <motion.div
    ref={ref}
    initial={{ /* initial state */ }}
    whileInView={{ /* final state */ }}
    viewport={{ once: true, margin: "-80px", amount: 0.3 }}
    transition={{
      duration: DURATION,
      ease: EASING,
    }}
    className={className}
  >
    {children}
  </motion.div>
));
```

Follow the existing pattern:
1. Use `DURATION` and `EASING` constants
2. Use `VIEWPORT_CONFIG` for viewport settings
3. Use `forwardRef` for ref support
4. Export with meaningful name
5. Document in this guide

---

## Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Animation Best Practices:** https://web.dev/animations-guide/
- **Core Web Vitals:** https://web.dev/vitals/
- **Performance Tips:** https://nextjs.org/learn/foundations/how-nextjs-works/rendering

---

*Last Updated: January 13, 2026*  
*For questions or improvements, refer to the codebase or AnimatedSection.tsx*
