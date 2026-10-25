import { School } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'

export const DEFAULT_SCHOOL: School = {
  id: 'school-asha-primary',
  code: '24120100101',
  schoolCode: '24120100101',
  name: 'Asha Primary School (આશા પ્રાથમિક શાળા)',
  cluster: 'Khambhalia',
  block: 'Khambhalia Taluka',
  district: 'Devbhumi Dwarka',
  state: 'Gujarat',
  totalEnrolled: 258,
  totalTeachers: 9,
  mediums: ['Gujarati', 'Hindi', 'English'],
  academicYearIds: ['ay-2025-2026', 'ay-2024-2025'],
  status: 'Active',
  contactPhone: '+91 2833 232000',
  contactEmail: 'asha.primary.dwarka@gujarat.gov.in',
}

export const schoolService = {
  getSchool: (): School => {
    return localStore.get<School>(STORAGE_KEYS.SCHOOL, DEFAULT_SCHOOL)
  },

  updateSchool: (updated: Partial<School>): School => {
    const current = schoolService.getSchool()
    const next: School = { ...current, ...updated }
    localStore.set(STORAGE_KEYS.SCHOOL, next)
    return next
  },
}
