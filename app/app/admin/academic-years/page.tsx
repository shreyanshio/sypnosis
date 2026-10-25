'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { academicYearService } from '@/lib/services/academicYearService'
import { auditService } from '@/lib/services/auditService'
import { AcademicYear } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function AcademicYearsPage() {
  const [years, setYears] = useState<AcademicYear[]>(() =>
    academicYearService.getAcademicYears()
  )
  const [newLabel, setNewLabel] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleSetActive(year: AcademicYear) {
    academicYearService.setActiveYear(year.id)
    setYears(academicYearService.getAcademicYears())
    auditService.logEvent(
      'content_published',
      'classroom',
      year.id,
      `Designated Academic Year ${year.label} as Active.`
    )
    showToast(`Academic Year ${year.label} is now active.`)
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage(null)

    if (!newLabel.trim()) {
      setErrorMessage('Please enter an academic year label (e.g. 2027-2028).')
      return
    }

    if (years.some((y) => y.label.toLowerCase() === newLabel.trim().toLowerCase())) {
      setErrorMessage(`Academic Year ${newLabel.trim()} already exists.`)
      return
    }

    const created = academicYearService.addAcademicYear({
      label: newLabel.trim(),
      startDate: startDate || '2027-06-15',
      endDate: endDate || '2028-04-30',
      status: 'Upcoming',
    })

    setYears(academicYearService.getAcademicYears())
    setIsAdding(false)
    setNewLabel('')
    setStartDate('')
    setEndDate('')
    auditService.logEvent(
      'content_published',
      'classroom',
      created.id,
      `Created new Academic Year ${created.label}.`
    )
    showToast(`Created Academic Year ${created.label}.`)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
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
        <span className="font-semibold text-[#17324D]">Academic Years</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <Calendar size={15} />
            <span>Academic Cycle Management</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Academic Years
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Configure active and archival academic cycles for student cohorts and reporting.
          </p>
        </div>

        <div>
          <Button
            onClick={() => setIsAdding(true)}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" /> New Academic Year
          </Button>
        </div>
      </div>

      {/* Academic Years List */}
      <div className="space-y-3">
        {years.map((year) => {
          const isActive = year.status === 'Active'

          return (
            <div
              key={year.id}
              className={`flex flex-col justify-between gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center ${
                isActive
                  ? 'border-[#0D9488] bg-[#DFF4EF]/20 shadow-xs'
                  : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    isActive ? 'bg-[#0D9488] text-white' : 'bg-[#F1F5F3] text-[#17324D]'
                  }`}
                >
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#17324D]">{year.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? 'bg-[#DFF4EF] text-[#087F75]'
                          : year.status === 'Upcoming'
                          ? 'bg-[#E0F2FE] text-[#0284C7]'
                          : 'bg-[#F1F5F3] text-[#64748B]'
                      }`}
                    >
                      {year.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Duration: {year.startDate} to {year.endDate}
                  </p>
                </div>
              </div>

              <div>
                {isActive ? (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#DFF4EF] px-3 py-1 text-xs font-bold text-[#087F75]">
                    <CheckCircle2 size={13} /> Currently Active
                  </span>
                ) : (
                  <Button
                    onClick={() => handleSetActive(year)}
                    variant="outline"
                    className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                  >
                    Set as Active Year
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Academic Year Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg">
            <h2 className="text-base font-bold text-[#17324D]">Create Academic Year</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Define a new academic cycle for student enrollment and assessment reporting.
            </p>

            {errorMessage && (
              <div className="mt-3 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] p-2.5 text-xs text-[#B42318]">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#17324D]">Academic Year Label</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. 2027-2028"
                  required
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17324D]">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  />
                </div>
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
                  Save Academic Year
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
