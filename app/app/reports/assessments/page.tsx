'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Layers,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { assessmentService } from '@/lib/services/assessmentService'
import { useI18n } from '@/lib/i18n/context'

interface AssessmentCycleMetric {
  id: string
  title: string
  titleGu: string
  standard: number
  subject: 'numeracy' | 'literacy'
  scheduledClass: string
  totalEnrolled: number
  completedAttempts: number
  avgScorePercent: number
  avgDurationMinutes: number
  probableGapsFlagged: number
  audioListenPercent: number
}

const ASSESSMENT_METRICS: AssessmentCycleMetric[] = [
  {
    id: 'fln-num-diag-01',
    title: 'Standard 3 Diagnostic Assessment — Numeracy',
    titleGu: 'ધોરણ ૩ નિદાનાત્મક કસોટી — ગણિત (સ્થાન કિંમત)',
    standard: 3,
    subject: 'numeracy',
    scheduledClass: 'Standard 3A',
    totalEnrolled: 32,
    completedAttempts: 30,
    avgScorePercent: 71,
    avgDurationMinutes: 4.5,
    probableGapsFlagged: 9,
    audioListenPercent: 68,
  },
  {
    id: 'fln-lit-diag-01',
    title: 'Standard 3 Diagnostic Assessment — Gujarati Literacy',
    titleGu: 'ધોરણ ૩ નિદાનાત્મક કસોટી — ગુજરાતી ભાષા (માત્રા ઓળખ)',
    standard: 3,
    subject: 'literacy',
    scheduledClass: 'Standard 3A',
    totalEnrolled: 32,
    completedAttempts: 29,
    avgScorePercent: 74,
    avgDurationMinutes: 4.2,
    probableGapsFlagged: 6,
    audioListenPercent: 82,
  },
  {
    id: 'fln-num-diag-02',
    title: 'Standard 2 Baseline Check — Number Recognition',
    titleGu: 'ધોરણ ૨ પ્રારંભિક ચકાસણી — અંક ઓળખ અને ગણતરી',
    standard: 2,
    subject: 'numeracy',
    scheduledClass: 'Standard 2A',
    totalEnrolled: 30,
    completedAttempts: 27,
    avgScorePercent: 78,
    avgDurationMinutes: 3.8,
    probableGapsFlagged: 5,
    audioListenPercent: 85,
  },
  {
    id: 'fln-num-diag-03',
    title: 'Standard 4 Mid-Term Review — Concrete Multiplication',
    titleGu: 'ધોરણ ૪ સત્રાંત સમીક્ષા — ગુણાકાર સંકલ્પના',
    standard: 4,
    subject: 'numeracy',
    scheduledClass: 'Standard 4A',
    totalEnrolled: 31,
    completedAttempts: 28,
    avgScorePercent: 69,
    avgDurationMinutes: 5.5,
    probableGapsFlagged: 8,
    audioListenPercent: 42,
  },
]

export default function AssessmentReportsPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')

  const filtered = ASSESSMENT_METRICS.filter((a) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        a.title.toLowerCase().includes(q) ||
        a.titleGu.toLowerCase().includes(q) ||
        a.scheduledClass.toLowerCase().includes(q)
      )
    }
    return true
  })

  function exportCsv() {
    const header = 'Assessment,Gujarati Title,Standard,Subject,Class,Enrolled,Completed,Avg Score %,Avg Duration (min),Gaps Flagged,Audio % Usage\n'
    const rows = filtered
      .map(
        (a) =>
          `"${a.title}","${a.titleGu}",${a.standard},"${a.subject}","${a.scheduledClass}",${a.totalEnrolled},${a.completedAttempts},${a.avgScorePercent}%,${a.avgDurationMinutes},${a.probableGapsFlagged},${a.audioListenPercent}%`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Assessment_Cycle_Metrics_${new Date().toISOString().slice(0, 10)}.csv`
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
          className="border-b-2 border-transparent px-4 py-2.5 text-xs font-bold text-[#64748B] hover:text-[#17324D]"
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
          className="border-b-2 border-[#0D9488] px-4 py-2.5 text-xs font-bold text-[#0D9488]"
        >
          Assessment Metrics
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17324D]">
            Diagnostic Assessment Cycle Metrics
          </h1>
          <p className="text-xs text-[#64748B]">
            Completion integrity, test duration, audio read-aloud engagement, and misconception detection.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
        >
          <Download size={13} />
          <span>Export Metrics CSV</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Total Attempts</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">114 Logged</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">93% completion rate</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Average Duration</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">4.4 Minutes</div>
          <div className="mt-0.5 text-[11px] text-[#15803D]">Non-fatiguing micro-test</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Audio Read-Aloud</div>
          <div className="mt-1 text-xl font-bold text-[#0D9488]">69% Utilized</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Supports emergent readers</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Gaps Identified</div>
          <div className="mt-1 text-xl font-bold text-[#B42318]">28 Specific Needs</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Routed to 5-day plans</div>
        </div>
      </div>

      {/* Assessment Metrics Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Assessment Instrument</th>
                <th className="px-4 py-3">Target Class</th>
                <th className="px-4 py-3">Attempts & Completion</th>
                <th className="px-4 py-3">Avg Accuracy</th>
                <th className="px-4 py-3">Avg Duration</th>
                <th className="px-4 py-3">Audio Support</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#17324D]">{item.title}</div>
                    <div className="text-[11px] text-[#0D9488]">{item.titleGu}</div>
                  </td>

                  <td className="px-4 py-3 font-semibold text-[#17324D]">
                    {item.scheduledClass}
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-[#17324D]">
                      {item.completedAttempts}/{item.totalEnrolled}
                    </span>
                    <span className="text-[10px] text-[#64748B]">
                      {' '}({Math.round((item.completedAttempts / item.totalEnrolled) * 100)}%)
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                        item.avgScorePercent >= 75
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEF9C3] text-[#A16207]'
                      }`}
                    >
                      {item.avgScorePercent}%
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[#64748B]">
                    <div className="flex items-center gap-1 font-semibold text-[#17324D]">
                      <Clock size={12} className="text-[#0D9488]" />
                      <span>{item.avgDurationMinutes} mins</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[#0D9488] font-semibold">
                      <Volume2 size={12} />
                      <span>{item.audioListenPercent}%</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/app/assessments/${item.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F9]"
                    >
                      <span>Open Assessment</span>
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
