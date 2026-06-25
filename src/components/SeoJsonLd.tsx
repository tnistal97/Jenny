import { defaultContent } from '@/lib/content';
import { buildWhatsAppUrl, instagramUrl, tiktokUrl } from '@/lib/whatsapp';

// JSON-LD para SEO local: BeautySalon / ProfessionalService.
// Usa el contenido por defecto (renderizado en el servidor, visible para crawlers).
export function SeoJsonLd() {
  const { general, seo, services, testimonials, faq } = defaultContent;
  const url = seo.siteUrl;

  const business = {
    '@type': ['BeautySalon', 'ProfessionalService'],
    '@id': `${url}/#business`,
    name: `${general.name} ${general.role}`,
    description: seo.description,
    url,
    image: `${url}${seo.ogImage}`,
    email: general.email,
    telephone: `+${general.whatsapp}`,
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Ciudad Autónoma de Buenos Aires' },
      { '@type': 'AdministrativeArea', name: 'Gran Buenos Aires' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Capital Federal',
      addressRegion: 'CABA',
      addressCountry: 'AR',
    },
    sameAs: [instagramUrl(general.instagram), tiktokUrl(general.tiktok), buildWhatsAppUrl(general.whatsapp)],
    knowsLanguage: 'es-AR',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: testimonials.rating,
      bestRating: '5',
      ratingCount: String(Math.max(testimonials.items.length, 12)),
    },
    review: testimonials.items.slice(0, 4).map((t) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.quote,
    })),
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.description },
    })),
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${url}/#faq`,
    mainEntity: faq.items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const jsonLd = { '@context': 'https://schema.org', '@graph': [business, faqPage] };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
