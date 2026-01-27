import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/shared/types/product';
import { Badge } from '@/shared/ui';
import { formatPrice } from '@/shared/config/currency';

interface ProductCardProps {
  product: Product;
  currency?: 'GBP' | 'EUR';
}

export function ProductCard({ product, currency = 'GBP' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.article
      className="product-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-secondary">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.isSale && <Badge variant="sale">Sale</Badge>}
          {product.isEco && (
            <Badge variant="eco">
              <span className="text-xs">🌿</span> Eco
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft transition-colors hover:bg-background"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-accent text-accent' : 'text-foreground/60'
            }`}
          />
        </motion.button>

        {/* Quick Add Button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.25 }}
        >
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3 font-medium text-forest-foreground shadow-medium transition-all hover:shadow-elevated">
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1 flex items-center gap-2">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color.name}
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{product.colors.length - 3}
            </span>
          )}
        </div>

        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-semibold text-forest">
            {formatPrice(product.price, currency)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice, currency)}
            </span>
          )}
        </div>

        {product.sizes.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Sizes: {product.sizes.join(', ')}
          </p>
        )}
      </div>
    </motion.article>
  );
}
