'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  Info,
  RotateCcw,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DemoState,
  getInitialDemoState,
  resetDemoState,
  saveDemoState,
  Student,
} from '@/lib/demo-data'
import { evaluateFLNDiagnostic } from '@/lib/fln-scoring-engine'
import { DemoJourneyBanner } from '@/components/demo-journey-banner'
import { StudentProfileModal } from '@/components/student-profile-modal'
import { AssessmentModal } from '@/components/assessment-modal'
import { DiagnosticModal } from '@/components/diagnostic-modal'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { useI18n } from '@/lib/i18n/context'

export default function DashboardPage() {
  const { t } = useI18n()
  const [state, setState] = useState<DemoState>(getInitialDemoState)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  // Journey modals
  const [modalMode, setModalMode] = useState<
    'none' | 'profile' | 'assessment' | 'diagnostic' | 'plan' | 'activity'
  >('none')

  // Save state on changes
  useEffect(() => {
    saveDemoState(state)
  }, [state])

  function updateStudent(updated: Student) {
    setState((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === updated.id ? updated : s)),
    }))
    setSelectedStudent(updated)
  }

  function handleReset() {
    const fresh = resetDemoState()
    setState(fresh)
    setSelectedStudent(null)
    setModalMode('none')
    setFeedbackToast('Demo state reset to initial baseline.')
    setTimeout(() => setFeedbackToast(null), 3000)
  }

  // Journey Step 3: Select Student
  function handleSelectStudent(student: Student) {
    setSelectedStudent(student)
    setModalMode('profile')
    if (state.currentStage === 2 && student.id === 'aarav-k') {
      setState((prev) => ({ ...prev, currentStage: 3, selectedStudentId: student.id }))
    }
  }

  // Journey Step 4: Start Assessment
  function handleStartAssessment(student: Student) {
    setSelectedStudent(student)
    setModalMode('assessment')
    if (state.currentStage <= 3) {
      setState((prev) => ({ ...prev, currentStage: 4 }))
    }
  }

  // Journey Step 4 -> Step 5: Diagnostic Results
  function handleCompleteAssessment(answers: Record<string, string>, notes: string) {
    if (!selectedStudent) return

    const evaluation = evaluateFLNDiagnostic(answers, notes)

    const updated: Student = {
      ...selectedStudent,
      diagnosticStatus: 'Completed',
      diagnosticScore: evaluation.overallScore,
      diagnosticResult: evaluation,
      prerequisiteGap: evaluation.pedagogicalSummary,
      pedagogicalInsight: notes || evaluation.pedagogicalSummary,
      planStatus: 'Pending approval',
      activities: evaluation.recommendedActivities.map((act, i) => ({
        id: act.id,
        title: act.title,
        description: act.description,
        duration: act.duration,
        status: i === 0 ? ('in_progress' as const) : ('locked' as const),
        focusPrerequisite: act.focusSkill,
      })),
    }

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 5,
      studentsAssessedCount: Math.min(prev.totalStudentsCount, prev.studentsAssessedCount + 1),
    }))
    setModalMode('diagnostic')
  }

  // Journey Step 5 -> Step 6: Review Plan
  function handleProceedToPlan(student: Student) {
    setSelectedStudent(student)
    setModalMode('plan')
    setState((prev) => ({ ...prev, currentStage: 6 }))
  }

  // Journey Step 6: Approve Plan
  function handleApprovePlan(student: Student, notes: string) {
    const updated: Student = {
      ...student,
      planStatus: 'Approved',
      approvedAt: 'Just now',
      approvedBy: 'Teacher Asha Shah',
      pedagogicalInsight: notes
        ? `${student.pedagogicalInsight || ''} (Teacher: ${notes})`
        : student.pedagogicalInsight,
    }

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 7,
      activePlansCount: prev.activePlansCount + 1,
    }))
    setModalMode('profile')
    setFeedbackToast('Learning Plan approved for Aarav K. Activity 1 is now active.')
    setTimeout(() => setFeedbackToast(null), 4000)
  }

  // Journey Step 7: Start Activity
  function handleStartActivity(student: Student, activityId: string) {
    setSelectedStudent(student)
    setActiveActivityId(activityId)
    setModalMode('activity')
  }

  // Journey Step 7 -> Step 8: Complete Activity
  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!selectedStudent) return

    const actIndex = selectedStudent.activities.findIndex((a) => a.id === activityId)
    const updatedActivities = selectedStudent.activities.map((act, idx) => {
      if (act.id === activityId) {
        return {
          ...act,
          status: 'completed' as const,
          completedAt: 'Just now',
          teacherNote,
        }
      }
      if (idx === actIndex + 1) {
        return {
          ...act,
          status: 'in_progress' as const,
        }
      }
      return act
    })

    const updated: Student = {
      ...selectedStudent,
      status: 'Practising',
      progressPercent: 50,
      activities: updatedActivities,
    }

    updateStudent(updated)
    setState((prev) => ({
      ...prev,
      currentStage: 8,
      milestonesThisWeek: prev.milestonesThisWeek + 1,
    }))
    setModalMode('profile')
    setFeedbackToast('Milestone recorded! Progress updated to 50% for Aarav K.')
    setTimeout(() => setFeedbackToast(null), 5000)
  }

  function toggleAction(actionId: string) {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.map((a) => (a.id === actionId ? { ...a, completed: !a.completed } : a)),
    }))
  }

  // Chart data based on timeFilter
  const chartTrends: Record<DemoState['timeFilter'], number[]> = {
    '6w': [35, 42, 48, 55, 62, state.currentStage === 8 ? 72 : 70],
    '4w': [48, 55, 62, state.currentStage === 8 ? 72 : 70],
    term1: [20, 28, 35, 42, 48, 55],
  }
  const activeChart = chartTrends[state.timeFilter]

  return (
    <div className="space-y-6">
      {/* Top Banner Guide for Demo Journey */}
      <DemoJourneyBanner
        currentStage={state.currentStage}
        onReset={handleReset}
        onQuickJump={(stage) => {
          if (stage === 1) {
            window.location.href = '/login'
          } else if (stage === 3) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) handleSelectStudent(aarav)
          } else if (stage === 4) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) handleStartAssessment(aarav)
          } else if (stage === 5) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) {
              setSelectedStudent(aarav)
              setModalMode('diagnostic')
            }
          } else if (stage === 6) {
            const aarav = state.students.find((s) => s.id === 'aarav-k')
            if (aarav) {
              setSelectedStudent(aarav)
              setModalMode('plan')
            }
          }
        }}
      />

      {/* Floating feedback toast */}
      {feedbackToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Journey Completion Celebration Banner (Stage 8) */}
      {state.currentStage === 8 && (
        <div className="rounded-xl border border-[#BFE2DA] bg-[#DFF4EF] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#0D9488] text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#17324D] sm:text-base">
                  Foundational Assessment & Remedial Cycle Complete
                </h2>
                <p className="mt-0.5 text-xs text-[#087F75]">
                  You successfully assessed Aarav Kumar, identified the prerequisite bundling gap, approved the 5-day pathway, and recorded Activity 1 completion.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  const aarav = state.students.find((s) => s.id === 'aarav-k')
                  if (aarav) handleSelectStudent(aarav)
                }}
                className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                View Aarav’s Profile
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-8 rounded-lg border-[#087F75]/30 bg-white/80 px-2.5 text-xs font-medium text-[#087F75]"
              >
                <RotateCcw size={12} className="mr-1" /> Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Greeting Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5D9] px-2.5 py-0.5 text-[11px] font-semibold text-[#8A6200]">
            <span className="size-1.5 rounded-full bg-[#F4B544]" />
            Asha Primary School · Devbhumi Dwarka
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {t.dashboard.welcomeGreeting}
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/app/classes"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <GraduationCap size={14} className="text-[#0D9488]" />
            <span>{t.nav.classes}</span>
          </Link>
          <Link
            href="/app/students"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <Users size={14} className="text-[#0D9488]" />
            <span>{t.nav.students}</span>
          </Link>
          <Link
            href="/app/assessments"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <ClipboardCheck size={14} className="text-[#0D9488]" />
            <span>{t.nav.assessments}</span>
          </Link>
          <Link
            href="/app/reports"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <BarChart3 size={14} className="text-[#0D9488]" />
            <span>{t.nav.reports}</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">{t.dashboard.metrics.studentsAssessed}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#DFF4EF] text-[#0D9488]">
              <Users size={15} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#17324D]">
              {state.studentsAssessedCount}
            </span>
            <span className="text-xs text-[#64748B]">
              / {state.totalStudentsCount} ({Math.round((state.studentsAssessedCount / state.totalStudentsCount) * 100)}%)
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Class 3A Enrolled Cohort</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">{t.dashboard.metrics.activeSupportPlans}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#DFF4EF] text-[#0D9488]">
              <BookOpen size={15} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#17324D]">
              {state.activePlansCount}
            </span>
            <span className="text-xs text-[#15803D]">Active</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Targeted 5-day micro-pathways</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">{t.dashboard.metrics.milestonesThisWeek}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#DFF4EF] text-[#0D9488]">
              <CheckCircle2 size={15} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#17324D]">
              {state.milestonesThisWeek}
            </span>
            <span className="text-xs text-[#15803D]">+2 this week</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">Hands-on activities signed off</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">{t.dashboard.metrics.awaitingSync}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#DFF4EF] text-[#0D9488]">
              <Wifi size={15} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#17324D]">
              {state.awaitingSyncCount < 10 ? `0${state.awaitingSyncCount}` : state.awaitingSyncCount}
            </span>
            <span className="text-xs text-[#64748B]">Records</span>
          </div>
          <p className="mt-1 text-[11px] text-[#64748B]">
            {state.awaitingSyncCount === 0 ? 'All local records synchronized' : 'Stored locally in device queue'}
          </p>
        </div>
      </div>

      {/* Progress Chart & Skill-Gap Distribution Grid */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Class Milestone Trend Chart */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">Class FLN Milestone Completion</h2>
              <p className="text-xs text-[#64748B]">Weekly percentage of prescribed foundational activities completed</p>
            </div>
            <select
              value={state.timeFilter}
              onChange={(e) => setState((prev) => ({ ...prev, timeFilter: e.target.value as DemoState['timeFilter'] }))}
              aria-label="Filter timeframe"
              className="rounded-lg border border-[#CBD5E1] bg-white px-2 py-1 text-xs font-medium text-[#263238] outline-none focus:border-[#0D9488]"
            >
              <option value="6w">Last 6 weeks</option>
              <option value="4w">Last 4 weeks</option>
              <option value="term1">Term 1 Baseline</option>
            </select>
          </div>

          <div className="mt-6 flex h-44 items-end gap-3 border-b border-l border-[#E2E8F0] px-3 pb-0 pt-2 sm:gap-6">
            {activeChart.map((height, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className="w-full max-w-10 rounded-t-md bg-[#8ACFC4] transition-all duration-300 group-hover:bg-[#0D9488]"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] font-medium text-[#64748B]">W{i + 1}</span>
                <div className="pointer-events-none absolute -top-6 rounded bg-[#17324D] px-1.5 py-0.5 text-[9px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {height}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#0D9488]" />
              Cohort avg: {Math.round(activeChart.reduce((a, b) => a + b, 0) / activeChart.length)}%
            </span>
            <span className="text-[11px] text-[#94A3B8]">Class 3A (28 Students)</span>
          </div>
        </div>

        {/* Skill-Gap Distribution */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">Prerequisite Gap Distribution</h2>
              <p className="text-xs text-[#64748B]">Identified by diagnostic screening</p>
            </div>
            <span className="rounded-md bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#087F75]">
              100% Total
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              ['Reading & Word Decoding', 28, 'bg-[#0D9488]'],
              ['Reading Comprehension', 19, 'bg-[#4AA79C]'],
              ['Number Sense & Place Value', 24, 'bg-[#B7791F]'],
              ['Arithmetic with Regrouping', 15, 'bg-[#7B9DB7]'],
              ['Phonics & Consonant Blends', 14, 'bg-[#9333EA]'],
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-[#263238] truncate">{label}</span>
                  <span className="font-bold text-[#17324D]">{value}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#F1F5F3]">
                  <div
                    className={`h-1.5 rounded-full ${color as string}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learners Needing Follow-up & Today's Teacher Actions Grid */}
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Learners Needing Follow-up */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">Learners Needing Immediate Support</h2>
              <p className="text-xs text-[#64748B]">Pedagogical follow-ups based on recent observations</p>
            </div>
            <Link
              href="/app/students"
              className="text-xs font-semibold text-[#0D9488] hover:underline"
            >
              All {state.students.length} students <ChevronRight className="inline" size={13} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-[#F1F5F3]">
            {state.students.slice(0, 3).map((st) => (
              <div
                key={st.id}
                className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#DFF4EF] text-xs font-bold text-[#087F75]">
                    {st.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#17324D]">{st.fullName}</span>
                      <span className="rounded bg-[#F1F5F3] px-1.5 py-0.2 text-[10px] text-[#64748B]">
                        Roll #{st.rollNo}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      Prerequisite: <strong className="font-medium text-[#263238]">{st.focusSkill}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      st.status === 'Needs support'
                        ? 'bg-[#FFF5D9] text-[#8A6200]'
                        : st.status === 'Practising'
                        ? 'bg-[#DFF4EF] text-[#087F75]'
                        : 'bg-[#F1F5F3] text-[#64748B]'
                    }`}
                  >
                    {st.status}
                  </span>

                  <Button
                    onClick={() => handleSelectStudent(st)}
                    variant="outline"
                    className="h-7 rounded-lg border-[#CBD5E1] px-2.5 text-xs font-semibold text-[#0D9488] hover:bg-[#F1F5F3]"
                  >
                    View profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Teacher Actions Checklist */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">{t.dashboard.todaysActions}</h2>
              <p className="text-xs text-[#64748B]">
                {state.actions.filter((a) => a.completed).length} of {state.actions.length} completed
              </p>
            </div>
            <Link
              href="/app/actions"
              className="text-xs font-semibold text-[#0D9488] hover:underline"
            >
              Workspace <ChevronRight className="inline" size={13} />
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            {state.actions.map((act) => (
              <label
                key={act.id}
                onClick={() => toggleAction(act.id)}
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 text-xs transition ${
                  act.completed
                    ? 'border-[#E2E8F0] bg-[#F7F9F6] text-[#94A3B8]'
                    : 'border-[#CBD5E1] bg-white text-[#263238] hover:border-[#0D9488]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={act.completed}
                  onChange={() => {}}
                  className="mt-0.5 size-3.5 rounded accent-[#0D9488]"
                />
                <div className="min-w-0 flex-1">
                  <span className={act.completed ? 'line-through text-[#94A3B8]' : 'font-medium'}>
                    {act.text}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#64748B]">{act.dueText}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Global Interactive Journey Modals */}
      {modalMode === 'profile' && selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onStartAssessment={handleStartAssessment}
          onViewDiagnostic={(st) => {
            setSelectedStudent(st)
            setModalMode('diagnostic')
          }}
          onReviewPlan={(st) => {
            setSelectedStudent(st)
            setModalMode('plan')
          }}
          onStartActivity={handleStartActivity}
        />
      )}

      {modalMode === 'assessment' && selectedStudent && (
        <AssessmentModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onSubmitAssessment={handleCompleteAssessment}
        />
      )}

      {modalMode === 'diagnostic' && selectedStudent && (
        <DiagnosticModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onProceedToPlan={handleProceedToPlan}
          onStartDirectActivity={(st, actId) => handleStartActivity(st, actId)}
        />
      )}

      {modalMode === 'plan' && selectedStudent && (
        <LearningPlanModal
          student={selectedStudent}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprovePlan}
        />
      )}

      {modalMode === 'activity' && selectedStudent && activeActivityId && (
        <ActivityModal
          student={selectedStudent}
          activity={selectedStudent.activities.find((a) => a.id === activeActivityId)!}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
