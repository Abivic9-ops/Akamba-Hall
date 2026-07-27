'use client'

import { useState } from 'react'
import { CalendarDays, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface ScheduleItem {
  day: string
  time: string
  subject: string
  activity: string
  duration_min: number
}

interface StudyPlan {
  title: string
  duration: string
  schedule: ScheduleItem[]
  tips: string[]
}

export function AiStudyPlan() {
  const [courses, set_courses] = useState('')
  const [exam_date, set_exam_date] = useState('')
  const [study_hours, set_study_hours] = useState('3-4')
  const [preferences, set_preferences] = useState('')
  const [plan, set_plan] = useState<StudyPlan | null>(null)
  const [loading, set_loading] = useState(false)

  async function handle_generate() {
    if (!courses) return
    set_loading(true)
    set_plan(null)
    try {
      const res = await fetch('/api/ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses, exam_date, study_hours, preferences }),
      })
      const data = await res.json()
      set_plan(data.plan)
    } catch {
      set_plan(null)
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="AI Study Plan" icon={CalendarDays}>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Courses (e.g., Math, Physics, CS)"
          value={courses}
          onChange={(e) => set_courses(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            placeholder="Exam date"
            value={exam_date}
            onChange={(e) => set_exam_date(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <input
            placeholder="Hours/day (e.g., 3-4)"
            value={study_hours}
            onChange={(e) => set_study_hours(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <input
          placeholder="Preferences (e.g., morning person, prefer library)"
          value={preferences}
          onChange={(e) => set_preferences(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <button
          onClick={handle_generate}
          disabled={!courses || loading}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] text-[13px] font-medium transition-all shadow-sm shadow-gold/20 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Creating plan...' : 'Generate Study Plan'}
        </button>
      </div>

      {plan && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{plan.title}</p>
            <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-medium">{plan.duration}</span>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.08]">
                  <th className="text-left py-2 pr-2 font-medium text-slate-500 dark:text-[#6B7A99]">Day</th>
                  <th className="text-left py-2 pr-2 font-medium text-slate-500 dark:text-[#6B7A99]">Time</th>
                  <th className="text-left py-2 pr-2 font-medium text-slate-500 dark:text-[#6B7A99]">Subject</th>
                  <th className="text-left py-2 pr-2 font-medium text-slate-500 dark:text-[#6B7A99]">Activity</th>
                  <th className="text-right py-2 font-medium text-slate-500 dark:text-[#6B7A99]">Min</th>
                </tr>
              </thead>
              <tbody>
                {plan.schedule.map((item, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04]">
                    <td className="py-2 pr-2 text-slate-800 dark:text-[#E2E8F0] font-medium">{item.day}</td>
                    <td className="py-2 pr-2 text-slate-500 dark:text-[#6B7A99]">{item.time}</td>
                    <td className="py-2 pr-2 text-slate-800 dark:text-[#E2E8F0]">{item.subject}</td>
                    <td className="py-2 pr-2 text-slate-500 dark:text-[#6B7A99]">{item.activity}</td>
                    <td className="py-2 text-right text-slate-400 dark:text-[#6B7A99]">{item.duration_min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {plan.tips.length > 0 && (
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1.5">Study Tips</p>
              <ul className="space-y-1">
                {plan.tips.map((tip, i) => (
                  <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8] flex items-start gap-1.5">
                    <span className="text-gold mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  )
}
