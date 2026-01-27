import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { t } from '@/shared/config/i18n';
import { Button } from '@/shared/ui';
import heroImage from '@/assets/hero-background.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Child in meadow"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-screen items-center px-4 pt-32 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-sm font-medium text-forest"
          >
            <Sparkles className="h-4 w-4" />
            New Spring Collection 2025
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero.title')}
            <span className="block text-gradient">{t('hero.titleAccent')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="hero" size="lg">
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="heroSecondary" size="lg">
              {t('hero.secondary')}
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs">🌱</span>
              <span>100% Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs">🚚</span>
              <span>Free Shipping £50+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs">♻️</span>
              <span>Carbon Neutral</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-12 w-6 items-start justify-center rounded-full border-2 border-foreground/20 p-1">
          <motion.div
            className="h-2 w-1.5 rounded-full bg-foreground/40"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
