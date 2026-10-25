'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import { User as UserRecord, Role } from '@/lib/types'
import { localStore } from '@/lib/storage'
import { auditService } from '@/lib/services/auditService'
import { Button } from '@/components/ui/button'

const INITIAL_STAFF: UserRecord[] = [
  {
    id: 'usr-001',
    displayName: 'Asha Shah (આશાબેન શાહ)',
    role: 'teacher',
    schoolId: 'school-asha-primary',
    assignedClassIds: ['class-std-3a'],
    preferredLocale: 'gu',
    activeStatus: 'Active',
    email: 'asha.shah@ashaprimary.demo',
    phone: '+91 98250 11223',
  },
  {
    id: 'usr-002',
    displayName: 'Govindbhai Parmar (ગોવિંદભાઈ પરમાર)',
    role: 'head_teacher',
    schoolId: 'school-asha-primary',
    assignedClassIds: [],
    preferredLocale: 'gu',
    activeStatus: 'Active',
    email: 'headmaster@ashaprimary.demo',
    phone: '+91 98250 22334',
  },
  {
    id: 'usr-003',
    displayName: 'Bharti Patel (ભારતીબેન પટેલ)',
    role: 'teacher',
    schoolId: 'school-asha-primary',
    assignedClassIds: ['class-std-2a'],
    preferredLocale: 'gu',
    activeStatus: 'Active',
    email: 'bharti.patel@ashaprimary.demo',
    phone: '+91 98250 33445',
  },
  {
    id: 'usr-004',
    displayName: 'Kamlesh Vaghela (કમલેશભાઈ વાઘેલા)',
    role: 'teacher',
    schoolId: 'school-asha-primary',
    assignedClassIds: ['class-std-4a'],
    preferredLocale: 'gu',
    activeStatus: 'Active',
    email: 'kamlesh.v@ashaprimary.demo',
    phone: '+91 98250 44556',
  },
  {
    id: 'usr-005',
    displayName: 'Mukeshbhai Joshi (મુકેશભાઈ જોષી)',
    role: 'crc_coordinator',
    schoolId: 'crc-khambhalia',
    assignedClassIds: [],
    preferredLocale: 'gu',
    activeStatus: 'Active',
    email: 'crc.khambhalia@education.demo',
    phone: '+91 98250 55667',
  },
  {
    id: 'usr-006',
    displayName: 'Smt. R. K. Jadeja, IAS',
    role: 'deo',
    schoolId: 'deo-dwarka',
    assignedClassIds: [],
    preferredLocale: 'en',
    activeStatus: 'Active',
    email: 'deo.dwarka@gujarat.gov.demo',
    phone: '+91 2833 232001',
  },
]

const USERS_STORAGE_KEY = 'saksham_fln_staff_v1'

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserRecord[]>(() =>
    localStore.get<UserRecord[]>(USERS_STORAGE_KEY, INITIAL_STAFF)
  )
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<Role>('teacher')
  const [newPhone, setNewPhone] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  function handleToggleStatus(u: UserRecord) {
    const nextStatus = u.activeStatus === 'Active' ? 'Inactive' : 'Active'
    const nextList = users.map((item) =>
      item.id === u.id ? { ...item, activeStatus: nextStatus as 'Active' | 'Inactive' } : item
    )
    setUsers(nextList)
    localStore.set(USERS_STORAGE_KEY, nextList)
    auditService.logEvent(
      'content_published',
      'user',
      u.id,
      `Changed staff status for ${u.displayName} to ${nextStatus}.`
    )
    showToast(`Staff status updated to ${nextStatus}.`)
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      displayName: newName.trim(),
      role: newRole,
      schoolId: 'school-asha-primary',
      assignedClassIds: [],
      preferredLocale: 'gu',
      activeStatus: 'Active',
      email: newEmail.trim() || 'staff@ashaprimary.demo',
      phone: newPhone.trim() || '+91 98250 00000',
    }

    const nextList = [newUser, ...users]
    setUsers(nextList)
    localStore.set(USERS_STORAGE_KEY, nextList)
    setIsAdding(false)
    setNewName('')
    setNewEmail('')
    setNewPhone('')
    auditService.logEvent(
      'content_published',
      'user',
      newUser.id,
      `Provisioned staff account for ${newUser.displayName} (${newUser.role}).`
    )
    showToast(`Added staff account for ${newUser.displayName}.`)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
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
        <span className="font-semibold text-[#17324D]">Staff & User Management</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <Users size={15} />
            <span>Staff Directory</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Staff & Educator Directory
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Configure teacher class assignments, leadership roles, and platform permissions.
          </p>
        </div>

        <div>
          <Button
            onClick={() => setIsAdding(true)}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" /> Add Staff Member
          </Button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E2E8F0] bg-[#F7F9F6] font-semibold text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Educator / Staff</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Assigned Scope</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F3]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F9F6]/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#17324D]">{u.displayName}</div>
                    <div className="text-[10px] text-[#64748B]">{u.email}</div>
                  </td>

                  <td className="px-3 py-3">
                    <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-semibold text-[#17324D] capitalize">
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-[#64748B]">
                    {u.phone || '—'}
                  </td>

                  <td className="px-3 py-3">
                    {u.assignedClassIds.length > 0 ? (
                      <span className="font-semibold text-[#0D9488]">
                        {u.assignedClassIds.join(', ')}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">School-wide</span>
                    )}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        u.activeStatus === 'Active'
                          ? 'bg-[#DFF4EF] text-[#087F75]'
                          : 'bg-[#F1F5F3] text-[#64748B]'
                      }`}
                    >
                      {u.activeStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      onClick={() => handleToggleStatus(u)}
                      className="h-7 rounded-md border-[#CBD5E1] px-2 text-[11px] font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                    >
                      {u.activeStatus === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg">
            <h2 className="text-base font-bold text-[#17324D]">Add Staff Member</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Provision a new educator account for school FLN management.
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#17324D]">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Meenaben Joshi"
                  required
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as Role)}
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                >
                  <option value="teacher">Subject / Classroom Teacher</option>
                  <option value="head_teacher">Head Teacher</option>
                  <option value="crc_coordinator">CRC Coordinator</option>
                  <option value="deo">District Education Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@ashaprimary.demo"
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Phone Number</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98250 00000"
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
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
                  Save Staff Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
