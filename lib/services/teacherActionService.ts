import { TeacherActionRecord } from '@/lib/types'

export const INITIAL_ACTIONS: TeacherActionRecord[] = [
  {
    id: 'act-001',
    title: 'Revisit place value with Group B (Aarav, Rohan)',
    titleGu: 'જૂથ-બ (આરવ, રોહન) સાથે સ્થાન કિંમતની પુનઃચકાસણી',
    titleHi: 'समूह-बी (आरव, रोहन) के साथ स्थानीय मान का पुनः अभ्यास',
    description: 'Use physical straw bundles with rubber bands to practice bundling 10 units into 1 ten.',
    reason: 'Screening assessment showed difficulty with decade place-value transitions.',
    relatedSkill: 'Place Value Bundling',
    relatedStudentId: 'aarav-k',
    relatedStudentName: 'Aarav Kumar',
    relatedClassId: 'class-std-3a',
    className: 'Standard 3 - A',
    priority: 'High',
    dueDate: 'Today',
    status: 'Pending',
    recommendedNextStep: 'Conduct 12-minute tactile straw bundling session in morning circle.',
  },
  {
    id: 'act-002',
    title: 'Approve Meera’s weekly phonics pathway',
    titleGu: 'મીરાની સાપ્તાહિક જોડાક્ષર અધ્યયન યોજના મંજૂર કરો',
    titleHi: 'मीरा की साप्ताहिक संयुक्ताक्षर शिक्षण योजना स्वीकृत करें',
    description: 'Review the 3 generated decodable activities for consonant blend recognition.',
    reason: 'Meera achieved 78% on diagnostic; pathway is ready for teacher validation.',
    relatedSkill: 'Consonant Blends & Reading Fluency',
    relatedStudentId: 'meera-p',
    relatedStudentName: 'Meera Patel',
    relatedClassId: 'class-std-3a',
    className: 'Standard 3 - A',
    priority: 'Medium',
    dueDate: 'Today',
    status: 'In Progress',
    recommendedNextStep: 'Sign off on weekly schedule and assign whisper-reading cards.',
  },
  {
    id: 'act-003',
    title: 'Review last week’s progress notes for Class 3A',
    titleGu: 'ધોરણ ૩-અ ના ગયા અઠવાડિયાના પ્રગતિ અહેવાલોની સમીક્ષા',
    titleHi: 'कक्षा ३-अ के पिछले सप्ताह के प्रगति नोट्स की समीक्षा',
    description: 'Verify milestone records and offline entries before cluster reporting deadline.',
    reason: 'Regular weekly verification of foundational learning competencies.',
    relatedSkill: 'Classroom Progress Monitoring',
    relatedClassId: 'class-std-3a',
    className: 'Standard 3 - A',
    priority: 'Medium',
    dueDate: 'Tomorrow',
    status: 'Completed',
    recommendedNextStep: 'Archive weekly milestone sheet and prepare CRC cluster digest.',
    notes: 'All 38 milestones recorded and cross-verified with student workbooks.',
  },
  {
    id: 'act-004',
    title: 'Contact Aarav’s guardian regarding home practice',
    titleGu: 'આરવના વાલી સાથે ઘરે સળી-કાંકરા ગણતરી બાબતે વાતચીત',
    titleHi: 'आरव के अभिभावक से घर पर अभ्यास हेतु संपर्क',
    description: 'Share suggested 5-minute home counting game using kitchen spoons/counters.',
    reason: 'Reinforces positive parent involvement without stigmatizing the student.',
    relatedSkill: 'Home Learning Engagement',
    relatedStudentId: 'aarav-k',
    relatedStudentName: 'Aarav Kumar',
    relatedClassId: 'class-std-3a',
    className: 'Standard 3 - A',
    priority: 'Low',
    dueDate: 'This Week',
    status: 'Pending',
    recommendedNextStep: 'Send supportive guidance card via school parent portal.',
  },
]

const STORAGE_KEY = 'saksham_fln_actions_v1'

export const teacherActionService = {
  getActions: (): TeacherActionRecord[] => {
    let list = INITIAL_ACTIONS
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) list = JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return list
  },

  updateActionStatus: (actionId: string, status: TeacherActionRecord['status']): void => {
    const list = teacherActionService.getActions()
    const nextList = list.map((a) => (a.id === actionId ? { ...a, status } : a))
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },

  addAction: (newAction: TeacherActionRecord): void => {
    const list = teacherActionService.getActions()
    const nextList = [newAction, ...list]
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },
}
