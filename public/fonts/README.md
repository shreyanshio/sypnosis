# Saksham FLN — Local Typography Assets

This directory contains offline, self-hosted WOFF2 font binary assets and official licenses for the Saksham FLN foundational literacy and numeracy platform.

## Why Self-Hosted Fonts?

In Indian educational deployments (specifically rural and semi-urban schools across Devbhumi Dwarka, Gujarat), reliance on third-party CDNs (like `fonts.googleapis.com` or `fonts.gstatic.com`) introduces major reliability points of failure:
1. **Network throttling or complete offline usage**: When teachers conduct assessments offline or in remote classrooms, remote fonts fail to load, resulting in "tofu" boxes or fallback glyph corruptions.
2. **Indic Complex Text Shaping (CTL)**: Gujarati (ISO 15924: `Gujr`) and Devanagari (ISO 15924: `Deva`) rely heavily on OpenType GSUB/GPOS tables for correct conjunct formation, half-forms, virama attachment, and matra placement. System fallback fonts vary drastically across Windows, Android, and Linux.
3. **Zero Runtime External Dependencies**: All font assets are bundled locally in `public/fonts/` and served with `font-display: swap` directly from the application origin.

---

## Bundled Font Families

### 1. Noto Sans Gujarati
- **Upstream Source**: Google Fonts / Noto Project ([https://github.com/google/fonts/tree/main/ofl/notosansgujarati](https://github.com/google/fonts/tree/main/ofl/notosansgujarati))
- **License**: SIL Open Font License, Version 1.1 (`public/fonts/licenses/NOTO-SANS-GUJARATI-OFL.txt`)
- **Weights Supported**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Unicode Coverage**:
  - `gujarati`: `U+0951-0952, U+0964-0965, U+0A80-0AFF` (Complete Gujarati vowels, consonants, matras, virama, numerals ૦-૯)
  - `latin`: `U+0000-00FF, ...` (Latin numerals, punctuation, ASCII)
- **Files**:
  - `noto-sans-gujarati/gujarati-regular.woff2` (400)
  - `noto-sans-gujarati/gujarati-medium.woff2` (500)
  - `noto-sans-gujarati/gujarati-semibold.woff2` (600)
  - `noto-sans-gujarati/gujarati-bold.woff2` (700)
  - `noto-sans-gujarati/gujarati-latin-*.woff2` (Latin companion sets)

### 2. Noto Sans Devanagari
- **Upstream Source**: Google Fonts / Noto Project ([https://github.com/notofonts/devanagari](https://github.com/notofonts/devanagari))
- **License**: SIL Open Font License, Version 1.1 (`public/fonts/licenses/NOTO-SANS-DEVANAGARI-OFL.txt`)
- **Weights Supported**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Unicode Coverage**:
  - `devanagari`: `U+0900-097F, U+1CD0-1CF4, U+1CF7-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FA` (Full Hindi/Devanagari vowels, matras, conjuncts, anusvara, visarga, nukta, numerals ०-९)
  - `latin`: `U+0000-00FF, ...`
- **Files**:
  - `noto-sans-devanagari/devanagari-regular.woff2` (400)
  - `noto-sans-devanagari/devanagari-medium.woff2` (500)
  - `noto-sans-devanagari/devanagari-semibold.woff2` (600)
  - `noto-sans-devanagari/devanagari-bold.woff2` (700)
  - `noto-sans-devanagari/devanagari-latin-*.woff2` (Latin companion sets)

### 3. Inter
- **Upstream Source**: Rasmus Andersson / Google Fonts ([https://github.com/google/fonts/tree/main/ofl/inter](https://github.com/google/fonts/tree/main/ofl/inter))
- **License**: SIL Open Font License, Version 1.1 (`public/fonts/licenses/INTER-OFL.txt`)
- **Weights Supported**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Unicode Coverage**:
  - `latin`: `U+0000-00FF, ...`
  - `latin-ext`: `U+0100-02BA, ...`
- **Files**:
  - `inter/inter-latin-regular.woff2` (400)
  - `inter/inter-latin-medium.woff2` (500)
  - `inter/inter-latin-semibold.woff2` (600)
  - `inter/inter-latin-bold.woff2` (700)
  - `inter/inter-latin-ext-*.woff2`

---

## How Fonts Are Loaded in Saksham FLN

1. **CSS Engine (`app/fonts.css`)**:
   Declares explicit local `@font-face` rules with `font-display: swap` and exact `unicode-range` definitions pointing directly to `/fonts/...`.
   Custom family names are prefixed as `Saksham Noto Sans Gujarati`, `Saksham Noto Sans Devanagari`, and `Saksham Inter` to prevent collision with unverified local system fonts.

2. **CSS Variables & Fallbacks**:
   - `--font-inter`: `'Saksham Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
   - `--font-gujarati`: `'Saksham Noto Sans Gujarati', 'Saksham Noto Sans Devanagari', 'Saksham Inter', sans-serif`
   - `--font-devanagari`: `'Saksham Noto Sans Devanagari', 'Saksham Noto Sans Gujarati', 'Saksham Inter', sans-serif`
   - `--font-active`: Dynamically driven by active locale class or data attribute (`lang-en`, `lang-gu`, `lang-hi`).

3. **In-Browser Warm-up Strategy**:
   Upon mounting the `I18nProvider` (`lib/i18n/context.tsx`), the application invokes the browser `document.fonts.load()` API with representative Indic strings ("ગુજરાતી શિક્ષણ વિદ્યાર્થી ક્ષમતા પ્રગતિ" and "हिंदी शिक्षा विद्यार्थी क्षमता प्रगति") to ensure instant rendering without script layout shifts.

4. **Regeneration**:
   Run `node scripts/download-font-assets.mjs` to re-fetch and validate upstream assets if updates are ever needed. (Never run in production startup).
