'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  RotateCcw,
  Sparkles,
  User,
  Users,
  Volume2,
} from 'lucide-react'
import { assessmentService } from '@/lib/services/assessmentService'
import { studentService } from '@/lib/services/studentService'
import { AssessmentRecord, StudentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import {
  FLN_DIAGNOSTIC_QUESTIONS,
  DiagnosticEvaluationResult,
  evaluateFLNDiagnostic,
} from '@/lib/fln-scoring-engine'

export default function AssessmentRunnerPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>
}) {
  const { assessmentId } = use(params)
  const router = useRouter()
  const { t } = useI18n()

  const asmt = assessmentService.getAssessmentById(assessmentId)
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    asmt?.targetStudentIds[0] || 'aarav-k'
  )

  const activeStudent = studentService.getStudentById(selectedStudentId)

  // Assessment runner state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [teacherNotes, setTeacherNotes] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<DiagnosticEvaluationResult | null>(null)
  const [planApproved, setPlanApproved] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  if (!asmt) {
    return (
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
        <ClipboardCheck size={32} className="mx-auto text-[#CBD5E1]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Assessment not found</h2>
        <p className="mt-1 text-xs text-[#64748B]">No assessment record matching ID &ldquo;{assessmentId}&rdquo;.</p>
        <Link
          href="/app/assessments"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75]"
        >
          <ArrowLeft size={13} /> Back to Assessments
        </Link>
      </div>
    )
  }

  const currentQ = FLN_DIAGNOSTIC_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === FLN_DIAGNOSTIC_QUESTIONS.length - 1
  const hasAnsweredCurrent = !!answers[currentQ?.id]

  // Read aloud question using Web Speech API
  function handleReadAloud() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const textToSpeak = `${currentQ.questionGu}. ${currentQ.questionEn}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = 'gu-IN'
    utterance.rate = 0.9

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  function handleSelectOption(optionId: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }))
  }

  function handleNext() {
    if (currentQuestionIndex < FLN_DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  function handleSubmitAssessment() {
    const evalRes = evaluateFLNDiagnostic(answers, teacherNotes)
    setEvaluationResult(evalRes)

    // Update student and assessment status
    if (activeStudent) {
      const updated: StudentRecord = {
        ...activeStudent,
        diagnosticScore: evalRes.overallScore,
        prerequisiteGap: evalRes.pedagogicalSummary,
        pedagogicalInsight: teacherNotes || evalRes.pedagogicalSummary,
        planStatus: 'Pending approval',
        overallStatus: evalRes.overallScore < 70 ? 'Needs Support' : evalRes.overallScore < 85 ? 'Developing' : 'Demonstrated',
        lastAssessedDate: 'Just now',
      }
      studentService.updateStudent(updated)
    }

    if (asmt) {
      assessmentService.updateAssessmentStatus(asmt.id, 'Completed')
    }
    showToast('Diagnostic completed and analyzed!')
  }

  function handleApprovePathway() {
    if (activeStudent) {
      const updated: StudentRecord = {
        ...activeStudent,
        planStatus: 'Approved',
        progressPercent: 20,
      }
      studentService.updateStudent(updated)
    }
    setPlanApproved(true)
    showToast('Remedial learning pathway approved for classroom implementation!')
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

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/app/assessments" className="hover:text-[#0D9488] hover:underline">
          Assessments Directory
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#17324D]">{asmt.title}</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-bold text-[#17324D]">
              Class {asmt.standard}
            </span>
            <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#087F75]">
              {asmt.subject === 'numeracy' ? 'Foundational Numeracy' : 'Foundational Literacy'}
            </span>
          </div>
          <h1 className="mt-1 text-base font-bold text-[#17324D] sm:text-lg">{asmt.title}</h1>
        </div>

        {/* Student Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B]">Active Learner:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => {
              setSelectedStudentId(e.target.value)
              setCurrentQuestionIndex(0)
              setAnswers({})
              setEvaluationResult(null)
            }}
            className="h-8 rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs font-semibold text-[#17324D] focus:border-[#0D9488] focus:outline-none"
          >
            {asmt.targetStudentIds.map((sId) => {
              const s = studentService.getStudentById(sId)
              return (
                <option key={sId} value={sId}>
                  {s ? `${s.fullName} (#${s.rollNo})` : sId}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {!evaluationResult ? (
        /* Question Screen (Child-Friendly, One at a Time) */
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold text-[#0D9488]">
              પ્રશ્ન {currentQuestionIndex + 1} of {FLN_DIAGNOSTIC_QUESTIONS.length}
            </span>
            <span>Skill Domain: <strong className="text-[#17324D]">{currentQ.skillCategory}</strong></span>
          </div>

          <div className="mt-2 h-2 w-full rounded-full bg-[#E2E8F0]">
            <div
              className="h-2 rounded-full bg-[#0D9488] transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / FLN_DIAGNOSTIC_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Prompt */}
          <div className="mt-6 rounded-xl bg-[#F7F9F6] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#17324D] leading-snug sm:text-xl">
                  {currentQ.questionGu}
                </p>
                <p className="mt-1 text-xs text-[#64748B]">{currentQ.questionEn}</p>
              </div>

              <button
                type="button"
                onClick={handleReadAloud}
                aria-label="Read prompt aloud"
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg border transition ${
                  isSpeaking
                    ? 'border-[#0D9488] bg-[#DFF4EF] text-[#087F75] animate-pulse'
                    : 'border-[#CBD5E1] bg-white text-[#17324D] hover:bg-[#F1F5F3]'
                }`}
              >
                <Volume2 size={18} />
              </button>
            </div>
          </div>

          {/* Large Touch Answer Targets */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? 'border-[#0D9488] bg-[#DFF4EF]/40 ring-2 ring-[#0D9488] ring-offset-1'
                      : 'border-[#CBD5E1] bg-white hover:border-[#0D9488]/60 hover:bg-[#F7F9F6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isSelected ? 'bg-[#0D9488] text-white' : 'bg-[#E2E8F0] text-[#17324D]'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#17324D]">{opt.labelGu}</p>
                      <p className="text-[11px] text-[#64748B]">{opt.labelEn}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-[#0D9488]" />}
                </button>
              )
            })}
          </div>

          {/* Teacher Quick Note for this Question */}
          <div className="mt-5 pt-4 border-t border-[#F1F5F3]">
            <label className="block text-xs font-medium text-[#64748B]">
              Teacher observation note (e.g., student verbal hesitation or counting method):
            </label>
            <input
              type="text"
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="e.g., Aarav counted one-by-one with fingers instead of grouping 10s."
              className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
            />
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#F1F5F3]">
            <Button
              type="button"
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevious}
              className="h-8.5 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D]"
            >
              <ArrowLeft size={13} className="mr-1" /> Previous Question
            </Button>

            {isLastQuestion ? (
              <Button
                type="button"
                disabled={!hasAnsweredCurrent}
                onClick={handleSubmitAssessment}
                className="h-8.5 rounded-lg bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                <CheckCircle2 size={13} className="mr-1.5" /> Complete & Evaluate
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!hasAnsweredCurrent}
                onClick={handleNext}
                className="h-8.5 rounded-lg bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                Next Question <ArrowRight size={13} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Post-Assessment Explainable Diagnostic Analysis Screen */
        <div className="space-y-5 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#087F75]">
                Diagnostic Evaluation Generated
              </span>
              <h2 className="mt-1 text-lg font-bold text-[#17324D]">
                FLN Diagnostic Analysis: {activeStudent?.fullName}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#64748B] block">Overall FLN Score</span>
              <span className="text-2xl font-bold text-[#0D9488]">
                {evaluationResult.overallScore}%
              </span>
            </div>
          </div>

          {/* Explainable Skill Breakdown */}
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F7F9F6] p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Skill Domain Breakdown
            </h3>
            <div className="mt-3 space-y-2.5">
              {evaluationResult.skills.map((s) => (
                <div key={s.skillId} className="text-xs">
                  <div className="flex justify-between font-medium text-[#17324D]">
                    <span>{s.skillName}</span>
                    <span>{s.scorePercent}% ({s.correctCount}/{s.questionsCount})</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-[#E2E8F0]">
                    <div
                      className={`h-1.5 rounded-full ${
                        s.scorePercent >= 80 ? 'bg-[#15803D]' : s.scorePercent >= 60 ? 'bg-[#0D9488]' : 'bg-[#B7791F]'
                      }`}
                      style={{ width: `${s.scorePercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Prerequisite Learning Gap & Evidence */}
          <div className="rounded-xl border border-[#E2E8F0] p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Pedagogical Finding & Diagnosis
            </h3>
            <p className="mt-1.5 text-xs text-[#17324D] font-semibold leading-relaxed">
              {evaluationResult.pedagogicalSummary}
            </p>
            <div className="mt-3 rounded-lg bg-[#FFF5D9] p-3 text-xs text-[#8A6200]">
              <strong className="block font-bold">Probable Signal vs Validated Diagnosis:</strong>
              This diagnostic indicates a probable conceptual barrier in decade boundary bundling. Teacher physical observation validates that learner needs tactile manipulative scaffolding.
            </div>
          </div>

          {/* Recommended 5-Day Remedial Sequence */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Recommended 5-Day Remedial Micro-Activities
            </h3>
            <div className="mt-3 space-y-2">
              {evaluationResult.recommendedActivities.map((act, i: number) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between rounded-lg border border-[#E2E8F0] p-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#DFF4EF] text-xs font-bold text-[#087F75]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[#17324D]">{act.title}</p>
                      <p className="text-[11px] text-[#64748B]">{act.description}</p>
                    </div>
                  </div>
                  <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-semibold text-[#17324D]">
                    {act.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Review & Approval Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F3] pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setEvaluationResult(null)
                setCurrentQuestionIndex(0)
                setAnswers({})
              }}
              className="h-8.5 rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D]"
            >
              <RotateCcw size={12} className="mr-1.5" /> Retake Diagnostic
            </Button>

            <div className="flex items-center gap-2">
              <Link
                href="/app/assessments"
                className="flex h-8.5 items-center rounded-lg border border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
              >
                Back to Directory
              </Link>
              <Button
                onClick={handleApprovePathway}
                disabled={planApproved}
                className="h-8.5 rounded-lg bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                <CheckCircle2 size={13} className="mr-1.5" />
                {planApproved ? 'Pathway Approved' : 'Approve Remedial Pathway'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
