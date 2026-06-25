'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';
import { Whatsapp } from './icons';

/**
 * Barra de conversión fija en mobile (oculta en desktop, donde está el botón flotante).
 * Aparece al hacer scroll y se esconde al llegar al fondo para no tapar el footer.
 */
export function MobileCtaBar() {
  const { general } = useContent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.body.scrollHeight - 160;
      setShow(y > 500 && !nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = buildWhatsAppUrl(general.whatsapp, general.whatsappMessage);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-canvas/95 px-4 py-3 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('mobile_bar')}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[12px] uppercase tracking-wide2 text-cream"
            >
              <Whatsapp className="h-4 w-4" /> Reservar por WhatsApp
            </a>
            <a
              href="#experiencias"
              className="grid h-12 w-12 flex-none place-items-center rounded-full border border-ink/20 text-[11px] uppercase tracking-wide2 text-ink"
              aria-label="Ver experiencias y precios"
            >
              $
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
