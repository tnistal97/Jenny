'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';

/** "Voces" — testimonios como citas editoriales. Sin estrellas, sin rating, sin cards. */
export function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section id="testimonios" className="bg-canvas py-28 lg:py-40">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow className="mb-14">Voces</Eyebrow>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.id} delay={(i % 2) * 0.08}>
              <figure className="max-w-md">
                <blockquote className="font-display text-2xl leading-[1.3] text-ink sm:text-[28px]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[11px] uppercase tracking-label text-stone">
                  {t.name}
                  {t.source ? <span className="text-stone/60"> · {t.source}</span> : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
