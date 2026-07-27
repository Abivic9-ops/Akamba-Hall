'use client'

import { useState } from 'react'
import { BookOpen, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface BookSummary {
  title: string
  author: string
  summary: string
  key_takeaways: string[]
  reading_level: string
  who_should_read: string
  similar_books: string[]
}

export function AiBookSummary() {
  const [title, set_title] = useState('')
  const [author, set_author] = useState('')
  const [result, set_result] = useState<BookSummary | null>(null)
  const [loading, set_loading] = useState(false)

  async function handle_generate() {
    if (!title) return
    set_loading(true)
    set_result(null)
    try {
      const res = await fetch('/api/ai/book-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      })
      const data = await res.json()
      set_result(data.summary)
    } catch {
      set_result(null)
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="AI Book Summary" icon={BookOpen}>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Book title"
          value={title}
          onChange={(e) => set_title(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <input
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => set_author(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <button
          onClick={handle_generate}
          disabled={!title || loading}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] text-[13px] font-medium transition-all shadow-sm shadow-gold/20 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Summarizing...' : 'Get Summary'}
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{result.title}</p>
            {result.author && (
              <span className="text-[11px] text-slate-500 dark:text-[#6B7A99]">by {result.author}</span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-medium">{result.reading_level}</span>
          </div>

          <p className="text-[12px] leading-relaxed text-slate-600 dark:text-[#94A3B8]">{result.summary}</p>

          {result.key_takeaways.length > 0 && (
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1.5">Key Takeaways</p>
              <ul className="space-y-1">
                {result.key_takeaways.map((t, i) => (
                  <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8] flex items-start gap-1.5">
                    <span className="text-gold mt-0.5">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Who Should Read</p>
              <p className="text-[11px] text-slate-600 dark:text-[#94A3B8]">{result.who_should_read}</p>
            </div>
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Similar Books</p>
              <ul className="space-y-0.5">
                {result.similar_books.map((b, i) => (
                  <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8]">• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  )
}
