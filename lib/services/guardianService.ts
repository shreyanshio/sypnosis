export interface GuardianContact {
  studentId: string
  studentName: string
  guardianName: string
  relationship: 'Father' | 'Mother' | 'Guardian'
  phone: string
  preferredChannel: 'Portal' | 'SMS' | 'Physical Card'
  consentGiven: boolean
  lastContactedDate: string
  homeLanguage: 'gu' | 'hi' | 'en'
}

export const INITIAL_GUARDIANS: GuardianContact[] = [
  {
    studentId: 'aarav-k',
    studentName: 'Aarav Kumar',
    guardianName: 'Rameshbhai Kumar',
    relationship: 'Father',
    phone: '+91 98250 12345',
    preferredChannel: 'Portal',
    consentGiven: true,
    lastContactedDate: 'Today',
    homeLanguage: 'gu',
  },
  {
    studentId: 'meera-p',
    studentName: 'Meera Patel',
    guardianName: 'Sunilbhai Patel',
    relationship: 'Father',
    phone: '+91 98251 67890',
    preferredChannel: 'SMS',
    consentGiven: true,
    lastContactedDate: 'Yesterday',
    homeLanguage: 'gu',
  },
  {
    studentId: 'dev-r',
    studentName: 'Dev Rathod',
    guardianName: 'Pravinbhai Rathod',
    relationship: 'Father',
    phone: '+91 98252 34567',
    preferredChannel: 'Portal',
    consentGiven: true,
    lastContactedDate: '3 days ago',
    homeLanguage: 'gu',
  },
  {
    studentId: 'priya-s',
    studentName: 'Priya Sharma',
    guardianName: 'Dineshbhai Sharma',
    relationship: 'Father',
    phone: '+91 98253 45678',
    preferredChannel: 'Physical Card',
    consentGiven: true,
    lastContactedDate: '4 days ago',
    homeLanguage: 'gu',
  },
]

const GUARDIAN_STORAGE_KEY = 'saksham_fln_guardians_v1'

export const guardianService = {
  getGuardians: (): GuardianContact[] => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(GUARDIAN_STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return INITIAL_GUARDIANS
  },

  getGuardianByStudentId: (studentId: string): GuardianContact | undefined => {
    const list = guardianService.getGuardians()
    return list.find((g) => g.studentId === studentId)
  },

  updateGuardianPreferences: (
    studentId: string,
    updates: Partial<Pick<GuardianContact, 'preferredChannel' | 'consentGiven' | 'homeLanguage'>>
  ): void => {
    const list = guardianService.getGuardians()
    const nextList = list.map((g) => (g.studentId === studentId ? { ...g, ...updates } : g))
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(GUARDIAN_STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
  },
}
