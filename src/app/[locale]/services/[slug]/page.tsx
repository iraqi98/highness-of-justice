import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { absoluteUrl, site } from '@/config/site';
import { serviceIndex, services } from '@/config/services';
import { servicePage } from '@/lib/links';
import { pageMetadata } from '@/lib/metadata';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/RevealObserver';
import { ServicePage } from '@/components/service/ServicePage';

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map(({ slug }) => ({ locale, slug })));
}

async function load(locale: string, slug: string) {
  const index = serviceIndex(slug);
  if (index < 0) notFound();
  const t = await getTranslations({ locale });
  const title = (t.raw('practice.items') as { title: string }[])[index].title;
  const intro = (t.raw('svc.intros') as string[])[index];
  return { index, t, title, intro };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/services/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const { t, title, intro } = await load(locale, slug);
  return pageMetadata({
    locale,
    page: servicePage(slug),
    title: t('svc.meta.title', { service: title }),
    description: t('svc.meta.description', { intro }),
  });
}

export default async function ServiceRoute({ params }: PageProps<'/[locale]/services/[slug]'>) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { index, t, title, intro } = await load(locale, slug);
  const url = absoluteUrl(`/${locale}/${servicePage(slug)}`);
  const firm = locale === 'ar' ? site.name.ar : site.name.en;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('brand.shortName'), item: absoluteUrl(`/${locale}/`) },
        { '@type': 'ListItem', position: 2, name: t('svc.breadcrumb'), item: absoluteUrl(`/${locale}/#practice`) },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: intro,
      serviceType: title,
      url,
      inLanguage: locale,
      areaServed: { '@type': 'Country', name: 'Iraq' },
      provider: { '@type': 'LegalService', '@id': absoluteUrl('/#organization'), name: firm, url: absoluteUrl('/') },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Header page={servicePage(slug)} />
      <main id="main">
        <ServicePage index={index} />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
