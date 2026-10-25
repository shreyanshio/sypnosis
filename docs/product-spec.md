# Saksham FLN — Product Specification

**Problem ID**: PS000034  
**Project**: Saksham FLN — AI-Assisted Diagnostic and Adaptive Remedial Learning System  
**Proposed Stakeholder**: Collector Office, Devbhumi Dwarka  
**Sector**: Education Technology (Foundational Literacy and Numeracy)  
**Target Beneficiaries**: Standards 1–8 Students, Teachers, Head Teachers, CRC/BRC Coordinators, District Education Officers, Parents/Guardians  

---

## 1. Product Mission & Philosophy

Saksham FLN is a foundational literacy and numeracy (FLN) platform engineered for Indian government and aided primary schools. Designed with a calm, dignified, and practical aesthetic, it equips teachers and educational administrators to uncover prerequisite learning barriers early, personalize remedial classroom practice, monitor progress, and engage parents—all without stigmatizing learners or producing punitive league tables.

### Key Tenets
1. **Explainable Prerequisite Diagnostics**: Never summarize a learner by a single raw score. The platform pinpoints the underlying conceptual obstacle (e.g., confusing positional decade boundaries vs single units) and recommends micro-interventions.
2. **Pedagogical Distinctions**: The system explicitly differentiates between a **probable screening signal** (from a brief 5-question check) and a **teacher-validated diagnosis** confirmed through physical small-group observation.
3. **Inclusive, Non-Stigmatizing Terminology**: Progress is categorized into formative tiers: *Demonstrated Mastery*, *Developing / Active Practice*, and *Needs Support*. Public ranking, competitive leaderboards, and permanent labels are strictly excluded.
4. **Offline-First Resilience**: Designed for rural and peri-urban schools in Devbhumi Dwarka with intermittent connectivity. Assessment attempts and activity progress save reliably to local device storage and synchronize when connectivity is restored.
5. **Trilingual Immersion**: Native support for Gujarati (`gu`), Hindi (`hi`), and English (`en`), with dynamic font rendering (`Noto Sans Gujarati`, `Noto Sans Devanagari`, `Inter`) across all interface elements.

---

## 2. User Roles & Permission Matrix

| Role | Primary Scope | Permitted Actions |
| :--- | :--- | :--- |
| **Classroom Teacher** | Assigned Class (e.g. Std 3A) | Conduct diagnostic assessments, review explainable results, approve 5-day adaptive remedial pathways, record classroom activity completion, maintain formative observation diary, track daily actions. |
| **Head Teacher (Principal)** | School-Wide (Standards 1–8) | Monitor school-wide FLN coverage, manage school classes and academic years, review staff assignments, review remedial completion rates, export school compliance digests. |
| **CRC / BRC Coordinator** | Cluster (10–15 Schools) | Monitor cluster-wide screening coverage, allocate cluster academic support resources, identify clusters needing tactile manipulative kits, export cluster reports. |
| **District Education Officer (DEO)** | District (Devbhumi Dwarka) | Executive district-wide FLN coverage digest for Collectorate meetings, taluka-by-taluka progress indicators, policy alignment reviews. |
| **Parent / Guardian** | Linked Student (e.g. Aarav K.) | View encouraging strengths and progress updates, access daily 5-minute home learning games with Gujarati audio prompts, send feedback to teachers. |

---

## 3. Core Functional Domains

### 3.1 School Administration
- **School Profile** (`/app/admin/school`): U-DISE school code, block, cluster, mediums of instruction, head teacher details.
- **Academic Years** (`/app/admin/academic-years`): Manage multi-year academic cycles with active year designation and duplicate protection.
- **Staff Directory** (`/app/admin/users`): Teacher assignments, role configurations, and access statuses.
- **Classroom Setup** (`/app/admin/classes`): Standard 1–8 class and section provisioning.

### 3.2 Class-Wise Management
- **Directory** (`/app/classes`): Comprehensive view of all enrolled classes across standards with medium and teacher filters.
- **Class Workspace** (`/app/classes/[classId]`):
  - *Overview*: Class FLN literacy/numeracy baseline, coverage percentages.
  - *Students*: Searchable roster with roll numbers and learning support status.
  - *Assessments*: Class-specific diagnostic assessments.
  - *Learning Plans*: Class-wide active remedial pathways.
  - *Teacher Actions*: Class-filtered pending pedagogical tasks.
  - *Reports*: Class-level growth and CSV download.

### 3.3 Student Management
- **School Roster** (`/app/students`): School-wide directory with standard, section, status, and search filters.
- **Student Profile** (`/app/students/[studentId]`):
  - Identity, guardian contact details, attendance indicators.
  - Skill progress breakdown (demonstrated vs needs support).
  - Assessment history and diagnostic score breakdown.
  - Active 5-day remedial learning plan with day-by-day status tracking.
  - Formative teacher observation log and diary.

### 3.4 Diagnostic Assessment & Question Bank
- **Question Bank** (`/app/question-bank`, `/app/question-bank/[questionId]`):
  - Competency-tagged items covering Gujarati reading (matra, decoding, comprehension) and numeracy (number sense, bundling, decomposition, regrouping).
  - Prerequisite skill tags, difficulty levels, curriculum references, and publication review statuses.
- **Assessment Management** (`/app/assessments`, `/app/assessments/new`):
  - Draft, Scheduled, In Progress, Requires Review, and Completed status pipeline.
- **Child-Friendly Runner** (`/app/assessments/[assessmentId]`):
  - 1-question-per-screen layout with large touch targets.
  - Audio read-aloud via Web Speech API in Gujarati.
  - Deterministic explainable scoring engine calculating skill-level percentages, generating evidence trails, and recommending targeted activities.

### 3.5 Adaptive Remedial Pathways & Learning Resources
- **Resource Library** (`/app/resources`, `/app/resources/[resourceId]`):
  - Tangible flashcards, phonics exercises, decade number lines, and printable worksheets.
- **Content Management** (`/app/content-management`):
  - Content workflow from draft to teacher review to curriculum verification.
- **Adaptive Pathways** (`/app/pathways`, `/app/learning-plans`, `/app/learning-plans/[planId]`):
  - 5-day structured classroom micro-plans (10–15 mins/day).
  - Weekly schedule (Monday–Saturday) with teacher sign-off and milestone recording.
- **Reassessment Scheduler** (`/app/reassessments`):
  - Scheduled follow-up checks to verify prerequisite remediation before advancing curriculum.

### 3.6 Teacher Action Workspace
- **Action Workspace** (`/app/actions`, `/app/teacher-actions`):
  - Priority-tiered intervention tasks (High, Medium, Low) with due dates, related student links, and teacher note fields.

### 3.7 Governance, Reporting & Audit
- **Role-Aware Reports** (`/app/reports`, `/app/reports/classes`, `/app/reports/skills`, `/app/reports/assessments`):
  - Tailored views for Teachers, Head Teachers, CRC Coordinators, and DEO.
  - Real CSV exports for all reporting tables.
- **District Overview** (`/district/overview`):
  - Executive digest for Collector Office, Devbhumi Dwarka, covering 4 talukas (Khambhalia, Dwarka, Kalyanpur, Bhanvad).
- **Audit History** (`/app/audit-history`):
  - Append-only log of significant events (assessment completion, plan approval, class reassignment).

### 3.8 Guardian Support Portal
- **Guardian Portal** (`/app/parent`, `/guardian/progress/[studentId]`):
  - Encouraging, non-technical progress summaries.
  - Daily 5-minute home learning activity with Gujarati voice read-aloud using kitchen spoons and household counters.
  - Direct connection to class teachers.

---

## 4. Local Data Architecture & Future Integration Points

The application operates on an autonomous client-side data layer (`lib/storage/index.ts`) providing:
1. **Schema Versioning**: Version tracking with migration routines.
2. **Idempotent Hydration**: Seeds initial realistic data once without overwriting user interactions.
3. **Typed Service Layer**: All pages consume abstracted service methods (`studentService`, `classService`, `assessmentService`, etc.).
4. **Future Backend Contracts**: Ready to plug into REST or GraphQL backends with zero UI refactoring required.
