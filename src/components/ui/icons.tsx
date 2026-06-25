import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Whatsapp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02ZM12.04 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M16.5 3c.28 1.86 1.34 3.32 3.5 3.62v2.42c-1.25.12-2.34-.29-3.6-1.05v5.55c0 4.36-4.75 7.07-8.42 4.39-2.36-1.73-2.6-5.31-.27-7.18 1.18-.95 2.62-1.23 4.06-1v2.6c-.43-.13-.86-.16-1.3-.03-1.32.39-1.74 1.93-.91 2.99.86 1.1 2.94.78 3.18-.66.04-.27.06-.55.06-.82V3h3.7Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M12 3.5l2.4 5 5.5.6-4.1 3.7 1.2 5.4-5-2.9-5 2.9 1.2-5.4L3.6 9.1l5.5-.6 2.4-5Z" />
    </svg>
  );
}

export function Brush(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M14.5 4.5 19.5 9.5 11 18a3 3 0 0 1-4-4l7.5-9.5Z" />
      <path d="m4 20 3-1c.7-.2 1-1.1.5-1.6l-1-1c-.5-.5-1.4-.2-1.6.5L4 20Z" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M12 3c.6 3.8 1.7 5 5.5 5.5C13.7 9 12.6 10.2 12 14c-.6-3.8-1.7-5-5.5-5.5C10.3 8 11.4 6.8 12 3Z" />
      <path d="M18.5 14c.3 1.8.8 2.4 2.5 2.7-1.7.3-2.2.9-2.5 2.7-.3-1.8-.8-2.4-2.5-2.7 1.7-.3 2.2-.9 2.5-2.7Z" />
    </svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M12 20s-7-4.4-9-8.3C1.6 8.9 3 6 5.8 6c1.7 0 2.9 1 3.7 2.1C10.3 7 11.5 6 13.2 6 16 6 17.4 8.9 16 11.7 14 15.6 12 20 12 20Z" />
    </svg>
  );
}

export function Gem(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
      <path d="M3 8h18M9 3 7.5 8 12 21 16.5 8 15 3" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...base} {...props}>
      <path d="M5 12.5 10 17.5 19.5 7" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M9.5 6C6.5 7.2 5 9.7 5 13.4V18h5.2v-5.2H7.9c0-2.2.9-3.6 2.6-4.3L9.5 6Zm9 0c-3 1.2-4.5 3.7-4.5 7.4V18h5.2v-5.2h-2.3c0-2.2.9-3.6 2.6-4.3L18.5 6Z" />
    </svg>
  );
}

export const serviceIcons = { novias: Heart, social: Sparkle, eventos: Star, produccion: Gem, clases: Brush, asesoria: Sparkle } as const;
