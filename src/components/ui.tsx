import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'light' }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold ltr:uppercase ltr:tracking-[0.18em] ltr:text-xs ${
        tone === 'light' ? 'text-mist/80' : 'text-navy-400 dark:text-steel'
      }`}
    >
      <span aria-hidden className={`h-px w-8 ${tone === 'light' ? 'bg-silver' : 'bg-navy/40 dark:bg-steel/60'}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  tone = 'default',
  className = '',
  as: Tag = 'h2',
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  tone?: 'default' | 'light';
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={className} data-reveal>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Tag
        className={`mt-5 text-balance text-3xl font-semibold leading-[1.25] sm:text-4xl lg:text-[2.75rem] ltr:tracking-tight ${
          tone === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Tag>
    </div>
  );
}

export const btn = {
  base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2',
  primary:
    'bg-navy text-white hover:bg-navy-700 focus-visible:outline-navy dark:bg-white dark:text-navy dark:hover:bg-mist dark:focus-visible:outline-white',
  light: 'bg-white text-navy hover:bg-mist focus-visible:outline-white',
};

export const pad = (n: number) => String(n).padStart(2, '0');
