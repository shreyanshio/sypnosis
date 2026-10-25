'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Printer,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  FileText,
  AlertCircle,
  Share2,
  ThumbsUp,
  Award,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { learningActivityService } from '@/lib/services/learningActivityService'
import { studentService } from '@/lib/services/studentService'
import { auditService } from '@/lib/services/auditService'
import { LearningActivity } from '@/lib/types'

interface PageProps {
  params: Promise<{ resourceId: string }>
}

export default function ResourceDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const resourceId = resolvedParams.resourceId
  const router = useRouter()
  const { t, locale } = useI18n()

  const activity = learningActivityService.getActivityById(resourceId)

  // Simulation state
  // 1. Guided math (Bundles & Loose straws)
  const [tensCount, setTensCount] = useState(2)
  const [onesCount, setOnesCount] = useState(4)

  // 2. Number line slider
  const [numberLinePos, setNumberLinePos] = useState(24)

  // 3. Flashcards
  const flashcardDeck = [
    { letter: 'ક', matra: 'ા', syllable: 'કા', word: 'કાગડો (Crow)' },
    { letter: 'ખ', matra: 'ા', syllable: 'ખા', word: 'ખાટલો (Cot)' },
    { letter: 'ગ', matra: 'ા', syllable: 'ગા', word: 'ગાય (Cow)' },
    { letter: 'ઘ', matra: 'ા', syllable: 'ઘા', word: 'ઘાસ (Grass)' },
    { letter: 'ચ', matra: 'ા', syllable: 'ચા', word: 'ચા (Tea)' },
  ]
  const [cardIndex, setCardIndex] = useState(0)
  const [cardFlipped, setCardFlipped] = useState(false)

  // 4. Audio Decodable Story
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const storySentences = [
    'મીના બાગમાં ગઈ.',
    'તેણે લાલ ગુલાબ જોયું.',
    'ગુલાબ પર સુંદર પતંગિયું બેઠું હતું.',
    'મીના હસીને તાળી પાડી.',
  ]

  // Formative observation
  const [observationNotes, setObservationNotes] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('STU-2025-3A-014')
  const [markCompleteSuccess, setMarkCompleteSuccess] = useState(false)
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white py-16 text-center shadow-xs">
        <AlertCircle size={36} className="text-[#B42318]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Resource not found</h2>
        <p className="mt-1 text-xs text-[#64748B]">Resource ID: {resourceId} does not exist in local repository.</p>
        <Link
          href="/app/resources"
          className="mt-4 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white shadow-xs"
        >
          Return to Resource Library
        </Link>
      </div>
    )
  }

  function handleSpeechPlay(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'gu-IN'
      utterance.rate = 0.9
      setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  function handleRecordObservation() {
    if (!activity) return
    const student = studentService.getStudentById(selectedStudentId)
    const targetName = student ? student.name : 'Aarav Kumar'

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'activity_completed',
      entityType: 'activity',
      entityId: activity.id,
      summary: `Teacher logged practice outcome for ${targetName}: "${observationNotes || 'Demonstrated grasp with concrete manipulative'}"`,
    })

    setMarkCompleteSuccess(true)
    setTimeout(() => {
      setMarkCompleteSuccess(false)
      setObservationNotes('')
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Back button and Meta Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/app/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:underline"
          >
            <ArrowLeft size={13} />
            Back to Resource Library
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488] uppercase">
              {(activity.contentType || 'guided_math').replace('_', ' ')}
            </span>
            <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium text-[#475569]">
              {activity.gradeRange}
            </span>
            <span className="rounded-md border border-[#E2E8F0] px-2 py-0.5 text-xs font-medium text-[#64748B]">
              {activity.curriculumMapping}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-[#17324D]">{activity.title}</h1>
          <p className="text-sm font-medium text-[#0D9488]">{activity.titleGu}</p>
        </div>

        <div className="flex items-center gap-2">
          {activity.contentType === 'worksheet' && (
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#17324D] shadow-xs hover:bg-[#F7F9F6]"
            >
              <Printer size={14} className="text-[#0D9488]" />
              <span>Print Sheet</span>
            </button>
          )}
          <button
            onClick={() => {
              if (activity.teacherScriptGu) handleSpeechPlay(activity.teacherScriptGu)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
          >
            <Volume2 size={14} />
            <span>Read Teacher Script</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Interactive Stage (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Guided Math / Bundling Manipulative Simulator */}
          {activity.contentType === 'guided_math' && (
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#DFF4EF] p-2 text-[#0D9488]">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#17324D]">Concrete Straw Bundling Simulator</h2>
                    <p className="text-xs text-[#64748B]">Click to add tens bundles (૧૦) and loose single straws (૧)</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTensCount(0)
                    setOnesCount(0)
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] px-2 py-1 text-[11px] text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              </div>

              {/* Physical Tray Simulation */}
              <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center">
                {/* Tens Column */}
                <div className="rounded-lg bg-white p-3 shadow-xs border border-[#E2E8F0]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">દશક (Tens Bundles)</div>
                  <div className="mt-3 flex min-h-[100px] flex-wrap items-center justify-center gap-2 p-2">
                    {tensCount === 0 && <span className="text-xs text-[#94A3B8]">કોઈ ભારી નથી</span>}
                    {Array.from({ length: tensCount }).map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-[#0D9488] bg-[#DFF4EF] px-2.5 py-3 text-xs font-bold text-[#0D9488] shadow-xs"
                      >
                        <div className="text-[10px]">||||||||||</div>
                        <span className="mt-1 text-[11px]">૧૦ સળી</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setTensCount(Math.max(0, tensCount - 1))}
                      className="size-7 rounded-md border border-[#E2E8F0] text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#17324D]">{tensCount}</span>
                    <button
                      onClick={() => setTensCount(tensCount + 1)}
                      className="size-7 rounded-md bg-[#0D9488] text-sm font-bold text-white hover:bg-[#0b7c72]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Ones Column */}
                <div className="rounded-lg bg-white p-3 shadow-xs border border-[#E2E8F0]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B7791F]">એકમ (Loose Straws)</div>
                  <div className="mt-3 flex min-h-[100px] flex-wrap items-center justify-center gap-1.5 p-2">
                    {onesCount === 0 && <span className="text-xs text-[#94A3B8]">કોઈ છૂટી સળી નથી</span>}
                    {Array.from({ length: onesCount }).map((_, i) => (
                      <div
                        key={i}
                        className="flex h-12 w-2.5 items-center justify-center rounded-sm bg-[#B7791F] text-[8px] text-white shadow-xs"
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setOnesCount(Math.max(0, onesCount - 1))}
                      className="size-7 rounded-md border border-[#E2E8F0] text-sm font-bold text-[#64748B] hover:bg-[#F1F5F9]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#17324D]">{onesCount}</span>
                    <button
                      onClick={() => setOnesCount(onesCount + 1)}
                      className="size-7 rounded-md bg-[#B7791F] text-sm font-bold text-white hover:bg-[#976214]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Computed Value Display */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#17324D] p-4 text-white">
                <div>
                  <div className="text-xs text-white/70">બનેલી સંખ્યા (Constructed Number)</div>
                  <div className="text-lg font-bold">
                    {tensCount} દશક ({tensCount * 10}) + {onesCount} એકમ ({onesCount}) ={' '}
                    <span className="text-[#8ACFC4]">{tensCount * 10 + onesCount}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-mono font-bold text-[#8ACFC4]">
                    {tensCount * 10 + onesCount}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Number Line Simulator */}
          {activity.contentType === 'number_line' && (
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#DFF4EF] p-2 text-[#0D9488]">
                    <SlidersHorizontal size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#17324D]">Interactive Number Line Explorer</h2>
                    <p className="text-xs text-[#64748B]">Jump by decades (+10) or units (+1)</p>
                  </div>
                </div>
                <button
                  onClick={() => setNumberLinePos(20)}
                  className="rounded-md border border-[#E2E8F0] px-2 py-1 text-[11px] text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Reset
                </button>
              </div>

              <div className="mt-6 rounded-xl bg-[#F8FAFC] p-6 text-center border border-[#E2E8F0]">
                <div className="text-xs font-semibold text-[#64748B]">વર્તમાન સ્થાન (Current Position):</div>
                <div className="mt-1 text-4xl font-extrabold text-[#0D9488]">{numberLinePos}</div>
                <div className="mt-1 text-xs text-[#64748B]">
                  {Math.floor(numberLinePos / 10)} દશક અને {numberLinePos % 10} એકમ
                </div>

                {/* Range Slider */}
                <div className="mt-6">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={numberLinePos}
                    onChange={(e) => setNumberLinePos(Number(e.target.value))}
                    className="w-full accent-[#0D9488]"
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-mono text-[#94A3B8]">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                    <span>60</span>
                    <span>70</span>
                    <span>80</span>
                    <span>90</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Jump Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setNumberLinePos(Math.max(0, numberLinePos - 10))}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-bold text-[#17324D] hover:bg-[#F1F5F9]"
                  >
                    -10 કૂદકો
                  </button>
                  <button
                    onClick={() => setNumberLinePos(Math.max(0, numberLinePos - 1))}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-bold text-[#17324D] hover:bg-[#F1F5F9]"
                  >
                    -1 ડગલું
                  </button>
                  <button
                    onClick={() => setNumberLinePos(Math.min(100, numberLinePos + 1))}
                    className="rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0b7c72]"
                  >
                    +1 ડગલું
                  </button>
                  <button
                    onClick={() => setNumberLinePos(Math.min(100, numberLinePos + 10))}
                    className="rounded-lg bg-[#17324D] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1f4265]"
                  >
                    +10 દસકો કૂદકો
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Phonics & Matra Flashcard Simulator */}
          {activity.contentType === 'flashcards' && (
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#DFF4EF] p-2 text-[#0D9488]">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#17324D]">ગુજરાતી માત્રા ફ્લેશકાર્ડ (Matra Flashcards)</h2>
                    <p className="text-xs text-[#64748B]">Click card to flip and hear phonetic sound</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#0D9488]">
                  Card {cardIndex + 1} of {flashcardDeck.length}
                </span>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <div
                  onClick={() => {
                    setCardFlipped(!cardFlipped)
                    handleSpeechPlay(
                      cardFlipped
                        ? flashcardDeck[cardIndex].letter
                        : flashcardDeck[cardIndex].syllable
                    )
                  }}
                  className="flex h-56 w-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-[#0D9488] bg-radial from-[#F0FDF4] to-white p-6 text-center shadow-md transition-transform duration-300 hover:scale-102"
                >
                  {!cardFlipped ? (
                    <div>
                      <div className="text-xs font-semibold text-[#64748B]">અક્ષર + માત્રા</div>
                      <div className="mt-2 text-5xl font-extrabold text-[#17324D]">
                        {flashcardDeck[cardIndex].letter} + {flashcardDeck[cardIndex].matra}
                      </div>
                      <div className="mt-4 text-[11px] text-[#0D9488]">ઉલટાવવા ક્લિક કરો (Click to flip)</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-semibold text-[#0D9488]">સંયુક્ત ધ્વનિ (Syllable)</div>
                      <div className="mt-1 text-6xl font-extrabold text-[#0D9488]">
                        {flashcardDeck[cardIndex].syllable}
                      </div>
                      <div className="mt-3 text-sm font-medium text-[#17324D]">
                        {flashcardDeck[cardIndex].word}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSpeechPlay(flashcardDeck[cardIndex].syllable)
                        }}
                        className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#0D9488] px-3 py-1 text-xs text-white"
                      >
                        <Volume2 size={12} /> સાંભળો
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCardIndex((prev) => (prev > 0 ? prev - 1 : flashcardDeck.length - 1))
                      setCardFlipped(false)
                    }}
                    className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-xs font-bold text-[#17324D] hover:bg-[#F1F5F9]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setCardIndex((prev) => (prev < flashcardDeck.length - 1 ? prev + 1 : 0))
                      setCardFlipped(false)
                    }}
                    className="rounded-lg bg-[#0D9488] px-5 py-2 text-xs font-bold text-white hover:bg-[#0b7c72]"
                  >
                    Next Card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. Audio Decodable Story */}
          {activity.contentType === 'audio_practice' && (
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#DFF4EF] p-2 text-[#0D9488]">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#17324D]">સરળ વાચન વાર્તા (Decodable Guided Story)</h2>
                    <p className="text-xs text-[#64748B]">Read aloud with word highlighting</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSpeechPlay(storySentences.join(' '))}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0b7c72]"
                >
                  <Volume2 size={14} />
                  <span>Play Full Story</span>
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {storySentences.map((sentence, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveSentenceIndex(idx)
                      handleSpeechPlay(sentence)
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      activeSentenceIndex === idx
                        ? 'border-[#0D9488] bg-[#DFF4EF]/40 shadow-xs'
                        : 'border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#17324D] text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <span className="text-base font-semibold text-[#17324D]">{sentence}</span>
                    </div>
                    <Volume2 size={16} className={activeSentenceIndex === idx ? 'text-[#0D9488]' : 'text-[#94A3B8]'} />
                  </div>
                ))}
              </div>

              {/* Comprehension Check */}
              <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                <div className="font-bold text-[#17324D]">મૌખિક સમજૂતી પ્રશ્નો (Oral Comprehension Check):</div>
                <ul className="mt-2 space-y-1.5 text-[#475569]">
                  <li>૧. મીના ક્યાં ગઈ હતી? (બાગમાં)</li>
                  <li>૨. ગુલાબ પર શું બેઠું હતું? (પતંગિયું)</li>
                </ul>
              </div>
            </div>
          )}

          {/* 5. Printable Worksheet Preview */}
          {activity.contentType === 'worksheet' && (
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#DFF4EF] p-2 text-[#0D9488]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#17324D]">Printable Classroom Worksheet</h2>
                    <p className="text-xs text-[#64748B]">Formatted for standard A4 paper reproduction</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAnswerKey(!showAnswerKey)}
                    className="rounded-md border border-[#E2E8F0] px-2.5 py-1 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                  >
                    {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 rounded-md bg-[#0D9488] px-3 py-1 text-xs font-semibold text-white hover:bg-[#0b7c72]"
                  >
                    <Printer size={12} /> Print
                  </button>
                </div>
              </div>

              {/* Worksheet Document Sheet */}
              <div className="mt-6 rounded-xl border-2 border-[#94A3B8] bg-white p-6 shadow-inner print:border-none print:p-0">
                <div className="flex justify-between border-b-2 border-black pb-2 text-xs">
                  <div>
                    <span className="font-bold">આશા પ્રાથમિક શાળા — ખંભાળિયા</span>
                    <div>વિષય: ગણિત (સ્થાન કિંમત મહાવરો)</div>
                  </div>
                  <div className="text-right">
                    <div>નામ: ____________________</div>
                    <div>ધોરણ: ૩-અ | રોલ નં: ______</div>
                  </div>
                </div>

                <div className="mt-4 space-y-4 text-xs">
                  <div className="rounded-md bg-[#F1F5F9] p-2 font-bold text-[#17324D]">
                    સૂચના: નીચે આપેલ દશકની ભારીઓ અને છૂટી સળીઓ ગણીને યોગ્ય સંખ્યા લખો.
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-[#CBD5E1] p-3">
                      <div className="font-bold">પ્રશ્ન ૧:</div>
                      <div className="mt-1 font-mono text-sm text-[#0D9488]">[૧૦] [૧૦] [૧૦] + ||||</div>
                      <div className="mt-2">દશક = ___ | એકમ = ___</div>
                      <div className="mt-1 font-semibold">
                        કુલ સંખ્યા = {showAnswerKey ? <span className="font-bold text-[#0D9488]">૩૪</span> : '______'}
                      </div>
                    </div>

                    <div className="rounded-lg border border-[#CBD5E1] p-3">
                      <div className="font-bold">પ્રશ્ન ૨:</div>
                      <div className="mt-1 font-mono text-sm text-[#0D9488]">[૧૦] [૧૦] [૧૦] [૧૦] [૧૦] + ||</div>
                      <div className="mt-2">દશક = ___ | એકમ = ___</div>
                      <div className="mt-1 font-semibold">
                        કુલ સંખ્યા = {showAnswerKey ? <span className="font-bold text-[#0D9488]">૫૨</span> : '______'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formative Classroom Observation & Completion */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#17324D]">Log In-Class Practice Outcome</h3>
            <p className="text-xs text-[#64748B]">Record observational notes for the student’s continuous FLN portfolio.</p>

            {markCompleteSuccess && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#DFF4EF] p-3 text-xs font-semibold text-[#0D9488]">
                <CheckCircle2 size={16} />
                <span>Practice outcome logged successfully into student portfolio & audit history.</span>
              </div>
            )}

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#17324D]">Target Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white p-2 text-xs text-[#263238]"
                >
                  <option value="STU-2025-3A-014">Aarav Kumar (STU-2025-3A-014) — Class 3A</option>
                  <option value="STU-2025-3A-008">Meera Patel (STU-2025-3A-008) — Class 3A</option>
                  <option value="STU-2025-3A-022">Devanshi Joshi (STU-2025-3A-022) — Class 3A</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#17324D]">Teacher Observational Note</label>
                <textarea
                  value={observationNotes}
                  onChange={(e) => setObservationNotes(e.target.value)}
                  placeholder="e.g. Student successfully grouped 3 bundles of 10 and 4 single straws without reversing digit order."
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleRecordObservation}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
                >
                  <CheckCircle2 size={14} />
                  <span>Mark Activity Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Guidance & Metadata (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Teacher Script Box */}
          <div className="rounded-xl border border-[#8ACFC4] bg-[#DFF4EF]/40 p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D9488]">
              <Sparkles size={14} />
              <span>Teacher Script & Delivery Guidance</span>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <div>
                <div className="font-semibold text-[#17324D]">Gujarati Script (ગુજરાતી સંવાદ):</div>
                <p className="mt-1 italic text-[#263238]">
                  "{activity.teacherScriptGu || 'બાળકને મૂર્ત સાધનોથી સંખ્યા દર્શાવવા કહો.'}"
                </p>
              </div>

              {activity.teacherScriptEn && (
                <div>
                  <div className="font-semibold text-[#17324D]">English Translation:</div>
                  <p className="mt-1 italic text-[#64748B]">"{activity.teacherScriptEn}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Classroom Materials Checklist */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Required Classroom Manipulatives
            </h3>
            <p className="mt-2 text-xs text-[#263238]">
              {activity.materialsNeeded || 'No specialized materials required. Standard paper and pencil.'}
            </p>
          </div>

          {/* Curriculum Mapping */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs text-xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              GCERT Curriculum Reference
            </h3>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">Learning Outcome Code:</span>
              <span className="font-mono font-bold text-[#0D9488]">{activity.curriculumMapping}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">Review Status:</span>
              <span className="rounded-full bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-semibold text-[#0D9488]">
                {activity.curriculumReviewStatus}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Target Competency:</span>
              <span className="font-semibold text-[#17324D]">{activity.targetSkillName}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Quick Navigation</h3>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/app/pathways"
                className="flex items-center justify-between rounded-lg border border-[#E2E8F0] p-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F7F9F6]"
              >
                <span>View 5-Day Remedial Pathway</span>
                <BookOpen size={14} className="text-[#0D9488]" />
              </Link>
              <Link
                href="/app/assessments"
                className="flex items-center justify-between rounded-lg border border-[#E2E8F0] p-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F7F9F6]"
              >
                <span>Run Diagnostic Assessment</span>
                <Clock size={14} className="text-[#0D9488]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
