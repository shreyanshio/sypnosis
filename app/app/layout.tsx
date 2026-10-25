'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { OfflineSyncDrawer } from '@/components/offline-sync-drawer'
import { SearchModal } from '@/components/search-modal'
import { NotificationsPopover } from '@/components/notifications-popover'
import { Role } from '@/lib/types'
import { authService } from '@/lib/services/authService'
import { syncService, SyncState } from '@/lib/services/syncService'
import { studentService } from '@/lib/services/studentService'
import { Student } from '@/lib/demo-data'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [offlineDrawerOpen, setOfflineDrawerOpen] = useState(false)

  const [currentRole, setCurrentRole] = useState<Role>(() => authService.getCurrentUser().role)
  const [syncState, setSyncState] = useState<SyncState>(() => syncService.getSyncState())

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Diagnostic Ready: Aarav K.',
      detail: 'Aarav has completed counting stage. 3-minute place-value bundling check ready.',
      time: '10m ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Practice milestone achieved',
      detail: 'Meera P. completed Blend Flashcards with 90% accuracy.',
      time: '2h ago',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Sync reminder',
      detail: '3 assessment records recorded offline are waiting for synchronization.',
      time: 'Yesterday',
      read: true,
    },
  ])

  function handleRoleChanged(newRole: Role) {
    setCurrentRole(newRole)
    authService.setRole(newRole)
    if (newRole === 'parent') {
      router.push('/app/parent')
    }
  }

  // Convert student record to legacy Student format for SearchModal if needed
  const studentsList = studentService.getStudents().map((s) => ({
    id: s.id,
    name: s.name,
    fullName: s.fullName,
    grade: `Class ${s.standard}${s.section}`,
    rollNo: s.rollNo,
    avatar: s.avatar,
    focusSkill: s.prerequisiteGap,
    status: (s.overallStatus === 'Needs Support'
      ? 'Needs support'
      : s.overallStatus === 'Developing'
      ? 'Practising'
      : 'Ready to progress') as Student['status'],
    diagnosticStatus: (s.diagnosticScore ? 'Completed' : 'Pending assessment') as Student['diagnosticStatus'],
    diagnosticScore: s.diagnosticScore,
    prerequisiteGap: s.prerequisiteGap,
    planStatus: (s.planStatus === 'Approved' ? 'Approved' : 'Pending approval') as Student['planStatus'],
    progressPercent: s.progressPercent,
    activities: [],
  }))

  const hasUnread = notifications.some((n) => !n.read)

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#263238]">
      {/* Sidebar */}
      <AppSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentRole={currentRole}
        syncState={syncState}
        onOpenOfflineDrawer={() => setOfflineDrawerOpen(true)}
      />

      {/* Main Content Column */}
      <div className="flex flex-col min-w-0 lg:pl-60">
        <AppHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(!notificationsOpen)}
          onOpenOfflineDrawer={() => setOfflineDrawerOpen(true)}
          syncState={syncState}
          currentRole={currentRole}
          onRoleChanged={handleRoleChanged}
          hasUnreadNotifications={hasUnread}
        />

        {/* Notifications Popover anchor */}
        {notificationsOpen && (
          <div className="relative z-50">
            <NotificationsPopover
              notifications={notifications}
              onClose={() => setNotificationsOpen(false)}
              onMarkAllAsRead={() =>
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
              }
              onSelectAction={(n) => {
                setNotificationsOpen(false)
                if (n.id === 'notif-1') {
                  router.push('/app/students')
                }
              }}
            />
          </div>
        )}

        {/* Viewport Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-7 max-w-[1500px] mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Offline Sync Drawer Modal */}
      <OfflineSyncDrawer
        isOpen={offlineDrawerOpen}
        onClose={() => setOfflineDrawerOpen(false)}
        syncState={syncState}
        onSyncUpdated={(updated) => setSyncState(updated)}
      />

      {/* Global Search Modal */}
      {searchOpen && (
        <SearchModal
          students={studentsList}
          onClose={() => setSearchOpen(false)}
          onSelectStudent={(st) => {
            setSearchOpen(false)
            router.push(`/app/students/${st.id}`)
          }}
        />
      )}
    </div>
  )
}
