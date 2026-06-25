'use client';

import { useContent } from '@/lib/content-context';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { ArrowRight } from '@/components/ui/icons';
import type { PortfolioProject } from '@/types/content';

/** Primera oración de la descripción: el "objetivo del look". */
function lookObjective(text: string): string {
  const first = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return first.replace(/\.$/, '');
}

/**
 * Portfolio en la Home, editorial: novias primero, piezas grandes, layout
 * asimétrico de revista, imagen protagonista y mínimo "chrome".
 */
export function PortfolioHome() {
  const { portfolio } = useContent();
  const catName = (id: string) => portfolio.categories.find((c) => c.id === id)?.name ?? '';

  // Novias primero, luego el resto de destacados.
  const novias = portfolio.categories.find((c) => c.slug === 'novias')?.id;
  const featured = portfolio.projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.categoryId === novias ? -1 : 0) - (b.categoryId === novias ? -1 : 0))
    .slice(0, 5);

  const [lead, second, ...rest] = featured;

  return (
    <section id="portfolio" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow className="mb-5">{portfolio.eyebrow}</Eyebrow>
            <h2 className="max-w-xl font-display text-3xl leading-[1.05] text-ink sm:text-4xl lg:text-[44px]">
              {portfolio.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="/portfolio" className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-ink">
              Ver todos los trabajos
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Fila editorial: pieza grande + pieza alta */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {lead ? (
            <Reveal className="lg:col-span-7" direction="up">
              <EditorialTile project={lead} category={catName(lead.categoryId)} aspect="aspect-[5/4] lg:aspect-[4/3]" big />
            </Reveal>
          ) : null}
          {second ? (
            <Reveal className="lg:col-span-5" delay={0.1} direction="up">
              <EditorialTile project={second} category={catName(second.categoryId)} aspect="aspect-[4/5] lg:aspect-[4/3]" />
            </Reveal>
          ) : null}
        </div>

        {/* Tres piezas */}
        {rest.length ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08} direction="up">
                <EditorialTile project={p} category={catName(p.categoryId)} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Categorías */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="mr-2 text-[11px] uppercase tracking-label text-stone">Explorá</span>
            {portfolio.categories.map((c) => (
              <a
                key={c.id}
                href={`/portfolio#cat-${c.slug}`}
                className="rounded-full border border-ink/15 px-4 py-2 text-[12px] uppercase tracking-wide2 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
              >
                {c.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EditorialTile({
  project,
  category,
  aspect,
  big = false,
}: {
  project: PortfolioProject;
  category: string;
  aspect: string;
  big?: boolean;
}) {
  return (
    <a href={`/portfolio#proj-${project.id}`} className="group block" aria-label={`Ver ${project.title}`}>
      <PhotoFrame
        src={project.images[0]?.src ?? ''}
        alt={project.title}
        className={`${aspect} w-full`}
        imgClassName="transition-transform duration-[1.1s] ease-lux group-hover:scale-[1.04]"
        sizes={big ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 1024px) 100vw, 33vw'}
        overlay="strong"
      >
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
          <p className="text-[10px] uppercase tracking-label text-cream/75">{category}</p>
          <h3 className={`mt-2 font-display text-cream ${big ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}>{project.title}</h3>
          <p className="mt-2 max-w-sm text-[13px] leading-snug text-cream/80 opacity-0 transition-opacity duration-500 ease-lux group-hover:opacity-100">
            {lookObjective(project.description)}.
          </p>
        </div>
      </PhotoFrame>
    </a>
  );
}
