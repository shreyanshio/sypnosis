'use client'

import React, { useState } from 'react'
import {
  Bell,
  ChevronDown,
  Globe,
  Languages,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  User,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { Role, Locale } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { authService, DEMO_PROFILES } from '@/lib/services/authService'
import { SyncState } from '@/lib/services/syncService'

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
  { id: 'head_teacher', labelEn: 'Head Teacher (Govindbhai)', labelGu: 'મુખ્ય શિક્ષક (ગોવિંદભાઈ)', labelHi: 'प्रधानाध्यापक (गोविंदभाई)' },
  { id: 'crc_coordinator', labelEn: 'CRC Coordinator (Khambhalia)', labelGu: 'સી.આર.સી. સંયોજક', labelHi: 'सी.आर.सी. समन्वयक' },
  { id: 'deo', labelEn: 'DEO (Devbhumi Dwarka)', labelGu: 'જિલ્લા શિક્ષણાધિકારી (DEO)', labelHi: 'जिला शिक्षा अधिकारी' },
  { id: 'parent', labelEn: 'Parent (Rameshbhai)', labelGu: 'વાલી પોર્ટલ (રમેશભાઈ)', labelHi: 'अभिभावक (रमेशभाई)' },
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
  const { locale, setLocale, t } = useI18n()
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const activeUser = DEMO_PROFILES[currentRole]

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 sm:px-6">
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setRoleMenuOpen(!roleMenuOpen)
              setLangMenuOpen(false)
            }}
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

        {/* Real Language Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setLangMenuOpen(!langMenuOpen)
              setRoleMenuOpen(false)
            }}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] px-2.5 py-1 text-xs font-bold text-[#17324D] hover:border-[#0D9488]"
            title="Change Application Language"
          >
            <Languages size={14} className="text-[#0D9488]" />
            <span>
              {locale === 'gu' ? 'ગુજરાતી' : locale === 'hi' ? 'हिन्दी' : 'English'}
            </span>
            <ChevronDown size={12} className="opacity-60" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 top-9 z-50 w-36 rounded-xl border border-[#E2E8F0] bg-white py-1.5 shadow-xl">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Language
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocale('en')
                  setLangMenuOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-xs ${
                  locale === 'en' ? 'bg-[#DFF4EF] font-bold text-[#0D9488]' : 'text-[#263238] hover:bg-[#F7F9F6]'
                }`}
              >
                <span>English</span>
                {locale === 'en' && '✓'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocale('gu')
                  setLangMenuOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-xs ${
                  locale === 'gu' ? 'bg-[#DFF4EF] font-bold text-[#0D9488]' : 'text-[#263238] hover:bg-[#F7F9F6]'
                }`}
              >
                <span>ગુજરાતી</span>
                {locale === 'gu' && '✓'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocale('hi')
                  setLangMenuOpen(false)
                }}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-xs ${
                  locale === 'hi' ? 'bg-[#DFF4EF] font-bold text-[#0D9488]' : 'text-[#263238] hover:bg-[#F7F9F6]'
                }`}
              >
                <span>हिन्दी</span>
                {locale === 'hi' && '✓'}
              </button>
            </div>
          )}
        </div>

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
    </header>
  )
}
