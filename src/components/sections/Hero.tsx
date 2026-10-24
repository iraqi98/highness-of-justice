import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { withBase } from '@/config/base-path';
import { GoogleRating } from '../GoogleRating';
import { Container } from '../ui';

export async function Hero() {
  const t = await getTranslations();
  const locale = (await getLocale()) as 'ar' | 'en';

  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy text-white">
      {/* Faint emblem watermark, like the brand guide covers */}
      <Image
        src={withBase('/brand/emblem-white.svg')}
        alt=""
        width={900}
        height={900}
        aria-hidden
        loading="eager"
        className="pointer-events-none absolute -bottom-40 -start-40 -z-10 w-[42rem] max-w-none opacity-[0.04]"
      />
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-7" data-reveal>
          <p className="flex items-center gap-3 text-sm text-mist/80 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">
            <span aria-hidden className="h-px w-8 bg-silver" />
            {t('brand.line')}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-6xl ltr:tracking-tight">
            {t('hero.title')}
          </h1>
          <div aria-hidden className="silver-rule mt-8 w-40 opacity-80" />
          <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-mist/85 sm:text-lg sm:leading-9">
            {t('hero.body')}
          </p>
          <GoogleRating tone="dark" className="mt-8" />
        </div>

        <div
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          data-reveal
          style={{ ['--reveal-delay' as string]: '150ms' }}
        >
          {/* Arch-topped frame, echoing the arches of the stationery */}
          <div className="silver-ring relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl p-2 [--ring-fill:#141641]">
            <div className="relative size-full overflow-hidden rounded-t-full rounded-b-2xl">
              <Image
                src={images.heroJustice.src}
                alt={images.heroJustice.alt[locale]}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
      <div aria-hidden className="silver-rule opacity-40" />
    </section>
  );
}
