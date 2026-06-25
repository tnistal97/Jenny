'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Close } from '@/components/ui/icons';

const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Novias', href: '/#novias' },
  { label: 'Testimonios', href: '/#testimonios' },
  { label: 'Contacto', href: '/#contacto' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lux ${
        scrolled
          ? 'border-b border-ink/5 bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[12px] uppercase tracking-wide2 text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink transition-all duration-500 ease-lux group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <WhatsAppButton size="md" withIcon={false}>
              Reservar cita
            </WhatsAppButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Abrir menú"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-canvas lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-6 sm:px-8">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center"
                aria-label="Cerrar menú"
              >
                <Close className="h-6 w-6 text-ink" />
              </button>
            </div>

            <nav className="flex flex-col px-6 pt-8 sm:px-8" aria-label="Navegación móvil">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-ink/10 py-5 font-display text-3xl text-ink"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-10">
                <WhatsAppButton size="lg" className="w-full">
                  Reservar cita
                </WhatsAppButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
