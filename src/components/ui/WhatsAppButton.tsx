'use client';

import type { ReactNode } from 'react';
import { useContent } from '@/lib/content-context';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsApp } from '@/lib/analytics';
import { ButtonLink } from './Button';
import { Whatsapp } from './icons';

interface WhatsAppButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'light' | 'outline' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  /** Mensaje opcional que sobreescribe el general. */
  message?: string;
  withIcon?: boolean;
  /** Etiqueta de origen para analytics, ej: "hero", "novias". */
  source?: string;
}

/** CTA que abre WhatsApp con el número y mensaje configurados en /admin. */
export function WhatsAppButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  message,
  withIcon = true,
  source = 'cta',
}: WhatsAppButtonProps) {
  const { general } = useContent();
  const href = buildWhatsAppUrl(general.whatsapp, message ?? general.whatsappMessage);

  return (
    <ButtonLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      icon={withIcon ? <Whatsapp className="h-4 w-4" /> : undefined}
      aria-label="Escribir por WhatsApp"
      onClick={() => trackWhatsApp(source)}
    >
      {children}
    </ButtonLink>
  );
}
