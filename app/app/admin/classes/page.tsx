'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Plus,
  Users,
} from 'lucide-react'
import { classService } from '@/lib/services/classService'
import { ClassRoom } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function AdminClassesPage() {
  const [classesList, setClassesList] = useState<ClassRoom[]>(() =>
    classService.getClasses()
  )
  const [isAdding, setIsAdding] = useState(false)
  const [standard, setStandard] = useState(3)
  const [section, setSection] = useState('A')
  const [medium, setMedium] = useState<'Gujarati' | 'English' | 'Hindi'>('Gujarati')
  const [teacherName, setTeacherName] = useState('Asha Shah')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const newClass: ClassRoom = {
      id: `class-std-${standard}${section.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: `Standard ${standard} - ${section}`,
      standard,
      grade: standard,
      section,
      academicYear: '2025-2026',
      academicYearId: 'ay-2025-2026',
      schoolId: 'school-asha-primary',
      medium,
      classTeacherName: teacherName.trim() || 'Assigned Teacher',
      classTeacherIds: ['usr-001'],
      studentIds: [],
      enrolledStudentsCount: 25,
      studentsAssessedCount: 0,
      activeSupportPlansCount: 0,
      pendingAssessmentsCount: 1,
      pendingTeacherActionsCount: 0,
      lastActivityDate: 'Just now',
      flnLiteracyPercentage: 70,
      flnNumeracyPercentage: 70,
      status: 'Active',
    }

    const nextList = [newClass, ...classesList]
    setClassesList(nextList)
    setIsAdding(false)
    showToast(`Class Standard ${standard} - ${section} provisioned successfully.`)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <span>School Administration</span>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#17324D]">Classroom Provisioning</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <GraduationCap size={15} />
            <span>Classroom Administration</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Standards 1–8 Provisioning
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Configure grade cohorts, sections, mediums, and assigned class educators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/classes"
            className="flex h-8.5 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            Class Directory
          </Link>
          <Button
            onClick={() => setIsAdding(true)}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" /> Provision New Class
          </Button>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classesList.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition hover:border-[#0D9488]/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-bold text-[#17324D]">
                  Std {c.standard}
                </span>
                <h2 className="mt-1 text-base font-bold text-[#17324D]">{c.name}</h2>
                <p className="text-xs text-[#64748B]">{c.medium} Medium · AY {c.academicYear}</p>
              </div>
              <span className="rounded-full bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-semibold text-[#087F75]">
                {c.enrolledStudentsCount} Learners
              </span>
            </div>

            <div className="mt-3 rounded-lg bg-[#F7F9F6] p-2.5 text-xs text-[#263238]">
              <span className="text-[#64748B]">Class Teacher:</span>{' '}
              <strong className="text-[#17324D]">{c.classTeacherName}</strong>
            </div>

            <div className="mt-3.5 flex items-center justify-between border-t border-[#F1F5F3] pt-2 text-xs">
              <span className="text-[11px] text-[#64748B]">Active Plans: {c.activeSupportPlansCount}</span>
              <Link
                href={`/app/classes/${c.id}`}
                className="font-semibold text-[#0D9488] hover:underline"
              >
                Open Workspace <ChevronRight size={13} className="inline" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg">
            <h2 className="text-base font-bold text-[#17324D]">Provision New Classroom</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Add a class section and assign the primary classroom teacher.
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Standard (Grade)</label>
                  <select
                    value={standard}
                    onChange={(e) => setStandard(parseInt(e.target.value))}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Standard {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Section</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Medium of Instruction</label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as 'Gujarati' | 'English' | 'Hindi')}
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                >
                  <option value="Gujarati">Gujarati Medium (ગુજરાતી માધ્યમ)</option>
                  <option value="Hindi">Hindi Medium (हिन्दी माध्यम)</option>
                  <option value="English">English Medium</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Class Teacher Name</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="e.g. Asha Shah"
                  required
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F3]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-8 rounded-lg bg-[#0D9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087F75]"
                >
                  Save Classroom
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
