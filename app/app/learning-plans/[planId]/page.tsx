'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  AlertCircle,
  FileCheck,
  ChevronRight,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { auditService } from '@/lib/services/auditService'
import { ActivityModal } from '@/components/activity-modal'
import { LearningActivityItem } from '@/lib/types'

interface PageProps {
  params: Promise<{ planId: string }>
}

export default function SingleLearningPlanPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const planId = resolvedParams.planId
  const { t, locale } = useI18n()
  const router = useRouter()

  const [plan, setPlan] = useState(() => learningPlanService.getPlanById(planId))
  const [selectedActivity, setSelectedActivity] = useState<LearningActivityItem | null>(null)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [isApproving, setIsApproving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-white py-16 text-center shadow-xs">
        <AlertCircle size={36} className="text-[#B42318]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Learning Plan Not Found</h2>
        <p className="mt-1 text-xs text-[#64748B]">Plan ID: {planId} does not exist in local repository.</p>
        <Link
          href="/app/pathways"
          className="mt-4 rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white shadow-xs"
        >
          Return to Learning Pathways
        </Link>
      </div>
    )
  }

  function handleApprove() {
    setIsApproving(true)
    const updated = learningPlanService.approvePlan(plan!.id, approvalNotes)
    if (updated) {
      setPlan({ ...updated })
      auditService.logEvent({
        actorId: 'usr-tea-01',
        actorName: 'Asha Shah',
        role: 'teacher',
        eventType: 'plan_approved',
        entityType: 'plan',
        entityId: plan!.id,
        summary: `Teacher approved remedial pathway "${plan!.title}" for ${plan!.studentName}`,
      })
      setToastMessage('Plan approved successfully!')
      setTimeout(() => setToastMessage(null), 3000)
    }
    setIsApproving(false)
  }

  function handleCompleteActivity(activityId: string, observation: string) {
    const updated = learningPlanService.completeActivity(plan!.id, activityId, observation)
    if (updated) {
      setPlan({ ...updated })
      setSelectedActivity(null)
      auditService.logEvent({
        actorId: 'usr-tea-01',
        actorName: 'Asha Shah',
        role: 'teacher',
        eventType: 'activity_completed',
        entityType: 'activity',
        entityId: activityId,
        summary: `Marked day activity completed for ${plan!.studentName}: ${observation}`,
      })
      setToastMessage('Activity marked completed!')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  const completedCount = plan.activities.filter((a) => a.status === 'completed').length
  const progressPercent = Math.round((completedCount / (plan.activities.length || 1)) * 100)

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/app/pathways"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:underline"
        >
          <ArrowLeft size={13} />
          Back to All Pathways
        </Link>
      </div>

      {toastMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-[#DFF4EF] p-3 text-xs font-semibold text-[#0D9488]">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Plan Header Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  plan.status === 'Approved'
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : plan.status === 'In progress'
                    ? 'bg-[#DFF4EF] text-[#0D9488]'
                    : 'bg-[#FEF9C3] text-[#A16207]'
                }`}
              >
                {plan.status}
              </span>
              <span className="text-xs text-[#64748B]">5-Day Remedial Sequence</span>
            </div>
            <h1 className="text-xl font-bold text-[#17324D]">{plan.title}</h1>
            <p className="text-sm font-medium text-[#0D9488]">{plan.titleGu}</p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#64748B]">
              <User size={13} className="text-[#0D9488]" />
              <span className="font-semibold text-[#17324D]">{plan.studentName}</span>
              <span>•</span>
              <span>Class ID: {plan.classId}</span>
            </div>
          </div>

          {plan.status === 'Pending approval' && (
            <div className="flex flex-col gap-2 rounded-lg bg-[#F8FAFC] p-3 border border-[#E2E8F0] sm:w-72">
              <span className="text-[11px] font-bold text-[#17324D]">Teacher Approval Required</span>
              <input
                type="text"
                placeholder="Optional teacher observation notes..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="w-full rounded-md border border-[#E2E8F0] p-1.5 text-xs"
              />
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#0D9488] py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
              >
                <CheckCircle2 size={13} />
                <span>Approve Learning Plan</span>
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 border-t border-[#E2E8F0] pt-4">
          <div className="flex justify-between text-xs font-semibold text-[#17324D]">
            <span>Remedial Completion Progress</span>
            <span className="text-[#0D9488]">
              {completedCount} of {plan.activities.length} Activities Completed ({progressPercent}%)
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full bg-[#0D9488] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 5-Day Weekly Schedule & Activities */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[#17324D]">5-Day Remedial Activity Schedule</h2>
        <p className="text-xs text-[#64748B]">
          Daily 10–15 minute concrete interventions focused on resolving prerequisite gaps.
        </p>

        <div className="mt-4 space-y-3">
          {plan.activities.map((activity, index) => {
            const isCompleted = activity.status === 'completed'

            return (
              <div
                key={activity.id}
                className={`flex flex-col justify-between gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center ${
                  isCompleted
                    ? 'border-[#8ACFC4] bg-[#DFF4EF]/20'
                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isCompleted ? 'bg-[#0D9488] text-white' : 'bg-[#F1F5F9] text-[#475569]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={16} /> : `D${index + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-[#17324D]">{activity.title}</h3>
                      <span className="rounded-md bg-[#F1F5F9] px-1.5 py-0.5 text-[10px] font-medium text-[#64748B]">
                        {activity.duration}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#0D9488]">{activity.titleGu}</div>
                    <p className="mt-1 text-xs text-[#64748B]">{activity.description}</p>
                    {activity.teacherObservation && (
                      <div className="mt-1 text-[11px] italic text-[#15803D]">
                        Teacher note: "{activity.teacherObservation}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#E2E8F0] pt-2 sm:border-t-0 sm:pt-0">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#17324D] hover:bg-[#F8FAFC]"
                  >
                    <span>View Activity Details</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && plan && (
        <ActivityModal
          student={{
            id: plan.studentId,
            name: plan.studentName,
            fullName: plan.studentName,
            grade: `Class 3A`,
            rollNo: '14',
            avatar: plan.studentName.slice(0, 2).toUpperCase(),
            focusSkill: plan.targetSkill,
            status: 'Practising',
            diagnosticStatus: 'Completed',
            planStatus: 'Approved',
            prerequisiteGap: plan.prerequisiteGap,
            progressPercent: progressPercent,
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
          onClose={() => setSelectedActivity(null)}
          onCompleteActivity={(activityId: string, observation: string) =>
            handleCompleteActivity(activityId, observation)
          }
        />
      )}
    </div>
  )
}
