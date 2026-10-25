'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Info,
  Lightbulb,
  ListOrdered,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  X,
} from 'lucide-react'
import { Student } from '@/lib/demo-data'
import {
  DiagnosticEvaluationResult,
  evaluateFLNDiagnostic,
  SkillResult,
} from '@/lib/fln-scoring-engine'
import { Button } from './ui/button'

interface DiagnosticModalProps {
  student: Student
  onClose: () => void
  onProceedToPlan: (student: Student) => void
  onStartDirectActivity?: (student: Student, activityId: string) => void
}

export function DiagnosticModal({
  student,
  onClose,
  onProceedToPlan,
  onStartDirectActivity,
}: DiagnosticModalProps) {
  // Use evaluation result from student or generate baseline
  const result: DiagnosticEvaluationResult =
    student.diagnosticResult ||
    evaluateFLNDiagnostic({
      q1: 'opt-1a',
      q2: 'opt-2a',
      q3: 'opt-3b',
      q4: 'opt-4b',
      q5: 'opt-5a',
    })

  // Teacher interactive validation state for probable gaps
  const [validatedGaps, setValidatedGaps] = useState<Record<string, boolean>>({
    'num-bundling': true, // teacher confirms place value bundling gap
    'num-decomposition': false,
  })

  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'sequence' | 'activities'>('overview')
  const [printSuccess, setPrintSuccess] = useState(false)

  function toggleValidation(skillId: string) {
    setValidatedGaps((prev) => ({ ...prev, [skillId]: !prev[skillId] }))
  }

  function handleSimulatePrint() {
    setPrintSuccess(true)
    setTimeout(() => setPrintSuccess(false), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-xs">
      <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#d8e2df] bg-white p-5 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e8efed] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#dff4ef] text-base font-bold text-[#087f75]">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#dff4ef] px-2.5 py-0.5 text-xs font-semibold text-[#087f75]">
                  FLN નિદાન પરિણામ · Diagnostic Report
                </span>
                <span className="rounded-full bg-[#f1f5f3] px-2 py-0.5 text-[10px] font-semibold text-[#64748b]">
                  {student.grade} · Roll #{student.rollNo}
                </span>
              </div>
              <h3 className="mt-1 text-xl font-bold text-[#17324d]">
                નિદાન પરિણામ પત્રક: {student.fullName} (Aarav Kumar)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulatePrint}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#cbd9d5] px-3 py-1.5 text-xs font-semibold text-[#526273] hover:bg-[#f7fbf9]"
              title="Print diagnostic report summary"
            >
              <Printer size={14} />
              <span>{printSuccess ? 'Printed!' : 'Print Summary'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-xl text-[#64748b] transition hover:bg-[#f1f5f3]"
              aria-label="Close diagnostic report"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Critical Pedagogical Distinction Banner */}
        <div className="mt-5 rounded-2xl border border-[#bfe2da] bg-[#eef7f4] p-4 text-xs leading-5 text-[#17324d]">
          <div className="flex items-start gap-2.5">
            <ShieldCheck size={18} className="shrink-0 text-[#0d9488] mt-0.5" />
            <div>
              <p className="font-bold text-[#0d9488] text-sm">
                Pedagogical Notice: Probable Learning Gap vs. Validated Diagnosis
              </p>
              <p className="mt-1 text-[#526273]">
                <strong>Probable Learning Gap (Screening Signal):</strong> Indicates a specific misconception observed in this 5-question check (e.g. tens/ones positional reversal). This is an initial screening indicator, not a definitive deficit or learning disability.
              </p>
              <p className="mt-1 text-[#526273]">
                <strong>Validated Diagnosis:</strong> Established only when the classroom teacher observes and confirms the hurdle across hands-on manipulative activities (e.g., bundling sticks in small group work).
              </p>
            </div>
          </div>
        </div>

        {/* Score & Primary Summary Banner */}
        <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_1.9fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-5 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Overall Baseline Score</span>
            <div className="mt-2 text-4xl font-extrabold text-[#0d9488]">{result.overallScore}%</div>
            <span className="mt-1.5 rounded-full bg-[#dff4ef] px-3 py-0.5 text-xs font-semibold text-[#087f75]">
              {result.correctAnswersCount} of {result.totalQuestions} Questions Correct
            </span>
            <p className="mt-2 text-[11px] text-[#94a3b8]">Evaluated from submitted student responses</p>
          </div>

          <div className="rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17324d]">
                <Target size={15} className="text-[#0d9488]" /> Prerequisite Summary
              </span>
              <span className="rounded-full bg-[#fff5d9] px-2 py-0.5 text-[10px] font-bold text-[#8a6200]">
                {result.probableGapsCount} Probable Gap(s) Flagged
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#526273]">{result.pedagogicalSummary}</p>
            {student.pedagogicalInsight && (
              <div className="mt-3 rounded-xl bg-white p-3 border border-[#e2e8e5] text-xs text-[#17324d]">
                <strong>Teacher Observation Note:</strong> &ldquo;{student.pedagogicalInsight}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Clear Next-Step Action Callout (Direct CTA) */}
        <div className="mt-5 rounded-2xl bg-[#17324d] p-5 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8acfc4]">
                <Sparkles size={15} /> Immediate Next-Step Action
              </div>
              <h4 className="mt-1 text-base font-bold sm:text-lg">{result.clearNextStep.title}</h4>
              <p className="mt-0.5 text-xs text-white/75 leading-relaxed">
                Conduct this 12-minute hands-on bundling session with Aarav to validate his grouping intuition before moving to 2-digit column worksheets.
              </p>
            </div>
            <Button
              onClick={() => {
                if (onStartDirectActivity) {
                  onStartDirectActivity(student, result.recommendedActivities[0]?.id || 'act-1')
                } else {
                  onProceedToPlan(student)
                }
              }}
              className="h-11 shrink-0 rounded-xl bg-[#0d9488] px-5 text-xs font-bold text-white shadow-md hover:bg-[#087f75]"
            >
              {result.clearNextStep.actionText} <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Detailed Report Tabs */}
        <div className="mt-6">
          <div className="flex border-b border-[#e8efed] text-xs font-semibold">
            {[
              { id: 'overview', label: '૧. કૌશલ્ય સ્તર પરિણામ · Skill-Level Results' },
              { id: 'evidence', label: '૨. પુરાવા વિશ્લેષણ · Evidence for Recommendations' },
              { id: 'sequence', label: '૩. અધ્યયન ક્રમ · Recommended Sequence' },
              { id: 'activities', label: '૪. દૈનિક પ્રવૃત્તિઓ · Daily Practice Activities' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`border-b-2 px-3 py-2.5 transition ${
                  activeTab === tab.id
                    ? 'border-[#0d9488] text-[#0d9488]'
                    : 'border-transparent text-[#64748b] hover:text-[#17324d]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Skill-Level Results */}
          {activeTab === 'overview' && (
            <div className="mt-5 space-y-3.5">
              {result.skills.map((skill: SkillResult) => {
                const isValidated = validatedGaps[skill.skillId]

                return (
                  <div
                    key={skill.skillId}
                    className={`rounded-2xl border p-4 transition ${
                      skill.isProbableGap
                        ? 'border-[#fed7aa] bg-[#fffaf5]'
                        : 'border-[#e2e8e5] bg-white'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-[#17324d] text-sm">{skill.skillName}</h5>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              skill.status === 'Mastered'
                                ? 'bg-[#dff4ef] text-[#087f75]'
                                : 'bg-[#fff5d9] text-[#8a6200]'
                            }`}
                          >
                            {skill.statusBadge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#526273]">{skill.explanation}</p>
                      </div>

                      <div className="flex items-center gap-3 sm:justify-end">
                        <span className="text-sm font-extrabold text-[#17324d]">{skill.scorePercent}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#edf2f0]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          skill.scorePercent === 100
                            ? 'bg-[#15803d]'
                            : skill.scorePercent >= 50
                            ? 'bg-[#f4b544]'
                            : 'bg-[#ea580c]'
                        }`}
                        style={{ width: `${skill.scorePercent}%` }}
                      />
                    </div>

                    {/* Prerequisite Action & Teacher Validation Toggle for Probable Gaps */}
                    {skill.isProbableGap && (
                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#fed7aa] bg-white p-3 text-xs">
                        <div className="flex items-center gap-2 text-[#8a6200]">
                          <Lightbulb size={15} />
                          <span>
                            <strong>Prerequisite Focus:</strong> {skill.recommendation}
                          </span>
                        </div>

                        {/* Teacher Validation Control */}
                        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#17324d]">
                          <input
                            type="checkbox"
                            checked={isValidated}
                            onChange={() => toggleValidation(skill.skillId)}
                            className="size-4 rounded accent-[#0d9488]"
                          />
                          <span>
                            {isValidated ? (
                              <span className="text-[#087f75] font-bold">
                                ✓ Confirmed Diagnosis (Teacher Verified)
                              </span>
                            ) : (
                              <span className="text-[#64748b]">
                                Confirm Gap via 1-on-1 check
                              </span>
                            )}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Tab 2: Evidence for Each Recommendation */}
          {activeTab === 'evidence' && (
            <div className="mt-5 space-y-4">
              <p className="text-xs text-[#64748b]">
                Below is the direct question-by-question evidence comparing the student’s selected answer against expected foundational targets, highlighting underlying cognitive patterns.
              </p>

              {result.evidences.map((ev, idx) => (
                <div
                  key={ev.questionId}
                  className={`rounded-2xl border p-4 text-xs ${
                    ev.isCorrect
                      ? 'border-[#bfe2da] bg-[#f7fbf9]'
                      : 'border-[#fbd0c8] bg-[#fffbfa]'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-[#17324d]">
                      પ્રશ્ન {idx + 1}: {ev.skillName}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        ev.isCorrect
                          ? 'bg-[#dff4ef] text-[#087f75]'
                          : 'bg-[#fdedeb] text-[#b42318]'
                      }`}
                    >
                      {ev.isCorrect ? 'Correct ✓' : 'Prerequisite Signal ✕'}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#526273] font-medium leading-relaxed">{ev.questionText}</p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-2.5 border border-[#e2e8e5]">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                        Child&apos;s Submitted Choice:
                      </span>
                      <p className={`mt-0.5 font-semibold ${ev.isCorrect ? 'text-[#087f75]' : 'text-[#b42318]'}`}>
                        {ev.chosenOptionLabel}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 border border-[#e2e8e5]">
                      <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                        Target Concept / Expected:
                      </span>
                      <p className="mt-0.5 font-semibold text-[#087f75]">{ev.targetOptionLabel}</p>
                    </div>
                  </div>

                  {/* Pedagogical Evidence Analysis */}
                  <div className="mt-3 rounded-xl bg-[#f0f4f2] p-2.5 text-xs text-[#263238] leading-5">
                    <strong>Pedagogical Diagnosis:</strong> {ev.misconceptionDiagnosis}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Recommended Learning Sequence */}
          {activeTab === 'sequence' && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[#e2e8e5] bg-[#fbfdfc] p-4 text-xs text-[#526273]">
                <p className="font-semibold text-[#17324d] text-sm">
                  Prerequisite Learning Trajectory for Aarav
                </p>
                <p className="mt-1">
                  Activities are sequenced by developmental dependency: concrete tactile manipulatives precede abstract representations, and phonemic awareness precedes sentence retrieval.
                </p>
              </div>

              <div className="space-y-3">
                {result.learningSequence.map((stepText, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 rounded-2xl border border-[#d8e2df] bg-white p-4 shadow-xs"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#17324d] text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#17324d]">{stepText}</p>
                      <p className="mt-0.5 text-xs text-[#64748b]">
                        Prerequisite rationale: Master tactile groupings of 10 prior to column addition.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#dff4ef] px-2.5 py-0.5 text-[10px] font-bold text-[#087f75]">
                      Step {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Short Daily Practice Activities */}
          {activeTab === 'activities' && (
            <div className="mt-5 space-y-4">
              <p className="text-xs text-[#64748b]">
                Short 10-15 minute classroom micro-activities specifically tailored to the identified gaps. Designed to run during regular morning circle or small-group remedial time.
              </p>

              <div className="space-y-3.5">
                {result.recommendedActivities.map((act) => (
                  <div
                    key={act.id}
                    className="rounded-2xl border border-[#e2e8e5] bg-white p-4 sm:p-5 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#17324d] px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Day {act.dayNumber}
                        </span>
                        <span className="text-sm font-bold text-[#17324d]">{act.title}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#64748b]">
                        <Clock size={13} /> {act.duration}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#087f75] font-semibold">{act.titleGu}</p>
                    <p className="mt-1.5 text-xs text-[#526273] leading-5">{act.description}</p>

                    <div className="mt-3 grid gap-2 rounded-xl bg-[#f7f9f6] p-3 text-xs sm:grid-cols-2">
                      <div>
                        <strong className="text-[#17324d]">Materials:</strong>{' '}
                        <span className="text-[#64748b]">{act.materialsNeeded}</span>
                      </div>
                      <div>
                        <strong className="text-[#17324d]">Teacher Script:</strong>{' '}
                        <span className="text-[#64748b] italic">&ldquo;{act.teacherScript}&rdquo;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Teacher Review & Approval Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8efed] pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-xl border-[#b9cbc7] px-4 text-xs font-semibold text-[#17324d] hover:bg-[#edf4f2]"
          >
            Close Report
          </Button>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              onClick={() => onProceedToPlan(student)}
              className="h-11 rounded-xl bg-[#0d9488] px-6 text-xs font-bold text-white shadow-sm hover:bg-[#087f75]"
            >
              Approve Recommended Learning Plan <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
