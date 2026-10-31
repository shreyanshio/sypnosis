# Saksham FLN — Localization & Indic Font Engineering Audit

**Project**: Saksham FLN — AI-Assisted Diagnostic and Adaptive Remedial Learning System  
**Supported Locales**:
- English (`en`): Administrative and national coordination default
- Gujarati (`gu`): Primary vernacular medium for Gujarat state government and aided primary schools (Devbhumi Dwarka context)
- Hindi (`hi`): National foundational literacy alignment (NIPUN Bharat guidelines)

---

## 1. Local Font Asset Engineering

### 1.1 The Upstream Problem Solved
Prior to this engineering phase, the application relied on remote Google Fonts CDN `@import` statements inside CSS files:
```css
/* Previous vulnerable pattern */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&display=swap');
```
This created three critical failures in government school environments:
1. **Network Fragility**: If the school's BSNL or broadband connection was slow or offline, fonts failed to load, falling back to system generic fonts that often lacked proper Indic glyph rendering.
2. **Flash of Unstyled Text (FOUT) & Layout Shifts (CLS)**: As remote fonts downloaded asynchronously, UI cards and buttons jumped in size, causing severe cumulative layout shift.
3. **Diacritic Clipping**: Standard Latin font line-heights clipped upper and lower Indic diacritics (e.g. Gujarati અનુસ્વાર `ં`, હ્રસ્વ-ઉ `ુ`, દીર્ઘ-ઊ `ૂ`; Devanagari मात्राएँ `ि`, `ी`, `ु`, `ू`, `्`).

### 1.2 Permanent Local Bundling Solution
We implemented a self-contained local font pipeline. All 24 WOFF2 static font binaries and official SIL Open Font License (OFL) files are bundled directly in the Git repository under `public/fonts/`:

| Font Family | Weights Bundled | Subsets Included | Target Unicode Range |
| :--- | :--- | :--- | :--- |
| **Saksham Inter** | 400, 500, 600, 700 | Latin, Latin-Ext | `U+0000-00FF`, `U+0100-02AF` |
| **Saksham Noto Sans Gujarati** | 400, 500, 600, 700 | Gujarati, Latin Fallback | `U+0A80-0AFF` (Full Gujarati Block) |
| **Saksham Noto Sans Devanagari** | 400, 500, 600, 700 | Devanagari, Latin Fallback | `U+0900-097F` (Full Devanagari Block) |

**Total Bundled Size**: 27 files, 683.0 KB across all three font families and licenses.  
Every `.woff2` file was cryptographically verified via magic byte header inspection (`0x77 0x4F 0x46 0x32` / `wOF2`).

### 1.3 CSS Font Pipeline (`app/fonts.css`)
Each `@font-face` declaration is strictly scoped with local `src: url('/fonts/...') format('woff2')`, `font-display: swap`, and exact `unicode-range` definitions:
```css
@font-face {
  font-family: 'Saksham Noto Sans Gujarati';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/noto-sans-gujarati-500.woff2') format('woff2');
  unicode-range: U+0A80-0AFF, U+200C-200D, U+20B9, U+25CC;
}
```
Font family variables are orchestrated dynamically based on the active locale:
```css
:root {
  --font-active: 'Saksham Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-line-height-normal: 1.5;
}

[data-locale="gu"] {
  --font-active: 'Saksham Noto Sans Gujarati', 'Saksham Inter', sans-serif;
  --font-line-height-normal: 1.65;
}

[data-locale="hi"] {
  --font-active: 'Saksham Noto Sans Devanagari', 'Saksham Inter', sans-serif;
  --font-line-height-normal: 1.65;
}
```

### 1.4 Non-Blocking Font Pre-Warming (`lib/i18n/context.tsx`)
To eliminate any visual stutter when switching languages, the i18n context runs a background pre-warming routine using `document.fonts.load`:
```ts
const GU_SAMPLE = 'સક્ષમ પાયાનું સાક્ષરતા અને સંખ્યાજ્ઞાન ૨૦૨૬'
const HI_SAMPLE = 'सक्षम बुनियादी साक्षरता एवं संख्याज्ञान २०२६'

useEffect(() => {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    document.fonts.load('500 1rem "Saksham Noto Sans Gujarati"', GU_SAMPLE)
    document.fonts.load('500 1rem "Saksham Noto Sans Devanagari"', HI_SAMPLE)
  }
}, [])
```

---

## 2. Localization Coverage & Namespace Audit

The centralized translation catalog (`lib/i18n/translations.ts`) provides full 1:1 key parity across English, Gujarati, and Hindi.

### 2.1 Namespace Breakdown
1. **`nav`**: Primary application navigation (Overview, Classes, Students, Assessments, Learning Pathways, Teacher Actions, Reports, Guardian Portal).
2. **`common`**: Standard controls (Filter, Search, Grade, Section, Save, Cancel, Sync, Loading, Demonstrated, Developing, Needs Support).
3. **`dashboard`**: Aggregate school metrics, weekly milestone trajectory, gap breakdown, teacher action queue.
4. **`classes`**: Grade & section filters, class roster headers, coverage rates.
5. **`students`**: Student dossier, roll number, diagnostic status, prerequisite mastery records.
6. **`assessments`**: 1-question-per-screen runner, audio prompt controls, transcript verification, diagnostic outcome calculation.
7. **`pathways`**: 5-day structured remedial activities, concrete manipulative instructions, completion sign-off.
8. **`actions`**: Teacher task recommendations, priority filtering, completion status.
9. **`reports`**: Role-based views (Teacher, Head Teacher, Cluster CRC, District DEO), aggregate FLN coverage rates, export tools.
10. **`parent`**: Guardian portal summaries, low-barrier home learning activities.
11. **`login`**: Role perspective selection, credentials fields, helpdesk modal.
12. **`landing`**: Hero pitch, practical cycle steps, classroom feature list, illustrative demo notices.

---

## 3. Pedagogical & Linguistic Quality Standards

Translations were audited against the official NIPUN Bharat FLN guidelines and Gujarat State Council of Educational Research and Training (GCERT) terminology to avoid awkward machine translation:

| English Educational Term | Gujarati Contextual Term | Hindi Contextual Term | Pedagogical Rational |
| :--- | :--- | :--- | :--- |
| **Foundational Literacy & Numeracy (FLN)** | પાયાનું સાક્ષરતા અને સંખ્યાજ્ઞાન | बुनियादी साक्षरता एवं संख्याज्ञान | Official GCERT and NIPUN Bharat standard phrasing. |
| **Remedial Learning / Practice** | ઉપચારાત્મક શિક્ષણ / મહાવરો | उपचारात्मक शिक्षण / अभ्यास | Positively framed as supportive practice rather than corrective punishment. |
| **Prerequisite Learning Gap** | પૂર્વજરૂરી કૌશલ્ય કચાશ | पूर्वपेक्षित कौशल अंतराल | Emphasizes missing foundational building blocks (e.g. counting) instead of student deficit. |
| **Demonstrated / Developing** | સિદ્ધ થયેલ / વિકાસશીલ | सिद्ध / प्रगतिशील | Non-stigmatizing performance descriptors replacing "Pass / Fail". |
| **Place Value & Regrouping** | સ્થાનકિંમત અને દશકની જૂથબંધી | स्थानीय मान एवं दस का समूह | Standard primary mathematics classroom terms. |
| **Phonemic Blending** | ધ્વનિ જોડાણ અને અક્ષર ઓળખ | ध्वन्यात्मक सम्मिश्रण एवं वर्ण पहचान | Accurate primary language acquisition terminology. |
