'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Eye,
  Filter,
  GraduationCap,
  HelpCircle,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
import { questionBankService } from '@/lib/services/questionBankService'
import { Question } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function QuestionBankPage() {
  const { t, locale } = useI18n()
  const [questions, setQuestions] = useState<Question[]>(() =>
    questionBankService.getQuestions()
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [isAdding, setIsAdding] = useState(false)

  // New question form state
  const [newPromptGu, setNewPromptGu] = useState('')
  const [newPromptEn, setNewPromptEn] = useState('')
  const [newSkillName, setNewSkillName] = useState('Gujarati Matra & Phonics')
  const [newDifficulty, setNewDifficulty] = useState<Question['difficulty']>('Foundation')
  const [newExplanation, setNewExplanation] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filtered = questions.filter((q) => {
    if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false
    if (statusFilter !== 'All' && q.reviewStatus !== statusFilter) return false
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase().trim()
      const matchPrompt = q.promptGu.toLowerCase().includes(term) || q.promptEn.toLowerCase().includes(term)
      const matchSkill = q.skillName.toLowerCase().includes(term)
      if (!matchPrompt && !matchSkill) return false
    }
    return true
  })

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newPromptGu.trim()) return

    const newQ: Question = {
      id: `q-${Date.now()}`,
      skillId: 'custom-skill',
      skillName: newSkillName,
      prerequisiteSkillIds: [],
      gradeRange: 'Class 2-3',
      locale: 'gu',
      difficulty: newDifficulty,
      type: 'multiple_choice',
      prompt: newPromptGu.trim(),
      promptGu: newPromptGu.trim(),
      promptEn: newPromptEn.trim() || newPromptGu.trim(),
      options: [
        { id: 'opt-a', labelGu: 'વિકલ્પ ૧', labelEn: 'Option 1 (Correct)', isCorrect: true },
        { id: 'opt-b', labelGu: 'વિકલ્પ ૨', labelEn: 'Option 2', isCorrect: false },
      ],
      correctAnswer: 'opt-a',
      explanation: newExplanation.trim() || 'Correct pedagogical explanation.',
      reviewStatus: 'Draft',
    }

    questionBankService.saveQuestion(newQ)
    setQuestions(questionBankService.getQuestions())
    setIsAdding(false)
    setNewPromptGu('')
    setNewPromptEn('')
    setNewExplanation('')
    showToast('Question created as Draft for curriculum review.')
  }

  function handleQuickPublish(q: Question) {
    const nextStatus = q.reviewStatus === 'Published' ? 'Draft' : 'Published'
    questionBankService.updateReviewStatus(q.id, nextStatus)
    setQuestions(questionBankService.getQuestions())
    showToast(`Question status updated to ${nextStatus}.`)
  }

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#BFE2DA] bg-[#DFF4EF] px-3.5 py-2 text-xs font-semibold text-[#087F75] shadow-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
            <HelpCircle size={15} />
            <span>FLN Item Bank</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Curriculum Question Bank
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Foundational literacy and numeracy diagnostic items mapped to GCERT learning outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAdding(true)}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" /> Create Question
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#64748B]">Total Items</span>
          <p className="mt-0.5 text-xl font-bold text-[#17324D]">{questions.length}</p>
          <p className="text-[10px] text-[#64748B]">Literacy & Numeracy</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#15803D]">Published</span>
          <p className="mt-0.5 text-xl font-bold text-[#15803D]">
            {questions.filter((q) => q.reviewStatus === 'Published').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Available for assessments</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#B7791F]">Under Review</span>
          <p className="mt-0.5 text-xl font-bold text-[#B7791F]">
            {questions.filter((q) => q.reviewStatus === 'Under Review' || q.reviewStatus === 'Draft').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Curriculum review</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#0D9488]">Foundation Tier</span>
          <p className="mt-0.5 text-xl font-bold text-[#0D9488]">
            {questions.filter((q) => q.difficulty === 'Foundation').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Core prerequisite check</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by prompt, skill domain, or keywords..."
            className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white pl-9 pr-3 text-xs text-[#263238] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label="Filter by difficulty"
            className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="All">All Tiers</option>
            <option value="Foundation">Foundation Tier</option>
            <option value="Standard">Standard Tier</option>
            <option value="Grade Level">Grade Level</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by review status"
            className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Question Items Grid */}
      <div className="space-y-3.5">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs transition hover:border-[#0D9488]/50"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#F1F5F3] px-2 py-0.5 text-[10px] font-bold text-[#17324D]">
                    {q.gradeRange}
                  </span>
                  <span className="rounded bg-[#DFF4EF] px-2 py-0.5 text-[10px] font-semibold text-[#087F75]">
                    {q.skillName}
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

                <h2 className="mt-2 text-sm font-bold text-[#17324D] leading-snug">
                  {q.promptGu}
                </h2>
                <p className="text-xs text-[#64748B]">{q.promptEn}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  onClick={() => handleQuickPublish(q)}
                  className="h-7 rounded-md border-[#CBD5E1] px-2.5 text-[11px] font-semibold text-[#17324D] hover:bg-[#F1F5F3]"
                >
                  {q.reviewStatus === 'Published' ? 'Unpublish' : 'Publish'}
                </Button>
                <Link
                  href={`/app/question-bank/${q.id}`}
                  className="inline-flex h-7 items-center rounded-md bg-[#0D9488] px-2.5 text-[11px] font-semibold text-white hover:bg-[#087F75]"
                >
                  <Eye size={12} className="mr-1" /> View Item
                </Link>
              </div>
            </div>

            {/* Answer Options Preview */}
            <div className="mt-3 grid gap-2 sm:grid-cols-2 pt-2 border-t border-[#F1F5F3]">
              {q.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`rounded-lg border p-2 text-xs flex items-center justify-between ${
                    opt.isCorrect
                      ? 'border-[#0D9488]/40 bg-[#DFF4EF]/30 text-[#087F75] font-semibold'
                      : 'border-[#E2E8F0] bg-[#F7F9F6] text-[#263238]'
                  }`}
                >
                  <span className="truncate">{opt.labelGu}</span>
                  {opt.isCorrect && <CheckCircle2 size={13} className="text-[#087F75] shrink-0" />}
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="mt-2.5 rounded-lg bg-[#F7F9F6] p-2 text-xs text-[#64748B]">
                <strong className="text-[#17324D]">Explanation: </strong>
                {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg">
            <h2 className="text-base font-bold text-[#17324D]">Create Diagnostic Item</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Add a foundational check item with bilingual prompts and explanations.
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#17324D]">Prompt in Gujarati (પ્રશ્ન)</label>
                <input
                  type="text"
                  value={newPromptGu}
                  onChange={(e) => setNewPromptGu(e.target.value)}
                  placeholder="e.g. આ ચિત્રમાં કઈ માત્રા આવે છે?"
                  required
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Prompt in English</label>
                <input
                  type="text"
                  value={newPromptEn}
                  onChange={(e) => setNewPromptEn(e.target.value)}
                  placeholder="e.g. Which vowel matra is used in this word?"
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Skill Category</label>
                  <select
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    <option value="Gujarati Matra & Phonics">Gujarati Matra & Phonics</option>
                    <option value="Gujarati Sentence Comprehension">Gujarati Sentence Comprehension</option>
                    <option value="Tens Bundling & Place Value">Tens Bundling & Place Value</option>
                    <option value="Place Value Decomposition">Place Value Decomposition</option>
                    <option value="Concrete Regrouping Intuition">Concrete Regrouping Intuition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Difficulty Tier</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as Question['difficulty'])}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    <option value="Foundation">Foundation Tier</option>
                    <option value="Developing">Developing</option>
                    <option value="Grade Level">Grade Level</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Pedagogical Explanation</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explains why option A is correct and common misconceptions..."
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F3]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                  className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-8 rounded-lg bg-[#0D9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087F75]"
                >
                  Save Question
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
