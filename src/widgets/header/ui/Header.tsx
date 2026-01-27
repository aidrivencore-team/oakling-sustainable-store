import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { t, Locale, locales, loadMessages } from '@/shared/config/i18n';
import { Currency, currencies } from '@/shared/config/currency';

interface HeaderProps {
  cartItemCount?: number;
  onLocaleChange?: (locale: Locale) => void;
  onCurrencyChange?: (currency: Currency) => void;
  currentLocale?: Locale;
  currentCurrency?: Currency;
}

export function Header({
  cartItemCount = 0,
  onLocaleChange,
  onCurrencyChange,
  currentLocale = 'en',
  currentCurrency = 'GBP',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.shop'), href: '/shop' },
    { label: t('nav.baby'), href: '/baby' },
    { label: t('nav.kids'), href: '/kids' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.sustainability'), href: '/sustainability' },
  ];

  const handleLocaleChange = (locale: Locale) => {
    loadMessages(locale);
    onLocaleChange?.(locale);
    setIsSettingsOpen(false);
  };

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        {/* Top Bar */}
        <div className="hidden border-b border-border/50 py-2 text-xs text-muted-foreground md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-3 w-3 text-primary" />
              <span>Free carbon-neutral shipping on orders over £50</span>
            </div>
            <div className="relative">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                {locales[currentLocale]} / {currencies[currentCurrency].symbol}
                <ChevronDown className="h-3 w-3" />
              </button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-background p-3 shadow-elevated"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="mb-3">
                      <p className="mb-2 text-xs font-medium text-foreground">Language</p>
                      <div className="space-y-1">
                        {(Object.keys(locales) as Locale[]).map((locale) => (
                          <button
                            key={locale}
                            className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                              currentLocale === locale
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                            onClick={() => handleLocaleChange(locale)}
                          >
                            {locales[locale]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-foreground">Currency</p>
                      <div className="space-y-1">
                        {(Object.keys(currencies) as Currency[]).map((curr) => (
                          <button
                            key={curr}
                            className={`block w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                              currentCurrency === curr
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                            onClick={() => {
                              onCurrencyChange?.(curr);
                              setIsSettingsOpen(false);
                            }}
                          >
                            {currencies[curr].symbol} {curr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex h-18 items-center justify-between px-4 py-4 md:px-0">
          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-secondary md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest">
              <Leaf className="h-5 w-5 text-forest-foreground" />
            </div>
            <span className="text-xl font-semibold text-forest">Oakling</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-sm">
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden h-10 w-10 items-center justify-center rounded-xl hover:bg-secondary md:flex">
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden h-10 w-10 items-center justify-center rounded-xl hover:bg-secondary md:flex">
              <User className="h-5 w-5" />
            </button>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-secondary">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-xs font-medium text-forest-foreground">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[72px] bg-background z-40 md:hidden"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-6">
              <div className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-foreground hover:text-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="mb-3 text-sm font-medium text-muted-foreground">Language & Currency</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(locales) as Locale[]).map((locale) => (
                    <button
                      key={locale}
                      className={`rounded-full px-4 py-2 text-sm ${
                        currentLocale === locale
                          ? 'bg-forest text-forest-foreground'
                          : 'bg-secondary'
                      }`}
                      onClick={() => handleLocaleChange(locale)}
                    >
                      {locales[locale]}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(currencies) as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      className={`rounded-full px-4 py-2 text-sm ${
                        currentCurrency === curr
                          ? 'bg-forest text-forest-foreground'
                          : 'bg-secondary'
                      }`}
                      onClick={() => onCurrencyChange?.(curr)}
                    >
                      {currencies[curr].symbol} {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
