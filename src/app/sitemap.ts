import type { MetadataRoute } from 'next';
import { defaultContent } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultContent.seo.siteUrl;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
