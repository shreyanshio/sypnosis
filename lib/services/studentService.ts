import { StudentRecord } from '@/lib/types'
import { classService } from '@/lib/services/classService'

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'aarav-k',
    studentId: 'STU-2025-3A-014',
    name: 'Aarav K.',
    fullName: 'Aarav Kumar',
    classId: 'class-std-3a',
    standard: 3,
    section: 'A',
    rollNo: '14',
    avatar: 'AK',
    gender: 'Male',
    dob: '2017-06-12',
    guardianName: 'Rameshbhai Kumar',
    guardianPhone: '+91 98250 12345',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Needs Support',
    literacyStatus: 'Demonstrated',
    numeracyStatus: 'Needs Support',
    diagnosticScore: 67,
    prerequisiteGap: 'Bundling 10 units into 1 ten (tens and ones positional value)',
    pedagogicalInsight:
      'Aarav reliably counts up to 20, but confuses tens and ones when crossing decade boundaries. Needs tactile straw bundling practice.',
    planStatus: 'Pending approval',
    planTitle: 'Concrete Bundling & Place Value Pathway',
    progressPercent: 25,
    lastAssessedDate: 'Today',
    nextRecommendedAction: 'Conduct Day 1 Straw Bundling Activity (12 mins)',
    completedActivitiesCount: 0,
    assignedActivitiesCount: 3,
  },
  {
    id: 'meera-p',
    studentId: 'STU-2025-3A-009',
    name: 'Meera P.',
    fullName: 'Meera Patel',
    classId: 'class-std-3a',
    standard: 3,
    section: 'A',
    rollNo: '09',
    avatar: 'MP',
    gender: 'Female',
    dob: '2017-04-19',
    guardianName: 'Sunilbhai Patel',
    guardianPhone: '+91 98251 67890',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Developing',
    literacyStatus: 'Developing',
    numeracyStatus: 'Demonstrated',
    diagnosticScore: 78,
    prerequisiteGap: 'Consonant blend recognition (bl, st, tr)',
    pedagogicalInsight:
      'Meera reads individual phonemes clearly. Scaffold initial blends with rhythmic reading cards.',
    planStatus: 'Approved',
    planTitle: 'Phonemic Blends & Story Segmenting',
    progressPercent: 60,
    lastAssessedDate: 'Yesterday',
    nextRecommendedAction: 'Whisper-read decodable story with peer',
    completedActivitiesCount: 2,
    assignedActivitiesCount: 3,
  },
  {
    id: 'dev-r',
    studentId: 'STU-2025-3A-022',
    name: 'Dev R.',
    fullName: 'Dev Rathod',
    classId: 'class-std-3a',
    standard: 3,
    section: 'A',
    rollNo: '22',
    avatar: 'DR',
    gender: 'Male',
    dob: '2017-09-03',
    guardianName: 'Pravinbhai Rathod',
    guardianPhone: '+91 98252 34567',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Demonstrated',
    literacyStatus: 'Demonstrated',
    numeracyStatus: 'Demonstrated',
    diagnosticScore: 92,
    prerequisiteGap: 'Class 3 FLN baseline fully achieved; ready for Class 4 bridging',
    pedagogicalInsight:
      'Dev shows high automaticity. Challenge with open number line estimation and multi-step word riddles.',
    planStatus: 'Approved',
    planTitle: 'Advanced Number Sequences & Estimation',
    progressPercent: 90,
    lastAssessedDate: '3 days ago',
    nextRecommendedAction: 'Assign open number-line benchmark challenge',
    completedActivitiesCount: 3,
    assignedActivitiesCount: 3,
  },
  {
    id: 'priya-s',
    studentId: 'STU-2025-3B-018',
    name: 'Priya S.',
    fullName: 'Priya Sharma',
    classId: 'class-std-3b',
    standard: 3,
    section: 'B',
    rollNo: '18',
    avatar: 'PS',
    gender: 'Female',
    dob: '2017-02-14',
    guardianName: 'Dineshbhai Sharma',
    guardianPhone: '+91 98253 45678',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Developing',
    literacyStatus: 'Developing',
    numeracyStatus: 'Developing',
    diagnosticScore: 72,
    prerequisiteGap: 'Extracting contextual answers from 4-sentence narratives',
    pedagogicalInsight: 'Priya decodes fluently but needs graphic organizers to track story characters and settings.',
    planStatus: 'Approved',
    planTitle: 'Picture-Prompted Narrative Inferences',
    progressPercent: 50,
    lastAssessedDate: '4 days ago',
    nextRecommendedAction: 'Small-group picture story card arrangement',
    completedActivitiesCount: 1,
    assignedActivitiesCount: 2,
  },
  {
    id: 'rohan-m',
    studentId: 'STU-2025-4A-027',
    name: 'Rohan M.',
    fullName: 'Rohan Mehta',
    classId: 'class-std-4a',
    standard: 4,
    section: 'A',
    rollNo: '27',
    avatar: 'RM',
    gender: 'Male',
    dob: '2016-11-20',
    guardianName: 'Kamleshbhai Mehta',
    guardianPhone: '+91 98254 56789',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Needs Support',
    literacyStatus: 'Demonstrated',
    numeracyStatus: 'Needs Support',
    diagnosticScore: 62,
    prerequisiteGap: 'Decomposing 2-digit numbers into tens and units when adding',
    pedagogicalInsight: 'Rohan struggles with standard column carrying. Reinforce base-10 decade cards.',
    planStatus: 'Pending approval',
    planTitle: 'Base-10 Tens Mat & Decomposition',
    progressPercent: 20,
    lastAssessedDate: '1 week ago',
    nextRecommendedAction: 'Approve teacher intervention plan',
    completedActivitiesCount: 0,
    assignedActivitiesCount: 3,
  },
  {
    id: 'kavya-v',
    studentId: 'STU-2025-2A-011',
    name: 'Kavya V.',
    fullName: 'Kavya Vaghela',
    classId: 'class-std-2a',
    standard: 2,
    section: 'A',
    rollNo: '11',
    avatar: 'KV',
    gender: 'Female',
    dob: '2018-05-10',
    guardianName: 'Bhaveshbhai Vaghela',
    guardianPhone: '+91 98255 67890',
    preferredLanguage: 'gu',
    enrollmentStatus: 'Active',
    overallStatus: 'Demonstrated',
    literacyStatus: 'Demonstrated',
    numeracyStatus: 'Demonstrated',
    diagnosticScore: 88,
    prerequisiteGap: 'Mastered 2-digit number identification up to 50',
    pedagogicalInsight: 'Kavya recognizes swaras and vyanjans without error. Introduce simple paired reader.',
    planStatus: 'Approved',
    planTitle: 'Early Sentence Building & Number Bonds',
    progressPercent: 80,
    lastAssessedDate: '5 days ago',
    nextRecommendedAction: 'Advance to 3-word decodable sentences',
    completedActivitiesCount: 2,
    assignedActivitiesCount: 2,
  },
]

const STORAGE_KEY = 'saksham_fln_students_v1'

export const studentService = {
  getStudents: (filter?: {
    classId?: string
    standard?: number
    section?: string
    status?: string
    search?: string
  }): StudentRecord[] => {
    let list = INITIAL_STUDENTS
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) list = JSON.parse(saved)
      } catch {
        // Fallback
      }
    }

    return list.filter((s) => {
      if (filter?.classId && filter.classId !== 'All' && s.classId !== filter.classId) return false
      if (filter?.standard && s.standard !== filter.standard) return false
      if (filter?.section && filter.section !== 'All' && s.section !== filter.section) return false
      if (filter?.status && filter.status !== 'All' && s.overallStatus !== filter.status) return false
      if (filter?.search) {
        const term = filter.search.toLowerCase().trim()
        const matchName = s.fullName.toLowerCase().includes(term) || s.name.toLowerCase().includes(term)
        const matchId = s.studentId.toLowerCase().includes(term) || s.rollNo.includes(term)
        const matchSkill = s.prerequisiteGap.toLowerCase().includes(term)
        if (!matchName && !matchId && !matchSkill) return false
      }
      return true
    })
  },

  getStudentsByClass: (classId: string): StudentRecord[] => {
    return studentService.getStudents({ classId })
  },

  getStudentById: (id: string): StudentRecord | undefined => {
    const list = studentService.getStudents()
    return list.find((s) => s.id === id || s.studentId === id)
  },

  updateStudent: (updated: StudentRecord): void => {
    const list = studentService.getStudents()
    const nextList = list.map((s) => (s.id === updated.id ? updated : s))
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },

  addStudent: (newStudent: StudentRecord): void => {
    const list = studentService.getStudents()
    const nextList = [newStudent, ...list]
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
    if (newStudent.classId) {
      classService.incrementStudentCount(newStudent.classId)
    }
  },

  recordActivityCompletion: (studentId: string, activityTitle?: string): StudentRecord | undefined => {
    const list = studentService.getStudents()
    let updated: StudentRecord | undefined
    const nextList = list.map((s) => {
      if (s.id === studentId || s.studentId === studentId) {
        const nextCompleted = (s.completedActivitiesCount || 0) + 1
        const totalAssigned = Math.max(s.assignedActivitiesCount || 3, nextCompleted)
        const nextPercent = Math.min(100, Math.round((nextCompleted / totalAssigned) * 100))
        const nextStatus = nextPercent >= 80 ? 'Demonstrated' : nextPercent >= 50 ? 'Developing' : s.overallStatus
        updated = {
          ...s,
          completedActivitiesCount: nextCompleted,
          assignedActivitiesCount: totalAssigned,
          progressPercent: nextPercent,
          overallStatus: nextStatus,
          lastAssessedDate: 'Today',
          nextRecommendedAction:
            nextPercent >= 100
              ? 'Schedule mastery verification check'
              : `Continue Step ${nextCompleted + 1} micro-practice`,
        }
        return updated
      }
      return s
    })

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
    return updated
  },
}
