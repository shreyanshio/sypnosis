'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authService } from '@/lib/services/authService'
import { useI18n } from '@/lib/i18n/context'
import { Role } from '@/lib/types'
import { LanguageSelector } from '@/components/language-selector'

const roleOptions: Array<{ id: Role; labelKey: string; defaultLabel: string; email: string }> = [
  { id: 'teacher', labelKey: 'teacher', defaultLabel: 'Classroom Teacher (Class 3A)', email: 'asha.shah@primary-school.demo' },
  { id: 'head_teacher', labelKey: 'head_teacher', defaultLabel: 'Head Teacher (School Principal)', email: 'headmaster@primary-school.demo' },
  { id: 'crc_coordinator', labelKey: 'crc_coordinator', defaultLabel: 'CRC Cluster Coordinator', email: 'crc.coordinator@district-fln.demo' },
  { id: 'deo', labelKey: 'deo', defaultLabel: 'District Education Officer (DEO)', email: 'deo.dwarka@education.demo' },
  { id: 'parent', labelKey: 'parent', defaultLabel: 'Parent / Guardian (Aarav K.)', email: 'parent.aarav@guardian.demo' },
]

export default function LoginPage() {
  const router = useRouter()
  const { t } = useI18n()

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
      setError(t.login.schoolCodeOrEmail)
      return
    }
    if (!password.trim()) {
      setError(t.login.password)
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
    <main className="grid min-h-screen bg-[#F7F9F6] lg:grid-cols-[1.05fr_0.95fr]">
      {/* Left branding pillar */}
      <section className="relative hidden overflow-hidden bg-[#17324D] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#0D9488] font-bold text-white text-base">
            SF
          </div>
          <div>
            <span className="text-lg font-bold text-white">{t.appName}</span>
            <span className="block text-[11px] font-medium tracking-wide text-[#8ACFC4]">
              {t.districtName}
            </span>
          </div>
        </div>

        <div className="max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#8ACFC4]">
            Problem ID: PS000034 · {t.landing.heroBadge}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white xl:text-4xl">
            {t.tagline}
          </h1>

          <p className="text-sm leading-relaxed text-white/70">
            {t.landing.heroDescription}
          </p>

          <div className="mt-8 space-y-3.5 pt-2">
            {[
              [t.landing.features.prereqTitle, t.landing.features.prereqDesc],
              [t.landing.features.pathwaysTitle, t.landing.features.pathwaysDesc],
              [t.landing.features.offlineTitle, t.landing.features.offlineDesc],
            ].map(([title, desc], idx) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#0D9488] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{title}</p>
                  <p className="text-[11px] text-white/60 leading-normal">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4">
          <span>{t.schoolName} · {t.districtName}</span>
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
              <ArrowLeft size={14} /> {t.common.previous}
            </Link>

            {/* Language Selector */}
            <LanguageSelector variant="pill" />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#17324D]">{t.login.heading}</h2>
            <p className="mt-1 text-xs text-[#64748B]">
              {t.login.subheading}
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="role">
                {t.login.signInAs}
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-medium text-[#17324D] focus:border-[#0D9488] focus:outline-none"
              >
                {roleOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.defaultLabel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="email">
                {t.login.schoolCodeOrEmail}
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-3 text-[#94A3B8]" size={15} />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  className={`h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-xs text-[#17324D] focus:border-[#0D9488] focus:outline-none ${
                    error ? 'border-[#B42318]' : 'border-[#CBD5E1]'
                  }`}
                  placeholder="name@school.demo"
                />
              </div>
              {error && <p className="mt-1 text-[11px] text-[#B42318]">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17324D]" htmlFor="password">
                {t.login.password}
              </label>
              <div className="relative mt-1.5">
                <LockKeyhole className="absolute left-3 top-3 text-[#94A3B8]" size={15} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#CBD5E1] bg-white pl-9 pr-10 text-xs text-[#17324D] focus:border-[#0D9488] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.login.hidePassword : t.login.showPassword}
                  className="absolute right-2.5 top-2.5 p-1 text-[#94A3B8] hover:text-[#17324D]"
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
                <span>{t.login.rememberDevice}</span>
              </label>

              <button
                type="button"
                onClick={() => setModalType('forgot')}
                className="font-semibold text-[#0D9488] hover:underline"
              >
                {t.login.forgotPassword}
              </button>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full rounded-lg bg-[#0D9488] text-xs font-semibold text-white shadow-xs hover:bg-[#087F75]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="mr-1.5 animate-spin" /> {t.common.loading}
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} className="mr-1.5" /> {t.login.signInButton}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleDirectDemo}
                className="h-10 w-full rounded-lg border-[#CBD5E1] text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
              >
                {t.login.exploreDemoButton}
              </Button>
            </div>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setModalType('support')}
              className="text-xs text-[#64748B] hover:text-[#0D9488] hover:underline"
            >
              {t.login.helpdeskSupport}
            </button>
          </div>

          <div className="border-t border-[#E2E8E5] pt-3 text-center">
            <p className="text-[11px] text-[#94A3B8]">
              {t.login.demoDisclaimer}
            </p>
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
                className="h-8 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
              >
                {t.common.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
