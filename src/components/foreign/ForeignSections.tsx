import Image from 'next/image';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  FileText,
  Globe,
  Landmark,
  Languages,
  Layers,
  MapPin,
  Plane,
  Plus,
  Receipt,
  TrendingUp,
  Users,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { whatsappUrl } from '@/config/site';
import { pageHref, practiceAnchor } from '@/lib/links';
import { GoogleRating } from '../GoogleRating';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Container, SectionHeading, btn, pad } from '../ui';

type Locale = 'ar' | 'en';
type Card = { title: string; body: string };

const ghostOnNavy =
  'silver-ring text-white hover:[--ring-fill:#26254e] focus-visible:outline-white';

/* ------------------------------------------------------------------ Hero */

export async function ForeignHero() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const points = t.raw('fc.hero.points') as string[];

  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy text-white">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7" data-reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-mist/70">
              <li>
                <a href={pageHref(locale)} className="hover:text-white hover:underline hover:underline-offset-4">
                  {t('brand.shortName')}
                </a>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5 rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="text-mist">
                {t('fc.breadcrumb')}
              </li>
            </ol>
          </nav>
          <p className="mt-8 flex items-center gap-3 text-sm text-mist/80 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">
            <span aria-hidden className="h-px w-8 bg-silver" />
            {t('fc.hero.eyebrow')}
          </p>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-[3.5rem] ltr:tracking-tight">
            {t('fc.hero.title')}
          </h1>
          <div aria-hidden className="silver-rule mt-8 w-40 opacity-80" />
          <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-mist/85 sm:text-lg sm:leading-9">
            {t('fc.hero.body')}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-mist ring-1 ring-white/10">
                <Check aria-hidden className="size-3.5 text-silver" strokeWidth={2.2} />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={pageHref(locale, '', 'contact')} className={`${btn.base} ${btn.light} px-7 py-3.5`}>
              {t('fc.hero.cta')}
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
            <a
              href={whatsappUrl(t('fc.hero.waMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.base} ${ghostOnNavy} px-7 py-3.5`}
            >
              <WhatsAppIcon className="size-4" />
              {t('fc.hero.whatsapp')}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" data-reveal style={{ ['--reveal-delay' as string]: '150ms' }}>
          <div className="silver-ring relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl p-2">
            <div className="relative size-full overflow-hidden rounded-t-full rounded-b-2xl">
              <Image
                src={images.visionBaghdad.src}
                alt={images.visionBaghdad.alt[locale]}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
      <div aria-hidden className="silver-rule opacity-40" />
    </section>
  );
}

/* -------------------------------------------------------- Who it's for */

const AUDIENCE_ICONS: LucideIcon[] = [Globe, TrendingUp, Building2, UserRound];

export async function ForeignAudience() {
  const t = await getTranslations('fc.audience');
  const items = t.raw('items') as Card[];

  return (
    <section id="audience" className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="max-w-3xl" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = AUDIENCE_ICONS[i];
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-line bg-card p-7"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
              >
                <span className="grid size-12 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                  <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------- 4-step track */

export async function ForeignTimeline() {
  const t = await getTranslations('track');
  const steps = t.raw('steps') as Card[];

  return (
    <section id="track" className="bg-soft py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('subEyebrow')} title={t('subtitle')} className="max-w-3xl" />
        <ol className="relative mt-14 grid gap-5 lg:grid-cols-4 lg:gap-6">
          {/* Connecting rule: down the start edge on mobile, across the step markers on desktop */}
          <span aria-hidden className="absolute bottom-10 start-7 top-10 w-px bg-gradient-to-b from-steel via-steel/50 to-transparent lg:hidden" />
          <span aria-hidden className="absolute inset-x-[12.5%] top-7 hidden h-px bg-gradient-to-r from-transparent via-steel to-transparent lg:block" />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 110}ms` }}
            >
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-navy text-xl font-bold text-white ring-8 ring-soft dark:bg-white dark:text-navy">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-line bg-card p-6 lg:w-full">
                <p className="text-xs font-semibold tabular-nums text-steel">
                  <bdi dir="ltr">
                    {pad(i + 1)} / {pad(steps.length)}
                  </bdi>
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* -------------------------------------------------- Related services */

// Indexes into practice.items, most relevant to foreign companies first
const SERVICES: { index: number; Icon: LucideIcon }[] = [
  { index: 0, Icon: Building2 },
  { index: 2, Icon: Globe },
  { index: 1, Icon: Receipt },
  { index: 9, Icon: Plane },
  { index: 5, Icon: Users },
  { index: 7, Icon: Landmark },
];

export async function ForeignServices() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const practice = t.raw('practice.items') as { title: string; points: string[] }[];

  return (
    <section id="services" className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('fc.services.eyebrow')} title={t('fc.services.title')} className="max-w-3xl" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ index, Icon }, i) => {
            const item = practice[index];
            return (
              <li key={index} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 80}ms` }}>
                <a
                  href={pageHref(locale, '', practiceAnchor(index))}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-[border-color,box-shadow] duration-300 hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5 dark:hover:border-white/30"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                      <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-steel">{pad(index + 1)}</span>
                  </span>
                  <h3 className="mt-6 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{item.points[0]}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-400 group-hover:underline group-hover:underline-offset-4 dark:text-steel">
                    {t('fc.services.link')}
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- Why + rating */

const WHY_ICONS: LucideIcon[] = [MapPin, Languages, Layers, FileText];

export async function ForeignWhy() {
  const t = await getTranslations();
  const cards = t.raw('why.cards') as Card[];

  return (
    <section id="why" className="bg-soft py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t('why.eyebrow')} title={t('why.title')} className="max-w-3xl" />
          <div className="flex flex-col items-start gap-2 lg:items-end" data-reveal>
            <GoogleRating />
            <p className="text-xs text-muted">{t('fc.why.ratingNote')}</p>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <li
                key={c.title}
                className="rounded-2xl border border-line bg-card p-7"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
              >
                <Icon aria-hidden strokeWidth={1.5} className="size-6 text-navy-400 dark:text-steel" />
                <h3 className="mt-6 text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{c.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

export async function ForeignFaq() {
  const t = await getTranslations('fc.faq');
  const items = t.raw('items') as { q: string; a: string }[];

  return (
    <section id="faq" className="py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
          <p className="mt-6 text-sm leading-6 text-muted" data-reveal>
            {t('note')}
          </p>
        </div>
        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((item) => (
            <li key={item.q} data-reveal>
              <details className="group">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy dark:focus-visible:outline-white">
                  <span className="text-lg font-semibold leading-snug text-ink">{item.q}</span>
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-open:bg-navy group-open:text-white dark:group-open:bg-white dark:group-open:text-navy">
                    <Plus aria-hidden className="size-4 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pe-14 text-[15px] leading-8 text-muted">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Final CTA */

export async function ForeignCta() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;

  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24 dark:bg-navy-900">
      <Image
        src={images.trackBaghdad.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-30 mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/60 rtl:bg-gradient-to-l dark:from-navy-900 dark:via-navy-900/85 dark:to-navy-900/60" />
      <div aria-hidden className="silver-rule absolute inset-x-0 top-0 opacity-60" />
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl" data-reveal>
          <h2 className="text-balance text-3xl font-semibold leading-[1.25] sm:text-4xl ltr:tracking-tight">{t('fc.cta.title')}</h2>
          <p className="mt-4 text-base leading-8 text-mist/80 sm:text-lg">{t('fc.cta.body')}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0" data-reveal>
          <a href={pageHref(locale, '', 'contact')} className={`${btn.base} ${btn.light} px-7 py-3.5`}>
            {t('fc.hero.cta')}
            <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </a>
          <a
            href={whatsappUrl(t('fc.hero.waMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.base} ${ghostOnNavy} px-7 py-3.5`}
          >
            <WhatsAppIcon className="size-4" />
            {t('fc.hero.whatsapp')}
          </a>
        </div>
      </Container>
    </section>
  );
}
