'use client';

import { useContent } from '@/lib/content-context';

/** Banda de confianza inmediatamente debajo del hero. */
export function TrustBar() {
  const { hero } = useContent();
  if (!hero.trust?.length) return null;

  return (
    <div className="border-y border-ink/10 bg-cream">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 sm:px-8 lg:px-12">
        {hero.trust.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-[11px] uppercase tracking-wide2 text-stone sm:text-[12px]">{item}</span>
            {i < hero.trust.length - 1 ? <span aria-hidden className="hidden h-1 w-1 rounded-full bg-rose sm:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
