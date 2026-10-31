# Saksham FLN — Technical Jury Video Presentation Guide

**Project**: Saksham FLN — AI-Assisted Diagnostic and Adaptive Remedial Learning System  
**Problem ID**: PS000034  
**Proposed Stakeholder**: Collector Office, Devbhumi Dwarka, Gujarat  
**Target Duration**: 3 minutes 30 seconds to 3 minutes 45 seconds (Strictly ≤ 4 minutes)  
**Presenter Perspective**: Senior EdTech Architect & Product Engineer  

---

## Technical Recording & Studio Checklist

| Category | Recommended Setting | Verification Check |
| :--- | :--- | :--- |
| **Display Resolution** | 1920 × 1080 (Full HD, 16:9 aspect ratio) | Ensure no desktop clutter; hide OS taskbar or auto-hide. |
| **Browser Zoom** | 100% standard scaling | Chrome / Edge / Firefox at default font DPI. |
| **Audio Setup** | Clear microphone, noise suppression enabled | Speak in a calm, confident, measured tone. |
| **Local Environment** | Run on `http://localhost:3000` via `pnpm run dev` or production build | Verify zero console errors in DevTools. |
| **Pre-Recording Reset** | Click **"Reset Presentation"** in header or call `localStore.resetWorkspace()` | Restores pristine baseline state with Aarav K. in Class 3A. |

---

## Timed Walkthrough & Narration Script

### 00:00 – 00:20 | Beat 1: Hook, Problem Statement & Stakeholder Context
- **Screen Action**: Start on the Landing Page (`/`). Scroll smoothly past the top banner down to the hero section.
- **Visual Focus**: Dignified header with "Problem ID: PS000034 · Collector Office, Devbhumi Dwarka".
- **Narration**:
  > *"Respected Jury members, in primary schools across Devbhumi Dwarka and rural India, teachers face a daily challenge: children who struggle with foundational math or reading are often given a punitive low score, but the teacher rarely has time to identify the exact prerequisite barrier behind that gap.  
  > This is **Saksham FLN** — an AI-assisted diagnostic screening and adaptive remedial learning platform engineered specifically for Indian government schools. It turns quick classroom observations into focused, 5-day tactile practice plans without ranking or stigma."*

---

### 00:20 – 00:45 | Beat 2: Language Switching & Teacher Sign-In
- **Screen Action**:
  1. In the header navigation, click the **Language Selector** and switch to **ગુજરાતી (Gujarati)**.
  2. Notice the instant re-render with zero layout shift or flickering.
  3. Switch to **हिन्दी (Hindi)**, then back to **English** (or keep Gujarati if presenting for Gujarat panel).
  4. Click **"Open Workspace"** to navigate to `/login`.
  5. In the Role Selector, show the available roles (Teacher, Head Teacher, CRC Coordinator, DEO, Parent). Select **"Classroom Teacher (Class 3A)"** and click **"One-Click Quick Access"**.
- **Narration**:
  > *"Notice how the interface instantly renders in authentic Gujarati and Hindi typography. Unlike typical web apps that depend on external Google CDNs, Saksham FLN bundles 24 verified WOFF2 font assets directly inside the application. Even if the school's internet goes down completely, Indic fonts render crisply without clipping matras or diacritics.  
  > Let us enter the workspace as Asha Shah, Class 3A teacher at Asha Primary School."*

---

### 00:45 – 01:15 | Beat 3: Teacher Dashboard & Class 3A Roster
- **Screen Action**:
  1. Land on `/app/dashboard`.
  2. Hover over the KPI stats (24 Assessed, 17 Active Support Plans, 14 Weekly Milestones).
  3. Point to the **Pedagogical Gap Breakdown** (showing skills like *Place Value 10s & 1s* and *Phonemic Blending*).
  4. Click on **"Classes"** in the sidebar, open **"Class 3A"**, and view the student list.
- **Narration**:
  > *"The teacher dashboard replaces punitive rankings with clear pedagogical signals. We see that 24 of 28 children have completed their screening, with 17 receiving tailored support. Rather than labeling children as 'failing', the system highlights specific prerequisite concepts that require classroom reinforcement — like place value bundling.  
  > Opening Class 3A, the teacher sees each learner's progress. Let us inspect Aarav Kumar."*

---

### 01:15 – 01:55 | Beat 4: Student Dossier & 1-Question Assessment Runner
- **Screen Action**:
  1. Click on **Aarav Kumar** to open `/app/students/std-301`.
  2. Show his foundational profile: Numeracy indicates *Needs Support* in place value regrouping.
  3. Click **"Start Diagnostic Check"** to launch the child-friendly assessment runner.
  4. Show Question 1: Click the **Audio Prompt** button to illustrate text-to-speech accessibility for non-readers.
  5. Select an answer, click **"Next"**, complete Question 2 and 3, and click **"Submit & Diagnose"**.
- **Narration**:
  > *"Aarav's profile displays his historical milestones and active learning pathway. To update his diagnosis, the teacher launches a 3-minute check.  
  > Notice the child-friendly interface: one clear question per screen, high-contrast buttons, and an audio prompt for emergent readers. When Aarav answers, his responses are captured and evaluated locally against our skill prerequisite graph."*

---

### 01:55 – 02:30 | Beat 5: Prerequisite Gap Identification & 5-Day Remedial Pathway
- **Screen Action**:
  1. The Diagnostic Results modal appears.
  2. Point to the **Validated Prerequisite Diagnosis**: *Place Value: Grouping Tens & Ones (Prerequisite for Multi-digit Operations)*.
  3. Highlight the pedagogical explanation and the automatically generated **5-Day Micro-Activity Plan** (Day 1: Straw Bundling, Day 2: 10s Frame Grid, Day 3: Bead Stringing).
  4. Click **"Approve & Assign Learning Pathway"**.
- **Narration**:
  > *"Here is the core breakthrough: instead of reporting a meaningless 40% math score, the diagnostic engine isolates the root prerequisite gap. Aarav understands single-digit numerals, but struggles when numbers cross into tens.  
  > The system immediately maps this to a 5-day structured classroom pathway. These are not digital drill tests — they are 10-minute tactile activities using everyday school objects like matchsticks, counters, and pebble grids. The teacher clicks 'Approve', retaining full professional authority."*

---

### 02:30 – 02:55 | Beat 6: Remedial Activity Sign-Off & Instant Progress
- **Screen Action**:
  1. Navigate to **"Learning Pathways"** (`/app/pathways`).
  2. Locate Aarav's active pathway for *Place Value*.
  3. Check off **"Day 1: Concrete Bundling with 10 Sticks"** and click **"Mark Complete"**.
  4. Notice the instant toast notification and the student milestone count updating from 14 to 15.
- **Narration**:
  > *"In the classroom, once the teacher completes Day 1's hands-on bundling activity with Aarav, she marks it complete with a single tap. The system immediately logs the pedagogical intervention, updates the student's mastery trajectory, and adjusts the classroom summary."*

---

### 02:55 – 03:20 | Beat 7: Offline Continuity & Guardian Transparency
- **Screen Action**:
  1. In the top header or bottom status indicator, open the **Offline Drawer**.
  2. Click **"Simulate Offline Mode"**. Notice the yellow badge: *Offline (Queued mutations stored locally)*.
  3. Complete an action (e.g. approve a task). Show that it saves into the local sync queue.
  4. Click **"Reconnect"** and click **"Sync Now"** — all mutations reconcile seamlessly.
  5. Navigate to `/app/parent` to show the Guardian view in Gujarati/English.
- **Narration**:
  > *"Classroom connectivity is rarely permanent. With Saksham's offline engine, all screenings, activity updates, and teacher notes persist locally in secure browser storage. When internet access returns, records synchronize automatically without data loss.  
  > Furthermore, through the Guardian Portal, parents receive simple 5-minute home learning suggestions in Gujarati or Hindi that reinforce school activities without requiring digital literacy or homework pressure."*

---

### 03:20 – 03:45 | Beat 8: Administrative Governance & Conclusion
- **Screen Action**:
  1. Navigate to **"Reports"** (`/app/reports`).
  2. Toggle between **Head Teacher**, **CRC Cluster Coordinator**, and **District Education Officer (DEO)** perspectives.
  3. Show cluster-level FLN coverage rates across schools in Devbhumi Dwarka without toxic naming-and-shaming.
  4. Conclude on the clean dashboard.
- **Narration**:
  > *"For school heads and district officials in Devbhumi Dwarka, Saksham FLN aggregates cohort mastery and highlights schools needing supplementary teaching materials — completely avoiding punitive league tables.  
  > With 100% bundled local fonts, deterministic offline persistence, and child-centered remedial pedagogy, Saksham FLN proves that education technology can be practical, accessible, and truly inclusive. Thank you."*

---

## Evaluation Q&A Cheat Sheet for the Team

- **Q: How does the system work without internet in a remote village?**  
  *A: The entire application is architected with local asset bundling — all 24 WOFF2 fonts, local state services, and offline mutation queues operate directly in the client. Assessments and activity progress are stored in indexed client storage and sync automatically when network returns.*

- **Q: Does this replace the teacher's grading judgment?**  
  *A: No. Saksham FLN is strictly a diagnostic and planning aid. Every remedial pathway requires explicit teacher review and sign-off before being active. The teacher can customize, reassign, or dismiss any recommendation.*

- **Q: Why are Indic fonts bundled locally rather than using Google Fonts?**  
  *A: Google Fonts CDN requires active internet, creates third-party telemetry dependencies, and causes layout shifts (CLS). Bundling local WOFF2 files guarantees instant rendering, privacy compliance, and proper diacritic line-heights across Gujarati and Devanagari.*
