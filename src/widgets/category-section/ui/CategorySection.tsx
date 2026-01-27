import { motion } from 'framer-motion';
import { Baby, Shirt, Heart, Gift } from 'lucide-react';
import { t } from '@/shared/config/i18n';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

const categories: Category[] = [
  { id: 'baby', label: 'Baby', icon: Baby, href: '/baby', color: 'from-accent/40 to-accent/20' },
  { id: 'toddler', label: 'Toddler', icon: Shirt, href: '/toddler', color: 'from-primary/40 to-primary/20' },
  { id: 'kids', label: 'Kids', icon: Heart, href: '/kids', color: 'from-forest/30 to-forest/10' },
  { id: 'accessories', label: 'Accessories', icon: Gift, href: '/accessories', color: 'from-warm-dark to-warm' },
];

export function CategorySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            {t('categories.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} transition-all duration-300 group-hover:scale-105`} />
              
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/80 shadow-soft backdrop-blur-sm transition-all duration-300 group-hover:shadow-medium group-hover:scale-110"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon className="h-7 w-7 text-forest" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t(`categories.${category.id}`) || category.label}
                </h3>
                <span className="mt-2 text-sm text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Shop Now →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
