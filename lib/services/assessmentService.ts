import { AssessmentRecord, Locale, SkillCategory } from '@/lib/types'

export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'asmt-3a-num-01',
    title: 'Class 3 Foundational Numeracy Baseline (સ્થાન કિંમત અને જૂથ ગણતરી)',
    titleGu: 'ધોરણ ૩ પાયાનું ગણિત નિદાન: સ્થાન કિંમત અને વિસ્તરણ',
    classId: 'class-std-3a',
    standard: 3,
    subject: 'numeracy',
    language: 'gu',
    status: 'In Progress',
    targetStudentIds: ['aarav-k', 'meera-p', 'dev-r'],
    completedCount: 2,
    totalCount: 3,
    estimatedMinutes: 12,
    scheduledDate: '2026-10-24',
    rubricTemplateId: 'fln-num-baseline-v1',
  },
  {
    id: 'asmt-3a-lit-01',
    title: 'Class 3 Foundational Gujarati Reading (મૂળાક્ષર, માત્રા અને વાક્ય વાચન)',
    titleGu: 'ધોરણ ૩ ગુજરાતી ભાષા વાચન અને અર્થગ્રહણ ચકાસણી',
    classId: 'class-std-3a',
    standard: 3,
    subject: 'literacy',
    language: 'gu',
    status: 'Completed',
    targetStudentIds: ['aarav-k', 'meera-p', 'dev-r'],
    completedCount: 3,
    totalCount: 3,
    estimatedMinutes: 10,
    scheduledDate: '2026-10-20',
    completedDate: '2026-10-21',
    rubricTemplateId: 'fln-lit-baseline-v1',
  },
  {
    id: 'asmt-2a-num-01',
    title: 'Class 2 Early Number Sense & Quantity Comparison',
    titleGu: 'ધોરણ ૨ સંખ્યા જ્ઞાન અને સરખામણી ચકાસણી',
    classId: 'class-std-2a',
    standard: 2,
    subject: 'numeracy',
    language: 'gu',
    status: 'Scheduled',
    targetStudentIds: ['kavya-v'],
    completedCount: 0,
    totalCount: 1,
    estimatedMinutes: 10,
    scheduledDate: '2026-10-28',
    rubricTemplateId: 'fln-num-early-v1',
  },
  {
    id: 'asmt-4a-num-01',
    title: 'Class 4 Multi-Digit Addition with Regrouping Diagnosis',
    titleGu: 'ધોરણ ૪ વદ્દીવાળા સરવાળા અને દસકા નિદાન કસોટી',
    classId: 'class-std-4a',
    standard: 4,
    subject: 'numeracy',
    language: 'gu',
    status: 'Requires Review',
    targetStudentIds: ['rohan-m'],
    completedCount: 1,
    totalCount: 1,
    estimatedMinutes: 15,
    scheduledDate: '2026-10-18',
    completedDate: '2026-10-19',
    rubricTemplateId: 'fln-num-regroup-v1',
  },
]

const STORAGE_KEY = 'saksham_fln_assessments_v1'

export const assessmentService = {
  getAssessments: (filter?: { classId?: string; status?: string; subject?: string }): AssessmentRecord[] => {
    let list = INITIAL_ASSESSMENTS
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) list = JSON.parse(saved)
      } catch {
        // Fallback
      }
    }

    return list.filter((a) => {
      if (filter?.classId && a.classId !== filter.classId) return false
      if (filter?.status && filter.status !== 'All' && a.status !== filter.status) return false
      if (filter?.subject && filter.subject !== 'All' && a.subject !== filter.subject) return false
      return true
    })
  },

  getAssessmentById: (id: string): AssessmentRecord | undefined => {
    const list = assessmentService.getAssessments()
    return list.find((a) => a.id === id)
  },

  createAssessment: (newAsmt: AssessmentRecord): void => {
    const list = assessmentService.getAssessments()
    const nextList = [newAsmt, ...list]
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },

  updateAssessmentStatus: (id: string, status: AssessmentRecord['status']): void => {
    const list = assessmentService.getAssessments()
    const nextList = list.map((a) => (a.id === id ? { ...a, status } : a))
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },
}
