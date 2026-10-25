'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { schoolService } from '@/lib/services/schoolService'
import { auditService } from '@/lib/services/auditService'
import { School } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function SchoolAdminPage() {
  const { t } = useI18n()
  const [school, setSchool] = useState<School>(() => schoolService.getSchool())
  const [phone, setPhone] = useState(school.contactPhone || '')
  const [email, setEmail] = useState(school.contactEmail || '')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const updated = schoolService.updateSchool({
      contactPhone: phone,
      contactEmail: email,
    })
    setSchool(updated)
    auditService.logEvent(
      'content_published',
      'user',
      school.id,
      'Updated school administrative contact information.'
    )
    showToast('School administrative profile updated successfully.')
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
        <span className="font-semibold text-[#17324D]">School Profile</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <Building2 size={15} />
            <span>Institutional Profile</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {school.name}
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            UDISE+ Code: <strong className="text-[#17324D]">{school.code}</strong> · Cluster:{' '}
            {school.cluster} · {school.district}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/admin/classes"
            className="flex h-8.5 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <GraduationCap size={14} className="text-[#0D9488]" /> Classes
          </Link>
          <Link
            href="/app/admin/users"
            className="flex h-8.5 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
          >
            <Users size={14} className="text-[#0D9488]" /> Staff
          </Link>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-[#64748B]">Total Enrolled</span>
          <p className="mt-1 text-2xl font-bold text-[#17324D]">{school.totalEnrolled}</p>
          <p className="text-[10px] text-[#64748B]">Standards 1 to 8</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-[#64748B]">Active Staff</span>
          <p className="mt-1 text-2xl font-bold text-[#0D9488]">{school.totalTeachers}</p>
          <p className="text-[10px] text-[#64748B]">Primary Teachers</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-[#64748B]">Mediums</span>
          <p className="mt-1 text-2xl font-bold text-[#17324D]">{school.mediums.length}</p>
          <p className="text-[10px] text-[#64748B]">Gujarati, Hindi, English</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-[#64748B]">Operational Status</span>
          <p className="mt-1 text-2xl font-bold text-[#15803D]">Active</p>
          <p className="text-[10px] text-[#64748B]">Government Primary</p>
        </div>
      </div>

      {/* Details & Editable Contact Info */}
      <form onSubmit={handleSave} className="space-y-5 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[#17324D]">Administrative & Geospatial Location</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-[#64748B]">Cluster</label>
            <input
              type="text"
              readOnly
              value={school.cluster}
              className="mt-1 h-8.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 text-xs text-[#263238]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748B]">Block / Taluka</label>
            <input
              type="text"
              readOnly
              value={school.block}
              className="mt-1 h-8.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 text-xs text-[#263238]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748B]">District & State</label>
            <input
              type="text"
              readOnly
              value={`${school.district}, ${school.state}`}
              className="mt-1 h-8.5 w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 text-xs text-[#263238]"
            />
          </div>
        </div>

        <div className="border-t border-[#F1F5F3] pt-4">
          <h2 className="text-sm font-bold text-[#17324D]">Contact & Communications</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-[#17324D]">Official Phone</label>
              <div className="relative mt-1">
                <Phone className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={14} />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white pl-8 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D]">Official School Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={14} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white pl-8 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F1F5F3] pt-4">
          <label className="block text-xs font-bold text-[#17324D]">Mediums of Instruction Offered</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {school.mediums.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3 py-1 text-xs font-semibold text-[#087F75]"
              >
                <CheckCircle2 size={13} /> {m} Medium
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#F1F5F3]">
          <Button
            type="submit"
            className="h-8.5 rounded-lg bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Save size={13} className="mr-1.5" /> Save School Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
