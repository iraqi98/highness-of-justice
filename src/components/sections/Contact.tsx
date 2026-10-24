import Image from 'next/image';
import { Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { site, whatsappUrl } from '@/config/site';
import { services as serviceConfig } from '@/config/services';
import { images } from '@/config/images';
import { ConsultForm } from '../ConsultForm';
import { GoogleRating } from '../GoogleRating';
import { OfficeHours } from '../OfficeHours';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Container, SectionHeading } from '../ui';

function formatTime(hhmm: string, locale: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2000, 0, 1, h, m)));
}

export async function Contact() {
  const t = await getTranslations();
  const locale = (await getLocale()) as 'ar' | 'en';
  const days = t.raw('contact.days') as string[];
  const services = (t.raw('practice.items') as { title: string }[]).map((s, i) => ({ slug: serviceConfig[i].slug, title: s.title }));

  const rows = site.hours.map((h) => ({
    day: h.day,
    label: days[h.day],
    hours: h.open && h.close ? `${formatTime(h.open, locale)} – ${formatTime(h.close, locale)}` : null,
    opensAt: h.open ? formatTime(h.open, locale) : null,
  }));

  const action =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} className="max-w-3xl" />
        <div className="mt-6" data-reveal>
          <GoogleRating />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-6 lg:col-span-6">
            <ul className="grid gap-3 sm:grid-cols-2" data-reveal>
              {/* One number for calls and WhatsApp: shown once, with two actions */}
              <li className="sm:col-span-2">
                <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                      <Phone aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted">{t('contact.phoneWhatsapp')}</span>
                      <span dir="ltr" className="mt-1 block text-lg font-semibold text-ink">
                        {site.phone.display}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 ps-15 sm:ps-0">
                    <a
                      href={`tel:${site.phone.e164}`}
                      className={`${action} bg-navy text-white hover:bg-navy-700 focus-visible:outline-navy dark:bg-white dark:text-navy dark:hover:bg-mist`}
                    >
                      <Phone aria-hidden className="size-4" />
                      {t('contact.call')}
                    </a>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${action} border border-line text-ink hover:border-navy/40 focus-visible:outline-navy dark:hover:border-white/40`}
                    >
                      <WhatsAppIcon className="size-4" />
                      {t('contact.whatsapp')}
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-navy/30 dark:hover:border-white/30"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                    <Mail aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{t('contact.email')}</span>
                    <bdi dir="ltr" className="mt-1 block break-words font-semibold text-ink">
                      {site.email}
                    </bdi>
                  </span>
                </a>
              </li>
              <li>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                    <MapPin aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{t('contact.office')}</span>
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-semibold text-ink hover:underline hover:underline-offset-4"
                    >
                      {site.address[locale]}
                    </a>
                    {site.social.googleMaps && (
                      <a
                        href={site.social.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-navy-400 hover:underline hover:underline-offset-4 dark:text-steel"
                      >
                        <Navigation aria-hidden className="size-3.5 rtl:-scale-x-100" />
                        {t('contact.directions')}
                      </a>
                    )}
                  </span>
                </div>
              </li>
            </ul>

            <div data-reveal>
              <OfficeHours rows={rows} />
            </div>

            <div className="relative hidden aspect-[16/7] overflow-hidden rounded-2xl lg:block" data-reveal>
              <Image
                src={images.contactOffice.src}
                alt={images.contactOffice.alt[locale]}
                fill
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal>
            <div className="rounded-3xl border border-line bg-card p-6 shadow-xl shadow-navy/5 sm:p-10 lg:sticky lg:top-28 dark:shadow-none">
              <h3 className="text-2xl font-semibold text-ink">{t('contact.form.title')}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{t('contact.form.intro')}</p>
              <div aria-hidden className="silver-rule my-7" />
              <ConsultForm services={services} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
