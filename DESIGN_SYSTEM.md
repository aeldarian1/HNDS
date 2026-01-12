# HNDS Website - Design System & Specifications

## 🎨 Color System

### Primary Colors
```
Primary Yellow:    #FFC107 (RGB: 255, 193, 7)
Secondary Blue:    #1E90FF (RGB: 30, 144, 255)
Accent Red:        #FF4444 (RGB: 255, 68, 68)
```

### Neutral Colors
```
Background:        #000000 (RGB: 0, 0, 0)
Foreground:        #FFFFFF (RGB: 255, 255, 255)
Gray 400:          #CCCCCC (RGB: 204, 204, 204)
Gray 300:          #999999 (RGB: 153, 153, 153)
Card BG:           #1A1A1A (RGB: 26, 26, 26)
Border:            #333333 (RGB: 51, 51, 51)
```

### Semantic Uses
- **Primary**: Main CTAs, highlights, gradients
- **Secondary**: Accent elements, links
- **Accent**: Warnings, special offers
- **Neutral**: Text, backgrounds, borders

## 📏 Typography

### Font Stack
```
Sans-serif (Primary):  Geist, -apple-system, BlinkMacSystemFont
Monospace:             Geist Mono
Fallback:              system-ui, sans-serif
```

### Font Sizes & Weights
```
H1:    text-7xl / 84px   | 700 Bold     | Line-height: 1.2
H2:    text-5xl / 48px   | 700 Bold     | Line-height: 1.2
H3:    text-3xl / 32px   | 700 Bold     | Line-height: 1.3
H4:    text-2xl / 24px   | 600 SemiBold | Line-height: 1.4
Body:  text-lg / 18px    | 400 Regular  | Line-height: 1.6
Small: text-sm / 14px    | 400 Regular  | Line-height: 1.5
```

### Text Hierarchy
- **Headers**: Gradient text for emphasis
- **Body**: Gray-400 for readability
- **Interactive**: Primary color on hover
- **Disabled**: Gray-300 with reduced opacity

## 🧱 Component Library

### Buttons

**Primary Button**
```
Background:    Primary Color
Text:          White
Padding:       px-6 py-3
Border Radius: 8px
Hover:         Opacity 90%
Active:        Scale 95%
Icon Gap:      8px
```

**Secondary Button**
```
Background:    Transparent
Border:        1px solid
Text:          White
Padding:       px-6 py-3
Border Radius: 8px
Hover:         Background opacity 50%
```

### Cards
```
Background:    Card BG (#1A1A1A)
Border:        1px solid #333
Border Radius: 12px
Padding:       24px
Box Shadow:    0 4px 6px rgba(0,0,0,0.1)
Hover:         
  - Border → Primary
  - Shadow → Primary glow
Transition:    300ms ease
```

### Forms
```
Input Background:    rgba(255,255,255,0.05)
Input Border:        1px solid #333
Input Border Radius: 8px
Input Padding:       12px 16px
Focus:
  - Border → Primary
  - Ring → Primary with 20% opacity
Transition:          300ms ease
```

## ✨ Animation Standards

### Timing
```
Fast:      150ms
Standard:  300ms
Slow:      500ms
```

### Easing
```
Ease Out:  cubic-bezier(0.0, 0, 0.2, 1)
Ease In:   cubic-bezier(0.4, 0, 1, 1)
Ease Both: cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Animations

**Fade In**
```
Opacity: 0 → 1
Duration: 300ms
```

**Slide In From Left**
```
Transform: -20px → 0px
Opacity: 0 → 1
Duration: 300ms
```

**Scale Up**
```
Transform: 0.95 → 1
Duration: 300ms
```

**Glow Effect**
```
Box Shadow: Animated glow pulse
Duration: 2s infinite
```

## 📐 Spacing Scale

```
2px:   0.125rem (gaps between elements)
4px:   0.25rem  (tight spacing)
8px:   0.5rem   (button internal)
12px:  0.75rem  (form inputs)
16px:  1rem     (section padding)
24px:  1.5rem   (card padding)
32px:  2rem     (section gaps)
48px:  3rem     (large gaps)
64px:  4rem     (section spacing)
96px:  6rem     (major sections)
128px: 8rem     (hero spacing)
```

## 📱 Responsive Breakpoints

```
Mobile:     0px    (< 640px)
Tablet:     768px  (640px - 1024px)
Desktop:    1024px (1024px+)
Wide:       1280px (1280px+)
```

### Responsive Scales
```
Mobile:   16px base, 100% container
Tablet:   18px base, 95% container
Desktop:  20px base, 90% container
```

## 🎯 Layout Grid

### Container Widths
```
Mobile:   Full width with 16px padding
Tablet:   750px with 24px padding
Desktop:  1200px with 32px padding
```

### Column Grid
```
Mobile:   1 column
Tablet:   2 columns
Desktop:  3-4 columns
```

## ⚫ Shadow System

```
sm:      0 1px 2px 0 rgba(0,0,0,0.05)
md:      0 4px 6px -1px rgba(0,0,0,0.1)
lg:      0 10px 15px -3px rgba(0,0,0,0.1)
xl:      0 20px 25px -5px rgba(0,0,0,0.1)
2xl:     0 25px 50px -12px rgba(0,0,0,0.25)
glow:    0 0 20px rgba(255, 193, 7, 0.3)
```

## 🌑 Opacity Scale

```
Hover:    10-20% darker
Disabled: 50% opacity
Focus:    Ring at 20% opacity
Muted:    60% opacity
Subtle:   70% opacity
```

## 📊 Component Spacing

### Navigation
```
Height:      64px
Padding:     16px horizontal
Gap:         32px between items
Logo Size:   24px
```

### Hero Section
```
Top Padding:    128px
Bottom Padding: 80px
Title Size:     H1
Content Max:    800px
```

### Cards
```
Gap:           32px
Padding:       24px
Min Height:    200px
Max Width:     none (responsive)
```

### Sections
```
Top Padding:    96px
Bottom Padding: 96px
Max Width:      1200px
Content Max:    1000px
```

## 🎬 Animation Sequences

### Page Load
1. Fade in navigation (0ms)
2. Fade in hero text (150ms stagger)
3. Fade in stats (300ms)

### Scroll Animations
- Cards: Fade in + slide up (150ms)
- Images: Scale + fade in (200ms)
- Text: Slide in from side (250ms)

### Interactive Animations
- Button hover: Scale 1.05 (150ms)
- Button active: Scale 0.95 (50ms)
- Link hover: Color change (200ms)

## ♿ Accessibility Standards

### Contrast Ratios
- Text on background: 7:1+ (AAA)
- Interactive elements: 4.5:1+ (AA)
- Large text: 3:1+ (AA)

### Focus Indicators
- Visible outline: 2px ring
- Color: Primary color
- Offset: 2px

### Touch Targets
- Minimum size: 44px × 44px
- Minimum gap: 8px

## 📸 Image Guidelines

### Aspect Ratios
- Hero images: 16:9
- Cards: 1:1 or 4:3
- Thumbnails: 1:1
- Banners: 21:9

### Optimization
- Format: WebP with JPG fallback
- Compression: 80-85% quality
- Max width: 1920px
- Lazy load: defer off-screen

## 🎯 Design Tokens

```
Colors:
  primary-50:      #FFFBF0
  primary-500:     #FFC107
  primary-900:     #664D00

Spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px

Radii:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px

Shadows:
  sm, md, lg, xl, 2xl (see shadow system)
```

## 🚀 Performance Targets

- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

---

**Design System Version**: 1.0.0
**Last Updated**: January 2026
