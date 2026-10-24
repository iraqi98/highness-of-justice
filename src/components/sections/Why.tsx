import { Check, FileText, Languages, Layers, MapPin, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container, SectionHeading } from '../ui';

const ICONS: LucideIcon[] = [MapPin, Languages, Layers, FileText];

export async function Why() {
  const t = await getTranslations('why');
  const cards = t.raw('cards') as { title: string; body: string }[];
  const points = t.raw('points') as string[];
  const values = t.raw('values') as string[];

  return (
    <section id="why" className="bg-soft py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="max-w-3xl" />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {cards.map((c, i) => {
              const Icon = ICONS[i];
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

          <div className="relative overflow-hidden rounded-2xl bg-navy p-7 text-white sm:p-10 lg:col-span-5 dark:bg-navy-700" data-reveal>
            <ul className="space-y-5">
              {points.map((p) => (
                <li key={p} className="flex gap-4 text-[15px] leading-7 text-mist/90 sm:text-base">
                  <span className="silver-ring mt-0.5 grid size-6 shrink-0 place-items-center rounded-full [--ring-fill:#141641] dark:[--ring-fill:#26254e]">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values: confidentiality, professionalism, transparency */}
        <div className="mt-16 text-center" data-reveal>
          <p className="text-sm font-semibold text-navy-400 ltr:text-xs ltr:uppercase ltr:tracking-[0.18em] dark:text-steel">
            {t('valuesEyebrow')}
          </p>
          <ul className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
            {values.map((v, i) => (
              <li key={v} className="flex items-center">
                {i > 0 && <span aria-hidden className="mx-8 hidden h-10 w-px bg-gradient-to-b from-transparent via-steel to-transparent sm:block" />}
                <span className="text-3xl font-semibold text-ink sm:text-4xl ltr:tracking-tight">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
