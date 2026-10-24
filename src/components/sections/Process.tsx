import { getTranslations } from 'next-intl/server';
import { Container, SectionHeading, pad } from '../ui';

export async function Process() {
  const t = await getTranslations('process');
  const steps = t.raw('steps') as { title: string; body: string }[];

  return (
    <section id="process" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="max-w-3xl" />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-soft lg:min-h-64"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
            >
              <span className="block text-5xl font-light tabular-nums text-navy/15 transition-colors duration-300 group-hover:text-navy/40 dark:text-white/15 dark:group-hover:text-white/40">
                {pad(i + 1)}
              </span>
              <h3 className="mt-8 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
