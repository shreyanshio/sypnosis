export type Role =
  | 'teacher'
  | 'head_teacher'
  | 'crc_coordinator'
  | 'deo'
  | 'parent'

export type Locale = 'en' | 'gu' | 'hi'

export interface School {
  id: string
  code: string // e.g. 24120100101 (UDISE+)
  schoolCode: string
  name: string
  cluster: string // e.g. Khambhalia
  block: string
  district: string // e.g. Devbhumi Dwarka
  state: string // Gujarat
  totalEnrolled: number
  totalTeachers: number
  mediums: ('Gujarati' | 'English' | 'Hindi')[]
  academicYearIds: string[]
  status: 'Active' | 'Inactive'
  contactPhone?: string
  contactEmail?: string
}

export interface AcademicYear {
  id: string
  label: string // e.g. "2025-2026"
  startDate: string
  endDate: string
  status: 'Active' | 'Upcoming' | 'Archived'
}

export interface Classroom {
  id: string
  schoolId?: string
  academicYearId?: string
  name: string // e.g. "Standard 3 - A"
  grade?: number // 1 to 8
  standard: number // 1 to 8 alias for grade
  section: string // "A", "B"
  academicYear: string // "2025-2026"
  medium: 'Gujarati' | 'English' | 'Hindi'
  classTeacherName: string
  classTeacherIds?: string[]
  studentIds?: string[]
  enrolledStudentsCount: number
  studentsAssessedCount: number
  activeSupportPlansCount: number
  pendingAssessmentsCount: number
  pendingTeacherActionsCount: number
  lastActivityDate: string
  flnLiteracyPercentage: number
  flnNumeracyPercentage: number
  status?: 'Active' | 'Archived'
}

// Alias for backwards compatibility
export type ClassRoom = Classroom

export interface User {
  id: string
  displayName: string
  role: Role
  schoolId: string
  assignedClassIds: string[]
  preferredLocale: Locale
  activeStatus: 'Active' | 'Inactive'
  email: string
  phone?: string
}

export type FLNStatus = 'Demonstrated' | 'Developing' | 'Needs Support'

export interface StudentRecord {
  id: string
  studentId: string // e.g. STU-2025-3A-014
  name: string
  fullName: string
  classId: string
  standard: number
  section: string
  rollNo: string
  avatar: string
  gender: 'Male' | 'Female' | 'Other'
  dob: string
  guardianName: string
  guardianPhone: string
  preferredLanguage: Locale
  enrollmentStatus: 'Active' | 'Transferred' | 'Inactive'
  overallStatus: FLNStatus
  literacyStatus: FLNStatus
  numeracyStatus: FLNStatus
  diagnosticScore?: number
  prerequisiteGap: string
  pedagogicalInsight?: string
  planStatus: 'Not started' | 'Pending approval' | 'Approved' | 'In progress'
  planTitle?: string
  progressPercent: number
  lastAssessedDate?: string
  nextRecommendedAction: string
  completedActivitiesCount: number
  assignedActivitiesCount: number
}

// Alias
export type Student = StudentRecord

export type SkillCategory = 'literacy' | 'numeracy'

export interface Subject {
  id: string
  name: string
  nameGu: string
  nameHi: string
  supportedLocales: Locale[]
}

export interface Skill {
  id: string
  title: string
  titleGu: string
  titleHi: string
  subjectId: SkillCategory
  gradeRange: string
  prerequisiteSkillIds: string[]
  curriculumReference: string // e.g. GCERT Class 3 Sem 1 LO-M304
  curriculumReviewStatus: 'Verified' | 'Pending Review' | 'Draft'
  description: string
}

// Alias
export type SkillCompetency = Skill

export type QuestionType =
  | 'multiple_choice'
  | 'picture_selection'
  | 'number_input'
  | 'word_input'
  | 'matching'
  | 'audio_prompt'

export interface QuestionOption {
  id: string
  labelGu: string
  labelEn: string
  labelHi?: string
  isCorrect: boolean
  misconceptionDiagnosis?: string
}

export interface Question {
  id: string
  skillId: string
  skillName: string
  prerequisiteSkillIds: string[]
  gradeRange: string
  locale: Locale
  difficulty: 'Foundation' | 'Developing' | 'Grade Level'
  type: QuestionType
  prompt: string
  promptGu: string
  promptEn: string
  promptHi?: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  mediaReference?: string
  reviewStatus: 'Draft' | 'Under Review' | 'Approved' | 'Published'
}

export interface AssessmentAttempt {
  id: string
  assessmentId: string
  studentId: string
  studentName: string
  answers: Record<string, string>
  startedAt: string
  updatedAt: string
  completedAt?: string
  status: 'In Progress' | 'Completed' | 'Requires Review'
  score?: number
}

export interface SkillResult {
  id: string
  studentId: string
  assessmentAttemptId: string
  skillId: string
  skillName: string
  evidenceSummary: string
  status: 'Demonstrated' | 'Emerging' | 'Probable Gap'
  scorePercent: number
  reviewedBy?: string
  reviewedAt?: string
}

export interface LearningActivity {
  id: string
  title: string
  titleGu: string
  titleHi?: string
  subjectId?: SkillCategory
  subject?: SkillCategory
  skillId?: string
  targetSkillId?: string
  targetSkillName: string
  prerequisiteSkillIds?: string[]
  prerequisiteSkillName: string
  gradeRange: string
  locale?: Locale
  difficulty?: 'Foundation' | 'Standard' | 'Extension'
  durationMinutes?: number
  duration: string // e.g. "12 mins"
  contentType?: 'flashcards' | 'audio_practice' | 'phonics' | 'number_line' | 'guided_math' | 'worksheet'
  format?: 'flashcards' | 'audio_practice' | 'phonics' | 'number_line' | 'guided_math' | 'worksheet' // alias
  resourceReference?: string
  curriculumMapping: string
  curriculumReviewStatus?: 'Verified' | 'Pending Review' | 'Draft'
  publicationStatus?: 'Published' | 'Draft' | 'Archived'
  description: string
  materialsNeeded?: string
  teacherScriptGu?: string
  teacherScriptEn?: string
  status: 'locked' | 'ready' | 'in_progress' | 'completed'
  completedAt?: string
  teacherObservation?: string
}

// Alias
export type LearningActivityItem = LearningActivity

export interface WeeklyScheduleDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  dayGu: string
  dayHi: string
  activityId?: string
  activityTitle: string
  targetSkill: string
  durationMinutes: number
  status: 'scheduled' | 'completed' | 'pending'
}

export interface LearningPlanRecord {
  id: string
  studentId: string
  studentName: string
  classId: string
  title: string
  titleGu: string
  status: 'Pending approval' | 'Approved' | 'In progress' | 'Completed'
  targetSkill: string
  prerequisiteGap: string
  approvedAt?: string
  approvedBy?: string
  teacherNotes: string
  startDate: string
  targetCompletionDate: string
  weeklySchedule: WeeklyScheduleDay[]
  activities: LearningActivity[]
}

// Alias
export type LearningPlan = LearningPlanRecord

export type AssessmentStatus = 'Draft' | 'Scheduled' | 'In Progress' | 'Completed' | 'Requires Review'

export interface AssessmentRecord {
  id: string
  title: string
  titleGu: string
  classId: string
  standard: number
  subject: SkillCategory
  language: Locale
  status: AssessmentStatus
  targetStudentIds: string[]
  completedCount: number
  totalCount: number
  estimatedMinutes: number
  scheduledDate: string
  completedDate?: string
  rubricTemplateId: string
}

// Alias
export type Assessment = AssessmentRecord

export type PriorityLevel = 'High' | 'Medium' | 'Low'
export type ActionStatus = 'Pending' | 'In Progress' | 'Completed' | 'Deferred'

export interface TeacherActionRecord {
  id: string
  title: string
  titleGu: string
  titleHi: string
  description: string
  reason: string
  relatedSkill: string
  relatedSkillId?: string
  relatedStudentId?: string
  relatedStudentName?: string
  relatedClassId: string
  classroomId?: string
  className: string
  priority: PriorityLevel
  dueDate: string
  status: ActionStatus
  recommendedNextStep: string
  notes?: string
  createdBy?: string
}

// Alias
export type TeacherAction = TeacherActionRecord

export interface Notification {
  id: string
  recipientId: string
  type: 'assessment_review' | 'activity_completed' | 'action_due' | 'reassessment_scheduled' | 'plan_approval' | 'sync_status' | 'guardian_update'
  title: string
  message: string
  createdAt: string
  readAt?: string
  read: boolean
  targetRoute?: string
}

export interface SyncQueueItem {
  id: string
  entityType?: 'student' | 'assessment' | 'plan' | 'action' | 'question' | 'activity'
  entity?: string // alias for entityType
  entityId: string
  operation: 'create' | 'update' | 'assessment_submit' | 'plan_approve' | 'activity_complete'
  payload?: Record<string, unknown>
  createdAt?: string
  queuedAt?: string // alias for createdAt
  status: 'pending' | 'syncing' | 'failed' | 'synced'
  retryCount?: number
  errorMessage?: string
}

export interface AuditEvent {
  id: string
  actorId: string
  actorName: string
  role: Role
  eventType:
    | 'student_added'
    | 'student_updated'
    | 'class_reassigned'
    | 'assessment_created'
    | 'assessment_completed'
    | 'assessment_reviewed'
    | 'plan_created'
    | 'plan_approved'
    | 'activity_completed'
    | 'teacher_action_updated'
    | 'reassessment_scheduled'
    | 'content_published'
  entityType: 'student' | 'classroom' | 'assessment' | 'plan' | 'activity' | 'action' | 'user'
  entityId: string
  timestamp: string
  summary: string
  contextDetail?: string
}

export interface RolePermissions {
  canManageSchool: boolean
  canManageAcademicYears: boolean
  canManageClasses: boolean
  canManageUsers: boolean
  canRunAssessment: boolean
  canApprovePlans: boolean
  canManageContent: boolean
  canViewClusterReports: boolean
  canViewDistrictReports: boolean
  canAccessGuardianPortal: boolean
}
