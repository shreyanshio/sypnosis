'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  GraduationCap,
  Info,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { classService } from '@/lib/services/classService'
import { studentService } from '@/lib/services/studentService'
import { useI18n } from '@/lib/i18n/context'

interface ClassProgressMetric {
  classId: string
  name: string
  standard: number
  section: string
  medium: string
  teacherName: string
  totalStudents: number
  assessedCount: number
  coveragePercent: number
  literacyOnTrackPercent: number
  numeracyOnTrackPercent: number
  activeRemedialPlans: number
  supportPriority: 'Normal' | 'Supportive Visit Needed'
}

const CLASS_DATA: ClassProgressMetric[] = [
  {
    classId: 'class-std-1a',
    name: 'Standard 1A',
    standard: 1,
    section: 'A',
    medium: 'Gujarati',
    teacherName: 'Kailashben Vaghela',
    totalStudents: 28,
    assessedCount: 26,
    coveragePercent: 93,
    literacyOnTrackPercent: 78,
    numeracyOnTrackPercent: 82,
    activeRemedialPlans: 5,
    supportPriority: 'Normal',
  },
  {
    classId: 'class-std-2a',
    name: 'Standard 2A',
    standard: 2,
    section: 'A',
    medium: 'Gujarati',
    teacherName: 'Bhavna Patel',
    totalStudents: 30,
    assessedCount: 27,
    coveragePercent: 90,
    literacyOnTrackPercent: 72,
    numeracyOnTrackPercent: 74,
    activeRemedialPlans: 7,
    supportPriority: 'Normal',
  },
  {
    classId: 'class-std-3a',
    name: 'Standard 3A',
    standard: 3,
    section: 'A',
    medium: 'Gujarati',
    teacherName: 'Asha Shah',
    totalStudents: 32,
    assessedCount: 30,
    coveragePercent: 94,
    literacyOnTrackPercent: 68,
    numeracyOnTrackPercent: 65,
    activeRemedialPlans: 10,
    supportPriority: 'Supportive Visit Needed',
  },
  {
    classId: 'class-std-4a',
    name: 'Standard 4A',
    standard: 4,
    section: 'A',
    medium: 'Gujarati',
    teacherName: 'Nilesh Parmar',
    totalStudents: 31,
    assessedCount: 28,
    coveragePercent: 90,
    literacyOnTrackPercent: 81,
    numeracyOnTrackPercent: 79,
    activeRemedialPlans: 6,
    supportPriority: 'Normal',
  },
  {
    classId: 'class-std-5a',
    name: 'Standard 5A',
    standard: 5,
    section: 'A',
    medium: 'Gujarati',
    teacherName: 'Hansaben Joshi',
    totalStudents: 29,
    assessedCount: 29,
    coveragePercent: 100,
    literacyOnTrackPercent: 86,
    numeracyOnTrackPercent: 83,
    activeRemedialPlans: 4,
    supportPriority: 'Normal',
  },
]

export default function ClassReportsPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [standardFilter, setStandardFilter] = useState<string>('All')

  const filtered = CLASS_DATA.filter((c) => {
    if (standardFilter !== 'All' && c.standard.toString() !== standardFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        c.name.toLowerCase().includes(q) ||
        c.teacherName.toLowerCase().includes(q) ||
        c.medium.toLowerCase().includes(q)
      )
    }
    return true
  })

  function exportClassCsv() {
    const header = 'Class,Standard,Teacher,Medium,Total Students,Assessed,Coverage %,Literacy On-Track %,Numeracy On-Track %,Active Remedial Plans\n'
    const rows = filtered
      .map(
        (c) =>
          `"${c.name}",${c.standard},"${c.teacherName}","${c.medium}",${c.totalStudents},${c.assessedCount},${c.coveragePercent}%,${c.literacyOnTrackPercent}%,${c.numeracyOnTrackPercent}%,${c.activeRemedialPlans}`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Asha_Primary_Class_Coverage_Report_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex border-b border-[#E2E8F0]">
        <Link
          href="/app/reports"
          className="border-b-2 border-transparent px-4 py-2.5 text-xs font-bold text-[#64748B] hover:text-[#17324D]"
        >
          Executive Overview
        </Link>
        <Link
          href="/app/reports/classes"
          className="border-b-2 border-[#0D9488] px-4 py-2.5 text-xs font-bold text-[#0D9488]"
        >
          Class-by-Class Coverage
        </Link>
        <Link
          href="/app/reports/skills"
          className="border-b-2 border-transparent px-4 py-2.5 text-xs font-bold text-[#64748B] hover:text-[#17324D]"
        >
          Skill Diagnostics & Gaps
        </Link>
        <Link
          href="/app/reports/assessments"
          className="border-b-2 border-transparent px-4 py-2.5 text-xs font-bold text-[#64748B] hover:text-[#17324D]"
        >
          Assessment Metrics
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17324D]">
            Disaggregated Classroom Progress & Coverage
          </h1>
          <p className="text-xs text-[#64748B]">
            Class-level breakdown of diagnostic coverage, foundational mastery levels, and remedial plans in Asha Primary School.
          </p>
        </div>

        <button
          onClick={exportClassCsv}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
        >
          <Download size={13} />
          <span>Export Class CSV</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class or teacher name..."
            className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] py-1.5 pl-9 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={standardFilter}
            onChange={(e) => setStandardFilter(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
          >
            <option value="All">All Standards</option>
            <option value="1">Standard 1</option>
            <option value="2">Standard 2</option>
            <option value="3">Standard 3</option>
            <option value="4">Standard 4</option>
            <option value="5">Standard 5</option>
          </select>
        </div>
      </div>

      {/* Disaggregated Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Class & Medium</th>
                <th className="px-4 py-3">Assigned Teacher</th>
                <th className="px-4 py-3">Diagnostic Coverage</th>
                <th className="px-4 py-3">Gujarati FLN On-Track</th>
                <th className="px-4 py-3">Numeracy FLN On-Track</th>
                <th className="px-4 py-3">Active Remedials</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((item) => (
                <tr key={item.classId} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3 font-semibold text-[#17324D]">
                    <div>{item.name}</div>
                    <div className="text-[10px] font-normal text-[#64748B]">{item.medium} Medium</div>
                  </td>

                  <td className="px-4 py-3 text-[#263238] font-medium">
                    {item.teacherName}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 rounded-full bg-[#E2E8F0] h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#0D9488]"
                          style={{ width: `${item.coveragePercent}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[#17324D]">{item.coveragePercent}%</span>
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      {item.assessedCount}/{item.totalStudents} students
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                        item.literacyOnTrackPercent >= 75
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEF9C3] text-[#A16207]'
                      }`}
                    >
                      {item.literacyOnTrackPercent}%
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                        item.numeracyOnTrackPercent >= 75
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEF9C3] text-[#A16207]'
                      }`}
                    >
                      {item.numeracyOnTrackPercent}%
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-[#17324D]">{item.activeRemedialPlans}</span>
                    <span className="text-[10px] text-[#64748B]"> students</span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/app/classes/${item.classId}`}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F9]"
                    >
                      <span>Class Workspace</span>
                      <ChevronRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
