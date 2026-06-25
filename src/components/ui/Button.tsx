import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'light' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-cream hover:bg-charcoal border border-ink',
  light:
    'bg-cream text-ink hover:bg-white border border-cream',
  outline:
    'bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-cream',
  ghost:
    'bg-transparent text-ink border border-transparent hover:text-stone',
};

const sizes: Record<Size, string> = {
  md: 'px-7 py-3 text-[12px]',
  lg: 'px-9 py-4 text-[13px]',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-sans uppercase tracking-wide2 transition-all duration-500 ease-lux ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon ? <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">{icon}</span> : null}
    </a>
  );
}
