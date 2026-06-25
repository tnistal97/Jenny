'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { Check } from '@/components/ui/icons';

/** Sección "Especial novias" — clave para vender el servicio estrella. */
export function Bridal() {
  const { bridal } = useContent();

  return (
    <section id="novias" className="bg-ink py-24 text-cream lg:py-32">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {/* Imagen */}
        <Reveal direction="right">
          <PhotoFrame
            src={bridal.image}
            alt="Maquillaje de novia natural y de larga duración en CABA"
            className="aspect-[4/5] w-full rounded-tr-[3rem] rounded-bl-[3rem] lg:max-w-md"
            sizes="(max-width: 1024px) 100vw, 40vw"
            overlay="soft"
          />
        </Reveal>

        {/* Contenido */}
        <div>
          <Reveal>
            <span className="text-[11px] uppercase tracking-label text-rose">{bridal.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] lg:text-[44px]">
              {bridal.titleLine1} <span className="italic">{bridal.titleLine2}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/70">{bridal.intro}</p>
          </Reveal>

          <div className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {bridal.points.map((pt, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <div className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-cream text-ink">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug">{pt.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-cream/65">{pt.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10">
              {bridal.availabilityNote ? (
                <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-cream/20 px-4 py-2 text-[11px] uppercase tracking-wide2 text-cream/80">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
                  </span>
                  {bridal.availabilityNote}
                </p>
              ) : null}
              <div>
                <WhatsAppButton variant="light" size="lg" source="novias" message="Hola Jennifer! Soy novia y quería consultar disponibilidad para la fecha de mi casamiento. ¿Cómo es el proceso?">
                  {bridal.cta}
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
