'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Users,
  Eye,
} from 'lucide-react'
import { guardianService, GuardianContact } from '@/lib/services/guardianService'
import { auditService } from '@/lib/services/auditService'
import { useI18n } from '@/lib/i18n/context'

export default function GuardiansPage() {
  const { t, locale } = useI18n()
  const [guardians, setGuardians] = useState<GuardianContact[]>(() =>
    guardianService.getGuardians()
  )
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState<string>('All')
  const [selectedGuardian, setSelectedGuardian] = useState<GuardianContact | null>(null)
  const [smsMessage, setSmsMessage] = useState('')
  const [smsModalOpen, setSmsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  function handleOpenSms(g: GuardianContact) {
    setSelectedGuardian(g)
    setSmsMessage(
      `નમસ્તે ${g.guardianName}, ${g.studentName} એ આજે શાળામાં દશક-એકમની પ્રવૃત્તિ સફળતાપૂર્વક પૂર્ણ કરી છે. ઘરે ૫ મિનિટ ૧૦-૧૦ ની ભારી બનાવવાનો મહાવરો કરાવશો. - આશા પ્રાથમિક શાળા`
    )
    setSmsModalOpen(true)
  }

  function handleSendSms(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedGuardian) return

    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'student_updated',
      entityType: 'student',
      entityId: selectedGuardian.studentId,
      summary: `Sent home-support SMS to guardian ${selectedGuardian.guardianName} (${selectedGuardian.phone})`,
    })

    showToast(`SMS dispatch simulated to ${selectedGuardian.guardianName} (${selectedGuardian.phone})`)
    setSmsModalOpen(false)
  }

  function handleChannelChange(studentId: string, newChannel: GuardianContact['preferredChannel']) {
    guardianService.updateGuardianPreferences(studentId, { preferredChannel: newChannel })
    setGuardians(guardianService.getGuardians())
    showToast('Guardian preferred channel updated.')
  }

  const filtered = guardians.filter((g) => {
    if (channelFilter !== 'All' && g.preferredChannel !== channelFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        g.guardianName.toLowerCase().includes(q) ||
        g.studentName.toLowerCase().includes(q) ||
        g.phone.includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DFF4EF] px-2.5 py-0.5 text-xs font-semibold text-[#0D9488]">
              <HeartHandshake size={13} />
              Parental Involvement & Home Learning
            </span>
            <span className="text-xs text-[#64748B]">Devbhumi Dwarka</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            {locale === 'gu' ? 'વાલી સંપર્ક અને ગૃહ શિક્ષણ રજીસ્ટર' : 'Guardian Directory & Home Support Hub'}
          </h1>
          <p className="text-sm text-[#64748B]">
            Maintain parental communication channels, track home activity consent, and deliver 5-minute daily practice prompts.
          </p>
        </div>

        <Link
          href="/app/parent"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0b7c72]"
        >
          <Eye size={14} />
          <span>Preview Parent Portal</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Enrolled Guardians</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">{guardians.length} Registered</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">100% Mobile Linked</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Consent Documented</div>
          <div className="mt-1 text-xl font-bold text-[#15803D]">100%</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Formal parental consent</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Portal Active</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">
            {guardians.filter((g) => g.preferredChannel === 'Portal').length} Families
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Using voice audio web app</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Language Breakdown</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">100% Gujarati</div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Localized SMS & Audio</div>
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
            placeholder="Search by guardian name, child name, or mobile number..."
            className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] py-2 pl-9 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
          >
            <option value="All">All Channels</option>
            <option value="Portal">Web Portal</option>
            <option value="SMS">SMS Notification</option>
            <option value="Physical Card">Physical Card</option>
          </select>
        </div>
      </div>

      {/* Guardians Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Guardian & Relationship</th>
                <th className="px-4 py-3">Child / Student</th>
                <th className="px-4 py-3">Phone & Channel</th>
                <th className="px-4 py-3">Consent Status</th>
                <th className="px-4 py-3">Last Contacted</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((g) => (
                <tr key={g.studentId} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3 font-semibold text-[#17324D]">
                    <div>{g.guardianName}</div>
                    <div className="text-[10px] text-[#64748B]">{g.relationship}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-bold text-[#17324D]">{g.studentName}</span>
                    <div className="font-mono text-[10px] text-[#64748B]">{g.studentId}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#17324D]">
                      <Phone size={11} className="text-[#0D9488]" />
                      <span>{g.phone}</span>
                    </div>
                    <select
                      value={g.preferredChannel}
                      onChange={(e) => handleChannelChange(g.studentId, e.target.value as any)}
                      className="mt-1 rounded-md border border-[#E2E8F0] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0D9488]"
                    >
                      <option value="Portal">Portal (Audio Web)</option>
                      <option value="SMS">SMS Messages</option>
                      <option value="Physical Card">Physical Printed Card</option>
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
                      <ShieldCheck size={11} />
                      Consent Active
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[#64748B] text-xs">
                    {g.lastContactedDate}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenSms(g)}
                        className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F9]"
                      >
                        <MessageSquare size={12} className="text-[#0D9488]" />
                        <span>Send SMS</span>
                      </button>
                      <Link
                        href={`/guardian/progress/${g.studentId}`}
                        className="inline-flex items-center gap-1 rounded-md bg-[#17324D] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#1f4265]"
                      >
                        <span>Card</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMS Compose Modal */}
      {smsModalOpen && selectedGuardian && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Send Home Practice SMS</h2>
                <p className="text-xs text-[#64748B]">
                  To: {selectedGuardian.guardianName} ({selectedGuardian.phone})
                </p>
              </div>
              <button
                onClick={() => setSmsModalOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendSms} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#17324D]">Gujarati Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs leading-relaxed text-[#263238] focus:border-[#0D9488] focus:outline-hidden"
                />
              </div>

              <div className="rounded-lg bg-[#DFF4EF]/40 p-2.5 text-[11px] text-[#0D9488]">
                Standard 160-character cellular SMS. Plain language without jargon, designed for quick parent understanding.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSmsModalOpen(false)}
                  className="rounded-lg border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
                >
                  <Send size={13} />
                  <span>Send SMS Notification</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
