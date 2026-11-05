# SAIRNA React

واجهة React عربية ومتجاوبة لمنصة **سيرنا SAIRNA** لحجز الرحلات بين المدن السورية. تم تحويل التصميم الأصلي إلى صفحات ومكوّنات مستقلة مع الحفاظ على RTL، الألوان، الحركات، الوضع الداكن، وتجربة الاستخدام على الهاتف والكمبيوتر.

## المميزات

- البحث عن الرحلات حسب مدينة الانطلاق، الوجهة، والتاريخ.
- جلب المدن والرحلات من SAIRNA Backend عبر Swagger API.
- عرض شركات النقل، أوقات الرحلات، الأسعار، والمقاعد المتاحة.
- اختيار المقعد وإرسال الحجز إلى الخادم.
- تسجيل الدخول وإنشاء الحساب مع حفظ JWT في المتصفح.
- صفحة تتبع الرحلة باستخدام بيانات الرحلة من الخادم.
- واجهة Dashboard API منفصلة ومجهزة للمصادقة وإدارة البيانات.
- تصميم عربي RTL ومتجاوب.
- وضع فاتح وداكن.
- حالات تحميل وأخطاء وإعادة محاولة للطلبات.
- دعم `prefers-reduced-motion` لتقليل الحركة عند الحاجة.

## التقنيات

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- `@tailwindcss/vite`
- Lucide React للأيقونات
- React Leaflet وLeaflet مجهزان للخرائط المستقبلية
- React Router مثبت للتوسع المستقبلي
- Oxlint لفحص الكود

## المتطلبات

- Node.js 20 أو أحدث
- npm

## التشغيل المحلي

ثبّت الاعتماديات:

```bash
npm install
```

أنشئ ملف البيئة المحلي:

```bash
Copy-Item .env.example .env.local
```

ثم شغّل الخادم:

```bash
npm run dev
```

افتح الرابط الذي يظهره Vite، وغالبًا يكون:

```text
http://localhost:5173
```

## إعدادات البيئة

يحتوي `.env.example` على الإعدادات التالية:

```env
VITE_WEBSITE_API_BASE_URL=https://sairna.abdulrahman-hares.com/api/v1/website
VITE_DASHBOARD_API_BASE_URL=https://sairna.abdulrahman-hares.com/api/v1/dashboard
VITE_API_BASE_URL=
```

يمكن ترك القيم الافتراضية كما هي عند استخدام الخادم الرسمي. لا تضع كلمات المرور أو مفاتيح خاصة داخل ملفات البيئة التي يتم رفعها إلى Git.

## واجهات SAIRNA Backend

### Website API

```text
https://sairna.abdulrahman-hares.com/api/v1/website
```

الواجهات المستخدمة أو المجهزة:

- `GET /cities`
- `GET /companies`
- `GET /trips`
- `GET /trips/:id`
- `GET /trips/:id/seats`
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`
- `POST /bookings`
- `GET /bookings/me`
- `GET /bookings/:id`
- `POST /bookings/:id/cancel`

### Dashboard API

```text
https://sairna.abdulrahman-hares.com/api/v1/dashboard
```

العميل المنفصل موجود في:

```text
src/api/dashboard.ts
```

ويدعم:

- تسجيل دخول الإدارة.
- ملخص لوحة التحكم.
- إدارة المدن.
- إدارة الشركات.
- إدارة الرحلات.
- إدارة الحجوزات.
- إدارة المستخدمين.

### التوثيق والصحة

- Swagger العام: <https://sairna.abdulrahman-hares.com/api/docs>
- Swagger Website: <https://sairna.abdulrahman-hares.com/api/docs/website>
- Swagger Dashboard: <https://sairna.abdulrahman-hares.com/api/docs/dashboard>
- Health Check: <https://sairna.abdulrahman-hares.com/api/v1/health>

يتم حفظ JWT الخاص بالمستخدم في `localStorage` وإرساله تلقائيًا كالتالي:

```http
Authorization: Bearer <JWT>
```

لا يحتوي المستودع على بيانات دخول الإدارة.

## بنية المشروع

```text
src/
├── api/
│   ├── client.ts              # Website API وطلبات المصادقة والحجز
│   └── dashboard.ts           # Dashboard API
├── components/
│   ├── SearchForm.tsx         # نموذج البحث
│   ├── TripCard.tsx           # بطاقة الرحلة
│   └── layout/
│       ├── SiteHeader.tsx
│       └── SiteFooter.tsx
├── hooks/
│   └── useAsync.ts            # إدارة التحميل والأخطاء وإعادة المحاولة
├── pages/
│   ├── Home.tsx
│   ├── Results.tsx
│   ├── Booking.tsx
│   ├── Tracking.tsx
│   └── Auth.tsx
├── types/
│   └── data.ts                # أنواع البيانات والنماذج
├── App.tsx                    # shell والتوجيه والحالة العامة
├── App.css                    # تنسيقات الواجهة الخاصة
└── index.css                  # Tailwind وtokens والأنيميشن العامة
```

## الصفحات والتنقل

التنقل الحالي خفيف باستخدام hash:

```text
#home
#results
#booking
#tracking
#auth
```

الصفحات الأساسية:

1. الصفحة الرئيسية والبحث.
2. نتائج الرحلات.
3. اختيار المقعد والحجز.
4. تتبع الرحلة.
5. تسجيل الدخول وإنشاء الحساب.

## أوامر المشروع

تشغيل وضع التطوير:

```bash
npm run dev
```

إنشاء نسخة الإنتاج:

```bash
npm run build
```

فحص الكود:

```bash
npm run lint
```

معاينة نسخة الإنتاج:

```bash
npm run preview
```

## التحقق الحالي

تم التحقق من:

- نجاح `npm run build`.
- نجاح `npm run lint` دون تحذيرات.
- نجاح Health Check للخادم.
- جلب المدن من API الحقيقي.
- جلب الرحلات من API الحقيقي.

## ملاحظات التطوير

- عند غياب `VITE_WEBSITE_API_BASE_URL` يستخدم العميل بيانات تجريبية محدودة للتطوير المحلي.
- عند ضبط عنوان API، تستخدم صفحات البحث والمصادقة والحجز البيانات الحقيقية من الخادم.
- واجهة التتبع الحالية تعتمد على بيانات الرحلة ووقت الانطلاق والوصول؛ Swagger Website لا يوفر endpoint مستقلًا للتتبع اللحظي.
- لا تقم بإضافة `.env.local` أو أي بيانات اعتماد إلى Git.
