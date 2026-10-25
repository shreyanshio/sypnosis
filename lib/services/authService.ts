import { Role, RolePermissions } from '@/lib/types'

export interface AuthUser {
  id: string
  name: string
  displayName: string
  email: string
  role: Role
  schoolName: string
  schoolCode: string
  cluster: string
  district: string
  assignedClass?: string
}

export const DEMO_PROFILES: Record<Role, AuthUser> = {
  teacher: {
    id: 'user-teacher-01',
    name: 'Asha Shah',
    displayName: 'Asha Shah',
    email: 'asha.shah@ashaprimary.demo',
    role: 'teacher',
    schoolName: 'Asha Primary School',
    schoolCode: '24120100101',
    cluster: 'Khambhalia',
    district: 'Devbhumi Dwarka',
    assignedClass: 'class-std-3a',
  },
  head_teacher: {
    id: 'user-ht-01',
    name: 'Govindbhai Parmar',
    displayName: 'Govindbhai Parmar',
    email: 'headmaster@ashaprimary.demo',
    role: 'head_teacher',
    schoolName: 'Asha Primary School',
    schoolCode: '24120100101',
    cluster: 'Khambhalia',
    district: 'Devbhumi Dwarka',
  },
  crc_coordinator: {
    id: 'user-crc-01',
    name: 'Mukeshbhai Joshi',
    displayName: 'Mukeshbhai Joshi',
    email: 'crc.khambhalia@education.demo',
    role: 'crc_coordinator',
    schoolName: 'Khambhalia Cluster Resource Centre',
    schoolCode: 'CRC-KHM-04',
    cluster: 'Khambhalia',
    district: 'Devbhumi Dwarka',
  },
  deo: {
    id: 'user-deo-01',
    name: 'Smt. R. K. Jadeja, IAS',
    displayName: 'Smt. R. K. Jadeja, IAS',
    email: 'deo.dwarka@gujarat.gov.demo',
    role: 'deo',
    schoolName: 'District Education Office',
    schoolCode: 'DEO-DWK-01',
    cluster: 'All Clusters (4 Talukas)',
    district: 'Devbhumi Dwarka',
  },
  parent: {
    id: 'user-parent-01',
    name: 'Rameshbhai Kumar',
    displayName: 'Rameshbhai Kumar',
    email: 'parent.aarav@guardian.demo',
    role: 'parent',
    schoolName: 'Asha Primary School',
    schoolCode: '24120100101',
    cluster: 'Khambhalia',
    district: 'Devbhumi Dwarka',
  },
}

const STORAGE_KEY = 'saksham_fln_auth_v1'

export const authService = {
  getCurrentUser: (): AuthUser => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return DEMO_PROFILES.teacher
  },

  setRole: (role: Role): AuthUser => {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES.teacher
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
      } catch {
        // Ignore
      }
    }
    return profile
  },

  getPermissions: (role: Role): RolePermissions => {
    switch (role) {
      case 'head_teacher':
        return {
          canManageSchool: true,
          canManageAcademicYears: true,
          canManageClasses: true,
          canManageUsers: true,
          canRunAssessment: true,
          canApprovePlans: true,
          canManageContent: true,
          canViewClusterReports: false,
          canViewDistrictReports: false,
          canAccessGuardianPortal: false,
        }
      case 'crc_coordinator':
        return {
          canManageSchool: false,
          canManageAcademicYears: false,
          canManageClasses: false,
          canManageUsers: false,
          canRunAssessment: false,
          canApprovePlans: false,
          canManageContent: true,
          canViewClusterReports: true,
          canViewDistrictReports: false,
          canAccessGuardianPortal: false,
        }
      case 'deo':
        return {
          canManageSchool: true,
          canManageAcademicYears: true,
          canManageClasses: true,
          canManageUsers: true,
          canRunAssessment: false,
          canApprovePlans: false,
          canManageContent: true,
          canViewClusterReports: true,
          canViewDistrictReports: true,
          canAccessGuardianPortal: false,
        }
      case 'parent':
        return {
          canManageSchool: false,
          canManageAcademicYears: false,
          canManageClasses: false,
          canManageUsers: false,
          canRunAssessment: false,
          canApprovePlans: false,
          canManageContent: false,
          canViewClusterReports: false,
          canViewDistrictReports: false,
          canAccessGuardianPortal: true,
        }
      case 'teacher':
      default:
        return {
          canManageSchool: false,
          canManageAcademicYears: false,
          canManageClasses: false,
          canManageUsers: false,
          canRunAssessment: true,
          canApprovePlans: true,
          canManageContent: false,
          canViewClusterReports: false,
          canViewDistrictReports: false,
          canAccessGuardianPortal: false,
        }
    }
  },

  canViewAllClasses: (role: Role): boolean => {
    return role === 'head_teacher' || role === 'crc_coordinator' || role === 'deo'
  },

  canEditStudentAssessment: (role: Role): boolean => {
    return role === 'teacher' || role === 'head_teacher'
  },
}
