'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { buildWhatsAppUrl, instagramUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';

/** Cierre editorial silencioso: a sangre, sin panel ni botón pill. */
export function FinalCta() {
  const { finalCta, general } = useContent();
  const waHref = buildWhatsAppUrl(general.whatsapp, general.whatsappMessage);

  return (
    <section className="grain relative overflow-hidden bg-ink py-32 text-center text-cream lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-rose/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-[11px] uppercase tracking-label text-cream/45">{finalCta.eyebrow}</span>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-5xl leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
            {finalCta.titleLine1} <span className="italic">{finalCta.titleLine2}</span>
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('final')}
              className="text-[12px] uppercase tracking-label text-cream transition-opacity hover:opacity-60"
            >
              {finalCta.cta}
            </a>
            <a
              href={instagramUrl(general.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] uppercase tracking-label text-cream/55 transition-colors hover:text-cream"
            >
              @{general.instagram}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
