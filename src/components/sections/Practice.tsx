import Image from 'next/image';
import {
  Briefcase,
  Building2,
  FileSignature,
  Gavel,
  Globe,
  Landmark,
  Lightbulb,
  Plane,
  Plus,
  Receipt,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { images } from '@/config/images';
import { Container, SectionHeading, pad } from '../ui';

// Same order as practice.items in messages/*.json
const ICONS: LucideIcon[] = [Building2, Receipt, Globe, FileSignature, Gavel, Users, Lightbulb, Landmark, Briefcase, Plane];

type Item = { title: string; points: string[] };

export async function Practice() {
  const t = await getTranslations('practice');
  const locale = (await getLocale()) as 'ar' | 'en';
  const items = t.raw('items') as Item[];

  return (
    <section id="practice" className="bg-soft py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
            <div className="relative mt-10 hidden aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl lg:block" data-reveal>
              <Image
                src={images.contractSigning.src}
                alt={images.contractSigning.alt[locale]}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-8">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 2) * 80}ms` }}>
                <details className="group h-full rounded-2xl border border-line bg-card transition-shadow duration-300 hover:shadow-lg hover:shadow-navy/5 open:shadow-xl open:shadow-navy/5">
                  <summary className="flex h-full cursor-pointer flex-col gap-6 rounded-2xl p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:p-7 dark:focus-visible:outline-white">
                    <span className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full bg-navy text-white dark:bg-white/10">
                        <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-steel">{pad(i + 1)}</span>
                    </span>
                    <span className="text-lg font-semibold leading-snug text-ink">{item.title}</span>
                    <span className="mt-auto flex items-center gap-2 text-sm font-medium text-navy-400 dark:text-steel">
                      <Plus
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                      />
                      <span className="group-open:hidden">{t('more')}</span>
                      <span className="hidden group-open:inline">{t('less')}</span>
                    </span>
                  </summary>
                  <ul className="mx-6 space-y-3 border-t border-line pb-7 pt-5 sm:mx-7">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-7 text-muted">
                        <span aria-hidden className="mt-3.5 h-px w-3 shrink-0 bg-steel" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
