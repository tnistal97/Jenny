'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { instagramUrl } from '@/lib/whatsapp';

export function FinalCta() {
  const { finalCta, general } = useContent();

  return (
    <section className="bg-canvas px-6 pb-24 pt-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-container">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-ink px-8 py-20 text-center sm:px-12 lg:py-28">
            {/* Luz sutil */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-rose/20 blur-[100px]"
            />
            <div className="relative">
              <span className="text-[11px] uppercase tracking-label text-cream/50">{finalCta.eyebrow}</span>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
                {finalCta.titleLine1} <span className="italic">{finalCta.titleLine2}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-cream/70">
                {finalCta.text}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <WhatsAppButton variant="light" size="lg">
                  {finalCta.cta}
                </WhatsAppButton>
                <a
                  href={instagramUrl(general.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] uppercase tracking-wide2 text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline"
                >
                  o seguime en Instagram
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
