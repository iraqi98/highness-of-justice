import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { absoluteUrl } from '@/config/site';
import { FOREIGN_COMPANIES } from '@/lib/links';
import { pageMetadata } from '@/lib/metadata';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/RevealObserver';
import { Industries } from '@/components/sections/Industries';
import {
  ForeignAudience,
  ForeignCta,
  ForeignFaq,
  ForeignHero,
  ForeignServices,
  ForeignTimeline,
  ForeignWhy,
} from '@/components/foreign/ForeignSections';

export async function generateMetadata({ params }: PageProps<'/[locale]/foreign-companies'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fc.meta' });
  return pageMetadata({ locale, page: FOREIGN_COMPANIES, title: t('title'), description: t('description') });
}

export default async function ForeignCompaniesPage({ params }: PageProps<'/[locale]/foreign-companies'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('fc.faq');
  const faq = t.raw('items') as { q: string; a: string }[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: absoluteUrl(`/${locale}/${FOREIGN_COMPANIES}`),
    inLanguage: locale,
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Header page={FOREIGN_COMPANIES} />
      <main id="main">
        <ForeignHero />
        <ForeignAudience />
        <ForeignTimeline />
        <ForeignServices />
        <Industries />
        <ForeignWhy />
        <ForeignFaq />
        <ForeignCta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
