'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Edit2,
  GraduationCap,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  User,
  Users,
} from 'lucide-react'
import { classService } from '@/lib/services/classService'
import { studentService } from '@/lib/services/studentService'
import { assessmentService } from '@/lib/services/assessmentService'
import { learningPlanService } from '@/lib/services/learningPlanService'
import { auditService } from '@/lib/services/auditService'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { ClassRoom, StudentRecord } from '@/lib/types'

interface PageProps {
  params: Promise<{ classId: string }>
}

export default function ClassDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const classId = resolvedParams.classId
  const { t } = useI18n()

  const [classRoom, setClassRoom] = useState<ClassRoom>(
    () => classService.getClassById(classId) || classService.getClassById('class-std-3a')!
  )
  const [students, setStudents] = useState<StudentRecord[]>(() =>
    studentService.getStudents({ classId: classRoom.id })
  )
  const [assessments, setAssessments] = useState(() =>
    assessmentService.getAssessments({ classId: classRoom.id })
  )
  const [plans, setPlans] = useState(() =>
    learningPlanService.getPlans().filter((p) => p.classId === classRoom.id)
  )

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'assessments' | 'plans' | 'reports'>('overview')
  const [studentSearch, setStudentSearch] = useState('')
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('All')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Edit Teacher Modal
  const [editTeacherOpen, setEditTeacherOpen] = useState(false)
  const [newTeacherName, setNewTeacherName] = useState(classRoom.classTeacherName)

  // Enroll Student Modal
  const [enrollStudentOpen, setEnrollStudentOpen] = useState(false)
  const [enrollName, setEnrollName] = useState('')
  const [enrollRollNo, setEnrollRollNo] = useState('')
  const [enrollGender, setEnrollGender] = useState<'Male' | 'Female'>('Male')
  const [enrollGuardianName, setEnrollGuardianName] = useState('')
  const [enrollPhone, setEnrollPhone] = useState('+91 ')
  const [enrollPrereqGap, setEnrollPrereqGap] = useState('Foundational number recognition')

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  function handleSaveTeacher(e: React.FormEvent) {
    e.preventDefault()
    if (!newTeacherName.trim()) return

    classService.updateClassTeacher(classRoom.id, newTeacherName.trim())
    const updated = classService.getClassById(classRoom.id)!
    setClassRoom(updated)
    setEditTeacherOpen(false)

    auditService.logEvent({
      actorId: 'usr-admin-01',
      actorName: 'Administrator',
      role: 'admin',
      eventType: 'class_reassigned',
      entityType: 'classroom',
      entityId: classRoom.id,
      summary: `Updated Class Teacher for ${classRoom.name} to ${newTeacherName.trim()}`,
    })

    showToast(`Class teacher updated to ${newTeacherName.trim()} successfully!`)
  }

  function handleEnrollStudent(e: React.FormEvent) {
    e.preventDefault()
    if (!enrollName.trim() || !enrollRollNo.trim()) return

    const shortId = `STU-2025-${classRoom.standard}${classRoom.section}-${enrollRollNo.padStart(3, '0')}`
    const initials = enrollName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const newStudent: StudentRecord = {
      id: `stu-${Date.now().toString().slice(-4)}`,
      studentId: shortId,
      name: enrollName.split(' ')[0],
      fullName: enrollName.trim(),
      classId: classRoom.id,
      standard: classRoom.standard,
      section: classRoom.section,
      rollNo: enrollRollNo.trim(),
      avatar: initials || 'ST',
      gender: enrollGender,
      dob: '2017-01-01',
      guardianName: enrollGuardianName || 'Parent / Guardian',
      guardianPhone: enrollPhone || '+91 98250 00000',
      preferredLanguage: 'gu',
      enrollmentStatus: 'Active',
      overallStatus: 'Needs Support',
      literacyStatus: 'Developing',
      numeracyStatus: 'Needs Support',
      prerequisiteGap: enrollPrereqGap,
      planStatus: 'Pending approval',
      progressPercent: 0,
      nextRecommendedAction: 'Schedule diagnostic assessment',
      completedActivitiesCount: 0,
      assignedActivitiesCount: 3,
    }

    studentService.addStudent(newStudent)

    // Refresh state
    const refreshedStudents = studentService.getStudents({ classId: classRoom.id })
    setStudents(refreshedStudents)
    const refreshedClass = classService.getClassById(classRoom.id)!
    setClassRoom(refreshedClass)

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: classRoom.classTeacherName,
      role: 'teacher',
      eventType: 'student_added',
      entityType: 'student',
      entityId: newStudent.studentId,
      summary: `Enrolled new student ${newStudent.fullName} (#${newStudent.rollNo}) into ${classRoom.name}`,
    })

    setEnrollStudentOpen(false)
    setEnrollName('')
    setEnrollRollNo('')
    setEnrollGuardianName('')
    showToast(`Enrolled ${newStudent.fullName} into ${classRoom.name}!`)
  }

  const filteredStudents = students.filter((s) => {
    if (studentStatusFilter !== 'All' && s.overallStatus !== studentStatusFilter) return false
    if (studentSearch.trim()) {
      const q = studentSearch.toLowerCase()
      return s.fullName.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back button & Class Header */}
      <div>
        <Link
          href="/app/classes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0D9488]"
        >
          <ArrowLeft size={14} />
          <span>Back to Classes Directory</span>
        </Link>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-bold text-[#0D9488]">
                Standard {classRoom.standard} - Section {classRoom.section}
              </span>
              <span className="text-xs text-[#64748B]">
                Academic Year {classRoom.academicYear} · {classRoom.medium} Medium
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">{classRoom.name}</h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
              <span>
                Class Teacher: <strong className="text-[#263238]">{classRoom.classTeacherName}</strong>
              </span>
              <button
                onClick={() => {
                  setNewTeacherName(classRoom.classTeacherName)
                  setEditTeacherOpen(true)
                }}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold text-[#0D9488] hover:bg-[#DFF4EF]"
              >
                <Edit2 size={11} /> Edit Teacher
              </button>
              <span>·</span>
              <span>
                Enrolled: <strong className="text-[#17324D]">{students.length} Learners</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => classService.exportClassCsv(classRoom.id)}
              className="h-9 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
            >
              <Download size={13} className="mr-1.5" />
              <span>{t.classes.exportClassReport}</span>
            </Button>

            <Button asChild className="h-9 rounded-lg bg-[#0D9488] px-3.5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]">
              <Link href={`/app/assessments/new?classId=${classRoom.id}`}>
                <Play size={13} className="mr-1.5" />
                <span>{t.classes.startClassAssessment}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E2E8F0]">
        <nav className="flex space-x-6 text-xs font-semibold">
          {[
            { id: 'overview', label: t.classes.tabs.overview },
            { id: 'students', label: `${t.classes.tabs.students} (${students.length})` },
            { id: 'assessments', label: `${t.classes.tabs.assessments} (${assessments.length})` },
            { id: 'plans', label: `${t.classes.tabs.plans} (${plans.length})` },
            { id: 'reports', label: t.classes.tabs.reports },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`border-b-2 pb-2.5 transition ${
                  isActive
                    ? 'border-[#0D9488] font-bold text-[#0D9488]'
                    : 'border-transparent text-[#64748B] hover:text-[#17324D]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* 4 Overview Metric Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748B]">Total Learners</span>
              <p className="mt-1 text-2xl font-bold text-[#17324D]">{students.length}</p>
              <span className="text-[10px] text-[#0D9488]">Active cohort</span>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748B]">Assessed</span>
              <p className="mt-1 text-2xl font-bold text-[#17324D]">{classRoom.studentsAssessedCount}</p>
              <span className="text-[10px] text-[#15803D]">
                {Math.round((classRoom.studentsAssessedCount / (students.length || 1)) * 100)}% coverage
              </span>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748B]">{t.common.activePlans}</span>
              <p className="mt-1 text-2xl font-bold text-[#17324D]">{classRoom.activeSupportPlansCount}</p>
              <span className="text-[10px] text-[#0D9488]">Weekly remediation</span>
            </div>
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748B]">Pending Actions</span>
              <p className="mt-1 text-2xl font-bold text-[#B7791F]">{classRoom.pendingTeacherActionsCount}</p>
              <span className="text-[10px] text-[#64748B]">Scheduled this week</span>
            </div>
          </div>

          {/* FLN Literacy & Numeracy Progress Panels */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#17324D] text-sm">{t.classes.literacyCoverage}</h3>
                  <p className="text-xs text-[#64748B]">Gujarati Phonics, Decoding & Comprehension</p>
                </div>
                <span className="text-lg font-bold text-[#0D9488]">{classRoom.flnLiteracyPercentage}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[#EDF2F0]">
                <div
                  className="h-full rounded-full bg-[#0D9488]"
                  style={{ width: `${classRoom.flnLiteracyPercentage}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-[#64748B]">
                Foundational decoding demonstrated by class learners. Focus on decodable sentences.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#17324D] text-sm">{t.classes.numeracyCoverage}</h3>
                  <p className="text-xs text-[#64748B]">Place Value Bundling, Counting & Addition</p>
                </div>
                <span className="text-lg font-bold text-[#0D9488]">{classRoom.flnNumeracyPercentage}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[#EDF2F0]">
                <div
                  className="h-full rounded-full bg-[#0D9488]"
                  style={{ width: `${classRoom.flnNumeracyPercentage}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-[#64748B]">
                Concrete place-value bundling practice ongoing with dual-column tens-mats and straw bundles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Students Roster */}
      {activeTab === 'students' && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={14} />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search students in this class..."
                className="h-8 w-full rounded-lg border border-[#CBD5E1] bg-white pl-8 pr-3 text-xs text-[#17324D] outline-none focus:border-[#0D9488]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#64748B]">Status:</span>
                {(['All', 'Needs Support', 'Developing', 'Demonstrated'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStudentStatusFilter(st)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                      studentStatusFilter === st
                        ? 'bg-[#0D9488] text-white'
                        : 'border border-[#CBD5E1] bg-white text-[#64748B] hover:bg-[#F7F9F6]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setEnrollStudentOpen(true)}
                className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
              >
                <Plus size={13} className="mr-1" /> Add Student
              </Button>
            </div>
          </div>

          <div className="mt-4 divide-y divide-[#E2E8F0]">
            {filteredStudents.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B]">
                No students found in this view.
              </div>
            ) : (
              filteredStudents.map((st) => (
                <div key={st.id} className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#DFF4EF] text-xs font-bold text-[#087F75]">
                      {st.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/app/students/${st.id}`}
                          className="font-bold text-[#17324D] text-sm hover:text-[#0D9488] hover:underline"
                        >
                          {st.fullName}
                        </Link>
                        <span className="text-[10px] text-[#94A3B8]">Roll #{st.rollNo}</span>
                        <span className="font-mono text-[10px] text-[#64748B]">({st.studentId})</span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#64748B]">
                        Prerequisite gap: <strong className="text-[#526273]">{st.prerequisiteGap}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        st.overallStatus === 'Needs Support'
                          ? 'bg-[#FFF5D9] text-[#8A6200]'
                          : st.overallStatus === 'Developing'
                          ? 'bg-[#DFF4EF] text-[#087F75]'
                          : 'bg-[#EBF4F1] text-[#17324D]'
                      }`}
                    >
                      {st.overallStatus}
                    </span>

                    <Button asChild variant="outline" className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#0D9488] hover:bg-[#F0F9F6]">
                      <Link href={`/app/students/${st.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab: Assessments */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#17324D] text-sm">{classRoom.name} Assessment Schedule & Status</h3>
            <Button asChild className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]">
              <Link href={`/app/assessments/new?classId=${classRoom.id}`}>
                <Plus size={13} className="mr-1" /> Schedule Assessment
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {assessments.map((a) => (
              <div key={a.id} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#0D9488] uppercase">
                    {a.subject}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B]">{a.status}</span>
                </div>
                <h4 className="mt-2 font-bold text-[#17324D] text-sm">{a.title}</h4>
                <p className="mt-1 text-xs text-[#64748B]">
                  Coverage: {a.completedCount} of {a.totalCount} completed · Estimated: {a.estimatedMinutes} mins
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-xs">
                  <span className="text-[#94A3B8]">Date: {a.scheduledDate}</span>
                  <Link href={`/app/assessments/${a.id}`} className="font-bold text-[#0D9488] hover:underline">
                    Open Assessment Session →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Learning Plans */}
      {activeTab === 'plans' && (
        <div className="space-y-3">
          {plans.map((p) => (
            <div key={p.id} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#17324D] text-sm">{p.title}</h4>
                  <p className="text-xs text-[#64748B]">
                    Student: <strong>{p.studentName}</strong> · Target: {p.targetSkill}
                  </p>
                </div>
                <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#087F75]">
                  {p.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#526273]">{p.teacherNotes}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-xs">
                <span className="text-[#94A3B8]">Scheduled: Monday–Friday daily</span>
                <Link href={`/app/students/${p.studentId}`} className="font-bold text-[#0D9488] hover:underline">
                  View Student Plan →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Reports */}
      {activeTab === 'reports' && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-center text-xs text-[#64748B]">
          <BarChart3 size={32} className="mx-auto text-[#0D9488]" />
          <h3 className="mt-2 text-sm font-bold text-[#17324D]">{classRoom.name} Foundational Digest</h3>
          <p className="mt-1 max-w-md mx-auto text-[#64748B]">
            Download the official CSV progress sheet containing class roster, assessment coverage, and active remedial plan status.
          </p>
          <Button
            type="button"
            onClick={() => classService.exportClassCsv(classRoom.id)}
            className="mt-4 h-9 rounded-lg bg-[#0D9488] px-4 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
          >
            <Download size={14} className="mr-1.5" /> Download Class CSV
          </Button>
        </div>
      )}

      {/* Modal: Edit Class Teacher */}
      {editTeacherOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <h2 className="text-base font-bold text-[#17324D]">Assign Class Teacher</h2>
            <p className="text-xs text-[#64748B]">Update the assigned lead teacher for {classRoom.name}.</p>

            <form onSubmit={handleSaveTeacher} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#17324D]">Teacher Full Name</label>
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="e.g. Asha Shah, Dharmesh Dave..."
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditTeacherOpen(false)}
                  className="rounded-lg border border-[#CBD5E1] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#087F75]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Enroll Student in this Class */}
      {enrollStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <h2 className="text-base font-bold text-[#17324D]">Enroll Student in {classRoom.name}</h2>
            <p className="text-xs text-[#64748B]">Add a learner to Standard {classRoom.standard}-{classRoom.section}.</p>

            <form onSubmit={handleEnrollStudent} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={enrollName}
                    onChange={(e) => setEnrollName(e.target.value)}
                    placeholder="e.g. Diya Solanki"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={enrollRollNo}
                    onChange={(e) => setEnrollRollNo(e.target.value)}
                    placeholder="e.g. 29"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Gender</label>
                  <select
                    value={enrollGender}
                    onChange={(e) => setEnrollGender(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Guardian Mobile</label>
                  <input
                    type="text"
                    value={enrollPhone}
                    onChange={(e) => setEnrollPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Guardian Full Name</label>
                <input
                  type="text"
                  value={enrollGuardianName}
                  onChange={(e) => setEnrollGuardianName(e.target.value)}
                  placeholder="e.g. Vinodbhai Solanki"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Baseline Prerequisite Need</label>
                <input
                  type="text"
                  value={enrollPrereqGap}
                  onChange={(e) => setEnrollPrereqGap(e.target.value)}
                  placeholder="e.g. Place value bundling and 2-digit decomposition"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEnrollStudentOpen(false)}
                  className="rounded-lg border border-[#CBD5E1] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#087F75]"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
