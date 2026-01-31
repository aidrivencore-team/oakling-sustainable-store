import { useState } from 'react';
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { CategorySection } from '@/widgets/category-section';
import { ShopTheLookSection } from '@/widgets/shop-the-look';
import { FeaturedProducts } from '@/widgets/featured-products';
import { SustainabilitySection } from '@/widgets/sustainability-section';
import { Footer } from '@/widgets/footer';
import { Locale } from '@/shared/config/i18n';
import { Currency } from '@/shared/config/currency';

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
        <HeroSection />
        <CategorySection />
        <ShopTheLookSection />
        <FeaturedProducts currency={currency} />
        <SustainabilitySection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
