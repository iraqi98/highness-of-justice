'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { withBase } from '@/config/base-path';
import { FOREIGN_COMPANIES, pageHref, type PagePath } from '@/lib/links';
import { ThemeToggle } from './ThemeToggle';
import { btn } from './ui';

// Home-page sections, except "track" which is its own page
const NAV = ['about', 'practice', 'industries', 'track', 'process', 'why', 'contact'] as const;

/** @param page the page this header is rendered on, so the language switch stays on it */
export function Header({ page = '' }: { page?: PagePath }) {
  const t = useTranslations();
  const locale = useLocale();
  const other = locale === 'ar' ? 'en' : 'ar';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navHref = (key: (typeof NAV)[number]) =>
    key === 'track' ? pageHref(locale, FOREIGN_COMPANIES) : pageHref(locale, '', key);
  const isCurrent = (key: (typeof NAV)[number]) => key === 'track' && page === FOREIGN_COMPANIES;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent bg-bg'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        {t('common.skip')}
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href={pageHref(locale)} className="flex min-w-0 items-center gap-3" aria-label={t('common.home')}>
          <Image src={withBase('/brand/emblem-navy.svg')} alt="" width={44} height={44} loading="eager" className="size-11 dark:hidden" />
          <Image src={withBase('/brand/emblem-white.svg')} alt="" width={44} height={44} loading="eager" className="hidden size-11 dark:block" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[15px] font-bold text-ink ltr:text-[12px] ltr:uppercase sm:ltr:text-[13px] sm:ltr:tracking-wide">
              {t('brand.shortName')}
            </span>
            <span className="truncate text-[11px] text-muted">{locale === 'ar' ? 'Highness of Justice' : 'سمو العدالة'}</span>
          </span>
        </a>

        <nav aria-label="Primary" className="ms-auto hidden xl:block">
          <ul className="flex items-center">
            {NAV.map((key) => (
              <li key={key}>
                <a
                  href={navHref(key)}
                  aria-current={isCurrent(key) ? 'page' : undefined}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-steel aria-[current=page]:underline-offset-8 2xl:px-3 2xl:text-sm"
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-1 xl:ms-2">
          {/* Plain <a>: switching locale swaps <html lang/dir>, fonts and metadata, so load a fresh document */}
          <a
            href={pageHref(other, page)}
            hrefLang={other}
            lang={other}
            aria-label={t('common.switchLanguageLabel')}
            className="rounded-full px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft"
          >
            {t('common.switchLanguage')}
          </a>
          <ThemeToggle />
          <a href={pageHref(locale, '', 'contact')} className={`${btn.base} ${btn.primary} ms-2 max-sm:hidden`}>
            {t('common.book')}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-soft xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span className="sr-only">{open ? t('common.close') : t('common.menu')}</span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-bg xl:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="grid gap-1">
            {NAV.map((key) => (
              <li key={key}>
                <a
                  href={navHref(key)}
                  aria-current={isCurrent(key) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-soft aria-[current=page]:bg-soft"
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={pageHref(locale, '', 'contact')}
            onClick={() => setOpen(false)}
            className={`${btn.base} ${btn.primary} mt-4 w-full sm:hidden`}
          >
            {t('common.book')}
          </a>
        </nav>
      </div>
    </header>
  );
}
