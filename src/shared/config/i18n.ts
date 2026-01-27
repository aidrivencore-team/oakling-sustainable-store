import { i18n } from '@lingui/core';

export const locales = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
};

export const defaultLocale = 'en';

export type Locale = keyof typeof locales;

// Placeholder messages - in production these would be loaded from compiled catalogs
const messages: Record<Locale, Record<string, string>> = {
  en: {
    'nav.shop': 'Shop',
    'nav.baby': 'Baby',
    'nav.kids': 'Kids',
    'nav.about': 'Our Story',
    'nav.sustainability': 'Sustainability',
    'hero.title': 'Gentle on little ones,',
    'hero.titleAccent': 'kind to our planet',
    'hero.subtitle': 'Premium organic clothing for children who love to explore. Every piece is crafted with care, using sustainable materials that feel as good as they look.',
    'hero.cta': 'Explore Collection',
    'hero.secondary': 'Learn More',
    'categories.title': 'Shop by Category',
    'categories.baby': 'Baby',
    'categories.toddler': 'Toddler',
    'categories.kids': 'Kids',
    'categories.accessories': 'Accessories',
    'featured.title': 'New Arrivals',
    'featured.subtitle': 'Discover our latest sustainable pieces, designed for comfort and crafted with love',
    'product.addToCart': 'Add to Cart',
    'product.viewDetails': 'View Details',
    'footer.newsletter': 'Join Our Community',
    'footer.newsletterText': 'Subscribe for updates on new arrivals and sustainable living tips',
    'footer.subscribe': 'Subscribe',
    'footer.shop': 'Shop',
    'footer.about': 'About',
    'footer.help': 'Help',
    'footer.rights': 'All rights reserved',
    'currency.gbp': '£',
    'currency.eur': '€',
  },
  de: {
    'nav.shop': 'Shop',
    'nav.baby': 'Baby',
    'nav.kids': 'Kinder',
    'nav.about': 'Unsere Geschichte',
    'nav.sustainability': 'Nachhaltigkeit',
    'hero.title': 'Sanft zu den Kleinen,',
    'hero.titleAccent': 'freundlich zu unserem Planeten',
    'hero.subtitle': 'Premium-Bio-Kleidung für Kinder, die gerne entdecken. Jedes Stück wird mit Sorgfalt gefertigt.',
    'hero.cta': 'Kollektion entdecken',
    'hero.secondary': 'Mehr erfahren',
    'categories.title': 'Nach Kategorie shoppen',
    'categories.baby': 'Baby',
    'categories.toddler': 'Kleinkind',
    'categories.kids': 'Kinder',
    'categories.accessories': 'Accessoires',
    'featured.title': 'Neuheiten',
    'featured.subtitle': 'Entdecken Sie unsere neuesten nachhaltigen Stücke',
    'product.addToCart': 'In den Warenkorb',
    'product.viewDetails': 'Details ansehen',
    'footer.newsletter': 'Community beitreten',
    'footer.newsletterText': 'Abonnieren Sie Updates zu Neuheiten',
    'footer.subscribe': 'Abonnieren',
    'footer.shop': 'Shop',
    'footer.about': 'Über uns',
    'footer.help': 'Hilfe',
    'footer.rights': 'Alle Rechte vorbehalten',
    'currency.gbp': '£',
    'currency.eur': '€',
  },
  fr: {
    'nav.shop': 'Boutique',
    'nav.baby': 'Bébé',
    'nav.kids': 'Enfants',
    'nav.about': 'Notre Histoire',
    'nav.sustainability': 'Durabilité',
    'hero.title': 'Doux pour les petits,',
    'hero.titleAccent': 'respectueux de la planète',
    'hero.subtitle': 'Vêtements bio premium pour les enfants qui aiment explorer.',
    'hero.cta': 'Découvrir la collection',
    'hero.secondary': 'En savoir plus',
    'categories.title': 'Acheter par catégorie',
    'categories.baby': 'Bébé',
    'categories.toddler': 'Tout-petit',
    'categories.kids': 'Enfants',
    'categories.accessories': 'Accessoires',
    'featured.title': 'Nouveautés',
    'featured.subtitle': 'Découvrez nos dernières pièces durables',
    'product.addToCart': 'Ajouter au panier',
    'product.viewDetails': 'Voir les détails',
    'footer.newsletter': 'Rejoignez notre communauté',
    'footer.newsletterText': 'Abonnez-vous pour les mises à jour',
    'footer.subscribe': "S'abonner",
    'footer.shop': 'Boutique',
    'footer.about': 'À propos',
    'footer.help': 'Aide',
    'footer.rights': 'Tous droits réservés',
    'currency.gbp': '£',
    'currency.eur': '€',
  },
};

export function loadMessages(locale: Locale) {
  i18n.load(locale, messages[locale]);
  i18n.activate(locale);
}

export function t(key: string): string {
  const locale = i18n.locale as Locale || defaultLocale;
  return messages[locale]?.[key] || messages[defaultLocale][key] || key;
}

// Initialize with default locale
loadMessages(defaultLocale);

export { i18n };
