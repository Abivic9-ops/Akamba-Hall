'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

interface Props {
  onSelect?: (suggestion: string) => void
  query: string
}

export function AiSearchSuggestions({ onSelect, query }: Props) {
  const [suggestions, set_suggestions] = useState<string[]>([])
  const [loading, set_loading] = useState(false)
  const [open, set_open] = useState(false)
  const container_ref = useRef<HTMLDivElement>(null)
  const debounce_ref = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (container_ref.current && !container_ref.current.contains(e.target as Node)) {
        set_open(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const fetch_suggestions = useCallback(async (q: string) => {
    if (q.length < 3) {
      set_suggestions([])
      set_open(false)
      return
    }
    set_loading(true)
    try {
      const res = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      set_suggestions(data.suggestions ?? [])
      set_open(data.suggestions?.length > 0)
    } catch {
      set_suggestions([])
    } finally {
      set_loading(false)
    }
  }, [])

  useEffect(() => {
    if (debounce_ref.current) clearTimeout(debounce_ref.current)
    debounce_ref.current = setTimeout(() => fetch_suggestions(query), 400)
    return () => { if (debounce_ref.current) clearTimeout(debounce_ref.current) }
  }, [query, fetch_suggestions])

  if (!open || suggestions.length === 0) return null

  return (
    <div ref={container_ref} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#13285A] border border-slate-200 dark:border-white/[0.08] rounded-xl shadow-lg z-50 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 dark:border-white/[0.06]">
        <Sparkles className="h-3 w-3 text-gold" />
        <span className="text-[10px] font-medium text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">AI Suggestions</span>
        {loading && <Loader2 className="h-3 w-3 text-slate-400 animate-spin ml-auto" />}
      </div>
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => { onSelect?.(s); set_open(false) }}
          className="w-full text-left px-4 py-2.5 text-[13px] text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
