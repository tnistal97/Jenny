'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';

/** Servicios como índice tipográfico editorial. Sin cards, sin íconos, sin botones. */
export function Services() {
  const { services } = useContent();

  return (
    <section id="servicios" className="bg-canvas py-28 lg:py-40">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow className="mb-10">Servicios — índice</Eyebrow>
        </Reveal>

        <div className="border-t border-ink/12">
          {services.map((service, i) => (
            <Reveal key={service.id}>
              <div className="group flex items-baseline gap-6 border-b border-ink/10 py-7 sm:gap-10 sm:py-9">
                <span className="font-sans text-[12px] tracking-wide2 text-taupe">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 font-display text-3xl leading-none text-ink transition-colors duration-300 group-hover:text-stone sm:text-4xl lg:text-5xl">
                  {service.title}
                </h3>
                <p className="hidden max-w-[16rem] text-[13.5px] leading-relaxed text-stone md:block">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
