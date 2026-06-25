import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block text-[11px] uppercase tracking-label text-stone ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <Reveal className={`${alignment} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed text-stone ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
