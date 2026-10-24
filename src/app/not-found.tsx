import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#141641', color: '#fff', minHeight: '100vh', display: 'grid', placeItems: 'center', margin: 0 }}>
        <main style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 56, margin: 0, fontWeight: 700 }}>404</p>
          <p>الصفحة غير موجودة · Page not found</p>
          <p>
            <Link href="/ar" style={{ color: '#E6E7E8' }}>العربية</Link>
            {'  ·  '}
            <Link href="/en" style={{ color: '#E6E7E8' }}>English</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
