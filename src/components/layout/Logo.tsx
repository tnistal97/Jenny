import { useContent } from '@/lib/content-context';

export function Logo({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const { general } = useContent();
  const color = variant === 'light' ? 'text-cream' : 'text-ink';
  const sub = variant === 'light' ? 'text-cream/60' : 'text-stone';

  return (
    <a href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${general.name} ${general.role}`}>
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border ${
          variant === 'light' ? 'border-cream/30' : 'border-ink/20'
        }`}
      >
        <span className={`font-display text-xl leading-none ${color}`}>J</span>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[15px] tracking-wide ${color}`}>
          {general.name}
        </span>
        <span className={`block text-[9px] uppercase tracking-label ${sub}`}>
          {general.role}
        </span>
      </span>
    </a>
  );
}
