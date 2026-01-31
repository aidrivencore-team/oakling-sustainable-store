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
// 3D STACK TRANSFORMS
// ============================================================================

const getCardTransform = (index: number, activeIndex: number, total: number) => {
  // Calculate relative position from active card
  let relativeIndex = index - activeIndex;
  if (relativeIndex < 0) relativeIndex += total;
  
  if (relativeIndex === 0) {
    // Active card
    return {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: total,
    };
  } else if (relativeIndex === 1) {
    // First behind - peeks above the active card
    return {
      y: -16,
      scale: 0.94,
      opacity: 0.55,
      filter: 'blur(1px)',
      zIndex: total - 1,
    };
  } else {
    // Second+ behind - peeks further above
    return {
      y: -28,
      scale: 0.88,
      opacity: 0.35,
      filter: 'blur(2px)',
      zIndex: total - 2,
    };
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Custom Selection Circle - Premium 1px stroke with animated fill
const SelectionCircle = ({ 
  selected, 
  onToggle 
}: { 
  selected: boolean; 
  onToggle: () => void;
}) => (
  <motion.button
    onClick={onToggle}
    className="w-[22px] h-[22px] rounded-full flex-shrink-0"
    style={{
      border: '1px solid',
      borderColor: selected ? 'hsl(var(--forest))' : 'hsl(var(--border))',
    }}
    animate={{
      backgroundColor: selected ? 'hsl(var(--forest))' : 'transparent',
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    aria-label={selected ? 'Remove from bundle' : 'Add to bundle'}
  />
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

// 3D Card Component
const Card3D = ({
  category,
  isActive,
  transform,
  onDragEnd,
  isMobile,
}: {
  category: LookCategory;
  isActive: boolean;
  transform: ReturnType<typeof getCardTransform>;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isMobile: boolean;
}) => (
  <motion.div
    className="absolute inset-0 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
    style={{
      zIndex: transform.zIndex,
      transformStyle: 'preserve-3d',
      perspective: 1000,
    }}
  animate={{
      y: transform.y,
      scale: transform.scale,
      opacity: transform.opacity,
      filter: transform.filter,
    }}
    transition={{
      type: 'spring',
      stiffness: 350,
      damping: 35,
    }}
    drag={isActive ? 'x' : false}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.2}
    onDragEnd={isActive ? onDragEnd : undefined}
  >
    <img
      src={category.lifestyleImage}
      alt={category.displayName}
      className="w-full h-full object-cover"
      draggable={false}
    />
    {/* Dark gradient overlay for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    
    {/* Look Label - Serif font inside card with refined positioning */}
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-8 left-8"
      >
        <span
          className="text-white text-xl font-normal tracking-[0.15em]"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
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

        {/* Main Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch"
          style={{ maxHeight: isMobile ? 'none' : '750px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: 3D Card Stack */}
          <div className={`${isMobile ? '' : 'sticky top-24'}`}>
            <div 
              className="relative w-full"
              style={{ 
                aspectRatio: '4/5',
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {LOOK_CATEGORIES.map((category, index) => (
                <Card3D
                  key={category.id}
                  category={category}
                  isActive={index === activeIndex}
                  transform={getCardTransform(index, activeIndex, LOOK_CATEGORIES.length)}
                  onDragEnd={handleDragEnd}
                  isMobile={isMobile}
                />
              ))}
            </div>

            {/* Mobile: Simple Indicator */}
            {isMobile && (
              <p className="text-center text-muted-foreground mt-4">
                {activeIndex + 1} / {LOOK_CATEGORIES.length}
              </p>
            )}
          </div>

          {/* Right Column: Product List - Height synced with left column */}
          <div className="flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 h-full"
              >
                {/* Product Rows - Takes available space */}
                <div className="flex-1">
                  {activeCategory.products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      selected={selectedItems.has(product.id)}
                      onToggle={() => toggleItem(product.id)}
                    />
                  ))}
                </div>

                {/* Bottom Section - Anchored at bottom */}
                <div className="mt-auto">
                  {/* Price Block */}
                  <PriceBlock
                    originalTotal={pricingData.originalTotal}
                    finalTotal={pricingData.finalTotal}
                    savings={pricingData.savings}
                  />

                  {/* Add to Bag Button */}
                  <button
                    className="w-full py-4 rounded-2xl text-lg font-medium transition-all duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: 'hsl(var(--forest))',
                      color: 'hsl(var(--forest-foreground))',
                    }}
                    disabled={pricingData.selectedCount === 0}
                  >
                    Add Bundle to Bag
                  </button>

                  {/* Incentive Message */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={pricingData.incentiveMessage}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-center text-muted-foreground text-sm mt-4"
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
