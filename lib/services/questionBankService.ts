import { Question } from '@/lib/types'
import { localStore, STORAGE_KEYS } from '@/lib/storage'
import { FLN_DIAGNOSTIC_QUESTIONS } from '@/lib/fln-scoring-engine'

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-guj-01',
    skillId: 'guj-matra',
    skillName: 'Gujarati Matra & Phonics (માત્રા અને મૂળાક્ષર ઓળખ)',
    prerequisiteSkillIds: ['guj-vyanjan'],
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    type: 'multiple_choice',
    prompt: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    promptGu: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    promptEn: "The picture shows 'તારા' (Stars). Which matra is used in the word 'તારા'?",
    options: [
      { id: 'opt-1a', labelGu: "કાનો 'ા' (ત + ા + ર + ા = તારા)", labelEn: "Kano 'aa' vowel marker (Correct)", isCorrect: true },
      { id: 'opt-1b', labelGu: "હ્રસ્વ ઇ 'િ' (તિરા)", labelEn: "Short 'i'", isCorrect: false, misconceptionDiagnosis: "Confused 'aa' with 'i'." },
      { id: 'opt-1c', labelGu: "દીર્ઘ ઉ 'ૂ' (તૂરુ)", labelEn: "Long 'u'", isCorrect: false, misconceptionDiagnosis: "Vowel symbol confusion." },
      { id: 'opt-1d', labelGu: "એક માત્ર 'ે' (તેરે)", labelEn: "Top matra 'e'", isCorrect: false, misconceptionDiagnosis: "Top stroke confusion." },
    ],
    correctAnswer: 'opt-1a',
    explanation: "'તારા' શબ્દમાં ત અને ર બંને અક્ષરો સાથે કાનો 'ા' જોડાયેલો છે.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-guj-02',
    skillId: 'guj-comprehension',
    skillName: 'Gujarati Sentence Comprehension (સરળ વાક્ય સમજ)',
    prerequisiteSkillIds: ['guj-matra', 'guj-word-decoding'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Standard' as any,
    type: 'multiple_choice',
    prompt: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    promptGu: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    promptEn: "Read: 'Meena plucks flowers in the garden.' Where does Meena pluck flowers?",
    options: [
      { id: 'opt-2a', labelGu: 'બાગમાં (In the garden)', labelEn: 'In the garden (Correct retrieval)', isCorrect: true },
      { id: 'opt-2b', labelGu: 'શાળામાં (In school)', labelEn: 'In school', isCorrect: false, misconceptionDiagnosis: "Relying on school vocabulary guess." },
      { id: 'opt-2c', labelGu: 'ઘરમાં (At home)', labelEn: 'At home', isCorrect: false, misconceptionDiagnosis: "Contextual guess without decoding text." },
      { id: 'opt-2d', labelGu: 'નદીએ (By the river)', labelEn: 'By the river', isCorrect: false, misconceptionDiagnosis: "Unrelated guess." },
    ],
    correctAnswer: 'opt-2a',
    explanation: "વાક્યમાં સ્પષ્ટ લખ્યું છે કે 'મીના બાગમાં ફૂલ ચૂંટે છે', એટલે સ્થળ 'બાગમાં' છે.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-01',
    skillId: 'num-bundling',
    skillName: 'Tens Bundling & Unit Representation (દસ-દસના જૂથ અને એકમ)',
    prerequisiteSkillIds: ['num-counting-20'],
    gradeRange: 'Class 2-3',
    locale: 'gu',
    difficulty: 'Foundation',
    type: 'picture_selection',
    prompt: 'દસ સળીઓની ૨ ભારી (Bundles) અને ૪ છૂટી સળીઓ ભેગી કરીએ તો કુલ કેટલી સંખ્યા બને?',
    promptGu: 'દસ સળીઓની ૨ ભારી (Bundles) અને ૪ છૂટી સળીઓ ભેગી કરીએ તો કુલ કેટલી સંખ્યા બને?',
    promptEn: 'If we combine 2 bundles of 10 straws and 4 single loose straws, what is the total number?',
    options: [
      { id: 'opt-3a', labelGu: '૨૪ (2 Tens and 4 Ones = 24)', labelEn: '24 (Correct place value)', isCorrect: true },
      { id: 'opt-3b', labelGu: '૬ (૨ ભારી + ૪ સળી = ૬)', labelEn: '6 (Treated bundle as single straw)', isCorrect: false, misconceptionDiagnosis: "Treated bundle of 10 as value of 1." },
      { id: 'opt-3c', labelGu: '૪૨ (અદલાબદલી: ૪ દશક અને ૨ એકમ)', labelEn: '42 (Reversed digits)', isCorrect: false, misconceptionDiagnosis: "Inverted tens and ones columns." },
      { id: 'opt-3d', labelGu: '૨૦૪ (૨ અને ૪ જોડે લખી દીધા)', labelEn: '204 (Concatenated numbers)', isCorrect: false, misconceptionDiagnosis: "Literal concatenation of 20 and 4." },
    ],
    correctAnswer: 'opt-3a',
    explanation: '૨ દશક = ૨૦, અને ૪ એકમ = ૪. ૨૦ + ૪ = ૨૪.',
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-02',
    skillId: 'num-decomposition',
    skillName: 'Place Value Decomposition (સંખ્યાનું સ્થાન આધારિત વિસ્તરણ)',
    prerequisiteSkillIds: ['num-bundling'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Standard' as any,
    type: 'multiple_choice',
    prompt: "સંખ્યા '૪૭' માં ૪ ની સ્થાન કિંમત (Place Value) કેટલી છે?",
    promptGu: "સંખ્યા '૪૭' માં ૪ ની સ્થાન કિંમત (Place Value) કેટલી છે?",
    promptEn: "What is the place value of digit '4' in the number 47?",
    options: [
      { id: 'opt-4a', labelGu: '૪૦ (૪ દશક = ૪૦)', labelEn: '40 (4 Tens = 40, Correct)', isCorrect: true },
      { id: 'opt-4b', labelGu: '૪ (ફક્ત અંકનું મૂલ્ય)', labelEn: '4 (Face value only)', isCorrect: false, misconceptionDiagnosis: "Confused face value with place value." },
      { id: 'opt-4c', labelGu: '૭ (એકમનો અંક કહ્યો)', labelEn: '7 (Selected units digit)', isCorrect: false, misconceptionDiagnosis: "Ignored the question focus on digit 4." },
      { id: 'opt-4d', labelGu: '૪૭ (સંપૂર્ણ સંખ્યા)', labelEn: '47 (Stated the whole number)', isCorrect: false, misconceptionDiagnosis: "Failed to isolate positional weight." },
    ],
    correctAnswer: 'opt-4a',
    explanation: "૪૭ માં ૪ દશકના સ્થાને છે, તેથી તેની સ્થાન કિંમત ૪ × ૧૦ = ૪૦ થાય.",
    reviewStatus: 'Published',
  },
  {
    id: 'q-num-03',
    skillId: 'num-regrouping',
    skillName: 'Regrouping & Decade Transitions (વદ્દીવાળા સરવાળાની પૂર્વતૈયારી)',
    prerequisiteSkillIds: ['num-decomposition'],
    gradeRange: 'Class 3',
    locale: 'gu',
    difficulty: 'Grade Level',
    type: 'multiple_choice',
    prompt: 'તમારી પાસે ૧૨ કાંકરા છે. જો ૧૦ કાંકરા ભેગા કરીને ૧ ભારી બનાવો, તો હાથમાં કેટલી ભારી અને કેટલા છૂટા કાંકરા રહે?',
    promptGu: 'તમારી પાસે ૧૨ કાંકરા છે. જો ૧૦ કાંકરા ભેગા કરીને ૧ ભારી બનાવો, તો હાથમાં કેટલી ભારી અને કેટલા છૂટા કાંકરા રહે?',
    promptEn: 'You have 12 pebbles. If you bundle 10 pebbles into 1 bag, how many bags and loose pebbles do you have?',
    options: [
      { id: 'opt-5a', labelGu: '૧ ભારી અને ૨ છૂટા કાંકરા (10 + 2 = 12)', labelEn: '1 Bundle and 2 Loose (Correct regrouping)', isCorrect: true },
      { id: 'opt-5b', labelGu: '૨ ભારી અને ૧ છૂટો કાંકરો (ઊંધું જૂથ)', labelEn: '2 Bundles and 1 Loose', isCorrect: false, misconceptionDiagnosis: "Positional inversion." },
      { id: 'opt-5c', labelGu: '૦ ભારી અને ૧૨ છૂટા કાંકરા (જૂથ નથી બન્યું)', labelEn: '0 Bundles and 12 Loose', isCorrect: false, misconceptionDiagnosis: "Failed to trigger regrouping boundary." },
      { id: 'opt-5d', labelGu: '૧૦ ભારી અને ૨ છૂટા (સંખ્યા ગૂંચવાડો)', labelEn: '10 Bundles and 2 Loose', isCorrect: false, misconceptionDiagnosis: "Confused group count with unit count." },
    ],
    correctAnswer: 'opt-5a',
    explanation: '૧૨ એટલે ૧૦ + ૨. ૧૦ કાંકરાની ૧ ભારી બને અને ૨ કાંકરા છૂટા રહે.',
    reviewStatus: 'Published',
  },
]

export const questionBankService = {
  getQuestions: (filter?: {
    skillId?: string
    subjectId?: string
    difficulty?: string
    reviewStatus?: string
    search?: string
  }): Question[] => {
    let list = localStore.get<Question[]>(STORAGE_KEYS.QUESTIONS, INITIAL_QUESTIONS)

    return list.filter((q) => {
      if (filter?.skillId && q.skillId !== filter.skillId) return false
      if (filter?.difficulty && filter.difficulty !== 'All' && q.difficulty !== filter.difficulty) return false
      if (filter?.reviewStatus && filter.reviewStatus !== 'All' && q.reviewStatus !== filter.reviewStatus) return false
      if (filter?.search) {
        const term = filter.search.toLowerCase().trim()
        const matchPrompt = q.prompt.toLowerCase().includes(term) || q.promptGu.toLowerCase().includes(term)
        const matchSkill = q.skillName.toLowerCase().includes(term)
        if (!matchPrompt && !matchSkill) return false
      }
      return true
    })
  },

  getQuestionById: (id: string): Question | undefined => {
    const list = questionBankService.getQuestions()
    return list.find((q) => q.id === id)
  },

  saveQuestion: (question: Question): void => {
    const list = questionBankService.getQuestions()
    const index = list.findIndex((q) => q.id === question.id)
    let nextList: Question[]
    if (index >= 0) {
      nextList = list.map((q) => (q.id === question.id ? question : q))
    } else {
      nextList = [question, ...list]
    }
    localStore.set(STORAGE_KEYS.QUESTIONS, nextList)
  },

  updateReviewStatus: (id: string, reviewStatus: Question['reviewStatus']): void => {
    const q = questionBankService.getQuestionById(id)
    if (q) {
      questionBankService.saveQuestion({ ...q, reviewStatus })
    }
  },
}
