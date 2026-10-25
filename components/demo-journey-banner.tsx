'use client'

import { CheckCircle2, ChevronRight, HelpCircle, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

interface DemoJourneyBannerProps {
  currentStage: number
  onReset: () => void
  onQuickJump?: (stage: number) => void
}

const STAGES = [
  { id: 1, label: 'Login', short: '1. Login' },
  { id: 2, label: 'Teacher Dashboard', short: '2. Dashboard' },
  { id: 3, label: 'Select Student', short: '3. Select' },
  { id: 4, label: 'Complete Assessment', short: '4. Assess' },
  { id: 5, label: 'Diagnostic Results', short: '5. Diagnose' },
  { id: 6, label: 'Approve Learning Plan', short: '6. Approve' },
  { id: 7, label: 'Mark Practice Complete', short: '7. Practise' },
  { id: 8, label: 'Review Progress', short: '8. Progress' },
]

export function DemoJourneyBanner({ currentStage, onReset, onQuickJump }: DemoJourneyBannerProps) {
  return (
    <div className="border-b border-[#d4e4df] bg-[#eef7f4] px-4 py-2.5 text-xs text-[#17324d]">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#0d9488] text-[10px] font-bold text-white">
            FLN
          </span>
          <span className="font-semibold text-[#0d9488]">Demo Journey Guide:</span>
          <span className="hidden text-[#526273] sm:inline">
            Step {currentStage} of 8 — <strong className="text-[#17324d]">{STAGES[currentStage - 1]?.label}</strong>
          </span>
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          {STAGES.map((s, idx) => {
            const isCompleted = s.id < currentStage
            const isCurrent = s.id === currentStage

            return (
              <div key={s.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => onQuickJump && onQuickJump(s.id)}
                  className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition ${
                    isCurrent
                      ? 'bg-[#0d9488] font-bold text-white shadow-xs'
                      : isCompleted
                      ? 'bg-[#d8ece5] text-[#087f75] hover:bg-[#cbe5dc]'
                      : 'text-[#64748b] hover:text-[#17324d]'
                  }`}
                  title={`Step ${s.id}: ${s.label}`}
                >
                  {isCompleted && <CheckCircle2 size={11} className="text-[#087f75]" />}
                  {isCurrent && <Sparkles size={11} className="text-white" />}
                  {s.short}
                </button>
                {idx < STAGES.length - 1 && <ChevronRight size={12} className="mx-0.5 text-[#94a3b8]" />}
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-lg border border-[#cbd9d5] bg-white px-2 py-1 text-[11px] font-medium text-[#526273] hover:border-[#b42318] hover:text-[#b42318]"
            title="Reset demo data to initial state"
          >
            <RotateCcw size={12} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  )
}
