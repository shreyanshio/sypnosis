'use client'

import { Bell, CheckCheck, Clock, Info, X } from 'lucide-react'

interface NotificationItem {
  id: string
  title: string
  detail: string
  time: string
  read: boolean
}

interface NotificationsPopoverProps {
  notifications: NotificationItem[]
  onClose: () => void
  onMarkAllAsRead: () => void
  onSelectAction?: (notif: NotificationItem) => void
}

export function NotificationsPopover({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectAction,
}: NotificationsPopoverProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="absolute right-0 top-12 z-40 w-80 sm:w-96 rounded-2xl border border-[#d8e2df] bg-white p-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#e8efed] pb-3">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[#0d9488]" />
          <h4 className="text-sm font-semibold text-[#17324d]">Notifications</h4>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#f4b544] px-1.5 py-0.2 text-[10px] font-bold text-[#17324d]">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[11px] font-medium text-[#0d9488] hover:underline"
            >
              Mark all read
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748b] hover:bg-[#f1f5f3]"
            aria-label="Close notifications"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="mt-2 max-h-72 overflow-y-auto divide-y divide-[#edf2f0]">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#94a3b8]">No notifications at this time</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectAction && onSelectAction(n)}
              className={`p-3 transition cursor-pointer hover:bg-[#f7fbf9] ${n.read ? 'opacity-70' : 'bg-[#fbfdfc]'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#17324d]">{n.title}</span>
                <span className="text-[10px] text-[#94a3b8]">{n.time}</span>
              </div>
              <p className="mt-1 text-xs text-[#64748b] leading-4">{n.detail}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 border-t border-[#e8efed] pt-2.5 text-center text-[10px] text-[#94a3b8]">
        Simulated demo notifications · Asha Primary School
      </div>
    </div>
  )
}
