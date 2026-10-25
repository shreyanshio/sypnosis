import { Role } from '@/lib/types'

export interface RoleReportData {
  role: Role
  title: string
  subtitle: string
  scopeName: string
  assessmentCoverageRate: number
  remedialPlanCompletionRate: number
  offlineSyncHealthRate: number
  summaryMetrics: Array<{ label: string; value: string; note: string }>
  gradeBreakdown: Array<{
    standard: string
    enrolled: number
    assessed: number
    coveragePercent: number
    literacyMastery: number
    numeracyMastery: number
  }>
  clusterTrend?: Array<{
    name: string
    schoolsCount: number
    coverageRate: number
    remedialRate: number
  }>
}

export const reportService = {
  getRoleReport: (role: Role): RoleReportData => {
    switch (role) {
      case 'head_teacher':
        return {
          role: 'head_teacher',
          title: 'Asha Primary School - School-Wide Foundational Digest',
          subtitle: 'Comprehensive Standard 1 to 8 FLN coverage and remedial plan status.',
          scopeName: 'Asha Primary School (All 9 Sections)',
          assessmentCoverageRate: 88,
          remedialPlanCompletionRate: 74,
          offlineSyncHealthRate: 98,
          summaryMetrics: [
            { label: 'Total Enrolled', value: '258', note: 'Standards 1 to 8' },
            { label: 'Assessed Learners', value: '228', note: '88.3% coverage' },
            { label: 'Active Remedial Plans', value: '92', note: 'Teacher supervised' },
            { label: 'Teachers Active', value: '9', note: '100% submission' },
          ],
          gradeBreakdown: [
            { standard: 'Standard 1', enrolled: 26, assessed: 22, coveragePercent: 85, literacyMastery: 68, numeracyMastery: 71 },
            { standard: 'Standard 2', enrolled: 27, assessed: 25, coveragePercent: 93, literacyMastery: 73, numeracyMastery: 76 },
            { standard: 'Standard 3', enrolled: 53, assessed: 47, coveragePercent: 89, literacyMastery: 71, numeracyMastery: 72 },
            { standard: 'Standard 4', enrolled: 30, assessed: 28, coveragePercent: 93, literacyMastery: 79, numeracyMastery: 81 },
            { standard: 'Standard 5', enrolled: 29, assessed: 29, coveragePercent: 100, literacyMastery: 84, numeracyMastery: 86 },
            { standard: 'Standard 6', enrolled: 32, assessed: 30, coveragePercent: 94, literacyMastery: 87, numeracyMastery: 88 },
            { standard: 'Standard 7', enrolled: 31, assessed: 31, coveragePercent: 100, literacyMastery: 90, numeracyMastery: 91 },
            { standard: 'Standard 8', enrolled: 30, assessed: 30, coveragePercent: 100, literacyMastery: 92, numeracyMastery: 93 },
          ],
        }

      case 'crc_coordinator':
        return {
          role: 'crc_coordinator',
          title: 'Khambhalia Cluster FLN Monitoring Report',
          subtitle: 'Cluster Resource Centre (CRC) monitoring across 14 primary schools.',
          scopeName: 'Khambhalia Cluster, Devbhumi Dwarka',
          assessmentCoverageRate: 85,
          remedialPlanCompletionRate: 71,
          offlineSyncHealthRate: 95,
          summaryMetrics: [
            { label: 'Schools in Cluster', value: '14', note: 'Government & aided' },
            { label: 'Total Primary Learners', value: '1,840', note: 'Classes 1 to 5' },
            { label: 'Assessed This Term', value: '1,564', note: '85.0% coverage' },
            { label: 'Active Support Pathways', value: '648', note: 'Ongoing remediation' },
          ],
          gradeBreakdown: [
            { standard: 'Class 1', enrolled: 350, assessed: 290, coveragePercent: 83, literacyMastery: 65, numeracyMastery: 68 },
            { standard: 'Class 2', enrolled: 365, assessed: 312, coveragePercent: 85, literacyMastery: 71, numeracyMastery: 73 },
            { standard: 'Class 3', enrolled: 385, assessed: 334, coveragePercent: 87, literacyMastery: 74, numeracyMastery: 75 },
            { standard: 'Class 4', enrolled: 370, assessed: 318, coveragePercent: 86, literacyMastery: 78, numeracyMastery: 80 },
            { standard: 'Class 5', enrolled: 370, assessed: 310, coveragePercent: 84, literacyMastery: 82, numeracyMastery: 85 },
          ],
          clusterTrend: [
            { name: 'Asha Primary School', schoolsCount: 1, coverageRate: 88, remedialRate: 74 },
            { name: 'Dwarka Kanya Shala', schoolsCount: 1, coverageRate: 86, remedialRate: 70 },
            { name: 'Bhadthar Primary School', schoolsCount: 1, coverageRate: 84, remedialRate: 68 },
            { name: 'Kalyanpur Cluster School', schoolsCount: 1, coverageRate: 82, remedialRate: 72 },
          ],
        }

      case 'deo':
        return {
          role: 'deo',
          title: 'Devbhumi Dwarka District FLN Overview',
          subtitle: 'District Education Office executive digest for Collectorate review (Problem ID: PS000034).',
          scopeName: 'Devbhumi Dwarka District (4 Talukas)',
          assessmentCoverageRate: 83,
          remedialPlanCompletionRate: 69,
          offlineSyncHealthRate: 94,
          summaryMetrics: [
            { label: 'Total Enrolled (District)', value: '18,450', note: 'Primary grades 1-5' },
            { label: 'Assessed Coverage', value: '83.2%', note: '15,350 learners' },
            { label: 'Support Plans Active', value: '6,420', note: 'Supervised weekly' },
            { label: 'Offline Sync Rate', value: '94.8%', note: 'Devices synced <24h' },
          ],
          gradeBreakdown: [
            { standard: 'Standard 1', enrolled: 3600, assessed: 2950, coveragePercent: 82, literacyMastery: 64, numeracyMastery: 67 },
            { standard: 'Standard 2', enrolled: 3700, assessed: 3070, coveragePercent: 83, literacyMastery: 70, numeracyMastery: 72 },
            { standard: 'Standard 3', enrolled: 3800, assessed: 3200, coveragePercent: 84, literacyMastery: 72, numeracyMastery: 74 },
            { standard: 'Standard 4', enrolled: 3650, assessed: 3050, coveragePercent: 83, literacyMastery: 77, numeracyMastery: 79 },
            { standard: 'Standard 5', enrolled: 3700, assessed: 3080, coveragePercent: 83, literacyMastery: 81, numeracyMastery: 84 },
          ],
          clusterTrend: [
            { name: 'Khambhalia Taluka', schoolsCount: 84, coverageRate: 85, remedialRate: 71 },
            { name: 'Dwarka Taluka', schoolsCount: 62, coverageRate: 84, remedialRate: 69 },
            { name: 'Kalyanpur Taluka', schoolsCount: 78, coverageRate: 82, remedialRate: 67 },
            { name: 'Bhanvad Taluka', schoolsCount: 70, coverageRate: 81, remedialRate: 68 },
          ],
        }

      case 'teacher':
      default:
        return {
          role: 'teacher',
          title: 'Class 3A Classroom Foundational Progress',
          subtitle: 'Detailed competency mastery, remedial coverage, and pending reassessments.',
          scopeName: 'Asha Primary School · Class 3A',
          assessmentCoverageRate: 86,
          remedialPlanCompletionRate: 71,
          offlineSyncHealthRate: 100,
          summaryMetrics: [
            { label: 'Students Enrolled', value: '28', note: 'Class 3A Roster' },
            { label: 'Assessed Learners', value: '24', note: '85.7% coverage' },
            { label: 'Active Support Plans', value: '17', note: '4 ready to progress' },
            { label: 'Milestones Recorded', value: '38', note: 'Across class this week' },
          ],
          gradeBreakdown: [
            { standard: 'Gujarati Phonics', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 78, numeracyMastery: 0 },
            { standard: 'Sentence Reading', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 70, numeracyMastery: 0 },
            { standard: 'Place Value Bundles', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 69 },
            { standard: 'Expanded Notation', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 74 },
            { standard: 'Concrete Regrouping', enrolled: 28, assessed: 24, coveragePercent: 86, literacyMastery: 0, numeracyMastery: 72 },
          ],
        }
    }
  },

  exportReportCsv: (role: Role): void => {
    const report = reportService.getRoleReport(role)
    const rows = [
      ['Report Title', report.title],
      ['Scope', report.scopeName],
      ['Assessment Coverage Rate', `${report.assessmentCoverageRate}%`],
      ['Remedial Plan Completion Rate', `${report.remedialPlanCompletionRate}%`],
      ['Offline Sync Integrity', `${report.offlineSyncHealthRate}%`],
      [''],
      ['Domain / Grade', 'Enrolled', 'Assessed', 'Coverage %', 'Literacy %', 'Numeracy %'],
      ...report.gradeBreakdown.map((g) => [
        g.standard,
        `${g.enrolled}`,
        `${g.assessed}`,
        `${g.coveragePercent}%`,
        `${g.literacyMastery}%`,
        `${g.numeracyMastery}%`,
      ]),
      [''],
      ['Generated On', new Date().toLocaleDateString('en-IN')],
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${role}_FLN_Report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}
