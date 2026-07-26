'use client'

import { useState } from 'react'
import { BookMarked, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Book {
  title: string
  author: string
  reason: string
}

export function AiBookRecommendations() {
  const [interests, set_interests] = useState('')
  const [course, set_course] = useState('')
  const [recommendations, set_recommendations] = useState<Book[]>([])
  const [loading, set_loading] = useState(false)

  async function handle_generate() {
    if (!interests && !course) return
    set_loading(true)
    set_recommendations([])
    try {
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, course, level: 'university' }),
      })
      const data = await res.json()
      set_recommendations(data.recommendations ?? [])
    } catch {
      set_recommendations([])
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="AI Book Recommendations" icon={BookMarked}>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Your interests (e.g., leadership, AI, history)"
          value={interests}
          onChange={(e) => set_interests(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <input
          placeholder="Course (e.g., Computer Science)"
          value={course}
          onChange={(e) => set_course(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <button
          onClick={handle_generate}
          disabled={(!interests && !course) || loading}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] text-[13px] font-medium transition-all shadow-sm shadow-gold/20 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Finding books...' : 'Get Recommendations'}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-4 space-y-2.5">
          {recommendations.map((book, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9FB] dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] hover:border-gold/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-bold text-gold">{i + 1}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{book.title}</p>
                <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">{book.author}</p>
                <p className="text-[12px] text-slate-600 dark:text-[#94A3B8] mt-1 leading-relaxed">{book.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}
