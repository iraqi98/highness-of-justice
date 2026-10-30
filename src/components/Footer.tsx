import Image from 'next/image';
import { ChevronDown, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { site, whatsappUrl } from '@/config/site';
import { FOREIGN_COMPANIES, pageHref, servicePage } from '@/lib/links';
import { services } from '@/config/services';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FacebookIcon, GoogleMapsIcon, InstagramIcon, LinkedInIcon } from './BrandIcons';
import { Container, keepNumbersTogether } from './ui';

// Practice areas are left out: the next column lists them all
const LINKS = ['about', 'industries', 'track', 'process', 'why', 'contact'] as const;

const SOCIAL = [
  { key: 'linkedin', Icon: LinkedInIcon },
  { key: 'instagram', Icon: InstagramIcon },
  { key: 'facebook', Icon: FacebookIcon },
  { key: 'googleMaps', Icon: GoogleMapsIcon },
] as const;

const practiceLink =
  'block rounded-lg px-2 py-1.5 text-sm leading-5 text-mist/75 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10';
const heading = 'text-sm font-semibold text-white ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]';
const pill =
  'inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy active:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as 'ar' | 'en';
  const practice = (t.raw('practice.items') as { title: string }[]).map((p) => p.title);

  const contacts: { icon: LucideIcon; href: string; label: string; ltr?: boolean; external?: boolean }[] = [
    { icon: MapPin, href: site.mapsUrl, label: site.address[locale], external: true },
    { icon: Phone, href: `tel:${site.phone.e164}`, label: site.phone.display, ltr: true },
    { icon: Mail, href: `mailto:${site.email}`, label: site.email, ltr: true },
  ];

  return (
    <footer className="relative bg-navy text-mist dark:bg-navy-900">
      <div aria-hidden className="silver-rule opacity-50" />

      <Container className="grid gap-8 py-9 sm:gap-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div className="flex flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-start">
          <Image
            src="/brand/logo-white.svg"
            alt={locale === 'ar' ? site.name.ar : site.name.en}
            width={144}
            height={144}
            unoptimized
            className="size-28 sm:size-32"
          />
          <p className="mt-4 text-lg font-semibold text-white">{t('footer.tagline')}</p>
          <p className="mt-1 max-w-sm text-sm text-mist/65">{t('brand.name')}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist/70">
            <span>{t('footer.registration')}</span>
            <bdi dir="ltr" className="font-semibold tabular-nums text-mist">
              {site.registrationNo}
            </bdi>
          </p>
          <div aria-hidden className="silver-rule mt-7 w-full max-w-xs opacity-70 lg:hidden" />
        </div>

        {/* Quick links: 2-column grid on mobile, a single column from lg */}
        <nav aria-label={t('footer.quickLinks')} className="lg:col-span-2">
          <h2 className={heading}>{t('footer.quickLinks')}</h2>
          <ul className="-mx-2 mt-3 grid grid-cols-2 gap-x-4 lg:mt-4 lg:grid-cols-1">
            {LINKS.map((k) => (
              <li key={k}>
                <a
                  href={k === 'track' ? pageHref(locale, FOREIGN_COMPANIES) : pageHref(locale, '', k)}
                  className="block rounded-lg px-2 py-1.5 text-sm text-mist/75 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10 lg:text-[15px]"
                >
                  {t(`nav.${k}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Practice areas: collapsible on mobile, a column from lg */}
        <nav aria-label={t('footer.practiceAreas')} className="lg:col-span-4">
          <details className="group border-y border-white/10 lg:hidden">
            <summary className="flex cursor-pointer items-center justify-between py-3">
              <h2 className={heading}>{t('footer.practiceAreas')}</h2>
              <ChevronDown aria-hidden className="size-4 text-mist/60 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <ul className="-mx-2 grid gap-0.5 pb-3">
              {practice.map((title, i) => (
                <li key={services[i].slug}>
                  <a href={pageHref(locale, servicePage(services[i].slug))} className={practiceLink}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <div className="hidden lg:block">
            <h2 className={heading}>{t('footer.practiceAreas')}</h2>
            <ul className="-mx-2 mt-4 grid gap-0.5">
              {practice.map((title, i) => (
                <li key={services[i].slug}>
                  <a href={pageHref(locale, servicePage(services[i].slug))} className={practiceLink}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h2 className={heading}>{t('footer.contact')}</h2>
          <ul className="-mx-2 mt-3 grid gap-1 lg:mt-4">
            {contacts.map(({ icon: Icon, href, label, ltr, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-mist/80 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10 lg:text-[15px]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-silver ring-1 ring-white/10 transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  </span>
                  {ltr ? <bdi dir="ltr">{label}</bdi> : <span>{keepNumbersTogether(label)}</span>}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 ps-12">
            <a href={`tel:${site.phone.e164}`} className={pill}>
              <Phone aria-hidden className="size-3.5" />
              {t('contact.call')}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={pill}>
              <WhatsAppIcon className="size-3.5" />
              {t('contact.whatsapp')}
            </a>
          </div>
          {/* Social profiles; an empty URL in site.ts hides its icon */}
          <ul aria-label={t('social.title')} className="mt-4 flex flex-wrap gap-2 ps-12">
            {SOCIAL.filter(({ key }) => site.social[key]).map(({ key, Icon }) => (
              <li key={key}>
                <a
                  href={site.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('social.aria', { network: t(`social.${key}`) })}
                  title={t(`social.${key}`)}
                  className="grid size-9 place-items-center rounded-full bg-white/5 text-silver ring-1 ring-white/10 transition-colors hover:bg-white hover:text-navy active:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-1.5 py-5 text-center text-xs leading-6 text-mist/70 md:flex-row md:justify-between md:gap-6 md:text-start">
          <p>
            <span className="block sm:inline">{t('footer.rights', { year: new Date().getFullYear() })}</span>{' '}
            <span className="block sm:inline">{t('footer.reserved')}</span>
          </p>
          <p className="text-balance">{t('footer.disclaimer')}</p>
        </Container>
      </div>
    </footer>
  );
}
