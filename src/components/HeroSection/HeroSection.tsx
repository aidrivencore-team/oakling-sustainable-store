// sync trigger
import { FC } from 'react';
import styles from './HeroSection.module.scss';

interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface HeroSectionProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  ctaButtons: CTAButton[];
  backgroundImage?: string;
}

export const HeroSection: FC<HeroSectionProps> = ({
  title,
  titleAccent,
  subtitle,
  ctaButtons,
  backgroundImage = '/placeholder.svg',
}) => {
  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Hero background"
        className={styles.backgroundImage}
      />

      {/* Overlay for text contrast */}
      <div className={styles.overlay} />

      {/* Floating decorative elements */}
      <div className={styles.floatingElements}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.floatingDot} />
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          {title}
          {titleAccent && (
            <span className={styles.titleAccent}>{titleAccent}</span>
          )}
        </h1>

        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.buttonGroup}>
          {ctaButtons.map((button, index) => (
            <button
              key={index}
              className={
                button.variant === 'secondary'
                  ? styles.ctaButtonSecondary
                  : styles.ctaButton
              }
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
