import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export const dynamic = 'force-static';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}/`]));
  return routing.locales.map((locale) => ({
    url: `${site.url}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
