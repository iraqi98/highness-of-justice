import type { Metadata } from 'next';
import { site } from '@/config/site';
import { withBase } from '@/config/base-path';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة · Page not found',
  robots: { index: false },
};

// Exported as 404.html, which GitHub Pages serves for unknown paths.
// System fonts only: importing the web fonts here would also preload them on the root redirect page.
export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="grid min-h-screen place-items-center bg-navy p-6 font-[system-ui,sans-serif] text-white">
        <main className="max-w-xl text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase('/brand/emblem-white.svg')} alt="" width={96} height={96} className="mx-auto size-24" />
          <p className="silver-text mt-6 text-7xl font-bold tabular-nums">404</p>
          <div aria-hidden className="silver-rule mx-auto mt-6 w-40" />
          <h1 className="mt-8 text-2xl font-semibold">الصفحة غير موجودة</h1>
          <p className="mt-2 text-mist/75">لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
          <div lang="en" dir="ltr" className="mt-8">
            <h2 className="text-xl font-semibold">Page not found</h2>
            <p className="mt-2 text-mist/75">We couldn&apos;t find the page you were looking for.</p>
          </div>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href={withBase('/ar/')} hrefLang="ar" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy hover:bg-mist">
              العودة إلى الرئيسية
            </a>
            <a
              href={withBase('/en/')}
              hrefLang="en"
              lang="en"
              className="silver-ring rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Back to home
            </a>
          </p>
          <p className="mt-10 text-sm text-mist/60">{site.name.ar} · {site.name.en}</p>
        </main>
      </body>
    </html>
  );
}
