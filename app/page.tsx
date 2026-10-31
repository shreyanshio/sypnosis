'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSelector } from '@/components/language-selector'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useI18n()

  const steps = [
    { number: '01', title: t.landing.steps.assessTitle, text: t.landing.steps.assessDesc, icon: Target },
    { number: '02', title: t.landing.steps.understandTitle, text: t.landing.steps.understandDesc, icon: Sparkles },
    { number: '03', title: t.landing.steps.practiceTitle, text: t.landing.steps.practiceDesc, icon: BookOpen },
    { number: '04', title: t.landing.steps.trackTitle, text: t.landing.steps.trackDesc, icon: TrendingUp },
  ]

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#263238]">
      {/* Top prototype indicator */}
      <div className="border-b border-[#dce8e4] bg-[#17324d] px-5 py-2 text-center text-xs font-medium tracking-wide text-white/90">
        Problem ID: PS000034 · Collector Office, Devbhumi Dwarka · Synthetic FLN Demo
      </div>

      <header className="sticky top-0 z-20 border-b border-[#e2e8e5] bg-[#f7f9f6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Saksham FLN home">
            <BrandMark />
            <div>
              <div className="text-lg font-bold leading-none text-[#17324d]">{t.appName}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                {t.appSubtitle}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[#526273] md:flex">
            <a href="#how-it-works" className="transition hover:text-[#0d9488]">
              {t.landing.seeHowItWorks}
            </a>
            <a href="#features" className="transition hover:text-[#0d9488]">
              {t.landing.classroomBadge}
            </a>
            <a href="#teachers" className="transition hover:text-[#0d9488]">
              {t.nav.teacherActions}
            </a>
            <LanguageSelector variant="button" />
          </nav>

          <div className="hidden md:block">
            <Button asChild className="h-10 rounded-xl bg-[#0d9488] px-5 text-sm font-semibold text-white shadow-xs hover:bg-[#087f75]">
              <Link href="/login">
                {t.landing.openWorkspace} <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>

          <button
            className="flex size-10 items-center justify-center rounded-lg border border-[#d8e2df] text-[#17324d] md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e2e8e5] bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                {t.landing.seeHowItWorks}
              </a>
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                {t.landing.classroomBadge}
              </a>
              <a
                href="#teachers"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                {t.nav.teacherActions}
              </a>
              <div className="flex items-center justify-between border-t border-[#e2e8e5] pt-3">
                <span className="text-xs text-[#64748b]">Language:</span>
                <LanguageSelector variant="pill" />
              </div>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl bg-[#0d9488] font-semibold text-white"
              >
                {t.landing.openWorkspace} <ArrowRight className="ml-1 inline" size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#bfe2da] bg-[#dff4ef] px-3.5 py-1.5 text-xs font-semibold text-[#087f75]">
            <span className="size-2 rounded-full bg-[#0d9488]" /> {t.landing.heroBadge}
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-[#17324d] sm:text-5xl lg:text-6xl">
            {t.landing.heroTitle} <span className="text-[#0d9488]">{t.landing.heroHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#64748b] sm:text-lg sm:leading-8">
            {t.landing.heroDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-xl bg-[#0d9488] px-6 text-base font-semibold text-white shadow-xs hover:bg-[#087f75]">
              <Link href="/login">
                {t.landing.explorePlatform} <ArrowRight size={18} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-[#b9cbc7] px-6 text-base font-medium text-[#17324d] hover:bg-[#edf4f2]"
              asChild
            >
              <a href="#how-it-works">{t.landing.seeHowItWorks}</a>
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#64748b]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> {t.landing.teacherGuided}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> {t.landing.offlineAware}
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> {t.landing.inclusiveByDesign}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-[#dff4ef] opacity-70" />
          <div className="relative overflow-hidden rounded-3xl border border-[#d8e7e2] bg-white p-6 shadow-[0_20px_50px_rgba(23,50,77,.08)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#e8efed] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">{t.landing.learningOverview}</p>
                <p className="mt-1 text-xl font-semibold text-[#17324d]">{t.common.standard} 3A · {t.schoolName}</p>
              </div>
              <span className="rounded-full bg-[#fff5d9] px-3 py-1 text-xs font-semibold text-[#8a6200]">
                Synthetic Demo
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label={t.landing.studentsAssessed} value="24" note={t.landing.ofLearners} tone="teal" />
              <MiniStat label={t.landing.activePathways} value="17" note={t.landing.prerequisitePlans} tone="navy" />
            </div>
            <div className="mt-5 rounded-2xl bg-[#f7f9f6] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#17324d]">{t.landing.milestoneCompletion}</span>
                <span className="text-xs text-[#64748b]">{t.landing.last6Weeks}</span>
              </div>
              <div className="mt-5 flex h-28 items-end gap-3 px-2">
                {[35, 42, 48, 55, 62, 70].map((height, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-t-md bg-[#8acfc4]" style={{ height: `${height}%` }} />
                    <span className="text-[10px] text-[#94a3b8]">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/login"
              className="mt-5 flex items-center gap-3 rounded-2xl border border-[#d8e7e2] p-4 transition hover:border-[#0d9488] hover:bg-[#f7fbf9]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dff4ef] text-[#0d9488]">
                <GraduationCap size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#17324d]">{t.landing.nextTeacherAction}</p>
                <p className="text-xs text-[#64748b] truncate">{t.landing.sampleActionTitle}</p>
              </div>
              <ArrowRight className="shrink-0 text-[#0d9488]" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#e2e8e5] bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d9488]">{t.landing.practicalCycleBadge}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17324d] sm:text-4xl">
              {t.landing.practicalCycleHeading}
            </h2>
            <p className="mt-4 leading-7 text-[#64748b]">
              {t.landing.practicalCycleDesc}
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {steps.map(({ number, title, text, icon: Icon }) => (
              <div key={title} className="relative rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-6">
                <span className="text-xs font-bold text-[#0d9488]">{number}</span>
                <div className="mt-5 flex size-11 items-center justify-center rounded-xl bg-[#17324d] text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#17324d]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d9488]">{t.landing.classroomBadge}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17324d] sm:text-4xl">
            {t.landing.classroomHeading}
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-[#64748b]">
            {t.landing.classroomDesc}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Feature
              icon={Target}
              title={t.landing.features.prereqTitle}
              text={t.landing.features.prereqDesc}
            />
            <Feature
              icon={BookOpen}
              title={t.landing.features.pathwaysTitle}
              text={t.landing.features.pathwaysDesc}
            />
            <Feature
              icon={ShieldCheck}
              title={t.landing.features.offlineTitle}
              text={t.landing.features.offlineDesc}
            />
            <Feature
              icon={CheckCircle2}
              title={t.landing.features.privacyTitle}
              text={t.landing.features.privacyDesc}
            />
          </div>
        </div>

        <div id="teachers" className="rounded-3xl bg-[#17324d] p-8 text-white lg:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0d9488]">
            <GraduationCap size={24} />
          </div>
          <h3 className="mt-7 text-2xl font-semibold">{t.landing.sharedViewTitle}</h3>
          <p className="mt-3 leading-7 text-white/70">
            {t.landing.sharedViewDesc}
          </p>
          <div className="mt-7 flex flex-col gap-3">
            {t.landing.sharedViewBullets.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm">
                <CheckCircle2 className="shrink-0 text-[#8acfc4]" size={18} /> {item}
              </div>
            ))}
          </div>
          <Button asChild className="mt-8 h-11 rounded-xl bg-white px-5 text-sm font-semibold text-[#17324d] shadow-sm hover:bg-[#dff4ef]">
            <Link href="/login">
              {t.landing.openWorkspace} <ArrowRight size={16} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-[#e2e8e5] bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-[#64748b] sm:flex-row">
          <span>{t.landing.footerDisclaimer}</span>
          <span>{t.landing.footerMission}</span>
        </div>
      </footer>
    </main>
  )
}

function BrandMark() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-[#17324d] text-white">
      <svg viewBox="0 0 32 32" className="size-6" fill="none" aria-hidden="true">
        <path d="M5 9.5 16 14l11-4.5v13L16 27 5 22.5v-13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 14v13M9 11l7 3 7-3" stroke="#8acfc4" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 7c1.8-2 4.2-2.4 6-2.2-.2 2.1-1.2 4.2-3.2 5.1" stroke="#f4b544" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function MiniStat({ label, value, note, tone }: { label: string; value: string; note: string; tone: 'teal' | 'navy' }) {
  return (
    <div className="rounded-2xl border border-[#e2e8e5] p-4">
      <p className="text-xs text-[#64748b]">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold ${tone === 'teal' ? 'text-[#0d9488]' : 'text-[#17324d]'}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[#94a3b8]">{note}</p>
    </div>
  )
}

function Feature({ icon: Icon, title, text }: { icon: typeof Target; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#dff4ef] text-[#0d9488]">
        <Icon size={16} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#17324d]">{title}</h3>
        <p className="mt-0.5 text-xs leading-5 text-[#64748b]">{text}</p>
      </div>
    </div>
  )
}
