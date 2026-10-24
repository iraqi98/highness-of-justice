'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { site } from '@/config/site';

type Row = { day: number; label: string; hours: string | null };

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Current weekday and minutes-since-midnight in Baghdad, whatever the visitor's time zone. */
function baghdadNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: WEEKDAYS.indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export function OfficeHours({ rows }: { rows: Row[] }) {
  const t = useTranslations('contact');
  // null until mounted so server and client render the same markup
  const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);

  useEffect(() => {
    const tick = () => setNow(baghdadNow());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const today = now && site.hours.find((h) => h.day === now.day);
  const isOpen =
    !!today?.open && !!today.close && now!.minutes >= toMinutes(today.open) && now!.minutes < toMinutes(today.close);

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{t('hoursTitle')}</h3>
          <p className="text-sm text-muted">{t('hoursNote')}</p>
        </div>
        <p
          aria-live="polite"
          className={`inline-flex min-h-8 items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold transition-opacity ${
            now ? 'opacity-100' : 'opacity-0'
          } ${isOpen ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-soft text-muted'}`}
        >
          <span aria-hidden className={`relative flex size-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-steel'}`}>
            {isOpen && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />}
          </span>
          {now ? (isOpen ? t('openNow') : t('closedNow')) : ' '}
        </p>
      </div>
      <table className="mt-5 w-full text-[15px]">
        <tbody>
          {rows.map((r) => {
            const current = now?.day === r.day;
            return (
              <tr key={r.day} className={`border-t border-line ${current ? 'font-semibold text-ink' : 'text-muted'}`}>
                <th scope="row" className="py-2.5 text-start font-[inherit]">
                  {r.label}
                  {current && (
                    <span className="ms-2 rounded-full bg-navy px-2 py-0.5 text-[11px] font-semibold text-white dark:bg-white dark:text-navy">
                      {t('today')}
                    </span>
                  )}
                </th>
                <td className="py-2.5 text-end tabular-nums">
                  {r.hours ?? t('closed')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
