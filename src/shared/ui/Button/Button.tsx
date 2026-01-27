import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-soft hover:shadow-medium hover:-translate-y-0.5',
        nature: 'btn-nature',
        soft: 'btn-soft',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border-2 border-primary/30 bg-transparent text-forest hover:border-primary hover:bg-primary/10',
        hero: 'bg-forest text-forest-foreground shadow-medium hover:shadow-elevated hover:-translate-y-1 font-semibold',
        heroSecondary: 'border-2 border-forest/20 bg-background/80 backdrop-blur-sm text-forest hover:bg-forest/10 hover:border-forest/40',
      },
      size: {
        default: 'h-11 rounded-xl px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-sm',
        lg: 'h-14 rounded-2xl px-8 text-lg',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
