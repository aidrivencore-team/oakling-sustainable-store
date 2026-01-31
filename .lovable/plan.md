
# Shop The Look - 4 Refinements

## Overview
Polish the existing ShopTheLookSection component with four targeted refinements to achieve the bespoke "Quiet Luxury" aesthetic from the original wireframes.

---

## Refinement 1: Visual 3D Depth (Visible Stacked Cards)

### Issue
The 3D stack currently appears flat because the Framer Motion `z` property doesn't translate directly to CSS `translateZ`. The perspective container needs proper 3D context.

### Solution
Modify the `Card3D` component and container to use explicit `translateZ` via style transforms:

```text
Container changes:
- Add perspective: 1200px on the stack container
- Ensure transformStyle: 'preserve-3d' propagates correctly

Card3D animate changes:
- Use translateY for vertical offset (cards stack upward behind)
- Add explicit y offset: +12px for +1 card, +20px for +2 card
- This makes stacked cards visibly peek behind the active one
```

### Updated Transform Values
| Position | translateY | scale | opacity | blur |
|----------|------------|-------|---------|------|
| Active   | 0px        | 1.0   | 1.0     | 0px  |
| +1 back  | -16px      | 0.94  | 0.55    | 1px  |
| +2 back  | -28px      | 0.88  | 0.35    | 2px  |

The key is using negative `translateY` (moving up) so cards visually "peek" behind the active one, creating the stacked deck illusion.

---

## Refinement 2: Perfect Height Sync

### Issue
Right column is shorter than the left 3D stack, leaving a visual gap.

### Solution
Restructure the right column layout:

```text
Before:
<div className="flex flex-col">
  <motion.div className="flex-1">
    <div>Products</div>
    <div>Price Block</div>
    <button>Add to Bag</button>
    <p>Incentive</p>
  </motion.div>
</div>

After:
<div className="flex flex-col h-full">
  <motion.div className="flex flex-col flex-1">
    <div className="flex-1">Products</div>  ← Takes remaining space
    <div>Price Block</div>
    <button>Add to Bag</button>  ← Anchored at bottom
    <p>Incentive</p>
  </motion.div>
</div>
```

Also update the grid container to use `items-stretch` for equal column heights.

---

## Refinement 3: High-End Custom Toggles

### Current State
The SelectionCircle uses `border-2` (2px) which feels heavy.

### Updated Design
Minimal 1px stroke with smooth animated Forest Green fill:

```text
Visual states:
- Unselected: 22x22 circle, 1px border (border-border), transparent fill
- Selected: 22x22 circle, 1px border (forest), bg-forest fill with scale animation
- Inner indicator: Remove the inner dot, use full fill instead

Animation:
- Use Framer Motion for smooth scale-in of background
- Transition: 200ms ease-out for border color + background
```

```tsx
<motion.button
  className="w-[22px] h-[22px] rounded-full flex-shrink-0"
  style={{
    border: '1px solid',
    borderColor: selected ? 'hsl(var(--forest))' : 'hsl(var(--border))',
  }}
  animate={{
    backgroundColor: selected ? 'hsl(var(--forest))' : 'transparent',
    scale: selected ? 1 : 1,
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
/>
```

Add a subtle checkmark or keep it as a solid fill for the selected state.

---

## Refinement 4: Label & Spacing Refinement

### Label Positioning
Move the serif label further from edges and add letter-spacing:

```text
Before: bottom-6 left-6 (24px from edges)
After:  bottom-8 left-8 (32px from edges)

Letter-spacing: tracking-[0.15em] for sophisticated appearance
```

### Product Row Spacing
Replace border reliance with consistent whitespace:

```text
Before: py-5 (no explicit gap between rows)
After:  py-6 with explicit spacing between rows

Remove: border-t border-border/30 from price block
Add: mt-auto to push price block to bottom of flex container
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/widgets/shop-the-look/ui/ShopTheLookSection.tsx` | All 4 refinements in single file |

---

## Technical Changes Summary

### 1. getCardTransform function (lines 106-142)
- Add `y` offset for vertical stacking visibility
- Adjust scale and opacity values

### 2. SelectionCircle component (lines 148-169)
- Change `border-2` to `border` (1px)
- Add motion.button with animate prop
- Remove inner dot, use full fill
- Add whileTap micro-interaction

### 3. Card3D component (lines 242-309)
- Update label position from `bottom-6 left-6` to `bottom-8 left-8`
- Add `tracking-[0.15em]` to the serif span

### 4. Main grid container (lines 411-417)
- Add `items-stretch` to grid
- Update right column structure for height sync

### 5. Right column layout (lines 448-506)
- Add `h-full` to outer container
- Restructure with flex-1 on products container
- Remove border-t, use mt-auto for bottom anchoring

---

## Expected Visual Result

```text
┌───────────────────────────────────┬─────────────────────────────────────────┐
│                                   │                                         │
│      ┌─────────────────────┐      │   Cozy Knit Cardigan                    │
│    ┌─│                     │──┐   │   Size: 3-4y              £42.00   (○)  │
│  ┌─│ │   ACTIVE CARD       │ │─┐  │                                         │
│  │ │ │                     │ │ │  │                                         │
│  │ │ │                     │ │ │  │   Comfort Fit Trousers                  │
│  │ │ │   ┌─────────────┐   │ │ │  │   Size: 3-4y              £28.00   (●)  │ 
│  │ │ │   │  Boy Look   │   │ │ │  │                                         │
│  │ └─│   └─────────────┘   │─┘ │  │                                         │
│  │   └─────────────────────┘   │  │   Cotton Crew Socks                     │
│  └─────────────────────────────┘  │   Size: 3-4y              £12.00   (●)  │
│    ↑                              │                                         │
│  Visible stacked cards behind     │              (flexible space)           │
│                                   │                                         │
│                                   │   £82.00 → £73.80          Save £8.20   │
│                                   │                                         │
│                                   │   ┌───────────────────────────────────┐ │
│                                   │   │      Add Bundle to Bag            │ │
│                                   │   └───────────────────────────────────┘ │
│                                   │                                         │
│                                   │   Maximum 10% bundle discount applied   │
└───────────────────────────────────┴─────────────────────────────────────────┘
                                                    ↑
                                    Button anchored at bottom, matching heights
```
