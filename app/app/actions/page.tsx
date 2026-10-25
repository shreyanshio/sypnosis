'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  Search,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { teacherActionService } from '@/lib/services/teacherActionService'
import { TeacherActionRecord } from '@/lib/types'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

export default function TeacherActionsPage() {
  const { t, locale } = useI18n()
  const [actions, setActions] = useState<TeacherActionRecord[]>(() =>
    teacherActionService.getActions()
  )
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddingAction, setIsAddingAction] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // New action form state
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High')
  const [newDueDate, setNewDueDate] = useState('Today')
  const [newStudentName, setNewStudentName] = useState('Aarav Kumar')

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const filtered = actions.filter((a) => {
    if (priorityFilter !== 'All' && a.priority !== priorityFilter) return false
    if (statusFilter !== 'All' && a.status !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchTitle = a.title.toLowerCase().includes(q) || (a.titleGu && a.titleGu.toLowerCase().includes(q))
      const matchDesc = a.description.toLowerCase().includes(q)
      const matchStudent = a.relatedStudentName ? a.relatedStudentName.toLowerCase().includes(q) : false
      if (!matchTitle && !matchDesc && !matchStudent) return false
    }
    return true
  })

  function handleToggleComplete(action: TeacherActionRecord) {
    const nextStatus = action.status === 'Completed' ? 'Pending' : 'Completed'
    teacherActionService.updateActionStatus(action.id, nextStatus)
    setActions(teacherActionService.getActions())
    showToast(nextStatus === 'Completed' ? 'Action marked as completed.' : 'Action reopened.')
  }

  function handleStatusChange(actionId: string, newStatus: TeacherActionRecord['status']) {
    teacherActionService.updateActionStatus(actionId, newStatus)
    setActions(teacherActionService.getActions())
    showToast(`Status updated to ${newStatus}.`)
  }

  function handleCreateAction(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newAct: TeacherActionRecord = {
      id: `act-${Date.now()}`,
      title: newTitle.trim(),
      titleGu: newTitle.trim(),
      titleHi: newTitle.trim(),
      description: newDescription.trim() || 'Focused pedagogical follow-up.',
      reason: 'Teacher identified intervention requirement.',
      relatedSkill: 'Targeted Skill Support',
      relatedStudentName: newStudentName,
      relatedClassId: 'class-std-3a',
      className: 'Standard 3 - A',
      priority: newPriority,
      dueDate: newDueDate,
      status: 'Pending',
      recommendedNextStep: 'Conduct small-group practice.',
    }

    teacherActionService.addAction(newAct)
    setActions(teacherActionService.getActions())
    setIsAddingAction(false)
    setNewTitle('')
    setNewDescription('')
    showToast('New action item created.')
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
            <CheckSquare size={15} />
            <span>{t.nav.teacherActions}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Teacher Action Workspace
          </h1>
          <p className="mt-0.5 text-xs text-[#64748B]">
            Prioritized interventions, learner follow-ups, and pedagogical next steps for today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAddingAction(true)}
            className="h-8.5 rounded-lg bg-[#0D9488] px-3 text-xs font-semibold text-white hover:bg-[#087F75]"
          >
            <Plus size={14} className="mr-1" /> Add Action Item
          </Button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#64748B]">Total Actions</span>
          <p className="mt-0.5 text-xl font-bold text-[#17324D]">{actions.length}</p>
          <p className="text-[10px] text-[#64748B]">Active intervention tasks</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#B42318]">High Priority</span>
          <p className="mt-0.5 text-xl font-bold text-[#B42318]">
            {actions.filter((a) => a.priority === 'High' && a.status !== 'Completed').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Urgent prerequisite follow-ups</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#0D9488]">In Progress</span>
          <p className="mt-0.5 text-xl font-bold text-[#0D9488]">
            {actions.filter((a) => a.status === 'In Progress').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Currently underway</p>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3">
          <span className="text-[11px] font-medium text-[#15803D]">Completed</span>
          <p className="mt-0.5 text-xl font-bold text-[#15803D]">
            {actions.filter((a) => a.status === 'Completed').length}
          </p>
          <p className="text-[10px] text-[#64748B]">Resolved this week</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action items by title, student, or description..."
            className="h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white pl-9 pr-3 text-xs text-[#263238] placeholder:text-[#94A3B8] focus:border-[#0D9488] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
            className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="h-8.5 rounded-lg border border-[#CBD5E1] bg-white px-2.5 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Actions List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center">
          <CheckSquare size={32} className="mx-auto text-[#CBD5E1]" />
          <p className="mt-3 text-sm font-semibold text-[#17324D]">{t.common.noRecordsFound}</p>
          <p className="mt-1 text-xs text-[#64748B]">No teacher action items match your selected filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((action) => {
            const isCompleted = action.status === 'Completed'
            const isGujarati = locale === 'gu' && action.titleGu

            return (
              <div
                key={action.id}
                className={`rounded-xl border p-4 transition ${
                  isCompleted
                    ? 'border-[#E2E8F0] bg-[#F7F9F6]/80 text-[#94A3B8]'
                    : 'border-[#E2E8F0] bg-white shadow-xs hover:border-[#0D9488]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleToggleComplete(action)}
                      className="mt-1 size-4 rounded accent-[#0D9488] cursor-pointer"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2
                          className={`text-sm font-bold leading-snug ${
                            isCompleted ? 'line-through text-[#94A3B8]' : 'text-[#17324D]'
                          }`}
                        >
                          {isGujarati ? action.titleGu : action.title}
                        </h2>

                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                            action.priority === 'High'
                              ? 'bg-[#FEE2E2] text-[#B42318]'
                              : action.priority === 'Medium'
                              ? 'bg-[#FFF5D9] text-[#8A6200]'
                              : 'bg-[#F1F5F3] text-[#64748B]'
                          }`}
                        >
                          {action.priority}
                        </span>

                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-semibold ${
                            action.status === 'Completed'
                              ? 'bg-[#DFF4EF] text-[#087F75]'
                              : action.status === 'In Progress'
                              ? 'bg-[#E0F2FE] text-[#0284C7]'
                              : 'bg-[#F1F5F3] text-[#64748B]'
                          }`}
                        >
                          {action.status}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                        {action.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> Due: <strong className="text-[#263238]">{action.dueDate}</strong>
                        </span>
                        {action.relatedStudentName && (
                          <span className="flex items-center gap-1">
                            <User size={12} /> Learner:{' '}
                            <strong className="text-[#17324D]">{action.relatedStudentName}</strong>
                          </span>
                        )}
                        {action.className && (
                          <span className="flex items-center gap-1">
                            <Users size={12} /> {action.className}
                          </span>
                        )}
                      </div>

                      {action.recommendedNextStep && (
                        <div className="mt-2.5 rounded-lg bg-[#F7F9F6] p-2 text-xs">
                          <span className="font-semibold text-[#0D9488]">Next Step: </span>
                          <span className="text-[#263238]">{action.recommendedNextStep}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <select
                      value={action.status}
                      onChange={(e) =>
                        handleStatusChange(action.id, e.target.value as TeacherActionRecord['status'])
                      }
                      aria-label="Change action status"
                      className="h-7 rounded-md border border-[#CBD5E1] bg-white px-2 text-[11px] font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Action Item Modal */}
      {isAddingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg animate-in fade-in zoom-in-95">
            <h2 className="text-base font-bold text-[#17324D]">Create Teacher Action Item</h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Add a classroom intervention, small-group practice note, or parent follow-up.
            </p>

            <form onSubmit={handleCreateAction} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#17324D]">Action Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Conduct straw bundling practice with Aarav"
                  required
                  className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17324D]">Description & Details</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Specific pedagogical focus and materials needed..."
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Due Date</label>
                  <select
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs font-medium text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Week">This Week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17324D]">Learner</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="mt-1 h-8.5 w-full rounded-lg border border-[#CBD5E1] bg-white px-2 text-xs text-[#263238] focus:border-[#0D9488] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F3]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingAction(false)}
                  className="h-8 rounded-lg border-[#CBD5E1] px-3 text-xs font-semibold text-[#17324D]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-8 rounded-lg bg-[#0D9488] px-3.5 text-xs font-semibold text-white hover:bg-[#087F75]"
                >
                  Save Action
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
