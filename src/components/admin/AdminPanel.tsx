'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { SiteContent, Service, PortfolioCategory, PortfolioProject } from '@/types/content';
import { defaultContent } from '@/lib/content';
import { loadStoredContent, saveStoredContent, clearStoredContent, mergeWithDefaults } from '@/lib/storage';
import {
  Panel, Card, Grid2, Field, TextInput, TextArea, ImageInput, ItemControls, AddButton,
} from './ui';

const TABS = ['General', 'Hero', 'Sobre mí', 'Servicios', 'Experiencias', 'Portfolio', 'Proceso', 'Novias', 'Testimonios', 'FAQ', 'Contacto', 'Conversión', 'SEO'] as const;
type Tab = (typeof TABS)[number];

const uid = (p = 'id') => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function moveInArray<T>(arr: T[], index: number, dir: number): T[] {
  const next = [...arr];
  const target = index + dir;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

type Setter = React.Dispatch<React.SetStateAction<SiteContent>>;

export function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [draft, setDraft] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState<string>(JSON.stringify(defaultContent));
  const [tab, setTab] = useState<Tab>('General');
  const [toast, setToast] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = loadStoredContent();
    if (stored) {
      setDraft(stored);
      setSaved(JSON.stringify(stored));
    }
  }, []);

  const dirty = useMemo(() => JSON.stringify(draft) !== saved, [draft, saved]);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }
  function handleSave() {
    saveStoredContent(draft);
    setSaved(JSON.stringify(draft));
    flash('Cambios guardados. El sitio ya refleja el contenido nuevo.');
  }
  function handleExport() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jennifer-config.json';
    a.click();
    URL.revokeObjectURL(url);
    flash('Configuración exportada como jennifer-config.json');
  }
  async function handleImport(file: File) {
    try {
      const merged = mergeWithDefaults(JSON.parse(await file.text()));
      setDraft(merged);
      saveStoredContent(merged);
      setSaved(JSON.stringify(merged));
      flash('Configuración importada y guardada correctamente.');
    } catch {
      flash('Error: el archivo no es un JSON de configuración válido.');
    }
  }
  function handleReset() {
    if (!window.confirm('¿Restablecer todo el contenido al valor por defecto? Se perderán los cambios guardados.')) return;
    clearStoredContent();
    setDraft(defaultContent);
    setSaved(JSON.stringify(defaultContent));
    flash('Contenido restablecido a los valores por defecto.');
  }

  /* Setters por sección */
  const setGeneral = (patch: Partial<SiteContent['general']>) => setDraft((d) => ({ ...d, general: { ...d.general, ...patch } }));
  const setHero = (patch: Partial<SiteContent['hero']>) => setDraft((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  const setAbout = (patch: Partial<SiteContent['about']>) => setDraft((d) => ({ ...d, about: { ...d.about, ...patch } }));
  const setProcess = (patch: Partial<SiteContent['process']>) => setDraft((d) => ({ ...d, process: { ...d.process, ...patch } }));
  const setBridal = (patch: Partial<SiteContent['bridal']>) => setDraft((d) => ({ ...d, bridal: { ...d.bridal, ...patch } }));
  const setPackagesMeta = (patch: Partial<Pick<SiteContent['packages'], 'eyebrow' | 'title' | 'intro' | 'note'>>) => setDraft((d) => ({ ...d, packages: { ...d.packages, ...patch } }));
  const setFaqMeta = (patch: Partial<Pick<SiteContent['faq'], 'eyebrow' | 'title' | 'intro'>>) => setDraft((d) => ({ ...d, faq: { ...d.faq, ...patch } }));
  const setContact = (patch: Partial<SiteContent['contact']>) => setDraft((d) => ({ ...d, contact: { ...d.contact, ...patch } }));
  const setTestimonialsMeta = (patch: Partial<Pick<SiteContent['testimonials'], 'eyebrow' | 'title' | 'rating' | 'ratingLabel'>>) => setDraft((d) => ({ ...d, testimonials: { ...d.testimonials, ...patch } }));
  const setAds = (patch: Partial<SiteContent['ads']>) => setDraft((d) => ({ ...d, ads: { ...d.ads, ...patch } }));
  const setFinalCta = (patch: Partial<SiteContent['finalCta']>) => setDraft((d) => ({ ...d, finalCta: { ...d.finalCta, ...patch } }));
  const setSeo = (patch: Partial<SiteContent['seo']>) => setDraft((d) => ({ ...d, seo: { ...d.seo, ...patch } }));
  const setPortfolioMeta = (patch: Partial<Pick<SiteContent['portfolio'], 'eyebrow' | 'title' | 'intro'>>) =>
    setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, ...patch } }));

  const btn = 'rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:bg-neutral-800';

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-200">
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-[#0c0c0e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-700 font-display text-lg text-white">J</span>
            <div>
              <p className="text-sm font-semibold text-white">Panel de administración</p>
              <p className="text-[11px] text-neutral-500">{dirty ? 'Cambios sin guardar' : 'Todo guardado'} · Jennifer Makeup Artist</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className={btn}>Ver sitio ↗</a>
            <button onClick={() => importRef.current?.click()} className={btn}>Importar</button>
            <button onClick={handleExport} className={btn}>Exportar</button>
            <button onClick={handleReset} className={`${btn} text-neutral-400`}>Restablecer</button>
            <button onClick={handleSave} disabled={!dirty} className="rounded-md bg-white px-4 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40">Guardar</button>
            <button onClick={onLogout} className={`${btn} text-neutral-400`}>Salir</button>
          </div>
        </div>
        <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImport(f); e.target.value = ''; }} />
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-8 lg:grid-cols-[200px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${tab === t ? 'bg-white text-black' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}>{t}</button>
          ))}
        </nav>

        <main className="min-w-0 space-y-6">
          {tab === 'General' && (
            <Panel title="Datos generales" description="Información de contacto usada en botones, footer y SEO.">
              <Card>
                <Grid2>
                  <Field label="Nombre"><TextInput value={draft.general.name} onChange={(v) => setGeneral({ name: v })} /></Field>
                  <Field label="Rol / título"><TextInput value={draft.general.role} onChange={(v) => setGeneral({ role: v })} /></Field>
                  <Field label="WhatsApp" hint="Solo dígitos con código de país. Ej: 5491134567890"><TextInput value={draft.general.whatsapp} onChange={(v) => setGeneral({ whatsapp: v })} /></Field>
                  <Field label="Email"><TextInput value={draft.general.email} onChange={(v) => setGeneral({ email: v })} /></Field>
                  <Field label="Instagram" hint="Sin @"><TextInput value={draft.general.instagram} onChange={(v) => setGeneral({ instagram: v })} /></Field>
                  <Field label="TikTok" hint="Sin @"><TextInput value={draft.general.tiktok} onChange={(v) => setGeneral({ tiktok: v })} /></Field>
                  <Field label="Zona de atención"><TextInput value={draft.general.zone} onChange={(v) => setGeneral({ zone: v })} /></Field>
                  <Field label="Ciudad"><TextInput value={draft.general.city} onChange={(v) => setGeneral({ city: v })} /></Field>
                </Grid2>
                <div className="mt-4"><Field label="Mensaje de WhatsApp por defecto" hint="Texto precargado al tocar los botones de WhatsApp."><TextArea value={draft.general.whatsappMessage} onChange={(v) => setGeneral({ whatsappMessage: v })} rows={2} /></Field></div>
              </Card>
            </Panel>
          )}

          {tab === 'Hero' && (
            <Panel title="Hero" description="La primera sección que ve la clienta.">
              <Card>
                <div className="space-y-4">
                  <Field label="Eyebrow"><TextInput value={draft.hero.eyebrow} onChange={(v) => setHero({ eyebrow: v })} /></Field>
                  <Grid2>
                    <Field label="Título · línea 1"><TextInput value={draft.hero.titleLine1} onChange={(v) => setHero({ titleLine1: v })} /></Field>
                    <Field label="Título · línea 2 (itálica)"><TextInput value={draft.hero.titleLine2} onChange={(v) => setHero({ titleLine2: v })} /></Field>
                  </Grid2>
                  <Field label="Subtítulo"><TextArea value={draft.hero.subtitle} onChange={(v) => setHero({ subtitle: v })} /></Field>
                  <Grid2>
                    <Field label="CTA principal"><TextInput value={draft.hero.ctaPrimary} onChange={(v) => setHero({ ctaPrimary: v })} /></Field>
                    <Field label="CTA secundario"><TextInput value={draft.hero.ctaSecondary} onChange={(v) => setHero({ ctaSecondary: v })} /></Field>
                  </Grid2>
                  <Field label="Imagen del hero"><ImageInput value={draft.hero.image} onChange={(v) => setHero({ image: v })} /></Field>
                  <Grid2>
                    <Field label="Reseña flotante"><TextInput value={draft.hero.reviewQuote} onChange={(v) => setHero({ reviewQuote: v })} /></Field>
                    <Field label="Autora de la reseña"><TextInput value={draft.hero.reviewAuthor} onChange={(v) => setHero({ reviewAuthor: v })} /></Field>
                  </Grid2>
                </div>
              </Card>
              <Card>
                <p className="mb-3 text-sm font-medium text-white">Trust bar (claims bajo el hero)</p>
                <div className="space-y-2">
                  {draft.hero.trust.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <TextInput value={b} onChange={(v) => setHero({ trust: draft.hero.trust.map((x, j) => (j === i ? v : x)) })} />
                      <ItemControls onUp={() => setHero({ trust: moveInArray(draft.hero.trust, i, -1) })} onDown={() => setHero({ trust: moveInArray(draft.hero.trust, i, 1) })} onRemove={() => setHero({ trust: draft.hero.trust.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.hero.trust.length - 1} />
                    </div>
                  ))}
                  <AddButton onClick={() => setHero({ trust: [...draft.hero.trust, 'Nuevo claim'] })}>Agregar claim</AddButton>
                </div>
              </Card>
            </Panel>
          )}

          {tab === 'Experiencias' && (
            <Panel title="Experiencias / Paquetes" description="Las opciones de servicio con lo que incluye cada una.">
              <Card>
                <div className="space-y-3">
                  <Grid2>
                    <Field label="Eyebrow"><TextInput value={draft.packages.eyebrow} onChange={(v) => setPackagesMeta({ eyebrow: v })} /></Field>
                    <Field label="Título"><TextInput value={draft.packages.title} onChange={(v) => setPackagesMeta({ title: v })} /></Field>
                  </Grid2>
                  <Field label="Intro"><TextArea value={draft.packages.intro} rows={2} onChange={(v) => setPackagesMeta({ intro: v })} /></Field>
                  <Field label="Nota al pie"><TextInput value={draft.packages.note} onChange={(v) => setPackagesMeta({ note: v })} /></Field>
                </div>
              </Card>
              {draft.packages.items.map((p, i) => (
                <Card key={p.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">Experiencia {i + 1}</span>
                    <ItemControls onUp={() => setPackages(setDraft, moveInArray(draft.packages.items, i, -1))} onDown={() => setPackages(setDraft, moveInArray(draft.packages.items, i, 1))} onRemove={() => setPackages(setDraft, draft.packages.items.filter((x) => x.id !== p.id))} disableUp={i === 0} disableDown={i === draft.packages.items.length - 1} />
                  </div>
                  <Grid2>
                    <Field label="Nombre"><TextInput value={p.name} onChange={(v) => updatePackage(setDraft, p.id, { name: v })} /></Field>
                    <Field label="Precio / etiqueta"><TextInput value={p.price} onChange={(v) => updatePackage(setDraft, p.id, { price: v })} /></Field>
                  </Grid2>
                  <div className="mt-3"><Field label="Descripción"><TextArea value={p.description} rows={2} onChange={(v) => updatePackage(setDraft, p.id, { description: v })} /></Field></div>
                  <label className="mt-3 flex items-center gap-2.5 text-sm text-neutral-200">
                    <input type="checkbox" checked={p.featured} onChange={(e) => updatePackage(setDraft, p.id, { featured: e.target.checked })} className="h-4 w-4 accent-white" />
                    Destacada (resaltada)
                  </label>
                  <div className="mt-3 rounded-lg border border-neutral-800 p-3">
                    <p className="mb-2 text-[11px] uppercase tracking-wider text-neutral-400">Qué incluye</p>
                    <div className="space-y-2">
                      {p.features.map((f, fi) => (
                        <div key={fi} className="flex gap-2">
                          <TextInput value={f} onChange={(v) => updatePackage(setDraft, p.id, { features: p.features.map((x, j) => (j === fi ? v : x)) })} />
                          <ItemControls onUp={() => updatePackage(setDraft, p.id, { features: moveInArray(p.features, fi, -1) })} onDown={() => updatePackage(setDraft, p.id, { features: moveInArray(p.features, fi, 1) })} onRemove={() => updatePackage(setDraft, p.id, { features: p.features.filter((_, j) => j !== fi) })} disableUp={fi === 0} disableDown={fi === p.features.length - 1} />
                        </div>
                      ))}
                      <AddButton onClick={() => updatePackage(setDraft, p.id, { features: [...p.features, 'Nuevo ítem'] })}>Agregar ítem</AddButton>
                    </div>
                  </div>
                </Card>
              ))}
              <AddButton onClick={() => setPackages(setDraft, [...draft.packages.items, { id: uid('pkg'), name: 'Nueva experiencia', price: 'A consultar', description: 'Descripción...', features: ['Incluye...'], featured: false }])}>Agregar experiencia</AddButton>
            </Panel>
          )}

          {tab === 'Sobre mí' && (
            <Panel title="Sobre mí" description="Tu historia y lo que te diferencia.">
              <Card>
                <div className="space-y-4">
                  <Field label="Eyebrow"><TextInput value={draft.about.eyebrow} onChange={(v) => setAbout({ eyebrow: v })} /></Field>
                  <Grid2>
                    <Field label="Título · línea 1"><TextInput value={draft.about.titleLine1} onChange={(v) => setAbout({ titleLine1: v })} /></Field>
                    <Field label="Título · línea 2 (itálica)"><TextInput value={draft.about.titleLine2} onChange={(v) => setAbout({ titleLine2: v })} /></Field>
                  </Grid2>
                  <Field label="Imagen"><ImageInput value={draft.about.image} onChange={(v) => setAbout({ image: v })} /></Field>
                  <Field label="CTA"><TextInput value={draft.about.cta} onChange={(v) => setAbout({ cta: v })} /></Field>
                </div>
              </Card>

              <Card>
                <p className="mb-3 text-sm font-medium text-white">Párrafos</p>
                <div className="space-y-3">
                  {draft.about.paragraphs.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <TextArea value={p} rows={2} onChange={(v) => setAbout({ paragraphs: draft.about.paragraphs.map((x, j) => (j === i ? v : x)) })} />
                      <ItemControls onUp={() => setAbout({ paragraphs: moveInArray(draft.about.paragraphs, i, -1) })} onDown={() => setAbout({ paragraphs: moveInArray(draft.about.paragraphs, i, 1) })} onRemove={() => setAbout({ paragraphs: draft.about.paragraphs.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.about.paragraphs.length - 1} />
                    </div>
                  ))}
                  <AddButton onClick={() => setAbout({ paragraphs: [...draft.about.paragraphs, 'Nuevo párrafo...'] })}>Agregar párrafo</AddButton>
                </div>
              </Card>

              <Card>
                <p className="mb-3 text-sm font-medium text-white">Por qué elegirla (bullets)</p>
                <div className="space-y-2">
                  {draft.about.bullets.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <TextInput value={b} onChange={(v) => setAbout({ bullets: draft.about.bullets.map((x, j) => (j === i ? v : x)) })} />
                      <ItemControls onUp={() => setAbout({ bullets: moveInArray(draft.about.bullets, i, -1) })} onDown={() => setAbout({ bullets: moveInArray(draft.about.bullets, i, 1) })} onRemove={() => setAbout({ bullets: draft.about.bullets.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.about.bullets.length - 1} />
                    </div>
                  ))}
                  <AddButton onClick={() => setAbout({ bullets: [...draft.about.bullets, 'Nuevo punto'] })}>Agregar bullet</AddButton>
                </div>
              </Card>

              <Card>
                <p className="mb-3 text-sm font-medium text-white">Destacados (números)</p>
                <div className="space-y-3">
                  {draft.about.highlights.map((h, i) => (
                    <div key={i} className="flex items-end gap-2">
                      <div className="grid flex-1 grid-cols-2 gap-2">
                        <Field label="Valor"><TextInput value={h.value} onChange={(v) => setAbout({ highlights: draft.about.highlights.map((x, j) => (j === i ? { ...x, value: v } : x)) })} /></Field>
                        <Field label="Etiqueta"><TextInput value={h.label} onChange={(v) => setAbout({ highlights: draft.about.highlights.map((x, j) => (j === i ? { ...x, label: v } : x)) })} /></Field>
                      </div>
                      <ItemControls onUp={() => setAbout({ highlights: moveInArray(draft.about.highlights, i, -1) })} onDown={() => setAbout({ highlights: moveInArray(draft.about.highlights, i, 1) })} onRemove={() => setAbout({ highlights: draft.about.highlights.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.about.highlights.length - 1} />
                    </div>
                  ))}
                  <AddButton onClick={() => setAbout({ highlights: [...draft.about.highlights, { value: '00', label: 'nuevo' }] })}>Agregar destacado</AddButton>
                </div>
              </Card>
            </Panel>
          )}

          {tab === 'Servicios' && (
            <Panel title="Servicios" description="Agregá, editá, reordená o eliminá servicios.">
              {draft.services.map((s, i) => (
                <Card key={s.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">Servicio {i + 1}</span>
                    <ItemControls onUp={() => setDraft((d) => ({ ...d, services: moveInArray(d.services, i, -1) }))} onDown={() => setDraft((d) => ({ ...d, services: moveInArray(d.services, i, 1) }))} onRemove={() => setDraft((d) => ({ ...d, services: d.services.filter((x) => x.id !== s.id) }))} disableUp={i === 0} disableDown={i === draft.services.length - 1} />
                  </div>
                  <div className="space-y-3">
                    <Field label="Título"><TextInput value={s.title} onChange={(v) => updateService(setDraft, s.id, { title: v })} /></Field>
                    <Field label="Descripción"><TextArea value={s.description} onChange={(v) => updateService(setDraft, s.id, { description: v })} /></Field>
                    <Field label="Imagen"><ImageInput value={s.image} onChange={(v) => updateService(setDraft, s.id, { image: v })} /></Field>
                  </div>
                </Card>
              ))}
              <AddButton onClick={() => setDraft((d) => ({ ...d, services: [...d.services, { id: uid('svc'), title: 'Nuevo servicio', description: 'Descripción del servicio...', image: '/images/mk-eye-2.svg' }] }))}>Agregar servicio</AddButton>
            </Panel>
          )}

          {tab === 'Portfolio' && (
            <Panel title="Portfolio" description="Categorías y proyectos. Cada proyecto puede tener varias imágenes.">
              <Card>
                <div className="space-y-3">
                  <Grid2>
                    <Field label="Eyebrow"><TextInput value={draft.portfolio.eyebrow} onChange={(v) => setPortfolioMeta({ eyebrow: v })} /></Field>
                    <Field label="Título"><TextInput value={draft.portfolio.title} onChange={(v) => setPortfolioMeta({ title: v })} /></Field>
                  </Grid2>
                  <Field label="Intro"><TextArea value={draft.portfolio.intro} rows={2} onChange={(v) => setPortfolioMeta({ intro: v })} /></Field>
                </div>
              </Card>

              {/* Categorías */}
              <div>
                <p className="mb-3 text-sm font-semibold text-white">Categorías</p>
                <div className="space-y-3">
                  {draft.portfolio.categories.map((c, i) => (
                    <Card key={c.id}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-neutral-500">Categoría {i + 1}</span>
                        <ItemControls onUp={() => setCategories(setDraft, moveInArray(draft.portfolio.categories, i, -1))} onDown={() => setCategories(setDraft, moveInArray(draft.portfolio.categories, i, 1))} onRemove={() => removeCategory(setDraft, c.id)} disableUp={i === 0} disableDown={i === draft.portfolio.categories.length - 1} />
                      </div>
                      <Grid2>
                        <Field label="Nombre"><TextInput value={c.name} onChange={(v) => updateCategory(setDraft, c.id, { name: v })} /></Field>
                        <Field label="Slug" hint="Identificador en la URL (sin espacios)"><TextInput value={c.slug} onChange={(v) => updateCategory(setDraft, c.id, { slug: slugify(v) })} /></Field>
                      </Grid2>
                      <div className="mt-3"><Field label="Descripción"><TextArea value={c.description} rows={2} onChange={(v) => updateCategory(setDraft, c.id, { description: v })} /></Field></div>
                      <div className="mt-3"><Field label="Portada"><ImageInput value={c.cover} onChange={(v) => updateCategory(setDraft, c.id, { cover: v })} /></Field></div>
                    </Card>
                  ))}
                  <AddButton onClick={() => addCategory(setDraft)}>Agregar categoría</AddButton>
                </div>
              </div>

              {/* Proyectos */}
              <div>
                <p className="mb-3 mt-2 text-sm font-semibold text-white">Proyectos</p>
                <div className="space-y-3">
                  {draft.portfolio.projects.map((p, i) => (
                    <Card key={p.id}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-neutral-500">Proyecto {i + 1}</span>
                        <ItemControls onUp={() => setProjects(setDraft, moveInArray(draft.portfolio.projects, i, -1))} onDown={() => setProjects(setDraft, moveInArray(draft.portfolio.projects, i, 1))} onRemove={() => removeProject(setDraft, p.id)} disableUp={i === 0} disableDown={i === draft.portfolio.projects.length - 1} />
                      </div>
                      <div className="space-y-3">
                        <Field label="Título del proyecto" hint='Ej: "Sofía — Boda en Recoleta"'><TextInput value={p.title} onChange={(v) => updateProject(setDraft, p.id, { title: v })} /></Field>
                        <Grid2>
                          <Field label="Categoría">
                            <select value={p.categoryId} onChange={(e) => updateProject(setDraft, p.id, { categoryId: e.target.value })} className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-neutral-400">
                              {draft.portfolio.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </Field>
                          <Field label="Tipo de evento"><TextInput value={p.eventType} onChange={(v) => updateProject(setDraft, p.id, { eventType: v })} /></Field>
                          <Field label="Ubicación"><TextInput value={p.location} onChange={(v) => updateProject(setDraft, p.id, { location: v })} /></Field>
                          <Field label="Fecha / año"><TextInput value={p.date} onChange={(v) => updateProject(setDraft, p.id, { date: v })} /></Field>
                        </Grid2>
                        <Field label="Descripción / objetivo del look"><TextArea value={p.description} onChange={(v) => updateProject(setDraft, p.id, { description: v })} /></Field>
                        <label className="flex items-center gap-2.5 text-sm text-neutral-200">
                          <input type="checkbox" checked={p.featured} onChange={(e) => updateProject(setDraft, p.id, { featured: e.target.checked })} className="h-4 w-4 accent-white" />
                          Destacado en la Home
                        </label>

                        <div className="rounded-lg border border-neutral-800 p-3">
                          <p className="mb-2 text-[11px] uppercase tracking-wider text-neutral-400">Imágenes del proyecto</p>
                          <div className="space-y-3">
                            {p.images.map((im, ii) => (
                              <div key={im.id} className="rounded-md border border-neutral-800 bg-neutral-950/50 p-2.5">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="text-[10px] uppercase tracking-wider text-neutral-600">Imagen {ii + 1}</span>
                                  <ItemControls onUp={() => updateProject(setDraft, p.id, { images: moveInArray(p.images, ii, -1) })} onDown={() => updateProject(setDraft, p.id, { images: moveInArray(p.images, ii, 1) })} onRemove={() => updateProject(setDraft, p.id, { images: p.images.filter((x) => x.id !== im.id) })} disableUp={ii === 0} disableDown={ii === p.images.length - 1} />
                                </div>
                                <Field label="Etiqueta (qué muestra)"><TextInput value={im.caption} onChange={(v) => updateProject(setDraft, p.id, { images: p.images.map((x) => (x.id === im.id ? { ...x, caption: v } : x)) })} /></Field>
                                <div className="mt-2"><ImageInput value={im.src} onChange={(v) => updateProject(setDraft, p.id, { images: p.images.map((x) => (x.id === im.id ? { ...x, src: v } : x)) })} /></div>
                              </div>
                            ))}
                            <AddButton onClick={() => updateProject(setDraft, p.id, { images: [...p.images, { id: uid('im'), src: '/images/mk-glow-1.svg', caption: 'Nueva imagen' }] })}>Agregar imagen</AddButton>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <AddButton onClick={() => addProject(setDraft)}>Agregar proyecto</AddButton>
                </div>
              </div>
            </Panel>
          )}

          {tab === 'Proceso' && (
            <Panel title="Cómo trabajo" description="Los pasos que seguís con cada clienta.">
              <Card>
                <Grid2>
                  <Field label="Eyebrow"><TextInput value={draft.process.eyebrow} onChange={(v) => setProcess({ eyebrow: v })} /></Field>
                  <Field label="Título"><TextInput value={draft.process.title} onChange={(v) => setProcess({ title: v })} /></Field>
                </Grid2>
                <div className="mt-3"><Field label="Intro"><TextArea value={draft.process.intro} rows={2} onChange={(v) => setProcess({ intro: v })} /></Field></div>
              </Card>
              {draft.process.steps.map((st, i) => (
                <Card key={st.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">Paso {i + 1}</span>
                    <ItemControls onUp={() => setProcess({ steps: moveInArray(draft.process.steps, i, -1) })} onDown={() => setProcess({ steps: moveInArray(draft.process.steps, i, 1) })} onRemove={() => setProcess({ steps: draft.process.steps.filter((x) => x.id !== st.id) })} disableUp={i === 0} disableDown={i === draft.process.steps.length - 1} />
                  </div>
                  <Grid2>
                    <Field label="Número"><TextInput value={st.step} onChange={(v) => setProcess({ steps: draft.process.steps.map((x) => (x.id === st.id ? { ...x, step: v } : x)) })} /></Field>
                    <Field label="Título"><TextInput value={st.title} onChange={(v) => setProcess({ steps: draft.process.steps.map((x) => (x.id === st.id ? { ...x, title: v } : x)) })} /></Field>
                  </Grid2>
                  <div className="mt-3"><Field label="Descripción"><TextArea value={st.description} rows={2} onChange={(v) => setProcess({ steps: draft.process.steps.map((x) => (x.id === st.id ? { ...x, description: v } : x)) })} /></Field></div>
                </Card>
              ))}
              <AddButton onClick={() => setProcess({ steps: [...draft.process.steps, { id: uid('st'), step: String(draft.process.steps.length + 1).padStart(2, '0'), title: 'Nuevo paso', description: 'Descripción...' }] })}>Agregar paso</AddButton>
            </Panel>
          )}

          {tab === 'Novias' && (
            <Panel title="Especial novias" description="La sección clave para vender el servicio de novias.">
              <Card>
                <div className="space-y-3">
                  <Field label="Eyebrow"><TextInput value={draft.bridal.eyebrow} onChange={(v) => setBridal({ eyebrow: v })} /></Field>
                  <Grid2>
                    <Field label="Título · línea 1"><TextInput value={draft.bridal.titleLine1} onChange={(v) => setBridal({ titleLine1: v })} /></Field>
                    <Field label="Título · línea 2 (itálica)"><TextInput value={draft.bridal.titleLine2} onChange={(v) => setBridal({ titleLine2: v })} /></Field>
                  </Grid2>
                  <Field label="Intro"><TextArea value={draft.bridal.intro} onChange={(v) => setBridal({ intro: v })} /></Field>
                  <Field label="Aviso de disponibilidad / urgencia"><TextInput value={draft.bridal.availabilityNote} onChange={(v) => setBridal({ availabilityNote: v })} /></Field>
                  <Field label="CTA"><TextInput value={draft.bridal.cta} onChange={(v) => setBridal({ cta: v })} /></Field>
                  <Field label="Imagen"><ImageInput value={draft.bridal.image} onChange={(v) => setBridal({ image: v })} /></Field>
                </div>
              </Card>
              <Card>
                <p className="mb-3 text-sm font-medium text-white">Puntos</p>
                <div className="space-y-3">
                  {draft.bridal.points.map((pt, i) => (
                    <div key={i} className="rounded-md border border-neutral-800 bg-neutral-950/50 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-600">Punto {i + 1}</span>
                        <ItemControls onUp={() => setBridal({ points: moveInArray(draft.bridal.points, i, -1) })} onDown={() => setBridal({ points: moveInArray(draft.bridal.points, i, 1) })} onRemove={() => setBridal({ points: draft.bridal.points.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.bridal.points.length - 1} />
                      </div>
                      <Field label="Título"><TextInput value={pt.title} onChange={(v) => setBridal({ points: draft.bridal.points.map((x, j) => (j === i ? { ...x, title: v } : x)) })} /></Field>
                      <div className="mt-2"><Field label="Descripción"><TextArea value={pt.description} rows={2} onChange={(v) => setBridal({ points: draft.bridal.points.map((x, j) => (j === i ? { ...x, description: v } : x)) })} /></Field></div>
                    </div>
                  ))}
                  <AddButton onClick={() => setBridal({ points: [...draft.bridal.points, { title: 'Nuevo punto', description: 'Descripción...' }] })}>Agregar punto</AddButton>
                </div>
              </Card>
            </Panel>
          )}

          {tab === 'Testimonios' && (
            <Panel title="Testimonios" description="Reseñas de tus clientas, con categoría asociada.">
              <Card>
                <Grid2>
                  <Field label="Eyebrow"><TextInput value={draft.testimonials.eyebrow} onChange={(v) => setTestimonialsMeta({ eyebrow: v })} /></Field>
                  <Field label="Título"><TextInput value={draft.testimonials.title} onChange={(v) => setTestimonialsMeta({ title: v })} /></Field>
                  <Field label="Rating (ej: 5.0)"><TextInput value={draft.testimonials.rating} onChange={(v) => setTestimonialsMeta({ rating: v })} /></Field>
                  <Field label="Texto del rating"><TextInput value={draft.testimonials.ratingLabel} onChange={(v) => setTestimonialsMeta({ ratingLabel: v })} /></Field>
                </Grid2>
              </Card>
              {draft.testimonials.items.map((t, i) => (
                <Card key={t.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">Testimonio {i + 1}</span>
                    <ItemControls onUp={() => setTestimonials(setDraft, moveInArray(draft.testimonials.items, i, -1))} onDown={() => setTestimonials(setDraft, moveInArray(draft.testimonials.items, i, 1))} onRemove={() => setTestimonials(setDraft, draft.testimonials.items.filter((x) => x.id !== t.id))} disableUp={i === 0} disableDown={i === draft.testimonials.items.length - 1} />
                  </div>
                  <Grid2>
                    <Field label="Nombre"><TextInput value={t.name} onChange={(v) => updateTestimonial(setDraft, t.id, { name: v })} /></Field>
                    <Field label="Rol"><TextInput value={t.role} onChange={(v) => updateTestimonial(setDraft, t.id, { role: v })} /></Field>
                  </Grid2>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Categoría asociada">
                      <select value={t.categorySlug ?? ''} onChange={(e) => updateTestimonial(setDraft, t.id, { categorySlug: e.target.value || undefined })} className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-neutral-400">
                        <option value="">(ninguna)</option>
                        {draft.portfolio.categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </Field>
                    <Field label="Origen (ej: Google, Instagram)"><TextInput value={t.source ?? ''} onChange={(v) => updateTestimonial(setDraft, t.id, { source: v || undefined })} /></Field>
                  </div>
                  <div className="mt-3"><Field label="Testimonio"><TextArea value={t.quote} onChange={(v) => updateTestimonial(setDraft, t.id, { quote: v })} /></Field></div>
                </Card>
              ))}
              <AddButton onClick={() => setTestimonials(setDraft, [...draft.testimonials.items, { id: uid('tst'), name: 'Nombre A.', role: 'Cliente', quote: 'Testimonio...' }])}>Agregar testimonio</AddButton>
            </Panel>
          )}

          {tab === 'FAQ' && (
            <Panel title="Preguntas frecuentes" description="Resuelven dudas y suman SEO. Se publican como FAQ en Google.">
              <Card>
                <Grid2>
                  <Field label="Eyebrow"><TextInput value={draft.faq.eyebrow} onChange={(v) => setFaqMeta({ eyebrow: v })} /></Field>
                  <Field label="Título"><TextInput value={draft.faq.title} onChange={(v) => setFaqMeta({ title: v })} /></Field>
                </Grid2>
                <div className="mt-3"><Field label="Intro"><TextArea value={draft.faq.intro} rows={2} onChange={(v) => setFaqMeta({ intro: v })} /></Field></div>
              </Card>
              {draft.faq.items.map((f, i) => (
                <Card key={f.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">Pregunta {i + 1}</span>
                    <ItemControls onUp={() => setFaqItems(setDraft, moveInArray(draft.faq.items, i, -1))} onDown={() => setFaqItems(setDraft, moveInArray(draft.faq.items, i, 1))} onRemove={() => setFaqItems(setDraft, draft.faq.items.filter((x) => x.id !== f.id))} disableUp={i === 0} disableDown={i === draft.faq.items.length - 1} />
                  </div>
                  <Field label="Pregunta"><TextInput value={f.question} onChange={(v) => updateFaq(setDraft, f.id, { question: v })} /></Field>
                  <div className="mt-3"><Field label="Respuesta"><TextArea value={f.answer} onChange={(v) => updateFaq(setDraft, f.id, { answer: v })} /></Field></div>
                </Card>
              ))}
              <AddButton onClick={() => setFaqItems(setDraft, [...draft.faq.items, { id: uid('faq'), question: 'Nueva pregunta', answer: 'Respuesta...' }])}>Agregar pregunta</AddButton>
            </Panel>
          )}

          {tab === 'Contacto' && (
            <Panel title="Contacto / Formulario" description="Textos del formulario de reserva y tipos de evento.">
              <Card>
                <div className="space-y-3">
                  <Grid2>
                    <Field label="Eyebrow"><TextInput value={draft.contact.eyebrow} onChange={(v) => setContact({ eyebrow: v })} /></Field>
                    <Field label="Título"><TextInput value={draft.contact.title} onChange={(v) => setContact({ title: v })} /></Field>
                  </Grid2>
                  <Field label="Intro"><TextArea value={draft.contact.intro} rows={2} onChange={(v) => setContact({ intro: v })} /></Field>
                </div>
              </Card>
              <Card>
                <p className="mb-3 text-sm font-medium text-white">Tipos de evento (opciones del formulario)</p>
                <div className="space-y-2">
                  {draft.contact.eventTypes.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <TextInput value={b} onChange={(v) => setContact({ eventTypes: draft.contact.eventTypes.map((x, j) => (j === i ? v : x)) })} />
                      <ItemControls onUp={() => setContact({ eventTypes: moveInArray(draft.contact.eventTypes, i, -1) })} onDown={() => setContact({ eventTypes: moveInArray(draft.contact.eventTypes, i, 1) })} onRemove={() => setContact({ eventTypes: draft.contact.eventTypes.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.contact.eventTypes.length - 1} />
                    </div>
                  ))}
                  <AddButton onClick={() => setContact({ eventTypes: [...draft.contact.eventTypes, 'Nuevo tipo'] })}>Agregar tipo</AddButton>
                </div>
              </Card>
            </Panel>
          )}

          {tab === 'Conversión' && (
            <Panel title="Conversión (Google Ads + CTA final)" description="Bloques pensados para campañas y cierre.">
              <Card>
                <p className="mb-3 text-sm font-medium text-white">Bloque Google Ads</p>
                <div className="space-y-3">
                  <Grid2>
                    <Field label="Eyebrow"><TextInput value={draft.ads.eyebrow} onChange={(v) => setAds({ eyebrow: v })} /></Field>
                    <Field label="CTA"><TextInput value={draft.ads.cta} onChange={(v) => setAds({ cta: v })} /></Field>
                  </Grid2>
                  <Field label="Título"><TextInput value={draft.ads.title} onChange={(v) => setAds({ title: v })} /></Field>
                  <Field label="Texto"><TextArea value={draft.ads.text} onChange={(v) => setAds({ text: v })} /></Field>
                  <div>
                    <p className="mb-2 text-[11px] uppercase tracking-wider text-neutral-400">Beneficios</p>
                    <div className="space-y-2">
                      {draft.ads.benefits.map((b, i) => (
                        <div key={i} className="flex gap-2">
                          <TextInput value={b} onChange={(v) => setAds({ benefits: draft.ads.benefits.map((x, j) => (j === i ? v : x)) })} />
                          <ItemControls onUp={() => setAds({ benefits: moveInArray(draft.ads.benefits, i, -1) })} onDown={() => setAds({ benefits: moveInArray(draft.ads.benefits, i, 1) })} onRemove={() => setAds({ benefits: draft.ads.benefits.filter((_, j) => j !== i) })} disableUp={i === 0} disableDown={i === draft.ads.benefits.length - 1} />
                        </div>
                      ))}
                      <AddButton onClick={() => setAds({ benefits: [...draft.ads.benefits, 'Nuevo beneficio'] })}>Agregar beneficio</AddButton>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <p className="mb-3 text-sm font-medium text-white">CTA final</p>
                <div className="space-y-3">
                  <Field label="Eyebrow"><TextInput value={draft.finalCta.eyebrow} onChange={(v) => setFinalCta({ eyebrow: v })} /></Field>
                  <Grid2>
                    <Field label="Título · línea 1"><TextInput value={draft.finalCta.titleLine1} onChange={(v) => setFinalCta({ titleLine1: v })} /></Field>
                    <Field label="Título · línea 2 (itálica)"><TextInput value={draft.finalCta.titleLine2} onChange={(v) => setFinalCta({ titleLine2: v })} /></Field>
                  </Grid2>
                  <Field label="Texto"><TextArea value={draft.finalCta.text} onChange={(v) => setFinalCta({ text: v })} /></Field>
                  <Field label="CTA"><TextInput value={draft.finalCta.cta} onChange={(v) => setFinalCta({ cta: v })} /></Field>
                </div>
              </Card>
            </Panel>
          )}

          {tab === 'SEO' && (
            <Panel title="SEO" description="Metadatos para Google y redes sociales.">
              <Card>
                <div className="space-y-3">
                  <Field label="Título SEO"><TextInput value={draft.seo.title} onChange={(v) => setSeo({ title: v })} /></Field>
                  <Field label="Descripción SEO"><TextArea value={draft.seo.description} onChange={(v) => setSeo({ description: v })} /></Field>
                  <Field label="Keywords" hint="Separadas por coma."><TextArea value={draft.seo.keywords.join(', ')} rows={2} onChange={(v) => setSeo({ keywords: v.split(',').map((x) => x.trim()).filter(Boolean) })} /></Field>
                  <Grid2>
                    <Field label="URL del sitio"><TextInput value={draft.seo.siteUrl} onChange={(v) => setSeo({ siteUrl: v })} /></Field>
                    <Field label="Imagen Open Graph"><TextInput value={draft.seo.ogImage} onChange={(v) => setSeo({ ogImage: v })} /></Field>
                  </Grid2>
                  <p className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-3 text-[12px] text-amber-200/80">
                    Nota: el título, descripción y JSON-LD que indexa Google se toman del contenido por defecto en
                    <code className="mx-1 rounded bg-black/40 px-1">src/lib/content.ts</code>
                    (se renderizan en el servidor). Editá ese archivo para el SEO base; estos campos controlan los textos del sitio.
                  </p>
                </div>
              </Card>
            </Panel>
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-lg">{toast}</div>
      )}
    </div>
  );
}

/* ── Helpers de actualización ───────────────────────────────────────── */
function updateService(setDraft: Setter, id: string, patch: Partial<Service>) {
  setDraft((d) => ({ ...d, services: d.services.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
}
function setTestimonials(setDraft: Setter, items: SiteContent['testimonials']['items']) {
  setDraft((d) => ({ ...d, testimonials: { ...d.testimonials, items } }));
}
function updateTestimonial(setDraft: Setter, id: string, patch: Partial<SiteContent['testimonials']['items'][number]>) {
  setDraft((d) => ({ ...d, testimonials: { ...d.testimonials, items: d.testimonials.items.map((x) => (x.id === id ? { ...x, ...patch } : x)) } }));
}

/* Categorías */
function setCategories(setDraft: Setter, categories: PortfolioCategory[]) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, categories } }));
}
function updateCategory(setDraft: Setter, id: string, patch: Partial<PortfolioCategory>) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, categories: d.portfolio.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) } }));
}
function addCategory(setDraft: Setter) {
  const id = uid('cat');
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, categories: [...d.portfolio.categories, { id, name: 'Nueva categoría', slug: `cat-${d.portfolio.categories.length + 1}`, description: 'Descripción...', cover: '/images/mk-glow-1.svg' }] } }));
}
function removeCategory(setDraft: Setter, id: string) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, categories: d.portfolio.categories.filter((c) => c.id !== id) } }));
}

/* Proyectos */
function setProjects(setDraft: Setter, projects: PortfolioProject[]) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, projects } }));
}
function updateProject(setDraft: Setter, id: string, patch: Partial<PortfolioProject>) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, projects: d.portfolio.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) } }));
}
function addProject(setDraft: Setter) {
  setDraft((d) => {
    const categoryId = d.portfolio.categories[0]?.id ?? '';
    const project: PortfolioProject = {
      id: uid('pr'),
      title: 'Nuevo proyecto',
      categoryId,
      description: 'Objetivo del look...',
      location: 'CABA',
      date: String(new Date().getFullYear()),
      eventType: 'Evento',
      featured: false,
      images: [{ id: uid('im'), src: '/images/mk-glow-1.svg', caption: 'Resultado final' }],
    };
    return { ...d, portfolio: { ...d.portfolio, projects: [...d.portfolio.projects, project] } };
  });
}
function removeProject(setDraft: Setter, id: string) {
  setDraft((d) => ({ ...d, portfolio: { ...d.portfolio, projects: d.portfolio.projects.filter((p) => p.id !== id) } }));
}

/* Paquetes / experiencias */
function setPackages(setDraft: Setter, items: SiteContent['packages']['items']) {
  setDraft((d) => ({ ...d, packages: { ...d.packages, items } }));
}
function updatePackage(setDraft: Setter, id: string, patch: Partial<SiteContent['packages']['items'][number]>) {
  setDraft((d) => ({ ...d, packages: { ...d.packages, items: d.packages.items.map((p) => (p.id === id ? { ...p, ...patch } : p)) } }));
}

/* FAQ */
function setFaqItems(setDraft: Setter, items: SiteContent['faq']['items']) {
  setDraft((d) => ({ ...d, faq: { ...d.faq, items } }));
}
function updateFaq(setDraft: Setter, id: string, patch: Partial<SiteContent['faq']['items'][number]>) {
  setDraft((d) => ({ ...d, faq: { ...d.faq, items: d.faq.items.map((f) => (f.id === id ? { ...f, ...patch } : f)) } }));
}
