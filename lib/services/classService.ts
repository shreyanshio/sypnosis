import { ClassRoom } from '@/lib/types'

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'class-std-1a',
    name: 'Standard 1 - A',
    standard: 1,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Hetalben Joshi',
    enrolledStudentsCount: 26,
    studentsAssessedCount: 22,
    activeSupportPlansCount: 14,
    pendingAssessmentsCount: 4,
    pendingTeacherActionsCount: 3,
    lastActivityDate: 'Today',
    flnLiteracyPercentage: 68,
    flnNumeracyPercentage: 71,
  },
  {
    id: 'class-std-2a',
    name: 'Standard 2 - A',
    standard: 2,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Bhavnaben Patel',
    enrolledStudentsCount: 27,
    studentsAssessedCount: 25,
    activeSupportPlansCount: 12,
    pendingAssessmentsCount: 2,
    pendingTeacherActionsCount: 2,
    lastActivityDate: 'Yesterday',
    flnLiteracyPercentage: 73,
    flnNumeracyPercentage: 76,
  },
  {
    id: 'class-std-3a',
    name: 'Standard 3 - A',
    standard: 3,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Asha Shah',
    enrolledStudentsCount: 28,
    studentsAssessedCount: 24,
    activeSupportPlansCount: 17,
    pendingAssessmentsCount: 4,
    pendingTeacherActionsCount: 3,
    lastActivityDate: 'Today, 8:45 AM',
    flnLiteracyPercentage: 72,
    flnNumeracyPercentage: 74,
  },
  {
    id: 'class-std-3b',
    name: 'Standard 3 - B',
    standard: 3,
    section: 'B',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Dharmesh Dave',
    enrolledStudentsCount: 25,
    studentsAssessedCount: 23,
    activeSupportPlansCount: 15,
    pendingAssessmentsCount: 2,
    pendingTeacherActionsCount: 2,
    lastActivityDate: '2 days ago',
    flnLiteracyPercentage: 70,
    flnNumeracyPercentage: 69,
  },
  {
    id: 'class-std-4a',
    name: 'Standard 4 - A',
    standard: 4,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Kiritbhai Solanki',
    enrolledStudentsCount: 30,
    studentsAssessedCount: 28,
    activeSupportPlansCount: 11,
    pendingAssessmentsCount: 2,
    pendingTeacherActionsCount: 1,
    lastActivityDate: 'Yesterday',
    flnLiteracyPercentage: 79,
    flnNumeracyPercentage: 81,
  },
  {
    id: 'class-std-5a',
    name: 'Standard 5 - A',
    standard: 5,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Varshaben Trivedi',
    enrolledStudentsCount: 29,
    studentsAssessedCount: 29,
    activeSupportPlansCount: 8,
    pendingAssessmentsCount: 0,
    pendingTeacherActionsCount: 2,
    lastActivityDate: '3 days ago',
    flnLiteracyPercentage: 84,
    flnNumeracyPercentage: 86,
  },
  {
    id: 'class-std-6a',
    name: 'Standard 6 - A',
    standard: 6,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Rameshbhai Parmar',
    enrolledStudentsCount: 32,
    studentsAssessedCount: 30,
    activeSupportPlansCount: 6,
    pendingAssessmentsCount: 2,
    pendingTeacherActionsCount: 1,
    lastActivityDate: '4 days ago',
    flnLiteracyPercentage: 87,
    flnNumeracyPercentage: 88,
  },
  {
    id: 'class-std-7a',
    name: 'Standard 7 - A',
    standard: 7,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Meenaben Bhatt',
    enrolledStudentsCount: 31,
    studentsAssessedCount: 31,
    activeSupportPlansCount: 5,
    pendingAssessmentsCount: 0,
    pendingTeacherActionsCount: 1,
    lastActivityDate: '5 days ago',
    flnLiteracyPercentage: 90,
    flnNumeracyPercentage: 91,
  },
  {
    id: 'class-std-8a',
    name: 'Standard 8 - A',
    standard: 8,
    section: 'A',
    academicYear: '2025-2026',
    medium: 'Gujarati',
    classTeacherName: 'Ashokbhai Gohil',
    enrolledStudentsCount: 30,
    studentsAssessedCount: 30,
    activeSupportPlansCount: 4,
    pendingAssessmentsCount: 0,
    pendingTeacherActionsCount: 0,
    lastActivityDate: '1 week ago',
    flnLiteracyPercentage: 92,
    flnNumeracyPercentage: 93,
  },
]

const STORAGE_KEY = 'saksham_fln_classes_v1'

export const classService = {
  getClasses: (): ClassRoom[] => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return INITIAL_CLASSES
  },

  getClassById: (id: string): ClassRoom | undefined => {
    const list = classService.getClasses()
    return list.find((c) => c.id === id)
  },

  saveClasses: (classes: ClassRoom[]): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))
      } catch {
        // Ignore
      }
    }
  },

  addClass: (newClass: ClassRoom): void => {
    const list = classService.getClasses()
    const nextList = [newClass, ...list]
    classService.saveClasses(nextList)
  },

  updateClass: (updatedClass: ClassRoom): void => {
    const list = classService.getClasses()
    const nextList = list.map((c) => (c.id === updatedClass.id ? updatedClass : c))
    classService.saveClasses(nextList)
  },

  updateClassTeacher: (classId: string, newTeacherName: string): void => {
    const list = classService.getClasses()
    const nextList = list.map((c) =>
      c.id === classId ? { ...c, classTeacherName: newTeacherName } : c
    )
    classService.saveClasses(nextList)
  },

  incrementStudentCount: (classId: string): void => {
    const list = classService.getClasses()
    const nextList = list.map((c) =>
      c.id === classId ? { ...c, enrolledStudentsCount: c.enrolledStudentsCount + 1 } : c
    )
    classService.saveClasses(nextList)
  },

  exportClassCsv: (classId: string): void => {
    const c = classService.getClassById(classId)
    if (!c) return

    const rows = [
      ['School', 'Asha Primary School (UDISE: 24120100101)'],
      ['District', 'Devbhumi Dwarka'],
      ['Class', c.name],
      ['Standard', `${c.standard}`],
      ['Section', c.section],
      ['Class Teacher', c.classTeacherName],
      ['Enrolled Students', `${c.enrolledStudentsCount}`],
      ['Students Assessed', `${c.studentsAssessedCount}`],
      ['Active Support Plans', `${c.activeSupportPlansCount}`],
      ['FLN Literacy Mastery', `${c.flnLiteracyPercentage}%`],
      ['FLN Numeracy Mastery', `${c.flnNumeracyPercentage}%`],
      ['Generated On', new Date().toLocaleDateString('en-IN')],
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${c.name.replace(/\s+/g, '_')}_FLN_Summary.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}
