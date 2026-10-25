import { Notification } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    recipientId: 'usr-teacher-01',
    type: 'assessment_review',
    title: 'Diagnostic Ready: Aarav Kumar',
    message: 'Aarav has completed counting check. Place-value straw bundling assessment ready for teacher review.',
    createdAt: '10m ago',
    read: false,
    targetRoute: '/app/students/aarav-k',
  },
  {
    id: 'notif-002',
    recipientId: 'usr-teacher-01',
    type: 'activity_completed',
    title: 'Practice milestone achieved: Meera Patel',
    message: 'Meera completed Blend Flashcards with 90% accuracy in morning circle.',
    createdAt: '2h ago',
    read: false,
    targetRoute: '/app/pathways',
  },
  {
    id: 'notif-003',
    recipientId: 'usr-teacher-01',
    type: 'sync_status',
    title: 'Offline records pending synchronization',
    message: '3 assessment records recorded offline are awaiting network synchronization.',
    createdAt: 'Yesterday',
    read: true,
    targetRoute: '/app/dashboard',
  },
  {
    id: 'notif-004',
    recipientId: 'usr-teacher-01',
    type: 'action_due',
    title: 'Action Due Today: Group B Place Value',
    message: 'Conduct 12-minute tactile straw bundling check with Aarav and Rohan.',
    createdAt: '1d ago',
    read: true,
    targetRoute: '/app/actions',
  },
]

export const notificationService = {
  getNotifications: (): Notification[] => {
    return localStore.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  },

  markAsRead: (id: string): void => {
    const list = notificationService.getNotifications()
    const nextList = list.map((n) => (n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n))
    localStore.set(STORAGE_KEYS.NOTIFICATIONS, nextList)
  },

  markAllAsRead: (): void => {
    const list = notificationService.getNotifications()
    const nextList = list.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() }))
    localStore.set(STORAGE_KEYS.NOTIFICATIONS, nextList)
  },

  addNotification: (notif: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification => {
    const list = notificationService.getNotifications()
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: 'Just now',
      read: false,
    }
    const nextList = [newNotif, ...list]
    localStore.set(STORAGE_KEYS.NOTIFICATIONS, nextList)
    return newNotif
  },
}
