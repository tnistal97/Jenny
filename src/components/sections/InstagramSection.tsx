'use client';

import { useContent } from '@/lib/content-context';
import { instagramUrl } from '@/lib/whatsapp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { ButtonLink } from '@/components/ui/Button';
import { Instagram, ArrowUpRight } from '@/components/ui/icons';

const POSTS = [1, 2, 3, 4, 5, 6];

/** "Más trabajos" → Instagram. Imágenes locales, sin embeds pesados. */
export function InstagramSection() {
  const { general } = useContent();
  const href = instagramUrl(general.instagram);

  return (
    <section id="instagram" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading eyebrow="Más trabajos" title={`@${general.instagram}`} />
          <Reveal delay={0.1}>
            <ButtonLink href={href} target="_blank" rel="noopener noreferrer" variant="outline" size="lg" icon={<ArrowUpRight className="h-4 w-4" />}>
              Ver más en Instagram
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {POSTS.map((n, i) => (
            <Reveal key={n} delay={(i % 6) * 0.05}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="group block" aria-label="Ver en Instagram">
                <PhotoFrame
                  src={`/images/instagram/post-${n}.jpg`}
                  alt={`Trabajo de Jenny Rojas en Instagram ${n}`}
                  className="aspect-square w-full"
                  imgClassName="transition-transform duration-700 ease-lux group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 16vw"
                >
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/30 group-hover:opacity-100">
                    <Instagram className="h-7 w-7 text-cream" />
                  </span>
                </PhotoFrame>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
