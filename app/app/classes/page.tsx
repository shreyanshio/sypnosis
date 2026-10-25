'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Download,
  Filter,
  GraduationCap,
  Plus,
  Search,
  Users,
} from 'lucide-react'
import { classService } from '@/lib/services/classService'
import { ClassRoom } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function ClassesPage() {
  const { t } = useI18n()
  const [classesList, setClassesList] = useState<ClassRoom[]>(() => classService.getClasses())
  const [selectedStandard, setSelectedStandard] = useState<string>('All')
  const [selectedMedium, setSelectedMedium] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const filtered = classesList.filter((c) => {
    if (selectedStandard !== 'All' && `${c.standard}` !== selectedStandard) return false
    if (selectedMedium !== 'All' && c.medium !== selectedMedium) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchName = c.name.toLowerCase().includes(q)
      const matchTeacher = c.classTeacherName.toLowerCase().includes(q)
      if (!matchName && !matchTeacher) return false
    }
    return true
  })

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <GraduationCap size={15} />
            <span>{t.classes.title}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">{t.classes.classRoster}</h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{t.classes.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => classService.exportClassCsv('class-std-3a')}
            className="h-9 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <Download size={13} className="mr-1.5" />
            <span>{t.common.exportCsv}</span>
          </Button>

          <Button
            type="button"
            className="h-9 rounded-lg bg-[#0D9488] px-3.5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" />
            <span>{t.classes.addClass}</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 min-w-0 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[180px] sm:min-w-[220px]">
            <Search className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by class or teacher..."
              className="h-8 w-full rounded-lg border border-[#CBD5E1] bg-white pl-8 pr-3 text-xs text-[#17324D] outline-none focus:border-[#0D9488]"
            />
          </div>

          {/* Standard Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#64748B]">{t.common.standard}:</span>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="h-8 rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs font-medium text-[#17324D] outline-none focus:border-[#0D9488]"
            >
              <option value="All">{t.common.all}</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((std) => (
                <option key={std} value={`${std}`}>
                  Std {std}
                </option>
              ))}
            </select>
          </div>

          {/* Medium Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#64748B]">{t.common.medium}:</span>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="h-8 rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs font-medium text-[#17324D] outline-none focus:border-[#0D9488]"
            >
              <option value="All">{t.common.all}</option>
              <option value="Gujarati">ગુજરાતી (Gujarati)</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-[#CBD5E1] p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`rounded px-2.5 py-1 ${
              viewMode === 'grid' ? 'bg-[#DFF4EF] text-[#0D9488]' : 'text-[#64748B]'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded px-2.5 py-1 ${
              viewMode === 'table' ? 'bg-[#DFF4EF] text-[#0D9488]' : 'text-[#64748B]'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Classes Content */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center text-xs text-[#64748B]">
          <GraduationCap size={32} className="mx-auto text-[#CBD5E1]" />
          <p className="mt-2 font-bold text-[#17324D] text-sm">No classes match the filter criteria</p>
          <p className="mt-1 text-[#94A3B8]">Try selecting &apos;All&apos; standards or clearing your search term.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/app/classes/${c.id}`}
              className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition hover:border-[#0D9488] hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#0D9488]">
                    Standard {c.standard}
                  </span>
                  <span className="text-[11px] font-semibold text-[#64748B]">{c.academicYear}</span>
                </div>

                <h3 className="mt-2 text-base font-bold text-[#17324D] group-hover:text-[#0D9488] transition">
                  {c.name}
                </h3>
                <p className="text-xs text-[#64748B]">
                  Teacher: <strong className="text-[#263238]">{c.classTeacherName}</strong> · {c.medium}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E2E8F0] pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">{t.common.assessed}</span>
                    <span className="font-bold text-[#17324D]">
                      {c.studentsAssessedCount} / {c.enrolledStudentsCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">{t.common.activePlans}</span>
                    <span className="font-bold text-[#0D9488]">{c.activeSupportPlansCount} plans</span>
                  </div>
                </div>

                {/* FLN Progress indicators */}
                <div className="mt-3 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Literacy FLN:</span>
                    <span className="font-bold text-[#17324D]">{c.flnLiteracyPercentage}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EDF2F0]">
                    <div
                      className="h-full rounded-full bg-[#0D9488]"
                      style={{ width: `${c.flnLiteracyPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-xs font-semibold text-[#0D9488]">
                <span>Manage Class & Roster</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E2E8F0] bg-[#F7F9F6] text-[#64748B]">
              <tr>
                <th className="p-3 font-semibold">{t.classes.classRoster}</th>
                <th className="p-3 font-semibold">{t.classes.classTeacher}</th>
                <th className="p-3 font-semibold">{t.common.medium}</th>
                <th className="p-3 font-semibold">{t.common.totalEnrolled}</th>
                <th className="p-3 font-semibold">{t.common.assessed}</th>
                <th className="p-3 font-semibold">{t.common.activePlans}</th>
                <th className="p-3 font-semibold">FLN Coverage</th>
                <th className="p-3 font-semibold text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7FBF9]">
                  <td className="p-3 font-bold text-[#17324D]">
                    <Link href={`/app/classes/${c.id}`} className="hover:text-[#0D9488] hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="p-3 text-[#263238]">{c.classTeacherName}</td>
                  <td className="p-3 text-[#64748B]">{c.medium}</td>
                  <td className="p-3 font-bold text-[#17324D]">{c.enrolledStudentsCount}</td>
                  <td className="p-3 text-[#17324D]">
                    {c.studentsAssessedCount} ({Math.round((c.studentsAssessedCount / c.enrolledStudentsCount) * 100)}%)
                  </td>
                  <td className="p-3 text-[#0D9488] font-bold">{c.activeSupportPlansCount}</td>
                  <td className="p-3">
                    <span className="font-semibold text-[#17324D]">{c.flnLiteracyPercentage}% Lit / {c.flnNumeracyPercentage}% Num</span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/app/classes/${c.id}`}
                      className="font-semibold text-[#0D9488] hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
