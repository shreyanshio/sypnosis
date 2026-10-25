'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Heart,
  Home,
  Phone,
  Printer,
  Sparkles,
  Volume2,
  Check,
} from 'lucide-react'
import { studentService } from '@/lib/services/studentService'
import { guardianService } from '@/lib/services/guardianService'
import { auditService } from '@/lib/services/auditService'

interface PageProps {
  params: Promise<{ studentId: string }>
}

export default function GuardianProgressCardPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const studentId = resolvedParams.studentId

  const student =
    studentService.getStudentById(studentId) ||
    studentService.getStudentById('STU-2025-3A-014') || {
      id: 'STU-2025-3A-014',
      studentId: 'STU-2025-3A-014',
      name: 'Aarav Kumar',
      standard: 3,
      section: 'A',
      avatar: 'AK',
      progressPercent: 78,
      prerequisiteGap: 'Place value bundling and 2-digit decomposition',
      literacyStatus: 'Developing',
      numeracyStatus: 'Needs Support',
    }

  const guardian = guardianService.getGuardianByStudentId(studentId) || {
    studentId: student.studentId,
    studentName: student.name,
    guardianName: 'Rameshbhai Kumar',
    relationship: 'Father',
    phone: '+91 98250 12345',
    preferredChannel: 'Portal',
    consentGiven: true,
    lastContactedDate: 'Today',
    homeLanguage: 'gu',
  }

  const [homeTaskDone, setHomeTaskDone] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const gujaratiSpeechScript = `${student.name} માટે આજની ગૃહ પ્રવૃત્તિ. આજે ઘરે ૧૦ ચમચી અથવા ૧૦ દિવાસળીની એક ભારી બનાવો. બાળકને પૂછો કે બે ભારી અને ત્રણ છૂટી વસ્તુ મળીને કેટલી થાય? જવાબ ૨૩ થશે. બાળકને પ્રોત્સાહન આપો.`

  function handlePlayAudio() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(gujaratiSpeechScript)
      utterance.lang = 'gu-IN'
      utterance.rate = 0.9
      setIsPlayingAudio(true)
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  function handleToggleDone() {
    const nextDone = !homeTaskDone
    setHomeTaskDone(nextDone)
    if (nextDone) {
      auditService.logEvent({
        actorId: 'usr-parent-01',
        actorName: guardian.guardianName,
        role: 'parent',
        eventType: 'activity_completed',
        entityType: 'student',
        entityId: student.id,
        summary: `Parent (${guardian.guardianName}) verified 5-minute home learning activity completion for ${student.name}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] p-4 sm:p-6 lg:p-8 text-[#263238]">
      <div className="mx-auto max-w-xl space-y-5">
        {/* Top return link & Print */}
        <div className="flex items-center justify-between">
          <Link
            href="/app/guardians"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:underline"
          >
            <ArrowLeft size={13} />
            <span>શાળા પોર્ટલ પર પાછા ફરો (Back)</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#17324D] shadow-xs hover:bg-[#F8FAFC]"
          >
            <Printer size={13} className="text-[#0D9488]" />
            <span>છાપો (Print)</span>
          </button>
        </div>

        {/* Child Profile Card */}
        <div className="rounded-2xl border-2 border-[#8ACFC4] bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#0D9488] text-xl font-bold text-white shadow-xs">
              {student.avatar || student.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-bold text-[#0D9488]">
                  ધોરણ {student.standard}-{student.section}
                </span>
                <span className="text-xs text-[#64748B]">આશા પ્રાથમિક શાળા</span>
              </div>
              <h1 className="mt-1 text-xl font-extrabold text-[#17324D]">{student.name}</h1>
              <p className="text-xs text-[#64748B]">
                વાલી: {guardian.guardianName} ({guardian.relationship})
              </p>
            </div>
          </div>

          {/* Weekly FLN Badge */}
          <div className="mt-5 rounded-xl bg-radial from-[#F0FDF4] to-[#DCFCE7]/40 p-4 border border-[#86EFAC]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#15803D]">
                <Award size={16} />
                <span>આ સપ્તાહની પ્રગતિ (Weekly Milestone)</span>
              </div>
              <span className="text-xs font-extrabold text-[#15803D]">{student.progressPercent}% પૂર્ણ</span>
            </div>
            <p className="mt-1.5 text-xs text-[#166534]">
              {student.name} શાળામાં ૧૦-૧૦ ની ભારી અને છૂટી સળીઓની સ્થાન કિંમત ખૂબ ઉત્સાહથી શીખી રહ્યો છે!
            </p>
          </div>

          {/* Audio read-aloud button */}
          <div className="mt-4">
            <button
              onClick={handlePlayAudio}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition shadow-xs ${
                isPlayingAudio
                  ? 'bg-[#B42318] text-white animate-pulse'
                  : 'bg-[#17324D] text-white hover:bg-[#1f4265]'
              }`}
            >
              <Volume2 size={16} />
              <span>{isPlayingAudio ? 'વાંચન ચાલુ છે... (વાંચન બંધ કરો)' : 'અવાજ સાંભળો (Listen in Gujarati)'}</span>
            </button>
          </div>
        </div>

        {/* Today's 5-Minute Home Learning Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
            <Home size={15} />
            <span>આજની ૫-મિનિટની સરળ ગૃહ પ્રવૃત્તિ</span>
          </div>

          <h2 className="mt-2 text-base font-bold text-[#17324D]">
            દસ-દસની ભારી અને છૂટી ચમચી રમત
          </h2>

          <div className="mt-3 rounded-xl bg-[#F8FAFC] p-4 border border-[#E2E8F0] text-xs leading-relaxed space-y-2 text-[#334155]">
            <p>
              <strong>પગલું ૧:</strong> ઘરમાં રહેલી ૧૦ ચમચી અથવા ૧૦ દિવાસળી ભેગી કરીને એક રબરબેન્ડ લગાવીને ૧ ભારી બનાવો.
            </p>
            <p>
              <strong>પગલું ૨:</strong> બાળકને પૂછો: "આ ૧ ભારીમાં કેટલી ચમચી છે?" બાળક બોલે "૧૦".
            </p>
            <p>
              <strong>પગલું ૩:</strong> હવે ૨ ભારી (૨૦) અને ૩ છૂટી ચમચી બાજુમાં મૂકી પૂછો: "કુલ કેટલી થઈ?" સાચો જવાબ: ૨૩.
            </p>
          </div>

          {/* Checkbox: Done at Home */}
          <div className="mt-5 border-t border-[#E2E8F0] pt-4">
            <button
              onClick={handleToggleDone}
              className={`flex w-full items-center justify-between rounded-xl border p-3.5 transition ${
                homeTaskDone
                  ? 'border-[#0D9488] bg-[#DFF4EF] text-[#0D9488]'
                  : 'border-[#CBD5E1] bg-white text-[#17324D] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-6 items-center justify-center rounded-md border text-white ${
                    homeTaskDone ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#94A3B8] bg-white'
                  }`}
                >
                  {homeTaskDone && <Check size={14} />}
                </div>
                <div className="text-left text-xs font-bold">
                  {homeTaskDone ? 'પ્રવૃત્તિ ઘરે પૂર્ણ થઈ ગઈ છે! ધન્યવાદ.' : 'અમે આજે ઘરે આ પ્રવૃત્તિ કરાવી લીધી છે'}
                </div>
              </div>

              {homeTaskDone && <Sparkles size={16} className="text-[#0D9488]" />}
            </button>
          </div>
        </div>

        {/* Teacher Contact and Encouragement Box */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#17324D]">
            <Heart size={14} className="text-[#B42318]" />
            <span>શિક્ષિકાનો સંદેશ (Teacher Note)</span>
          </div>
          <p className="italic text-[#64748B]">
            "બાળકને દરરોજ પ્રેમપૂર્વક પ્રોત્સાહિત કરો. ભૂલ પડે તો ડરાવશો નહીં. મૂર્ત વસ્તુઓ સાથે શીખવાથી પાયો મજબૂત બને છે."
          </p>
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[11px] text-[#64748B]">
            <span>આશાબેન શાહ (વર્ગશિક્ષિકા)</span>
            <span className="font-semibold text-[#0D9488]">આશા પ્રાથમિક શાળા, ખંભાળિયા</span>
          </div>
        </div>
      </div>
    </div>
  )
}
