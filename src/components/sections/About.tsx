import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { Container, SectionHeading } from '../ui';

export async function About() {
  const t = await getTranslations('about');
  const locale = (await getLocale()) as 'ar' | 'en';

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
          <p className="mt-8 text-pretty text-base leading-8 text-muted sm:text-lg sm:leading-9" data-reveal>
            {t('body')}
          </p>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl" data-reveal>
            <Image
              src={images.aboutLibrary.src}
              alt={images.aboutLibrary.alt[locale]}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <figure className="relative flex flex-col overflow-hidden rounded-3xl bg-navy text-white lg:col-span-6" data-reveal>
          <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1">
            <Image
              src={images.visionBaghdad.src}
              alt={images.visionBaghdad.alt[locale]}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
          </div>
          <blockquote className="relative px-6 pb-10 sm:px-10 sm:pb-12">
            <span aria-hidden className="silver-text block font-serif text-7xl leading-none">
              &ldquo;
            </span>
            <p className="flex items-center gap-3 text-sm text-mist/80 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em]">
              <span aria-hidden className="h-px w-8 bg-silver" />
              {t('visionEyebrow')}
            </p>
            <p className="mt-5 text-pretty text-xl font-medium leading-9 sm:text-2xl sm:leading-10">{t('vision')}</p>
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
