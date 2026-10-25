import { SyncQueueItem } from '@/lib/types'

export interface SyncState {
  isOnline: boolean
  isSimulatedOffline: boolean
  isSyncing: boolean
  lastSyncedAt: string
  pendingCount: number
  queue: SyncQueueItem[]
}

const STORAGE_KEY = 'saksham_fln_sync_v1'

const INITIAL_QUEUE: SyncQueueItem[] = [
  {
    id: 'sync-item-1',
    operation: 'assessment_submit',
    entity: 'assessment',
    entityId: 'asmt-3a-num-01',
    payload: { studentId: 'aarav-k', score: 67 },
    queuedAt: 'Today, 8:30 AM',
    status: 'pending',
    retryCount: 0,
  },
  {
    id: 'sync-item-2',
    operation: 'activity_complete',
    entity: 'student',
    entityId: 'meera-p',
    payload: { activityId: 'act-meera-1', status: 'completed' },
    queuedAt: 'Today, 9:15 AM',
    status: 'pending',
    retryCount: 0,
  },
  {
    id: 'sync-item-3',
    operation: 'update',
    entity: 'action',
    entityId: 'act-003',
    payload: { status: 'Completed' },
    queuedAt: 'Today, 10:00 AM',
    status: 'pending',
    retryCount: 0,
  },
]

export const syncService = {
  getSyncState: (): SyncState => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return {
      isOnline: true,
      isSimulatedOffline: false,
      isSyncing: false,
      lastSyncedAt: 'Today, 8:45 AM',
      pendingCount: INITIAL_QUEUE.length,
      queue: INITIAL_QUEUE,
    }
  },

  saveSyncState: (state: SyncState): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {
        // Ignore
      }
    }
  },

  toggleSimulatedOffline: (): SyncState => {
    const current = syncService.getSyncState()
    const updated: SyncState = {
      ...current,
      isSimulatedOffline: !current.isSimulatedOffline,
      isOnline: current.isSimulatedOffline, // if was simulated offline, turning off makes it online
    }
    syncService.saveSyncState(updated)
    return updated
  },

  triggerSync: async (): Promise<SyncState> => {
    const current = syncService.getSyncState()
    if (current.isSimulatedOffline) {
      throw new Error('Device is currently in simulated offline mode. Turn off offline simulation to sync.')
    }

    // Mark syncing
    const syncingState: SyncState = { ...current, isSyncing: true }
    syncService.saveSyncState(syncingState)

    // Simulate async sync operation
    await new Promise((resolve) => setTimeout(resolve, 800))

    const completedState: SyncState = {
      ...current,
      isSyncing: false,
      isOnline: true,
      lastSyncedAt: 'Just now',
      pendingCount: 0,
      queue: [],
    }
    syncService.saveSyncState(completedState)
    return completedState
  },

  queueOperation: (item: Omit<SyncQueueItem, 'id' | 'queuedAt' | 'status'>): void => {
    const current = syncService.getSyncState()
    const newItem: SyncQueueItem = {
      ...item,
      id: `sync-item-${Date.now()}`,
      queuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
    }
    const updated: SyncState = {
      ...current,
      pendingCount: current.pendingCount + 1,
      queue: [newItem, ...current.queue],
    }
    syncService.saveSyncState(updated)
  },
}
