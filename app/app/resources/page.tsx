'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Filter,
  Plus,
  Search,
  Sparkles,
  Layers,
  Volume2,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  Printer,
  CheckCircle2,
  Clock,
  Compass,
  ArrowUpRight,
  Tag,
  Share2,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { learningActivityService } from '@/lib/services/learningActivityService'
import { classService } from '@/lib/services/classService'
import { studentService } from '@/lib/services/studentService'
import { auditService } from '@/lib/services/auditService'
import { LearningActivity, SkillCategory, StudentRecord } from '@/lib/types'

export default function ResourcesPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<'All' | SkillCategory>('All')
  const [formatFilter, setFormatFilter] = useState<string>('All')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<LearningActivity | null>(null)
  const [selectedClassId, setSelectedClassId] = useState('class-std-3a')
  const [selectedStudentId, setSelectedStudentId] = useState('STU-2025-3A-014')
  const [assignSuccessMessage, setAssignSuccessMessage] = useState<string | null>(null)

  const activities = learningActivityService.getActivities({
    subjectId: subjectFilter,
    contentType: formatFilter !== 'All' ? formatFilter : undefined,
    difficulty: difficultyFilter !== 'All' ? difficultyFilter : undefined,
    search: search.trim() ? search : undefined,
  })

  const classes = classService.getClasses()
  const students = studentService.getStudentsByClass(selectedClassId)

  const formatIcons: Record<string, typeof Layers> = {
    flashcards: Layers,
    number_line: SlidersHorizontal,
    guided_math: BookOpen,
    audio_practice: Volume2,
    worksheet: FileText,
  }

  function handleOpenAssign(act: LearningActivity) {
    setSelectedActivity(act)
    setAssignSuccessMessage(null)
    setAssignModalOpen(true)
  }

  function handleConfirmAssign() {
    if (!selectedActivity) return
    const student = studentService.getStudentById(selectedStudentId)
    const targetName = student ? student.name : 'Selected Students'

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'activity_completed',
      entityType: 'activity',
      entityId: selectedActivity.id,
      summary: `Assigned remedial activity "${selectedActivity.title}" to ${targetName} (${selectedStudentId})`,
    })

    setAssignSuccessMessage(`Activity successfully assigned to ${targetName}. Added to 5-day remedial schedule.`)
    setTimeout(() => {
      setAssignModalOpen(false)
      setAssignSuccessMessage(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488]">
              <Sparkles size={13} />
              GCERT Aligned FLN Materials
            </span>
            <span className="text-xs text-[#64748B]">Standards 1–8</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {locale === 'gu' ? 'શૈક્ષણિક સાહિત્ય અને પ્રવૃત્તિ સંગ્રહ' : 'Learning Resource Library'}
          </h1>
          <p className="text-sm text-[#64748B]">
            {locale === 'gu'
              ? 'પાયાની સાક્ષરતા અને સંખ્યાજ્ઞાન માટે મૂર્ત સાહિત્ય, રમતો, ફ્લેશકાર્ડ્સ અને કાર્યપત્રો.'
              : 'Concrete manipulatives, structured partner games, phonics flashcards, and printable remedial worksheets.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/content-management"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#17324D] shadow-xs transition hover:bg-[#F7F9F6]"
          >
            <Compass size={14} className="text-[#0D9488]" />
            <span>Manage Content</span>
          </Link>
          <button
            onClick={() => {
              if (activities.length > 0) handleOpenAssign(activities[0])
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0b7c72]"
          >
            <Plus size={14} />
            <span>Assign Resource</span>
          </button>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Total Resources</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">{activities.length} Available</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">Class 1–5 Core Focus</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Curriculum Aligned</div>
          <div className="mt-1 text-xl font-bold text-[#15803D]">100% GCERT</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Learning Outcomes mapped</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Average Duration</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">10–15 Mins</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Ideal for daily FLN period</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Bilingual Support</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">Gujarati & English</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Teacher scripts included</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, target skill, GCERT outcome code, or keyword..."
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] py-2 pl-9 pr-3 text-xs text-[#263238] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <Filter size={13} />
              <span>Filters:</span>
            </div>

            {/* Subject Filter */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value as 'All' | SkillCategory)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
            >
              <option value="All">All Subjects</option>
              <option value="numeracy">Numeracy (ગણિત)</option>
              <option value="literacy">Literacy (ભાષા)</option>
            </select>

            {/* Format Filter */}
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
            >
              <option value="All">All Formats</option>
              <option value="guided_math">Concrete / Manipulative</option>
              <option value="number_line">Number Line & Tools</option>
              <option value="flashcards">Flashcards</option>
              <option value="audio_practice">Audio & Decodable</option>
              <option value="worksheet">Printable Worksheet</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
            >
              <option value="All">All Tiers</option>
              <option value="Foundation">Foundation Tier</option>
              <option value="Standard">Standard Tier</option>
              <option value="Extension">Extension Tier</option>
            </select>

            {(search || subjectFilter !== 'All' || formatFilter !== 'All' || difficultyFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearch('')
                  setSubjectFilter('All')
                  setFormatFilter('All')
                  setDifficultyFilter('All')
                }}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#B42318] hover:bg-[#FEE4E2]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Resources */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E2E8F0] bg-white py-12 text-center">
          <BookOpen className="size-10 text-[#64748B]/50" />
          <h3 className="mt-3 text-sm font-semibold text-[#17324D]">No resources found</h3>
          <p className="mt-1 text-xs text-[#64748B]">Try relaxing your search terms or filter selections.</p>
          <button
            onClick={() => {
              setSearch('')
              setSubjectFilter('All')
              setFormatFilter('All')
              setDifficultyFilter('All')
            }}
            className="mt-4 rounded-lg bg-[#0D9488] px-3.5 py-1.5 text-xs font-medium text-white shadow-xs"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((act) => {
            const formatKey = act.contentType || act.format || 'guided_math'
            const FormatIcon = formatIcons[formatKey] || BookOpen
            const isNumeracy = act.subjectId === 'numeracy'

            return (
              <div
                key={act.id}
                className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition hover:border-[#8ACFC4] hover:shadow-sm"
              >
                <div>
                  {/* Card Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                          isNumeracy ? 'bg-[#DFF4EF] text-[#0D9488]' : 'bg-[#FEF08A]/40 text-[#854D0E]'
                        }`}
                      >
                        <Tag size={10} />
                        {isNumeracy ? 'Numeracy' : 'Literacy'}
                      </span>
                      <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#475569]">
                        {act.gradeRange}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#64748B]">
                      <Clock size={12} />
                      {act.duration}
                    </span>
                  </div>

                  {/* Title & Gujarati Title */}
                  <h3 className="mt-3 text-sm font-bold leading-snug text-[#17324D]">
                    {act.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-[#0D9488]">
                    {act.titleGu}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-[#64748B] line-clamp-2">
                    {act.description}
                  </p>

                  {/* Skills Addressed */}
                  <div className="mt-3.5 space-y-1.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] p-2.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#64748B]">Target Competency:</span>
                      <span className="font-semibold text-[#17324D]">{act.targetSkillName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#64748B]">Prerequisite:</span>
                      <span className="text-[#475569]">{act.prerequisiteSkillName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#64748B] border-t border-[#E2E8F0] pt-1">
                      <span>GCERT Code:</span>
                      <span className="font-mono text-[#0D9488] font-semibold">{act.curriculumMapping}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <FormatIcon size={14} className="text-[#0D9488]" />
                    <span className="capitalize">{formatKey.replace('_', ' ')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAssign(act)}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#17324D] hover:bg-[#F7F9F6]"
                    >
                      <Share2 size={12} />
                      <span>Assign</span>
                    </button>
                    <Link
                      href={`/app/resources/${act.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-[#17324D] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1f4265]"
                    >
                      <span>Interactive Preview</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Assignment Modal */}
      {assignModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#0D9488]">Assign Learning Resource</span>
                <h2 className="text-base font-bold text-[#17324D]">{selectedActivity.title}</h2>
                <p className="text-xs text-[#64748B]">{selectedActivity.titleGu}</p>
              </div>
              <button
                onClick={() => setAssignModalOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                ✕
              </button>
            </div>

            {assignSuccessMessage ? (
              <div className="my-6 rounded-lg bg-[#DFF4EF] p-4 text-center">
                <CheckCircle2 size={28} className="mx-auto text-[#0D9488]" />
                <p className="mt-2 text-xs font-semibold text-[#0D9488]">{assignSuccessMessage}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#17324D]">Select Classroom</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white p-2 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — Class {c.standard}{c.section} ({c.medium} Medium)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#17324D]">Target Student</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white p-2 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
                  >
                    <option value="all-students">All Students in {selectedClassId}</option>
                    {students.map((s: StudentRecord) => (
                      <option key={s.id} value={s.studentId}>
                        {s.name} ({s.studentId}) — {s.prerequisiteGap}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg bg-[#F7F9F6] p-3 text-xs">
                  <div className="font-semibold text-[#17324D]">Implementation Guidance:</div>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    {selectedActivity.materialsNeeded || 'Use concrete school supplies.'}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAssignModalOpen(false)}
                    className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAssign}
                    className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
                  >
                    Confirm Assignment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
