'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { PracticeActivity, Student } from '@/lib/demo-data'
import { Button } from './ui/button'

interface ActivityModalProps {
  student: Student
  activity: PracticeActivity
  onClose: () => void
  onCompleteActivity: (activityId: string, teacherNote: string) => void
}

export function ActivityModal({ student, activity, onClose, onCompleteActivity }: ActivityModalProps) {
  const [observation, setObservation] = useState(
    'Aarav successfully grouped 3 sets of 10 straws with rubber bands. Self-corrected on counting the loose units.'
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleComplete() {
    setIsSubmitting(true)
    setTimeout(() => {
      onCompleteActivity(activity.id, observation)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#d8e2df] bg-white p-6 shadow-2xl sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e8efed] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#dff4ef] px-2.5 py-0.5 text-xs font-semibold text-[#087f75]">
                Targeted Practice Activity
              </span>
              <span className="text-xs text-[#64748b]">{activity.duration} Session</span>
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#17324d]">{activity.title}</h3>
            <p className="mt-0.5 text-xs text-[#64748b]">
              Student: {student.fullName} · {student.grade}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#64748b] hover:bg-[#f1f5f3]"
            aria-label="Close activity"
          >
            <X size={20} />
          </button>
        </div>

        {/* Activity Details Card */}
        <div className="mt-5 rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#087f75]">
            <Target size={15} /> Prerequisite Focus
          </div>
          <p className="mt-1 text-sm font-semibold text-[#17324d]">{activity.focusPrerequisite}</p>
          <p className="mt-2 text-xs leading-5 text-[#526273]">{activity.description}</p>

          <div className="mt-4 rounded-xl border border-[#bfe2da] bg-[#dff4ef]/50 p-3.5 text-xs leading-5 text-[#087f75]">
            <strong>Teacher Classroom Guide:</strong> Provide Aarav with 35 drinking straws and 4 rubber bands.
            Prompt him: &ldquo;Bundle ten straws into a bundle. How many bundles can you make? How many loose straws are
            left?&rdquo;
          </div>
        </div>

        {/* Teacher Observation Input */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label htmlFor="teacher-obs" className="text-xs font-semibold uppercase tracking-wider text-[#263238]">
              Teacher Formative Observation Note
            </label>
            <span className="text-[11px] text-[#0d9488]">Records progress milestone</span>
          </div>
          <textarea
            id="teacher-obs"
            rows={3}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#cbd9d5] bg-white p-3 text-xs text-[#17324d] outline-none transition focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20"
            placeholder="Record Aarav's engagement, independence, and conceptual grasp…"
          />
        </div>

        {/* What happens next banner */}
        <div className="mt-4 rounded-2xl bg-[#17324d] p-4 text-xs text-white">
          <div className="flex items-center gap-1.5 font-semibold text-[#8acfc4]">
            <Sparkles size={14} /> Journey Milestone Progression
          </div>
          <p className="mt-1 text-white/80 leading-5">
            Marking this activity complete will update Aarav’s progress to <strong>50%</strong>, record a class
            milestone (+1), and unlock the next activity: <em>Base-10 Tens Mat</em>.
          </p>
        </div>

        {/* Footer controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8efed] pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 rounded-xl border-[#b9cbc7] px-4 text-xs font-medium text-[#17324d]"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleComplete}
            className="h-10 rounded-xl bg-[#0d9488] px-5 text-xs font-semibold text-white shadow-sm hover:bg-[#087f75]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" /> Recording Milestone…
              </>
            ) : (
              <>
                <CheckCircle2 size={15} className="mr-1.5" /> Mark Practice Activity Complete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
