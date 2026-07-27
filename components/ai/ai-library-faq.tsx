'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Loader2, Send, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const SUGGESTIONS = [
  'What are the library hours?',
  'How do I borrow a book?',
  'Can I renew a loan?',
  'How do I book a study room?',
]

export function AiLibraryFaq() {
  const [messages, set_messages] = useState<Message[]>([])
  const [input, set_input] = useState('')
  const [loading, set_loading] = useState(false)
  const scroll_ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scroll_ref.current?.scrollTo({ top: scroll_ref.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handle_send(text?: string) {
    const q = (text || input).trim()
    if (!q || loading) return
    set_input('')
    set_messages((prev) => [...prev, { role: 'user', text: q }])
    set_loading(true)
    try {
      const res = await fetch('/api/ai/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      const data = await res.json()
      set_messages((prev) => [...prev, { role: 'assistant', text: data.answer }])
    } catch {
      set_messages((prev) => [...prev, { role: 'assistant', text: 'Sorry, I couldn\'t reach the server. Please try again.' }])
    } finally {
      set_loading(false)
    }
  }

  return (
    <SectionCard title="Library FAQ" icon={MessageCircle}>
      <div className="flex flex-col gap-3">
        {messages.length === 0 && (
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

        {messages.length > 0 && (
          <div ref={scroll_ref} className="max-h-[280px] overflow-y-auto space-y-2.5 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[12px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gold/10 text-slate-800 dark:text-[#E2E8F0] rounded-br-sm'
                    : 'bg-[#F8F9FB] dark:bg-white/[0.03] text-slate-600 dark:text-[#94A3B8] border border-slate-100 dark:border-white/[0.06] rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl rounded-bl-sm bg-[#F8F9FB] dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            placeholder="Ask a library question..."
            value={input}
            onChange={(e) => set_input(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handle_send()}
            className="flex-1 h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <button
            onClick={() => handle_send()}
            disabled={!input || loading}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] transition-all shadow-sm shadow-gold/20 cursor-pointer shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </SectionCard>
  )
}
