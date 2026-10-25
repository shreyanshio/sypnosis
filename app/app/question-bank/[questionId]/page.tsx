'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { questionBankService } from '@/lib/services/questionBankService'
import { Question } from '@/lib/types'
import { Button } from '@/components/ui/button'

export default function QuestionDetailPage({
  params,
}: {
  params: Promise<{ questionId: string }>
}) {
  const { questionId } = use(params)
  const question = questionBankService.getQuestionById(questionId)

  const [q, setQ] = useState<Question | undefined>(question)
  const [explanation, setExplanation] = useState(question?.explanation || '')
  const [reviewStatus, setReviewStatus] = useState<Question['reviewStatus']>(
    question?.reviewStatus || 'Published'
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  if (!q) {
    return (
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
        <HelpCircle size={32} className="mx-auto text-[#CBD5E1]" />
        <h2 className="mt-3 text-base font-bold text-[#17324D]">Question not found</h2>
        <p className="mt-1 text-xs text-[#64748B]">No item with ID &ldquo;{questionId}&rdquo; exists in the question bank.</p>
        <Link
          href="/app/question-bank"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0D9488] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#087F75]"
        >
          <ArrowLeft size={13} /> Back to Question Bank
        </Link>
      </div>
    )
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!q) return
    const updated: Question = {
      ...q,
      explanation,
      reviewStatus,
    }
    questionBankService.saveQuestion(updated)
    setQ(updated)
    showToast('Question details and curriculum status updated.')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Link href="/app/question-bank" className="hover:text-[#0D9488] hover:underline">
          Question Bank
        </Link>
        <ChevronRight size={13} className="text-[#94A3B8]" />
        <span className="font-semibold text-[#17324D]">{q.skillName}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-bold text-[#17324D]">
              {q.gradeRange}
            </span>
            <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-semibold text-[#087F75]">
              {q.difficulty}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                q.reviewStatus === 'Published'
                  ? 'bg-[#DFF4EF] text-[#087F75]'
                  : 'bg-[#FFF5D9] text-[#8A6200]'
              }`}
            >
              {q.reviewStatus}
            </span>
          </div>
          <h1 className="mt-2 text-lg font-bold text-[#17324D] leading-snug">{q.promptGu}</h1>
          <p className="mt-0.5 text-xs text-[#64748B]">{q.promptEn}</p>
        </div>

        <Link
          href="/app/question-bank"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
        >
          <ArrowLeft size={13} /> Back
        </Link>
      </div>

      {/* Form and Options Breakdown */}
      <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs">
        <h2 className="text-sm font-bold text-[#17324D]">Answer Choices & Misconception Diagnostics</h2>

        <div className="space-y-2.5">
          {q.options.map((opt) => (
            <div
              key={opt.id}
              className={`rounded-lg border p-3 text-xs ${
                opt.isCorrect
                  ? 'border-[#0D9488]/40 bg-[#DFF4EF]/25'
                  : 'border-[#E2E8F0] bg-[#F7F9F6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#17324D]">{opt.labelGu}</div>
                {opt.isCorrect ? (
                  <span className="inline-flex items-center gap-1 rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-bold text-[#087F75]">
                    <CheckCircle2 size={12} /> Correct Answer
                  </span>
                ) : (
                  <span className="text-[10px] text-[#64748B]">Distractor</span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-[#64748B]">{opt.labelEn}</p>
              {opt.misconceptionDiagnosis && (
                <p className="mt-1.5 text-[10px] text-[#B7791F]">
                  <strong>Diagnostic Signal: </strong>
                  {opt.misconceptionDiagnosis}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-[#F1F5F3] pt-4">
          <label className="block text-xs font-bold text-[#17324D]">Pedagogical Explanation</label>
          <textarea
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-[#F1F5F3] pt-3">
          <div>
            <label className="block text-xs font-bold text-[#17324D]">Curriculum Review Status</label>
            <select
              value={reviewStatus}
              onChange={(e) => setReviewStatus(e.target.value as Question['reviewStatus'])}
              className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
            >
              <option value="Published">Published (Live in Assessment)</option>
              <option value="Under Review">Under Review (Curriculum Team)</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-[#F1F5F3]">
          <Button
            type="submit"
            className="h-8.5 rounded-lg bg-[#0D9488] px-4 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Save size={13} className="mr-1.5" /> Save Item Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
