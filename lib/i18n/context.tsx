'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { Locale } from '@/lib/types'
import { TranslationDictionary, translations } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (newLocale: Locale) => Promise<void>
  t: TranslationDictionary
  isFontReady: boolean
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: async () => {},
  t: translations.en,
  isFontReady: true,
})

const LOCALE_KEY = 'saksham_fln_locale'

// Representative strings covering essential consonants, matras, conjuncts, and numerals
const GU_SAMPLE = 'ગુજરાતી શિક્ષણ અને શીખવાની પ્રવૃત્તિઓ ક્ષમતા જ્ઞાન શ્રદ્ધા પ્રગતિ ૧૨૩૪૫'
const HI_SAMPLE = 'हिंदी शिक्षण और सीखने की गतिविधियाँ विद्यालय विद्यार्थी क्षमता प्रगति १२३४५'
const EN_SAMPLE = 'Saksham Foundational Literacy and Numeracy Assessment 12345'

/**
 * Background font warmer that invokes browser document.fonts.load() API
 * to ensure WOFF2 font binary glyph caches are populated without UI blocking.
 */
function warmFontFamily(fontFamily: string, sampleText: string, weights: string[] = ['400', '600']) {
  if (typeof document === 'undefined' || !('fonts' in document)) return Promise.resolve()

  const promises = weights.map((w) => {
    try {
      return document.fonts.load(`${w} 16px '${fontFamily}'`, sampleText).catch(() => {
        // Fallback gracefully without breaking application
      })
    } catch {
      return Promise.resolve()
    }
  })

  return Promise.all(promises)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isFontReady, setIsFontReady] = useState(true)

  // Initialize from localStorage and apply document attributes
  useEffect(() => {
    let initialLocale: Locale = 'en'
    try {
      const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
      if (saved && (saved === 'en' || saved === 'gu' || saved === 'hi')) {
        initialLocale = saved
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    setLocaleState(initialLocale)
    applyDocumentLocale(initialLocale)

    // Non-blocking background warm-up of all locally hosted fonts
    warmFontFamily('Saksham Inter', EN_SAMPLE, ['400', '600', '700'])
    warmFontFamily('Saksham Noto Sans Gujarati', GU_SAMPLE, ['400', '600', '700'])
    warmFontFamily('Saksham Noto Sans Devanagari', HI_SAMPLE, ['400', '600', '700'])
  }, [])

  function applyDocumentLocale(loc: Locale) {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.lang = loc
    root.setAttribute('data-locale', loc)
    root.classList.remove('lang-en', 'lang-gu', 'lang-hi')
    root.classList.add(`lang-${loc}`)
  }

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      // 1. Immediately update locale state for snappy UI transition
      setLocaleState(newLocale)
      applyDocumentLocale(newLocale)

      try {
        localStorage.setItem(LOCALE_KEY, newLocale)
      } catch {
        // Ignore local storage quota/permission errors
      }

      // 2. Warm the target font family with representative glyphs
      if (newLocale === 'gu') {
        setIsFontReady(false)
        await warmFontFamily('Saksham Noto Sans Gujarati', GU_SAMPLE, ['400', '600', '700'])
        setIsFontReady(true)
      } else if (newLocale === 'hi') {
        setIsFontReady(false)
        await warmFontFamily('Saksham Noto Sans Devanagari', HI_SAMPLE, ['400', '600', '700'])
        setIsFontReady(true)
      } else {
        setIsFontReady(false)
        await warmFontFamily('Saksham Inter', EN_SAMPLE, ['400', '600', '700'])
        setIsFontReady(true)
      }
    },
    []
  )

  const t = translations[locale] || translations.en

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isFontReady }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  return context
}
