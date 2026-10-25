'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  ListOrdered,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { PracticeActivity, Student } from '@/lib/demo-data'
import { Button } from './ui/button'

interface LearningPlanModalProps {
  student: Student
  onClose: () => void
  onApprovePlan: (student: Student, teacherAdjustments: string) => void
}

export function LearningPlanModal({ student, onClose, onApprovePlan }: LearningPlanModalProps) {
  const [teacherNotes, setTeacherNotes] = useState(
    'Approved for small-group intervention. Scheduled during morning foundational FLN circle with Group B.'
  )
  const [isApproving, setIsApproving] = useState(false)

  // Derive activities and sequence dynamically from diagnosticResult if present
  const dynamicActivities = student.diagnosticResult?.recommendedActivities
  const learningSequence = student.diagnosticResult?.learningSequence || [
    'Step 1: Concrete Bundling with Straws & Rubber Bands (દસની ભારી બનાવવી)',
    'Step 2: Dual-Column Tens Mat: Number Construction',
    'Step 3: Decade Leap Partner Game (દસકો કૂદકો રમત)',
  ]

  const activitiesToDisplay =
    dynamicActivities && dynamicActivities.length > 0
      ? dynamicActivities.map((act) => ({
          id: act.id,
          title: act.title,
          description: act.description,
          duration: act.duration,
          status: act.status === 'completed' ? ('completed' as const) : ('in_progress' as const),
          focusPrerequisite: act.focusSkill,
          teacherNote: '',
        }))
      : student.activities

  function handleApprove() {
    setIsApproving(true)
    setTimeout(() => {
      // Create student with updated activities from dynamicActivities if present
      const updatedStudent: Student = {
        ...student,
        activities: activitiesToDisplay.map((a, i) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          duration: a.duration,
          status: i === 0 ? ('in_progress' as const) : ('locked' as const),
          focusPrerequisite: a.focusPrerequisite,
        })),
      }
      onApprovePlan(updatedStudent, teacherNotes)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-xs">
      <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#d8e2df] bg-white p-5 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e8efed] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#dff4ef] px-2.5 py-0.5 text-xs font-semibold text-[#087f75]">
                અધ્યયન યોજના મંજૂરી · Learning Plan Approval
              </span>
              <span className="text-xs text-[#64748b]">Adaptive 5-Day Remedial Plan</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#17324d]">
              Learning Plan for {student.fullName} ({student.grade})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-[#64748b] transition hover:bg-[#f1f5f3]"
            aria-label="Close learning plan modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Overview Card */}
        <div className="mt-5 rounded-2xl border border-[#bfe2da] bg-[#dff4ef]/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#087f75]">Targeted Pathway</span>
            <span className="text-xs text-[#64748b]">Estimated: 5 Days · 10-15 mins/day</span>
          </div>
          <h4 className="mt-1 text-base font-bold text-[#17324d]">
            {student.planTitle || 'Concrete Bundling & Place Value Pathway (સ્થાન કિંમત અને જૂથ ગણતરી)'}
          </h4>
          <p className="mt-1 text-xs text-[#526273] leading-relaxed">
            Target Focus: Addressing prerequisite misconception in grouping 10 units into 1 ten before progressing to abstract two-digit addition.
          </p>
        </div>

        {/* Recommended Sequence Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            <ListOrdered size={15} className="text-[#0d9488]" />
            <span>Recommended Prerequisite Learning Sequence</span>
          </div>

          <div className="mt-3 space-y-2">
            {learningSequence.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-[#e2e8e5] bg-[#fbfdfc] px-3.5 py-2.5 text-xs font-medium text-[#17324d]"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#17324d] text-[11px] font-bold text-white">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Short Daily Practice Activities */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Short Daily Practice Activities (10-15 Min Classroom Micro-Interventions)
          </h4>

          <div className="mt-3 space-y-3">
            {activitiesToDisplay.map((act, idx) => (
              <div
                key={act.id}
                className="flex items-start gap-3.5 rounded-2xl border border-[#e2e8e5] bg-white p-4 shadow-xs"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#0d9488] text-xs font-bold text-white">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h5 className="font-bold text-[#17324d] text-sm">{act.title}</h5>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#94a3b8]">
                      <Clock size={12} /> {act.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748b] leading-relaxed">{act.description}</p>
                  <span className="mt-2 inline-block rounded-md bg-[#edf4f2] px-2.5 py-0.5 text-[10px] font-semibold text-[#087f75]">
                    Prerequisite Focus: {act.focusPrerequisite}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Customization & Review Notes */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label htmlFor="adjust-notes" className="text-xs font-semibold uppercase tracking-wider text-[#263238]">
              Teacher Review & Adjustments (શિક્ષકની સમીક્ષા નોંધ)
            </label>
            <span className="text-[11px] text-[#94a3b8]">Editable for classroom context</span>
          </div>
          <textarea
            id="adjust-notes"
            rows={2}
            value={teacherNotes}
            onChange={(e) => setTeacherNotes(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#cbd9d5] bg-white p-3 text-xs text-[#17324d] outline-none transition focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20"
            placeholder="Add specific instructions for pairing, morning circle timings, or physical counters…"
          />
        </div>

        {/* Teacher Professional Sign-off Box */}
        <div className="mt-5 rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-4 text-xs text-[#526273]">
          <div className="flex items-center gap-2 font-bold text-[#17324d]">
            <ShieldCheck size={16} className="text-[#0d9488]" />
            Teacher Professional Sign-off
          </div>
          <p className="mt-1 text-xs text-[#64748b] leading-relaxed">
            By approving this plan, Teacher Asha Shah validates that these activities match Aarav&apos;s observed readiness and adhere to Class 3 foundational numeracy guidelines.
          </p>
        </div>

        {/* Footer controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8efed] pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-xl border-[#b9cbc7] px-4 text-xs font-semibold text-[#17324d] hover:bg-[#edf4f2]"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isApproving}
            onClick={handleApprove}
            className="h-11 rounded-xl bg-[#0d9488] px-6 text-xs font-bold text-white shadow-sm hover:bg-[#087f75]"
          >
            {isApproving ? (
              <>
                <Loader2 size={15} className="mr-2 animate-spin" /> Recording Approval…
              </>
            ) : (
              <>
                <CheckCircle2 size={16} className="mr-1.5" /> Approve Recommended Learning Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
