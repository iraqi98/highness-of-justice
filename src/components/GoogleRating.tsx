import { getTranslations } from 'next-intl/server';
import { site } from '@/config/site';

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} fill="currentColor">
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}

/** "★★★★★ 5.0 · 12 Google reviews", linking to the Google Business Profile. */
export async function GoogleRating({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const t = await getTranslations('rating');
  const { value, count } = site.googleRating;
  const href = site.social.googleMaps;
  if (!href || !count) return null;

  const score = value.toFixed(1);
  const onNavy = tone === 'dark';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('aria', { value: score, count })}
      className={`group inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
        onNavy
          ? 'border border-white/15 bg-white/5 text-mist/85 hover:border-white/30 hover:bg-white/10 focus-visible:outline-white'
          : 'border border-line bg-card text-muted hover:border-navy/30 focus-visible:outline-navy dark:hover:border-white/30 dark:focus-visible:outline-white'
      } ${className}`}
    >
      <span className={`flex gap-0.5 ${onNavy ? 'text-silver' : 'text-steel'}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-3.5" />
        ))}
      </span>
      <bdi dir="ltr" className={`font-semibold tabular-nums ${onNavy ? 'text-white' : 'text-ink'}`}>
        {score}
      </bdi>
      <span aria-hidden className="opacity-50">
        ·
      </span>
      <span className="group-hover:underline group-hover:underline-offset-4">{t('reviews', { count })}</span>
    </a>
  );
}
