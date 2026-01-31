

# Shop The Look - Bespoke 3D Stack Widget

## Overview
Create a premium, custom-coded "Shop The Look" cross-sell section featuring an infinite 3D looping card stack with physics-based animations, tiered bundle discounts, and a distinctive "Quiet Luxury" aesthetic. All code will be self-contained in a single widget file with zero generic UI patterns.

## Section Placement

```text
Hero Section
      ↓
Shop by Category
      ↓
★ SHOP THE LOOK ★  ← NEW (insert here)
      ↓
Featured Products
      ↓
Sustainability
```

## Visual Layout (Desktop)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           Shop The Look                                     │
│              Curated ensembles styled with intention                        │
│                                                                             │
├───────────────────────────────────┬─────────────────────────────────────────┤
│                                   │                                         │
│      ┌─────────────────────┐      │   Cozy Knit Cardigan                    │
│      │                     │      │   Size: 3-4y                            │
│      │    3D ACTIVE CARD   │      │                           £42.00   (○)  │
│      │    (4:5 aspect)     │      │                                         │
│      │                     │      │                                         │
│      │                     │      │   Comfort Fit Trousers                  │
│      │                     │      │   Size: 3-4y                            │
│      │                     │      │                           £28.00   (●)  │
│      │   ┌─────────────┐   │      │                                         │
│      │   │ Boy Look    │   │      │                                         │
│      │   │  (Serif)    │   │      │   Cotton Crew Socks                     │
│      │   └─────────────┘   │      │   Size: 3-4y                            │
│      └─────────────────────┘      │                           £12.00   (●)  │
│    ┌───────────────────────────┐  │                                         │
│    │     STACKED CARDS         │  │   ═════════════════════════════════════ │
│    │   (tilted, dimmed)        │  │                                         │
│    └───────────────────────────┘  │   £82.00 → £73.80          Save £8.20   │
│                                   │                                         │
│                                   │   ┌───────────────────────────────────┐ │
│                                   │   │      Add Bundle to Bag            │ │
│                                   │   └───────────────────────────────────┘ │
│                                   │                                         │
│                                   │   Maximum 10% bundle discount applied   │
└───────────────────────────────────┴─────────────────────────────────────────┘
```

## 3D Stack Geometry

### Transform Properties (Side View)
```text
│
│ ← Active Card (z: 0, rotateX: 0°, scale: 1, opacity: 1)
│
│  ← Card +1 (z: -60px, rotateX: -6°, scale: 0.92, opacity: 0.5)
│
│   ← Card +2 (z: -120px, rotateX: -10°, scale: 0.84, opacity: 0.3)
│
```

| Position | translateZ | rotateX | scale | opacity | filter |
|----------|------------|---------|-------|---------|--------|
| Active   | 0px        | 0deg    | 1.0   | 1.0     | none   |
| +1 back  | -60px      | -6deg   | 0.92  | 0.5     | blur(1px) |
| +2 back  | -120px     | -10deg  | 0.84  | 0.3     | blur(2px) |

### Framer Motion Spring Physics
```text
Swipe Animation:
  stiffness: 350
  damping: 35
  
Auto-advance:
  stiffness: 250
  damping: 40
```

## Business Logic

### Data Structure
Three categories with 3 products each, using existing product images:

**Boy Look** (Total: £82.00)
| Product | Price | Size | Image |
|---------|-------|------|-------|
| Cozy Knit Cardigan | £42.00 | 3-4y | kids-cardigan.jpg |
| Comfort Fit Trousers | £28.00 | 3-4y | kids-trousers.jpg |
| Cotton Crew Socks | £12.00 | 3-4y | (placeholder) |

**Girl Look** (Total: £88.00)
| Product | Price | Size | Image |
|---------|-------|------|-------|
| Embroidered Linen Dress | £38.00 | 2-3y | baby-dress.jpg |
| Knit Cardigan | £36.00 | 2-3y | kids-cardigan.jpg |
| Hair Accessories Set | £14.00 | One Size | (placeholder) |

**Newborn Look** (Total: £107.00)
| Product | Price | Size | Image |
|---------|-------|------|-------|
| Organic Cotton Onesie | £24.00 | 0-3m | baby-onesie.jpg |
| Merino Wool Blanket | £65.00 | One Size | baby-blanket.jpg |
| Soft Knit Booties | £18.00 | 0-6m | (placeholder) |

### Tiered Discount System
| Items Selected | Discount | Incentive Message (Dry Tone, No Emoji) |
|----------------|----------|----------------------------------------|
| 0 | 0% | "Curate your look to unlock up to 10% discount" |
| 1 | 0% | "Add one more item to unlock a 5% bundle discount" |
| 2 | 5% | "Add a third item to increase your bundle discount to 10%" |
| 3 | 10% | "Maximum 10% bundle discount applied" |

### Pricing Display Format
```text
Original: £82.00 → Final: £73.80    Save £8.20
    ↑                    ↑              ↑
struck-through     forest green    savings text
```

## Interaction System

### Horizontal Swipe (Drag Gesture)
- Threshold: |offset.x| > 60px OR |velocity.x| > 200px/s
- Left swipe → Next category (infinite loop)
- Right swipe → Previous category (infinite loop)

### Auto-Advance
- Interval: 5000ms
- Behavior: Cycles to next category infinitely
- Pause: On hover or active drag
- Resume: After interaction ends

### Selection Toggle
- All 3 items selected by default when switching categories
- Custom minimal circle toggle (no browser checkboxes)
- Real-time price recalculation on every toggle

## Visual Styling

### Height & Layout Constraints (Desktop)
```text
Section max-height: 750px
Left column: sticky, top-24 (96px)
Card aspect-ratio: 4/5 (fixed, never distorts)
Two-column grid: equal heights synced
```

### Typography for Look Label (Inside Card)
- Font: Georgia, serif (fallback serif stack)
- Style: White text with subtle text-shadow
- Position: Bottom-left corner, inside the active card
- Example: "Boy Look" / "Girl Look" / "Newborn Look"

### Product Row Styling
- NO box borders, NO horizontal dividers
- Clean whitespace separation (py-5)
- Product name: font-medium text-foreground
- Size: text-sm text-muted-foreground
- Price: font-semibold text-forest

### Custom Selection Circle
```text
Unselected: (○) 24x24 circle with border-2 border-border
Selected:   (●) 24x24 circle with bg-forest, inner dot
```

### Button
- Full width Forest Green (bg-forest)
- Large padding (py-4)
- Text: "Add Bundle to Bag"
- Rounded corners (rounded-2xl)

## Mobile Layout

```text
┌─────────────────────────────────┐
│       Shop The Look             │
│                                 │
│   ┌───────────────────────┐     │
│   │                       │     │
│   │    3D CARD STACK      │     │
│   │    (simplified depth) │     │
│   │                       │     │
│   │   ┌─────────────┐     │     │
│   │   │ Girl Look   │     │     │
│   │   └─────────────┘     │     │
│   └───────────────────────┘     │
│                                 │
│         1 / 3                   │  ← Simple indicator
│                                 │
│   Product 1             £42 (●) │
│                                 │
│   Product 2             £28 (●) │
│                                 │
│   Product 3             £12 (●) │
│                                 │
│   £82.00 → £73.80  Save £8.20   │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Add Bundle to Bag     │   │
│   └─────────────────────────┘   │
│                                 │
│   Maximum discount applied      │
└─────────────────────────────────┘
```

- Single column layout
- Reduced 3D depth for performance
- Simple "1 / 3" text indicator (no tabs, no emojis)
- Horizontal swipe still functional

## Component Architecture

```text
ShopTheLookSection/
├── State
│   ├── activeIndex: number (0, 1, 2)
│   ├── selectedItems: Set<string>
│   ├── isHovered: boolean
│   └── isAddedToBag: boolean
│
├── 3D Stack Logic
│   ├── getCardTransform(index, activeIndex)
│   ├── handleDragEnd(event, info)
│   ├── cycleNext() / cyclePrev()
│   └── useEffect for 5s auto-advance interval
│
├── Pricing Engine
│   ├── calculateSubtotal(selectedItems)
│   ├── getDiscountPercent(count): 0 | 5 | 10
│   ├── calculateFinal(subtotal, discount)
│   └── getIncentiveMessage(count)
│
└── Inline Sub-components
    ├── Card3D (lifestyle image with transforms)
    ├── LookLabel (serif text inside card)
    ├── ProductRow (clean, borderless)
    ├── SelectionCircle (custom toggle)
    ├── PriceBlock (original/final/savings)
    └── IncentiveText (AnimatePresence)
```

## Animation Details

### Category Switch
1. Active card exits with spring (translateZ: -200, opacity: 0) - 0.4s
2. New card enters from depth (translateZ: 200 → 0) - 0.5s
3. Stack reorders behind with stagger
4. Product list fades out/in - 0.3s
5. Selection resets to all items selected

### Price Updates
- Smooth number transition with spring
- Savings text fades in with AnimatePresence

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/widgets/shop-the-look/ui/ShopTheLookSection.tsx` | CREATE | Self-contained widget (~400 lines) |
| `src/widgets/shop-the-look/index.ts` | CREATE | Barrel export |
| `src/pages/Index.tsx` | MODIFY | Add import + component after CategorySection |

## Technical Summary

### Dependencies (Already Installed)
- Framer Motion: 3D transforms, springs, drag gestures, AnimatePresence
- React: useState, useEffect, useCallback, useMemo
- Tailwind: All styling utilities

### Images Used (Existing Assets)
Lifestyle images for 3D stack:
- `@/assets/categories/boys-trousers.jpg` → Boy Look
- `@/assets/categories/girls-dresses.jpg` → Girl Look  
- `@/assets/categories/newborn.jpg` → Newborn Look

Product thumbnails:
- Reuse existing product images from `@/assets/products/`

### Key Design Principles
1. NO standard icons (Lucide, etc.)
2. NO emojis anywhere
3. NO generic helper text like "Swipe to explore"
4. Pure typography + whitespace + cream/beige palette
5. Forest Green for primary action button only
6. Sophisticated, dry tone for all copy

