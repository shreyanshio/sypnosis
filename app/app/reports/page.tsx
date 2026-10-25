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
  ShieldCheck,
  TrendingUp,
  Users,
  Wifi,
} from 'lucide-react'
import { reportService, RoleReportData } from '@/lib/services/reportService'
import { Role } from '@/lib/types'
import { authService } from '@/lib/services/authService'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function ReportsPage() {
  const { t } = useI18n()
  const [selectedRole, setSelectedRole] = useState<Role>(() => authService.getCurrentUser().role)
  const [report, setReport] = useState<RoleReportData>(() => reportService.getRoleReport(selectedRole))
  const [timeframe, setTimeframe] = useState<'term1' | 'term2' | 'annual'>('term1')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleRoleChange(newRole: Role) {
    setSelectedRole(newRole)
    setReport(reportService.getRoleReport(newRole))
  }

  function handleExportCsv() {
    reportService.exportReportCsv(selectedRole)
    showToast(`Official ${selectedRole.toUpperCase()} CSV report downloaded.`)
  }

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Title and Scope */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <BarChart3 size={15} />
            <span>FLN Progress & Governance Reports</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {report.title}
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{report.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCsv}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Download size={13} className="mr-1.5" />
            <span>Export Official CSV</span>
          </Button>
        </div>
      </div>

      {/* Role Perspective Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-2.5">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
          <ShieldCheck size={15} className="text-[#0D9488]" />
          <span className="font-semibold text-[#17324D]">Perspective:</span>
        </div>

        <div className="flex flex-wrap gap-1 rounded-lg border border-[#CBD5E1] bg-[#F7F9F6] p-0.5 text-xs">
          {[
            ['teacher', 'Teacher (Class 3A)'],
            ['head_teacher', 'Head Teacher (School)'],
            ['crc_coordinator', 'CRC Coordinator (Cluster)'],
            ['deo', 'DEO (District)'],
          ].map(([r, label]) => {
            const isActive = selectedRole === r
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r as Role)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  isActive ? 'bg-white font-semibold text-[#0D9488] shadow-xs' : 'text-[#64748B] hover:text-[#17324D]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'term1' | 'term2' | 'annual')}
            aria-label="Filter report timeframe"
            className="h-7.5 rounded-md border border-[#CBD5E1] bg-white px-2 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="term1">Term 1 Baseline (Current)</option>
            <option value="term2">Term 2 Progress</option>
            <option value="annual">Annual Academic Target</option>
          </select>
        </div>
      </div>

      {/* 4 Summary Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {report.summaryMetrics.map((m, i) => (
          <div key={i} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <span className="text-xs font-medium text-[#64748B]">{m.label}</span>
            <p className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">{m.value}</p>
            <p className="mt-0.5 text-[11px] text-[#0D9488]">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Core Health Rates Grid (Assessment Coverage, Remedial Completion, Offline Sync) */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-[#17324D]">Diagnostic Assessment Coverage</span>
            <span className="font-bold text-[#0D9488]">{report.assessmentCoverageRate}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#E2E8F0]">
            <div
              className="h-2 rounded-full bg-[#0D9488]"
              style={{ width: `${report.assessmentCoverageRate}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-[#64748B]">Enrolled students screened</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-[#17324D]">Remedial Pathway Completion</span>
            <span className="font-bold text-[#0D9488]">{report.remedialPlanCompletionRate}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#E2E8F0]">
            <div
              className="h-2 rounded-full bg-[#0D9488]"
              style={{ width: `${report.remedialPlanCompletionRate}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-[#64748B]">5-day micro-activities validated</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-[#17324D]">Offline Data Sync Health</span>
            <span className="font-bold text-[#15803D]">{report.offlineSyncHealthRate}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-[#E2E8F0]">
            <div
              className="h-2 rounded-full bg-[#15803D]"
              style={{ width: `${report.offlineSyncHealthRate}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-[#64748B]">Device queue sync within 24 hours</p>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="border-b border-[#E2E8F0] bg-[#F7F9F6] px-4 py-3">
          <h2 className="text-sm font-bold text-[#17324D]">
            {selectedRole === 'teacher'
              ? 'Foundational Micro-Competency Coverage (Class 3A)'
              : 'Class-Wise Foundational Coverage & Mastery'}
          </h2>
          <p className="text-xs text-[#64748B]">
            Pedagogical metrics disaggregated by educational cohort
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E2E8F0] bg-[#F7F9F6]/60 font-semibold text-[#64748B]">
              <tr>
                <th className="px-4 py-3">{selectedRole === 'teacher' ? 'Competency' : 'Standard'}</th>
                <th className="px-3 py-3">Enrolled</th>
                <th className="px-3 py-3">Assessed</th>
                <th className="px-3 py-3">Coverage %</th>
                <th className="px-3 py-3">Literacy %</th>
                <th className="px-4 py-3">Numeracy %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F3]">
              {report.gradeBreakdown.map((row, i) => (
                <tr key={i} className="hover:bg-[#F7F9F6]/60 transition">
                  <td className="px-4 py-3 font-bold text-[#17324D]">{row.standard}</td>
                  <td className="px-3 py-3 text-[#263238]">{row.enrolled}</td>
                  <td className="px-3 py-3 text-[#263238]">{row.assessed}</td>
                  <td className="px-3 py-3 font-semibold text-[#0D9488]">{row.coveragePercent}%</td>
                  <td className="px-3 py-3">
                    {row.literacyMastery > 0 ? (
                      <span className="font-semibold text-[#17324D]">{row.literacyMastery}%</span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {row.numeracyMastery > 0 ? (
                      <span className="font-semibold text-[#17324D]">{row.numeracyMastery}%</span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cluster / Taluka Trend Cards for CRC & DEO Roles */}
      {report.clusterTrend && report.clusterTrend.length > 0 && (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#17324D]">
            {selectedRole === 'deo' ? 'Taluka FLN Progress Comparison' : 'Cluster Schools Coverage Comparison'}
          </h2>
          <p className="text-xs text-[#64748B]">
            Intervention monitoring to allocate cluster academic support resources
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {report.clusterTrend.map((c, i) => (
              <div key={i} className="rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] p-3 text-xs">
                <p className="font-bold text-[#17324D] truncate">{c.name}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Assessed:</span>
                    <span className="font-bold text-[#0D9488]">{c.coverageRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Remedial Rate:</span>
                    <span className="font-bold text-[#17324D]">{c.remedialRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance / Pedagogical Notice */}
      <div className="rounded-xl border border-[#BFE2DA] bg-[#DFF4EF]/40 p-4 text-xs text-[#087F75] leading-relaxed">
        <Info size={16} className="inline mr-1.5 mb-0.5" />
        <strong>FLN Reporting Principles:</strong> In accordance with National Education Policy (NEP) and NIPUN Bharat foundational learning guidelines, administrative reports emphasize diagnostic coverage, prerequisite bridging, and formative growth. Comparative school league tables and student rankings are deliberately avoided to eliminate stigmatization.
      </div>
    </div>
  )
}
