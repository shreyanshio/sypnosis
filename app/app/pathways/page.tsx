'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { studentService } from '@/lib/services/studentService'
import { LearningActivityItem, LearningPlanRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { Student } from '@/lib/demo-data'

export default function PathwaysPage() {
  const { t, locale } = useI18n()
  const [plans, setPlans] = useState<LearningPlanRecord[]>(() => learningPlanService.getPlans())
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [activePlan, setActivePlan] = useState<LearningPlanRecord | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<LearningActivityItem | null>(null)
  const [modalMode, setModalMode] = useState<'none' | 'plan' | 'activity'>('none')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filtered = plans.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchTitle = p.title.toLowerCase().includes(q) || (p.titleGu && p.titleGu.toLowerCase().includes(q))
      const matchName = p.studentName.toLowerCase().includes(q)
      const matchSkill = p.targetSkill.toLowerCase().includes(q)
      if (!matchTitle && !matchName && !matchSkill) return false
    }
    return true
  })

  function handleReviewPlan(plan: LearningPlanRecord) {
    setActivePlan(plan)
    setModalMode('plan')
  }

  function handleApprove(student: Student, notes: string) {
    if (!activePlan) return
    learningPlanService.approvePlan(activePlan.id, notes)
    setPlans(learningPlanService.getPlans())

    // Also update student record
    const s = studentService.getStudentById(activePlan.studentId)
    if (s) {
      studentService.updateStudent({
        ...s,
        planStatus: 'Approved',
        progressPercent: 25,
      })
    }

    setModalMode('none')
    showToast(`Remedial pathway approved for ${activePlan.studentName}.`)
  }

  function handleStartActivity(plan: LearningPlanRecord, act: LearningActivityItem) {
    setActivePlan(plan)
    setSelectedActivity(act)
    setModalMode('activity')
  }

  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!activePlan) return
    learningPlanService.completeActivity(activePlan.id, activityId, teacherNote)
    setPlans(learningPlanService.getPlans())

    // Also update student record progress
    const s = studentService.getStudentById(activePlan.studentId)
    if (s) {
      studentService.updateStudent({
        ...s,
        progressPercent: Math.min(100, s.progressPercent + 25),
        completedActivitiesCount: s.completedActivitiesCount + 1,
      })
    }

    setModalMode('none')
    showToast('Activity completed and milestone recorded.')
  }

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <BookOpen size={15} />
            <span>{t.nav.learningPathways}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Adaptive Remedial Pathways
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Targeted 5-day classroom micro-activities approved by teachers for foundational mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/assessments"
            className="flex h-8.5 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <span>Assessments</span>
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#64748B]">Active Pathways</span>
          <p className="mt-0.5 text-xl font-bold text-[#17324D]">{plans.length}</p>
          <p className="text-[10px] text-[#64748B]">Individualized 5-day plans</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#B7791F]">Pending Approval</span>
          <p className="mt-0.5 text-xl font-bold text-[#B7791F]">
            {plans.filter((p) => p.status === 'Pending approval').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Requires teacher review</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#0D9488]">In Progress</span>
          <p className="mt-0.5 text-xl font-bold text-[#0D9488]">
            {plans.filter((p) => p.status === 'Approved' || p.status === 'In progress').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Active classroom practice</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#15803D]">Completed</span>
          <p className="mt-0.5 text-xl font-bold text-[#15803D]">
            {plans.filter((p) => p.status === 'Completed').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Milestones verified</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pathways by student, title, or target skill..."
            className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by pathway status"
            className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending approval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="In progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Active Learning Pathways Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
          <BookOpen size={32} className="mx-auto text-[#CBD5E1]" />
          <p className="mt-3 text-sm font-semibold text-[#17324D]">{t.common.noRecordsFound}</p>
          <p className="mt-1 text-xs text-[#64748B]">No learning pathways match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((plan) => {
            const completedCount = plan.activities.filter((a) => a.status === 'completed').length
            const totalCount = plan.activities.length
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
            const isGujarati = locale === 'gu' && plan.titleGu

            return (
              <div
                key={plan.id}
                className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition hover:border-[#0D9488]/40"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-bold text-[#17324D]">
                        {isGujarati ? plan.titleGu : plan.title}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          plan.status === 'Approved'
                            ? 'bg-[#DFF4EF] text-[#087F75]'
                            : plan.status === 'Pending approval'
                            ? 'bg-[#FFF5D9] text-[#8A6200]'
                            : plan.status === 'Completed'
                            ? 'bg-[#E0F2FE] text-[#0284C7]'
                            : 'bg-[#F1F5F3] text-[#64748B]'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#64748B]">
                      Learner:{' '}
                      <Link
                        href={`/app/students/${plan.studentId}`}
                        className="font-bold text-[#17324D] hover:text-[#0D9488] hover:underline"
                      >
                        {plan.studentName}
                      </Link>{' '}
                      · Target Skill: <strong className="text-[#263238]">{plan.targetSkill}</strong>
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748B]">
                      Prerequisite addressed: <span className="text-[#526273]">{plan.prerequisiteGap}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {plan.status === 'Pending approval' ? (
                      <Button
                        onClick={() => handleReviewPlan(plan)}
                        className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
                      >
                        Review & Approve
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleReviewPlan(plan)}
                        className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                      >
                        Adjust Pathway
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span>Pathway Completion</span>
                    <span className="font-bold text-[#0D9488]">{percent}% ({completedCount}/{totalCount} activities)</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-1.5 rounded-full bg-[#0D9488] transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* 5-Day Weekly Schedule Grid */}
                <div className="mt-4 grid gap-2 sm:grid-cols-5">
                  {plan.weeklySchedule.map((day, idx) => (
                    <div
                      key={day.day}
                      className={`rounded-lg border p-2 text-xs ${
                        day.status === 'completed'
                          ? 'border-[#BFE2DA] bg-[#DFF4EF]/40'
                          : day.status === 'scheduled'
                          ? 'border-[#E2E8F0] bg-[#F7F9F6]'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#17324D]">{day.day}</span>
                        {day.status === 'completed' && (
                          <CheckCircle2 size={12} className="text-[#15803D]" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-[#64748B] line-clamp-2" title={day.activityTitle}>
                        {day.activityTitle}
                      </p>
                      <span className="mt-1 block text-[10px] text-[#94A3B8]">
                        {day.durationMinutes} mins
                      </span>
                    </div>
                  ))}
                </div>

                {/* Activities Row with Action Buttons */}
                <div className="mt-4 divide-y divide-[#F1F5F3] pt-2 border-t border-[#F1F5F3]">
                  {plan.activities.map((act, i) => (
                    <div
                      key={act.id}
                      className="flex flex-col justify-between gap-2 py-2.5 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-[10px] font-bold text-[#17324D]">
                          {i + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-[#17324D]">{act.title}</p>
                            <span className="rounded bg-[#F1F5F3] px-1.5 py-0.2 text-[9px] text-[#64748B]">
                              {act.format}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B]">{act.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:justify-end">
                        <span className="text-[11px] text-[#64748B]">{act.duration}</span>

                        {act.status === 'completed' ? (
                          <span className="flex items-center gap-1 rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#087F75]">
                            <CheckCircle2 size={11} /> Done
                          </span>
                        ) : act.status === 'ready' || act.status === 'in_progress' ? (
                          <Button
                            onClick={() => handleStartActivity(plan, act)}
                            className="h-6.5 rounded-md bg-[#0D9488] px-2 text-[10px] font-semibold text-white hover:bg-[#087F75]"
                          >
                            <Play size={10} className="mr-1" /> Launch Activity
                          </Button>
                        ) : (
                          <span className="text-[10px] text-[#94A3B8]">Locked (prerequisite)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Learning Plan Approval Modal */}
      {modalMode === 'plan' && activePlan && (
        <LearningPlanModal
          student={{
            id: activePlan.studentId,
            name: activePlan.studentName,
            fullName: activePlan.studentName,
            grade: 'Class 3A',
            rollNo: '14',
            avatar: 'AK',
            focusSkill: activePlan.targetSkill,
            status: 'Needs support',
            diagnosticStatus: 'Completed',
            diagnosticScore: 67,
            prerequisiteGap: activePlan.prerequisiteGap,
            planStatus: activePlan.status as Student['planStatus'],
            planTitle: activePlan.title,
            progressPercent: 25,
            activities: activePlan.activities.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.description,
              duration: a.duration,
              status: a.status === 'ready' ? 'in_progress' : a.status === 'completed' ? 'completed' : 'locked',
              focusPrerequisite: a.prerequisiteSkillName,
            })),
          }}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprove}
        />
      )}

      {/* Practice Activity Execution Modal */}
      {modalMode === 'activity' && activePlan && selectedActivity && (
        <ActivityModal
          student={{
            id: activePlan.studentId,
            name: activePlan.studentName,
            fullName: activePlan.studentName,
            grade: 'Class 3A',
            rollNo: '14',
            avatar: 'AK',
            focusSkill: activePlan.targetSkill,
            status: 'Practising',
            diagnosticStatus: 'Completed',
            planStatus: 'Approved',
            prerequisiteGap: activePlan.prerequisiteGap,
            progressPercent: 25,
            activities: [],
          }}
          activity={{
            id: selectedActivity.id,
            title: selectedActivity.title,
            description: selectedActivity.description,
            duration: selectedActivity.duration,
            status: 'in_progress',
            focusPrerequisite: selectedActivity.prerequisiteSkillName,
          }}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
