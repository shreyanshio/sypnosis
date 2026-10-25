'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Building,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  GraduationCap,
  Info,
  MapPin,
  Printer,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

interface TalukaMetric {
  talukaName: string
  talukaNameGu: string
  schoolsCount: number
  studentsCount: number
  assessedCount: number
  coveragePercent: number
  gujaratiFLNPercent: number
  numeracyFLNPercent: number
  remedialPlansActive: number
  supportPriority: string
  actionDirective: string
}

const TALUKA_DATA: TalukaMetric[] = [
  {
    talukaName: 'Khambhalia',
    talukaNameGu: 'ખંભાળિયા',
    schoolsCount: 124,
    studentsCount: 8420,
    assessedCount: 7850,
    coveragePercent: 93,
    gujaratiFLNPercent: 76,
    numeracyFLNPercent: 71,
    remedialPlansActive: 1840,
    supportPriority: 'Normal',
    actionDirective: 'Distribute second batch of straw-bundle manipulative kits to cluster primary schools.',
  },
  {
    talukaName: 'Dwarka',
    talukaNameGu: 'દ્વારકા',
    schoolsCount: 88,
    studentsCount: 5640,
    assessedCount: 5210,
    coveragePercent: 92,
    gujaratiFLNPercent: 79,
    numeracyFLNPercent: 75,
    remedialPlansActive: 1120,
    supportPriority: 'Normal',
    actionDirective: 'Continue weekly CRC peer-mentorship visits on foundational phonics.',
  },
  {
    talukaName: 'Kalyanpur',
    talukaNameGu: 'કલ્યાણપુર',
    schoolsCount: 116,
    studentsCount: 7890,
    assessedCount: 6980,
    coveragePercent: 88,
    gujaratiFLNPercent: 68,
    numeracyFLNPercent: 64,
    remedialPlansActive: 2240,
    supportPriority: 'Supportive Focus',
    actionDirective: 'Organize BRC cluster workshop on 2-digit decomposition and tens-mat pedagogy.',
  },
  {
    talukaName: 'Bhanvad',
    talukaNameGu: 'ભાણવડ',
    schoolsCount: 92,
    studentsCount: 6500,
    assessedCount: 5920,
    coveragePercent: 91,
    gujaratiFLNPercent: 74,
    numeracyFLNPercent: 70,
    remedialPlansActive: 1530,
    supportPriority: 'Normal',
    actionDirective: 'Scale parent WhatsApp micro-learning voice messages in rural clusters.',
  },
]

export default function DistrictOverviewPage() {
  const { t, locale } = useI18n()
  const [selectedTaluka, setSelectedTaluka] = useState<string>('All')

  const totalSchools = TALUKA_DATA.reduce((acc, t) => acc + t.schoolsCount, 0)
  const totalStudents = TALUKA_DATA.reduce((acc, t) => acc + t.studentsCount, 0)
  const totalAssessed = TALUKA_DATA.reduce((acc, t) => acc + t.assessedCount, 0)
  const avgCoverage = Math.round((totalAssessed / totalStudents) * 100)
  const avgGujarati = Math.round(
    TALUKA_DATA.reduce((acc, t) => acc + t.gujaratiFLNPercent * t.assessedCount, 0) / totalAssessed
  )
  const avgNumeracy = Math.round(
    TALUKA_DATA.reduce((acc, t) => acc + t.numeracyFLNPercent * t.assessedCount, 0) / totalAssessed
  )

  const filteredTalukas = TALUKA_DATA.filter(
    (t) => selectedTaluka === 'All' || t.talukaName === selectedTaluka
  )

  function exportDistrictCsv() {
    const header = 'Taluka,Schools,Students,Assessed,Coverage %,Gujarati FLN %,Numeracy FLN %,Active Remedials,Recommended Action Directive\n'
    const rows = filteredTalukas
      .map(
        (t) =>
          `"${t.talukaName}",${t.schoolsCount},${t.studentsCount},${t.assessedCount},${t.coveragePercent}%,${t.gujaratiFLNPercent}%,${t.numeracyFLNPercent}%,${t.remedialPlansActive},"${t.actionDirective}"`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Devbhumi_Dwarka_District_FLN_Overview_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Navigation & District Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:underline"
              >
                <ArrowLeft size={13} /> Return to School App
              </Link>
              <span className="text-xs text-[#CBD5E1]">/</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Collector Office Devbhumi Dwarka
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
              District FLN Monitoring & Governance Dashboard
            </h1>
            <p className="text-sm text-[#64748B]">
              Executive oversight across 4 talukas: Khambhalia, Dwarka, Kalyanpur, and Bhanvad. Problem ID: PS000034.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#17324D] shadow-xs hover:bg-[#F8FAFC]"
            >
              <Printer size={13} className="text-[#0D9488]" />
              <span>Print Briefing</span>
            </button>
            <button
              onClick={exportDistrictCsv}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
            >
              <Download size={13} />
              <span>Export District CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Key Executive Indicators */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
              <span>Government Primary Schools</span>
              <Building size={16} className="text-[#0D9488]" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-[#17324D]">{totalSchools}</div>
            <div className="mt-1 text-[11px] text-[#0D9488]">4 Talukas Covered</div>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
              <span>Diagnostic Coverage</span>
              <Users size={16} className="text-[#0D9488]" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-[#17324D]">{avgCoverage}%</div>
            <div className="mt-1 text-[11px] text-[#64748B]">
              {totalAssessed.toLocaleString()} of {totalStudents.toLocaleString()} Students
            </div>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
              <span>Gujarati Literacy On-Track</span>
              <BookOpen size={16} className="text-[#15803D]" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-[#15803D]">{avgGujarati}%</div>
            <div className="mt-1 text-[11px] text-[#64748B]">Standards 1–5 Benchmark</div>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
              <span>Numeracy On-Track</span>
              <TrendingUp size={16} className="text-[#0D9488]" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-[#17324D]">{avgNumeracy}%</div>
            <div className="mt-1 text-[11px] text-[#64748B]">Place value & basic operations</div>
          </div>
        </div>

        {/* Supportive Taluka Distribution Table */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#17324D]">Taluka Disaggregated Progress Matrix</h2>
              <p className="text-xs text-[#64748B]">
                Focus on targeted educational support, resource distribution, and CRC mentorship.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B]">Filter Taluka:</span>
              <select
                value={selectedTaluka}
                onChange={(e) => setSelectedTaluka(e.target.value)}
                className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-medium text-[#263238]"
              >
                <option value="All">All Talukas (4)</option>
                <option value="Khambhalia">Khambhalia (ખંભાળિયા)</option>
                <option value="Dwarka">Dwarka (દ્વારકા)</option>
                <option value="Kalyanpur">Kalyanpur (કલ્યાણપુર)</option>
                <option value="Bhanvad">Bhanvad (ભાણવડ)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-[#263238]">
              <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <tr>
                  <th className="px-4 py-3">Taluka</th>
                  <th className="px-4 py-3">Schools</th>
                  <th className="px-4 py-3">Coverage</th>
                  <th className="px-4 py-3">Gujarati FLN</th>
                  <th className="px-4 py-3">Numeracy FLN</th>
                  <th className="px-4 py-3">Active Remedials</th>
                  <th className="px-4 py-3">Collectorate Action Directive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredTalukas.map((t) => (
                  <tr key={t.talukaName} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-bold text-[#17324D]">
                      <div>{t.talukaName}</div>
                      <div className="text-[11px] font-normal text-[#0D9488]">{t.talukaNameGu}</div>
                    </td>

                    <td className="px-4 py-3 font-medium text-[#17324D]">{t.schoolsCount}</td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#17324D]">{t.coveragePercent}%</div>
                      <div className="text-[10px] text-[#64748B]">
                        {t.assessedCount.toLocaleString()}/{t.studentsCount.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                          t.gujaratiFLNPercent >= 75
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : 'bg-[#FEF9C3] text-[#A16207]'
                        }`}
                      >
                        {t.gujaratiFLNPercent}%
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                          t.numeracyFLNPercent >= 75
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : 'bg-[#FEF9C3] text-[#A16207]'
                        }`}
                      >
                        {t.numeracyFLNPercent}%
                      </span>
                    </td>

                    <td className="px-4 py-3 font-bold text-[#17324D]">
                      {t.remedialPlansActive.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-xs text-[#475569] max-w-xs">
                      {t.actionDirective}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* District Collector Strategic Action Agenda */}
        <div className="rounded-xl border border-[#8ACFC4] bg-[#DFF4EF]/30 p-5 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#0D9488]" />
            <h3 className="text-sm font-bold text-[#17324D]">
              Collectorate FLN Acceleration Strategy (Devbhumi Dwarka)
            </h3>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg bg-white p-3 border border-[#E2E8F0]">
              <div className="font-bold text-[#17324D]">1. Kalyanpur Focus</div>
              <p className="mt-1 text-[#64748B]">
                Deploy 40 master teachers for a 2-day hands-on workshop on place-value manipulatives to elevate numeracy outcomes.
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-[#E2E8F0]">
              <div className="font-bold text-[#17324D]">2. Tangible Resource Supply</div>
              <p className="mt-1 text-[#64748B]">
                Ensure every Standard 1–3 classroom in Khambhalia and Bhanvad receives straw bundling sets and decodable word cards.
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-[#E2E8F0]">
              <div className="font-bold text-[#17324D]">3. Non-Stigmatizing Reviews</div>
              <p className="mt-1 text-[#64748B]">
                Frame monthly review meetings around support dispatched and gaps closed, completely avoiding competitive school ranking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
