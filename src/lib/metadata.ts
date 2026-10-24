import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
import type { PagePath } from './links';

/** Canonical, hreflang, Open Graph and Twitter tags for one page in one locale. */
export function pageMetadata({
  locale,
  page = '',
  title,
  description,
}: {
  locale: string;
  page?: PagePath;
  title: string;
  description: string;
}): Metadata {
  const url = (l: string) => absoluteUrl(`/${l}/${page}`);
  const name = locale === 'ar' ? site.name.ar : site.name.en;
  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: { ar: url('ar'), en: url('en'), 'x-default': url('ar') },
    },
    openGraph: {
      type: 'website',
      url: url(locale),
      siteName: name,
      title,
      description,
      locale: locale === 'ar' ? 'ar_IQ' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_IQ'],
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og.png')],
    },
  };
}
