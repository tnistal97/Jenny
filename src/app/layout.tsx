import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import { defaultContent } from '@/lib/content';
import { ContentProvider } from '@/lib/content-context';
import { SeoJsonLd } from '@/components/SeoJsonLd';
import { Analytics } from '@/components/Analytics';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const { seo, general } = defaultContent;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${general.name} ${general.role}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: `${general.name} ${general.role}` }],
  creator: `${general.name} ${general.role}`,
  alternates: { canonical: '/' },
  category: 'beauty',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: `${general.name} ${general.role}`,
    title: seo.title,
    description: seo.description,
    images: [
      { url: seo.ogImage, width: 1200, height: 630, alt: `${general.name} ${general.role}` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#16120e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Analytics />
        <SeoJsonLd />
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
