import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/config/site';
import { withBase } from '@/config/base-path';
import { fontClassName } from '@/styles/fonts';

// "/" has no content of its own: send visitors to the default (Arabic) locale.
// Static hosting has no server redirects, so use meta refresh + JS, with links as a fallback.
const target = withBase('/ar/');

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: `${site.name.ar} · ${site.name.en}`,
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/ar/') },
};

export default function RootRedirect() {
  return (
    <html lang="ar" dir="rtl" className={fontClassName}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)})` }} />
      </head>
      <body className="grid min-h-screen place-items-center bg-navy p-6 text-center text-white">
        <main>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/brand/logo-white.svg')} alt={site.name.ar} width={160} height={160} className="mx-auto size-40" />
          <p className="mt-8 flex items-center justify-center gap-4 text-lg">
            <a href={withBase('/ar/')} hrefLang="ar" className="underline-offset-4 hover:underline">
              العربية
            </a>
            <span aria-hidden className="text-steel">·</span>
            <a href={withBase('/en/')} hrefLang="en" lang="en" className="underline-offset-4 hover:underline">
              English
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
