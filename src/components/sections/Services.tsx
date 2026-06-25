'use client';

import Image from 'next/image';
import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight, serviceIcons } from '@/components/ui/icons';
import type { Service } from '@/types/content';

export function Services() {
  const { services } = useContent();

  return (
    <section id="servicios" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-container px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Servicios"
            title={
              <>
                Un servicio para
                <br />
                <span className="italic">cada momento.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-stone md:text-right">
              Maquillaje a medida para novias, eventos, producciones y aprendizaje. Elegí la
              experiencia ideal para vos.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { general } = useContent();
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? serviceIcons.asesoria;
  const href = buildWhatsAppUrl(
    general.whatsapp,
    `Hola Jennifer! Quería consultar por "${service.title}". ¿Tenés disponibilidad?`,
  );

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-tl-[1.75rem] rounded-br-[1.75rem] bg-beige">
        <Image
          src={service.image}
          alt={service.title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-ink backdrop-blur">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="font-display text-2xl text-ink">{service.title}</h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-stone">{service.description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-ink"
        >
          Consultar
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-lux group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
