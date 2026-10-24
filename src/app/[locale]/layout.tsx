import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { absoluteUrl, site } from '@/config/site';
import { withBase } from '@/config/base-path';
import { fontClassName } from '@/styles/fonts';

// Runs before paint: marks JS as available (for reveal animations) and applies the saved theme.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}})()`;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#141641',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: { ar: absoluteUrl('/ar/'), en: absoluteUrl('/en/'), 'x-default': absoluteUrl('/ar/') },
    },
    openGraph: {
      type: 'website',
      url: absoluteUrl(`/${locale}/`),
      siteName: locale === 'ar' ? site.name.ar : site.name.en,
      title: t('title'),
      description: t('description'),
      locale: locale === 'ar' ? 'ar_IQ' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_IQ'],
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: locale === 'ar' ? site.name.ar : site.name.en }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [absoluteUrl('/og.png')],
    },
    icons: {
      icon: [
        { url: withBase('/favicon.ico'), sizes: 'any' },
        { url: withBase('/favicon.svg'), type: 'image/svg+xml' },
      ],
      apple: withBase('/apple-touch-icon.png'),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={fontClassName} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-bg text-ink antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
