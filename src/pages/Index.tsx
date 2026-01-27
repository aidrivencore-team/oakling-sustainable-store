import { useState } from 'react';
import { Header } from '@/widgets/header';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/widgets/category-section';
import { FeaturedProducts } from '@/widgets/featured-products';
import { SustainabilitySection } from '@/widgets/sustainability-section';
import { Footer } from '@/widgets/footer';
import { Locale } from '@/shared/config/i18n';
import { Currency } from '@/shared/config/currency';
import heroImage from '@/assets/hero-background.jpg';

const HomePage = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const [currency, setCurrency] = useState<Currency>('GBP');

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={2}
        currentLocale={locale}
        currentCurrency={currency}
        onLocaleChange={setLocale}
        onCurrencyChange={setCurrency}
      />
      
      <main>
        <HeroSection
          title="Sustainable Fashion for"
          titleAccent=" Little Ones"
          subtitle="Discover our collection of organic, eco-friendly clothing designed with love for your children and the planet."
          backgroundImage={heroImage}
          ctaButtons={[
            { label: 'Shop Baby', href: '/shop/baby', variant: 'primary' },
            { label: 'Shop Girls', href: '/shop/girls', variant: 'secondary' },
            { label: 'Shop Boys', href: '/shop/boys', variant: 'secondary' },
          ]}
        />
        <CategorySection />
        <FeaturedProducts currency={currency} />
        <SustainabilitySection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
