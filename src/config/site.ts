/**
 * Single source for contact and business details (see /brand/BRAND.md §2).
 */
export const site = {
  /**
   * Public site URL, no trailing slash. Canonical/hreflang, sitemap, robots, Open Graph
   * and JSON-LD all derive from it. To move to the client's new domain: set it here
   * and add public/CNAME containing the bare domain.
   * NOTE: highnessofjustice.com is NOT controlled by the client — never use it.
   */
  url: 'https://iraqi98.github.io/highness-of-justice',
  name: {
    en: 'Highness of Justice Law Firm & Legal Consultancy',
    ar: 'شركة سمو العدالة للمحاماة والاستشارات القانونية',
  },
  shortName: { en: 'Highness of Justice', ar: 'سمو العدالة' },
  email: 'info@hoj.legal',
  phone: { display: '+964 774 975 0001', e164: '+9647749750001' },
  whatsapp: '9647749750001',
  address: {
    en: 'Baghdad – Al-Mansour, 613-32-3',
    ar: 'بغداد – المنصور، ⁦613-32-3⁩', // LRI/PDI keep the number in order
    street: '613-32-3, Al-Mansour',
    locality: 'Baghdad',
    country: 'IQ',
  },
  // Office pin (client-confirmed)
  geo: { lat: 33.323154, lng: 44.332428 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=33.323154,44.332428',
  // From the official stamp (رقم التسجيل)
  registrationNo: '25835',
  timeZone: 'Asia/Baghdad',
  // Day numbers follow Date#getDay(): 0 = Sunday … 6 = Saturday. Listed in display order.
  hours: [
    { day: 6, open: '13:00', close: '20:00' },
    { day: 0, open: '13:00', close: '20:00' },
    { day: 1, open: '13:00', close: '20:00' },
    { day: 2, open: '13:00', close: '20:00' },
    { day: 3, open: '13:00', close: '20:00' },
    { day: 4, open: '13:00', close: '20:00' },
    { day: 5, open: null, close: null },
  ] as { day: number; open: string | null; close: string | null }[],
  // Leave a URL empty ('') to hide its icon/link everywhere.
  social: {
    instagram: 'https://www.instagram.com/hj.legal/',
    facebook: 'https://www.facebook.com/profile.php?id=61574734876611',
    linkedin: 'https://www.linkedin.com/in/highness-of-justice-legal-09bb50407/',
    // Google Business Profile listing
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=%D8%B4%D8%B1%D9%83%D8%A9+%D8%B3%D9%85%D9%88+%D8%A7%D9%84%D8%B9%D8%AF%D8%A7%D9%84%D8%A9+%D9%84%D9%84%D9%85%D8%AD%D8%A7%D9%85%D8%A7%D8%A9+%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9',
  } as Record<'instagram' | 'facebook' | 'linkedin' | 'googleMaps', string>,
  // From the Google Business Profile. Static: update by hand when the numbers change.
  googleRating: { value: 5.0, count: 12 },
} as const;

/** Absolute public URL for a site path, e.g. absoluteUrl('/ar/'). */
export const absoluteUrl = (path = '/') => `${site.url}${path}`;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
