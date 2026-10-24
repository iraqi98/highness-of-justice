import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { site } from '@/config/site';
import { withBase } from '@/config/base-path';
import { Container } from './ui';

const LINKS = ['about', 'practice', 'industries', 'track', 'process', 'why', 'contact'] as const;

export async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as 'ar' | 'en';

  return (
    <footer className="relative bg-navy text-mist dark:bg-navy-900">
      <div aria-hidden className="silver-rule opacity-50" />
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src={withBase('/brand/logo-white.svg')}
            alt={locale === 'ar' ? site.name.ar : site.name.en}
            width={160}
            height={160}
            className="size-36"
          />
          <p className="mt-6 text-lg font-semibold text-white">{t('footer.tagline')}</p>
          <p className="mt-2 text-sm text-mist/70">{t('brand.name')}</p>
        </div>

        <nav aria-label={t('footer.quickLinks')} className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">{t('footer.quickLinks')}</h2>
          <ul className="mt-5 grid gap-3 text-[15px]">
            {LINKS.map((k) => (
              <li key={k}>
                <a href={`#${k}`} className="text-mist/75 transition-colors hover:text-white">
                  {t(`nav.${k}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold text-white ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">{t('footer.contact')}</h2>
          <ul className="mt-5 grid gap-3 text-[15px] text-mist/75">
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.address[locale]}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.e164}`} dir="ltr" className="hover:text-white">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-sm text-mist/60">{t('footer.registration', { number: site.registrationNo })}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-mist/60 md:flex-row md:items-center md:justify-between">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p>{t('footer.disclaimer')}</p>
        </Container>
      </div>
    </footer>
  );
}
