'use client'

import { useState } from 'react'
import { BookMarked, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Book {
  title: string
  author: string
  genre: string
  why_read: string
}

interface ReadingList {
  title: string
  books: Book[]
}

export function AiReadingList() {
  const [interests, set_interests] = useState('')
  const [course, set_course] = useState('')
  const [mood, set_mood] = useState('')
  const [list, set_list] = useState<ReadingList | null>(null)
  const [loading, set_loading] = useState(false)

  async function handle_generate() {
    if (!interests) return
    set_loading(true)
    set_list(null)
    try {
      const res = await fetch('/api/ai/reading-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, course, mood }),
      })
      const data = await res.json()
      set_list(data.reading_list)
    } catch {
      set_list(null)
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="AI Reading List" icon={BookMarked}>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Interests (e.g., science, adventure, history)"
          value={interests}
          onChange={(e) => set_interests(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Course (optional)"
            value={course}
            onChange={(e) => set_course(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <input
            placeholder="Mood (optional)"
            value={mood}
            onChange={(e) => set_mood(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <button
          onClick={handle_generate}
          disabled={!interests || loading}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] text-[13px] font-medium transition-all shadow-sm shadow-gold/20 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Curating...' : 'Generate Reading List'}
        </button>
      </div>

      {list && (
        <div className="mt-4 space-y-3">
          <p className="text-[13px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{list.title}</p>
          <div className="space-y-2">
            {list.books.map((book, i) => (
              <div key={i} className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-medium text-slate-800 dark:text-[#E2E8F0]">{book.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-[#6B7A99]">{book.author}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-medium shrink-0">{book.genre}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] mt-1.5">{book.why_read}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  )
}
