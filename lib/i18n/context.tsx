'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Locale } from '@/lib/types'
import { TranslationDictionary, translations } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (newLocale: Locale) => void
  t: TranslationDictionary
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
})

const LOCALE_KEY = 'saksham_fln_locale'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
      if (saved && (saved === 'en' || saved === 'gu' || saved === 'hi')) {
        setLocaleState(saved)
        document.documentElement.lang = saved
      } else {
        document.documentElement.lang = 'en'
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [])

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCALE_KEY, newLocale)
      } catch {
        // Ignore storage errors
      }
      document.documentElement.lang = newLocale
    }
  }

  // Effect to update documentElement lang attribute and root font class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
      document.documentElement.classList.remove('lang-en', 'lang-gu', 'lang-hi')
      document.documentElement.classList.add(`lang-${locale}`)
    }
  }, [locale])

  const t = translations[locale] || translations.en

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  return context
}
