import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Import lifestyle images for 3D stack
import boyLookImage from '@/assets/categories/boys-trousers.jpg';
import girlLookImage from '@/assets/categories/girls-dresses.jpg';
import newbornLookImage from '@/assets/categories/newborn.jpg';

// Import product thumbnails
import kidsCardigan from '@/assets/products/kids-cardigan.jpg';
import kidsTrousers from '@/assets/products/kids-trousers.jpg';
import babyDress from '@/assets/products/baby-dress.jpg';
import babyOnesie from '@/assets/products/baby-onesie.jpg';
import babyBlanket from '@/assets/products/baby-blanket.jpg';

// ============================================================================
// TYPES
// ============================================================================

interface LookProduct {
  id: string;
  name: string;
  price: number;
  size: string;
  thumbnail: string;
}

interface LookCategory {
  id: string;
  name: string;
  displayName: string;
  lifestyleImage: string;
  products: LookProduct[];
}

// ============================================================================
// DATA
// ============================================================================

const LOOK_CATEGORIES: LookCategory[] = [
  {
    id: 'boy',
    name: 'boy',
    displayName: 'Boy Look',
    lifestyleImage: boyLookImage,
    products: [
      { id: 'boy-1', name: 'Cozy Knit Cardigan', price: 42.00, size: '3-4y', thumbnail: kidsCardigan },
      { id: 'boy-2', name: 'Comfort Fit Trousers', price: 28.00, size: '3-4y', thumbnail: kidsTrousers },
      { id: 'boy-3', name: 'Cotton Crew Socks', price: 12.00, size: '3-4y', thumbnail: kidsCardigan },
    ],
  },
  {
    id: 'girl',
    name: 'girl',
    displayName: 'Girl Look',
    lifestyleImage: girlLookImage,
    products: [
      { id: 'girl-1', name: 'Embroidered Linen Dress', price: 38.00, size: '2-3y', thumbnail: babyDress },
      { id: 'girl-2', name: 'Knit Cardigan', price: 36.00, size: '2-3y', thumbnail: kidsCardigan },
      { id: 'girl-3', name: 'Hair Accessories Set', price: 14.00, size: 'One Size', thumbnail: babyDress },
    ],
  },
  {
    id: 'newborn',
    name: 'newborn',
    displayName: 'Newborn Look',
    lifestyleImage: newbornLookImage,
    products: [
      { id: 'newborn-1', name: 'Organic Cotton Onesie', price: 24.00, size: '0-3m', thumbnail: babyOnesie },
      { id: 'newborn-2', name: 'Merino Wool Blanket', price: 65.00, size: 'One Size', thumbnail: babyBlanket },
      { id: 'newborn-3', name: 'Soft Knit Booties', price: 18.00, size: '0-6m', thumbnail: babyOnesie },
    ],
  },
];

// ============================================================================
// PRICING ENGINE
// ============================================================================

const getDiscountPercent = (count: number): number => {
  if (count >= 3) return 10;
  if (count === 2) return 5;
  return 0;
};

const getIncentiveMessage = (count: number): string => {
  switch (count) {
    case 0:
      return 'Curate your look to unlock up to 10% discount';
    case 1:
      return 'Add one more item to unlock a 5% bundle discount';
    case 2:
      return 'Add a third item to increase your bundle discount to 10%';
    default:
      return 'Maximum 10% bundle discount applied';
  }
};

const formatPrice = (price: number): string => `£${price.toFixed(2)}`;

// ============================================================================
// 3D STACK TRANSFORMS - visible 3-layer deck (strict)
// ============================================================================

const getCardTransform = (index: number, activeIndex: number, total: number) => {
  // Calculate relative position from active card (circular)
  let relativeIndex = index - activeIndex;
  if (relativeIndex < 0) relativeIndex += total;

  // Strict 3-layer stack requirements
  if (relativeIndex === 0) {
    return {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 3,
    };
  }

  if (relativeIndex === 1) {
    return {
      y: -12,
      scale: 0.95,
      opacity: 0.6,
      filter: 'blur(1px)',
      zIndex: 2,
    };
  }

  if (relativeIndex === 2) {
    return {
      y: -24,
      scale: 0.9,
      opacity: 0.3,
      filter: 'blur(2px)',
      zIndex: 1,
    };
  }

  // Anything beyond the third card stays out of view (still in DOM if present)
  return {
    y: -36,
    scale: 0.88,
    opacity: 0,
    filter: 'blur(3px)',
    zIndex: 0,
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Custom Selection Circle - Ultra-minimal 1px stroke with smooth fill
const SelectionCircle = ({ 
  selected, 
  onToggle 
}: { 
  selected: boolean; 
  onToggle: () => void;
}) => (
  <motion.button
    onClick={onToggle}
    className="w-5 h-5 rounded-full flex-shrink-0 relative overflow-hidden"
    style={{
      boxShadow: `inset 0 0 0 1px ${selected ? 'hsl(var(--forest))' : 'hsl(var(--border))'}`,
      backgroundColor: 'transparent',
    }}
    whileTap={{ scale: 0.92 }}
    transition={{ duration: 0.15 }}
    aria-label={selected ? 'Remove from bundle' : 'Add to bundle'}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={false}
      animate={{
        scale: selected ? 1 : 0,
        opacity: selected ? 1 : 0,
      }}
      style={{ backgroundColor: 'hsl(var(--forest))' }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30,
      }}
    />
  </motion.button>
);

// Product Row (clean, consistent whitespace)
const ProductRow = ({
  product,
  selected,
  onToggle,
}: {
  product: LookProduct;
  selected: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center gap-4 py-6">
    <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-foreground">{product.name}</p>
      <p className="text-sm text-muted-foreground">{product.size}</p>
    </div>
    <div className="flex items-center gap-4">
      <span className="font-semibold text-forest">{formatPrice(product.price)}</span>
      <SelectionCircle selected={selected} onToggle={onToggle} />
    </div>
  </div>
);

// Price Block with savings
const PriceBlock = ({
  originalTotal,
  finalTotal,
  savings,
}: {
  originalTotal: number;
  finalTotal: number;
  savings: number;
}) => (
  <div className="flex items-center justify-between py-6">
    <div className="flex items-baseline gap-3">
      {savings > 0 && (
        <span className="text-muted-foreground line-through text-lg">
          {formatPrice(originalTotal)}
        </span>
      )}
      <motion.span
        key={finalTotal}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-forest"
      >
        {formatPrice(finalTotal)}
      </motion.span>
    </div>
    <AnimatePresence mode="wait">
      {savings > 0 && (
        <motion.span
          key={savings}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="text-forest font-medium"
        >
          Save {formatPrice(savings)}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

// 3D Card Component - Visible stacked deck (no active shadow)
const Card3D = ({
  category,
  isActive,
  transform,
  onDragEnd,
}: {
  category: LookCategory;
  isActive: boolean;
  transform: ReturnType<typeof getCardTransform>;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) => (
  <motion.div
    className="absolute inset-0 rounded-3xl overflow-hidden"
    style={{
      zIndex: transform.zIndex,
      transformOrigin: 'center bottom',
      backfaceVisibility: 'hidden',
    }}
    initial={false}
    animate={{
      y: transform.y,
      scale: transform.scale,
      opacity: transform.opacity,
      filter: transform.filter,
    }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 1,
    }}
    drag={isActive ? 'x' : false}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.15}
    onDragEnd={isActive ? onDragEnd : undefined}
    whileDrag={{ cursor: 'grabbing' }}
  >
    <img
      src={category.lifestyleImage}
      alt={category.displayName}
      className="w-full h-full object-cover pointer-events-none select-none"
      draggable={false}
    />
    {/* Subtle vignette for depth (kept minimal; depth comes from the stack) */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    
    {/* Look Label - Premium Serif with refined positioning */}
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="absolute bottom-10 left-10"
      >
        <span
          className="text-white text-xl font-normal tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            letterSpacing: '0.2em',
          }}
        >
          {category.displayName}
        </span>
      </motion.div>
    )}
  </motion.div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ShopTheLookSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const activeCategory = LOOK_CATEGORIES[activeIndex];

  // Reset selections when category changes
  useEffect(() => {
    const allProductIds = activeCategory.products.map((p) => p.id);
    setSelectedItems(new Set(allProductIds));
  }, [activeIndex, activeCategory.products]);

  // Auto-advance timer
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LOOK_CATEGORIES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Navigation
  const cycleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % LOOK_CATEGORIES.length);
  }, []);

  const cyclePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + LOOK_CATEGORIES.length) % LOOK_CATEGORIES.length);
  }, []);

  // Drag handler
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 60;
      const velocity = 200;

      if (info.offset.x < -threshold || info.velocity.x < -velocity) {
        cycleNext();
      } else if (info.offset.x > threshold || info.velocity.x > velocity) {
        cyclePrev();
      }
    },
    [cycleNext, cyclePrev]
  );

  // Toggle selection
  const toggleItem = useCallback((productId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  // Pricing calculations
  const pricingData = useMemo(() => {
    const selectedProducts = activeCategory.products.filter((p) =>
      selectedItems.has(p.id)
    );
    const subtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
    const discountPercent = getDiscountPercent(selectedProducts.length);
    const discountAmount = subtotal * (discountPercent / 100);
    const finalTotal = subtotal - discountAmount;
    const incentiveMessage = getIncentiveMessage(selectedProducts.length);

    return {
      originalTotal: subtotal,
      finalTotal,
      savings: discountAmount,
      discountPercent,
      incentiveMessage,
      selectedCount: selectedProducts.length,
    };
  }, [activeCategory.products, selectedItems]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Shop The Look
          </h2>
          <p className="text-muted-foreground text-lg">
            Curated ensembles styled with intention
          </p>
        </div>

        {/* Main Content - Precise grid alignment */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: 3D Card Stack with perspective container */}
          <div className="relative overflow-visible">
            <div 
              className="relative w-full overflow-visible"
              style={{ 
                aspectRatio: '4/5',
                perspective: '1200px',
                perspectiveOrigin: 'center 40%',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Render cards in reverse order so active is on top */}
              {LOOK_CATEGORIES.map((category, index) => (
                <Card3D
                  key={category.id}
                  category={category}
                  isActive={index === activeIndex}
                  transform={getCardTransform(index, activeIndex, LOOK_CATEGORIES.length)}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>

            {/* Mobile: Minimal indicator */}
            {isMobile && (
              <p className="text-center text-muted-foreground/60 mt-6 text-sm tracking-widest">
                {activeIndex + 1} / {LOOK_CATEGORIES.length}
              </p>
            )}
          </div>

          {/* Right Column: Product List - Grid layout for precise height sync */}
          <div 
            className="grid"
            style={{ 
              gridTemplateRows: '1fr auto',
              minHeight: isMobile ? 'auto' : 'calc((100vw - 8rem) * 0.4 * 1.25)', // Match 4:5 aspect ratio
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="contents"
              >
                {/* Product Rows - Expands to fill available space */}
                <div className="flex flex-col justify-center">
                  {activeCategory.products.map((product, idx) => (
                    <div key={product.id}>
                      <ProductRow
                        product={product}
                        selected={selectedItems.has(product.id)}
                        onToggle={() => toggleItem(product.id)}
                      />
                      {idx < activeCategory.products.length - 1 && (
                        <div className="h-px bg-border/20" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Section - Anchored precisely at bottom edge */}
                <div className="pt-6">
                  {/* Price Block */}
                  <PriceBlock
                    originalTotal={pricingData.originalTotal}
                    finalTotal={pricingData.finalTotal}
                    savings={pricingData.savings}
                  />

                  {/* Add to Bag Button */}
                  <motion.button
                    className="w-full py-4 rounded-2xl text-lg font-medium transition-colors"
                    style={{
                      backgroundColor: 'hsl(var(--forest))',
                      color: 'hsl(var(--forest-foreground))',
                    }}
                    disabled={pricingData.selectedCount === 0}
                    whileHover={{ opacity: 0.92 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add Bundle to Bag
                  </motion.button>

                  {/* Incentive Message */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={pricingData.incentiveMessage}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-center text-muted-foreground/70 text-sm mt-5 tracking-wide"
                    >
                      {pricingData.incentiveMessage}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopTheLookSection;
