import Image from 'next/image';
import type { ReactNode } from 'react';

interface PhotoFrameProps {
  src: string;
  alt: string;
  /** Clases del contenedor: aspecto, redondeo, etc. */
  className?: string;
  /** Clases extra sobre la imagen (ej: zoom en hover). */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Intensidad del degradado inferior (para texto encima). */
  overlay?: 'none' | 'soft' | 'strong';
  children?: ReactNode;
}

const overlays = {
  none: '',
  soft: 'bg-gradient-to-t from-ink/45 via-ink/0 to-transparent',
  strong: 'bg-gradient-to-t from-ink/70 via-ink/15 to-transparent',
};

/**
 * Marco fotográfico con tratamiento editorial UNIFICADO: calidez + grano + viñeta sutil.
 * Hace que placeholders y futuras fotos reales se vean como una sola campaña cohesiva.
 */
export function PhotoFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  sizes,
  priority,
  overlay = 'none',
  children,
}: PhotoFrameProps) {
  return (
    <div className={`group/photo relative overflow-hidden bg-beige ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes ?? '(max-width: 1024px) 100vw, 50vw'}
        className={`object-cover ${imgClassName}`}
      />
      {/* Calidez de campaña */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[#3a281c] opacity-[0.05] mix-blend-multiply" />
      {/* Grano fino */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Viñeta */}
      <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(20,16,12,0.22)]" />
      {/* Degradado para texto */}
      {overlay !== 'none' ? <span aria-hidden className={`pointer-events-none absolute inset-0 ${overlays[overlay]}`} /> : null}
      {children}
    </div>
  );
}
