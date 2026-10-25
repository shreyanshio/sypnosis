'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Clock,
  Download,
  Filter,
  History,
  Search,
  Shield,
  ShieldCheck,
  User,
  CheckCircle2,
  Calendar,
  FileText,
} from 'lucide-react'
import { auditService } from '@/lib/services/auditService'
import { AuditEvent, Role } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'

export default function AuditHistoryPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('All')
  const [roleFilter, setRoleFilter] = useState<string>('All')

  const events = auditService.getEvents({
    eventType: eventTypeFilter,
    role: roleFilter,
    search: search.trim() ? search : undefined,
  })

  function exportAuditCsv() {
    const header = 'Timestamp,Actor,Role,Event Type,Entity Type,Entity ID,Summary,Context Detail\n'
    const rows = events
      .map(
        (e) =>
          `"${e.timestamp}","${e.actorName}","${e.role}","${e.eventType}","${e.entityType}","${e.entityId}","${e.summary}","${e.contextDetail || ''}"`
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `FLN_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488]">
              <ShieldCheck size={13} />
              Tamper-Evident Event Log
            </span>
            <span className="text-xs text-[#64748B]">Devbhumi Dwarka FLN Governance</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            System Audit Trail & Accountability History
          </h1>
          <p className="text-sm text-[#64748B]">
            Verifiable log of diagnostic assessments, learning plan approvals, content verifications, and classroom assignments.
          </p>
        </div>

        <button
          onClick={exportAuditCsv}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
        >
          <Download size={13} />
          <span>Export Audit Log CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Total Logged Events</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">{events.length}</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">Append-only storage</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Assessment Events</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">
            {events.filter((e) => e.eventType.includes('assessment')).length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Diagnostics recorded</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Remedial Approvals</div>
          <div className="mt-1 text-xl font-bold text-[#15803D]">
            {events.filter((e) => e.eventType === 'plan_approved').length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Teacher authorizations</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Curriculum Actions</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">
            {events.filter((e) => e.eventType === 'content_published').length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Resource review checks</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by actor name, summary, or details..."
            className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] py-2 pl-9 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
          >
            <option value="All">All Event Types</option>
            <option value="plan_approved">Plan Approved</option>
            <option value="assessment_completed">Assessment Completed</option>
            <option value="activity_completed">Activity Completed</option>
            <option value="content_published">Content Published</option>
            <option value="class_reassigned">Class Reassigned</option>
            <option value="reassessment_scheduled">Reassessment Scheduled</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
          >
            <option value="All">All Roles</option>
            <option value="teacher">Teacher</option>
            <option value="head_teacher">Head Teacher</option>
            <option value="crc_coordinator">CRC Coordinator</option>
            <option value="deo">District Education Officer</option>
            <option value="parent">Parent</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor & Role</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Entity Reference</th>
                <th className="px-4 py-3">Action Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {events.map((evt) => {
                const dateStr = new Date(evt.timestamp).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })

                return (
                  <tr key={evt.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                      {dateStr}
                    </td>

                    <td className="px-4 py-3 font-semibold text-[#17324D]">
                      <div>{evt.actorName}</div>
                      <div className="text-[10px] text-[#0D9488] uppercase tracking-wider">
                        {evt.role.replace('_', ' ')}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-block rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#475569]">
                        {evt.eventType}
                      </span>
                    </td>

                    <td className="px-4 py-3 font-mono text-[10px] text-[#64748B]">
                      <div>{evt.entityType}</div>
                      <div className="text-[#17324D]">{evt.entityId}</div>
                    </td>

                    <td className="px-4 py-3 text-xs">
                      <div className="font-medium text-[#17324D]">{evt.summary}</div>
                      {evt.contextDetail && (
                        <div className="mt-0.5 text-[11px] text-[#64748B]">{evt.contextDetail}</div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
