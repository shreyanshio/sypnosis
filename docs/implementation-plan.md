# Saksham FLN — Implementation Plan

**Problem ID**: PS000034  
**Project**: Saksham FLN — AI-Assisted Diagnostic and Adaptive Remedial Learning System  
**Stakeholder**: Collector Office, Devbhumi Dwarka  
**Sector**: Education Technology (Foundational Literacy and Numeracy)  
**Target Beneficiaries**: Standards 1–8 Students, Teachers, Head Teachers, CRC/BRC Coordinators, District Education Officers, Parents/Guardians  

---

## 1. Architectural Principles & Constraints

1. **Frontend-Only Architecture with Replaceable Integration Layer**:
   - Zero hardcoded external backend/auth dependencies.
   - Centralized local storage layer with typed service contracts (`localStore`, `IndexedDB` / namespaced `localStorage`).
   - Storage versioning (`STORAGE_VERSION = 1`) with schema migrations and idempotent initial seeding.
   - Clean separation of UI components from data-access repositories to enable future REST/GraphQL backend plug-ins without rewriting views.

2. **Restrained Educational Product Design Language**:
   - Palette: Navy (`#17324D`), Teal (`#0D9488`), Canvas (`#F7F9F6`), Card Surface (`#FFFFFF`), Border (`#E2E8F0`), Text Primary (`#263238`), Text Secondary (`#64748B`), Soft Mint (`#DFF4EF`), Warning (`#B7791F`), Error (`#B42318`), Success (`#15803D`).
   - 4px spacing scale, 8px input/button radius, 10–12px card radius, 12px dialog radius.
   - No neon gradients, no marketing hero cards, no AI robot illustrations, no deceptive official government seals.
   - Real, dignified educational terminology avoiding student ranking or punitive league tables.

3. **Trilingual Localization & Typography**:
   - Full support for English (`en`), Gujarati (`gu`), and Hindi (`hi`).
   - Dynamic font application: `Inter` for English, `Noto Sans Gujarati` for Gujarati, `Noto Sans Devanagari` for Hindi.
   - Instant HTML `lang` attribute and font switching without full-page reloads.

4. **App Shell & Viewport Ergonomics**:
   - Fixed 56px header and collapsible 240px sidebar with `min-height: 100dvh`.
   - Content area styled with `min-width: 0` to prevent horizontal overflow on standard 1366×768 desktop displays and mobile screens (360px–844px).

---

## 2. Phase-by-Phase Implementation Checklist

### Phase A: Domain Model, Local Storage Layer & Services
- [x] Create comprehensive domain interfaces in `lib/types/index.ts`: `School`, `AcademicYear`, `Classroom`, `User`, `Student`, `Subject`, `Skill`, `Question`, `Assessment`, `AssessmentAttempt`, `SkillResult`, `LearningActivity`, `LearningPlan`, `TeacherAction`, `Notification`, `SyncQueueItem`, `AuditEvent`.
- [x] Build centralized storage manager `lib/storage/index.ts` with versioning, seed hydration, and safe local persistence.
- [x] Create and connect core services:
  - `schoolService`
  - `academicYearService`
  - `classService`
  - `studentService`
  - `assessmentService`
  - `questionBankService`
  - `skillService`
  - `learningActivityService`
  - `learningPlanService`
  - `teacherActionService`
  - `reportService`
  - `notificationService`
  - `guardianService`
  - `contentManagementService`
  - `auditService`
  - `authService` (with role-based permissions matrix)
  - `syncService`

### Phase B: School Administration, Class Management & Student Profiles
- [x] Implement `/app/admin/school` (School Profile, Code, Cluster, Block, Mediums).
- [x] Implement `/app/admin/academic-years` (Active academic year toggle, dates, duplicate validation).
- [x] Implement `/app/admin/users` (Staff directory, role assignments, class associations).
- [x] Implement `/app/admin/classes` (Admin class manager with Standard 1–8 configurator).
- [x] Refine `/app/classes` and `/app/classes/[classId]` with all 6 live tabs:
  1. Overview
  2. Students
  3. Assessments
  4. Learning Plans
  5. Teacher Actions
  6. Reports
- [x] Refine `/app/students` (Cohort search, Standard/Medium/Status filters, CSV export).
- [x] Refine `/app/students/[studentId]` with all 6 profile views:
  1. Overview
  2. Skill Progress (Demonstrated vs Needs Practice)
  3. Assessments history
  4. Active 5-Day Learning Plan
  5. Formative Observations Diary
  6. Activity History

### Phase C: Question Bank & Diagnostic Assessment Session
- [x] Implement `/app/question-bank` (Filters: Grade range, subject, skill, prerequisite, difficulty, review/publication status).
- [x] Implement `/app/question-bank/[questionId]` (Question details, explanation, preview, answer options, prerequisite tags).
- [x] Implement `/app/assessments` (Directory with Draft, Scheduled, In Progress, Completed, Requires Review).
- [x] Implement `/app/assessments/new` (Creation workflow: Class, individual/cohort selection, domain, language, duration, objectives).
- [x] Implement `/app/assessments/[assessmentId]` (Child-friendly runner, 1-question-per-screen, audio read-aloud via Web Speech API, explainable scoring engine distinguishing screening signal from validated diagnosis).

### Phase D: Learning Resources, Adaptive Plans, Teacher Actions & Reassessments
- [x] Implement `/app/resources` (Flashcards, audio practice, phonics, number lines, guided arithmetic, printable worksheets).
- [x] Implement `/app/resources/[resourceId]` (Resource preview, player, student/class assignment).
- [x] Implement `/app/content-management` (Drafts, curriculum review status, publish/unpublish workflow).
- [x] Refine `/app/learning-plans` & `/app/learning-plans/[planId]` (Adaptive 5-day schedules with daily micro-activities).
- [x] Refine `/app/teacher-actions` (Daily prioritized intervention checklist with notes and status transitions).
- [x] Implement `/app/reassessments` (Calendar/list schedule, overdue tracking, compare skill progress over time).

### Phase E: Reporting, Guardian Support, Notifications, Audit & Offline Sync
- [x] Implement `/app/reports` (Executive multi-role reporting dashboard).
- [x] Implement `/app/reports/classes` (Class-by-class coverage and foundational mastery).
- [x] Implement `/app/reports/skills` (Skill-gap distribution and prerequisite mapping).
- [x] Implement `/app/reports/assessments` (Diagnostic attempt and completion metrics).
- [x] Implement `/district/overview` (Collectorate and DEO executive digest for Devbhumi Dwarka).
- [x] Implement `/app/guardians` (Guardian engagement directory and communication preferences).
- [x] Implement `/guardian/progress/[studentId]` (Supportive guardian portal with Gujarati voice activities).
- [x] Implement `/app/audit-history` (Append-only audit trail with actor, action type, entity, timestamp filters).
- [x] Refine In-App Notifications Center and Offline Sync Drawer.

### Phase F: Verification & Quality Assurance
- [x] Full TypeScript type-checking (`npx tsc --noEmit`).
- [x] Full Next.js production build (`npm run build`).
- [x] Viewport responsiveness verification across 1366×768, 1440×900, 1920×1080, tablet, and mobile.
- [x] End-to-end demo journey verification (Login -> Teacher Dashboard -> Student -> Assessment -> Diagnostic -> Learning Plan Approval -> Activity Completion -> Progress Update).
