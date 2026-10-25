'use client'

import { useState } from 'react'
import { ArrowRight, Search, User, X } from 'lucide-react'
import { Student } from '@/lib/demo-data'

interface SearchModalProps {
  students: Student[]
  onClose: () => void
  onSelectStudent: (student: Student) => void
}

export function SearchModal({ students, onClose, onSelectStudent }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return (
      s.fullName.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.focusSkill.toLowerCase().includes(term) ||
      s.prerequisiteGap.toLowerCase().includes(term) ||
      s.rollNo.includes(term)
    )
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl border border-[#d8e2df] bg-white p-5 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#e8efed] pb-4">
          <Search size={20} className="text-[#0d9488]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name, roll no, or prerequisite skill…"
            className="flex-1 text-sm text-[#17324d] outline-none placeholder:text-[#94a3b8]"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748b] hover:bg-[#f1f5f3]"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-[#17324d]">No students found</p>
              <p className="mt-1 text-xs text-[#64748b]">
                No match for &ldquo;{searchTerm}&rdquo;. Try searching for &ldquo;Aarav&rdquo;, &ldquo;Meera&rdquo;, or
                &ldquo;Place value&rdquo;.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#edf2f0]">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelectStudent(s)
                    onClose()
                  }}
                  className="flex w-full items-center justify-between p-3 text-left transition hover:bg-[#f7fbf9]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-[#dff4ef] text-xs font-bold text-[#087f75]">
                      {s.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#17324d]">
                        {s.fullName} <span className="text-xs text-[#94a3b8]">({s.grade})</span>
                      </p>
                      <p className="text-xs text-[#64748b]">Focus: {s.focusSkill}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#f1f5f3] px-2.5 py-0.5 text-[11px] font-medium text-[#526273]">
                      {s.status}
                    </span>
                    <ArrowRight size={14} className="text-[#0d9488]" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#e8efed] pt-3 text-[11px] text-[#94a3b8]">
          <span>Synthetic demo data · Asha Primary School</span>
          <span>{filtered.length} student record(s)</span>
        </div>
      </div>
    </div>
  )
}
