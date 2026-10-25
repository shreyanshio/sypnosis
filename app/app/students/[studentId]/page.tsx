'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MessageSquare,
  Phone,
  Play,
  RotateCcw,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { studentService } from '@/lib/services/studentService'
import { StudentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { AssessmentModal } from '@/components/assessment-modal'
import { DiagnosticModal } from '@/components/diagnostic-modal'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { evaluateFLNDiagnostic } from '@/lib/fln-scoring-engine'
import { Student } from '@/lib/demo-data'

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>
}) {
  const { studentId } = use(params)
  const router = useRouter()
  const { t } = useI18n()

  const [student, setStudent] = useState<StudentRecord | undefined>(() =>
    studentService.getStudentById(studentId)
  )
  const [modalMode, setModalMode] = useState<'none' | 'assessment' | 'diagnostic' | 'plan' | 'activity'>('none')
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState('')
  const [notesList, setNotesList] = useState<string[]>([
    'Aarav engaged well during the morning counting circle. Showed rapid recognition of numbers 1-10.',
    'Struggled slightly when transitioning from 19 to 20; recommended tactile bundling beads for next session.',
  ])
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setFeedbackToast(msg)
    setTimeout(() => setFeedbackToast(null), 4000)
  }

  if (!student) {
    return (
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
        <User size={32} className="mx-auto text-[#CBD5E1]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Student record not found</h2>
        <p className="mt-1 text-xs text-[#64748B]">No student with ID &ldquo;{studentId}&rdquo; exists in this school cohort.</p>
        <Link
          href="/app/students"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75]"
        >
          <ArrowLeft size={13} /> Back to Student Roster
        </Link>
      </div>
    )
  }

  // Convert to legacy Student format for modals
  const legacyStudent: Student = {
    id: student.id,
    name: student.name,
    fullName: student.fullName,
    grade: `Class ${student.standard}${student.section}`,
    rollNo: student.rollNo,
    avatar: student.avatar,
    focusSkill: student.prerequisiteGap,
    status: (student.overallStatus === 'Needs Support'
      ? 'Needs support'
      : student.overallStatus === 'Developing'
      ? 'Practising'
      : 'Ready to progress') as Student['status'],
    diagnosticStatus: (student.diagnosticScore ? 'Completed' : 'Pending assessment') as Student['diagnosticStatus'],
    diagnosticScore: student.diagnosticScore,
    prerequisiteGap: student.prerequisiteGap,
    pedagogicalInsight: student.pedagogicalInsight,
    planStatus: (student.planStatus === 'Approved' ? 'Approved' : 'Pending approval') as Student['planStatus'],
    planTitle: student.planTitle,
    progressPercent: student.progressPercent,
    activities: [
      {
        id: 'act-1',
        title: 'Tactile Bundling: 10 Units to 1 Ten',
        description: 'Physical straw bundling into decade groups with rubber bands to internalize place value.',
        duration: '12 mins',
        status: student.completedActivitiesCount > 0 ? 'completed' : 'in_progress',
        focusPrerequisite: 'Positional place value',
      },
      {
        id: 'act-2',
        title: 'Two-Digit Decade Grid Jumping',
        description: 'Chalk-drawn 1-100 floor mat game where learner jumps forward by tens and ones.',
        duration: '10 mins',
        status: student.completedActivitiesCount > 1 ? 'completed' : student.completedActivitiesCount === 1 ? 'in_progress' : 'locked',
        focusPrerequisite: 'Counting sequence across decades',
      },
      {
        id: 'act-3',
        title: 'Peer Place-Value Card Exchange',
        description: 'Card pairing game where student holds tens card and calls out matching unit partner.',
        duration: '15 mins',
        status: student.completedActivitiesCount > 2 ? 'completed' : 'locked',
        focusPrerequisite: 'Peer verbalization of 2-digit numbers',
      },
    ],
  }

  function handleCompleteAssessment(answers: Record<string, string>, notes: string) {
    if (!student) return
    const evaluation = evaluateFLNDiagnostic(answers, notes)

    const updated: StudentRecord = {
      ...student,
      diagnosticScore: evaluation.overallScore,
      prerequisiteGap: evaluation.pedagogicalSummary,
      pedagogicalInsight: notes || evaluation.pedagogicalSummary,
      planStatus: 'Pending approval',
      overallStatus: evaluation.overallScore < 70 ? 'Needs Support' : evaluation.overallScore < 85 ? 'Developing' : 'Demonstrated',
      lastAssessedDate: 'Just now',
    }

    studentService.updateStudent(updated)
    setStudent(updated)
    setModalMode('diagnostic')
    showToast(`Diagnostic submitted: ${evaluation.overallScore}% score.`)
  }

  function handleApprovePlan(st: Student, notes: string) {
    if (!student) return
    const updated: StudentRecord = {
      ...student,
      planStatus: 'Approved',
      pedagogicalInsight: notes ? `${student.pedagogicalInsight} (Teacher note: ${notes})` : student.pedagogicalInsight,
    }
    studentService.updateStudent(updated)
    setStudent(updated)
    setModalMode('none')
    showToast('Remedial learning pathway approved.')
  }

  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!student) return
    const nextCount = student.completedActivitiesCount + 1
    const nextProgress = Math.min(100, Math.round((nextCount / student.assignedActivitiesCount) * 100))
    const updated: StudentRecord = {
      ...student,
      completedActivitiesCount: nextCount,
      progressPercent: nextProgress,
      overallStatus: nextProgress >= 80 ? 'Demonstrated' : 'Developing',
    }
    studentService.updateStudent(updated)
    setStudent(updated)
    setModalMode('none')
    if (teacherNote) {
      setNotesList((prev) => [teacherNote, ...prev])
    }
    showToast('Activity completed and milestone progress recorded.')
  }

  function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!newNote.trim()) return
    setNotesList((prev) => [newNote.trim(), ...prev])
    setNewNote('')
    showToast('Teacher observation note added.')
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/app/students" className="hover:text-[#0D9488] hover:underline">
          Student Roster
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <Link href={`/app/classes/${student.classId}`} className="hover:text-[#0D9488] hover:underline">
          Class {student.standard}{student.section}
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#17324D]">{student.fullName}</span>
      </div>

      {/* Main Student Profile Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#DFF4EF] text-lg font-bold text-[#087F75]">
              {student.avatar}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-[#17324D]">{student.fullName}</h1>
                <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-xs font-semibold text-[#64748B]">
                  Roll #{student.rollNo}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    student.overallStatus === 'Needs Support'
                      ? 'bg-[#FFF5D9] text-[#8A6200]'
                      : student.overallStatus === 'Developing'
                      ? 'bg-[#DFF4EF] text-[#087F75]'
                      : 'bg-[#F1F5F3] text-[#64748B]'
                  }`}
                >
                  {student.overallStatus}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#64748B]">
                Class {student.standard}, Section {student.section} · Student ID: {student.studentId} · Devbhumi Dwarka
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#263238]">
                <span className="flex items-center gap-1.5 text-[#64748B]">
                  <User size={13} /> Guardian: <strong className="text-[#17324D]">{student.guardianName}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-[#64748B]">
                  <Phone size={13} /> Phone: <strong className="text-[#17324D]">{student.guardianPhone}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setModalMode('assessment')}
              className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
            >
              <ClipboardCheck size={14} className="mr-1.5" /> Run Diagnostic Check
            </Button>
            <Link
              href="/app/parent"
              className="flex h-8.5 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
            >
              <HeartHandshake size={14} className="text-[#0D9488]" /> Guardian Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Diagnostic Assessment on Left, Remedial Pathway on Right */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Diagnostic Assessment Record */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">FLN Diagnostic Assessment</h2>
              <p className="text-xs text-[#64748B]">Prerequisite screening and skill evaluation</p>
            </div>
            <span className="rounded-md bg-[#DFF4EF] px-2 py-0.5 text-xs font-bold text-[#087F75]">
              Score: {student.diagnosticScore || 0}%
            </span>
          </div>

          <div className="mt-4 space-y-3.5">
            <div className="rounded-lg bg-[#F7F9F6] p-3 text-xs">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                Identified Prerequisite Learning Gap
              </span>
              <p className="mt-1 font-medium text-[#17324D]">{student.prerequisiteGap}</p>
            </div>

            <div className="rounded-lg bg-[#F7F9F6] p-3 text-xs">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                Teacher Pedagogical Insight
              </span>
              <p className="mt-1 text-[#263238] leading-relaxed">{student.pedagogicalInsight}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-lg border border-[#E2E8F0] p-2.5 text-center">
                <span className="text-[11px] text-[#64748B]">Literacy Status</span>
                <p className="mt-0.5 font-bold text-[#17324D]">{student.literacyStatus}</p>
              </div>
              <div className="rounded-lg border border-[#E2E8F0] p-2.5 text-center">
                <span className="text-[11px] text-[#64748B]">Numeracy Status</span>
                <p className="mt-0.5 font-bold text-[#17324D]">{student.numeracyStatus}</p>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => setModalMode('diagnostic')}
                className="w-full h-8.5 rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
              >
                Inspect Diagnostic Questions & Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Active Remedial Pathway & 5-Day Plan */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17324D]">Remedial Learning Pathway</h2>
              <p className="text-xs text-[#64748B]">Structured 5-day classroom micro-activities</p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                student.planStatus === 'Approved' ? 'bg-[#DFF4EF] text-[#087F75]' : 'bg-[#FFF5D9] text-[#8A6200]'
              }`}
            >
              {student.planStatus}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-[#17324D] text-sm">{student.planTitle}</h3>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Pathway Progress:</span>
              <span className="font-bold text-[#0D9488]">{student.progressPercent}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-[#E2E8F0]">
              <div
                className="h-2 rounded-full bg-[#0D9488] transition-all"
                style={{ width: `${student.progressPercent}%` }}
              />
            </div>

            <div className="mt-4 space-y-2.5">
              {legacyStudent.activities.map((act, idx) => (
                <div
                  key={act.id}
                  className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-xs transition ${
                    act.status === 'completed'
                      ? 'border-[#E2E8F0] bg-[#F7F9F6]'
                      : act.status === 'in_progress'
                      ? 'border-[#0D9488]/40 bg-[#DFF4EF]/20'
                      : 'border-[#E2E8F0] bg-white opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#CBD5E1] text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#17324D] truncate">{act.title}</p>
                      <p className="text-[10px] text-[#64748B]">{act.duration} · {act.focusPrerequisite}</p>
                    </div>
                  </div>

                  <div>
                    {act.status === 'completed' ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
                        <CheckCircle2 size={13} /> Done
                      </span>
                    ) : act.status === 'in_progress' ? (
                      <Button
                        onClick={() => {
                          setActiveActivityId(act.id)
                          setModalMode('activity')
                        }}
                        className="h-7 rounded-md bg-[#0D9488] px-2 text-[11px] font-semibold text-white hover:bg-[#087F75]"
                      >
                        <Play size={10} className="mr-1" /> Start
                      </Button>
                    ) : (
                      <span className="text-[11px] text-[#94A3B8]">Scheduled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-2">
              <Button
                variant="outline"
                onClick={() => setModalMode('plan')}
                className="w-full h-8.5 rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
              >
                Review & Modify Learning Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Formative Observations & Notes Log */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17324D]">Formative Observation Diary</h2>
            <p className="text-xs text-[#64748B]">Anecdotal classroom observations and milestone notes</p>
          </div>
          <MessageSquare size={16} className="text-[#0D9488]" />
        </div>

        <form onSubmit={handleAddNote} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add classroom observation note for this student..."
            className="h-8.5 flex-1 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
          />
          <Button
            type="submit"
            className="h-8.5 rounded-lg bg-[#0D9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            Save Note
          </Button>
        </form>

        <div className="mt-4 divide-y divide-[#F1F5F3]">
          {notesList.map((note, i) => (
            <div key={i} className="py-2.5 text-xs">
              <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                <span className="font-semibold text-[#17324D]">Teacher Asha Shah</span>
                <span>{i === 0 ? 'Today' : 'Yesterday'}</span>
              </div>
              <p className="mt-1 text-[#263238] leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modals */}
      {modalMode === 'assessment' && (
        <AssessmentModal
          student={legacyStudent}
          onClose={() => setModalMode('none')}
          onSubmitAssessment={handleCompleteAssessment}
        />
      )}

      {modalMode === 'diagnostic' && (
        <DiagnosticModal
          student={legacyStudent}
          onClose={() => setModalMode('none')}
          onProceedToPlan={() => setModalMode('plan')}
          onStartDirectActivity={(st, actId) => {
            setActiveActivityId(actId)
            setModalMode('activity')
          }}
        />
      )}

      {modalMode === 'plan' && (
        <LearningPlanModal
          student={legacyStudent}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprovePlan}
        />
      )}

      {modalMode === 'activity' && activeActivityId && (
        <ActivityModal
          student={legacyStudent}
          activity={{
            id: activeActivityId,
            title: 'Tactile Bundling: 10 Units to 1 Ten',
            description: 'Physical straw bundling into decade groups with rubber bands to internalize place value.',
            duration: '12 mins',
            status: 'in_progress',
            focusPrerequisite: 'Positional place value',
          }}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
