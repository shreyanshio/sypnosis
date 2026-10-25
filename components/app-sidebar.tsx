'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  Building,
  Calendar,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileText,
  GraduationCap,
  HeartHandshake,
  History,
  HelpCircle,
  LayoutDashboard,
  Layers,
  LogOut,
  MapPin,
  RotateCcw,
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Role } from '@/lib/types'
import { authService } from '@/lib/services/authService'
import { SyncState } from '@/lib/services/syncService'

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentRole: Role
  syncState: SyncState
  onOpenOfflineDrawer: () => void
}

export function AppSidebar({
  isOpen,
  onClose,
  currentRole,
  syncState,
  onOpenOfflineDrawer,
}: AppSidebarProps) {
  const pathname = usePathname()
  const { t, locale } = useI18n()
  const permissions = authService.getPermissions(currentRole)

  // 1. Core Learning Workflows
  const coreItems = [
    { href: '/app/dashboard', label: t.nav.overview, icon: LayoutDashboard },
    { href: '/app/classes', label: t.nav.classes, icon: GraduationCap },
    { href: '/app/students', label: t.nav.students, icon: Users },
    { href: '/app/assessments', label: t.nav.assessments, icon: ClipboardCheck },
    { href: '/app/pathways', label: t.nav.learningPathways, icon: BookOpen },
    { href: '/app/reassessments', label: locale === 'gu' ? 'પુનઃ મૂલ્યાંકન' : 'Reassessments', icon: RotateCcw },
    { href: '/app/actions', label: t.nav.teacherActions, icon: CheckSquare },
  ]

  // 2. Content & Resources
  const contentItems = [
    { href: '/app/resources', label: locale === 'gu' ? 'સંસાધન સંગ્રહ' : 'Resource Library', icon: Layers },
    { href: '/app/question-bank', label: locale === 'gu' ? 'પ્રશ્ન બેંક' : 'Question Bank', icon: HelpCircle },
    { href: '/app/content-management', label: locale === 'gu' ? 'અભ્યાસક્રમ પ્રબંધન' : 'Content Management', icon: Compass },
  ]

  // 3. Governance, Admin & Reports
  const governanceItems = [
    { href: '/app/reports', label: t.nav.reports, icon: BarChart3 },
    { href: '/app/guardians', label: locale === 'gu' ? 'વાલી સંપર્ક' : 'Guardian Directory', icon: HeartHandshake },
    ...(permissions.canManageSchool ? [{ href: '/app/admin/school', label: locale === 'gu' ? 'શાળા પ્રોફાઇલ' : 'School Profile', icon: Building }] : []),
    ...(permissions.canManageAcademicYears ? [{ href: '/app/admin/academic-years', label: locale === 'gu' ? 'શૈક્ષણિક વર્ષ' : 'Academic Years', icon: Calendar }] : []),
    ...(permissions.canManageUsers ? [{ href: '/app/admin/users', label: locale === 'gu' ? 'શિક્ષક સ્ટાફ' : 'Staff Directory', icon: UserCheck }] : []),
    { href: '/app/audit-history', label: locale === 'gu' ? 'ઓડિટ લોગ' : 'Audit Trail', icon: History },
    { href: '/district/overview', label: locale === 'gu' ? 'જિલ્લા ડેશબોર્ડ' : 'District Overview', icon: MapPin },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col justify-between bg-[#17324D] text-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Scrollable Navigation */}
        <div className="flex flex-col min-h-0 flex-1">
          {/* Brand Header */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <Link href="/app/dashboard" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#0D9488] text-white font-bold text-sm shadow-xs">
                SF
              </div>
              <div>
                <div className="text-sm font-bold leading-tight text-white">{t.appName}</div>
                <div className="text-[9px] uppercase tracking-wider text-[#8ACFC4]">Devbhumi Dwarka</div>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label={t.common.close}
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 text-xs font-medium">
            {/* Core Section */}
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                {locale === 'gu' ? 'પાયાનું શિક્ષણ' : 'Foundational Learning'}
              </div>
              <div className="flex flex-col gap-0.5">
                {coreItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/app/dashboard' && pathname?.startsWith(item.href))
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition ${
                        isActive
                          ? 'bg-white/15 font-bold text-white shadow-xs'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-[#8ACFC4]' : 'text-white/60'} />
                      <span className="truncate">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto opacity-70" />}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                {locale === 'gu' ? 'સંસાધનો' : 'Instructional Content'}
              </div>
              <div className="flex flex-col gap-0.5">
                {contentItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href)
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition ${
                        isActive
                          ? 'bg-white/15 font-bold text-white shadow-xs'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-[#8ACFC4]' : 'text-white/60'} />
                      <span className="truncate">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto opacity-70" />}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Governance & Admin Section */}
            <div>
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                {locale === 'gu' ? 'પ્રશાસન અને અહેવાલો' : 'Governance & Records'}
              </div>
              <div className="flex flex-col gap-0.5">
                {governanceItems.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href)
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition ${
                        isActive
                          ? 'bg-white/15 font-bold text-white shadow-xs'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-[#8ACFC4]' : 'text-white/60'} />
                      <span className="truncate">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto opacity-70" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Area: Offline Sync & Exit Workspace */}
        <div className="shrink-0 p-3 border-t border-white/10 bg-[#142b42]">
          <div
            onClick={onOpenOfflineDrawer}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8ACFC4]">
                {syncState.isSimulatedOffline ? <WifiOff size={13} /> : <Wifi size={13} />}
                <span>
                  {syncState.isSimulatedOffline
                    ? t.common.offline
                    : syncState.pendingCount > 0
                    ? `${syncState.pendingCount} pending sync`
                    : t.common.synced}
                </span>
              </div>
              <span className="text-[10px] text-white/40">Terminal</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-white/80 truncate">{t.schoolName}</p>
          </div>

          <Link
            href="/"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 py-1.5 text-center text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={13} />
            <span>{t.nav.exitWorkspace}</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
