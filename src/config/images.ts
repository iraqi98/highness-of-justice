/**
 * All photography in one place. These are Unsplash placeholders; swap `src`
 * for the firm's own photos (local `/public/...` paths work too) when available.
 */
type Photo = { src: string; alt: { ar: string; en: string } };

// Images are served as-is (static export, no optimizer), so request a size that fits each use.
const unsplash = (id: string, width = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  heroJustice: {
    src: unsplash('1589829545856-d10d557cf95f'),
    alt: { en: 'Bronze statue of Lady Justice holding the scales', ar: 'تمثال برونزي لسيدة العدالة تحمل الميزان' },
  },
  aboutLibrary: {
    src: unsplash('1505664194779-8beaceb93744'),
    alt: { en: 'Law library with classical busts and leather-bound books', ar: 'مكتبة قانونية بتماثيل نصفية كلاسيكية وكتب مجلدة' },
  },
  visionBaghdad: {
    src: unsplash('1737314417437-b97a7e6229c5'),
    alt: { en: 'Central Bank of Iraq tower beside the Tigris in Baghdad', ar: 'برج البنك المركزي العراقي على ضفاف دجلة في بغداد' },
  },
  trackBaghdad: {
    src: unsplash('1737314417275-92a2657112c8', 2000),
    alt: { en: 'The Al-Shaheed Monument in Baghdad', ar: 'نصب الشهيد في بغداد' },
  },
  contractSigning: {
    src: unsplash('1450101499163-c8848c66ca85'),
    alt: { en: 'A hand signing a contract with a fountain pen', ar: 'يد توقّع عقداً بقلم حبر' },
  },
  clientMeeting: {
    src: unsplash('1551836022-d5d88e9218df'),
    alt: { en: 'Two professionals reviewing documents together at a table', ar: 'مختصتان تراجعان المستندات معاً على طاولة' },
  },
  contactOffice: {
    src: unsplash('1497366811353-6870744d04b2'),
    alt: { en: 'Bright modern office meeting room', ar: 'قاعة اجتماعات حديثة ومضيئة في مكتب' },
  },
  // Service pages
  taxDocuments: {
    src: unsplash('1554224155-6726b3ff858f'),
    alt: { en: 'Tax forms, receipts and a calculator on a desk', ar: 'نماذج ضريبية وإيصالات وآلة حاسبة على مكتب' },
  },
  gavel: {
    src: unsplash('1575505586569-646b2ca898fc'),
    alt: { en: "Close-up of a judge's wooden gavel", ar: 'لقطة قريبة لمطرقة قاضٍ خشبية' },
  },
  employmentContract: {
    src: unsplash('1521791055366-0d553872125f'),
    alt: { en: 'A hand signing a printed contract', ar: 'يد توقّع عقداً مطبوعاً' },
  },
  ideasSession: {
    src: unsplash('1532619675605-1ede6c2ed2b0'),
    alt: { en: 'Two colleagues planning ideas on a whiteboard', ar: 'زميلان يخططان لأفكار على لوح أبيض' },
  },
  advisoryDesk: {
    src: unsplash('1454165804606-c3d57bc86b40'),
    alt: { en: 'Professionals reviewing documents at a desk with laptops', ar: 'مختصون يراجعون مستندات على مكتب مع حواسيب محمولة' },
  },
  executive: {
    src: unsplash('1507679799987-c73779587ccf'),
    alt: { en: 'Executive in a dark suit buttoning his jacket', ar: 'مدير ببدلة داكنة يغلق سترته' },
  },
  // Industries
  oilGas: {
    src: unsplash('1726731782158-fcf6822b6ca4', 800),
    alt: { en: 'Oil refinery towers and pipework', ar: 'أبراج وأنابيب مصفاة نفط' },
  },
  energy: {
    src: unsplash('1473341304170-971dccb5ac1e', 800),
    alt: { en: 'High-voltage power lines at sunset', ar: 'خطوط نقل الطاقة الكهربائية عند الغروب' },
  },
  construction: {
    src: unsplash('1541888946425-d81bb19240f5', 800),
    alt: { en: 'Engineers on a large construction site', ar: 'مهندسون في موقع إنشاءات كبير' },
  },
  trade: {
    src: unsplash('1578575437130-527eed3abbec', 800),
    alt: { en: 'Container ship being loaded at a port', ar: 'سفينة حاويات قيد التحميل في الميناء' },
  },
  logistics: {
    src: unsplash('1586528116311-ad8dd3c8310d', 800),
    alt: { en: 'Large logistics warehouse with stocked shelves', ar: 'مستودع لوجستي كبير برفوف مملوءة' },
  },
  technology: {
    src: unsplash('1518770660439-4636190af475', 800),
    alt: { en: 'Close-up of an electronic circuit board', ar: 'لقطة قريبة للوحة دوائر إلكترونية' },
  },
  healthcare: {
    src: unsplash('1519494026892-80bbd2d6fd0d', 800),
    alt: { en: 'Modern hospital reception', ar: 'استقبال مستشفى حديث' },
  },
  tourism: {
    src: unsplash('1626304758701-7432c13bc85f', 800),
    alt: { en: 'Hillside town beneath rugged mountains', ar: 'بلدة على سفح جبال وعرة' },
  },
} satisfies Record<string, Photo>;

export type ImageKey = keyof typeof images;

export const industryImages: ImageKey[] = [
  'oilGas',
  'energy',
  'construction',
  'trade',
  'logistics',
  'technology',
  'healthcare',
  'tourism',
];
