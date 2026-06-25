'use client';

import Image from 'next/image';
import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Check } from '@/components/ui/icons';

/**
 * Bloque de conversión optimizado para campañas de Google Ads.
 * Mensaje directo, beneficios claros y un único CTA fuerte a WhatsApp.
 */
export function AdsBlock() {
  const { ads } = useContent();

  return (
    <section id="reservar" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-blush/40 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-9 sm:p-12 lg:p-16">
              <span className="text-[11px] uppercase tracking-label text-mauve">{ads.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl leading-[1.08] text-ink sm:text-4xl lg:text-[40px]">
                {ads.title}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/80">{ads.text}</p>

              <ul className="mt-8 space-y-3.5">
                {ads.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-ink text-cream">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] leading-snug text-charcoal">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <WhatsAppButton size="lg">{ads.cta}</WhatsAppButton>
                <p className="mt-3 text-[12px] text-stone">Respuesta rápida · Sin compromiso</p>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/mk-glow-2.svg"
                alt="Maquillaje profesional de larga duración en Capital Federal"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blush/30 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
