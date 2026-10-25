'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  Filter,
  GraduationCap,
  Plus,
  Search,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { studentService } from '@/lib/services/studentService'
import { classService } from '@/lib/services/classService'
import { auditService } from '@/lib/services/auditService'
import { StudentRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { StudentProfileModal } from '@/components/student-profile-modal'
import { AssessmentModal } from '@/components/assessment-modal'
import { DiagnosticModal } from '@/components/diagnostic-modal'
import { LearningPlanModal } from '@/components/learning-plan-modal'
import { ActivityModal } from '@/components/activity-modal'
import { evaluateFLNDiagnostic } from '@/lib/fln-scoring-engine'
import { Student } from '@/lib/demo-data'

export default function StudentsPage() {
  const { t } = useI18n()
  const [students, setStudents] = useState<StudentRecord[]>(() => studentService.getStudents())
  const [classesList] = useState(() => classService.getClasses())

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [standardFilter, setStandardFilter] = useState<string>('All')
  const [sectionFilter, setSectionFilter] = useState<string>('All')
  const [classFilter, setClassFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // Journey modals
  const [modalMode, setModalMode] = useState<
    'none' | 'profile' | 'assessment' | 'diagnostic' | 'plan' | 'activity'
  >('none')
  const [activeStudent, setActiveStudent] = useState<StudentRecord | null>(null)
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Add Student Modal State
  const [addStudentOpen, setAddStudentOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRollNo, setNewRollNo] = useState('')
  const [newClassId, setNewClassId] = useState('class-std-3a')
  const [newGender, setNewGender] = useState<'Male' | 'Female'>('Male')
  const [newGuardian, setNewGuardian] = useState('')
  const [newPhone, setNewPhone] = useState('+91 ')
  const [newPrereqGap, setNewPrereqGap] = useState('Bundling 10 units into 1 ten')

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Filter logic
  const filtered = students.filter((s) => {
    if (standardFilter !== 'All' && `${s.standard}` !== standardFilter) return false
    if (sectionFilter !== 'All' && s.section !== sectionFilter) return false
    if (classFilter !== 'All' && s.classId !== classFilter) return false
    if (statusFilter !== 'All' && s.overallStatus !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchName = s.fullName.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      const matchId = s.studentId.toLowerCase().includes(q) || s.rollNo.includes(q)
      const matchSkill = s.prerequisiteGap.toLowerCase().includes(q)
      if (!matchName && !matchId && !matchSkill) return false
    }
    return true
  })

  function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim() || !newRollNo.trim()) return

    const targetClass = classService.getClassById(newClassId) || classesList[0]
    const shortId = `STU-2025-${targetClass.standard}${targetClass.section}-${newRollNo.padStart(3, '0')}`
    const initials = newName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const newStudent: StudentRecord = {
      id: `stu-${Date.now().toString().slice(-4)}`,
      studentId: shortId,
      name: newName.split(' ')[0],
      fullName: newName.trim(),
      classId: targetClass.id,
      standard: targetClass.standard,
      section: targetClass.section,
      rollNo: newRollNo.trim(),
      avatar: initials || 'ST',
      gender: newGender,
      dob: '2017-01-01',
      guardianName: newGuardian.trim() || 'Parent / Guardian',
      guardianPhone: newPhone.trim() || '+91 98250 00000',
      preferredLanguage: 'gu',
      enrollmentStatus: 'Active',
      overallStatus: 'Needs Support',
      literacyStatus: 'Developing',
      numeracyStatus: 'Needs Support',
      prerequisiteGap: newPrereqGap,
      planStatus: 'Pending approval',
      progressPercent: 0,
      nextRecommendedAction: 'Schedule baseline diagnostic',
      completedActivitiesCount: 0,
      assignedActivitiesCount: 3,
    }

    studentService.addStudent(newStudent)
    setStudents(studentService.getStudents())

    auditService.logEvent({
      actorId: 'usr-admin-01',
      actorName: 'Administrator',
      role: 'admin',
      eventType: 'student_added',
      entityType: 'student',
      entityId: newStudent.studentId,
      summary: `Enrolled new student ${newStudent.fullName} (#${newStudent.rollNo}) in ${targetClass.name}`,
    })

    setAddStudentOpen(false)
    setNewName('')
    setNewRollNo('')
    setNewGuardian('')
    showToast(`Enrolled ${newStudent.fullName} into ${targetClass.name}!`)
  }

  // Convert StudentRecord to legacy Student format for modals
  function toLegacyStudent(record: StudentRecord): Student {
    return {
      id: record.id,
      name: record.name,
      fullName: record.fullName,
      grade: `Class ${record.standard}${record.section}`,
      rollNo: record.rollNo,
      avatar: record.avatar,
      focusSkill: record.prerequisiteGap,
      status: (record.overallStatus === 'Needs Support'
        ? 'Needs support'
        : record.overallStatus === 'Developing'
        ? 'Practising'
        : 'Ready to progress') as Student['status'],
      diagnosticStatus: (record.diagnosticScore ? 'Completed' : 'Pending assessment') as Student['diagnosticStatus'],
      diagnosticScore: record.diagnosticScore,
      prerequisiteGap: record.prerequisiteGap,
      pedagogicalInsight: record.pedagogicalInsight,
      planStatus: (record.planStatus === 'Approved' ? 'Approved' : 'Pending approval') as Student['planStatus'],
      planTitle: record.planTitle,
      progressPercent: record.progressPercent,
      activities: [
        {
          id: 'act-1',
          title: 'Straw Bundling for Place Value',
          description: 'Group 10 single straws into a bundled ten to visually reinforce positional value.',
          duration: '12 mins',
          status: record.completedActivitiesCount > 0 ? 'completed' : 'in_progress',
          focusPrerequisite: 'Place value bundling',
        },
        {
          id: 'act-2',
          title: 'Base-10 Decomposition Mat',
          description: 'Decompose numbers into tens and ones on dual-column place value mat.',
          duration: '15 mins',
          status: record.completedActivitiesCount > 1 ? 'completed' : 'locked',
          focusPrerequisite: 'Positional value expansion',
        },
        {
          id: 'act-3',
          title: 'Decade Leap Partner Game',
          description: 'Exchange 10 single pebbles for 1 yellow token as soon as 10 is reached.',
          duration: '10 mins',
          status: record.completedActivitiesCount > 2 ? 'completed' : 'locked',
          focusPrerequisite: 'Regrouping intuition',
        },
      ],
    }
  }

  function handleSelectStudent(record: StudentRecord) {
    setActiveStudent(record)
    setModalMode('profile')
  }

  function handleStartAssessment(record: StudentRecord) {
    setActiveStudent(record)
    setModalMode('assessment')
  }

  function handleCompleteAssessment(answers: Record<string, string>, notes: string) {
    if (!activeStudent) return
    const evaluation = evaluateFLNDiagnostic(answers, notes)

    const updated: StudentRecord = {
      ...activeStudent,
      diagnosticScore: evaluation.overallScore,
      prerequisiteGap: evaluation.pedagogicalSummary,
      pedagogicalInsight: notes || evaluation.pedagogicalSummary,
      planStatus: 'Pending approval',
      overallStatus: evaluation.overallScore < 70 ? 'Needs Support' : evaluation.overallScore < 85 ? 'Developing' : 'Demonstrated',
      lastAssessedDate: 'Just now',
    }

    studentService.updateStudent(updated)
    setStudents(studentService.getStudents())
    setActiveStudent(updated)
    setModalMode('diagnostic')
    showToast(`Diagnostic submitted for ${updated.fullName}. Score: ${evaluation.overallScore}%`)
  }

  function handleProceedToPlan(student: Student) {
    setModalMode('plan')
  }

  function handleApprovePlan(student: Student, notes: string) {
    if (!activeStudent) return
    const updated: StudentRecord = {
      ...activeStudent,
      planStatus: 'Approved',
      pedagogicalInsight: notes ? `${activeStudent.pedagogicalInsight} (Approved: ${notes})` : activeStudent.pedagogicalInsight,
    }
    studentService.updateStudent(updated)
    setStudents(studentService.getStudents())
    setActiveStudent(updated)
    setModalMode('profile')
    showToast(`Learning plan approved for ${updated.fullName}`)
  }

  function handleStartActivity(student: Student, activityId: string) {
    setActiveActivityId(activityId)
    setModalMode('activity')
  }

  function handleCompleteActivity(activityId: string, teacherNote: string) {
    if (!activeStudent) return
    const updated: StudentRecord = {
      ...activeStudent,
      progressPercent: Math.min(100, activeStudent.progressPercent + 25),
      completedActivitiesCount: activeStudent.completedActivitiesCount + 1,
      overallStatus: 'Developing',
    }
    studentService.updateStudent(updated)
    setStudents(studentService.getStudents())
    setActiveStudent(updated)
    setModalMode('profile')
    showToast(`Milestone completed for ${updated.fullName}`)
  }

  function exportStudentsCsv() {
    const headers = [
      'Student ID',
      'Full Name',
      'Standard',
      'Section',
      'Roll No',
      'FLN Status',
      'Diagnostic Score',
      'Prerequisite Focus',
      'Pathway Progress',
    ]
    const rows = filtered.map((s) => [
      s.studentId,
      `"${s.fullName}"`,
      s.standard,
      s.section,
      s.rollNo,
      s.overallStatus,
      s.diagnosticScore ? `${s.diagnosticScore}%` : 'Not assessed',
      `"${s.prerequisiteGap.replace(/"/g, '""')}"`,
      `${s.progressPercent}%`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `FLN_Student_Roster_${standardFilter}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Student roster CSV exported successfully.')
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
            <Users size={15} />
            <span>{t.students.title}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">{t.students.rosterTitle}</h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{t.students.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={exportStudentsCsv}
            className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <Download size={13} className="mr-1.5" />
            <span>{t.common.exportCsv}</span>
          </Button>

          <Button
            type="button"
            onClick={() => setAddStudentOpen(true)}
            className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
          >
            <Plus size={13} className="mr-1" />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#64748B]">Total Learners</span>
          <p className="mt-0.5 text-xl font-bold text-[#17324D]">{students.length}</p>
          <p className="text-[10px] text-[#64748B]">Active school cohort</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#B7791F]">Needs Support</span>
          <p className="mt-0.5 text-xl font-bold text-[#B7791F]">
            {students.filter((s) => s.overallStatus === 'Needs Support').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Requires micro-pathway</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#0D9488]">Developing</span>
          <p className="mt-0.5 text-xl font-bold text-[#0D9488]">
            {students.filter((s) => s.overallStatus === 'Developing').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Active practice ongoing</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#15803D]">Demonstrated</span>
          <p className="mt-0.5 text-xl font-bold text-[#15803D]">
            {students.filter((s) => s.overallStatus === 'Demonstrated').length}
          </p>
          <p className="text-[10px] text-[#64748B]">FLN baseline achieved</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-xs">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t.common.search} student name, roll number, or focus gap...`}
              className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white pl-9 pr-3 text-xs text-[#263238] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Standard Filter */}
            <select
              value={standardFilter}
              onChange={(e) => setStandardFilter(e.target.value)}
              aria-label="Filter by standard"
              className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] focus:border-[#0D9488] focus:outline-none"
            >
              <option value="All">All Grades (1–8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((std) => (
                <option key={std} value={`${std}`}>
                  Standard {std}
                </option>
              ))}
            </select>

            {/* Section Filter */}
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              aria-label="Filter by section"
              className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] focus:border-[#0D9488] focus:outline-none"
            >
              <option value="All">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>

            {/* Class Filter */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              aria-label="Filter by class"
              className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] focus:border-[#0D9488] focus:outline-none"
            >
              <option value="All">All Classes</option>
              {classesList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
              className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-semibold text-[#17324D] focus:border-[#0D9488] focus:outline-none"
            >
              <option value="All">All FLN Statuses</option>
              <option value="Needs Support">Needs Support</option>
              <option value="Developing">Developing</option>
              <option value="Demonstrated">Demonstrated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-[#CBD5E1] bg-[#F7F9F6] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  viewMode === 'table' ? 'bg-white text-[#0D9488] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Table
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  viewMode === 'grid' ? 'bg-white text-[#0D9488] shadow-xs' : 'text-[#64748B]'
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
          <User size={32} className="mx-auto text-[#CBD5E1]" />
          <h2 className="mt-3 text-base font-bold text-[#17324D]">No students match your filter</h2>
          <p className="mt-1 text-xs text-[#64748B]">Try selecting &apos;All&apos; or modifying your search terms.</p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Learner & ID</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Roll #</th>
                <th className="px-4 py-3">FLN Status</th>
                <th className="px-4 py-3">Prerequisite Gap</th>
                <th className="px-4 py-3">Pathway Progress</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#DFF4EF] text-xs font-bold text-[#087F75]">
                        {s.avatar}
                      </div>
                      <div>
                        <Link
                          href={`/app/students/${s.id}`}
                          className="font-bold text-[#17324D] hover:text-[#0D9488] hover:underline"
                        >
                          {s.fullName}
                        </Link>
                        <div className="font-mono text-[10px] text-[#64748B]">{s.studentId}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-semibold text-[#17324D]">
                    Std {s.standard}-{s.section}
                  </td>

                  <td className="px-4 py-3 font-semibold text-[#526273]">#{s.rollNo}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        s.overallStatus === 'Needs Support'
                          ? 'bg-[#FFF5D9] text-[#8A6200]'
                          : s.overallStatus === 'Developing'
                          ? 'bg-[#DFF4EF] text-[#087F75]'
                          : 'bg-[#DCFCE7] text-[#15803D]'
                      }`}
                    >
                      {s.overallStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[#475569] max-w-xs truncate">{s.prerequisiteGap}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 rounded-full bg-[#E2E8F0] h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#0D9488]"
                          style={{ width: `${s.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-bold text-[11px] text-[#17324D]">{s.progressPercent}%</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        onClick={() => handleSelectStudent(s)}
                        className="h-7 rounded-md border-[#CBD5E1] px-2 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                      >
                        Profile
                      </Button>
                      <Button
                        onClick={() => handleStartAssessment(s)}
                        className="h-7 rounded-md bg-[#0D9488] px-2.5 text-xs font-semibold text-white hover:bg-[#087F75]"
                      >
                        Check
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Cards view */
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition hover:border-[#0D9488]/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#DFF4EF] text-xs font-bold text-[#087F75]">
                    {s.avatar}
                  </div>
                  <div>
                    <Link
                      href={`/app/students/${s.id}`}
                      className="font-bold text-[#17324D] hover:text-[#0D9488] hover:underline"
                    >
                      {s.fullName}
                    </Link>
                    <div className="text-[11px] text-[#64748B]">
                      Std {s.standard}{s.section} · Roll #{s.rollNo}
                    </div>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    s.overallStatus === 'Needs Support'
                      ? 'bg-[#FFF5D9] text-[#8A6200]'
                      : s.overallStatus === 'Developing'
                      ? 'bg-[#DFF4EF] text-[#087F75]'
                      : 'bg-[#F1F5F3] text-[#64748B]'
                  }`}
                >
                  {s.overallStatus}
                </span>
              </div>

              <div className="mt-3 rounded-lg bg-[#F7F9F6] p-2.5 text-xs">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Prerequisite Focus
                </span>
                <p className="mt-0.5 text-xs text-[#263238] line-clamp-2">{s.prerequisiteGap}</p>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Pathway Progress:</span>
                <span className="font-bold text-[#0D9488]">{s.progressPercent}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[#E2E8F0]">
                <div
                  className="h-1.5 rounded-full bg-[#0D9488]"
                  style={{ width: `${s.progressPercent}%` }}
                />
              </div>

              <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-[#F1F5F3]">
                <Button
                  variant="outline"
                  onClick={() => handleSelectStudent(s)}
                  className="h-7 flex-1 rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => handleStartAssessment(s)}
                  className="h-7 flex-1 rounded-lg bg-[#0D9488] text-xs font-semibold text-white hover:bg-[#087F75]"
                >
                  Run Check
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Enroll New Student */}
      {addStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <h2 className="text-base font-bold text-[#17324D]">Enroll New Student</h2>
            <p className="text-xs text-[#64748B]">Assign student to class cohort with guardian contact.</p>

            <form onSubmit={handleCreateStudent} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Diya Solanki"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={newRollNo}
                    onChange={(e) => setNewRollNo(e.target.value)}
                    placeholder="e.g. 31"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Target Class *</label>
                  <select
                    value={newClassId}
                    onChange={(e) => setNewClassId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    {classesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Gender</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Guardian Name</label>
                  <input
                    type="text"
                    value={newGuardian}
                    onChange={(e) => setNewGuardian(e.target.value)}
                    placeholder="e.g. Vinodbhai Solanki"
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Guardian Mobile</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Focus Prerequisite Need</label>
                <input
                  type="text"
                  value={newPrereqGap}
                  onChange={(e) => setNewPrereqGap(e.target.value)}
                  placeholder="e.g. Bundling 10 units into 1 ten"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddStudentOpen(false)}
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

      {/* Global Interactive Journey Modals */}
      {modalMode === 'profile' && activeStudent && (
        <StudentProfileModal
          student={toLegacyStudent(activeStudent)}
          onClose={() => setModalMode('none')}
          onStartAssessment={(st) => handleStartAssessment(activeStudent)}
          onViewDiagnostic={(st) => setModalMode('diagnostic')}
          onReviewPlan={(st) => setModalMode('plan')}
          onStartActivity={handleStartActivity}
        />
      )}

      {modalMode === 'assessment' && activeStudent && (
        <AssessmentModal
          student={toLegacyStudent(activeStudent)}
          onClose={() => setModalMode('none')}
          onSubmitAssessment={handleCompleteAssessment}
        />
      )}

      {modalMode === 'diagnostic' && activeStudent && (
        <DiagnosticModal
          student={toLegacyStudent(activeStudent)}
          onClose={() => setModalMode('none')}
          onProceedToPlan={handleProceedToPlan}
          onStartDirectActivity={handleStartActivity}
        />
      )}

      {modalMode === 'plan' && activeStudent && (
        <LearningPlanModal
          student={toLegacyStudent(activeStudent)}
          onClose={() => setModalMode('none')}
          onApprovePlan={handleApprovePlan}
        />
      )}

      {modalMode === 'activity' && activeStudent && activeActivityId && (
        <ActivityModal
          student={toLegacyStudent(activeStudent)}
          activity={{
            id: activeActivityId,
            title: 'Straw Bundling for Place Value',
            description: 'Group 10 single straws into a bundled ten to visually reinforce positional value.',
            duration: '12 mins',
            status: 'in_progress',
            focusPrerequisite: 'Place value bundling',
          }}
          onClose={() => setModalMode('none')}
          onCompleteActivity={handleCompleteActivity}
        />
      )}
    </div>
  )
}
