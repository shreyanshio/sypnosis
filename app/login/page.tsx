'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authService } from '@/lib/services/authService'
import { useI18n } from '@/lib/i18n/context'
import { Role } from '@/lib/types'

const roleOptions: Array<{ id: Role; label: string; email: string }> = [
  { id: 'teacher', label: 'Classroom Teacher (Class 3A)', email: 'asha.shah@primary-school.demo' },
  { id: 'head_teacher', label: 'Head Teacher (School Principal)', email: 'headmaster@primary-school.demo' },
  { id: 'crc_coordinator', label: 'CRC Cluster Coordinator', email: 'crc.coordinator@district-fln.demo' },
  { id: 'deo', label: 'District Education Officer (DEO)', email: 'deo.dwarka@education.demo' },
  { id: 'parent', label: 'Parent / Guardian (Aarav K.)', email: 'parent.aarav@guardian.demo' },
]

export default function LoginPage() {
  const router = useRouter()
  const { t, locale, setLocale } = useI18n()

  const [selectedRole, setSelectedRole] = useState<Role>('teacher')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('asha.shah@primary-school.demo')
  const [password, setPassword] = useState('demo-access')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalType, setModalType] = useState<'forgot' | 'support' | null>(null)

  function handleRoleChange(newRole: Role) {
    setSelectedRole(newRole)
    const opt = roleOptions.find((r) => r.id === newRole)
    if (opt) setEmail(opt.email)
    setError('')
  }

  function handleSignIn(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!email.trim()) {
      setError('Enter your registered email, school code, or mobile number.')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    setIsSubmitting(true)
    authService.setRole(selectedRole)

    setTimeout(() => {
      if (selectedRole === 'parent') {
        router.push('/app/parent')
      } else if (selectedRole === 'crc_coordinator' || selectedRole === 'deo') {
        router.push('/app/reports')
      } else {
        router.push('/app/dashboard')
      }
    }, 400)
  }

  function handleDirectDemo() {
    setIsSubmitting(true)
    authService.setRole(selectedRole)
    setTimeout(() => {
      if (selectedRole === 'parent') {
        router.push('/app/parent')
      } else if (selectedRole === 'crc_coordinator' || selectedRole === 'deo') {
        router.push('/app/reports')
      } else {
        router.push('/app/dashboard')
      }
    }, 350)
  }

  return (
    <main className="grid min-h-screen bg-[#F7F9F6] lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left branding pillar */}
      <section className="relative hidden overflow-hidden bg-[#17324D] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-[#0D9488] font-bold text-white text-base">
            SF
          </div>
          <div>
            <span className="text-base font-bold text-white">Saksham FLN</span>
            <span className="block text-[10px] uppercase tracking-wider text-[#8ACFC4]">
              Collectorate, Devbhumi Dwarka
            </span>
          </div>
        </div>

        <div className="max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#8ACFC4]">
            Problem ID: PS000034 · Foundational Literacy & Numeracy
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white xl:text-4xl">
            Every child deserves a clear pathway forward.
          </h1>

          <p className="text-sm leading-relaxed text-white/70">
            A practical, accessible foundational education platform designed for teachers and education administrators across Indian government and aided schools.
          </p>

          <div className="mt-8 space-y-3.5 pt-2">
            {[
              ['Prerequisite-level diagnostics', 'Notice the foundational barrier behind a gap without comparative ranking.'],
              ['Targeted 5-day remedial pathways', 'Turn screening insights into structured 10-15 minute tactile classroom activities.'],
              ['Offline-aware data continuity', 'Keep student practice and milestone tracking functioning without active internet.'],
            ].map(([title, desc], idx) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#0D9488] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{title}</p>
                  <p className="text-[11px] text-white/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4">
          <span>Asha Primary School · Devbhumi Dwarka</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-[#8ACFC4]">
            Synthetic FLN Prototype
          </span>
        </div>
      </section>

      {/* Right sign-in workspace */}
      <section className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#17324D]"
            >
              <ArrowLeft size={14} /> Back
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-[#CBD5E1] bg-white p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`rounded px-2 py-0.5 transition ${
                  locale === 'en' ? 'bg-[#0D9488] font-bold text-white' : 'text-[#64748B]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale('gu')}
                className={`rounded px-2 py-0.5 transition ${
                  locale === 'gu' ? 'bg-[#0D9488] font-bold text-white' : 'text-[#64748B]'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => setLocale('hi')}
                className={`rounded px-2 py-0.5 transition ${
                  locale === 'hi' ? 'bg-[#0D9488] font-bold text-white' : 'text-[#64748B]'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#17324D]">Sign In</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Access your classroom workspace and diagnostic records.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="role">
                Role Perspective
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="mt-1 h-9 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#17324D] focus:border-[#0D9488] focus:outline-none"
              >
                {roleOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="email">
                School ID or Registered Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={15} />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  className={`h-9 w-full rounded-lg border bg-white pl-8 pr-3 text-xs text-[#17324D] focus:border-[#0D9488] focus:outline-none ${
                    error ? 'border-[#B42318]' : 'border-[#CBD5E1]'
                  }`}
                  placeholder="name@school.demo"
                />
              </div>
              {error && <p className="mt-1 text-[11px] text-[#B42318]">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="password">
                Password
              </label>
              <div className="relative mt-1">
                <LockKeyhole className="absolute left-2.5 top-2.5 text-[#94A3B8]" size={15} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-9 w-full rounded-lg border border-[#CBD5E1] bg-white pl-8 pr-9 text-xs text-[#17324D] focus:border-[#0D9488] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-2 text-[#94A3B8] hover:text-[#17324D]"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-[#64748B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-3.5 rounded accent-[#0D9488]"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={() => setModalType('forgot')}
                className="font-semibold text-[#0D9488] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-9 w-full rounded-lg bg-[#0D9488] text-xs font-semibold text-white shadow-xs hover:bg-[#087F75]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="mr-1.5 animate-spin" /> Entering Workspace…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} className="mr-1.5" /> Enter Workspace
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleDirectDemo}
                className="h-9 w-full rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
              >
                One-Click Quick Access
              </Button>
            </div>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setModalType('support')}
              className="text-xs text-[#64748B] hover:text-[#0D9488] hover:underline"
            >
              Need assistance? School Helpdesk
            </button>
          </div>
        </div>
      </section>

      {/* Help / Password Recovery Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3">
              <span className="font-bold text-[#17324D] text-sm">
                {modalType === 'forgot' ? 'Demo Password Access' : 'Teacher Helpdesk'}
              </span>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="text-[#64748B] hover:text-[#17324D]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-xs text-[#64748B] leading-relaxed">
              {modalType === 'forgot' ? (
                <p>
                  In this synthetic demonstration phase, any password or the default{' '}
                  <code className="rounded bg-[#F1F5F3] px-1 py-0.5 text-[#17324D]">demo-access</code>{' '}
                  can be used to enter the role-specific workspace. In production, password verification is done via SMS OTP on the registered mobile number.
                </p>
              ) : (
                <div className="space-y-2">
                  <p><strong>Devbhumi Dwarka FLN Support Line:</strong></p>
                  <p>• Phone: +91 2833 232000</p>
                  <p>• Support Hours: Mon–Sat, 8:00 AM – 5:00 PM</p>
                  <p>• Collectorate EdTech Coordinator: edtech.dwarka@gujarat.gov.in</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setModalType(null)}
                className="h-7.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
