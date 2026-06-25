'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';
import { Whatsapp } from './icons';

/** Botón flotante de WhatsApp (aparece al hacer scroll). */
export function FloatingWhatsApp() {
  const { general } = useContent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = buildWhatsAppUrl(general.whatsapp, general.whatsappMessage);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          onClick={() => trackWhatsApp('floating')}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 lg:flex"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
          <Whatsapp className="relative h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
