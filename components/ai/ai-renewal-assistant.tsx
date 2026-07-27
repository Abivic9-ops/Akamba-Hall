'use client'

import { useState } from 'react'
import { RotateCcw, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface RenewalResult {
  action: string
  message: string
  steps: string[]
  tips: string[]
}

export function AiRenewalAssistant() {
  const [question, set_question] = useState('')
  const [result, set_result] = useState<RenewalResult | null>(null)
  const [loading, set_loading] = useState(false)

  const SUGGESTIONS = [
    'How do I renew a book?',
    'Can I extend my loan?',
    'How to book a study room?',
    'What if my book is overdue?',
  ]

  async function handle_send(text?: string) {
    const q = (text || question).trim()
    if (!q || loading) return
    set_question('')
    set_loading(true)
    set_result(null)
    try {
      const res = await fetch('/api/ai/renewal-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const data = await res.json()
      set_result(data.result)
    } catch {
      set_result(null)
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="AI Renewal & Booking Help" icon={RotateCcw}>
      <div className="flex flex-col gap-3">
        {!result && (
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handle_send(s)}
                className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-[#F8F9FB] dark:bg-white/[0.03] text-[11px] text-slate-600 dark:text-[#94A3B8] hover:bg-gold/10 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {result && (
          <div className="space-y-3">
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[12px] text-slate-600 dark:text-[#94A3B8] leading-relaxed">{result.message}</p>
            </div>
            {result.steps.length > 0 && (
              <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
                <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1.5">Steps</p>
                <ul className="space-y-1">
                  {result.steps.map((s, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8] flex items-start gap-1.5">
                      <span className="text-gold mt-0.5">{i + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.tips.length > 0 && (
              <div className="bg-gold/5 rounded-lg p-3 border border-gold/10">
                <p className="text-[10px] font-medium text-gold uppercase tracking-wider mb-1">Tips</p>
                <ul className="space-y-1">
                  {result.tips.map((t, i) => (
                    <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8]">• {t}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => set_result(null)}
              className="text-[11px] text-gold hover:underline cursor-pointer"
            >
              Ask another question
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            placeholder="Ask about renewals, bookings..."
            value={question}
            onChange={(e) => set_question(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handle_send()}
            className="flex-1 h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <button
            onClick={() => handle_send()}
            disabled={!question || loading}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] transition-all shadow-sm shadow-gold/20 cursor-pointer shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </SectionCard>
  )
}
