'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Heart,
  HeartHandshake,
  MessageSquare,
  Phone,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { studentService } from '@/lib/services/studentService'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function ParentPortalPage() {
  const { t, locale } = useI18n()
  const student = studentService.getStudentById('aarav-k') || studentService.getStudents()[0]

  const [hasDoneToday, setHasDoneToday] = useState(false)
  const [parentNote, setParentNote] = useState('')
  const [parentNotesList, setParentNotesList] = useState<string[]>([
    'આરવે આજે રસોડામાં ચમચી ગણીને ૧૦-૧૦ ના બે જૂથ બનાવ્યા! (Aarav made two groups of 10 spoons in the kitchen!)',
  ])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleReadGuidance() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const guidanceText =
      'નમસ્તે વાલીશ્રી! આજે આરવ સાથે ૫ મિનિટ ચમચી અથવા સળી ગણતરીની રમત રમો. ૧૦ ચમચી ગણીને રબરબેન્ડ લગાવો. પછી પૂછો કે ૧૦ ની એક ભારી અને ૨ છૂટી ચમચી એટલે કેટલા થાય? બાર! ખૂબ સરસ!'
    const utterance = new SpeechSynthesisUtterance(guidanceText)
    utterance.lang = 'gu-IN'
    utterance.rate = 0.9

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  function handleSendNote(e: React.FormEvent) {
    e.preventDefault()
    if (!parentNote.trim()) return
    setParentNotesList((prev) => [parentNote.trim(), ...prev])
    setParentNote('')
    showToast('શિક્ષકને તમારો સંદેશ પહોંચ્યો! (Note sent to teacher.)')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-xl border border-[#BFE2DA] bg-[#DFF4EF]/60 p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488] text-xl font-bold text-white shadow-xs">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#17324D]">{student.fullName}</h1>
                <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-[#087F75]">
                  ધોરણ ૩-અ (Class 3A)
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#087F75]">
                આશા પ્રાથમિક શાળા, દેવભૂમિ દ્વારકા · વર્ગશિક્ષક: આશાબેન શાહ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+919825000000"
              className="inline-flex h-8.5 items-center gap-1.5 rounded-lg border border-[#0D9488]/30 bg-white px-3 text-xs font-semibold text-[#087F75] hover:bg-[#DFF4EF]"
            >
              <Phone size={13} />
              <span>શિક્ષક સાથે વાત કરો</span>
            </a>
          </div>
        </div>
      </div>

      {/* Today's 5-Minute Fun Home Activity Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5D9] px-2.5 py-0.5 text-[11px] font-bold text-[#8A6200]">
              <Sparkles size={13} /> આજની ૫ મિનિટની મજેદાર પ્રવૃત્તિ · Today&apos;s Home Activity
            </div>
            <h2 className="mt-2 text-lg font-bold text-[#17324D]">
              રસોડાની ચમચી અને ૧૦-૧૦ ની ભારી (Kitchen Spoon Bundles)
            </h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              કોઈ ખર્ચ વગર ઘરની વસ્તુઓથી સંખ્યા સમજણ વધારવાની પ્રવૃત્તિ.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReadGuidance}
            aria-label="Listen to voice guidance in Gujarati"
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition ${
              isSpeaking
                ? 'border-[#0D9488] bg-[#DFF4EF] text-[#087F75] animate-pulse'
                : 'border-[#CBD5E1] bg-white text-[#17324D] hover:bg-[#F1F5F3]'
            }`}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mt-4 space-y-2.5 rounded-xl bg-[#F7F9F6] p-4 text-xs text-[#263238]">
          <div className="flex items-start gap-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0D9488] text-[10px] font-bold text-white">
              ૧
            </span>
            <p>
              ઘરમાંથી ૧૫ થી ૨૦ ચમચી અથવા દીવાસળીની સળીઓ લો. બાળકને મોટેથી ગણવા કહો.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0D9488] text-[10px] font-bold text-white">
              ૨
            </span>
            <p>
              જેવા ૧૦ પૂરા થાય એટલે રબરબેન્ડ લગાવીને કહો: <strong>&ldquo;આ બની ગઈ દસની ૧ ભારી!&rdquo;</strong>
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0D9488] text-[10px] font-bold text-white">
              ૩
            </span>
            <p>
              હવે પૂછો: <strong>&ldquo;દસની ૧ ભારી અને ૪ છૂટી ચમચી એટલે કેટલા થાય?&rdquo;</strong> બાળક બોલે: <strong>&ldquo;૧૪&rdquo;</strong>, પછી તેને શાબાશી આપો!
            </p>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F3] pt-3">
          <span className="text-xs text-[#64748B]">
            સમય: ફક્ત ૫ થી ૭ મિનિટ · બાળકનો આત્મવિશ્વાસ વધશે
          </span>

          <Button
            onClick={() => {
              setHasDoneToday(true)
              showToast('શાબાશ! આજની પ્રવૃત્તિ નોંધાઈ ગઈ છે. (Today’s practice logged!)')
            }}
            disabled={hasDoneToday}
            className={`h-8.5 rounded-lg px-4 text-xs font-semibold ${
              hasDoneToday
                ? 'bg-[#15803D] text-white'
                : 'bg-[#0D9488] text-white hover:bg-[#087F75]'
            }`}
          >
            <CheckCircle2 size={13} className="mr-1.5" />
            {hasDoneToday ? 'આજે આ પ્રવૃત્તિ પૂર્ણ કરી ✓' : 'મેં આજે આ પ્રવૃત્તિ કરાવી'}
          </Button>
        </div>
      </div>

      {/* Child's Strengths & School Focus */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
            <Heart size={14} className="text-[#15803D]" />
            <span>બાળકની વિશેષ શક્તિઓ (Strengths)</span>
          </div>
          <p className="mt-2 text-xs text-[#263238] leading-relaxed">
            આરવ શાળામાં ખુશમિજાજ રહે છે. ૧ થી ૨૦ સુધીની ગણતરી મોટેથી બહુ સરસ કરે છે અને ગુજરાતી વાર્તા સાંભળવી ખૂબ ગમે છે.
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D9488]">
            <BookOpen size={14} className="text-[#0D9488]" />
            <span>આ અઠવાડિયે શાળામાં શું શીખી રહ્યા છે?</span>
          </div>
          <p className="mt-2 text-xs text-[#263238] leading-relaxed">
            વર્ગશિક્ષક આશાબેન સાથે દસ-દસના જૂથ બનાવીને બે અંકની સંખ્યા (દા.ત. ૨૪, ૩૫) સમજવાની સળી-કાંકરા રમત રમી રહ્યા છે.
          </p>
        </div>
      </div>

      {/* Message Teacher Note Box */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17324D]">શિક્ષકશ્રીને સંદેશ મોકલો (Message Teacher)</h2>
            <p className="text-xs text-[#64748B]">
              બાળકે ઘરે કેવો પ્રતિસાદ આપ્યો તે શિક્ષકને જણાવો.
            </p>
          </div>
          <MessageSquare size={16} className="text-[#0D9488]" />
        </div>

        <form onSubmit={handleSendNote} className="mt-3 flex gap-2">
          <input
            type="text"
            value={parentNote}
            onChange={(e) => setParentNote(e.target.value)}
            placeholder="દા.ત. આરવે આજે ઉત્સાહથી ચમચી ગણી..."
            className="h-8.5 flex-1 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
          />
          <Button
            type="submit"
            className="h-8.5 rounded-lg bg-[#0D9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            સંદેશ મોકલો
          </Button>
        </form>

        <div className="mt-3 space-y-2">
          {parentNotesList.map((n, i) => (
            <div key={i} className="rounded-lg bg-[#F7F9F6] p-2.5 text-xs text-[#263238]">
              <span className="block text-[10px] text-[#64748B]">વાલી તરફથી નોંધ:</span>
              <p className="mt-0.5">{n}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Respectful Parental Partnership Note */}
      <div className="rounded-xl border border-[#BFE2DA] bg-[#DFF4EF]/40 p-4 text-center text-xs text-[#087F75] leading-relaxed">
        <HeartHandshake size={18} className="mx-auto mb-1 text-[#0D9488]" />
        શાળા અને ઘરનો સાથ — દરેક બાળકનું ગણિત અને વાચન સરળ બનાવે છે.
      </div>
    </div>
  )
}
