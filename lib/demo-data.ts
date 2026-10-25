'use client'

import type { DiagnosticEvaluationResult } from './fln-scoring-engine'

export interface PracticeActivity {
  id: string
  title: string
  description: string
  duration: string
  status: 'locked' | 'in_progress' | 'completed'
  completedAt?: string
  teacherNote?: string
  focusPrerequisite: string
}

export interface Student {
  id: string
  name: string
  fullName: string
  grade: string
  rollNo: string
  avatar: string
  focusSkill: string
  status: 'Needs support' | 'Practising' | 'Ready to progress'
  diagnosticStatus: 'Pending assessment' | 'In progress' | 'Completed'
  diagnosticScore?: number
  prerequisiteGap: string
  pedagogicalInsight?: string
  planStatus: 'Not started' | 'Pending approval' | 'Approved'
  planTitle?: string
  approvedAt?: string
  approvedBy?: string
  progressPercent: number
  activities: PracticeActivity[]
  diagnosticResult?: DiagnosticEvaluationResult
}

export interface TeacherAction {
  id: string
  text: string
  dueText: string
  completed: boolean
}

export interface DemoState {
  currentStage: number
  selectedStudentId: string | null
  syncStatus: 'idle' | 'syncing' | 'synced'
  lastSyncedAt: string
  awaitingSyncCount: number
  milestonesThisWeek: number
  studentsAssessedCount: number
  totalStudentsCount: number
  activePlansCount: number
  students: Student[]
  actions: TeacherAction[]
  timeFilter: '6w' | '4w' | 'term1'
  notifications: Array<{
    id: string
    title: string
    detail: string
    time: string
    read: boolean
  }>
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'aarav-k',
    name: 'Aarav K.',
    fullName: 'Aarav Kumar',
    grade: 'Class 3A',
    rollNo: '14',
    avatar: 'AK',
    focusSkill: 'Place value & regrouping',
    status: 'Needs support',
    diagnosticStatus: 'Pending assessment',
    prerequisiteGap: 'Bundling 10 ones into 1 ten (prerequisite understanding)',
    progressPercent: 25,
    planStatus: 'Not started',
    planTitle: 'Concrete Bundling & Place Value Pathway',
    pedagogicalInsight:
      'Aarav reliably counts up to 20, but confuses tens and ones when crossing decade boundaries. Focus on tactile bundling with straws and decade mats rather than rote worksheets.',
    activities: [
      {
        id: 'act-1',
        title: 'Pencil & Straw Bundles: Grouping 10s and 1s',
        description: 'Use physical bundles of 10 straws and single straws to represent numbers 21 to 49.',
        duration: '12 mins',
        status: 'in_progress',
        focusPrerequisite: 'Physical grouping of 10 units',
      },
      {
        id: 'act-2',
        title: 'Base-10 Tens Mat: Number Construction',
        description: 'Construct 2-digit numbers on a dual-column board with tens towers and loose beads.',
        duration: '15 mins',
        status: 'locked',
        focusPrerequisite: 'Visual column partitioning',
      },
      {
        id: 'act-3',
        title: 'Decade Leap Partner Game',
        description: 'Pair game where learners roll dice and bundle counters as soon as 10 is reached.',
        duration: '10 mins',
        status: 'locked',
        focusPrerequisite: 'Regrouping exchange intuition',
      },
    ],
  },
  {
    id: 'meera-p',
    name: 'Meera P.',
    fullName: 'Meera Patel',
    grade: 'Class 3A',
    rollNo: '09',
    avatar: 'MP',
    focusSkill: 'Word decoding & blends',
    status: 'Practising',
    diagnosticStatus: 'Completed',
    diagnosticScore: 78,
    prerequisiteGap: 'Consonant blend recognition (bl, st, tr)',
    progressPercent: 60,
    planStatus: 'Approved',
    planTitle: 'Phonemic Blends & Story Segmenting',
    approvedAt: 'Yesterday, 3:15 PM',
    approvedBy: 'Asha Shah',
    pedagogicalInsight: 'Meera reads individual phonemes clearly. Scaffold initial blends with rhythmic reading cards.',
    activities: [
      {
        id: 'act-m1',
        title: 'Blend Flashcards: Sound Sorting',
        description: 'Sort picture cards by initial blend sounds (/st/, /cl/, /tr/).',
        duration: '10 mins',
        status: 'completed',
        completedAt: 'Yesterday',
        teacherNote: 'Sorted 9/10 cards accurately.',
        focusPrerequisite: 'Blend discrimination',
      },
      {
        id: 'act-m2',
        title: 'Sentence Whisper-Read',
        description: 'Whisper-read 3 short decodable decathlon sentences with a peer partner.',
        duration: '12 mins',
        status: 'in_progress',
        focusPrerequisite: 'Contextual fluency',
      },
    ],
  },
  {
    id: 'dev-r',
    name: 'Dev R.',
    fullName: 'Dev Rathod',
    grade: 'Class 3A',
    rollNo: '22',
    avatar: 'DR',
    focusSkill: 'Number sense & skip counting',
    status: 'Ready to progress',
    diagnosticStatus: 'Completed',
    diagnosticScore: 92,
    prerequisiteGap: 'Mastered Class 3 FLN baseline; ready for Class 4 bridging',
    progressPercent: 90,
    planStatus: 'Approved',
    planTitle: 'Advanced Number Sequences & Estimation',
    approvedAt: '3 days ago',
    approvedBy: 'Asha Shah',
    pedagogicalInsight: 'Dev shows high automaticity. Challenge with open number line estimation and multi-step word riddles.',
    activities: [
      {
        id: 'act-d1',
        title: 'Open Number Line Estimation',
        description: 'Place 3-digit benchmarks on an empty string with pegs.',
        duration: '15 mins',
        status: 'completed',
        completedAt: '2 days ago',
        teacherNote: 'Mastered within 5% error margin.',
        focusPrerequisite: 'Linear scale comprehension',
      },
    ],
  },
  {
    id: 'priya-s',
    name: 'Priya S.',
    fullName: 'Priya Sharma',
    grade: 'Class 3A',
    rollNo: '18',
    avatar: 'PS',
    focusSkill: 'Reading comprehension',
    status: 'Practising',
    diagnosticStatus: 'Completed',
    diagnosticScore: 72,
    prerequisiteGap: 'Inferential question reasoning from short folk tales',
    progressPercent: 50,
    planStatus: 'Approved',
    planTitle: 'Picture-Prompted Narrative Inferences',
    activities: [],
  },
  {
    id: 'rohan-m',
    name: 'Rohan M.',
    fullName: 'Rohan Mehta',
    grade: 'Class 3A',
    rollNo: '27',
    avatar: 'RM',
    focusSkill: 'Addition with regrouping',
    status: 'Needs support',
    diagnosticStatus: 'Pending assessment',
    prerequisiteGap: 'Decomposing two-digit numbers into tens and units',
    progressPercent: 20,
    planStatus: 'Not started',
    activities: [],
  },
]

export const INITIAL_ACTIONS: TeacherAction[] = [
  { id: 'act-1', text: 'Revisit place value with Group B (Aarav, Rohan)', dueText: 'Due today', completed: false },
  { id: 'act-2', text: 'Approve Meera’s weekly phonics pathway', dueText: 'Due today', completed: false },
  { id: 'act-3', text: 'Review last week’s progress notes for Class 3A', dueText: 'Due this week', completed: true },
]

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Diagnostic Ready: Aarav K.',
    detail: 'Aarav has completed the initial counting stage. Run the 3-minute place value check.',
    time: '10m ago',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Practice milestone achieved',
    detail: 'Meera P. completed Blend Flashcards with 90% accuracy.',
    time: '2h ago',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Sync reminder',
    detail: '3 assessment records recorded offline are waiting for synchronization.',
    time: 'Yesterday',
    read: true,
  },
]

const STORAGE_KEY = 'saksham_fln_demo_state_v1'

export function getInitialDemoState(): DemoState {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // Ignore local storage errors in private browsing
    }
  }

  return {
    currentStage: 1,
    selectedStudentId: null,
    syncStatus: 'idle',
    lastSyncedAt: 'Today, 8:45 AM',
    awaitingSyncCount: 3,
    milestonesThisWeek: 38,
    studentsAssessedCount: 24,
    totalStudentsCount: 28,
    activePlansCount: 17,
    students: INITIAL_STUDENTS,
    actions: INITIAL_ACTIONS,
    timeFilter: '6w',
    notifications: INITIAL_NOTIFICATIONS,
  }
}

export function saveDemoState(state: DemoState): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore write errors
    }
  }
}

export function resetDemoState(): DemoState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore write errors
    }
  }
  return {
    currentStage: 2,
    selectedStudentId: null,
    syncStatus: 'idle',
    lastSyncedAt: 'Just now',
    awaitingSyncCount: 3,
    milestonesThisWeek: 38,
    studentsAssessedCount: 24,
    totalStudentsCount: 28,
    activePlansCount: 17,
    students: INITIAL_STUDENTS,
    actions: INITIAL_ACTIONS,
    timeFilter: '6w',
    notifications: INITIAL_NOTIFICATIONS,
  }
}
