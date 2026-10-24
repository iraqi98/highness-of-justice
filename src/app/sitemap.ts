import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { routing } from '@/i18n/routing';
import { services } from '@/config/services';
import { FOREIGN_COMPANIES, servicePage, type PagePath } from '@/lib/links';

export const dynamic = 'force-static';

const PAGES: { page: PagePath; priority: number }[] = [
  { page: '', priority: 1 },
  { page: FOREIGN_COMPANIES, priority: 0.9 },
  ...services.map(({ slug }) => ({ page: servicePage(slug), priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ page, priority }) => {
    const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}/${page}`)]));
    return routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}/${page}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages },
    }));
  });
}
