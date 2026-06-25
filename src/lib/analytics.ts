// Tracking liviano para Google Ads / GA4. Funciona aunque no haya tag configurado:
// siempre empuja a dataLayer (para GTM) y, si existe gtag, dispara el evento.
// Configurá NEXT_PUBLIC_GTAG_ID (GA4/Ads) y NEXT_PUBLIC_GADS_CONVERSION (label de conversión).

type Params = Record<string, unknown>;

interface WindowWithGtag extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as WindowWithGtag;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params);
  }
}

/** Clic en cualquier CTA de WhatsApp → evento de lead + conversión de Ads. */
export function trackWhatsApp(source: string): void {
  track('whatsapp_click', { source, lead_channel: 'whatsapp' });
  if (typeof window === 'undefined') return;
  const w = window as WindowWithGtag;
  const sendTo = process.env.NEXT_PUBLIC_GADS_CONVERSION;
  if (sendTo && typeof w.gtag === 'function') {
    w.gtag('event', 'conversion', { send_to: sendTo });
  }
}
