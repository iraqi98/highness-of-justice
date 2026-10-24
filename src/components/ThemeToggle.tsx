'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  const toggle = () => {
    const root = document.documentElement;
    const dark = !root.classList.contains('dark');
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  };
  // Icons switch via CSS so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      className={`grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-soft focus-visible:outline-2 focus-visible:outline-navy dark:focus-visible:outline-white ${className}`}
    >
      <Moon aria-hidden className="size-[18px] dark:hidden" strokeWidth={1.6} />
      <Sun aria-hidden className="hidden size-[18px] dark:block" strokeWidth={1.6} />
      <span className="sr-only dark:hidden">{t('themeToDark')}</span>
      <span className="sr-only hidden dark:inline">{t('themeToLight')}</span>
    </button>
  );
}
