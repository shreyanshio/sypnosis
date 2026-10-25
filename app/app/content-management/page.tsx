'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Sparkles,
  Layers,
  Volume2,
  FileText,
  SlidersHorizontal,
  Eye,
  Check,
  AlertTriangle,
  Archive,
  ArrowLeft,
  Share2,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { learningActivityService } from '@/lib/services/learningActivityService'
import { auditService } from '@/lib/services/auditService'
import { LearningActivity, SkillCategory } from '@/lib/types'

export default function ContentManagementPage() {
  const { t, locale } = useI18n()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft' | 'Archived'>('All')
  const [reviewFilter, setReviewFilter] = useState<'All' | 'Verified' | 'Pending Review' | 'Draft'>('All')
  const [activities, setActivities] = useState<LearningActivity[]>(() =>
    learningActivityService.getActivities()
  )

  // Creation modal
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTitleGu, setNewTitleGu] = useState('')
  const [newSubject, setNewSubject] = useState<SkillCategory>('numeracy')
  const [newContentType, setNewContentType] = useState<LearningActivity['contentType']>('guided_math')
  const [newTargetSkill, setNewTargetSkill] = useState('')
  const [newPrereqSkill, setNewPrereqSkill] = useState('')
  const [newGcertCode, setNewGcertCode] = useState('GCERT Class 3 Sem 1 LO-M309')
  const [newGradeRange, setNewGradeRange] = useState('Class 2-3')
  const [newDuration, setNewDuration] = useState('12 mins')
  const [newDescription, setNewDescription] = useState('')
  const [newTeacherScriptGu, setNewTeacherScriptGu] = useState('')

  function refreshList() {
    setActivities(learningActivityService.getActivities())
  }

  function handleTogglePublish(act: LearningActivity) {
    const nextStatus = act.publicationStatus === 'Published' ? 'Draft' : 'Published'
    learningActivityService.updatePublicationStatus(act.id, nextStatus)
    auditService.logEvent({
      actorId: 'usr-ht-01',
      actorName: 'Raman Patel',
      role: 'head_teacher',
      eventType: 'content_published',
      entityType: 'activity',
      entityId: act.id,
      summary: `Updated publication state of "${act.title}" to ${nextStatus}`,
    })
    refreshList()
  }

  function handleUpdateReview(act: LearningActivity, newReviewStatus: LearningActivity['curriculumReviewStatus']) {
    learningActivityService.updatePublicationStatus(act.id, act.publicationStatus, newReviewStatus)
    auditService.logEvent({
      actorId: 'usr-crc-01',
      actorName: 'Jayesh Trivedi',
      role: 'crc_coordinator',
      eventType: 'content_published',
      entityType: 'activity',
      entityId: act.id,
      summary: `Curriculum review status updated to ${newReviewStatus} for "${act.title}"`,
    })
    refreshList()
  }

  function handleCreateActivity(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim() || !newTitleGu.trim()) return

    const newActivity: LearningActivity = {
      id: `act-res-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      titleGu: newTitleGu.trim(),
      titleHi: newTitle.trim(),
      subjectId: newSubject,
      skillId: `skill-${Date.now().toString().slice(-4)}`,
      targetSkillName: newTargetSkill || 'Foundational Competency',
      prerequisiteSkillIds: [],
      prerequisiteSkillName: newPrereqSkill || 'Basic Recognition',
      gradeRange: newGradeRange,
      locale: 'gu',
      difficulty: 'Standard',
      durationMinutes: parseInt(newDuration) || 12,
      duration: newDuration,
      contentType: newContentType,
      format: newContentType,
      resourceReference: '/resources/custom-activity.pdf',
      curriculumMapping: newGcertCode,
      curriculumReviewStatus: 'Pending Review',
      publicationStatus: 'Draft',
      description: newDescription || 'Teacher-facilitated remedial activity.',
      materialsNeeded: 'Standard classroom stationary',
      teacherScriptGu: newTeacherScriptGu || 'બાળકો સાથે પ્રવૃત્તિ કરાવો.',
      status: 'ready',
    }

    learningActivityService.saveActivity(newActivity)
    auditService.logEvent({
      actorId: 'usr-tea-01',
      actorName: 'Asha Shah',
      role: 'teacher',
      eventType: 'content_published',
      entityType: 'activity',
      entityId: newActivity.id,
      summary: `Created new remedial resource draft: "${newActivity.title}"`,
    })

    setCreateModalOpen(false)
    setNewTitle('')
    setNewTitleGu('')
    setNewDescription('')
    setNewTeacherScriptGu('')
    refreshList()
  }

  const filtered = activities.filter((a) => {
    if (statusFilter !== 'All' && a.publicationStatus !== statusFilter) return false
    if (reviewFilter !== 'All' && a.curriculumReviewStatus !== reviewFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const match =
        a.title.toLowerCase().includes(q) ||
        a.titleGu.toLowerCase().includes(q) ||
        (a.curriculumMapping && a.curriculumMapping.toLowerCase().includes(q))
      if (!match) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/app/resources"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] hover:underline"
            >
              <ArrowLeft size={13} /> Resource Library
            </Link>
            <span className="text-xs text-[#CBD5E1]">/</span>
            <span className="text-xs text-[#64748B]">Curriculum Management</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#17324D]">
            Curriculum Alignment & Content Management
          </h1>
          <p className="text-sm text-[#64748B]">
            Author, peer-review, and publish remedial instructional materials mapped to GCERT learning outcomes.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0D9488] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0b7c72]"
        >
          <Plus size={14} />
          <span>New Instructional Material</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Total Items</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">{activities.length}</div>
          <div className="mt-0.5 text-[11px] text-[#0D9488]">Registered learning tools</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Verified by CRC</div>
          <div className="mt-1 text-xl font-bold text-[#15803D]">
            {activities.filter((a) => a.curriculumReviewStatus === 'Verified').length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">GCERT quality standard met</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Pending Review</div>
          <div className="mt-1 text-xl font-bold text-[#B7791F]">
            {activities.filter((a) => a.curriculumReviewStatus === 'Pending Review' || a.curriculumReviewStatus === 'Draft').length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Awaiting coordinator sign-off</div>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
          <div className="text-xs font-medium text-[#64748B]">Published in Schools</div>
          <div className="mt-1 text-xl font-bold text-[#17324D]">
            {activities.filter((a) => a.publicationStatus === 'Published').length}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748B]">Active in teacher workspace</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, Gujarati text, or GCERT code..."
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F9F6] py-2 pl-9 pr-3 text-xs text-[#263238] focus:border-[#0D9488] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value as any)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
            >
              <option value="All">All Review States</option>
              <option value="Verified">Verified by CRC</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#263238]"
            >
              <option value="All">All Publication States</option>
              <option value="Published">Published to Teachers</option>
              <option value="Draft">Draft Only</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#263238]">
            <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <tr>
                <th className="px-4 py-3">Resource & Title</th>
                <th className="px-4 py-3">Subject & Format</th>
                <th className="px-4 py-3">Curriculum LO</th>
                <th className="px-4 py-3">CRC Review</th>
                <th className="px-4 py-3">Publish State</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((act) => (
                <tr key={act.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#17324D]">{act.title}</div>
                    <div className="text-[11px] text-[#0D9488]">{act.titleGu}</div>
                    <div className="mt-0.5 text-[10px] text-[#64748B]">{act.gradeRange} • {act.duration}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        act.subjectId === 'numeracy'
                          ? 'bg-[#DFF4EF] text-[#0D9488]'
                          : 'bg-[#FEF08A]/50 text-[#854D0E]'
                      }`}
                    >
                      {act.subjectId === 'numeracy' ? 'Numeracy' : 'Literacy'}
                    </span>
                    <div className="mt-1 text-[11px] text-[#64748B] capitalize">
                      {(act.contentType || 'guided_math').replace('_', ' ')}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] font-semibold text-[#17324D]">
                      {act.curriculumMapping}
                    </span>
                    <div className="text-[10px] text-[#64748B]">{act.targetSkillName}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          act.curriculumReviewStatus === 'Verified'
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : act.curriculumReviewStatus === 'Pending Review'
                            ? 'bg-[#FEF9C3] text-[#A16207]'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        {act.curriculumReviewStatus === 'Verified' ? (
                          <CheckCircle2 size={11} />
                        ) : (
                          <Clock size={11} />
                        )}
                        {act.curriculumReviewStatus}
                      </span>
                    </div>
                    {/* Quick review action */}
                    {act.curriculumReviewStatus !== 'Verified' && (
                      <button
                        onClick={() => handleUpdateReview(act, 'Verified')}
                        className="mt-1 text-[10px] font-semibold text-[#0D9488] hover:underline"
                      >
                        Mark Verified
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        act.publicationStatus === 'Published'
                          ? 'bg-[#DFF4EF] text-[#0D9488]'
                          : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      {act.publicationStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/app/resources/${act.id}`}
                        className="rounded-md border border-[#E2E8F0] p-1.5 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#17324D]"
                        title="Interactive Preview"
                      >
                        <Eye size={13} />
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(act)}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                          act.publicationStatus === 'Published'
                            ? 'border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]'
                            : 'bg-[#0D9488] text-white hover:bg-[#0b7c72]'
                        }`}
                      >
                        {act.publicationStatus === 'Published' ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-[#17324D]">Author New Remedial Material</h2>
                <p className="text-xs text-[#64748B]">Provide bilingual labels and GCERT learning outcome mapping.</p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">English Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Number Line Hop Game"
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Gujarati Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitleGu}
                    onChange={(e) => setNewTitleGu(e.target.value)}
                    placeholder="દા.ત. સંખ્યારેખા કૂદકો રમત"
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as SkillCategory)}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  >
                    <option value="numeracy">Numeracy (ગણિત)</option>
                    <option value="literacy">Literacy (ભાષા)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Format Type</label>
                  <select
                    value={newContentType}
                    onChange={(e) => setNewContentType(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  >
                    <option value="guided_math">Concrete / Manipulative</option>
                    <option value="number_line">Number Line</option>
                    <option value="flashcards">Flashcards</option>
                    <option value="audio_practice">Audio Practice</option>
                    <option value="worksheet">Printable Worksheet</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">Target Skill Name</label>
                  <input
                    type="text"
                    value={newTargetSkill}
                    onChange={(e) => setNewTargetSkill(e.target.value)}
                    placeholder="e.g. Positional Place Value"
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#17324D]">GCERT Outcome Code</label>
                  <input
                    type="text"
                    value={newGcertCode}
                    onChange={(e) => setNewGcertCode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Description & Pedagogical Intent</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="How does this activity help the child resolve the learning misconception?"
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#17324D]">Teacher Script in Gujarati (ગુજરાતી સંવાદ)</label>
                <textarea
                  value={newTeacherScriptGu}
                  onChange={(e) => setNewTeacherScriptGu(e.target.value)}
                  placeholder="દા.ત. 'બાળકને દસ દસની ભારી ગણવા કહો...'"
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-lg border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0D9488] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0b7c72]"
                >
                  Save as Draft Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
