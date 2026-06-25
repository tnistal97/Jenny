'use client';

import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';

// Nombres reales tomados de su perfil (historias destacadas y posts).
const NAMES = [
  'Flor Sosa',
  'Caro Calvagni',
  'Sofi Gonet',
  'Cami Mayan',
  'Juli Poggio',
  'Flor Jazmín',
  'China Dominicci',
  'Marti Benza',
];

export function ConfianEnMi() {
  return (
    <section id="confian" className="bg-ink py-24 text-cream lg:py-28">
      <div className="mx-auto max-w-container px-6 text-center sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow className="mb-6 text-cream/50">Confían en mí</Eyebrow>
          <h2 className="mx-auto max-w-3xl font-display text-3xl leading-[1.1] sm:text-4xl lg:text-[44px]">
            Creadoras, figuras y clientas que ya pasaron por mi silla.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {NAMES.map((name) => (
              <span key={name} className="font-display text-lg text-cream/85 sm:text-xl">
                {name}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-12 max-w-xl text-[13px] uppercase tracking-wide2 text-cream/40">
            Trabajo para cámara y vida real · eventos · producciones · contenido
          </p>
        </Reveal>
      </div>
    </section>
  );
}
