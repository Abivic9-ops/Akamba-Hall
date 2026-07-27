'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, BookOpen, FileText, Loader2 } from 'lucide-react'

interface BookAiActionsProps {
  title: string
  author?: string
}

export function BookAiActions({ title, author }: BookAiActionsProps) {
  const [open, set_open] = useState(false)
  const [loading, set_loading] = useState<string | null>(null)
  const [result, set_result] = useState<{ type: string; text: string } | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle_click(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) set_open(false)
    }
    if (open) document.addEventListener('mousedown', handle_click)
    return () => document.removeEventListener('mousedown', handle_click)
  }, [open])

  async function handle_action(type: string) {
    set_loading(type)
    set_result(null)
    try {
      if (type === 'summary') {
        const res = await fetch('/api/ai/book-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author }),
        })
        const data = await res.json()
        if (data.summary) set_result({ type: 'Summary', text: data.summary.summary })
      } else if (type === 'citation') {
        const res = await fetch('/api/ai/citation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, author, style: 'APA', type: 'book' }),
        })
        const data = await res.json()
        if (data.citation) set_result({ type: 'Citation (APA)', text: data.citation })
      }
    } catch {
      set_result(null)
    } finally {
      set_loading(null)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); set_open(!open) }}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-medium hover:bg-gold/20 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
        title="AI actions"
      >
        <Sparkles className="h-3 w-3" />
        AI
      </button>

      {open && (
        <div
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-full left-0 mb-2 w-52 bg-white dark:bg-[#13285A] rounded-xl border border-slate-200 dark:border-white/[0.1] shadow-xl z-50 overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-white/[0.06]">
            <p className="text-[11px] font-medium text-slate-800 dark:text-[#E2E8F0]">AI Quick Actions</p>
            <p className="text-[10px] text-slate-400 dark:text-[#6B7A99] truncate">{title}</p>
          </div>

          {loading ? (
            <div className="px-3 py-4 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-gold" />
            </div>
          ) : result ? (
            <div className="px-3 py-2 max-h-40 overflow-y-auto">
              <p className="text-[10px] font-medium text-gold uppercase tracking-wider mb-1">{result.type}</p>
              <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] leading-relaxed">{result.text}</p>
              <button onClick={() => set_result(null)} className="text-[10px] text-gold hover:underline mt-1.5 cursor-pointer">Back</button>
            </div>
          ) : (
            <div className="p-1.5">
              <button
                onClick={() => handle_action('summary')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                Get Summary
              </button>
              <button
                onClick={() => handle_action('citation')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                Cite This Book
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
