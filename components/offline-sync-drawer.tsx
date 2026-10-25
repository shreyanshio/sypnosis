'use client'

import React, { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Cloud,
  CloudOff,
  Loader2,
  RefreshCw,
  Server,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'
import { SyncState, syncService } from '@/lib/services/syncService'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

interface OfflineSyncDrawerProps {
  isOpen: boolean
  onClose: () => void
  syncState: SyncState
  onSyncUpdated: (newState: SyncState) => void
}

export function OfflineSyncDrawer({
  isOpen,
  onClose,
  syncState,
  onSyncUpdated,
}: OfflineSyncDrawerProps) {
  const { t } = useI18n()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  if (!isOpen) return null

  async function handleTriggerSync() {
    setIsSyncing(true)
    setErrorMessage(null)
    setSyncFeedback(null)

    try {
      const updated = await syncService.triggerSync()
      onSyncUpdated(updated)
      setSyncFeedback('All offline student assessments and milestone records synced successfully!')
      setTimeout(() => setSyncFeedback(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sync failed'
      setErrorMessage(msg)
    } finally {
      setIsSyncing(false)
    }
  }

  function handleToggleOffline() {
    const updated = syncService.toggleSimulatedOffline()
    onSyncUpdated(updated)
    setErrorMessage(null)
    setSyncFeedback(
      updated.isSimulatedOffline
        ? 'Offline simulation enabled. Records will now be queued locally on this device.'
        : 'Offline simulation disabled. Device is back online.'
    )
    setTimeout(() => setSyncFeedback(null), 4000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${
                syncState.isSimulatedOffline || !syncState.isOnline
                  ? 'bg-[#FFF5D9] text-[#B7791F]'
                  : 'bg-[#DFF4EF] text-[#0D9488]'
              }`}
            >
              {syncState.isSimulatedOffline || !syncState.isOnline ? <WifiOff size={20} /> : <Wifi size={20} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">Device Synchronization & Offline State</h3>
              <p className="text-xs text-[#64748B]">Asha Primary School · Terminal ID: DWK-SCH-01</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F3]"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Callout */}
        <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9F6] p-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#17324D]">Network Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold ${
                syncState.isSimulatedOffline
                  ? 'bg-[#FFF5D9] text-[#B7791F]'
                  : syncState.isOnline
                  ? 'bg-[#DFF4EF] text-[#15803D]'
                  : 'bg-[#FDEDEB] text-[#B42318]'
              }`}
            >
              <span className="size-2 rounded-full bg-current" />
              {syncState.isSimulatedOffline
                ? 'Simulated Offline Mode'
                : syncState.isOnline
                ? 'Online · Connected'
                : 'Disconnected'}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[#64748B]">
            <span>Last Successful Sync:</span>
            <span className="font-medium text-[#17324D]">{syncState.lastSyncedAt}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[#64748B]">
            <span>Pending Local Queue:</span>
            <span className="font-bold text-[#0D9488]">{syncState.pendingCount} record(s)</span>
          </div>
        </div>

        {/* Feedback Alerts */}
        {syncFeedback && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#BFE2DA] bg-[#DFF4EF] p-3 text-xs font-semibold text-[#15803D]">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#F0C2BB] bg-[#FDEDEB] p-3 text-xs font-semibold text-[#B42318]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Queue Items */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#17324D]">
            <span>Pending Offline Queue</span>
            <span className="text-[#64748B]">{syncState.queue.length} operation(s)</span>
          </div>

          <div className="mt-2.5 max-h-48 overflow-y-auto divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] bg-white">
            {syncState.queue.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#64748B]">
                <CheckCircle2 size={24} className="mx-auto text-[#15803D]" />
                <p className="mt-2 font-semibold text-[#17324D]">Queue is Clear</p>
                <p className="mt-0.5 text-[#94A3B8]">All local records are in sync with the central server.</p>
              </div>
            ) : (
              syncState.queue.map((item) => (
                <div key={item.id} className="p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#17324D] capitalize">
                      {(item.operation || 'update').replace('_', ' ')}: {item.entity || item.entityType || 'record'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                      <Clock size={11} /> {item.queuedAt}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    Entity ID: <code className="bg-[#F1F5F3] px-1 rounded">{item.entityId}</code>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Testing Control: Simulate Offline */}
        <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9F6] p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#17324D]">Offline Testing Simulation Control</p>
              <p className="text-[11px] text-[#64748B]">
                Simulate remote rural connectivity conditions with zero internet.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleOffline}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                syncState.isSimulatedOffline
                  ? 'bg-[#B7791F] text-white hover:bg-[#975A16]'
                  : 'border border-[#CBD5E1] bg-white text-[#17324D] hover:bg-[#F1F5F3]'
              }`}
            >
              {syncState.isSimulatedOffline ? 'Disable Offline Mode' : 'Enable Offline Mode'}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-lg border-[#CBD5E1] px-4 text-xs font-medium text-[#17324D]"
          >
            Close
          </Button>

          <Button
            type="button"
            disabled={isSyncing || syncState.isSimulatedOffline}
            onClick={handleTriggerSync}
            className="h-9 rounded-lg bg-[#0D9488] px-5 text-xs font-bold text-white shadow-xs hover:bg-[#087F75]"
          >
            {isSyncing ? (
              <>
                <Loader2 size={14} className="mr-1.5 animate-spin" /> Synchronizing...
              </>
            ) : (
              <>
                <RefreshCw size={14} className="mr-1.5" /> Synchronize Now ({syncState.pendingCount})
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
