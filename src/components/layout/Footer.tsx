'use client';

import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl, instagramUrl, tiktokUrl, mailtoUrl } from '@/lib/whatsapp';
import { Instagram, TikTok, Whatsapp, Mail } from '@/components/ui/icons';

const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Trabajos', href: '/#portfolio' },
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Instagram', href: '/#instagram' },
];

export function Footer() {
  const { general, services } = useContent();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Whatsapp, href: buildWhatsAppUrl(general.whatsapp, general.whatsappMessage), label: 'WhatsApp' },
    { icon: Instagram, href: instagramUrl(general.instagram), label: 'Instagram' },
    ...(general.tiktok ? [{ icon: TikTok, href: tiktokUrl(general.tiktok), label: 'TikTok' }] : []),
    { icon: Mail, href: mailtoUrl(general.email), label: 'Email' },
  ];

  return (
    <footer id="footer" className="bg-ink text-cream">
      <div className="mx-auto max-w-container px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-cream/25 font-display text-xl">
                J
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg">{general.name}</span>
                <span className="block text-[9px] uppercase tracking-label text-cream/50">
                  {general.role}
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              Maquillaje profesional con identidad. Belleza natural, elegante y de larga duración.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/80 transition-all duration-500 ease-lux hover:border-cream hover:bg-cream hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-2">
            <FooterTitle>Navegación</FooterTitle>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-cream/60 transition-colors hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div className="lg:col-span-3">
            <FooterTitle>Servicios</FooterTitle>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="text-sm text-cream/60">
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <FooterTitle>Contacto</FooterTitle>
            <ul className="mt-5 space-y-3 text-sm text-cream/60">
              <li>
                <a href={mailtoUrl(general.email)} className="transition-colors hover:text-cream">
                  {general.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(general.whatsapp, general.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  WhatsApp · +{general.whatsapp}
                </a>
              </li>
              <li>{general.zone}</li>
              <li>{general.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/40">
            © {year} {general.name} {general.role}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-cream/40">
            Belleza auténtica · Resultados memorables · {general.zone}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] uppercase tracking-label text-cream/40">{children}</h3>;
}
