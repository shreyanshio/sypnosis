import { AcademicYear } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'

export const INITIAL_ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: 'ay-2025-2026',
    label: '2025-2026',
    startDate: '2025-06-15',
    endDate: '2026-04-30',
    status: 'Active',
  },
  {
    id: 'ay-2024-2025',
    label: '2024-2025',
    startDate: '2024-06-15',
    endDate: '2025-04-30',
    status: 'Archived',
  },
  {
    id: 'ay-2026-2027',
    label: '2026-2027',
    startDate: '2026-06-15',
    endDate: '2027-04-30',
    status: 'Upcoming',
  },
]

export const academicYearService = {
  getAcademicYears: (): AcademicYear[] => {
    return localStore.get<AcademicYear[]>(STORAGE_KEYS.ACADEMIC_YEARS, INITIAL_ACADEMIC_YEARS)
  },

  getActiveYear: (): AcademicYear => {
    const list = academicYearService.getAcademicYears()
    return list.find((y) => y.status === 'Active') || list[0]
  },

  setActiveYear: (id: string): void => {
    const list = academicYearService.getAcademicYears()
    const nextList = list.map((y) => ({
      ...y,
      status: y.id === id ? ('Active' as const) : y.status === 'Active' ? ('Archived' as const) : y.status,
    }))
    localStore.set(STORAGE_KEYS.ACADEMIC_YEARS, nextList)
  },

  addAcademicYear: (year: Omit<AcademicYear, 'id'>): AcademicYear => {
    const list = academicYearService.getAcademicYears()
    const newYear: AcademicYear = {
      ...year,
      id: `ay-${year.label.replace(/\s+/g, '-')}`,
    }
    const nextList = [newYear, ...list]
    localStore.set(STORAGE_KEYS.ACADEMIC_YEARS, nextList)
    return newYear
  },
}
