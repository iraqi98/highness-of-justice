# Highness of Justice — Brand Reference

Source of truth for the website build. Compiled 2026-10-24 from the files in `/brand`:

| File | What it is |
|---|---|
| `brand guide copy1 (1).pdf` | Official brand guidelines (43 pp: logo, typography, colour, stationery, mock-ups). All text is outlined; read visually. |
| `final logo copy 2.pdf` | Master logo, vector (2000×2000 pt artboard) |
| `stamp.pdf` | Official stamp/seal, vector |
| `Highness of Justice And Law Profile.pdf` | Full bilingual company profile (16 pp): about, vision, 11 services, industries, why us, team, contact |
| `Highness of Justice — Company Profile (1).pdf` | Newer short English deck (10 pp): about, clients, practice areas, process, why us, team, contact |

---

## 1. Identity

| | English | Arabic |
|---|---|---|
| **Legal / full name** | Highness of Justice Law Firm & Legal Consultancy | شركة سمو العدالة للمحاماة والاستشارات القانونية |
| **Short name** | Highness of Justice | سمو العدالة |
| **Tagline** | Your Trusted Legal Partner in Iraq | شريكك القانوني الموثوق في العراق |
| **Long tagline** | Highness of Justice Law Firm – Your Trusted Legal Partner in Iraq | شركة سمو العدالة – شريكك القانوني الموثوق في العراق |
| **Location line** | Law Firm & Legal Consultancy · Baghdad | — |

Secondary headlines used in the short profile (English only in source):
- "A stable legal footing for doing business in Iraq."
- "Your legal partner for entering and operating in Iraq."
- "Let's discuss your next step in Iraq."

Stamp registration number: **رقم التسجيل 25835** (Registration No. 25835).

## 2. Contact (client-confirmed; overrides all PDFs)

| | |
|---|---|
| Website | https://iraqi98.github.io/highness-of-justice (temporary, GitHub Pages) — the client has bought a new domain, to be confirmed |
| ⚠ Domain warning | **highnessofjustice.com is NOT controlled by the client — do not link to it.** The company profile PDFs list www.highnessofjustice.com; ignore that. |
| Email | info@hoj.legal |
| Phone / WhatsApp | +964 774 975 0001 (`tel:+9647749750001`, `https://wa.me/9647749750001`) |
| Address (EN) | Baghdad – Al-Mansour, 613-32-3 |
| Address (AR) | بغداد – المنصور، 613-32-3 |
| Coordinates | 33.323154, 44.332428 ([Google Maps](https://www.google.com/maps/search/?api=1&query=33.323154,44.332428)) |
| Office hours | Saturday–Thursday 1:00 PM – 8:00 PM, Friday closed (Asia/Baghdad) · السبت–الخميس 1:00 م – 8:00 م، الجمعة مغلق |
| Instagram | https://www.instagram.com/hj.legal/ |
| Facebook | https://www.facebook.com/profile.php?id=61574734876611 |
| LinkedIn | https://www.linkedin.com/in/highness-of-justice-legal-09bb50407/ |
| Google Business Profile | Google Maps listing "شركة سمو العدالة للمحاماة والاستشارات القانونية" · rating 5.0 from 12 reviews (as of 2026-10-24; update `googleRating` in `src/config/site.ts` when it changes) |

> The stationery mock-ups in the brand guide show older/placeholder contact details. Ignore them.

---

## 3. Colours

| Token | Hex | Source | Use |
|---|---|---|---|
| `navy` (primary) | **#141641** | Logo and stamp vector artwork | Primary brand colour, text, dark backgrounds |
| `navy` (guide swatch) | #151640 | Brand guide palette page | Same colour, 1 step off. Standardise on **#141641**. |
| `grey-light` | **#E6E7E8** | Palette | Light surfaces, section backgrounds |
| `white` | **#FFFFFF** | Palette | Backgrounds, text on navy |
| `grey-mid` | #A7A9AC | Used in guide (logo structure diagram) | Secondary/muted elements |
| `silver` gradient | radial **#FFFFFF → #B4B6B8** | Logo ribbon and outer arcs | Logo only. Do not use as a UI colour. |

Navy tints shown on the palette page (sampled from the render, approximate): `#26254E`, `#36355C`, `#49466C`, `#5D5A7E`.
Grey tints (approximate): `#DCDBDC`, `#BCB9BC`, `#9F9B9E`, `#827E82`.

The palette is deliberately minimal: navy + white + light grey. No accent colour is defined.

```css
:root {
  --hoj-navy: #141641;
  --hoj-navy-80: #36355C;
  --hoj-navy-60: #5D5A7E;
  --hoj-grey-light: #E6E7E8;
  --hoj-grey-mid: #A7A9AC;
  --hoj-silver: #B4B6B8;
  --hoj-white: #FFFFFF;
}
```

## 4. Typography

As specified in the brand guide (Typography section, pp. 7–8):

| Role | Font | Weights shown |
|---|---|---|
| **Arabic** | **Bahij TheSansArabic** | Bold, SemiBold, Light |
| **English (Latin)** | **Somar** | Bold, SemiBold, Light |

- The logo and stamp wordmarks are set in **Somar Regular** (embedded in the logo PDFs).
- The full company profile was laid out in different fonts (29LT Bukra, Helvetica World, Open Sans). These are **not** in the guide; treat them as off-brand.
- **The font files are not included in `/brand`.** Webfont files (WOFF2) and web licences for Somar and Bahij TheSansArabic must be obtained from the client. Fallback stack until then:
  - Arabic: `"Bahij TheSansArabic", "IBM Plex Sans Arabic", "Noto Kufi Arabic", sans-serif`
  - English: `"Somar", "Inter", "Segoe UI", sans-serif`

## 5. Logo files (`/public/brand/`)

All SVGs are pure vector: text is converted to outlines, there are no embedded bitmaps, and the logo's silver gradients are rebuilt as a native SVG `radialGradient`. Each SVG has a square viewBox cropped to the artwork with a small margin. PNGs are square with transparent backgrounds.

| Variant | SVG | PNG | Use on |
|---|---|---|---|
| Main logo, full colour (navy + silver) | `logo.svg` | `logo-512.png`, `logo-1024.png` | White / light backgrounds |
| Logo, mono navy (ribbon text knocked out in white) | `logo-navy.svg` | `logo-navy-512.png`, `logo-navy-1024.png` | Light backgrounds, single-colour print |
| Logo, mono white (ribbon text navy) | `logo-white.svg` | `logo-white-512.png`, `logo-white-1024.png` | Navy / dark backgrounds |
| Emblem only (stars, arcs, Lady Justice), full colour | `emblem.svg` | `emblem-512.png`, `emblem-1024.png` | Icon, small sizes, header mark |
| Emblem, navy | `emblem-navy.svg` | `emblem-navy-512.png`, `emblem-navy-1024.png` | Light backgrounds |
| Emblem, white | `emblem-white.svg` | `emblem-white-512.png`, `emblem-white-1024.png` | Dark backgrounds |
| Stamp / seal, navy | `stamp.svg` | `stamp-512.png`, `stamp-1024.png` | Light backgrounds, trust badges |
| Stamp / seal, white | `stamp-white.svg` | `stamp-white-512.png`, `stamp-white-1024.png` | Dark backgrounds |
| App icon source (white emblem on navy) | `app-icon.svg` | — | Source for the icons below |

The mono navy and mono white versions follow the brand guide's "Logo Color Use" page.

Site icons (in `/public/`):

| File | Details |
|---|---|
| `favicon.ico` | 16, 32, 48, 64 px; white emblem on rounded navy tile |
| `favicon.svg` | Vector favicon, same design |
| `apple-touch-icon.png` | 180×180, full-bleed navy (iOS rounds the corners) |
| `icon-192.png`, `icon-512.png` | For a web manifest |

Logo notes:
- The logo lockup contains: three stars, two concentric open arcs (navy inner, silver outer), Lady Justice (blindfold, scales, sword), a ribbon reading **شركة سمو العدالة / HIGHNESS OF JUSTICE**, and beneath it **لخدمات المحاماة والاستشارات القانونية / LAW FIRM & LEGAL CONSUL**.
- ⚠ The official artwork says **"LAW FIRM & LEGAL CONSUL"** (truncated) and **"لخدمات المحاماة…"**, whereas the confirmed name is "…Legal Consultancy" / "شركة سمو العدالة للمحاماة…". The files are kept faithful to the source. Ask the client whether the logo should be corrected.

## 6. Visual style (from guide and profiles)

- Deep navy fields, often with a dark, duotone-tinted photo underneath: gavel, Lady Justice statue, law books, business people.
- Large, extra-bold section numerals ("01", "02") next to a short title.
- A thin navy rule with a page number in the bottom-left corner.
- Large-radius arch and semicircle shapes: a navy half-disc behind vertical headings, and arch-topped panels on notebooks and bags.
- A faint, large Lady Justice watermark on light backgrounds.
- Plenty of white or light-grey space; restrained and formal.

---

## 7. Content

### 7.1 About

**EN (full profile)**
Highness of Justice Law Firm & Legal Consultancy is a specialized legal practice dedicated to providing comprehensive legal and administrative solutions to both local and international companies, with a particular focus on supporting investors and foreign businesses seeking to enter and operate within the Iraqi market in full compliance with applicable legal and regulatory frameworks.

We deliver professional legal services through a team of experienced lawyers and consultants specializing in investment law, commercial law, taxation, contracts, labor law, intellectual property protection, and governmental relations—ensuring our clients a stable, secure, and legally compliant business environment that supports growth and expansion throughout Iraq.

**AR**
تُعد شركة سمو العدالة للمحاماة والاستشارات القانونية من الشركات القانونية المتخصصة في تقديم الحلول القانونية والإدارية المتكاملة للشركات المحلية والدولية، مع تركيز خاص على دعم المستثمرين والشركات الأجنبية الراغبة بالدخول إلى السوق العراقي والعمل وفق الأطر القانونية والتنظيمية المعتمدة.

نقدم خدمات قانونية احترافية من خلال فريق من المحامين والمستشارين ذوي الخبرة في مجالات الاستثمار، والقانون التجاري، والضرائب، والعقود، وقوانين العمل، وحماية الملكية الفكرية، والمتابعة الحكومية، بما يضمن لعملائنا بيئة أعمال مستقرة وآمنة تدعم النمو والتوسع داخل العراق.

**EN (short, from the newer deck)**
Highness of Justice is a Baghdad law firm and legal consultancy. We help create a stable legal environment for local and international investment, with a particular focus on helping foreign companies comply with Iraqi law to the highest professional standards.

**AR (short)**
تسهم شركة سمو العدالة للمحاماة والاستشارات القانونية في خلق بيئة قانونية مستقرة تدعم الاستثمارات والشركات المحلية والدولية، مع التركيز على تلبية احتياجات الشركات الأجنبية في الامتثال للقوانين العراقية بأعلى معايير الاحترافية.

### 7.2 Vision — رؤيتنا

**EN:** To become the leading legal partner for local and international businesses in Iraq by delivering integrated legal and administrative services that contribute to strengthening the investment environment and ensuring full compliance with Iraqi laws and regulations.

**AR:** أن نكون الشريك القانوني الأول للشركات المحلية والدولية في العراق، من خلال تقديم خدمات قانونية وإدارية متكاملة تسهم في تعزيز بيئة الاستثمار وتحقيق الامتثال الكامل للقوانين العراقية.

*(No separate Mission or Values statement exists in the source files. The closest thing to values is in "Why choose us": expertise, confidentiality, professionalism, transparency, speed.)*

### 7.3 Services — خدماتنا (11, from the full profile)

**01 — Company Formation & Foreign Branch Registration | تأسيس الشركات والفروع الأجنبية**
- Establishment and registration of companies of all types under Iraqi law — تأسيس وتسجيل الشركات بجميع أنواعها وفق القوانين العراقية
- Registration of foreign branches and representative offices — تأسيس الفروع والمكاتب التمثيلية للشركات الأجنبية
- Preparation and follow-up of legal incorporation documents — إعداد ومتابعة الوثائق القانونية الخاصة بالتأسيس
- Completion of registration procedures before the relevant authorities — استكمال إجراءات التسجيل لدى الجهات المختصة

**02 — Tax & Financial Legal Advisory | الاستشارات الضريبية والمالية القانونية**
- Providing legal consultations related to Iraqi tax regulations — تقديم الاستشارات المتعلقة بالضرائب العراقية
- Monitoring companies' tax obligations — متابعة الالتزامات الضريبية للشركات *(the source English wrongly repeats "Obtaining work permits…" here; corrected to match the Arabic)*
- Representing companies in tax disputes and proceedings — تمثيل الشركات في المنازعات الضريبية
- Developing legal strategies to minimize financial and regulatory risks — وضع استراتيجيات قانونية لتقليل المخاطر المالية والتنظيمية

**03 — Support for Foreign Companies in Iraq | دعم الشركات الأجنبية في العراق**
- Legal and administrative support for foreign companies operating in Iraq — تقديم الدعم القانوني والإداري للشركات الأجنبية
- Representation before governmental and regulatory authorities — تمثيل الشركات أمام الجهات الرسمية والتنظيمية
- Advisory on taxation and customs regulations — تقديم المشورة المتعلقة بالضرائب والرسوم الجمركية
- Facilitating market entry and operational establishment in Iraq — تسهيل دخول الشركات الأجنبية إلى السوق العراقي

**04 — Contracts & Legal Advisory | الاستشارات القانونية للشركات والمؤسسات**
- Drafting, reviewing, and negotiating commercial contracts — إعداد وصياغة ومراجعة العقود التجارية
- Providing legal consultation for companies and institutions — تقديم الاستشارات القانونية للشركات والمؤسسات
- Reviewing agreements and memoranda of understanding — مراجعة الاتفاقيات ومذكرات التفاهم
- Legal risk management for contracts and business transactions — إدارة المخاطر القانونية للعقود والمعاملات

**05 — Dispute Resolution & Arbitration | تسوية النزاعات والتحكيم**
- Legal representation before Iraqi courts at all levels — التمثيل أمام المحاكم العراقية بمختلف درجاتها
- Management of commercial and civil litigation — إدارة الدعاوى التجارية والمدنية
- Commercial arbitration and mediation services — خدمات التحكيم والوساطة التجارية
- Protecting clients' interests throughout dispute proceedings — حماية مصالح العملاء أثناء التقاضي

**06 — Labor Law & Human Resources | قوانين العمل والموارد البشرية**
- Drafting employment contracts and internal policies — إعداد عقود العمل واللوائح الداخلية
- Advisory on Iraqi labor law and employment regulations — تقديم الاستشارات المتعلقة بقانون العمل العراقي
- Handling social security and employment insurance matters — متابعة قضايا الضمان الاجتماعي والتأمينات
- Representation in labor disputes and employment claims — تمثيل الشركات في النزاعات العمالية

**07 — Intellectual Property Protection | حماية الملكية الفكرية**
- Registering trademarks, patents, and copyrights — تسجيل العلامات التجارية وبراءات الاختراع وحقوق التأليف والنشر
- Advising on intellectual property protection strategies — تقديم المشورة حول استراتيجيات حماية حقوق الملكية الفكرية
- Legal representation in intellectual property infringement cases — التمثيل القانوني في نزاعات انتهاك الملكية الفكرية

**08 — Government Relations & Business Compliance | المتابعة الحكومية وامتثال الأعمال**
- Management of governmental procedures and official transactions — متابعة المعاملات والإجراءات الحكومية
- Obtaining licenses, permits, and regulatory approvals — الحصول على الموافقات والتراخيص والإجازات الرسمية
- Legal advisory on governmental regulations and compliance requirements — تقديم الاستشارات المتعلقة بالأنظمة والتعليمات الحكومية
- Resolving administrative and regulatory obstacles for businesses — معالجة المعوقات الإدارية والتنظيمية للشركات

**09 — Advisory & Administrative Services | الخدمات الاستشارية والإدارية**
- Project planning and management support — التخطيط وإدارة المشاريع
- Business development and operational improvement — تطوير الأعمال وتحسين العمليات
- Public relations and strategic business support — العلاقات العامة وتطوير الأعمال
- Accounting support and administrative auditing services — الخدمات المحاسبية والتدقيق الإداري

**10 — Work Visas & Foreign Personnel Support | تأشيرات العمل ودعم الكوادر الأجنبية**
- Processing work visa and residency procedures — متابعة إجراءات تأشيرات العمل والإقامة
- Obtaining work permits and authorizations for foreign employees — إصدار إجازات وتصاريح العمل للأجانب
- Administrative support for expatriate staff and executives — تقديم الدعم الإداري للموظفين الأجانب

**11 — Industries We Serve | القطاعات التي نخدمها**

| EN | AR |
|---|---|
| Oil & Gas | النفط والغاز |
| Energy & Renewable Energy | الطاقة والطاقة المتجددة |
| Construction & Contracting | الإنشاءات والمقاولات |
| General Trade | التجارة العامة |
| Transportation & Logistics | النقل والخدمات اللوجستية |
| Technology & Telecommunications | التكنولوجيا والاتصالات |
| Healthcare | الرعاية الصحية |
| Tourism & Hospitality | السياحة والضيافة |

### 7.4 Practice areas, short form (newer deck, EN only)

| Area | Line |
|---|---|
| Company formation | Registering new local companies. |
| Foreign branches | Registering branches of foreign companies. |
| Foreign residency | Residency and work permits for foreign staff. |
| Tax | Tax registration, filings and clearances. |
| Labour & social security | Employment and social security compliance. |
| Contracts | Drafting, review and negotiation. |
| Litigation | Representation before Iraqi courts. |
| Legal consultancy | Ongoing advice for businesses and individuals. |

### 7.5 Who we serve: "Four kinds of clients, one standard." (EN only)

1. **Foreign companies:** entering Iraq, opening a branch or operating under Iraqi law.
2. **Local companies:** formation, contracts, tax, labour and disputes.
3. **Foreign nationals:** residency, work permits and personal legal matters in Iraq.
4. **Embassies:** legal support and liaison with Iraqi authorities.

### 7.6 The foreign-company track: "From registration to day-to-day compliance" (EN only)

1. **Register the branch:** prepare, legalise and file the branch documents.
2. **Tax & social security:** open the company's tax and social security files.
3. **Residency & permits:** residency and work permits for foreign staff.
4. **Stay compliant:** contracts, labour matters, renewals and filings.

### 7.7 How we work: "Five steps, agreed in writing" (EN only)

1. **Consultation:** we listen and define the legal need.
2. **File review:** we study the documents before advising.
3. **Proposal:** scope, timeline and fees, in writing.
4. **Execution:** filing and follow-up with the authorities.
5. **Handover:** final documents and ongoing support.

### 7.8 Why choose us — لماذا تختار شركة سمو العدالة؟

From the full profile (bilingual):
- Comprehensive legal and administrative expertise — خبرة قانونية وإدارية متكاملة
- Deep understanding of Iraqi laws and investment regulations — فهم عميق للقوانين العراقية ومتطلبات الاستثمار
- Tailored solutions for local and foreign businesses — حلول مخصصة للشركات المحلية والأجنبية
- Efficient handling of governmental procedures and approvals — سرعة في إنجاز المعاملات والمتابعات الحكومية
- Full commitment to confidentiality, professionalism, and transparency — التزام كامل بالسرية والشفافية المهنية

From the newer deck (EN only):
- **Based in Baghdad:** Al-Mansour office, close to the ministries, registries and courts we deal with.
- **Arabic and English:** advice, documents and correspondence in both languages.
- **One firm, end to end:** formation, residency, tax, labour and litigation under one roof.
- **Clear terms:** scope, timeline and fees agreed in writing before work begins.

### 7.9 Team — فريق العمل

**EN:** Our team consists of highly qualified lawyers and legal consultants specialized in:
**AR:** يضم فريقنا نخبة من المحامين والمستشارين القانونيين المتخصصين في:

- Investment and Commercial Law — قانون الاستثمار والأعمال التجارية
- Tax and Financial Law — القانون الضريبي والمالي
- Labor and Employment Law — قانون العمل والموارد البشرية
- Intellectual Property and Commercial Contracts — الملكية الفكرية والعقود التجارية
- Government Relations and Regulatory Compliance — المتابعة الحكومية والامتثال القانوني

Named members (newer deck, "The people on your file"):

| Name | Role | Status |
|---|---|---|
| [Name] | Managing Partner | ⚠ placeholder in source |
| [Name] | [Title] | ⚠ placeholder in source |
| **Hawraa Alzubaidi** | PR & Business Development | Confirmed |

No team photos are provided; the deck has empty photo boxes and the full profile uses a stock photo.

---

## 8. Open items for the client

1. **Fonts:** supply Somar and Bahij TheSansArabic webfont files and confirm the web licence.
2. **Logo text:** "LAW FIRM & LEGAL CONSUL" is truncated, and "لخدمات المحاماة" differs from the legal name. Keep as-is or correct?
3. **Team:** names and titles for the Managing Partner and the second member, plus headshots.
4. **Arabic copy:** the newer deck's sections (§7.4–7.7, part of §7.8) exist only in English and need approved Arabic translations.
5. **Photography:** only stock imagery is in the source files. Confirm whether there are real office or team photos.
6. **Navy hex:** #141641 (logo artwork) vs #151640 (guide swatch). The website will use #141641 unless told otherwise.
