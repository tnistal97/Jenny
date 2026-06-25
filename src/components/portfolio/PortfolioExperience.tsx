'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '@/lib/content-context';
import { Lightbox } from '@/components/ui/Lightbox';
import { PhotoFrame } from '@/components/ui/PhotoFrame';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ChevronLeft, ArrowRight } from '@/components/ui/icons';
import type { PortfolioProject } from '@/types/content';

const ease = [0.22, 1, 0.36, 1] as const;

function lookObjective(text: string): string {
  const first = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return first.replace(/\.$/, '');
}

function scrollToTop() {
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function PortfolioExperience() {
  const { portfolio } = useContent();
  const [catSlug, setCatSlug] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Deep-link por hash (#proj-<id> / #cat-<slug>), útil al venir desde la Home.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''));
    if (!hash) return;
    if (hash.startsWith('proj-')) {
      const id = hash.slice(5);
      const proj = portfolio.projects.find((p) => p.id === id);
      if (proj) {
        const cat = portfolio.categories.find((c) => c.id === proj.categoryId);
        setCatSlug(cat?.slug ?? null);
        setProjectId(id);
      }
    } else if (hash.startsWith('cat-')) {
      setCatSlug(hash.slice(4));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const category = useMemo(() => portfolio.categories.find((c) => c.slug === catSlug) ?? null, [portfolio.categories, catSlug]);
  const project = useMemo(() => portfolio.projects.find((p) => p.id === projectId) ?? null, [portfolio.projects, projectId]);
  const categoryProjects = useMemo(
    () => (category ? portfolio.projects.filter((p) => p.categoryId === category.id) : []),
    [portfolio.projects, category],
  );

  function openCategory(slug: string) {
    setCatSlug(slug);
    setProjectId(null);
    if (typeof window !== 'undefined') history.replaceState(null, '', `#cat-${slug}`);
    scrollToTop();
  }
  function openProject(p: PortfolioProject) {
    setProjectId(p.id);
    if (typeof window !== 'undefined') history.replaceState(null, '', `#proj-${p.id}`);
    scrollToTop();
  }
  function goAll() {
    setCatSlug(null);
    setProjectId(null);
    if (typeof window !== 'undefined') history.replaceState(null, '', ' ');
    scrollToTop();
  }
  function backToCategory() {
    setProjectId(null);
    if (category) history.replaceState(null, '', `#cat-${category.slug}`);
    scrollToTop();
  }

  const countByCat = (id: string) => portfolio.projects.filter((p) => p.categoryId === id).length;

  return (
    <section className="bg-canvas pt-[72px]">
      <div className="mx-auto max-w-container px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        {/* Encabezado + breadcrumb */}
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <nav className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-stone">
              <button onClick={goAll} className="transition-colors hover:text-ink">Portfolio</button>
              {category && <><span>/</span><button onClick={backToCategory} className="transition-colors hover:text-ink">{category.name}</button></>}
              {project && <><span>/</span><span className="text-ink">{project.title.split('—')[0].trim()}</span></>}
            </nav>
            <h1 className="font-display text-4xl leading-[1.05] text-ink lg:text-5xl">
              {project ? project.title : category ? category.name : portfolio.title}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone">
              {project ? project.description : category ? category.description : portfolio.intro}
            </p>
          </div>
        </div>

        {/* Nav de categorías */}
        {!project && (
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button onClick={goAll} data-active={!category} className="filter-pill">Todas</button>
            {portfolio.categories.map((c) => (
              <button key={c.id} onClick={() => openCategory(c.slug)} data-active={category?.id === c.id} className="filter-pill">
                {c.name}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Vista: proyecto (galería) */}
          {project ? (
            <motion.div key={`proj-${project.id}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
              <button onClick={backToCategory} className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-ink">
                <ChevronLeft className="h-4 w-4" /> Volver a {category?.name ?? 'la categoría'}
              </button>

              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-y border-ink/10 py-4 text-[12px] uppercase tracking-wide2 text-stone">
                <span><span className="text-ink">Tipo:</span> {project.eventType}</span>
                <span><span className="text-ink">Lugar:</span> {project.location}</span>
                <span><span className="text-ink">Fecha:</span> {project.date}</span>
              </div>

              {project.credits?.length ? (
                <div className="mt-6 flex flex-wrap gap-x-10 gap-y-1.5">
                  {project.credits.map((c) => (
                    <span key={c} className="text-[11px] uppercase tracking-wide2 text-stone">{c}</span>
                  ))}
                </div>
              ) : null}

              {project.permalink ? (
                <a href={project.permalink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[11px] uppercase tracking-wide2 text-ink underline-offset-4 hover:underline">
                  Ver en Instagram ↗
                </a>
              ) : null}

              <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
                {project.images.map((im, i) => (
                  <button key={im.id} onClick={() => setLightbox(i)} className="group mb-5 block w-full break-inside-avoid text-left" aria-label={`Ampliar ${im.caption}`}>
                    <PhotoFrame
                      src={im.src}
                      alt={`${project.title} — ${im.caption}`}
                      className={`${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'} w-full`}
                      imgClassName="transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      overlay="soft"
                    >
                      <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-label text-cream/90">{im.caption}</span>
                    </PhotoFrame>
                  </button>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton size="lg" message={`Hola Jennifer! Vi "${project.title}" en tu portfolio y quería consultar por un maquillaje similar. ¿Tenés disponibilidad?`}>
                  Quiero un look así
                </WhatsAppButton>
                <button onClick={backToCategory} className="text-[12px] uppercase tracking-wide2 text-stone transition-colors hover:text-ink">Ver más trabajos</button>
              </div>
            </motion.div>
          ) : category ? (
            /* Vista: proyectos de una categoría */
            <motion.div key={`cat-${category.id}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProjects.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={() => openProject(p)} />
              ))}
            </motion.div>
          ) : (
            /* Vista: categorías */
            <motion.div key="all" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.categories.map((c) => (
                <button key={c.id} onClick={() => openCategory(c.slug)} className="group text-left">
                  <PhotoFrame
                    src={c.cover}
                    alt={c.name}
                    className="aspect-[4/5] w-full"
                    imgClassName="transition-transform duration-[1.1s] ease-lux group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    overlay="strong"
                  >
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] uppercase tracking-label text-cream/75">{countByCat(c.id)} trabajos</p>
                      <h3 className="mt-1 font-display text-2xl text-cream">{c.name}</h3>
                      <p className="mt-2 max-w-xs text-[13px] leading-snug text-cream/80">{c.description}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-cream">
                        Ver trabajos <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1" />
                      </span>
                    </div>
                  </PhotoFrame>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Lightbox
        images={(project?.images ?? []).map((im) => ({ src: im.src, title: project?.title, subtitle: im.caption }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: PortfolioProject; onOpen: () => void }) {
  const cover = project.images[0]?.src ?? '';
  return (
    <button onClick={onOpen} className="group flex h-full flex-col text-left" aria-label={`Ver ${project.title}`}>
      <PhotoFrame
        src={cover}
        alt={project.title}
        className="aspect-[4/5] w-full"
        imgClassName="transition-transform duration-[1.1s] ease-lux group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="pt-5">
        <p className="text-[10px] uppercase tracking-label text-stone">{project.eventType} · {project.date}</p>
        <h3 className="mt-2 font-display text-xl text-ink">{project.title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-snug text-stone">{lookObjective(project.description)}.</p>
      </div>
    </button>
  );
}
