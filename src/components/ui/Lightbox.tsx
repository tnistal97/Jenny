'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Close } from './icons';

export interface LightboxImage {
  src: string;
  title?: string;
  subtitle?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null && images.length > 0;
  const item = open ? images[index as number] : null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onNavigate((index + dir + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title || 'Imagen'}
        >
          <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink">
            <Close className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink sm:left-6">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Siguiente" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-ink sm:right-6">
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.figure
            key={item.src + String(index)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[64vh] w-full overflow-hidden rounded-lg">
              <Image src={item.src} alt={item.title || 'Imagen del portfolio'} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-contain" />
            </div>
            {(item.title || item.subtitle) && (
              <figcaption className="mt-5 max-w-xl text-center">
                {item.subtitle ? <p className="text-[11px] uppercase tracking-label text-cream/50">{item.subtitle}</p> : null}
                {item.title ? <h3 className="mt-2 font-display text-2xl text-cream">{item.title}</h3> : null}
                {images.length > 1 ? <p className="mt-2 text-xs text-cream/40">{(index as number) + 1} / {images.length}</p> : null}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
