import {
  AcademicYear,
  AuditEvent,
  Classroom,
  LearningActivity,
  LearningPlanRecord,
  Notification,
  Question,
  School,
  StudentRecord,
  TeacherActionRecord,
  User,
} from '@/lib/types'

export const STORAGE_VERSION = 1
const VERSION_KEY = 'saksham_fln_storage_version'

export const STORAGE_KEYS = {
  SCHOOL: 'saksham_fln_school_v1',
  ACADEMIC_YEARS: 'saksham_fln_academic_years_v1',
  USERS: 'saksham_fln_users_v1',
  CLASSES: 'saksham_fln_classes_v1',
  STUDENTS: 'saksham_fln_students_v1',
  ASSESSMENTS: 'saksham_fln_assessments_v1',
  QUESTIONS: 'saksham_fln_questions_v1',
  ACTIVITIES: 'saksham_fln_activities_v1',
  PLANS: 'saksham_fln_learning_plans_v1',
  ACTIONS: 'saksham_fln_actions_v1',
  NOTIFICATIONS: 'saksham_fln_notifications_v1',
  AUDIT: 'saksham_fln_audit_events_v1',
  LOCALE: 'saksham_fln_locale',
  CURRENT_USER_ROLE: 'saksham_fln_role',
} as const

export const localStore = {
  get: <T>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback
    try {
      const data = localStorage.getItem(key)
      if (!data) return fallback
      return JSON.parse(data) as T
    } catch {
      return fallback
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`[localStore] Failed to write key ${key}:`, err)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore
    }
  },

  isInitialized: (): boolean => {
    if (typeof window === 'undefined') return false
    const version = localStorage.getItem(VERSION_KEY)
    return version === `${STORAGE_VERSION}`
  },

  markInitialized: (): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(VERSION_KEY, `${STORAGE_VERSION}`)
  },

  resetWorkspace: (): void => {
    if (typeof window === 'undefined') return
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
    localStorage.removeItem(VERSION_KEY)
  },
}
