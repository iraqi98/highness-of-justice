import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { site, whatsappUrl } from '@/config/site';
import { images } from '@/config/images';
import { ConsultForm } from '../ConsultForm';
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
  const services = (t.raw('practice.items') as { title: string }[]).map((s) => s.title);

  const rows = site.hours.map((h) => ({
    day: h.day,
    label: days[h.day],
    hours: h.open && h.close ? `${formatTime(h.open, locale)} – ${formatTime(h.close, locale)}` : null,
  }));

  const channels: { icon: LucideIcon | typeof WhatsAppIcon; label: string; value: string; href: string; ltr?: boolean; external?: boolean }[] = [
    { icon: Phone, label: t('contact.phone'), value: site.phone.display, href: `tel:${site.phone.e164}`, ltr: true },
    { icon: WhatsAppIcon, label: t('contact.whatsapp'), value: site.phone.display, href: whatsappUrl(), ltr: true, external: true },
    { icon: Mail, label: t('contact.email'), value: site.email, href: `mailto:${site.email}`, ltr: true },
    { icon: MapPin, label: t('contact.office'), value: site.address[locale], href: site.mapsUrl, external: true },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} className="max-w-3xl" />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="grid content-start gap-6 lg:col-span-6">
            <ul className="grid gap-3 sm:grid-cols-2" data-reveal>
              {channels.map(({ icon: Icon, label, value, href, ltr, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-navy/30 dark:hover:border-white/30"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{label}</span>
                      <span dir={ltr ? 'ltr' : undefined} className="mt-1 block break-words font-semibold text-ink">
                        {value}
                      </span>
                      {Icon === MapPin && (
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-navy-400 group-hover:underline dark:text-steel">
                          {t('contact.map')}
                          <ArrowUpRight aria-hidden className="size-3.5 rtl:-scale-x-100" />
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
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
