import { LearningActivity } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'

export const INITIAL_ACTIVITIES: LearningActivity[] = [
  {
    id: 'act-res-01',
    title: 'Pencil & Straw Bundles: Grouping 10s and 1s',
    titleGu: 'સળી અને રબરબેન્ડ: દસ દસની ભારી અને છૂટી સળીઓ',
    titleHi: 'तीलियों के बंडल: १०-१० के समूह बनाना',
    subjectId: 'numeracy',
    skillId: 'num-bundling',
    targetSkillName: 'Place Value Bundling',
    prerequisiteSkillIds: ['num-counting-20'],
    prerequisiteSkillName: 'Counting sequence up to 20',
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    durationMinutes: 12,
    duration: '12 mins',
    contentType: 'guided_math',
    format: 'guided_math',
    resourceReference: '/resources/tactile-bundling-kit.pdf',
    curriculumMapping: 'GCERT Class 3 Sem 1 LO-M304',
    curriculumReviewStatus: 'Verified',
    publicationStatus: 'Published',
    description: 'Use physical bundles of 10 straws and single loose straws to physically construct numbers 21 to 49.',
    materialsNeeded: '40 drinking straws, 5 rubber bands, and a dual-column sorting board.',
    teacherScriptGu: "બાળકને ૩૪ બનાવવા કહો. પૂછો: 'દસ દસની કેટલી ભારી જોઈશે? છૂટી કેટલી જોઈશે?' સ્થાન કિંમત બોર્ડ પર ગોઠવડાવો.",
    teacherScriptEn: "Ask student: 'How many bundles of 10 do you need for 34? How many loose straws?' Guide them on the tens mat.",
    status: 'ready',
  },
  {
    id: 'act-res-02',
    title: 'Base-10 Tens Mat: Number Construction',
    titleGu: 'દશક-એકમ પાટી: સંખ્યા નિર્માણ',
    titleHi: 'दहाई-इकाई बोर्ड: संख्या निर्माण',
    subjectId: 'numeracy',
    skillId: 'num-decomposition',
    targetSkillName: 'Positional Place Value Notation',
    prerequisiteSkillIds: ['num-bundling'],
    prerequisiteSkillName: 'Associating tens digit with decade value',
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Standard',
    durationMinutes: 15,
    duration: '15 mins',
    contentType: 'number_line',
    format: 'number_line',
    resourceReference: '/resources/tens-mat-activity.pdf',
    curriculumMapping: 'GCERT Class 3 Sem 1 LO-M305',
    curriculumReviewStatus: 'Verified',
    publicationStatus: 'Published',
    description: 'Place ten-strips and unit tiles onto a dual-column printed mat to represent spoken numbers.',
    materialsNeeded: 'Printed dual-column place value mat, 10-strips, unit beads.',
    teacherScriptGu: "સંખ્યા ૫૨ બોલો. બાળકને ૫ દશકની પટ્ટી અને ૨ એકમના મણકા ગોઠવવા કહો. પછી પૂછો: '૫ નું મૂલ્ય કેટલું છે?'",
    status: 'ready',
  },
  {
    id: 'act-res-03',
    title: 'Decade Leap Partner Game: Pebble Exchange',
    titleGu: 'દસકો કૂદકો: ૧૦ કાંકરા બદલીને ૧ ભારી મેળવો',
    titleHi: 'दहाई छलांग: कंकड़ विनिमय खेल',
    subjectId: 'numeracy',
    skillId: 'num-regrouping',
    targetSkillName: 'Concrete Regrouping Intuition',
    prerequisiteSkillIds: ['num-decomposition'],
    prerequisiteSkillName: 'Decomposing 2-digit numbers into tens and ones',
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Extension',
    durationMinutes: 10,
    duration: '10 mins',
    contentType: 'guided_math',
    format: 'guided_math',
    resourceReference: '/resources/decade-leap-game.pdf',
    curriculumMapping: 'GCERT Class 3 Sem 1 LO-M308',
    curriculumReviewStatus: 'Verified',
    publicationStatus: 'Published',
    description: 'Pair game where students roll dice, collect pebbles, and exchange 10 single pebbles for 1 yellow counter token.',
    materialsNeeded: '20 pebbles, 6 colored tokens, dice.',
    teacherScriptGu: "જેવા ૧૦ કાંકરા થાય એટલે 'દસકો!' બોલીને ૧ પીળી ટોકન મેળવો. હાથમાં કેટલા છૂટા વધ્યા તે ગણો.",
    status: 'ready',
  },
  {
    id: 'act-res-04',
    title: 'Gujarati Matra Flashcards: Kano & Matra Pairing',
    titleGu: 'ગુજરાતી માત્રા ફ્લેશકાર્ડ: કાનો (ા) અને અક્ષર જોડાણ',
    titleHi: 'गुजराती मात्रा फ्लैशकार्ड: काना (ा) और अक्षर मिलान',
    subjectId: 'literacy',
    skillId: 'guj-matra',
    targetSkillName: 'Gujarati Phonics & Matra Discrimination',
    prerequisiteSkillIds: ['guj-vyanjan'],
    prerequisiteSkillName: 'Consonant sound recognition',
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    durationMinutes: 10,
    duration: '10 mins',
    contentType: 'flashcards',
    format: 'flashcards',
    resourceReference: '/resources/gujarati-matra-cards.pdf',
    curriculumMapping: 'GCERT Class 2-3 Gujarati Bhasha LO-L202',
    curriculumReviewStatus: 'Verified',
    publicationStatus: 'Published',
    description: 'Show consonant card + Kano matra card. Child reads syllable aloud with rhythmic clapping.',
    materialsNeeded: '24 printed illustrated letter cards.',
    teacherScriptGu: "કાર્ડ બતાવો: 'ક + ા'. પૂછો: 'શું વંચાય?' બાળક બોલે 'કા'. પછી 'કાગડો', 'કાતર' શબ્દો જોડે બોલાવો.",
    status: 'ready',
  },
  {
    id: 'act-res-05',
    title: 'Short Decodable Story: Meena in the Garden',
    titleGu: 'સરળ વાચન વાર્તા: મીના બાગમાં',
    titleHi: 'सरल पठन कहानी: मीना बगीचे में',
    subjectId: 'literacy',
    skillId: 'guj-comprehension',
    targetSkillName: 'Decodable Sentence Comprehension',
    prerequisiteSkillIds: ['guj-matra'],
    prerequisiteSkillName: 'Sight word recognition',
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Standard',
    durationMinutes: 12,
    duration: '12 mins',
    contentType: 'audio_practice',
    format: 'audio_practice',
    resourceReference: '/resources/story-meena-garden.pdf',
    curriculumMapping: 'GCERT Class 3 Gujarati LO-L304',
    curriculumReviewStatus: 'Verified',
    publicationStatus: 'Published',
    description: '4-sentence decodable card with accompanying illustration. Student whisper-reads and answers 2 oral questions.',
    materialsNeeded: 'Laminated story card and comprehension question token.',
    teacherScriptGu: "વાર્તા મોટેથી વંચાવો. પૂછો: 'મીના ક્યાં ગઈ હતી? તેણે શું ચૂંટ્યું?' વાક્યમાં આંગળી મુકાવીને જવાબ શોધો.",
    status: 'ready',
  },
  {
    id: 'act-res-06',
    title: 'Printable Practice Worksheet: 2-Digit Bundling Mat',
    titleGu: 'પ્રિન્ટેબલ વર્કશીટ: સ્થાન કિંમત વિસ્તરણ મહાવરો',
    titleHi: 'अभ्यास कार्यपत्र: स्थानीय मान विस्तार अभ्यास',
    subjectId: 'numeracy',
    skillId: 'num-bundling',
    targetSkillName: 'Place Value Practice Sheet',
    prerequisiteSkillIds: ['num-bundling'],
    prerequisiteSkillName: 'Physical grouping',
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Standard',
    durationMinutes: 15,
    duration: '15 mins',
    contentType: 'worksheet',
    format: 'worksheet',
    resourceReference: '/resources/worksheet-place-value.pdf',
    curriculumMapping: 'GCERT Class 3 Math Sem 1 Practice',
    curriculumReviewStatus: 'Draft',
    publicationStatus: 'Published',
    description: 'Black-and-white reproducible sheet with pencil bundle illustrations for students to circle tens and write units.',
    materialsNeeded: 'Printout and pencil.',
    status: 'ready',
  },
]

export const learningActivityService = {
  getActivities: (filter?: {
    subjectId?: string
    contentType?: string
    difficulty?: string
    publicationStatus?: string
    search?: string
  }): LearningActivity[] => {
    let list = localStore.get<LearningActivity[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES)

    return list.filter((a) => {
      if (filter?.subjectId && filter.subjectId !== 'All' && a.subjectId !== filter.subjectId) return false
      if (filter?.contentType && filter.contentType !== 'All' && a.contentType !== filter.contentType) return false
      if (filter?.difficulty && filter.difficulty !== 'All' && a.difficulty !== filter.difficulty) return false
      if (filter?.publicationStatus && filter.publicationStatus !== 'All' && a.publicationStatus !== filter.publicationStatus) return false
      if (filter?.search) {
        const term = filter.search.toLowerCase().trim()
        const matchTitle = a.title.toLowerCase().includes(term) || a.titleGu.toLowerCase().includes(term)
        const matchSkill = a.targetSkillName.toLowerCase().includes(term)
        if (!matchTitle && !matchSkill) return false
      }
      return true
    })
  },

  getActivityById: (id: string): LearningActivity | undefined => {
    const list = learningActivityService.getActivities()
    return list.find((a) => a.id === id)
  },

  saveActivity: (activity: LearningActivity): void => {
    const list = learningActivityService.getActivities()
    const index = list.findIndex((a) => a.id === activity.id)
    let nextList: LearningActivity[]
    if (index >= 0) {
      nextList = list.map((a) => (a.id === activity.id ? activity : a))
    } else {
      nextList = [activity, ...list]
    }
    localStore.set(STORAGE_KEYS.ACTIVITIES, nextList)
  },

  updatePublicationStatus: (
    id: string,
    publicationStatus: LearningActivity['publicationStatus'],
    curriculumReviewStatus?: LearningActivity['curriculumReviewStatus']
  ): void => {
    const act = learningActivityService.getActivityById(id)
    if (act) {
      learningActivityService.saveActivity({
        ...act,
        publicationStatus,
        curriculumReviewStatus: curriculumReviewStatus || act.curriculumReviewStatus,
      })
    }
  },
}
