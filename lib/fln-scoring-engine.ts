'use client'

export interface FLNQuestion {
  id: string
  skillId: string
  skillName: string
  skillCategory: 'literacy' | 'numeracy'
  stageLabel: string
  questionGu: string
  questionEn: string
  visualType: 'stars' | 'garden' | 'bundles' | 'decomposition' | 'pebbles'
  visualStimulus: {
    badge: string
    titleGu: string
    titleEn: string
    detail: string
  }
  audioTranscriptGu: string
  audioTranscriptEn: string
  options: Array<{
    id: string
    labelGu: string
    labelEn: string
    isCorrect: boolean
    misconceptionDiagnosis?: string
  }>
}

export const FLN_DIAGNOSTIC_QUESTIONS: FLNQuestion[] = [
  {
    id: 'q1',
    skillId: 'guj-matra',
    skillName: 'Gujarati Matra & Phonics (માત્રા અને મૂળાક્ષર ઓળખ)',
    skillCategory: 'literacy',
    stageLabel: 'પ્રશ્ન ૧ / ૫ · Question 1 of 5',
    questionGu: "આ ચિત્રમાં 'તારા' (Stars) છે. 'તારા' શબ્દમાં કઈ માત્રા આવે છે?",
    questionEn: "The picture shows 'તારા' (Stars). Which matra is used in the word 'તારા'?",
    visualType: 'stars',
    visualStimulus: {
      badge: '⭐⭐',
      titleGu: 'ત + ા + ર + ા = તારા',
      titleEn: 'Word Construction: Ta + aa + Ra + aa',
      detail: 'કાના (ા) ની માત્રા ઓળખ · Matra Discrimination',
    },
    audioTranscriptGu:
      "આ ચિત્રમાં તારા છે. તારા શબ્દમાં કઈ માત્રા આવે છે? વિકલ્પો સાંભળો: કાનો 'ા', હ્રસ્વ ઇ 'િ', દીર્ઘ ઉ 'ૂ', કે એક માત્ર 'ે'.",
    audioTranscriptEn:
      "The picture shows 'Tara' (Stars). Which matra is used in 'Tara'? Options: Kano 'aa', Short 'i', Long 'u', or Ek matra 'e'.",
    options: [
      {
        id: 'opt-1a',
        labelGu: "કાનો 'ા' (ત + ા + ર + ા = તારા)",
        labelEn: "Kāno 'ā' vowel marker (Correct)",
        isCorrect: true,
      },
      {
        id: 'opt-1b',
        labelGu: "હ્રસ્વ ઇ 'િ' (તિરા)",
        labelEn: "Hrasva 'i' (Child confused 'aa' with 'i')",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child confused the open Kāno ('ā') sound with the preceding vowel sign ('i'). Prerequisite gap in phonemic vowel length discrimination.",
      },
      {
        id: 'opt-1c',
        labelGu: "દીર્ઘ ઉ 'ૂ' (તૂરુ)",
        labelEn: "Dirgha 'u' vowel sign",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child randomly guessed a rounded vowel sign ('u'). Suggests unfamiliarity with Gujarati primary vowel symbols.",
      },
      {
        id: 'opt-1d',
        labelGu: "એક માત્ર 'ે' (તેરે)",
        labelEn: "Ek matra 'e'",
        isCorrect: false,
        misconceptionDiagnosis:
          "Child selected the top matra ('e') instead of the vertical stroke Kāno ('ā'). Visual symbol confusion.",
      },
    ],
  },
  {
    id: 'q2',
    skillId: 'guj-comprehension',
    skillName: 'Gujarati Sentence Comprehension (સરળ વાક્ય સમજ)',
    skillCategory: 'literacy',
    stageLabel: 'પ્રશ્ન ૨ / ૫ · Question 2 of 5',
    questionGu: "વાંચો: 'મીના બાગમાં ફૂલ ચૂંટે છે.' મીના ક્યાં ફૂલ ચૂંટે છે?",
    questionEn: "Read: 'Meena plucks flowers in the garden.' Where does Meena pluck flowers?",
    visualType: 'garden',
    visualStimulus: {
      badge: '🌸 🏡',
      titleGu: 'મીના બાગમાં ફૂલ ચૂંટે છે.',
      titleEn: 'Short Decodable Sentence',
      detail: 'સરળ વાક્ય અર્થગ્રહણ · Contextual Comprehension',
    },
    audioTranscriptGu:
      "વાંચો: મીના બાગમાં ફૂલ ચૂંટે છે. મીના ક્યાં ફૂલ ચૂંટે છે? વિકલ્પો સાંભળો: બાગમાં, શાળામાં, ઘરમાં, કે નદીએ.",
    audioTranscriptEn:
      "Read: Meena plucks flowers in the garden. Where does Meena pluck flowers? Options: In the garden, in school, at home, or by the river.",
    options: [
      {
        id: 'opt-2a',
        labelGu: 'બાગમાં (In the garden)',
        labelEn: 'In the garden (Correct contextual retrieval)',
        isCorrect: true,
      },
      {
        id: 'opt-2b',
        labelGu: 'શાળામાં (In school)',
        labelEn: 'In school (Unrelated environment guess)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child relied on familiar school vocabulary rather than extracting the location word 'બાગમાં' from the text.",
      },
      {
        id: 'opt-2c',
        labelGu: 'ઘરમાં (At home)',
        labelEn: 'At home (Contextual guess)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child did not retain the locational noun across the 5-word sentence; indicates working memory load during sentence decoding.",
      },
      {
        id: 'opt-2d',
        labelGu: 'નદીએ (By the river)',
        labelEn: 'By the river (Phonetic guess)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Child made an unguided visual guess without reading the sentence.",
      },
    ],
  },
  {
    id: 'q3',
    skillId: 'num-bundling',
    skillName: 'Place Value & Bundling (દસ અને એકમનું જૂથ નિર્માણ)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૩ / ૫ · Question 3 of 5',
    questionGu: 'ચિત્રમાં ૩ દસની સળીઓની ભારી (૩ દસકા) અને ૪ છૂટી સળીઓ છે. કુલ કેટલી સળીઓ થાય?',
    questionEn:
      'The picture shows 3 bundles of 10 sticks (3 tens) and 4 loose sticks (4 units). How many sticks altogether?',
    visualType: 'bundles',
    visualStimulus: {
      badge: '🥢🥢🥢 | | | |',
      titleGu: '૩ દસકા (૩૦) + ૪ એકમ (૪)',
      titleEn: '3 Bundles of Ten (30) + 4 Loose Sticks (4)',
      detail: 'દસ અને એકમનું સ્થાન મૂલ્ય · Concrete Bundling to Abstract Number',
    },
    audioTranscriptGu:
      'ચિત્રમાં ત્રણ દસની ભારી અને ચાર છૂટી સળીઓ છે. કુલ કેટલી સળીઓ થાય? વિકલ્પો: ચોત્રીસ ૩૪, ત્રેતાળીસ ૪૩, સાત ૭, કે ત્રણસો ચાલીસ ૩૪૦.',
    audioTranscriptEn:
      'The picture shows 3 bundles of ten and 4 loose sticks. How many sticks in total? Options: 34, 43, 7, or 340.',
    options: [
      {
        id: 'opt-3a',
        labelGu: '૩૪ (34: ૩ દસકા અને ૪ એકમ)',
        labelEn: '34 (3 tens and 4 units - Correct)',
        isCorrect: true,
      },
      {
        id: 'opt-3b',
        labelGu: '૪૩ (43: ૪ દસકા અને ૩ એકમ)',
        labelEn: '43 (Positional inversion: wrote units in tens column)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Positional Reversal: Child accurately recognized the quantities 3 and 4, but inverted the tens and ones place value order, writing 43 instead of 34.",
      },
      {
        id: 'opt-3c',
        labelGu: '૭ (7: ૩ + ૪)',
        labelEn: '7 (Added face values 3 + 4, ignoring the ten-bundles)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Additive Misconception: Child added 3 + 4 = 7 directly, failing to recognize each bundle as representing 10 discrete units.",
      },
      {
        id: 'opt-3d',
        labelGu: '૩૪૦ (340: સ્થાન મૂલ્ય ભ્રમ)',
        labelEn: '340 (Juxtaposed digits with trailing zero)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Symbolic Overgeneralization: Child associated 'tens' with adding a zero, resulting in 340.",
      },
    ],
  },
  {
    id: 'q4',
    skillId: 'num-decomposition',
    skillName: 'Number Decomposition & Expanded Form (સંખ્યા વિસ્તરણ)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૪ / ૫ · Question 4 of 5',
    questionGu: 'સંખ્યા ૪૭ (47) નું સાચું વિસ્તરણ કયું છે?',
    questionEn: 'Which is the correct expanded form of the number 47?',
    visualType: 'decomposition',
    visualStimulus: {
      badge: '🔢 [ ૪૭ ]',
      titleGu: '૪૭ = [ ? ] + [ ? ]',
      titleEn: 'Tens Value + Units Value',
      detail: 'દશકનું મૂલ્ય (૪૦) અને એકમનું મૂલ્ય (૭) · Expanded Notation',
    },
    audioTranscriptGu:
      'સંખ્યા સુડતાલીસ ૪૭ નું સાચું વિસ્તરણ કયું છે? વિકલ્પો સાંભળો: ચાલીસ વત્તા સાત, ચાર વત્તા સાત, ચારસો વત્તા સાત, કે સુડતાલીસ વત્તા દસ.',
    audioTranscriptEn:
      'Which is the correct expansion of 47? Options: 40 + 7, 4 + 7, 400 + 7, or 47 + 10.',
    options: [
      {
        id: 'opt-4a',
        labelGu: '૪૦ + ૭ (40 + 7)',
        labelEn: '40 + 7 (Tens value 40 and units value 7 - Correct)',
        isCorrect: true,
      },
      {
        id: 'opt-4b',
        labelGu: '૪ + ૭ (4 + 7)',
        labelEn: '4 + 7 (Face-value error: digit 4 taken as 4 instead of 40)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Face-Value Error: Child treated the tens digit '4' as having a value of 4 rather than 40. Prerequisite gap in understanding decade base values.",
      },
      {
        id: 'opt-4c',
        labelGu: '૪૦૦ + ૭ (400 + 7)',
        labelEn: '400 + 7 (Confused hundred place with ten place)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Place Scale Confusion: Child mistakenly scaled the tens digit to hundreds.",
      },
      {
        id: 'opt-4d',
        labelGu: '૪૭ + ૧૦ (47 + 10)',
        labelEn: '47 + 10 (Additive addition confusion)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Operational Confusion: Child confused number expansion with adding ten.",
      },
    ],
  },
  {
    id: 'q5',
    skillId: 'num-regrouping',
    skillName: 'Regrouping Intuition (દસકો અને જૂથ રૂપાંતર પૂર્વતૈયારી)',
    skillCategory: 'numeracy',
    stageLabel: 'પ્રશ્ન ૫ / ૫ · Question 5 of 5',
    questionGu: 'આરવ પાસે ૧૮ કાંકરા છે. તેમાંથી ૧૦-૧૦ ના કેટલા જૂથ બને અને કેટલા છૂટા વધે?',
    questionEn:
      'Aarav has 18 pebbles. How many bundles of 10 can he form, and how many loose pebbles remain?',
    visualType: 'pebbles',
    visualStimulus: {
      badge: '⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪ + ⚪⚪⚪⚪⚪⚪⚪⚪',
      titleGu: '૧૮ કાંકરા = ૧ જૂથ (૧૦) + ૮ છૂટા',
      titleEn: '18 Pebbles = 1 Group of 10 + 8 Loose',
      detail: 'દસ એકમ = ૧ દશક (૧૦) · Concrete Grouping Prerequisite for Regrouping',
    },
    audioTranscriptGu:
      'આરવ પાસે અઢાર કાંકરા છે. તેમાંથી દસ દસના કેટલા જૂથ બને અને કેટલા છૂટા વધે? વિકલ્પો: એક જૂથ અને આઠ છૂટા, બે જૂથ અને બે છૂટા, કે આઠ જૂથ અને એક છૂટો.',
    audioTranscriptEn:
      'Aarav has 18 pebbles. How many groups of 10 can he make, and how many loose ones remain? Options: 1 group and 8 loose, 2 groups and 2 loose, or 8 groups and 1 loose.',
    options: [
      {
        id: 'opt-5a',
        labelGu: '૧ જૂથ (૧ દશક) અને ૮ છૂટા (1 bundle of 10, 8 loose)',
        labelEn: '1 bundle of 10 and 8 loose (Correct regrouping)',
        isCorrect: true,
      },
      {
        id: 'opt-5b',
        labelGu: '૨ જૂથ અને ૨ છૂટા (2 bundles of 10, 2 loose)',
        labelEn: '2 bundles and 2 loose (Over-counting ten bundles)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Rounding Overestimation: Child overestimated the number of full tens contained in 18, anticipating 20.",
      },
      {
        id: 'opt-5c',
        labelGu: '૮ જૂથ અને ૧ છૂટો (8 bundles, 1 loose)',
        labelEn: '8 bundles and 1 loose (Inverted units and tens grouping)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Grouping Reversal: Child swapped the quotient and remainder, treating loose items as groups.",
      },
      {
        id: 'opt-5d',
        labelGu: 'એક પણ જૂથ ન બને (Cannot make any bundle)',
        labelEn: 'Cannot make any bundle (Underestimating 18 > 10)',
        isCorrect: false,
        misconceptionDiagnosis:
          "Benchmark Failure: Child failed to recognize that 18 exceeds the threshold of 10.",
      },
    ],
  },
]

export interface SkillResult {
  skillId: string
  skillName: string
  skillCategory: 'literacy' | 'numeracy'
  questionsCount: number
  correctCount: number
  scorePercent: number
  status: 'Mastered' | 'Emerging' | 'Probable Gap'
  statusBadge: string
  isProbableGap: boolean
  explanation: string
  recommendation: string
}

export interface RecommendationEvidence {
  questionId: string
  questionText: string
  skillName: string
  chosenOptionLabel: string
  targetOptionLabel: string
  isCorrect: boolean
  misconceptionDiagnosis: string
  pedagogicalEvidence: string
}

export interface RecommendedActivity {
  id: string
  dayNumber: number
  title: string
  titleGu: string
  duration: string
  focusSkill: string
  description: string
  materialsNeeded: string
  teacherScript: string
  status: 'ready' | 'locked' | 'completed'
}

export interface DiagnosticEvaluationResult {
  overallScore: number
  totalQuestions: number
  correctAnswersCount: number
  skills: SkillResult[]
  evidences: RecommendationEvidence[]
  learningSequence: string[]
  recommendedActivities: RecommendedActivity[]
  probableGapsCount: number
  validatedGapsCount: number
  pedagogicalSummary: string
  clearNextStep: {
    title: string
    actionText: string
    dueText: string
    activityId: string
  }
}

/**
 * Pure explainable scoring engine.
 * Takes submitted answers and deterministically produces skill breakdown,
 * evidence trails, learning sequence, and daily activities.
 */
export function evaluateFLNDiagnostic(
  answers: Record<string, string>,
  teacherObservations: string = ''
): DiagnosticEvaluationResult {
  const totalQuestions = FLN_DIAGNOSTIC_QUESTIONS.length
  let correctCount = 0
  const evidences: RecommendationEvidence[] = []

  // Group questions by skill
  const skillMap: Record<
    string,
    {
      skillName: string
      category: 'literacy' | 'numeracy'
      questions: FLNQuestion[]
      correct: number
    }
  > = {}

  FLN_DIAGNOSTIC_QUESTIONS.forEach((q) => {
    if (!skillMap[q.skillId]) {
      skillMap[q.skillId] = {
        skillName: q.skillName,
        category: q.skillCategory,
        questions: [],
        correct: 0,
      }
    }
    skillMap[q.skillId].questions.push(q)

    const chosenOptionId = answers[q.id]
    const chosenOption = q.options.find((opt) => opt.id === chosenOptionId)
    const targetOption = q.options.find((opt) => opt.isCorrect)!

    const isCorrect = chosenOption ? chosenOption.isCorrect : false
    if (isCorrect) {
      correctCount += 1
      skillMap[q.skillId].correct += 1
    }

    evidences.push({
      questionId: q.id,
      questionText: `${q.questionGu} (${q.questionEn})`,
      skillName: q.skillName,
      chosenOptionLabel: chosenOption ? `${chosenOption.labelGu} - ${chosenOption.labelEn}` : 'No response',
      targetOptionLabel: `${targetOption.labelGu} - ${targetOption.labelEn}`,
      isCorrect,
      misconceptionDiagnosis: isCorrect
        ? 'Correct answer demonstrated: Solid conceptual grasp of this micro-competency.'
        : chosenOption?.misconceptionDiagnosis ||
          'Incorrect response indicates prerequisite foundational support needed.',
      pedagogicalEvidence: isCorrect
        ? `Learner accurately identified target concept without positional or symbolic errors.`
        : `Learner selected '${chosenOption?.labelGu || 'None'}' instead of '${targetOption.labelGu}'. Misconception: ${
            chosenOption?.misconceptionDiagnosis || 'Incomplete prerequisite model.'
          }`,
    })
  })

  const overallScore = Math.round((correctCount / totalQuestions) * 100)

  // Compute skill-level results
  const skills: SkillResult[] = Object.entries(skillMap).map(([sId, data]) => {
    const qCount = data.questions.length
    const sCorrect = data.correct
    const sPercent = Math.round((sCorrect / qCount) * 100)

    let status: SkillResult['status'] = 'Mastered'
    let statusBadge = 'Demonstrated Mastery'
    let isProbableGap = false
    let explanation = 'Student reliably applied this micro-skill in the screening check.'
    let recommendation = 'Maintain automaticity through occasional small-group games.'

    if (sPercent < 50) {
      status = 'Probable Gap'
      statusBadge = 'Probable Learning Gap (Screening Signal)'
      isProbableGap = true
      explanation =
        'Single-assessment screening signal: Response pattern indicates an unverified prerequisite gap in this domain. Requires classroom teacher verification.'
      recommendation =
        'Target with tactile classroom manipulatives (10-15 mins/day) before introducing symbolic worksheets.'
    } else if (sPercent < 100) {
      status = 'Emerging'
      statusBadge = 'Emerging (Reinforcement Recommended)'
      explanation = 'Partial competence shown. Learner occasionally hesitates with abstract representations.'
      recommendation = 'Provide 2-3 guided peer partner practice exercises.'
    }

    return {
      skillId: sId,
      skillName: data.skillName,
      skillCategory: data.category,
      questionsCount: qCount,
      correctCount: sCorrect,
      scorePercent: sPercent,
      status,
      statusBadge,
      isProbableGap,
      explanation,
      recommendation,
    }
  })

  const probableGapsCount = skills.filter((s) => s.isProbableGap).length

  // Build logical recommended learning sequence based on observed gaps
  const learningSequence: string[] = []
  const recommendedActivities: RecommendedActivity[] = []

  let dayTracker = 1

  // 1. Check Gujarati Matra
  const matraSkill = skills.find((s) => s.skillId === 'guj-matra')
  if (matraSkill && matraSkill.isProbableGap) {
    learningSequence.push('Step 1: Phonics & Matra Tactile Flashcards (ગુજરાતી માત્રા ઓળખ પૂર્વતૈયારી)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Gujarati Matra Sound Sorting: Kāno (ા) and Hrasva (િ)',
      titleGu: 'માત્રા કાર્ડ વર્ગીકરણ: કાનો અને હ્રસ્વ ઇ',
      duration: '10 mins',
      focusSkill: 'Gujarati Matra Discrimination',
      description: 'Sort 8 picture cards into baskets marked with Kāno (ા) and Hrasva (િ). Speak each word aloud.',
      materialsNeeded: '8 illustrated picture flashcards (તારા, માળા, ચિત્ર, દિન) and 2 sorting trays.',
      teacherScript:
        "પૂછો: 'તારા' બોલતી વખતે મોં ખૂલે છે? કઈ માત્રા આવશે? સુંદર, કાનો 'ા' વાળા ખાનામાં મૂકો.",
      status: 'ready',
    })
  }

  // 2. Check Gujarati Comprehension
  const compSkill = skills.find((s) => s.skillId === 'guj-comprehension')
  if (compSkill && compSkill.isProbableGap) {
    learningSequence.push('Step 2: Shared Sentence Whisper-Reading (વાક્ય અર્થગ્રહણ)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Sentence Picture-Match: Who and Where',
      titleGu: 'વાક્ય અને ચિત્ર જોડ: કોણ અને ક્યાં?',
      duration: '12 mins',
      focusSkill: 'Gujarati Sentence Context',
      description: 'Read 3 simple 5-word decodable sentences with a peer partner and match each sentence to its picture.',
      materialsNeeded: 'Laminated sentence strips and 3 contextual scene cards.',
      teacherScript: "વાક્ય વાંચ્યા પછી પૂછો: 'મીના ક્યાં છે?' વાક્યમાં 'બાગમાં' શબ્દ નીચે આંગળી મૂકવા કહો.",
      status: dayTracker === 2 ? 'ready' : 'locked',
    })
  }

  // 3. Check Place Value Bundling
  const bundleSkill = skills.find((s) => s.skillId === 'num-bundling')
  if (bundleSkill && bundleSkill.isProbableGap) {
    learningSequence.push('Step 3: Concrete Bundling with Straws & Rubber Bands (દસની ભારી બનાવવી)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Pencil & Straw Bundles: Grouping 10s and 1s',
      titleGu: 'સળી અને રબરબેન્ડ: દસ દસની ભારી અને છૂટી સળીઓ',
      duration: '12 mins',
      focusSkill: 'Place Value Bundling (Prerequisite for Regrouping)',
      description: 'Use physical bundles of 10 straws and single loose straws to physically build numbers 21 to 49.',
      materialsNeeded: '40 drinking straws, 5 rubber bands, and a dual-column sorting board.',
      teacherScript:
        "આરવને ૩૪ બનાવવા કહો. પૂછો: 'દસ દસની કેટલી ભારી જોઈશે? છૂટી કેટલી જોઈશે?' સ્થાન કિંમત બોર્ડ પર ગોઠવડાવો.",
      status: dayTracker === 2 || dayTracker === 1 ? 'ready' : 'locked',
    })
  }

  // 4. Check Number Decomposition
  const decompSkill = skills.find((s) => s.skillId === 'num-decomposition')
  if (decompSkill && decompSkill.isProbableGap) {
    learningSequence.push('Step 4: Dual-Column Tens Mat & Expanded Form Cards (૪૦ + ૭ = ૪૭)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Expanded Decade Cards Puzzle (૪૦ + ૭ = ૪૭)',
      titleGu: 'વિસ્તરણ કાર્ડ રમત: ૪૦ અને ૭ ભેગા કરો',
      duration: '15 mins',
      focusSkill: 'Number Decomposition & Decade Base Value',
      description: 'Overlay tens cards (10, 20, 30, 40) with unit cards (1-9) to see how 40 + 7 forms 47 without hiding the 40.',
      materialsNeeded: 'Montessori-style arrow place value cards (10-90, 1-9).',
      teacherScript:
        "૪૦ નું કાર્ડ બતાવો. તેના પર ૭ નું કાર્ડ મૂકો. ૪૭ બન્યા! ૭ હટાવીને પૂછો: 'આ ૪ નું મૂલ્ય કેટલું છે? ૪ કે ૪૦?'",
      status: 'locked',
    })
  }

  // 5. Check Regrouping Intuition
  const regroupSkill = skills.find((s) => s.skillId === 'num-regrouping')
  if (regroupSkill && regroupSkill.isProbableGap) {
    learningSequence.push('Step 5: Decade Leap Pebble Exchange (૧૦ એકમ = ૧ દશક રૂપાંતર)')
    recommendedActivities.push({
      id: `act-gen-${dayTracker}`,
      dayNumber: dayTracker++,
      title: 'Decade Leap Partner Game: Pebble Exchange',
      titleGu: 'દસકો કૂદકો: ૧૦ કાંકરા બદલીને ૧ ભારી મેળવો',
      duration: '10 mins',
      focusSkill: 'Concrete Regrouping Intuition',
      description: 'Roll dice, collect counters; as soon as counter count reaches 10, exchange them for 1 colored token.',
      materialsNeeded: '20 counters, 5 gold tokens (representing tens), 1 dice.',
      teacherScript: "જેવા ૧૦ કાંકરા થાય એટલે 'દસકો!' બોલીને ૧ પીળી ટોકન મેળવો. હાથમાં કેટલા છૂટા વધ્યા તે ગણો.",
      status: 'locked',
    })
  }

  // Fallback if student mastered everything
  if (learningSequence.length === 0) {
    learningSequence.push('Step 1: Foundational Automaticity Maintenance (દ્રઢીકરણ અને આગળનું પગથિયું)')
    learningSequence.push('Step 2: 3-Digit Number Exploration & Short Paragraph Reading')
    recommendedActivities.push({
      id: 'act-gen-mastery',
      dayNumber: 1,
      title: 'Advanced Number Sequences & Paragraph Reading',
      titleGu: '૩-અંકી સંખ્યા અને ટૂંકી વાર્તા વાચન',
      duration: '15 mins',
      focusSkill: 'Class 3 Extension',
      description: 'Explore 3-digit benchmarks on an open number line and read a 4-sentence folktale independently.',
      materialsNeeded: 'Open number line strip and Class 3 supplementary reader.',
      teacherScript: 'સંખ્યા રેખા પર ૧૦૦ થી ૧૫૦ વચ્ચે અંદાજ લગાવો અને વાર્તા મોટેથી વાંચો.',
      status: 'ready',
    })
  }

  // Pedagogical summary text
  const pedagogicalSummary =
    probableGapsCount > 0
      ? `Screening check completed. Identified ${probableGapsCount} probable learning gap(s) centered on ${skills
          .filter((s) => s.isProbableGap)
          .map((s) => s.skillName.split('(')[0].trim())
          .join(
            ' and '
          )}. Note: This is an initial screening indicator, not a definitive diagnosis. Conduct tactile verification in small-group time.`
      : `Screening check completed with high baseline competence (${overallScore}%). Student demonstrates solid foundational mastery in both Gujarati phonics and place value basics.`

  // First recommended activity as next action
  const firstActivity = recommendedActivities[0]

  return {
    overallScore,
    totalQuestions,
    correctAnswersCount: correctCount,
    skills,
    evidences,
    learningSequence,
    recommendedActivities,
    probableGapsCount,
    validatedGapsCount: 0,
    pedagogicalSummary,
    clearNextStep: {
      title: `Start Day 1 Practice: ${firstActivity.title}`,
      actionText: 'Begin Guided Classroom Activity',
      dueText: 'Scheduled for morning foundational circle',
      activityId: firstActivity.id,
    },
  }
}
