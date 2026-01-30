import { motion } from 'framer-motion';
import { t } from '@/shared/config/i18n';

// Category images
import newbornImg from '@/assets/categories/newborn.jpg';
import girlsDressesImg from '@/assets/categories/girls-dresses.jpg';
import boysTrousersImg from '@/assets/categories/boys-trousers.jpg';
import coatsJacketsImg from '@/assets/categories/coats-jackets.jpg';
import accessoriesImg from '@/assets/categories/accessories.jpg';

interface Category {
  id: string;
  label: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  { id: 'newborn', label: 'Newborn', image: newbornImg, href: '/newborn' },
  { id: 'girls-dresses', label: 'Girls Dresses', image: girlsDressesImg, href: '/girls/dresses' },
  { id: 'boys-trousers', label: 'Boys Trousers', image: boysTrousersImg, href: '/boys/trousers' },
  { id: 'coats-jackets', label: 'Coats & Jackets', image: coatsJacketsImg, href: '/coats-jackets' },
  { id: 'accessories', label: 'Accessories', image: accessoriesImg, href: '/accessories' },
];

export function CategorySection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
            {t('categories.title') || 'Shop by Category'}
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.a
      href={category.href}
      className="group relative block cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Card Container with Morphing Border Radius */}
      <motion.div
        className="relative overflow-hidden bg-card shadow-soft"
        style={{
          borderRadius: '1.25rem',
          aspectRatio: '3/4',
        }}
        whileHover={{
          borderRadius: '2.5rem',
          boxShadow: '0 20px 50px -10px hsl(var(--forest) / 0.15)',
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Image Container */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={category.image}
            alt={category.label}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Shimmer/Living Effect Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(var(--background) / 0.1) 45%, hsl(var(--background) / 0.3) 50%, hsl(var(--background) / 0.1) 55%, transparent 60%)',
            backgroundSize: '300% 100%',
            animation: 'shimmer 2s infinite linear',
          }}
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Soft Glow Border on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: 'inherit',
            boxShadow: 'inset 0 0 0 2px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.1)',
          }}
        />

        {/* Category Label */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <motion.h3
            className="text-base font-semibold text-background md:text-lg text-center"
            style={{ textShadow: '0 2px 10px hsl(var(--foreground) / 0.3)' }}
          >
            {category.label}
          </motion.h3>

          {/* Shop Now Indicator */}
          <motion.span
            className="block mt-1.5 text-xs text-background/80 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            Shop Now →
          </motion.span>
        </div>
      </motion.div>
    </motion.a>
  );
}
