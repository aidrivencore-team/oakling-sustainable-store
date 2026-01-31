import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Check } from 'lucide-react';
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

// Checkmark Selection Circle - Clean 24px with checkmark when selected
const SelectionCircle = ({ 
  selected, 
  onToggle 
}: { 
  selected: boolean; 
  onToggle: () => void;
}) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className="w-6 h-6 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center"
    style={{
      border: `1.5px solid ${selected ? 'hsl(var(--forest))' : 'hsl(var(--border))'}`,
      backgroundColor: selected ? 'hsl(var(--forest))' : 'transparent',
    }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.15 }}
    aria-label={selected ? 'Remove from bundle' : 'Add to bundle'}
  >
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// Product Row - Compact card with hover effect
const ProductRow = ({
  product,
  selected,
  onToggle,
}: {
  product: LookProduct;
  selected: boolean;
  onToggle: () => void;
}) => (
  <motion.div 
    className="flex items-center gap-3 p-3 rounded-xl bg-[#FDFBF7] cursor-pointer"
    whileHover={{ scale: 1.01, backgroundColor: '#FAF7F2' }}
    transition={{ duration: 0.15 }}
    onClick={onToggle}
  >
    <div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-foreground text-sm">{product.name}</p>
      <p className="text-xs text-muted-foreground">{product.size}</p>
    </div>
    <div className="flex items-center gap-3">
      <span className="font-semibold text-forest text-sm">{formatPrice(product.price)}</span>
      <SelectionCircle selected={selected} onToggle={onToggle} />
    </div>
  </motion.div>
);

// Price Block with savings and pulse animation
const PriceBlock = ({
  originalTotal,
  finalTotal,
  savings,
}: {
  originalTotal: number;
  finalTotal: number;
  savings: number;
}) => (
  <motion.div 
    className="flex items-center justify-between py-4"
    key={finalTotal}
    initial={{ scale: 1 }}
    animate={{ 
      scale: [1, 1.02, 1],
      transition: { duration: 0.3, ease: 'easeOut' }
    }}
  >
    <div className="flex items-baseline gap-2">
      {savings > 0 && (
        <span className="text-muted-foreground line-through text-base">
          {formatPrice(originalTotal)}
        </span>
      )}
      <motion.span
        key={`price-${finalTotal}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-forest"
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
          className="text-forest font-medium text-sm"
        >
          Save {formatPrice(savings)}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
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

  // Auto-advance timer - 3 seconds for faster pace
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LOOK_CATEGORIES.length);
    }, 3000);

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
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Shop The Look
          </h2>
          <p className="text-muted-foreground text-base">
            Curated ensembles styled with intention
          </p>
        </div>

        {/* Main Content - Compact grid alignment */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto items-stretch"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: 3D Card Stack with click-to-advance */}
          <div className="relative overflow-visible">
            <div 
              className="relative w-full overflow-visible cursor-pointer"
              style={{ 
                aspectRatio: '4/5',
                perspective: '1200px',
                perspectiveOrigin: 'center 40%',
                transformStyle: 'preserve-3d',
              }}
              onClick={cycleNext}
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
              <p className="text-center text-muted-foreground/60 mt-4 text-xs tracking-widest">
                {activeIndex + 1} / {LOOK_CATEGORIES.length}
              </p>
            )}
          </div>

          {/* Right Column: Product List - Grid layout for precise height sync */}
          <div 
            className="grid"
            style={{ 
              gridTemplateRows: '1fr auto',
              minHeight: isMobile ? 'auto' : 'calc((100vw - 8rem) * 0.35 * 1.25)', // Match 4:5 aspect ratio
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="contents"
              >
                {/* Product Rows - Compact cards with gaps */}
                <div className="flex flex-col justify-center gap-2">
                  {activeCategory.products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      selected={selectedItems.has(product.id)}
                      onToggle={() => toggleItem(product.id)}
                    />
                  ))}
                </div>

                {/* Bottom Section - Anchored precisely at bottom edge */}
                <div className="pt-4">
                  {/* Price Block */}
                  <PriceBlock
                    originalTotal={pricingData.originalTotal}
                    finalTotal={pricingData.finalTotal}
                    savings={pricingData.savings}
                  />

                  {/* Add to Bag Button */}
                  <motion.button
                    className="w-full py-3 rounded-xl text-base font-medium transition-colors"
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

                  {/* Incentive Message - More visible */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={pricingData.incentiveMessage}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-center text-neutral-600 text-sm mt-3 tracking-wide"
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
