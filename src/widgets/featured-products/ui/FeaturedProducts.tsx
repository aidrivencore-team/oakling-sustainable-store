import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { t } from '@/shared/config/i18n';
import { Currency } from '@/shared/config/currency';
import { mockProducts } from '@/entities/product';
import { ProductCard } from '@/features/product-card';
import { Button } from '@/shared/ui';

interface FeaturedProductsProps {
  currency?: Currency;
}

export function FeaturedProducts({ currency = 'GBP' }: FeaturedProductsProps) {
  // Show only 4 featured products
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <section className="bg-warm-gradient py-20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              {t('featured.title')}
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              {t('featured.subtitle')}
            </p>
          </div>
          <Button variant="soft" className="hidden md:flex">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="soft" className="w-full">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
