import { Locale } from '@/lib/types'

export interface TranslationDictionary {
  appName: string
  appSubtitle: string
  schoolName: string
  districtName: string
  tagline: string

  // Navigation
  nav: {
    overview: string
    classes: string
    students: string
    assessments: string
    learningPathways: string
    teacherActions: string
    reports: string
    parentPortal: string
    exitWorkspace: string
    collapseSidebar: string
    expandSidebar: string
  }

  // Common UI
  common: {
    search: string
    filter: string
    all: string
    standard: string
    grade: string
    section: string
    status: string
    progress: string
    actions: string
    view: string
    edit: string
    delete: string
    save: string
    cancel: string
    confirm: string
    close: string
    submit: string
    next: string
    previous: string
    loading: string
    online: string
    offline: string
    syncing: string
    syncNow: string
    synced: string
    simulatedOffline: string
    exportCsv: string
    print: string
    resetDemo: string
    demonstrated: string
    developing: string
    needsSupport: string
    pending: string
    completed: string
    inProgress: string
    scheduled: string
    approved: string
    requiresReview: string
    highPriority: string
    mediumPriority: string
    lowPriority: string
    dueDate: string
    notes: string
    materials: string
    duration: string
    prerequisite: string
    targetSkill: string
    literacy: string
    numeracy: string
    academicYear: string
    medium: string
    classTeacher: string
    totalEnrolled: string
    assessed: string
    activePlans: string
    milestones: string
    noRecordsFound: string
  }

  // Dashboard
  dashboard: {
    welcomeGreeting: string
    subtitle: string
    metrics: {
      studentsAssessed: string
      activeSupportPlans: string
      milestonesThisWeek: string
      awaitingSync: string
      enrolledTotal: string
      readyToProgress: string
      acrossLearners: string
      savedLocally: string
    }
    classMilestoneCompletion: string
    averageMilestones: string
    last6Weeks: string
    last4Weeks: string
    term1Baseline: string
    skillGapDistribution: string
    focusedPracticeNeeded: string
    studentsNeedingFollowup: string
    supportiveActionsNote: string
    viewAllStudents: string
    todaysActions: string
    actionsCompletedOf: string
    noticeSignalTitle: string
    noticeSignalBody: string
  }

  // Classes
  classes: {
    title: string
    subtitle: string
    classRoster: string
    standardFilter: string
    sectionFilter: string
    mediumFilter: string
    addClass: string
    startClassAssessment: string
    exportClassReport: string
    classTeacher: string
    tabs: {
      overview: string
      students: string
      assessments: string
      plans: string
      reports: string
    }
    overviewSummary: string
    literacyCoverage: string
    numeracyCoverage: string
    activeSupportPlansCount: string
    reassessmentScheduled: string
  }

  // Students
  students: {
    title: string
    subtitle: string
    rosterTitle: string
    rollNumber: string
    studentId: string
    flnStatus: string
    prerequisiteGap: string
    pedagogicalInsight: string
    diagnosticScore: string
    viewProfile: string
    startDiagnostic: string
    reviewPlan: string
    profileTitle: string
    learningTrajectory: string
    assignedActivities: string
    teacherObservations: string
    recentAssessments: string
    nextAction: string
    addStudent: string
  }

  // Assessments
  assessments: {
    title: string
    subtitle: string
    newAssessment: string
    selectClass: string
    selectStudent: string
    selectSubject: string
    selectLanguage: string
    estimatedDuration: string
    startAssessment: string
    oneQuestionPerScreen: string
    listenAudio: string
    stopAudio: string
    transcript: string
    answerRecorded: string
    submitAndDiagnose: string
    evaluatingDiagnostic: string
    resultsTitle: string
    probableGapVsValidated: string
    probableGapNote: string
    validatedDiagnosisNote: string
    confirmDiagnosis: string
    evidenceTitle: string
    sequenceTitle: string
    dailyActivitiesTitle: string
    approvePlanCTA: string
  }

  // Learning Pathways
  pathways: {
    title: string
    subtitle: string
    weeklySchedule: string
    approvedActive: string
    targetCompletion: string
    formatPill: string
    curriculumMapped: string
    teacherSignoff: string
    markActivityComplete: string
    activityCompletedToast: string
  }

  // Teacher Actions
  actions: {
    title: string
    subtitle: string
    filterPriority: string
    filterStatus: string
    markCompleted: string
    addNewAction: string
    recommendedNextStep: string
  }

  // Reports
  reports: {
    title: string
    subtitle: string
    roleView: string
    teacherView: string
    headTeacherView: string
    crcView: string
    deoView: string
    clusterSummary: string
    districtSummary: string
    exportReport: string
    flnCoverageRate: string
    prerequisiteMasteryRate: string
    offlineSyncIntegrity: string
    nonStigmatizingNotice: string
  }

  // Parent Portal
  parent: {
    title: string
    subtitle: string
    childProfile: string
    practicingAtSchool: string
    homeActivitiesTitle: string
    homeActivity1Title: string
    homeActivity1Desc: string
    homeActivity2Title: string
    homeActivity2Desc: string
    recentMilestones: string
    encouragementNote: string
  }

  // Login
  login: {
    brandSubtitle: string
    heading: string
    subheading: string
    signInAs: string
    schoolCodeOrEmail: string
    password: string
    showPassword: string
    hidePassword: string
    rememberDevice: string
    forgotPassword: string
    signInButton: string
    exploreDemoButton: string
    helpdeskSupport: string
    demoDisclaimer: string
  }
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    appName: 'Saksham FLN',
    appSubtitle: 'Learning Pathways & Teacher Support',
    schoolName: 'Asha Primary School',
    districtName: 'Devbhumi Dwarka, Gujarat',
    tagline: 'Notice prerequisite gaps. Personalize practice. Support every child.',

    nav: {
      overview: 'Overview',
      classes: 'Classes',
      students: 'Students',
      assessments: 'Assessments',
      learningPathways: 'Learning Pathways',
      teacherActions: 'Teacher Actions',
      reports: 'Reports',
      parentPortal: 'Guardian Support',
      exitWorkspace: 'Exit workspace',
      collapseSidebar: 'Collapse sidebar',
      expandSidebar: 'Expand sidebar',
    },

    common: {
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      standard: 'Standard',
      grade: 'Grade',
      section: 'Section',
      status: 'Status',
      progress: 'Progress',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      submit: 'Submit',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      online: 'Online',
      offline: 'Offline',
      syncing: 'Syncing...',
      syncNow: 'Sync now',
      synced: 'Synchronized',
      simulatedOffline: 'Simulate Offline',
      exportCsv: 'Export CSV',
      print: 'Print',
      resetDemo: 'Reset Demo Data',
      demonstrated: 'Demonstrated',
      developing: 'Developing',
      needsSupport: 'Needs Support',
      pending: 'Pending',
      completed: 'Completed',
      inProgress: 'In Progress',
      scheduled: 'Scheduled',
      approved: 'Approved',
      requiresReview: 'Requires Review',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      lowPriority: 'Low Priority',
      dueDate: 'Due Date',
      notes: 'Notes',
      materials: 'Materials Needed',
      duration: 'Duration',
      prerequisite: 'Prerequisite Focus',
      targetSkill: 'Target Skill',
      literacy: 'Literacy',
      numeracy: 'Numeracy',
      academicYear: 'Academic Year',
      medium: 'Medium',
      classTeacher: 'Class Teacher',
      totalEnrolled: 'Total Enrolled',
      assessed: 'Assessed',
      activePlans: 'Active Plans',
      milestones: 'Milestones',
      noRecordsFound: 'No records found matching current criteria.',
    },

    dashboard: {
      welcomeGreeting: 'Good morning, Teacher Asha',
      subtitle: 'Class 3A foundational learning and student support overview.',
      metrics: {
        studentsAssessed: 'Students Assessed',
        activeSupportPlans: 'Active Support Plans',
        milestonesThisWeek: 'Milestones This Week',
        awaitingSync: 'Awaiting Sync',
        enrolledTotal: 'of enrolled learners',
        readyToProgress: 'ready for progression',
        acrossLearners: 'across class roster',
        savedLocally: 'saved on this device',
      },
      classMilestoneCompletion: 'Class Milestone Completion',
      averageMilestones: 'Average weekly practice activities completed',
      last6Weeks: 'Last 6 weeks',
      last4Weeks: 'Last 4 weeks',
      term1Baseline: 'Term 1 Baseline',
      skillGapDistribution: 'Skill-Gap Distribution',
      focusedPracticeNeeded: 'Learners needing targeted micro-practice',
      studentsNeedingFollowup: 'Learners Needing Follow-up',
      supportiveActionsNote: 'Supportive next developmental steps, not punitive rankings',
      viewAllStudents: 'View all students',
      todaysActions: "Today's Teacher Actions",
      actionsCompletedOf: 'actions completed of',
      noticeSignalTitle: 'Pedagogical Notice: Screening Signal vs Validated Diagnosis',
      noticeSignalBody:
        'A single assessment signals a probable gap. Classroom teachers validate the diagnosis through hands-on physical manipulatives during small-group time.',
    },

    classes: {
      title: 'Class Directory & Management',
      subtitle: 'Grade-level foundational literacy and numeracy management for Asha Primary School.',
      classRoster: 'Class Roster',
      standardFilter: 'Filter by Standard',
      sectionFilter: 'Filter by Section',
      mediumFilter: 'Medium of Instruction',
      addClass: 'Add New Class',
      startClassAssessment: 'Start Class Assessment',
      exportClassReport: 'Export Class Summary',
      classTeacher: 'Class Teacher',
      tabs: {
        overview: 'Overview',
        students: 'Students Roster',
        assessments: 'Assessments',
        plans: 'Remedial Plans',
        reports: 'Class Analytics',
      },
      overviewSummary: 'Classroom Progress Summary',
      literacyCoverage: 'Foundational Literacy Coverage',
      numeracyCoverage: 'Foundational Numeracy Coverage',
      activeSupportPlansCount: 'Active Support Plans',
      reassessmentScheduled: 'Upcoming Reassessments',
    },

    students: {
      title: 'Student Foundational Profiles',
      subtitle: 'Individualized FLN learning progress, skill diagnostics, and remedial pathways.',
      rosterTitle: 'Enrolled Learners',
      rollNumber: 'Roll No',
      studentId: 'Student ID',
      flnStatus: 'FLN Status',
      prerequisiteGap: 'Prerequisite Gap',
      pedagogicalInsight: 'Pedagogical Insight',
      diagnosticScore: 'Diagnostic Baseline Score',
      viewProfile: 'View Profile',
      startDiagnostic: 'Start Diagnostic Check',
      reviewPlan: 'Review Remedial Plan',
      profileTitle: 'Student Foundational Profile',
      learningTrajectory: 'Developmental Trajectory',
      assignedActivities: 'Assigned Classroom Practice',
      teacherObservations: 'Teacher Formative Observations',
      recentAssessments: 'Assessment History',
      nextAction: 'Recommended Next Teacher Action',
      addStudent: 'Register Student',
    },

    assessments: {
      title: 'Diagnostic Assessments',
      subtitle: 'Short, child-friendly diagnostic checks to identify prerequisite learning gaps.',
      newAssessment: 'Schedule New Check',
      selectClass: 'Select Class',
      selectStudent: 'Select Student',
      selectSubject: 'Select Subject Domain',
      selectLanguage: 'Assessment Language',
      estimatedDuration: 'Estimated Duration: 10–12 mins',
      startAssessment: 'Begin Assessment Session',
      oneQuestionPerScreen: 'One question per screen · Calming child-friendly layout',
      listenAudio: 'Listen (સાંભળો)',
      stopAudio: 'Stop (રોકો)',
      transcript: 'Transcript',
      answerRecorded: 'Answer recorded calmly.',
      submitAndDiagnose: 'Submit & Evaluate Diagnostic',
      evaluatingDiagnostic: 'Evaluating prerequisite dependencies...',
      resultsTitle: 'FLN Diagnostic Results & Prerequisite Mapping',
      probableGapVsValidated: 'Screening Signal vs. Validated Diagnosis',
      probableGapNote:
        'Indicates a probable conceptual hesitation observed during this check. Does not imply a learning disability.',
      validatedDiagnosisNote:
        'Confirmed only after teacher verifies the concept using concrete classroom manipulatives.',
      confirmDiagnosis: 'Confirm Diagnosis (Teacher Verified)',
      evidenceTitle: 'Evidence for Each Recommendation',
      sequenceTitle: 'Recommended Prerequisite Sequence',
      dailyActivitiesTitle: 'Short Daily Classroom Activities (10–15 Mins)',
      approvePlanCTA: 'Approve Recommended Learning Plan',
    },

    pathways: {
      title: 'Adaptive Remedial Pathways',
      subtitle: 'Targeted 5-day classroom micro-activities approved by teachers for daily practice.',
      weeklySchedule: 'Weekly Schedule (Monday–Saturday)',
      approvedActive: 'Approved by Teacher & Active',
      targetCompletion: 'Target Completion: End of Week',
      formatPill: 'Manipulative Practice',
      curriculumMapped: 'GCERT Curriculum Aligned',
      teacherSignoff: 'Teacher Professional Sign-off Recorded',
      markActivityComplete: 'Mark Activity Complete',
      activityCompletedToast: 'Classroom milestone recorded! Student progress updated.',
    },

    actions: {
      title: 'Teacher Action Workspace',
      subtitle: 'High-priority pedagogical interventions, small-group sessions, and follow-ups.',
      filterPriority: 'Priority',
      filterStatus: 'Status',
      markCompleted: 'Mark Action as Completed',
      addNewAction: 'Add Action Note',
      recommendedNextStep: 'Recommended Next Step',
    },

    reports: {
      title: 'School & Administrative Reports',
      subtitle: 'Aggregated foundational learning indicators tailored for teachers and administrators.',
      roleView: 'Viewing as Authorized Role:',
      teacherView: 'Teacher View: Class 3A Coverage & Remedial Progress',
      headTeacherView: 'Head Teacher View: School-Wide FLN Distribution',
      crcView: 'CRC / BRC Coordinator View: Khambhalia Cluster Aggregate',
      deoView: 'DEO View: Devbhumi Dwarka District FLN Overview',
      clusterSummary: 'Cluster Summary (Khambhalia Block)',
      districtSummary: 'District Indicators (Devbhumi Dwarka)',
      exportReport: 'Export Official CSV Summary',
      flnCoverageRate: 'District FLN Assessment Coverage',
      prerequisiteMasteryRate: 'Remedial Plan Completion Rate',
      offlineSyncIntegrity: 'Device Synchronization Health',
      nonStigmatizingNotice:
        'In accordance with NEP foundational standards, reporting focuses on prerequisite coverage and growth rather than punitive league tables.',
    },

    parent: {
      title: 'Guardian Learning Support Portal',
      subtitle: 'Supportive, non-stigmatizing updates on your child’s foundational progress.',
      childProfile: 'Linked Student:',
      practicingAtSchool: 'Skills Currently Practised at School',
      homeActivitiesTitle: 'Suggested Fun Home Activities (5–10 Mins)',
      homeActivity1Title: 'Counting Everyday Objects',
      homeActivity1Desc: 'Count 10 spoons or pebbles with your child and make bundles of ten together.',
      homeActivity2Title: 'Short Story Listening in Gujarati',
      homeActivity2Desc: 'Read a short Gujarati story together and ask: "Who was in the story and where did they go?"',
      recentMilestones: 'Recent Classroom Milestones Achieved',
      encouragementNote:
        'Every child learns at their own pace. Regular, playful practice builds lasting confidence.',
    },

    login: {
      brandSubtitle: 'AI-assisted diagnostic & remedial learning workspace',
      heading: 'Welcome back',
      subheading: 'Sign in to access school records and learning pathways.',
      signInAs: 'I am signing in as:',
      schoolCodeOrEmail: 'School Code or Registered Mobile / Email',
      password: 'Password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      rememberDevice: 'Remember this device for 30 days',
      forgotPassword: 'Forgot password?',
      signInButton: 'Sign in securely',
      exploreDemoButton: 'Explore Teacher Demo Workspace',
      helpdeskSupport: 'Need help accessing your school account? Contact support',
      demoDisclaimer:
        'Synthetic prototype demonstration. Evaluated for Collector Office, Devbhumi Dwarka.',
    },
  },

  gu: {
    appName: 'સક્ષમ FLN',
    appSubtitle: 'અધ્યયન માર્ગ અને શિક્ષક સહાયતા',
    schoolName: 'આશા પ્રાથમિક શાળા',
    districtName: 'દેવભૂમિ દ્વારકા, ગુજરાત',
    tagline: 'પૂર્વજરૂરી કચાશ ઓળખો. વ્યક્તિગત મહાવરો આપો. દરેક બાળકને આગળ વધારો.',

    nav: {
      overview: 'ઝાંખી (ડેશબોર્ડ)',
      classes: 'વર્ગખંડ વ્યવસ્થાપન',
      students: 'વિદ્યાર્થીઓ',
      assessments: 'નિદાન કસોટીઓ',
      learningPathways: 'ઉપચારાત્મક અધ્યયન માર્ગ',
      teacherActions: 'શિક્ષક કાર્ય યોજના',
      reports: 'અહેવાલો અને પ્રગતિ',
      parentPortal: 'વાલી સહાયતા પોર્ટલ',
      exitWorkspace: 'વર્કસ્પેસમાંથી બહાર નીકળો',
      collapseSidebar: 'સાઇડબાર નાનું કરો',
      expandSidebar: 'સાઇડબાર મોટું કરો',
    },

    common: {
      search: 'શોધો...',
      filter: 'ફિલ્ટર',
      all: 'બધા',
      standard: 'ધોરણ',
      grade: 'વર્ગ',
      section: 'વિભાગ',
      status: 'સ્થિતિ',
      progress: 'પ્રગતિ',
      actions: 'ક્રિયાઓ',
      view: 'જુઓ',
      edit: 'ફેરફાર કરો',
      delete: 'કાઢી નાખો',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      confirm: 'ખાતરી કરો',
      close: 'બંધ કરો',
      submit: 'સબમિટ કરો',
      next: 'આગળ',
      previous: 'પાછળ',
      loading: 'લોડ થઈ રહ્યું છે...',
      online: 'ઓનલાઇન',
      offline: 'ઓફલાઇન',
      syncing: 'સિંક થઈ રહ્યું છે...',
      syncNow: 'હમણાં સિંક કરો',
      synced: 'સિંક પૂર્ણ',
      simulatedOffline: 'ઓફલાઇન સિમ્યુલેશન',
      exportCsv: 'CSV નિકાસ કરો',
      print: 'પ્રિન્ટ કરો',
      resetDemo: 'ડેમો ડેટા ફરી સેટ કરો',
      demonstrated: 'સિદ્ધ કરેલ',
      developing: 'વિકાસશીલ',
      needsSupport: 'સહાયતા જરૂરી',
      pending: 'બાકી',
      completed: 'પૂર્ણ',
      inProgress: 'ચાલુ છે',
      scheduled: 'નિયત કરેલ',
      approved: 'મંજૂર કરેલ',
      requiresReview: 'સમીક્ષા જરૂરી',
      highPriority: 'ઉચ્ચ પ્રાથમિકતા',
      mediumPriority: 'મધ્યમ પ્રાથમિકતા',
      lowPriority: 'સામાન્ય પ્રાથમિકતા',
      dueDate: 'નિયત તારીખ',
      notes: 'નોંધ',
      materials: 'જરૂરી સાધન સામગ્રી',
      duration: 'સમયગાળો',
      prerequisite: 'પૂર્વતૈયારી કૌશલ્ય',
      targetSkill: 'લક્ષ્ય કૌશલ્ય',
      literacy: 'ભાષા વાચન',
      numeracy: 'ગણિત ગણન',
      academicYear: 'શૈક્ષણિક વર્ષ',
      medium: 'માધ્યમ',
      classTeacher: 'વર્ગ શિક્ષક',
      totalEnrolled: 'કુલ નોંધાયેલ',
      assessed: 'મૂલ્યાંકન થયેલ',
      activePlans: 'સક્રિય યોજનાઓ',
      milestones: 'સિદ્ધિ માઇલસ્ટોન',
      noRecordsFound: 'કોઈ પરિણામ મળ્યું નથી.',
    },

    dashboard: {
      welcomeGreeting: 'સુપ્રભાત, આશાબેન શાહ',
      subtitle: 'ધોરણ ૩-અ પાયાની સાક્ષરતા અને સંખ્યાજ્ઞાન પ્રગતિ ઝાંખી.',
      metrics: {
        studentsAssessed: 'મૂલ્યાંકન થયેલ બાળકો',
        activeSupportPlans: 'સક્રિય ઉપચાર યોજનાઓ',
        milestonesThisWeek: 'આ અઠવાડિયાના માઇલસ્ટોન',
        awaitingSync: 'સિંક બાકી રેકોર્ડ',
        enrolledTotal: 'નોંધાયેલ બાળકોમાંથી',
        readyToProgress: 'આગળ વધવા સક્ષમ',
        acrossLearners: 'વર્ગના તમામ બાળકોમાં',
        savedLocally: 'આ ઉપકરણ પર સાચવેલ',
      },
      classMilestoneCompletion: 'વર્ગ માઇલસ્ટોન પૂર્ણતા દર',
      averageMilestones: 'દર અઠવાડિયે પૂર્ણ થયેલ ઉપચારાત્મક પ્રવૃત્તિઓની ટકાવારી',
      last6Weeks: 'છેલ્લા ૬ અઠવાડિયા',
      last4Weeks: 'છેલ્લા ૪ અઠવાડિયા',
      term1Baseline: 'પ્રથમ સત્ર પ્રારંભિક',
      skillGapDistribution: 'કૌશલ્ય કચાશ વિશ્લેષણ',
      focusedPracticeNeeded: 'વિશેષ મહાવરાની જરૂર હોય તેવા બાળકો',
      studentsNeedingFollowup: 'ધ્યાન આપવા યોગ્ય બાળકો',
      supportiveActionsNote: 'બાળકોનું ક્રમાંકન નહીં, માત્ર સહાયક શૈક્ષણિક પગલાં',
      viewAllStudents: 'તમામ બાળકોની યાદી',
      todaysActions: 'આજના શિક્ષક કાર્યો',
      actionsCompletedOf: 'કાર્યો પૂર્ણ થયા કુલમાંથી',
      noticeSignalTitle: 'શૈક્ષણિક માર્ગદર્શિકા: પ્રારંભિક સંકેત વિરુદ્ધ ખાતરીપૂર્વકનું નિદાન',
      noticeSignalBody:
        'એક કસોટી માત્ર સંભવિત કચાશનો સંકેત આપે છે. વર્ગ શિક્ષક મૂર્ત સાધનો દ્વારા વર્ગખંડમાં ચકાસીને જ તેનું આખરી નિદાન નક્કી કરે છે.',
    },

    classes: {
      title: 'વર્ગખંડ ડિરેક્ટરી અને વ્યવસ્થાપન',
      subtitle: 'આશા પ્રાથમિક શાળા - ધોરણ ૧ થી ૮ પાયાની સાક્ષરતા અને ગણન સંચાલન.',
      classRoster: 'વર્ગ યાદી',
      standardFilter: 'ધોરણ મુજબ ફિલ્ટર',
      sectionFilter: 'વિભાગ મુજબ ફિલ્ટર',
      mediumFilter: 'શિક્ષણનું માધ્યમ',
      addClass: 'નવો વર્ગ ઉમેરો',
      startClassAssessment: 'વર્ગ કસોટી શરૂ કરો',
      exportClassReport: 'વર્ગ સારાંશ નિકાસ કરો',
      classTeacher: 'વર્ગ શિક્ષક',
      tabs: {
        overview: 'ઝાંખી',
        students: 'વિદ્યાર્થીઓની યાદી',
        assessments: 'કસોટીઓ',
        plans: 'ઉપચાર યોજનાઓ',
        reports: 'વર્ગ વિશ્લેષણ',
      },
      overviewSummary: 'વર્ગખંડ પ્રગતિ સારાંશ',
      literacyCoverage: 'ભાષા વાચન વ્યાપ',
      numeracyCoverage: 'ગણિત ગણન વ્યાપ',
      activeSupportPlansCount: 'સક્રિય ઉપચાર યોજનાઓ',
      reassessmentScheduled: 'આગામી પુનઃચકાસણી',
    },

    students: {
      title: 'વિદ્યાર્થી પાયાની શિક્ષણ પ્રોફાઇલ',
      subtitle: 'વ્યક્તિગત FLN પ્રગતિ, કૌશલ્ય નિદાન અને ઉપચારાત્મક માર્ગ.',
      rosterTitle: 'નોંધાયેલા વિદ્યાર્થીઓ',
      rollNumber: 'રોલ નંબર',
      studentId: 'વિદ્યાર્થી આઈડી',
      flnStatus: 'FLN સ્થિતિ',
      prerequisiteGap: 'પૂર્વજરૂરી કચાશ',
      pedagogicalInsight: 'શૈક્ષણિક માર્ગદર્શન નોંધ',
      diagnosticScore: 'પ્રારંભિક નિદાન સ્કોર',
      viewProfile: 'પ્રોફાઇલ જુઓ',
      startDiagnostic: 'નિદાન કસોટી લો',
      reviewPlan: 'ઉપચાર યોજના જુઓ',
      profileTitle: 'વિદ્યાર્થી શૈક્ષણિક પ્રોફાઇલ',
      learningTrajectory: 'વિકાસાત્મક પ્રગતિ ક્રમ',
      assignedActivities: 'સોંપેલ વર્ગખંડ મહાવરો',
      teacherObservations: 'શિક્ષકના અવલોકન',
      recentAssessments: 'કસોટી ઇતિહાસ',
      nextAction: 'આગામી ભલામણ કરેલ શિક્ષક પગલું',
      addStudent: 'વિદ્યાર્થી નોંધણી',
    },

    assessments: {
      title: 'નિદાન કસોટી વ્યવસ્થાપન',
      subtitle: 'પૂર્વજરૂરી કૌશલ્યોની કચાશ ચકાસવા માટે બાળ-મિત્ર મનોવૈજ્ઞાનિક કસોટીઓ.',
      newAssessment: 'નવી કસોટી નિયત કરો',
      selectClass: 'વર્ગ પસંદ કરો',
      selectStudent: 'વિદ્યાર્થી પસંદ કરો',
      selectSubject: 'વિષય ક્ષેત્ર પસંદ કરો',
      selectLanguage: 'કસોટીની ભાષા',
      estimatedDuration: 'અંદાજિત સમય: ૧૦-૧૨ મિનિટ',
      startAssessment: 'કસોટી શરૂ કરો',
      oneQuestionPerScreen: 'એક સ્ક્રીન પર એક સ્પષ્ટ પ્રશ્ન · બાળ-સહજ શાંત વાતાવરણ',
      listenAudio: 'સાંભળો (Audio)',
      stopAudio: 'રોકો (Stop)',
      transcript: 'વાંચો (Transcript)',
      answerRecorded: 'જવાબ નોંધાઈ ગયો છે.',
      submitAndDiagnose: 'સબમિટ કરો અને નિદાન મેળવો',
      evaluatingDiagnostic: 'કૌશલ્ય વિશ્લેષણ થઈ રહ્યું છે...',
      resultsTitle: 'FLN નિદાન પરિણામ અને કૌશલ્ય નકશો',
      probableGapVsValidated: 'સંભવિત કચાશ વિરુદ્ધ ખાતરીપૂર્વકનું નિદાન',
      probableGapNote:
        'આ કસોટી માત્ર સંભવિત ખ્યાલાત્મક અડચણ દર્શાવે છે, તે કોઈ કાયમી ખામી કે અસમર્થતા નથી.',
      validatedDiagnosisNote:
        'શિક્ષક દ્વારા પ્રત્યક્ષ ભૌતિક સાધનો (જેમ કે સળીઓની ભારી) સાથે ચકાસ્યા પછી જ માન્ય થાય છે.',
      confirmDiagnosis: 'નિદાનની ખાતરી કરો (શિક્ષક દ્વારા ચકાસેલ)',
      evidenceTitle: 'દરેક ભલામણ માટેના ચોક્કસ પુરાવા',
      sequenceTitle: 'ભલામણ કરેલ પૂર્વજરૂરી અધ્યયન ક્રમ',
      dailyActivitiesTitle: 'ટૂંકી દૈનિક વર્ગ પ્રવૃત્તિઓ (૧૦-૧૫ મિનિટ)',
      approvePlanCTA: 'ભલામણ કરેલ અધ્યયન યોજના મંજૂર કરો',
    },

    pathways: {
      title: 'અનુકૂલિત ઉપચારાત્મક અધ્યયન માર્ગ',
      subtitle: 'શિક્ષકો દ્વારા મંજૂર થયેલ ૫-દિવસીય વર્ગખંડ દૈનિક સૂક્ષ્મ-પ્રવૃત્તિઓ.',
      weeklySchedule: 'સાપ્તાહિક સમયપત્રક (સોમવાર થી શનિવાર)',
      approvedActive: 'શિક્ષક દ્વારા મંજૂર અને સક્રિય',
      targetCompletion: 'લક્ષ્ય પૂર્ણતા: સપ્તાહ અંત સુધીમાં',
      formatPill: 'મૂર્ત સાધન મહાવરો',
      curriculumMapped: 'GCERT અભ્યાસક્રમ આધારિત',
      teacherSignoff: 'શિક્ષકની વ્યાવસાયિક સહી નોંધાયેલ',
      markActivityComplete: 'પ્રવૃત્તિ પૂર્ણ તરીકે નોંધો',
      activityCompletedToast: 'વર્ગખંડ માઇલસ્ટોન નોંધાયો! બાળકની પ્રગતિ અપડેટ થઈ.',
    },

    actions: {
      title: 'શિક્ષક કાર્ય યોજના વર્કસ્પેસ',
      subtitle: 'તાત્કાલિક શૈક્ષણિક હસ્તક્ષેપ, નાના જૂથની બેઠક અને પ્રગતિ અનુકાર્ય.',
      filterPriority: 'પ્રાથમિકતા',
      filterStatus: 'સ્થિતિ',
      markCompleted: 'કાર્ય પૂર્ણ થયું',
      addNewAction: 'નવી નોંધ ઉમેરો',
      recommendedNextStep: 'ભલામણ કરેલ આગામી પગલું',
    },

    reports: {
      title: 'શાળા અને વહીવટી અહેવાલો',
      subtitle: 'શિક્ષકો અને શિક્ષણ અધિકારીઓ માટે અધિકૃત પાયાના શિક્ષણ સૂચકાંકો.',
      roleView: 'અધિકૃત ભૂમિકા મુજબ દર્શન:',
      teacherView: 'વર્ગ શિક્ષક દ્રષ્ટિ: ધોરણ ૩-અ કવરેજ અને ઉપચાર પ્રગતિ',
      headTeacherView: 'મુખ્ય શિક્ષક દ્રષ્ટિ: શાળા કક્ષાએ FLN વિતરણ',
      crcView: 'CRC / BRC સંયોજક દ્રષ્ટિ: ખંભાળિયા ક્લસ્ટર સામૂહિક સારાંશ',
      deoView: 'જિલ્લા શિક્ષણાધિકારી (DEO) દ્રષ્ટિ: દેવભૂમિ દ્વારકા જિલ્લો',
      clusterSummary: 'ક્લસ્ટર સારાંશ (ખંભાળિયા તાલુકો)',
      districtSummary: 'જિલ્લા કક્ષાના સૂચકાંક (દેવભૂમિ દ્વારકા)',
      exportReport: 'અધિકૃત CSV અહેવાલ ડાઉનલોડ કરો',
      flnCoverageRate: 'જિલ્લા FLN કસોટી કવરેજ',
      prerequisiteMasteryRate: 'ઉપચાર યોજના પૂર્ણતા દર',
      offlineSyncIntegrity: 'ડિવાઇસ સિંક્રોનાઇઝેશન આરોગ્ય',
      nonStigmatizingNotice:
        'નવી શિક્ષણ નીતિ અનુસાર, અહેવાલો બાળકોનું સરખામણીયુક્ત રેન્કિંગ દર્શાવવાને બદલે માત્ર કૌશલ્ય પ્રાપ્તિ અને વૃદ્ધિ પર ધ્યાન કેન્દ્રિત કરે છે.',
    },

    parent: {
      title: 'વાલી શિક્ષણ સહાયતા પોર્ટલ',
      subtitle: 'બાળકના પાયાના શિક્ષણની પ્રગતિ વિશે સકારાત્મક અને પ્રોત્સાહક માહિતી.',
      childProfile: 'જોડાયેલ બાળક:',
      practicingAtSchool: 'શાળામાં હાલ શીખવવામાં આવતા કૌશલ્યો',
      homeActivitiesTitle: 'ઘરે કરી શકાય તેવી સરળ પ્રવૃત્તિઓ (૫-૧૦ મિનિટ)',
      homeActivity1Title: 'રસોડાની વસ્તુઓ ગણવી',
      homeActivity1Desc: 'બાળક સાથે ૧૦ ચમચી કે પથ્થર ગણો અને ૧૦-૧૦ ના જૂથ બનાવડાવો.',
      homeActivity2Title: 'ટૂંકી વાર્તા શ્રવણ અને પ્રશ્નોત્તરી',
      homeActivity2Desc: 'સાથે ટૂંકી ગુજરાતી વાર્તા વાંચો અને પૂછો: "વાર્તામાં કોણ હતું અને ક્યાં ગયું હતું?"',
      recentMilestones: 'તાજેતરમાં મેળવેલ સિદ્ધિઓ',
      encouragementNote:
        'દરેક બાળક પોતાની ગતિએ શીખે છે. નિયમિત અને પ્રેમાળ મહાવરો બાળકમાં મોટો આત્મવિશ્વાસ જગાવે છે.',
    },

    login: {
      brandSubtitle: 'AI-સહાયિત નિદાન અને ઉપચારાત્મક શિક્ષણ પ્લેટફોર્મ',
      heading: 'આપનું સ્વાગત છે',
      subheading: 'શાળા વર્કસ્પેસ અને શિક્ષણ યોજનાઓમાં પ્રવેશ મેળવો.',
      signInAs: 'હું આ ભૂમિકામાં પ્રવેશ કરું છું:',
      schoolCodeOrEmail: 'શાળા કોડ અથવા નોંધાયેલ મોબાઇલ / ઇમેઇલ',
      password: 'પાસવર્ડ',
      showPassword: 'પાસવર્ડ બતાવો',
      hidePassword: 'પાસવર્ડ છુપાવો',
      rememberDevice: 'આ ઉપકરણને ૩૦ દિવસ યાદ રાખો',
      forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
      signInButton: 'સુરક્ષિત પ્રવેશ કરો',
      exploreDemoButton: 'શિક્ષક ડેમો વર્કસ્પેસમાં પ્રવેશ કરો',
      helpdeskSupport: 'શાળા એકાઉન્ટમાં પ્રવેશ મેળવવામાં મદદ જોઈએ છે? હેલ્પડેસ્ક સંપર્ક',
      demoDisclaimer:
        'કલેક્ટર કચેરી, દેવભૂમિ દ્વારકા અંતર્ગત શૈક્ષણિક નિદર્શન પ્રોટોટાઇપ.',
    },
  },

  hi: {
    appName: 'सक्षम FLN',
    appSubtitle: 'अधिगम पथ एवं शिक्षक सहायता मंच',
    schoolName: 'आशा प्राथमिक विद्यालय',
    districtName: 'देवभूमि द्वारका, गुजरात',
    tagline: 'पूर्वपेक्षित अंतराल पहचानें। व्यक्तिगत अभ्यास दें। हर बच्चे को आगे बढ़ाएं।',

    nav: {
      overview: 'अवलोकन (डैशबोर्ड)',
      classes: 'कक्षा प्रबंधन',
      students: 'विद्यार्थी',
      assessments: 'नैदानिक आकलन',
      learningPathways: 'उपचारात्मक शिक्षण पथ',
      teacherActions: 'शिक्षक कार्य योजना',
      reports: 'रिपोर्ट एवं प्रगति',
      parentPortal: 'अभिभावक सहयोग',
      exitWorkspace: 'कार्यक्षेत्र से बाहर जाएं',
      collapseSidebar: 'साइडबार संकुचित करें',
      expandSidebar: 'साइडबार विस्तृत करें',
    },

    common: {
      search: 'खोजें...',
      filter: 'फ़िल्टर',
      all: 'सभी',
      standard: 'कक्षा',
      grade: 'कक्षा',
      section: 'वर्ग/सेक्शन',
      status: 'स्थिति',
      progress: 'प्रगति',
      actions: 'कार्रवाई',
      view: 'देखें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      close: 'बंद करें',
      submit: 'जमा करें',
      next: 'अगला',
      previous: 'पिछला',
      loading: 'लोड हो रहा है...',
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन',
      syncing: 'सिंक हो रहा है...',
      syncNow: 'अभी सिंक करें',
      synced: 'सिंक पूर्ण',
      simulatedOffline: 'ऑफ़लाइन सिमुलेशन',
      exportCsv: 'CSV निर्यात करें',
      print: 'प्रिंट करें',
      resetDemo: 'डेमो डेटा रीसेट करें',
      demonstrated: 'सिद्ध किया',
      developing: 'विकासशील',
      needsSupport: 'सहयोग आवश्यक',
      pending: 'लंबित',
      completed: 'पूर्ण',
      inProgress: 'प्रगति पर',
      scheduled: 'निर्धारित',
      approved: 'स्वीकृत',
      requiresReview: 'समीक्षा आवश्यक',
      highPriority: 'उच्च प्राथमिकता',
      mediumPriority: 'मध्यम प्राथमिकता',
      lowPriority: 'सामान्य प्राथमिकता',
      dueDate: 'नियत तिथि',
      notes: 'टिप्पणी',
      materials: 'आवश्यक शिक्षण सामग्री',
      duration: 'अवधि',
      prerequisite: 'पूर्वपेक्षित कौशल',
      targetSkill: 'लक्षित कौशल',
      literacy: 'भाषा साक्षरता',
      numeracy: 'संख्या ज्ञान',
      academicYear: 'शैक्षणिक सत्र',
      medium: 'माध्यम',
      classTeacher: 'कक्षा शिक्षक',
      totalEnrolled: 'कुल नामांकित',
      assessed: 'आकलित',
      activePlans: 'सक्रिय योजनाएं',
      milestones: 'उपलब्धियां',
      noRecordsFound: 'कोई परिणाम नहीं मिला।',
    },

    dashboard: {
      welcomeGreeting: 'सुप्रभात, शिक्षिका आशा शाह',
      subtitle: 'कक्षा ३-अ बुनियादी साक्षरता और संख्याज्ञान अवलोकन।',
      metrics: {
        studentsAssessed: 'आकलित विद्यार्थी',
        activeSupportPlans: 'सक्रिय उपचारात्मक योजनाएं',
        milestonesThisWeek: 'इस सप्ताह की उपलब्धियां',
        awaitingSync: 'सिंक हेतु लंबित रिकॉर्ड',
        enrolledTotal: 'नामांकित विद्यार्थियों में से',
        readyToProgress: 'आगे बढ़ने हेतु तैयार',
        acrossLearners: 'पूरी कक्षा में',
        savedLocally: 'इस उपकरण पर सहेजा गया',
      },
      classMilestoneCompletion: 'कक्षा उपलब्धि पूर्णता दर',
      averageMilestones: 'साप्ताहिक पूर्ण अभ्यास गतिविधियों का प्रतिशत',
      last6Weeks: 'पिछले ६ सप्ताह',
      last4Weeks: 'पिछले ४ सप्ताह',
      term1Baseline: 'सत्र १ आधार रेखा',
      skillGapDistribution: 'कौशल अंतराल वितरण',
      focusedPracticeNeeded: 'विशेष अभ्यास की आवश्यकता वाले विद्यार्थी',
      studentsNeedingFollowup: 'विशेष ध्यान योग्य विद्यार्थी',
      supportiveActionsNote: 'रैंकिंग नहीं, केवल विकासात्मक सहयोग के कदम',
      viewAllStudents: 'सभी विद्यार्थी देखें',
      todaysActions: 'आज के शिक्षक कार्य',
      actionsCompletedOf: 'कार्य पूर्ण हुए कुल में से',
      noticeSignalTitle: 'शैक्षणिक सूचना: प्रारंभिक संकेत बनाम सत्यापित निदान',
      noticeSignalBody:
        'एक त्वरित आकलन केवल संभावित अंतराल का संकेत देता है। कक्षा शिक्षक भौतिक शिक्षण सामग्री के साथ पुष्टि करके ही औपचारिक निदान तय करते हैं।',
    },

    classes: {
      title: 'कक्षा निर्देशिका एवं प्रबंधन',
      subtitle: 'आशा प्राथमिक विद्यालय - कक्षा १ से ८ बुनियादी साक्षरता एवं संख्याज्ञान प्रबंधन।',
      classRoster: 'कक्षा सूची',
      standardFilter: 'कक्षा अनुसार फ़िल्टर',
      sectionFilter: 'सेक्शन अनुसार फ़िल्टर',
      mediumFilter: 'शिक्षा का माध्यम',
      addClass: 'नई कक्षा जोड़ें',
      startClassAssessment: 'कक्षा आकलन शुरू करें',
      exportClassReport: 'कक्षा सारांश निर्यात करें',
      classTeacher: 'कक्षा शिक्षक',
      tabs: {
        overview: 'अवलोकन',
        students: 'विद्यार्थी सूची',
        assessments: 'आकलन',
        plans: 'उपचारात्मक योजनाएं',
        reports: 'कक्षा विश्लेषण',
      },
      overviewSummary: 'कक्षा प्रगति सारांश',
      literacyCoverage: 'बुनियादी साक्षरता कवरेज',
      numeracyCoverage: 'बुनियादी संख्याज्ञान कवरेज',
      activeSupportPlansCount: 'सक्रिय उपचारात्मक योजनाएं',
      reassessmentScheduled: 'आगामी पुनःआकलन',
    },

    students: {
      title: 'विद्यार्थी बुनियादी अधिगम प्रोफ़ाइल',
      subtitle: 'व्यक्तिगत FLN प्रगति, कौशल निदान और उपचारात्मक अभ्यास पथ।',
      rosterTitle: 'नामांकित विद्यार्थी',
      rollNumber: 'क्रमांक',
      studentId: 'विद्यार्थी आईडी',
      flnStatus: 'FLN स्थिति',
      prerequisiteGap: 'पूर्वपेक्षित अंतराल',
      pedagogicalInsight: 'शैक्षणिक अंतर्दृष्टि',
      diagnosticScore: 'नैदानिक आधार रेखा स्कोर',
      viewProfile: 'प्रोफ़ाइल देखें',
      startDiagnostic: 'नैदानिक आकलन लें',
      reviewPlan: 'उपचारात्मक योजना देखें',
      profileTitle: 'विद्यार्थी शैक्षणिक प्रोफ़ाइल',
      learningTrajectory: 'विकासात्मक प्रगति क्रम',
      assignedActivities: 'कक्षा अभ्यास कार्य',
      teacherObservations: 'शिक्षक अवलोकन टिप्पणी',
      recentAssessments: 'आकलन इतिहास',
      nextAction: 'अनुशंसित आगामी शिक्षक कदम',
      addStudent: 'नया विद्यार्थी पंजीकृत करें',
    },

    assessments: {
      title: 'नैदानिक आकलन प्रबंधन',
      subtitle: 'पूर्वपेक्षित अवधारणाओं को समझने हेतु बाल-सुलभ एवं तनावमुक्त आकलन।',
      newAssessment: 'नया आकलन निर्धारित करें',
      selectClass: 'कक्षा चुनें',
      selectStudent: 'विद्यार्थी चुनें',
      selectSubject: 'विषय क्षेत्र चुनें',
      selectLanguage: 'आकलन की भाषा',
      estimatedDuration: 'अनुमानित अवधि: १०-१२ मिनट',
      startAssessment: 'आकलन सत्र प्रारंभ करें',
      oneQuestionPerScreen: 'प्रति स्क्रीन एक स्पष्ट प्रश्न · शांत वातावरण',
      listenAudio: 'सुनें (Listen)',
      stopAudio: 'रोकें (Stop)',
      transcript: 'टेक्स्ट देखें',
      answerRecorded: 'उत्तर दर्ज कर लिया गया है।',
      submitAndDiagnose: 'जमा करें और निदान देखें',
      evaluatingDiagnostic: 'कौशल विश्लेषण किया जा रहा है...',
      resultsTitle: 'FLN नैदानिक परिणाम एवं कौशल मैपिंग',
      probableGapVsValidated: 'संभावित अंतराल बनाम सत्यापित निदान',
      probableGapNote:
        'यह संकेत केवल एक संभावित अवधारणात्मक झिझक दिखाता है, कोई सीखने की अक्षमता नहीं।',
      validatedDiagnosisNote:
        'मूर्त वस्तुओं (जैसे तीलियों के बंडल) से कक्षा में पुष्टि के बाद ही सत्यापित होता है।',
      confirmDiagnosis: 'निदान की पुष्टि करें (शिक्षक द्वारा सत्यापित)',
      evidenceTitle: 'प्रत्येक अनुशंसा हेतु स्पष्ट साक्ष्य',
      sequenceTitle: 'अनुशंसित पूर्वपेक्षित अधिगम क्रम',
      dailyActivitiesTitle: 'लघु दैनिक कक्षा गतिविधियां (१०-१५ मिनट)',
      approvePlanCTA: 'अनुशंसित शिक्षण योजना स्वीकृत करें',
    },

    pathways: {
      title: 'अनुकूलित उपचारात्मक शिक्षण पथ',
      subtitle: 'शिक्षकों द्वारा स्वीकृत ५-दिवसीय दैनिक सूक्ष्म-अभ्यास गतिविधियां।',
      weeklySchedule: 'साप्ताहिक समय सारिणी (सोमवार से शनिवार)',
      approvedActive: 'शिक्षक द्वारा स्वीकृत एवं सक्रिय',
      targetCompletion: 'लक्षित पूर्णता: सप्ताहांत तक',
      formatPill: 'मूर्त गतिविधि अभ्यास',
      curriculumMapped: 'GCERT पाठ्यक्रम अनुरूप',
      teacherSignoff: 'शिक्षक का पेशेवर हस्ताक्षर दर्ज',
      markActivityComplete: 'गतिविधि पूर्ण चिन्हित करें',
      activityCompletedToast: 'उपलब्धि दर्ज की गई! विद्यार्थी की प्रगति अद्यतन हुई।',
    },

    actions: {
      title: 'शिक्षक कार्य योजना कार्यक्षेत्र',
      subtitle: 'प्राथमिकता-आधारित शैक्षणिक हस्तक्षेप, छोटे समूह के सत्र और अनुवर्ती कार्य।',
      filterPriority: 'प्राथमिकता',
      filterStatus: 'स्थिति',
      markCompleted: 'कार्य पूर्ण हुआ',
      addNewAction: 'नई टिप्पणी जोड़ें',
      recommendedNextStep: 'अनुशंसित अगला कदम',
    },

    reports: {
      title: 'विद्यालय एवं प्रशासनिक रिपोर्ट',
      subtitle: 'शिक्षकों और शिक्षा अधिकारियों हेतु अधिकृत बुनियादी शिक्षा संकेतक।',
      roleView: 'अधिकृत भूमिका अनुसार देखें:',
      teacherView: 'शिक्षक दृष्टि: कक्षा ३-अ कवरेज एवं उपचारात्मक प्रगति',
      headTeacherView: 'प्रधानाध्यापक दृष्टि: विद्यालय-स्तरीय FLN वितरण',
      crcView: 'CRC / BRC समन्वयक दृष्टि: खंभालिया क्लस्टर समग्र सारांश',
      deoView: 'जिला शिक्षा अधिकारी (DEO) दृष्टि: देवभूमि द्वारका जिला',
      clusterSummary: 'क्लस्टर सारांश (खंभालिया ब्लॉक)',
      districtSummary: 'जिला-स्तरीय संकेतक (देवभूमि द्वारका)',
      exportReport: 'अधिकृत CSV रिपोर्ट डाउनलोड करें',
      flnCoverageRate: 'जिला FLN आकलन कवरेज',
      prerequisiteMasteryRate: 'उपचारात्मक योजना पूर्णता दर',
      offlineSyncIntegrity: 'उपकरण सिंक्रोनाइज़ेशन स्वास्थ्य',
      nonStigmatizingNotice:
        'राष्ट्रीय शिक्षा नीति के अनुसार, रिपोर्ट तुलनात्मक रैंकिंग के बजाय बुनियादी कौशल उपलब्धि पर केंद्रित है।',
    },

    parent: {
      title: 'अभिभावक अधिगम सहयोग पोर्टल',
      subtitle: 'आपके बच्चे की बुनियादी शिक्षा प्रगति पर सकारात्मक एवं प्रोत्साहक जानकारी।',
      childProfile: 'संबद्ध विद्यार्थी:',
      practicingAtSchool: 'विद्यालय में वर्तमान में अभ्यास किए जा रहे कौशल',
      homeActivitiesTitle: 'घर पर करने योग्य मनोरंजक गतिविधियां (५-१० मिनट)',
      homeActivity1Title: 'घर की वस्तुओं की गिनती',
      homeActivity1Desc: 'बच्चे के साथ १० चम्मच या कंकड़ गिनें और १०-१० के बंडल बनाएं।',
      homeActivity2Title: 'छोटी कहानी सुनना और प्रश्न पूछना',
      homeActivity2Desc: 'साथ में एक छोटी कहानी पढ़ें और पूछें: "कहानी में कौन था और वह कहाँ गया था?"',
      recentMilestones: 'हाल ही में अर्जित उपलब्धियां',
      encouragementNote:
        'हर बच्चा अपनी गति से सीखता है। नियमित और स्नेही अभ्यास बच्चे में गहरा आत्मविश्वास पैदा करता है।',
    },

    login: {
      brandSubtitle: 'AI-सहायित नैदानिक एवं उपचारात्मक शिक्षण कार्यक्षेत्र',
      heading: 'वापसी पर स्वागत है',
      subheading: 'विद्यालय अभिलेखों और शिक्षण योजनाओं तक पहुँचने के लिए प्रवेश करें।',
      signInAs: 'मैं इस रूप में प्रवेश कर रहा हूँ:',
      schoolCodeOrEmail: 'विद्यालय कोड अथवा पंजीकृत मोबाइल / ईमेल',
      password: 'पासवर्ड',
      showPassword: 'पासवर्ड देखें',
      hidePassword: 'पासवर्ड छुपाएं',
      rememberDevice: 'इस उपकरण को ३० दिनों के लिए याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signInButton: 'सुरक्षित प्रवेश करें',
      exploreDemoButton: 'शिक्षक डेमो कार्यक्षेत्र देखें',
      helpdeskSupport: 'विद्यालय खाते में प्रवेश में सहायता चाहिए? सहायता केंद्र',
      demoDisclaimer:
        'कलेक्टर कार्यालय, देवभूमि द्वारका के अंतर्गत शैक्षणिक प्रदर्शन प्रोटोटाइप।',
    },
  },
}
