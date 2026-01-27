import { useState, useEffect } from 'react';
import { Leaf, Menu, X, Search, User, ShoppingBag, ChevronDown } from 'lucide-react';
import styles from './Header.module.scss';

export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuContent?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
}

export interface HeaderProps {
  brandName?: string;
  navItems?: NavItem[];
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onAccountClick?: () => void;
}

const defaultNavItems: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    hasMegaMenu: true,
    megaMenuContent: [
      {
        title: 'Categories',
        links: [
          { label: 'New Arrivals', href: '/shop/new' },
          { label: 'Best Sellers', href: '/shop/best-sellers' },
          { label: 'Sale', href: '/shop/sale' },
        ],
      },
      {
        title: 'Collections',
        links: [
          { label: 'Spring Collection', href: '/shop/spring' },
          { label: 'Organic Basics', href: '/shop/organic' },
          { label: 'Cozy Essentials', href: '/shop/cozy' },
        ],
      },
      {
        title: 'Shop By',
        links: [
          { label: 'Age', href: '/shop/age' },
          { label: 'Size', href: '/shop/size' },
          { label: 'Material', href: '/shop/material' },
        ],
      },
    ],
  },
  {
    label: 'Baby',
    href: '/baby',
    hasMegaMenu: true,
    megaMenuContent: [
      {
        title: 'Clothing',
        links: [
          { label: 'Bodysuits', href: '/baby/bodysuits' },
          { label: 'Sleepwear', href: '/baby/sleepwear' },
          { label: 'Outerwear', href: '/baby/outerwear' },
        ],
      },
      {
        title: 'Accessories',
        links: [
          { label: 'Blankets', href: '/baby/blankets' },
          { label: 'Hats & Mittens', href: '/baby/hats' },
          { label: 'Bibs', href: '/baby/bibs' },
        ],
      },
      {
        title: 'Shop By Age',
        links: [
          { label: '0-3 Months', href: '/baby/0-3m' },
          { label: '3-6 Months', href: '/baby/3-6m' },
          { label: '6-12 Months', href: '/baby/6-12m' },
        ],
      },
    ],
  },
  {
    label: 'Kids',
    href: '/kids',
    hasMegaMenu: true,
    megaMenuContent: [
      {
        title: 'Girls',
        links: [
          { label: 'Dresses', href: '/kids/girls/dresses' },
          { label: 'Tops', href: '/kids/girls/tops' },
          { label: 'Bottoms', href: '/kids/girls/bottoms' },
        ],
      },
      {
        title: 'Boys',
        links: [
          { label: 'Shirts', href: '/kids/boys/shirts' },
          { label: 'Trousers', href: '/kids/boys/trousers' },
          { label: 'Outerwear', href: '/kids/boys/outerwear' },
        ],
      },
      {
        title: 'Shop By Age',
        links: [
          { label: '1-2 Years', href: '/kids/1-2y' },
          { label: '2-4 Years', href: '/kids/2-4y' },
          { label: '4-6 Years', href: '/kids/4-6y' },
        ],
      },
    ],
  },
  { label: 'Our Story', href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
];

export function Header({
  brandName = 'Oakling',
  navItems = defaultNavItems,
  cartItemCount = 0,
  onCartClick,
  onSearchClick,
  onAccountClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavItemHover = (label: string, hasMegaMenu?: boolean) => {
    if (hasMegaMenu) {
      setOpenMegaMenu(label);
    }
  };

  const handleNavItemLeave = () => {
    setOpenMegaMenu(null);
  };

  const toggleMobileSubMenu = (label: string) => {
    setOpenMobileSubMenu(openMobileSubMenu === label ? null : label);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.ecoMessage}>
            <Leaf />
            <span>Free carbon-neutral shipping on orders over £50</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.container}>
        <nav className={styles.nav}>
          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <a href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Leaf />
            </div>
            <span className={styles.logoText}>{brandName}</span>
          </a>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => handleNavItemHover(item.label, item.hasMegaMenu)}
                onMouseLeave={handleNavItemLeave}
              >
                {item.hasMegaMenu ? (
                  <button
                    className={styles.navLink}
                    data-open={openMegaMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown />
                  </button>
                ) : (
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                )}

                {/* Mega Menu */}
                {item.hasMegaMenu && item.megaMenuContent && (
                  <div
                    className={`${styles.megaMenu} ${
                      openMegaMenu === item.label ? styles.open : ''
                    }`}
                  >
                    <div className={styles.megaMenuGrid}>
                      {item.megaMenuContent.map((column) => (
                        <div key={column.title} className={styles.megaMenuColumn}>
                          <h4>{column.title}</h4>
                          <ul>
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <a href={link.href} className={styles.megaMenuLink}>
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${styles.hideOnMobile}`}
              onClick={onSearchClick}
              aria-label="Search"
            >
              <Search />
            </button>
            <button
              className={`${styles.actionBtn} ${styles.hideOnMobile}`}
              onClick={onAccountClick}
              aria-label="Account"
            >
              <User />
            </button>
            <button
              className={styles.actionBtn}
              onClick={onCartClick}
              aria-label="Cart"
            >
              <ShoppingBag />
              {cartItemCount > 0 && (
                <span className={styles.cartBadge}>{cartItemCount}</span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileNavList}>
            {navItems.map((item) => (
              <div key={item.label} className={styles.mobileNavItem}>
                {item.hasMegaMenu ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubMenu(item.label)}
                      data-open={openMobileSubMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown />
                    </button>
                    {item.megaMenuContent && (
                      <div
                        className={`${styles.mobileSubMenu} ${
                          openMobileSubMenu === item.label ? styles.open : ''
                        }`}
                      >
                        {item.megaMenuContent.map((column) => (
                          <div key={column.title}>
                            {column.links.map((link) => (
                              <a key={link.href} href={link.href}>
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </div>
            ))}
          </div>

          <div className={styles.mobileSettings}>
            <h3>Quick Links</h3>
            <div className={styles.settingsPills}>
              <button className={styles.settingPill} onClick={onSearchClick}>
                Search
              </button>
              <button className={styles.settingPill} onClick={onAccountClick}>
                Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
