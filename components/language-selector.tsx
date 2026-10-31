'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Languages, ChevronDown, Check } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Locale } from '@/lib/types'

const LANGUAGES: Array<{ id: Locale; label: string; scriptName: string }> = [
  { id: 'en', label: 'English', scriptName: 'Latin' },
  { id: 'gu', label: 'ગુજરાતી', scriptName: 'Gujarati' },
  { id: 'hi', label: 'हिन्दी', scriptName: 'Devanagari' },
]

interface LanguageSelectorProps {
  className?: string
  variant?: 'pill' | 'button' | 'minimal'
  showIcon?: boolean
}

export function LanguageSelector({
  className = '',
  variant = 'pill',
  showIcon = true,
}: LanguageSelectorProps) {
  const { locale, setLocale, isFontReady } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard escape
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const activeLang = LANGUAGES.find((l) => l.id === locale) || LANGUAGES[0]

  const baseStyle =
    variant === 'pill'
      ? 'flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 py-1 text-xs font-bold text-[#17324D] hover:border-[#0D9488] transition shadow-2xs'
      : variant === 'button'
      ? 'flex items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-semibold text-[#17324D] hover:border-[#0D9488] hover:bg-[#F8FAFC] transition shadow-xs'
      : 'flex items-center gap-1 px-2 py-1 text-xs font-semibold text-[#17324D] hover:text-[#0D9488] transition'

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language selector: Currently set to ${activeLang.label}`}
        className={baseStyle}
        title="Change application language (English, ગુજરાતી, हिन्दी)"
      >
        {showIcon && <Languages size={14} className="shrink-0 text-[#0D9488]" />}
        <span className="font-semibold">{activeLang.label}</span>
        <ChevronDown size={12} className={`opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select preferred language"
          className="absolute right-0 top-full z-50 mt-1 w-40 rounded-xl border border-[#E2E8F0] bg-white py-1.5 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Select Language · ભાષા પસંદ કરો
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = locale === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={async () => {
                  await setLocale(item.id)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                  isSelected
                    ? 'bg-[#DFF4EF] font-bold text-[#0D9488]'
                    : 'text-[#263238] hover:bg-[#F8FAFC]'
                }`}
              >
                <div>
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-[10px] text-[#64748B]">{item.scriptName}</div>
                </div>
                {isSelected && <Check size={14} className="text-[#0D9488]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
