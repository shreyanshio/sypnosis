'use client'

import React, { useState } from 'react'
import {
  Bell,
  ChevronDown,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { Role } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { authService, DEMO_PROFILES } from '@/lib/services/authService'
import { SyncState } from '@/lib/services/syncService'
import { LanguageSelector } from '@/components/language-selector'
import { localStore } from '@/lib/storage'

interface AppHeaderProps {
  onOpenSidebar: () => void
  onOpenSearch: () => void
  onOpenNotifications: () => void
  onOpenOfflineDrawer: () => void
  syncState: SyncState
  currentRole: Role
  onRoleChanged: (newRole: Role) => void
  hasUnreadNotifications?: boolean
}

const ROLES_LIST: Array<{ id: Role; labelEn: string; labelGu: string; labelHi: string }> = [
  { id: 'teacher', labelEn: 'Teacher (Asha Shah)', labelGu: 'શિક્ષક (આશાબેન)', labelHi: 'शिक्षिका (आशा शाह)' },
  { id: 'head_teacher', labelEn: 'Head Teacher (Govindbhai)', labelGu: 'મુખ્ય શિક્ષક (ગોવિંદભાઈ)', labelHi: 'પ્રધાનાધ્યાપક (ગોવિંદભાઈ)' },
  { id: 'crc_coordinator', labelEn: 'CRC Coordinator (Khambhalia)', labelGu: 'સી.આર.સી. સંયોજક', labelHi: 'સી.આર.સી. સમન્વયક' },
  { id: 'deo', labelEn: 'DEO (Devbhumi Dwarka)', labelGu: 'જિલ્લા શિક્ષણાધિકારી (DEO)', labelHi: 'જિલ્લા શિક્ષા અધિકારી' },
  { id: 'parent', labelEn: 'Parent (Rameshbhai)', labelGu: 'વાલી પોર્ટલ (રમેશભાઈ)', labelHi: 'અભિભાવક (રમેશભાઈ)' },
]

export function AppHeader({
  onOpenSidebar,
  onOpenSearch,
  onOpenNotifications,
  onOpenOfflineDrawer,
  syncState,
  currentRole,
  onRoleChanged,
  hasUnreadNotifications,
}: AppHeaderProps) {
  const { locale, t } = useI18n()
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)
  const [resetToast, setResetToast] = useState(false)

  const activeUser = DEMO_PROFILES[currentRole]

  function handleResetPresentationState() {
    localStore.resetWorkspace()
    setResetConfirmOpen(false)
    setResetToast(true)
    setTimeout(() => {
      window.location.reload()
    }, 700)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-6">
      {/* Toast alert on presentation reset */}
      {resetToast && (
        <div className="fixed right-6 top-16 z-50 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-4 py-2 text-xs font-bold text-[#087F75] shadow-lg animate-in fade-in">
          ✓ Presentation dataset restored to initial state. Reloading...
        </div>
      )}

      {/* Left: Mobile burger & School Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="flex size-9 items-center justify-center rounded-lg border border-[#CBD5E1] text-[#17324D] hover:bg-[#F1F5F3] lg:hidden"
          aria-label={t.nav.expandSidebar}
        >
          <Menu size={18} />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="font-bold text-[#17324D]">{t.schoolName}</span>
            <span>·</span>
            <span className="text-[11px]">{t.districtName}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Reset Demo / Presentation State button */}
        <button
          type="button"
          onClick={() => setResetConfirmOpen(true)}
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 py-1 text-[11px] font-semibold text-[#64748B] hover:border-[#CBD5E1] hover:text-[#17324D] transition"
          title="Reset presentation data to initial clean state for video walkthrough"
        >
          <RotateCcw size={12} className="opacity-70" />
          <span>Reset Demo</span>
        </button>

        {/* Role Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 py-1 text-xs font-semibold text-[#17324D] hover:border-[#0D9488]"
            title="Switch User Role View"
          >
            <ShieldCheck size={14} className="text-[#0D9488]" />
            <span className="max-w-[110px] truncate sm:max-w-[150px]">
              {ROLES_LIST.find((r) => r.id === currentRole)?.[
                locale === 'gu' ? 'labelGu' : locale === 'hi' ? 'labelHi' : 'labelEn'
              ]}
            </span>
            <ChevronDown size={12} className="opacity-60" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-9 z-50 w-56 rounded-xl border border-[#E2E8F0] bg-white py-1.5 shadow-xl">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                {t.reports.roleView}
              </div>
              {ROLES_LIST.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    onRoleChanged(r.id)
                    setRoleMenuOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition ${
                    currentRole === r.id
                      ? 'bg-[#DFF4EF] font-bold text-[#0D9488]'
                      : 'text-[#263238] hover:bg-[#F7F9F6]'
                  }`}
                >
                  <span>
                    {locale === 'gu' ? r.labelGu : locale === 'hi' ? r.labelHi : r.labelEn}
                  </span>
                  {currentRole === r.id && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Unified Multilingual Language Selector Component */}
        <LanguageSelector variant="pill" />

        {/* Offline Sync Status Badge / Trigger */}
        <button
          type="button"
          onClick={onOpenOfflineDrawer}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
            syncState.isSimulatedOffline
              ? 'border border-[#B7791F]/30 bg-[#FFF5D9] text-[#B7791F]'
              : syncState.pendingCount > 0
              ? 'border border-[#CBD5E1] bg-[#F1F5F3] text-[#17324D]'
              : 'border border-[#BFE2DA] bg-[#DFF4EF] text-[#15803D]'
          }`}
          title="Click to manage sync queue & offline state"
        >
          {syncState.isSimulatedOffline ? (
            <>
              <WifiOff size={13} />
              <span className="hidden md:inline">{t.common.offline}</span>
            </>
          ) : (
            <>
              <Wifi size={13} />
              <span className="hidden md:inline">{t.common.online}</span>
            </>
          )}

          {syncState.pendingCount > 0 && (
            <span className="rounded-full bg-[#17324D] px-1.5 py-0.2 text-[10px] font-bold text-white">
              {syncState.pendingCount}
            </span>
          )}
        </button>

        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex size-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:border-[#0D9488] hover:text-[#17324D]"
          aria-label={t.common.search}
          title={t.common.search}
        >
          <Search size={16} />
        </button>

        {/* Notifications Button */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative flex size-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:border-[#0D9488] hover:text-[#17324D]"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={16} />
          {hasUnreadNotifications && (
            <span className="absolute right-1 top-1 size-2 rounded-full bg-[#B7791F] ring-2 ring-white" />
          )}
        </button>

        {/* User Pill */}
        <div className="hidden items-center gap-2 border-l border-[#E2E8F0] pl-2.5 sm:flex">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#17324D] text-[11px] font-bold text-white">
            {activeUser.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-[#17324D] max-w-[90px] truncate">
            {activeUser.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-[#17324D]">Reset Presentation Data?</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              This will restore all student records, classroom rosters, and assessment attempts back to the official deterministic starting state for jury demonstration.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="rounded-lg border border-[#CBD5E1] px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetPresentationState}
                className="rounded-lg bg-[#0D9488] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                Reset to Baseline
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
