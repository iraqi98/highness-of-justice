import { Building2, Globe, Landmark, UserRound, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container, SectionHeading, pad } from '../ui';

const ICONS: LucideIcon[] = [Globe, Building2, UserRound, Landmark];

export async function Clients() {
  const t = await getTranslations('clients');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section id="clients" className="bg-soft py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="max-w-3xl" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            const featured = i === 0;
            return (
              <li
                key={item.title}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
                className={`flex flex-col rounded-2xl p-7 ${
                  featured ? 'bg-navy text-white dark:bg-navy-700' : 'border border-line bg-card'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className={`text-3xl font-bold tabular-nums ${featured ? 'silver-text' : 'text-mist dark:text-white/15'}`}>
                    {pad(i + 1)}
                  </span>
                  <Icon aria-hidden strokeWidth={1.5} className={`size-6 ${featured ? 'text-silver' : 'text-navy-400 dark:text-steel'}`} />
                </span>
                <h3 className={`mt-10 text-xl font-semibold ${featured ? 'text-white' : 'text-ink'}`}>{item.title}</h3>
                <p className={`mt-3 text-[15px] leading-7 ${featured ? 'text-mist/80' : 'text-muted'}`}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
