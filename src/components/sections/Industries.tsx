import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { images, industryImages } from '@/config/images';
import { Container, SectionHeading, pad } from '../ui';

export async function Industries() {
  const t = await getTranslations('industries');
  const locale = (await getLocale()) as 'ar' | 'en';
  const items = t.raw('items') as string[];

  return (
    <section id="industries" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
      </Container>
      {/* Swipeable strip on small screens, grid from lg up */}
      <div className="mt-12 lg:mx-auto lg:max-w-7xl lg:px-8">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {items.map((name, i) => {
            const img = images[industryImages[i]];
            return (
              <li
                key={name}
                className="group relative aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl bg-navy sm:w-[40%] lg:aspect-[4/5] lg:w-auto"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 70vw"
                  className="object-cover opacity-80 grayscale-[35%] transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/0" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-xs font-semibold tabular-nums text-silver">{pad(i + 1)}</span>
                  <div aria-hidden className="silver-rule my-3 w-10" />
                  <p className="text-lg font-semibold leading-snug">{name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
