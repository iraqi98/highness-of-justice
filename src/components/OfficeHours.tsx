'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { site } from '@/config/site';
import { localTime, officeStatus, type LocalTime } from '@/lib/hours';

// opensAt: the day's opening time, already formatted for the current locale
type Row = { day: number; label: string; hours: string | null; opensAt: string | null };

export function OfficeHours({ rows }: { rows: Row[] }) {
  const t = useTranslations('contact');
  // null until mounted so server and client render the same markup
  const [now, setNow] = useState<LocalTime | null>(null);

  useEffect(() => {
    const tick = () => setNow(localTime(site.timeZone));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const status = now && officeStatus(now, site.hours);
  const isOpen = !!status?.open;

  let nextOpening = ' ';
  if (status && !status.open && status.inDays >= 0) {
    const row = rows.find((r) => r.day === status.nextDay);
    const time = row?.opensAt ?? '';
    nextOpening =
      status.inDays === 0
        ? t('opensToday', { time })
        : status.inDays === 1
          ? t('opensTomorrow', { time })
          : t('opensOn', { day: row?.label ?? '', time });
  }

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{t('hoursTitle')}</h3>
          <p className="text-sm text-muted">{t('hoursNote')}</p>
        </div>
        <div aria-live="polite" className={`flex flex-col items-end gap-1 transition-opacity ${now ? 'opacity-100' : 'opacity-0'}`}>
          <p
            className={`inline-flex min-h-8 items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
              isOpen ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300' : 'bg-soft text-muted'
            }`}
          >
            <span aria-hidden className={`relative flex size-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-steel'}`}>
              {isOpen && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />}
            </span>
            {now ? (isOpen ? t('openNow') : t('closedNow')) : ' '}
          </p>
          {!isOpen && <p className="px-1 text-xs font-medium text-muted">{nextOpening}</p>}
        </div>
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
