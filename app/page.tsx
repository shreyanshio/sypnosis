'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CloudOff,
  GraduationCap,
  Languages,
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

const steps = [
  { number: '01', title: 'Assess', text: 'A short, child-friendly check makes foundational learning needs visible.', icon: Target },
  { number: '02', title: 'Understand', text: 'See the prerequisite skills behind each learning gap without stigma.', icon: Sparkles },
  { number: '03', title: 'Practice', text: 'Get focused classroom activities that fit the learner’s next developmental step.', icon: BookOpen },
  { number: '04', title: 'Track progress', text: 'Help teachers notice progress and celebrate incremental milestones.', icon: TrendingUp },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale, setLocale } = useI18n()

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#263238]">
      <div className="border-b border-[#dce8e4] bg-[#17324d] px-5 py-2.5 text-center text-xs font-medium tracking-wide text-white/90">
        Illustrative demo prototype · Synthetic sample data only · Designed for foundational literacy & numeracy
      </div>

      <header className="sticky top-0 z-20 border-b border-[#e2e8e5] bg-[#f7f9f6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Saksham FLN home">
            <BrandMark />
            <div>
              <div className="text-lg font-bold leading-none text-[#17324d]">Saksham FLN</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                Learning pathways
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#526273] md:flex">
            <a href="#features" className="transition hover:text-[#0d9488]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#0d9488]">
              How it works
            </a>
            <a href="#teachers" className="transition hover:text-[#0d9488]">
              For teachers
            </a>
            <button
              onClick={() => setLocale(locale === 'gu' ? 'en' : 'gu')}
              className="flex items-center gap-1.5 rounded-lg border border-[#d8e2df] bg-white px-2.5 py-1 text-xs font-semibold text-[#17324d] hover:border-[#0d9488] hover:text-[#0d9488]"
              title="Toggle application language"
            >
              <Languages size={15} />
              <span>{locale === 'gu' ? 'ગુજરાતી' : 'English'}</span>
              <ChevronDown size={12} className="opacity-60" />
            </button>
          </nav>

          <div className="hidden md:block">
            <Button asChild className="h-11 rounded-xl bg-[#0d9488] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#087f75]">
              <Link href="/login">
                Open workspace <ArrowRight size={16} className="ml-1" />
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
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                How it works
              </a>
              <a
                href="#teachers"
                onClick={() => setMenuOpen(false)}
                className="py-1 font-medium text-[#526273] hover:text-[#0d9488]"
              >
                For teachers
              </a>
              <div className="flex items-center justify-between border-t border-[#e2e8e5] pt-3">
                <span className="text-xs text-[#64748b]">Language:</span>
                <button
                  onClick={() => setLocale(locale === 'gu' ? 'en' : 'gu')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#0d9488]"
                >
                  <Languages size={14} /> {locale === 'gu' ? 'ગુજરાતી' : 'English'}
                </button>
              </div>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl bg-[#0d9488] font-semibold text-white"
              >
                Open workspace <ArrowRight className="ml-1 inline" size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#bfe2da] bg-[#dff4ef] px-3.5 py-1.5 text-xs font-semibold text-[#087f75]">
            <span className="size-2 rounded-full bg-[#0d9488]" /> Foundational literacy and numeracy
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#17324d] sm:text-5xl lg:text-6xl">
            Find the learning gap. <span className="text-[#0d9488]">Build the next step.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#64748b]">
            Saksham FLN helps schools understand individual learning needs, personalize remedial practice, and give every child a clear pathway forward without ranking or stigma.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-xl bg-[#0d9488] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#087f75]">
              <Link href="/login">
                Explore the platform <ArrowRight size={18} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-[#b9cbc7] px-6 text-base font-medium text-[#17324d] hover:bg-[#edf4f2]"
              asChild
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#64748b]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> Teacher-guided
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> Offline-aware
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-[#15803d]" size={17} /> Inclusive by design
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-[#dff4ef] opacity-70" />
          <div className="relative overflow-hidden rounded-3xl border border-[#d8e7e2] bg-white p-6 shadow-[0_24px_70px_rgba(23,50,77,.12)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#e8efed] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">Learning overview</p>
                <p className="mt-1 text-xl font-semibold text-[#17324d]">Class 3 · Asha Primary</p>
              </div>
              <span className="rounded-full bg-[#fff5d9] px-3 py-1 text-xs font-semibold text-[#8a6200]">
                Synthetic Demo
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label="Students assessed" value="24" note="of 28 learners" tone="teal" />
              <MiniStat label="Active pathways" value="17" note="prerequisite plans" tone="navy" />
            </div>
            <div className="mt-5 rounded-2xl bg-[#f7f9f6] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#17324d]">Class milestone completion</span>
                <span className="text-xs text-[#64748b]">Last 6 weeks</span>
              </div>
              <div className="mt-5 flex h-32 items-end gap-3 px-2">
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
                <p className="text-sm font-semibold text-[#17324d]">Next teacher action</p>
                <p className="text-xs text-[#64748b] truncate">Revisit place value with Aarav & Group B</p>
              </div>
              <ArrowRight className="shrink-0 text-[#0d9488]" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#e2e8e5] bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d9488]">A practical cycle</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17324d] sm:text-4xl">
              From a small signal to a useful next step.
            </h2>
            <p className="mt-4 leading-7 text-[#64748b]">
              Short diagnostic checks do not define a child. They help teachers uncover prerequisite gaps and decide what to notice, practise, and reinforce next.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {steps.map(({ number, title, text, icon: Icon }) => (
              <div key={title} className="relative rounded-2xl border border-[#e2e8e5] bg-[#f7f9f6] p-6">
                <span className="text-xs font-bold text-[#0d9488]">{number}</span>
                <div className="mt-6 flex size-11 items-center justify-center rounded-xl bg-[#17324d] text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#17324d]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d9488]">Built for the classroom</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17324d] sm:text-4xl">
            Less paperwork. More time for teaching.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-[#64748b]">
            A calm workspace for teachers, school heads, and education coordinators to address learning needs without ranking children or replacing teacher judgement.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Feature
              icon={Target}
              title="Prerequisite diagnosis"
              text="Look beyond a raw score to the prerequisite skill that may need concrete attention."
            />
            <Feature
              icon={BookOpen}
              title="Targeted pathways"
              text="Generate 10-15 minute remedial activities designed for regular classroom routines."
            />
            <Feature
              icon={CloudOff}
              title="Offline-aware design"
              text="Keep downloaded assessment materials and recorded progress visible when offline."
            />
            <Feature
              icon={ShieldCheck}
              title="Privacy by design"
              text="Use synthetic demo records and pseudonymous patterns with no external data leakage."
            />
          </div>
        </div>

        <div id="teachers" className="rounded-3xl bg-[#17324d] p-8 text-white lg:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0d9488]">
            <GraduationCap size={24} />
          </div>
          <h3 className="mt-8 text-2xl font-semibold">A shared view of foundational progress</h3>
          <p className="mt-4 leading-7 text-white/70">
            Teachers identify the next supportive action for each learner. School leaders view aggregate coverage and growth — not punitive league tables.
          </p>
          <div className="mt-8 flex flex-col gap-3.5">
            {[
              'Review a student’s foundational learning profile',
              'Run a 3-minute diagnostic assessment check',
              'Approve a tailored 5-day remedial pathway',
              'Track completed classroom practice activities',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                <CheckCircle2 className="shrink-0 text-[#8acfc4]" size={18} /> {item}
              </div>
            ))}
          </div>
          <Button asChild className="mt-9 h-12 rounded-xl bg-white px-5 text-sm font-semibold text-[#17324d] shadow-sm hover:bg-[#dff4ef]">
            <Link href="/login">
              Open the demo workspace <ArrowRight size={16} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-[#e2e8e5] bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#64748b] sm:flex-row">
          <span>© 2026 Saksham FLN · Illustrative prototype · Synthetic demonstration</span>
          <span>Designed for inclusive foundational learning.</span>
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
      <p className={`mt-2 text-3xl font-semibold ${tone === 'teal' ? 'text-[#0d9488]' : 'text-[#17324d]'}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[#94a3b8]">{note}</p>
    </div>
  )
}

function Feature({ icon: Icon, title, text }: { icon: typeof Target; title: string; text: string }) {
  return (
    <div className="flex gap-3.5">
      <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#dff4ef] text-[#0d9488]">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="font-semibold text-[#17324d]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#64748b]">{text}</p>
      </div>
    </div>
  )
}
