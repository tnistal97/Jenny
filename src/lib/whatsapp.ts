// Helpers para construir enlaces de WhatsApp / Instagram / TikTok / email.

export function onlyDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

export function buildWhatsAppUrl(number: string, message?: string): string {
  const digits = onlyDigits(number);
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function instagramUrl(handle: string): string {
  return `https://instagram.com/${(handle || '').replace(/^@/, '')}`;
}

export function tiktokUrl(handle: string): string {
  const h = (handle || '').replace(/^@/, '');
  return `https://www.tiktok.com/@${h}`;
}

export function mailtoUrl(email: string): string {
  return `mailto:${email}`;
}
