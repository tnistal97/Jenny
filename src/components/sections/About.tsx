'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { Star, Brush, Gem, Heart, Check } from '@/components/ui/icons';

const ICONS = [Star, Brush, Gem, Heart];

export function About() {
  const { about } = useContent();

  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-sand py-24 lg:py-32">
      {/* Monograma de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[28rem] leading-none text-ink/[0.035] lg:block"
      >
        J
      </span>

      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Imagen */}
        <Reveal direction="right">
          <PhotoFrame
            src={about.image}
            alt="Jennifer, maquilladora profesional, trabajando con sus brochas en CABA"
            className="aspect-[4/5] w-full rounded-tr-[3rem] lg:max-w-md"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <span className="text-[11px] uppercase tracking-label text-stone">{about.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ink lg:text-[44px]">
              {about.titleLine1}
              <br />
              <span className="italic">{about.titleLine2}</span>
            </h2>
          </Reveal>

          <div className="mt-7 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="max-w-xl text-[15px] leading-relaxed text-stone">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {about.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-charcoal">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-ink text-cream">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-9 sm:grid-cols-4">
              {about.highlights.map((h, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={i}>
                    <Icon className="mb-3 h-6 w-6 text-mauve" />
                    <p className="font-display text-2xl text-ink">{h.value}</p>
                    <p className="mt-1 text-[12px] leading-snug text-stone">{h.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <WhatsAppButton variant="primary" size="lg">
                {about.cta}
              </WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
