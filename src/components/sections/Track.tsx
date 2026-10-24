import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { FOREIGN_COMPANIES, pageHref } from '@/lib/links';
import { Container, SectionHeading, btn } from '../ui';

/** The foreign-company track: the firm's key differentiator, set apart on navy with a Baghdad backdrop. */
export async function Track() {
  const t = await getTranslations('track');
  const locale = (await getLocale()) as 'ar' | 'en';
  const steps = t.raw('steps') as { title: string; body: string }[];

  return (
    <section id="track" className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28 dark:bg-navy-900">
      <Image
        src={images.trackBaghdad.src}
        alt={images.trackBaghdad.alt[locale]}
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-40 mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/70 to-navy dark:from-navy-900 dark:via-navy-900/70 dark:to-navy-900" />
      <div aria-hidden className="silver-rule absolute inset-x-0 top-0 opacity-60" />

      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} tone="light" className="lg:col-span-8" />
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end" data-reveal>
            <a href={pageHref(locale, FOREIGN_COMPANIES)} className={`${btn.base} ${btn.light} px-7 py-3.5`}>
              {t('more')}
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
            <a href="#contact" className="text-sm font-semibold text-mist/80 underline-offset-4 hover:text-white hover:underline">
              {t('cta')}
            </a>
          </div>
        </div>

        <div className="mt-16 sm:mt-20" data-reveal>
          <p className="text-sm text-mist/70 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">{t('subEyebrow')}</p>
          <p className="mt-3 text-2xl font-semibold sm:text-3xl">{t('subtitle')}</p>
        </div>

        <ol className="relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Connecting rule: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-6 start-7 top-6 w-px bg-gradient-to-b from-silver/70 via-white/40 to-silver/10 lg:hidden" />
          <span aria-hidden className="silver-rule absolute inset-x-[12%] top-7 hidden opacity-70 lg:block" />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-6 lg:flex-col lg:items-center lg:text-center"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 110}ms` }}
            >
              <span className="silver-ring relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-xl font-bold [--ring-fill:#141641] dark:[--ring-fill:#10113a]">
                {i + 1}
              </span>
              <div className="pt-2 lg:pt-0">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-7 text-mist/75 lg:mx-auto">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
