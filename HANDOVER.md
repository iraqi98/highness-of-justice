# دليل تسليم موقع شركة سمو العدالة

هذا الدليل لمن سيتولى إدارة الموقع بعد التسليم. يشرح محتوى الموقع، ومكان تعديل كل معلومة، وطريقة النشر، وإعدادات الدومين.

- **الموقع:** https://hoj.legal/
- **الكود (Repository):** https://github.com/iraqi98/highness-of-justice
- **التقنية:** Next.js 16 (static export) + next-intl للغتين + Tailwind CSS 4، والاستضافة على GitHub Pages.

---

## 1. محتوى الموقع

الموقع بلغتين: العربية (`/ar/`، وهي اللغة الافتراضية) والإنجليزية (`/en/`). فيه 24 صفحة:

| الصفحة | العربية | English |
|---|---|---|
| الرئيسية | [/ar/](https://hoj.legal/ar/) | [/en/](https://hoj.legal/en/) |
| الشركات الأجنبية | [/ar/foreign-companies/](https://hoj.legal/ar/foreign-companies/) | [/en/foreign-companies/](https://hoj.legal/en/foreign-companies/) |
| تأسيس الشركات والفروع الأجنبية | [ar](https://hoj.legal/ar/services/company-formation/) | [en](https://hoj.legal/en/services/company-formation/) |
| الاستشارات الضريبية والمالية | [ar](https://hoj.legal/ar/services/tax-advisory/) | [en](https://hoj.legal/en/services/tax-advisory/) |
| دعم الشركات الأجنبية | [ar](https://hoj.legal/ar/services/foreign-company-support/) | [en](https://hoj.legal/en/services/foreign-company-support/) |
| العقود والاستشارات القانونية | [ar](https://hoj.legal/ar/services/contracts/) | [en](https://hoj.legal/en/services/contracts/) |
| تسوية النزاعات والتحكيم | [ar](https://hoj.legal/ar/services/dispute-resolution/) | [en](https://hoj.legal/en/services/dispute-resolution/) |
| قوانين العمل والموارد البشرية | [ar](https://hoj.legal/ar/services/labor-law/) | [en](https://hoj.legal/en/services/labor-law/) |
| حماية الملكية الفكرية | [ar](https://hoj.legal/ar/services/intellectual-property/) | [en](https://hoj.legal/en/services/intellectual-property/) |
| المتابعة الحكومية والامتثال | [ar](https://hoj.legal/ar/services/government-relations/) | [en](https://hoj.legal/en/services/government-relations/) |
| الخدمات الاستشارية والإدارية | [ar](https://hoj.legal/ar/services/advisory-services/) | [en](https://hoj.legal/en/services/advisory-services/) |
| تأشيرات العمل والكوادر الأجنبية | [ar](https://hoj.legal/ar/services/work-visas/) | [en](https://hoj.legal/en/services/work-visas/) |

ويُولَّد تلقائياً: `sitemap.xml` و`robots.txt` و`manifest.webmanifest` وبيانات JSON-LD (LegalService) لمحركات البحث.

**نموذج الاستشارة** لا يخزّن أي بيانات ولا يحتاج سيرفر: عند الإرسال يفتح WhatsApp برسالة جاهزة إلى رقم الشركة.

---

## 2. أين أغيّر…؟

بعد أي تعديل: اعمل commit ثم push إلى `main` والموقع يتحدّث تلقائياً (انظر القسم 4).

### الهاتف، الإيميل، العنوان، ساعات العمل: `src/config/site.ts`
هذا الملف هو المصدر الوحيد لهذه المعلومات. منه تأخذها كل الصفحات والـ footer والـ JSON-LD.

| المعلومة | الحقل |
|---|---|
| الهاتف | `phone.display` (للعرض) و`phone.e164` (للرابط، بدون مسافات) |
| WhatsApp | `whatsapp` (أرقام فقط، بدون +) |
| الإيميل | `email` |
| العنوان | `address.ar` / `address.en` وحقول `street` و`locality` لمحركات البحث |
| موقع الخريطة | `geo` و`mapsUrl` |
| ساعات العمل | `hours`: يوم لكل سطر (0 = الأحد … 6 = السبت). اليوم المغلق يكون `open: null` |
| رقم التسجيل | `registrationNo` |

ملاحظة: في `address.ar` يوجد حرفان مخفيان (⁦ و⁩) حول الرقم يحافظان على ترتيبه داخل النص العربي. انسخ الرقم الجديد بينهما ولا تحذفهما.

### روابط التواصل الاجتماعي: `src/config/site.ts` ← `social`
`instagram` و`facebook` و`linkedin` و`googleMaps`. إذا تركت الرابط فارغاً (`''`) تختفي أيقونته من كل الموقع.

### تقييم Google: `src/config/site.ts` ← `googleRating`
`{ value: 5.0, count: 12 }`. هذه الأرقام ثابتة ولا تتحدث تلقائياً، فحدّثها يدوياً من Google Business Profile كل فترة.

### الصور: `src/config/images.ts`
كل الصور في مكان واحد. الصور الحالية من Unsplash وهي مؤقتة. لاستبدال صورة:
1. ضع الملف في `public/images/` (مثلاً `public/images/office.jpg`).
2. غيّر `src` للصورة المطلوبة إلى `'/images/office.jpg'`.
3. حدّث وصف الصورة `alt` بالعربي والإنجليزي.

### النصوص: `messages/ar.json` و`messages/en.json`
كل نصوص الموقع هنا، وللملفين نفس المفاتيح (keys). عدّل القيمة فقط ولا تغيّر اسم المفتاح.
- ترتيب مجالات الممارسة في `practice.items` و`svc.intros` يجب أن يطابق ترتيبها في `src/config/services.ts`.
- عنوان ووصف كل صفحة لمحركات البحث في `meta` و`fc.meta`.

### الشعار والأيقونات
موجودة في `public/brand/` و`public/` (favicon وicons). المصادر والشرح الكامل في `brand/BRAND.md`.

---

## 3. تفعيل خطوط الهوية (Somar وBahij TheSansArabic)

الموقع يستخدم الآن IBM Plex Sans Arabic وManrope (Google Fonts) كبديل مؤقت.

1. احصل من العميل على ملفات `.woff2` مع ترخيص يسمح بالاستخدام على الويب (web licence).
2. ضعها في `public/fonts/` بالأسماء المذكورة في `public/fonts/README.md` (أو عدّل المسارات في `src/styles/brand-fonts.css`).
3. في `src/styles/fonts.ts` غيّر `USE_BRAND_FONTS = false` إلى `true`.
4. commit وpush.

---

## 4. النشر (Deployment)

```
push إلى main  ←  GitHub Actions (.github/workflows/deploy.yml)  ←  npm ci + npm run build  ←  GitHub Pages
```

- كل push إلى `main` يبني الموقع وينشره تلقائياً خلال دقيقتين تقريباً.
- تتابع الحالة من تبويب **Actions** في الـ repository (✓ أخضر = تم النشر).
- يمكن إعادة النشر يدوياً: Actions ← Deploy to GitHub Pages ← **Run workflow**.

للتجربة محلياً:
```bash
npm ci
npm run dev        # http://localhost:3000/ar/
npm run build      # يبني نسخة النشر في out/
npm run lint       # فحص TypeScript
```

---

## 5. الدومين (Hostinger)

الموقع منشور على `https://hoj.legal` من جذر الدومين (بدون مسار فرعي)، و`www.hoj.legal` يحوّل إليه. الرابط القديم `iraqi98.github.io/highness-of-justice` يحوّل تلقائياً إلى الدومين الجديد.
⚠ لا تستخدم `highnessofjustice.com`: هذا الدومين ليس ملك العميل.

### أ. سجلات DNS في Hostinger ← Domains ← DNS / Nameservers

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | iraqi98.github.io |

- ⚠ **لا تلمس سجلات MX ولا TXT الخاصة بالإيميل** (SPF/DKIM/DMARC). حذفها يوقف إيميل `info@hoj.legal`.
- للتحقق: `nslookup hoj.legal` يجب أن يُرجع عناوين `185.199.x.153`. أي تغيير في DNS يأخذ من دقائق إلى 24 ساعة لينتشر.
- سجلات `AAAA` غير مضافة حالياً، وهي اختيارية لدعم IPv6: `2606:50c0:8000::153` و`2606:50c0:8001::153` و`2606:50c0:8002::153` و`2606:50c0:8003::153`.

### ب. في GitHub

1. الدومين مضبوط في Repository ← **Settings ← Pages ← Custom domain** على `hoj.legal`. هذا الإعداد هو الذي يحدد الدومين، لأن النشر يتم عبر GitHub Actions، ولا يقرأ GitHub ملف `public/CNAME` في هذه الحالة.
2. (يُنصح به) لحماية الدومين: Account **Settings ← Pages ← Add a domain**، وأضف سجل `TXT` الذي يطلبه GitHub في Hostinger.

### ج. في الكود

إذا تغيّر الدومين مستقبلاً، عدّله في `url` داخل `src/config/site.ts` (بدون `/` في النهاية)، ومنه تُبنى روابط canonical وsitemap وOpen Graph وJSON-LD، وفي `public/CNAME`، ثم في إعداد GitHub أعلاه.

### د. HTTPS

بعد أن يصدر GitHub الشهادة (قد يأخذ حتى ساعة بعد ضبط DNS)، فعّل **Enforce HTTPS** في Settings ← Pages.

### هـ. بعد الربط

- افتح `https://hoj.legal/ar/` و`https://www.hoj.legal/` وتأكد أن الثاني يحوّل إلى الأول.
- فعّل خطوط الهوية إن وصلت (القسم 3).
- سجّل الدومين في Google Search Console وأرسل `https://hoj.legal/sitemap.xml`.
- حدّث رابط الموقع في Google Business Profile وInstagram وFacebook وLinkedIn.

---

## 6. بنود ما زالت بانتظار العميل

| # | البند | ما المطلوب | أين يُعدَّل |
|---|---|---|---|
| 1 | **الخطوط** | ملفات Somar وBahij TheSansArabic بصيغة woff2 مع ترخيص الويب | القسم 3 |
| 2 | **الصور** | صور حقيقية للمكتب والفريق بدل صور Unsplash المؤقتة | `src/config/images.ts` |
| 3 | **نص الشعار** | الشعار مكتوب فيه "LAW FIRM & LEGAL CONSUL" (مقطوع) و"لخدمات المحاماة…". هل يُصحَّح؟ | ملفات `public/brand/` |
| 4 | **الفريق** | أسماء ومناصب وصور الشريك المدير والعضو الثاني، إذا أراد العميل إضافة قسم للفريق | يحتاج قسماً جديداً |
| 5 | **لون الهوية** | تأكيد #141641 (المستخدم حالياً) أو #151640 | `src/app/globals.css` |
| 6 | **تقييم Google** | تحديث الرقم دورياً | `site.googleRating` |

---

## 7. ملاحظات تقنية

- `brand/` فيه ملفات العميل الأصلية (PDF) ووثائق المراجعة، وهي **غير مرفوعة إلى git** عمداً (انظر `.gitignore`). احتفظ بنسخة منها خارج الـ repository.
- لا توجد متغيرات بيئة (env) ولا مفاتيح سرية. الموقع ثابت بالكامل.
- الوسم `<meta name="next-size-adjust">` يضيفه Next.js تلقائياً مع `next/font`. هو غير ضار، وإزالته تسبب اهتزاز النص عند تحميل الخطوط.
- `AGENTS.md` ملف يولّده `next dev` تلقائياً، ويمكن تجاهله.
