import { AuditEvent } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'
import { authService } from '@/lib/services/authService'

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'audit-001',
    actorId: 'usr-teacher-01',
    actorName: 'Asha Shah',
    role: 'teacher',
    eventType: 'assessment_completed',
    entityType: 'assessment',
    entityId: 'asmt-3a-lit-01',
    timestamp: '2026-10-24T09:30:00Z',
    summary: 'Class 3 Gujarati Reading Diagnostic completed for 3 learners.',
    contextDetail: 'Class 3A · Baseline coverage verified at 100%.',
  },
  {
    id: 'audit-002',
    actorId: 'usr-teacher-01',
    actorName: 'Asha Shah',
    role: 'teacher',
    eventType: 'plan_approved',
    entityType: 'plan',
    entityId: 'plan-aarav-k',
    timestamp: '2026-10-24T10:15:00Z',
    summary: 'Approved 5-day Concrete Bundling Pathway for Aarav Kumar.',
    contextDetail: 'Tactile straw bundling manipulative practice validated.',
  },
  {
    id: 'audit-003',
    actorId: 'usr-head-01',
    actorName: 'Hasmukhbhai Joshi',
    role: 'head_teacher',
    eventType: 'class_reassigned',
    entityType: 'classroom',
    entityId: 'class-std-3a',
    timestamp: '2026-10-20T11:00:00Z',
    summary: 'Assigned Teacher Asha Shah as Class Teacher for Standard 3 - A.',
    contextDetail: 'Academic Year 2025-2026 provisioning.',
  },
  {
    id: 'audit-004',
    actorId: 'usr-crc-01',
    actorName: 'Rameshbhai Patel',
    role: 'crc_coordinator',
    eventType: 'content_published',
    entityType: 'activity',
    entityId: 'act-res-01',
    timestamp: '2026-10-18T14:20:00Z',
    summary: 'Curriculum verified and published: Pencil & Straw Bundles Kit.',
    contextDetail: 'Aligned with GCERT Class 3 Sem 1 LO-M304.',
  },
]

export const auditService = {
  getEvents: (filter?: {
    eventType?: string
    entityType?: string
    role?: string
    search?: string
  }): AuditEvent[] => {
    let list = localStore.get<AuditEvent[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_EVENTS)

    return list.filter((e) => {
      if (filter?.eventType && filter.eventType !== 'All' && e.eventType !== filter.eventType) return false
      if (filter?.entityType && filter.entityType !== 'All' && e.entityType !== filter.entityType) return false
      if (filter?.role && filter.role !== 'All' && e.role !== filter.role) return false
      if (filter?.search) {
        const term = filter.search.toLowerCase().trim()
        const matchSummary = e.summary.toLowerCase().includes(term)
        const matchActor = e.actorName.toLowerCase().includes(term)
        const matchDetail = e.contextDetail ? e.contextDetail.toLowerCase().includes(term) : false
        if (!matchSummary && !matchActor && !matchDetail) return false
      }
      return true
    })
  },

  logEvent: (
    eventOrType:
      | AuditEvent['eventType']
      | (Partial<AuditEvent> & {
          eventType: AuditEvent['eventType']
          entityType: AuditEvent['entityType']
          entityId: string
          summary: string
          contextDetail?: string
        }),
    argEntityType?: AuditEvent['entityType'],
    argEntityId?: string,
    argSummary?: string,
    argContextDetail?: string
  ): void => {
    const currentUser = authService.getCurrentUser()
    let newEvent: AuditEvent

    if (typeof eventOrType === 'object') {
      newEvent = {
        id: `audit-${Date.now()}`,
        actorId: eventOrType.actorId || currentUser.id,
        actorName: eventOrType.actorName || currentUser.displayName,
        role: eventOrType.role || currentUser.role,
        eventType: eventOrType.eventType,
        entityType: eventOrType.entityType,
        entityId: eventOrType.entityId,
        timestamp: eventOrType.timestamp || new Date().toISOString(),
        summary: eventOrType.summary,
        contextDetail: eventOrType.contextDetail,
      }
    } else {
      newEvent = {
        id: `audit-${Date.now()}`,
        actorId: currentUser.id,
        actorName: currentUser.displayName,
        role: currentUser.role,
        eventType: eventOrType,
        entityType: argEntityType!,
        entityId: argEntityId!,
        timestamp: new Date().toISOString(),
        summary: argSummary!,
        contextDetail: argContextDetail,
      }
    }

    const list = localStore.get<AuditEvent[]>(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_EVENTS)
    const nextList = [newEvent, ...list]
    localStore.set(STORAGE_KEYS.AUDIT, nextList)
  },
}
