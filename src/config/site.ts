/**
 * Single source for contact and business details (see /brand/BRAND.md §2).
 */
export const site = {
  url: 'https://highnessofjustice.com',
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
    { day: 6, open: '09:00', close: '20:00' },
    { day: 0, open: '09:00', close: '20:00' },
    { day: 1, open: '09:00', close: '20:00' },
    { day: 2, open: '09:00', close: '20:00' },
    { day: 3, open: '09:00', close: '20:00' },
    { day: 4, open: '09:00', close: '20:00' },
    { day: 5, open: null, close: null },
  ] as { day: number; open: string | null; close: string | null }[],
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
