'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Download,
  Filter,
  Layers,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

interface SkillGapData {
  skillId: string
  title: string
  titleGu: string
  subject: 'numeracy' | 'literacy'
  curriculumCode: string
  totalAssessed: number
  demonstratedPercent: number
  emergingPercent: number
  probableGapPercent: number
  topMisconception: string
  recommendedIntervention: string
}

const SKILL_DATA: SkillGapData[] = [
  {
    skillId: 'num-bundling',
    title: 'Place Value Bundling (10s and 1s)',
    titleGu: 'સ્થાન કિંમત અને દસ દસની ભારી નિર્માણ',
    subject: 'numeracy',
    curriculumCode: 'GCERT Class 3 Sem 1 LO-M304',
    totalAssessed: 142,
    demonstratedPercent: 62,
    emergingPercent: 24,
    probableGapPercent: 14,
    topMisconception: 'Reverses digit order (e.g. writes 43 for 3 bundles and 4 loose straws)',
    recommendedIntervention: 'Daily 10-minute tactile straw bundling on dual-column tens mat',
  },
  {
    skillId: 'num-decomposition',
    title: '2-Digit Positional Decomposition',
    titleGu: 'બે અંકની સંખ્યા વિસ્તરણ (દશક-એકમ પાટી)',
    subject: 'numeracy',
    curriculumCode: 'GCERT Class 3 Sem 1 LO-M305',
    totalAssessed: 142,
    demonstratedPercent: 58,
    emergingPercent: 28,
    probableGapPercent: 14,
    topMisconception: 'Confuses decade value with unit face value (writes 50 + 2 = 502)',
    recommendedIntervention: 'Number strip cards and pebble exchange game',
  },
  {
    skillId: 'num-regrouping',
    title: 'Concrete Addition with Regrouping',
    titleGu: 'દસકો લેવાની પાયાની સંકલ્પના',
    subject: 'numeracy',
    curriculumCode: 'GCERT Class 3 Sem 1 LO-M308',
    totalAssessed: 120,
    demonstratedPercent: 52,
    emergingPercent: 32,
    probableGapPercent: 16,
    topMisconception: 'Drops tens carry-over digit and writes double digit in unit column',
    recommendedIntervention: 'Decade leap counter exchange before written column addition',
  },
  {
    skillId: 'guj-matra',
    title: 'Gujarati Phonics & Matra Discrimination',
    titleGu: 'ગુજરાતી માત્રા (કાનો, હ્રસ્વ-દીર્ઘ) ઓળખ અને ઉચ્ચારણ',
    subject: 'literacy',
    curriculumCode: 'GCERT Class 2-3 Gujarati LO-L202',
    totalAssessed: 145,
    demonstratedPercent: 70,
    emergingPercent: 21,
    probableGapPercent: 9,
    topMisconception: 'Confuses Kano (ા) and blank consonant, dropping vowel sound in reading',
    recommendedIntervention: 'Syllable clapping cards and letter-matra pairing puzzle',
  },
  {
    skillId: 'guj-comprehension',
    title: 'Decodable Sentence Comprehension',
    titleGu: 'સરળ વાક્ય વાચન અને અર્થગ્રહણ',
    subject: 'literacy',
    curriculumCode: 'GCERT Class 3 Gujarati LO-L304',
    totalAssessed: 138,
    demonstratedPercent: 66,
    emergingPercent: 22,
    probableGapPercent: 12,
    topMisconception: 'Focuses strictly on mechanical decoding without connecting context',
    recommendedIntervention: 'Illustrated decodable story cards with 2 oral questions',
  },
]

export default function SkillsReportPage() {
  const { t, locale } = useI18n()
  const [subjectFilter, setSubjectFilter] = useState<'All' | 'numeracy' | 'literacy'>('All')

  const filtered = SKILL_DATA.filter((s) => {
    if (subjectFilter !== 'All' && s.subject !== subjectFilter) return false
    return true
  })

  function exportCsv() {
    const header = 'Skill,Gujarati Title,Subject,GCERT Code,Assessed,Demonstrated %,Emerging %,Probable Gap %,Top Misconception,Recommended Intervention\n'
    const rows = filtered
      .map(
        (s) =>
          `"${s.title}","${s.titleGu}","${s.subject}","${s.curriculumCode}",${s.totalAssessed},${s.demonstratedPercent}%,${s.emergingPercent}%,${s.probableGapPercent}%,"${s.topMisconception}","${s.recommendedIntervention}"`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `FLN_Skill_Gap_Distribution_${new Date().toISOString().slice(0, 10)}.csv`
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
          className="border-b-2 border-[#0D9488] px-4 py-2.5 text-xs font-bold text-[#0D9488]"
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
            Competency & Prerequisite Gap Distribution
          </h1>
          <p className="text-xs text-[#64748B]">
            Diagnosed foundational misconceptions and targeted remedial recommendations across standards.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
        >
          <Download size={13} />
          <span>Export Skill Report</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-xs">
        <span className="text-xs font-semibold text-[#64748B]">Subject Filter:</span>
        <button
          onClick={() => setSubjectFilter('All')}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            subjectFilter === 'All' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'
          }`}
        >
          All Competencies
        </button>
        <button
          onClick={() => setSubjectFilter('numeracy')}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            subjectFilter === 'numeracy' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'
          }`}
        >
          Numeracy (ગણિત)
        </button>
        <button
          onClick={() => setSubjectFilter('literacy')}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            subjectFilter === 'literacy' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:bg-[#F1F5F9]'
          }`}
        >
          Literacy (ભાષા)
        </button>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((skill) => (
          <div
            key={skill.skillId}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    skill.subject === 'numeracy'
                      ? 'bg-[#DFF4EF] text-[#0D9488]'
                      : 'bg-[#FEF08A]/40 text-[#854D0E]'
                  }`}
                >
                  {skill.subject}
                </span>
                <h3 className="mt-1 text-sm font-bold text-[#17324D]">{skill.title}</h3>
                <p className="text-xs font-medium text-[#0D9488]">{skill.titleGu}</p>
                <div className="mt-0.5 font-mono text-[10px] text-[#64748B]">{skill.curriculumCode}</div>
              </div>
              <span className="text-xs font-bold text-[#64748B]">{skill.totalAssessed} Assessed</span>
            </div>

            {/* Distribution Multi-Bar */}
            <div>
              <div className="flex justify-between text-[11px] font-medium text-[#64748B] mb-1">
                <span>Mastery Distribution</span>
                <span>
                  <strong className="text-[#15803D]">{skill.demonstratedPercent}%</strong> Demonstrated |{' '}
                  <strong className="text-[#B7791F]">{skill.emergingPercent}%</strong> Emerging |{' '}
                  <strong className="text-[#B42318]">{skill.probableGapPercent}%</strong> Gap
                </span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="bg-[#15803D]"
                  style={{ width: `${skill.demonstratedPercent}%` }}
                  title="Demonstrated"
                />
                <div
                  className="bg-[#B7791F]"
                  style={{ width: `${skill.emergingPercent}%` }}
                  title="Emerging"
                />
                <div
                  className="bg-[#B42318]"
                  style={{ width: `${skill.probableGapPercent}%` }}
                  title="Probable Gap"
                />
              </div>
            </div>

            {/* Top Misconception & Remedial Solution */}
            <div className="rounded-lg bg-[#F8FAFC] p-3 text-xs space-y-1.5 border border-[#E2E8F0]">
              <div className="text-[#B42318] flex items-start gap-1.5">
                <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                <span>
                  <strong>Diagnosed Misconception:</strong> {skill.topMisconception}
                </span>
              </div>
              <div className="text-[#0D9488] flex items-start gap-1.5 pt-1 border-t border-[#E2E8F0]">
                <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                <span>
                  <strong>Remedial Strategy:</strong> {skill.recommendedIntervention}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
