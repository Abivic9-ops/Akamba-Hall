'use client'

import { useState } from 'react'
import { Sparkles, RotateCcw, BookOpen, Loader2 } from 'lucide-react'

interface LoanAiActionsProps {
  title: string
  author: string
  renewable: boolean
}

export function LoanAiActions({ title, author, renewable }: LoanAiActionsProps) {
  const [open, set_open] = useState(false)
  const [loading, set_loading] = useState<string | null>(null)
  const [result, set_result] = useState<string | null>(null)

  async function handle_action(type: string) {
    set_loading(type)
    set_result(null)
    try {
      if (type === 'renewal') {
        const res = await fetch('/api/ai/renewal-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: `How do I renew "${title}"?`,
            context: `Book: ${title} by ${author}. Renewable: ${renewable}`,
          }),
        })
        const data = await res.json()
        set_result(data.result?.message ?? 'Could not get renewal info.')
      } else if (type === 'similar') {
        const res = await fetch('/api/ai/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests: title, course: '' }),
        })
        const data = await res.json()
        const recs = data.recommendations
        if (recs?.books?.length) {
          set_result(recs.books.slice(0, 3).map((b: { title: string; author: string; reason: string }) => `${b.title} by ${b.author} — ${b.reason}`).join('\n'))
        } else {
          set_result('No similar books found right now.')
        }
      }
    } catch {
      set_result('Something went wrong. Please try again.')
    } finally {
      set_loading(null)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => set_open(true)}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-medium hover:bg-gold/20 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
        title="AI help"
      >
        <Sparkles className="h-3 w-3" />
      </button>
    )
  }

  return (
    <div className="mt-2 p-2 bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg border border-slate-100 dark:border-white/[0.06] space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider">AI Help</p>
        <button onClick={() => { set_open(false); set_result(null) }} className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
        </div>
      ) : result ? (
        <div>
          <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] leading-relaxed whitespace-pre-line">{result}</p>
          <button onClick={() => set_result(null)} className="text-[10px] text-gold hover:underline mt-1 cursor-pointer">Ask something else</button>
        </div>
      ) : (
        <div className="flex gap-1.5">
          <button
            onClick={() => handle_action('renewal')}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-[#CBD5E1] hover:border-gold/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-emerald-500" />
            Renewal Help
          </button>
          <button
            onClick={() => handle_action('similar')}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-[#CBD5E1] hover:border-gold/30 transition-colors cursor-pointer"
          >
            <BookOpen className="h-3 w-3 text-blue-500" />
            Similar Books
          </button>
        </div>
      )}
    </div>
  )
}
