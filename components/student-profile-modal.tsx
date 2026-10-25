'use client'

import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Target,
  User,
  X,
} from 'lucide-react'
import { Student } from '@/lib/demo-data'
import { Button } from './ui/button'

interface StudentProfileModalProps {
  student: Student | null
  onClose: () => void
  onStartAssessment: (student: Student) => void
  onViewDiagnostic: (student: Student) => void
  onReviewPlan: (student: Student) => void
  onStartActivity: (student: Student, activityId: string) => void
}

export function StudentProfileModal({
  student,
  onClose,
  onStartAssessment,
  onViewDiagnostic,
  onReviewPlan,
  onStartActivity,
}: StudentProfileModalProps) {
  if (!student) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#d8e2df] bg-white p-6 shadow-2xl sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e8efed] pb-5">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#dff4ef] text-xl font-bold text-[#087f75]">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#17324d]">{student.fullName}</h3>
                <span className="rounded-full bg-[#f1f5f3] px-2.5 py-0.5 text-xs font-semibold text-[#526273]">
                  Roll #{student.rollNo}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#64748b]">
                {student.grade} · Asha Primary School · Prerequisite Focus: {student.focusSkill}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-[#64748b] hover:bg-[#f1f5f3] hover:text-[#17324d]"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status bar */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-3.5">
            <span className="text-[11px] font-medium text-[#64748b]">Current FLN Status</span>
            <p className="mt-1 text-sm font-semibold text-[#17324d]">{student.status}</p>
          </div>
          <div className="rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-3.5">
            <span className="text-[11px] font-medium text-[#64748b]">Diagnostic Assessment</span>
            <p className="mt-1 text-sm font-semibold text-[#0d9488]">{student.diagnosticStatus}</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-3.5 sm:col-span-1">
            <span className="text-[11px] font-medium text-[#64748b]">Remedial Pathway</span>
            <p className="mt-1 text-sm font-semibold text-[#17324d]">{student.planStatus}</p>
          </div>
        </div>

        {/* Prerequisite gap callout */}
        <div className="mt-5 rounded-2xl border border-[#bfe2da] bg-[#dff4ef]/60 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#087f75]">
            <Target size={16} /> Prerequisite Skill Diagnosis
          </div>
          <p className="mt-1.5 text-sm font-medium text-[#17324d]">{student.prerequisiteGap}</p>
          {student.pedagogicalInsight && (
            <p className="mt-2 text-xs leading-5 text-[#526273]">{student.pedagogicalInsight}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-5 rounded-2xl border border-[#e2e8e5] p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#17324d]">
            <span>Foundational Milestone Completion</span>
            <span className="text-[#0d9488]">{student.progressPercent}%</span>
          </div>
          <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#edf2f0]">
            <div
              className="h-full rounded-full bg-[#0d9488] transition-all duration-500"
              style={{ width: `${student.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Demo Journey Primary Action CTA */}
        <div className="mt-6 rounded-2xl bg-[#17324d] p-5 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8acfc4]">
            <Sparkles size={15} /> Demo Journey Next Action
          </div>

          {student.diagnosticStatus === 'Pending assessment' && (
            <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-base font-semibold">Run Foundational Numeracy Diagnostic</h4>
                <p className="mt-0.5 text-xs text-white/70">
                  Child-friendly 3-question check to verify place-value bundling intuition.
                </p>
              </div>
              <Button
                onClick={() => onStartAssessment(student)}
                className="h-10 shrink-0 rounded-xl bg-[#0d9488] px-4 text-xs font-semibold text-white hover:bg-[#087f75]"
              >
                Start Diagnostic <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </div>
          )}

          {student.diagnosticStatus === 'Completed' && student.planStatus !== 'Approved' && (
            <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-base font-semibold">Review Diagnostic & Approve Learning Plan</h4>
                <p className="mt-0.5 text-xs text-white/70">
                  Diagnostic completed ({student.diagnosticScore || 67}%). Review recommended activities.
                </p>
              </div>
              <Button
                onClick={() => onReviewPlan(student)}
                className="h-10 shrink-0 rounded-xl bg-[#0d9488] px-4 text-xs font-semibold text-white hover:bg-[#087f75]"
              >
                Review & Approve Plan <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </div>
          )}

          {student.planStatus === 'Approved' && (
            <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-base font-semibold">Learning Plan Approved & Active</h4>
                <p className="mt-0.5 text-xs text-white/70">
                  {student.activities.filter((a) => a.status === 'completed').length} of {student.activities.length} practice
                  activities completed.
                </p>
              </div>
              <Button
                onClick={() => onViewDiagnostic(student)}
                variant="outline"
                className="h-10 shrink-0 rounded-xl border-white/20 bg-white/10 px-4 text-xs font-semibold text-white hover:bg-white/20"
              >
                View Diagnostic Report
              </Button>
            </div>
          )}
        </div>

        {/* Assigned Practice Activities */}
        {student.activities.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-[#17324d]">Recommended Classroom Activities</h4>
            <div className="mt-3 space-y-3">
              {student.activities.map((act, index) => {
                const isCompleted = act.status === 'completed'
                const isInProgress = act.status === 'in_progress'
                const isLocked = act.status === 'locked'

                return (
                  <div
                    key={act.id}
                    className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${
                      isCompleted
                        ? 'border-[#bfe2da] bg-[#f0f9f6]'
                        : isInProgress
                        ? 'border-[#0d9488] bg-white shadow-xs'
                        : 'border-[#e2e8e5] bg-[#f9faf9] opacity-75'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#64748b]">Activity {index + 1}</span>
                        <span className="flex items-center gap-1 text-[11px] text-[#94a3b8]">
                          <Clock size={12} /> {act.duration}
                        </span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#dff4ef] px-2 py-0.5 text-[10px] font-semibold text-[#087f75]">
                            <CheckCircle2 size={11} /> Completed
                          </span>
                        )}
                        {isInProgress && (
                          <span className="rounded-full bg-[#fff5d9] px-2 py-0.5 text-[10px] font-semibold text-[#8a6200]">
                            Ready for Teacher Guidance
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-semibold text-[#17324d]">{act.title}</p>
                      <p className="mt-0.5 text-xs text-[#64748b]">{act.description}</p>
                      {act.teacherNote && (
                        <p className="mt-1.5 text-xs font-medium text-[#087f75]">
                          Teacher Observation: &ldquo;{act.teacherNote}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isCompleted ? (
                        <span className="text-xs font-semibold text-[#087f75]">Milestone Recorded</span>
                      ) : isInProgress ? (
                        <Button
                          onClick={() => onStartActivity(student, act.id)}
                          className="h-9 rounded-xl bg-[#0d9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087f75]"
                        >
                          Mark Complete <CheckCircle2 size={13} className="ml-1" />
                        </Button>
                      ) : (
                        <span className="text-xs text-[#94a3b8]">Locked (complete Activity 1 first)</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-7 flex justify-end border-t border-[#e8efed] pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 rounded-xl border-[#b9cbc7] px-5 text-xs font-medium text-[#17324d]"
          >
            Close Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
