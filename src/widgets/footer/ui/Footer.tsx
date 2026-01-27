import { motion } from 'framer-motion';
import { Leaf, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { t } from '@/shared/config/i18n';
import { Button } from '@/shared/ui';

export function Footer() {
  const footerLinks = {
    shop: [
      { label: 'New Arrivals', href: '/new' },
      { label: 'Baby', href: '/baby' },
      { label: 'Toddler', href: '/toddler' },
      { label: 'Kids', href: '/kids' },
      { label: 'Accessories', href: '/accessories' },
    ],
    about: [
      { label: 'Our Story', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Materials', href: '/materials' },
      { label: 'Certifications', href: '/certifications' },
    ],
    help: [
      { label: 'Sizing Guide', href: '/sizing' },
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  };

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <motion.div
          className="mb-12 rounded-3xl bg-background p-8 shadow-soft md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-center md:flex-row md:text-left md:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="mb-2 text-2xl font-semibold text-foreground">
                {t('footer.newsletter')}
              </h3>
              <p className="text-muted-foreground">
                {t('footer.newsletterText')}
              </p>
            </div>
            <div className="flex w-full max-w-sm gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-nature flex-1"
              />
              <Button variant="nature">{t('footer.subscribe')}</Button>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest">
                <Leaf className="h-5 w-5 text-forest-foreground" />
              </div>
              <span className="text-xl font-semibold text-forest">Oakling</span>
            </a>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              Premium sustainable fashion for little ones. Every piece is crafted with love
              and respect for our planet.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-soft transition-all hover:shadow-medium hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">{t('footer.shop')}</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">{t('footer.about')}</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">{t('footer.help')}</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oakling. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground">Terms of Service</a>
            <a href="/cookies" className="hover:text-foreground">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
