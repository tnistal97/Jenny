'use client';

import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Check, ArrowRight } from '@/components/ui/icons';
import type { Package } from '@/types/content';

export function Packages() {
  const { packages } = useContent();

  return (
    <section id="experiencias" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow={packages.eyebrow} title={packages.title} intro={packages.intro} align="center" className="max-w-2xl" />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[12px] leading-relaxed text-stone">{packages.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const { general } = useContent();
  const href = buildWhatsAppUrl(general.whatsapp, `Hola Jennifer! Quería consultar precio y disponibilidad para "${pkg.name}". ¿Me pasás info?`);
  const dark = pkg.featured;

  return (
    <div className={`flex h-full flex-col rounded-tl-[1.75rem] rounded-br-[1.75rem] border p-8 transition-shadow duration-500 ${dark ? 'border-ink bg-ink text-cream shadow-[0_24px_60px_-32px_rgba(22,18,14,0.7)]' : 'border-ink/10 bg-cream text-ink hover:shadow-[0_18px_50px_-30px_rgba(22,18,14,0.4)]'}`}>
      {dark ? <span className="mb-4 inline-block w-fit rounded-full bg-rose/90 px-3 py-1 text-[10px] uppercase tracking-wide2 text-ink">Más elegido</span> : null}
      <h3 className="font-display text-2xl">{pkg.name}</h3>
      <p className={`mt-1 text-[13px] leading-relaxed ${dark ? 'text-cream/65' : 'text-stone'}`}>{pkg.description}</p>
      <p className="mt-5 font-display text-3xl">{pkg.price}</p>

      <ul className="mt-6 flex-1 space-y-3 border-t pt-6" style={{ borderColor: dark ? 'rgba(251,249,245,0.15)' : 'rgba(22,18,14,0.1)' }}>
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px]">
            <span className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${dark ? 'bg-cream text-ink' : 'bg-ink text-cream'}`}>
              <Check className="h-3 w-3" />
            </span>
            <span className={dark ? 'text-cream/85' : 'text-charcoal'}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsApp(`package_${pkg.id}`)}
        className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[12px] uppercase tracking-wide2 transition-all duration-500 ease-lux ${dark ? 'bg-cream text-ink hover:bg-white' : 'bg-ink text-cream hover:bg-charcoal'}`}
      >
        Consultar
        <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover:translate-x-1" />
      </a>
    </div>
  );
}
