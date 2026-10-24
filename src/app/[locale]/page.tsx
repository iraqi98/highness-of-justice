import { setRequestLocale } from 'next-intl/server';
import { site } from '@/config/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/RevealObserver';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Practice } from '@/components/sections/Practice';
import { Industries } from '@/components/sections/Industries';
import { Clients } from '@/components/sections/Clients';
import { Track } from '@/components/sections/Track';
import { Process } from '@/components/sections/Process';
import { Why } from '@/components/sections/Why';
import { Contact } from '@/components/sections/Contact';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function legalServiceJsonLd(locale: 'ar' | 'en') {
  const open = site.hours.filter((h) => h.open && h.close);
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${site.url}/#organization`,
    name: site.name[locale],
    alternateName: site.name[locale === 'ar' ? 'en' : 'ar'],
    url: site.url,
    logo: `${site.url}/brand/logo-1024.png`,
    image: `${site.url}/og.png`,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    sameAs: Object.values(site.social).filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.googleRating.value.toFixed(1),
      reviewCount: site.googleRating.count,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: open.map((h) => DAY_NAMES[h.day]),
        opens: open[0]?.open,
        closes: open[0]?.close,
      },
    ],
    areaServed: { '@type': 'Country', name: 'Iraq' },
    availableLanguage: ['ar', 'en'],
    inLanguage: locale,
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = legalServiceJsonLd(locale as 'ar' | 'en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Practice />
        <Industries />
        <Clients />
        <Track />
        <Process />
        <Why />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
