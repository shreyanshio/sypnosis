import { LearningActivityItem, LearningPlanRecord } from '@/lib/types'

export const INITIAL_PLANS: LearningPlanRecord[] = [
  {
    id: 'plan-aarav-k',
    studentId: 'aarav-k',
    studentName: 'Aarav Kumar',
    classId: 'class-std-3a',
    title: 'Concrete Bundling & Place Value Pathway',
    titleGu: 'સળી-કાંકરા જૂથ નિર્માણ અને સ્થાન કિંમત ઉપચાર માર્ગ',
    status: 'Pending approval',
    targetSkill: 'Place Value & 2-Digit Regrouping',
    prerequisiteGap: 'Bundling 10 units into 1 ten bundle (tens and ones positional value)',
    teacherNotes:
      'Recommended for morning foundational small-group session. Use physical straw bundles with rubber bands.',
    startDate: '2026-10-27',
    targetCompletionDate: '2026-11-01',
    weeklySchedule: [
      {
        day: 'Monday',
        dayGu: 'સોમવાર',
        dayHi: 'सोमवार',
        activityTitle: 'Pencil & Straw Bundles: Grouping 10s and 1s',
        targetSkill: 'Tactile Ten-Bundles',
        durationMinutes: 12,
        status: 'pending',
      },
      {
        day: 'Tuesday',
        dayGu: 'મંગળવાર',
        dayHi: 'मंगलवार',
        activityTitle: 'Dual-Column Tens Mat: Number Construction',
        targetSkill: 'Place Value Columns',
        durationMinutes: 15,
        status: 'scheduled',
      },
      {
        day: 'Wednesday',
        dayGu: 'બુધવાર',
        dayHi: 'बुधवार',
        activityTitle: 'Decade Leap Partner Game',
        targetSkill: 'Exchanging 10 Units for 1 Token',
        durationMinutes: 10,
        status: 'scheduled',
      },
      {
        day: 'Thursday',
        dayGu: 'ગુરુવાર',
        dayHi: 'गुरुवार',
        activityTitle: 'Expanded Form Flashcard Overlay (40 + 7 = 47)',
        targetSkill: 'Expanded Notation',
        durationMinutes: 12,
        status: 'scheduled',
      },
      {
        day: 'Friday',
        dayGu: 'શુક્રવાર',
        dayHi: 'शुक्रवार',
        activityTitle: 'Class 3 Regrouping Check & Mastery Reflection',
        targetSkill: 'Formative Review',
        durationMinutes: 10,
        status: 'scheduled',
      },
    ],
    activities: [
      {
        id: 'act-aarav-1',
        title: 'Pencil & Straw Bundles: Grouping 10s and 1s',
        titleGu: 'સળી અને રબરબેન્ડ: દસ દસની ભારી અને છૂટી સળીઓ',
        titleHi: 'तीलियों के बंडल: १०-१० के समूह बनाना',
        subject: 'numeracy',
        targetSkillId: 'num-bundling',
        targetSkillName: 'Place Value Bundling',
        prerequisiteSkillName: 'Physical grouping of 10 units into 1 ten',
        gradeRange: 'Class 2-3',
        format: 'guided_math',
        duration: '12 mins',
        curriculumMapping: 'GCERT Class 3 Sem 1 LO-M304 (Tens & Ones)',
        description: 'Use physical bundles of 10 straws and single loose straws to physically build numbers 21 to 49.',
        materialsNeeded: '40 drinking straws, 5 rubber bands, and a dual-column sorting board.',
        teacherScriptGu:
          "આરવને ૩૪ બનાવવા કહો. પૂછો: 'દસ દસની કેટલી ભારી જોઈશે? છૂટી કેટલી જોઈશે?' સ્થાન કિંમત બોર્ડ પર ગોઠવડાવો.",
        teacherScriptEn:
          "Ask Aarav: 'How many bundles of 10 do you need for 34? How many loose straws?' Guide him to place them on the place-value mat.",
        status: 'ready',
      },
      {
        id: 'act-aarav-2',
        title: 'Base-10 Tens Mat: Number Construction',
        titleGu: 'દશક-એકમ પાટી: સંખ્યા નિર્માણ',
        titleHi: 'दहाई-इकाई बोर्ड: संख्या निर्माण',
        subject: 'numeracy',
        targetSkillId: 'num-decomposition',
        targetSkillName: 'Positional Place Value Notation',
        prerequisiteSkillName: 'Associating tens digit with decade value',
        gradeRange: 'Class 2-3',
        format: 'number_line',
        duration: '15 mins',
        curriculumMapping: 'GCERT Class 3 Sem 1 LO-M305',
        description:
          'Construct 2-digit numbers on a dual-column board with tens towers and loose beads. Emphasize that digit 4 in tens place represents 40.',
        materialsNeeded: 'Dual-column felt mat, tens strips (10-90), unit counters (1-9).',
        teacherScriptGu: "૪૭ માં ૪ નું કાર્ડ દશકમાં મૂકો. પૂછો: 'આ ૪ નું મૂલ્ય ૪ છે કે ૪૦?'",
        teacherScriptEn: "Place digit 4 in tens column. Ask: 'Is this 4 or 40?'",
        status: 'locked',
      },
      {
        id: 'act-aarav-3',
        title: 'Decade Leap Partner Game',
        titleGu: 'દસકો કૂદકો: ૧૦ કાંકરા બદલીને ૧ ભારી મેળવો',
        titleHi: 'दस का उछाल: कंकड़ विनिमय खेल',
        subject: 'numeracy',
        targetSkillId: 'num-regrouping',
        targetSkillName: 'Concrete Regrouping Intuition',
        prerequisiteSkillName: 'Understanding 10 units = 1 ten',
        gradeRange: 'Class 3',
        format: 'flashcards',
        duration: '10 mins',
        curriculumMapping: 'GCERT Class 3 Sem 1 LO-M308 (Regrouping)',
        description: 'Pair game where learners roll dice and bundle counters as soon as 10 is reached.',
        materialsNeeded: '20 counters, 5 gold tokens (representing tens), 1 dice.',
        teacherScriptGu: "જેવા ૧૦ કાંકરા થાય એટલે 'દસકો!' બોલીને ૧ પીળી ટોકન મેળવો. હાથમાં કેટલા છૂટા વધ્યા તે ગણો.",
        teacherScriptEn: "As soon as counters reach 10, call 'Tens!' and exchange for 1 ten-token. Count the remainder.",
        status: 'locked',
      },
    ],
  },
  {
    id: 'plan-meera-p',
    studentId: 'meera-p',
    studentName: 'Meera Patel',
    classId: 'class-std-3a',
    title: 'Phonemic Blends & Story Segmenting',
    titleGu: 'જોડાક્ષર ઉચ્ચારણ અને વાર્તા વાચન ઉપચાર માર્ગ',
    status: 'Approved',
    targetSkill: 'Consonant Blends & Story Context',
    prerequisiteGap: 'Consonant blend recognition (bl, st, tr) in continuous text',
    approvedAt: 'Yesterday, 3:15 PM',
    approvedBy: 'Asha Shah',
    teacherNotes: 'Meera is progressing smoothly with initial sound cards. Pair with Kavya during library hour.',
    startDate: '2026-10-23',
    targetCompletionDate: '2026-10-29',
    weeklySchedule: [
      {
        day: 'Monday',
        dayGu: 'સોમવાર',
        dayHi: 'सोमवार',
        activityTitle: 'Blend Flashcards: Sound Sorting',
        targetSkill: 'Blend Discrimination',
        durationMinutes: 10,
        status: 'completed',
      },
      {
        day: 'Tuesday',
        dayGu: 'મંગળવાર',
        dayHi: 'मंगलवार',
        activityTitle: 'Sentence Whisper-Read with Partner',
        targetSkill: 'Context Fluency',
        durationMinutes: 12,
        status: 'completed',
      },
      {
        day: 'Wednesday',
        dayGu: 'બુધવાર',
        dayHi: 'बुधवार',
        activityTitle: 'Decodable Folktale Card Match',
        targetSkill: 'Reading Comprehension',
        durationMinutes: 15,
        status: 'scheduled',
      },
    ],
    activities: [
      {
        id: 'act-meera-1',
        title: 'Blend Flashcards: Sound Sorting',
        titleGu: 'જોડાક્ષર કાર્ડ વર્ગીકરણ',
        titleHi: 'संयुक्ताक्षर कार्ड मिलान',
        subject: 'literacy',
        targetSkillId: 'guj-matra',
        targetSkillName: 'Initial Blend Discrimination',
        prerequisiteSkillName: 'Phoneme blending',
        gradeRange: 'Class 3',
        format: 'phonics',
        duration: '10 mins',
        curriculumMapping: 'GCERT Gujarati Class 3 LO-L302',
        description: 'Sort picture cards by initial blend sounds (/st/, /cl/, /tr/). Speak words aloud.',
        materialsNeeded: '10 illustrated blend flashcards.',
        status: 'completed',
        completedAt: 'Yesterday',
        teacherObservation: 'Meera sorted 9/10 cards accurately without hesitation.',
      },
      {
        id: 'act-meera-2',
        title: 'Sentence Whisper-Read with Partner',
        titleGu: 'જોડીદાર સાથે ધીમેથી વાક્ય વાચન',
        titleHi: 'साथी के साथ वाक्य पठन',
        subject: 'literacy',
        targetSkillId: 'guj-comprehension',
        targetSkillName: 'Contextual Sentence Fluency',
        prerequisiteSkillName: 'Decoding short sentences',
        gradeRange: 'Class 3',
        format: 'audio_practice',
        duration: '12 mins',
        curriculumMapping: 'GCERT Gujarati Class 3 LO-L304',
        description: 'Whisper-read 3 short decodable decathlon sentences with a peer partner.',
        materialsNeeded: 'Laminated sentence cards.',
        status: 'completed',
        completedAt: 'Today',
        teacherObservation: 'Read fluently with good pace; answered location questions correctly.',
      },
    ],
  },
]

const STORAGE_KEY = 'saksham_fln_plans_v1'

export const learningPlanService = {
  getPlans: (): LearningPlanRecord[] => {
    let list = INITIAL_PLANS
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

  getPlanById: (planId: string): LearningPlanRecord | undefined => {
    const list = learningPlanService.getPlans()
    return list.find((p) => p.id === planId)
  },

  getPlanByStudentId: (studentId: string): LearningPlanRecord | undefined => {
    const list = learningPlanService.getPlans()
    return list.find((p) => p.studentId === studentId)
  },

  approvePlan: (planId: string, teacherNotes: string): LearningPlanRecord | undefined => {
    const list = learningPlanService.getPlans()
    let updatedPlan: LearningPlanRecord | undefined
    const nextList = list.map((p) => {
      if (p.id === planId) {
        updatedPlan = {
          ...p,
          status: 'Approved' as const,
          approvedAt: 'Just now',
          approvedBy: 'Teacher Asha Shah',
          teacherNotes: teacherNotes || p.teacherNotes,
        }
        return updatedPlan
      }
      return p
    })

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
    return updatedPlan
  },

  completeActivity: (planId: string, activityId: string, observation: string): LearningPlanRecord | undefined => {
    const list = learningPlanService.getPlans()
    let updatedPlan: LearningPlanRecord | undefined
    const nextList = list.map((p) => {
      if (p.id === planId) {
        const actIndex = p.activities.findIndex((a) => a.id === activityId)
        const updatedActivities = p.activities.map((act, idx) => {
          if (act.id === activityId) {
            return {
              ...act,
              status: 'completed' as const,
              completedAt: 'Just now',
              teacherObservation: observation,
            }
          }
          if (idx === actIndex + 1) {
            return {
              ...act,
              status: 'ready' as const,
            }
          }
          return act
        })

        updatedPlan = {
          ...p,
          activities: updatedActivities,
          status: updatedActivities.every((a) => a.status === 'completed') ? ('Completed' as const) : ('In progress' as const),
        }
        return updatedPlan
      }
      return p
    })

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
      } catch {
        // Ignore
      }
    }
    return updatedPlan
  },
}
