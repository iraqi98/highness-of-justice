import Image from 'next/image';
import { ArrowRight, Building2, Check, ChevronRight, Globe, Landmark, UserRound, type LucideIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { services } from '@/config/services';
import { whatsappUrl } from '@/config/site';
import { FOREIGN_COMPANIES, contactHref, pageHref, servicePage } from '@/lib/links';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Container, SectionHeading, btn, pad } from '../ui';

type Locale = 'ar' | 'en';
type Item = { title: string; points: string[] };
type Card = { title: string; body: string };

// Same order as clients.items
const CLIENT_ICONS: LucideIcon[] = [Globe, Building2, UserRound, Landmark];
const ghostOnNavy = 'silver-ring text-white hover:[--ring-fill:#26254e] focus-visible:outline-white';

export async function ServicePage({ index }: { index: number }) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const service = services[index];
  const items = t.raw('practice.items') as Item[];
  const item = items[index];
  const intro = (t.raw('svc.intros') as string[])[index];
  const clients = t.raw('clients.items') as Card[];
  const steps = t.raw('process.steps') as Card[];
  const photo = images[service.image];
  const Icon = service.icon;
  const book = contactHref(locale, service.slug);
  const wa = whatsappUrl(t('svc.cta.waMessage', { service: item.title }));

  return (
    <>
      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden bg-navy text-white">
        <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-7" data-reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-mist/70">
                <li>
                  <a href={pageHref(locale)} className="hover:text-white hover:underline hover:underline-offset-4">
                    {t('brand.shortName')}
                  </a>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5 rtl:-scale-x-100" />
                </li>
                <li>
                  <a href={pageHref(locale, '', 'practice')} className="hover:text-white hover:underline hover:underline-offset-4">
                    {t('svc.breadcrumb')}
                  </a>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5 rtl:-scale-x-100" />
                </li>
                <li aria-current="page" className="text-mist">
                  {item.title}
                </li>
              </ol>
            </nav>
            <p className="mt-8 flex items-center gap-3 text-sm text-mist/80 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">
              <span aria-hidden className="h-px w-8 bg-silver" />
              {t('svc.eyebrow')} · <bdi dir="ltr">{pad(index + 1)}</bdi>
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.2] sm:text-5xl ltr:tracking-tight">{item.title}</h1>
            <div aria-hidden className="silver-rule mt-8 w-40 opacity-80" />
            <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-mist/85 sm:text-lg sm:leading-9">{intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={book} className={`${btn.base} ${btn.light} px-7 py-3.5`}>
                {t('svc.cta.book')}
                <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
              </a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn.base} ${ghostOnNavy} px-7 py-3.5`}>
                <WhatsAppIcon className="size-4" />
                {t('svc.cta.whatsapp')}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" data-reveal style={{ ['--reveal-delay' as string]: '150ms' }}>
            <div className="silver-ring relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl p-2">
              <div className="relative size-full overflow-hidden rounded-t-full rounded-b-2xl">
                <Image src={photo.src} alt={photo.alt[locale]} fill preload sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
            </div>
            <span className="absolute -bottom-5 start-6 grid size-16 place-items-center rounded-full bg-white text-navy shadow-xl shadow-navy/30">
              <Icon aria-hidden className="size-7" strokeWidth={1.5} />
            </span>
          </div>
        </Container>
        <div aria-hidden className="silver-rule opacity-40" />
      </section>

      {/* What we handle */}
      <section id="scope" className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading eyebrow={t('svc.handle.eyebrow')} title={t('svc.handle.title')} className="lg:col-span-4" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {item.points.map((p, i) => (
              <li
                key={p}
                className="flex gap-4 rounded-2xl border border-line bg-card p-6"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 2) * 80}ms` }}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-white dark:bg-white dark:text-navy">
                  <Check aria-hidden className="size-4" strokeWidth={2.2} />
                </span>
                <span className="pt-1 text-[15px] leading-7 text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Who it's for (+ foreign-companies link) */}
      <section id="audience" className="bg-soft py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t('svc.audience.eyebrow')} title={t('svc.audience.title')} className="max-w-3xl" />
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <ul className={`grid gap-4 sm:grid-cols-2 ${service.foreign ? 'lg:col-span-8' : 'lg:col-span-12 lg:grid-cols-3'}`}>
              {service.audience.map((ci, i) => {
                const CIcon = CLIENT_ICONS[ci];
                return (
                  <li key={ci} className="rounded-2xl border border-line bg-card p-7" data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                    <CIcon aria-hidden strokeWidth={1.5} className="size-6 text-navy-400 dark:text-steel" />
                    <h3 className="mt-6 text-lg font-semibold text-ink">{clients[ci].title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted">{clients[ci].body}</p>
                  </li>
                );
              })}
            </ul>
            {service.foreign && (
              <a
                href={pageHref(locale, FOREIGN_COMPANIES)}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-navy p-7 text-white lg:col-span-4 dark:bg-navy-700"
                data-reveal
              >
                <Globe aria-hidden strokeWidth={1.5} className="size-6 text-silver" />
                <h3 className="mt-6 text-lg font-semibold">{t('svc.foreign.title')}</h3>
                <p className="mt-2 text-[15px] leading-7 text-mist/80">{t('svc.foreign.body')}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold group-hover:underline group-hover:underline-offset-4">
                  {t('svc.foreign.link')}
                  <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
                </span>
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Process (compact) */}
      <section id="process" className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} className="max-w-3xl" />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-line bg-card p-5 lg:flex-col lg:gap-3" data-reveal style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
                <span className="text-2xl font-light tabular-nums text-navy/30 dark:text-white/30">{pad(i + 1)}</span>
                <span>
                  <span className="block font-semibold text-ink">{s.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Related services */}
      <section id="related" className="bg-soft py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t('svc.related.eyebrow')} title={t('svc.related.title')} className="max-w-3xl" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {service.related.map((ri, i) => {
              const r = services[ri];
              const RIcon = r.icon;
              return (
                <li key={r.slug} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                  <a
                    href={pageHref(locale, servicePage(r.slug))}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-[border-color,box-shadow] duration-300 hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5 dark:hover:border-white/30"
                  >
                    <span className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                        <RIcon aria-hidden className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-steel">{pad(ri + 1)}</span>
                    </span>
                    <h3 className="mt-6 text-lg font-semibold leading-snug text-ink">{items[ri].title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted">{(t.raw('svc.intros') as string[])[ri]}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-400 group-hover:underline group-hover:underline-offset-4 dark:text-steel">
                      {t('svc.related.link')}
                      <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24 dark:bg-navy-900">
        <Image src={images.trackBaghdad.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30 mix-blend-luminosity" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/60 rtl:bg-gradient-to-l dark:from-navy-900 dark:via-navy-900/85 dark:to-navy-900/60" />
        <div aria-hidden className="silver-rule absolute inset-x-0 top-0 opacity-60" />
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-balance text-3xl font-semibold leading-[1.3] sm:text-4xl ltr:tracking-tight">
              {t('svc.cta.title', { service: item.title })}
            </h2>
            <p className="mt-4 text-base leading-8 text-mist/80 sm:text-lg">{t('svc.cta.body')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0" data-reveal>
            <a href={book} className={`${btn.base} ${btn.light} px-7 py-3.5`}>
              {t('svc.cta.book')}
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn.base} ${ghostOnNavy} px-7 py-3.5`}>
              <WhatsAppIcon className="size-4" />
              {t('svc.cta.whatsapp')}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
