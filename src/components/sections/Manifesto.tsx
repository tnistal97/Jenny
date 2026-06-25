'use client';

import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';

/** Momento manifiesto: una declaración editorial, mucho aire, firma tipográfica. */
export function Manifesto() {
  return (
    <section id="manifiesto" className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow className="mb-8">Filosofía</Eyebrow>
          <blockquote className="max-w-4xl font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[68px]">
            El glow es mi <span className="italic">firma.</span> Maquillo para que te veas
            —y te sientas— vos misma, en tu mejor versión.
          </blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-display text-2xl italic text-stone">Jenny Rojas</p>
        </Reveal>
      </div>
    </section>
  );
}
