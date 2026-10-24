'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { whatsappUrl } from '@/config/site';
import { WhatsAppIcon } from './WhatsAppIcon';
import { btn } from './ui';

type Field = 'name' | 'phone' | 'service';
type Errors = Partial<Record<Field, string>>;

// Accept Arabic-Indic and Persian digits as typed on Arabic keyboards
const normalizeDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

function validPhone(raw: string) {
  const v = normalizeDigits(raw).trim();
  if (!/^\+?[\d\s\-().]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

const field =
  'mt-2 block w-full rounded-xl border bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-navy/20 dark:focus:ring-white/20';

export function ConsultForm({ services }: { services: { slug: string; title: string }[] }) {
  const t = useTranslations('contact.form');
  const [errors, setErrors] = useState<Errors>({});
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Preselect the practice area when arriving from a service page (/?service=<slug>#contact)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    const match = slug && services.find((s) => s.slug === slug);
    if (match && serviceRef.current) serviceRef.current.value = match.title;
  }, [services]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const service = String(data.get('service') ?? '');
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (name.length < 2) next.name = t('errors.name');
    if (!validPhone(phone)) next.phone = t('errors.phone');
    if (!service) next.service = t('errors.service');
    setErrors(next);

    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const lines = [
      t('wa.greeting'),
      '',
      `${t('wa.name')}: ${name}`,
      `${t('wa.phone')}: ${normalizeDigits(phone)}`,
      `${t('wa.service')}: ${service}`,
    ];
    if (message) lines.push(`${t('wa.message')}: ${message}`);
    const text = lines.join('\n');

    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  };

  const describe = (f: Field) => (errors[f] ? `${f}-error` : undefined);
  const border = (f: Field) => (errors[f] ? 'border-red-600 dark:border-red-400' : 'border-line');

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-ink">
          {t('name')} <span aria-hidden className="text-steel">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={describe('name')}
          className={`${field} ${border('name')}`}
        />
        {errors.name && <p id="name-error" className="mt-2 text-sm text-red-700 dark:text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-semibold text-ink">
          {t('phone')} <span aria-hidden className="text-steel">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="+964 7XX XXX XXXX"
          required
          aria-invalid={!!errors.phone}
          aria-describedby={describe('phone')}
          className={`${field} ${border('phone')} rtl:text-end`}
        />
        {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-700 dark:text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-semibold text-ink">
          {t('service')} <span aria-hidden className="text-steel">*</span>
        </label>
        <select
          ref={serviceRef}
          id="service"
          name="service"
          required
          defaultValue=""
          aria-invalid={!!errors.service}
          aria-describedby={describe('service')}
          className={`${field} ${border('service')} appearance-none bg-[length:1rem] bg-no-repeat pe-10 ltr:bg-[right_1rem_center] rtl:bg-[left_1rem_center]`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A7A9AC' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            {t('servicePlaceholder')}
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value={t('other')}>{t('other')}</option>
        </select>
        {errors.service && <p id="service-error" className="mt-2 text-sm text-red-700 dark:text-red-400">{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className={`${field} border-line resize-y`}
        />
      </div>

      <button type="submit" className={`${btn.base} ${btn.primary} w-full py-3.5 text-base`}>
        <WhatsAppIcon className="size-5" />
        {t('submit')}
      </button>
      <p className="text-center text-xs leading-6 text-muted">{t('note')}</p>
    </form>
  );
}
