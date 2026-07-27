'use client'

import { useState } from 'react'
import { Search, Loader2, Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface ResearchResult {
  topic_refined: string
  research_question: string
  keywords: string[]
  search_strategies: { strategy: string; description: string }[]
  recommended_databases: { name: string; what_for: string }[]
  citation_tips: string
  next_steps: string[]
}

export function AiResearchAssistant() {
  const [topic, set_topic] = useState('')
  const [subject, set_subject] = useState('')
  const [level, set_level] = useState('High School')
  const [result, set_result] = useState<ResearchResult | null>(null)
  const [loading, set_loading] = useState(false)

  async function handle_generate() {
    if (!topic) return
    set_loading(true)
    set_result(null)
    try {
      const res = await fetch('/api/ai/research-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, subject, level }),
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
    <SectionCard title="AI Research Assistant" icon={Search}>
      <div className="flex flex-col gap-3">
        <input
          placeholder="Research topic (e.g., renewable energy in Kenya)"
          value={topic}
          onChange={(e) => set_topic(e.target.value)}
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Subject/Course (optional)"
            value={subject}
            onChange={(e) => set_subject(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <select
            value={level}
            onChange={(e) => set_level(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1F3F] text-[13px] text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all cursor-pointer"
          >
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>
        </div>
        <button
          onClick={handle_generate}
          disabled={!topic || loading}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] text-[13px] font-medium transition-all shadow-sm shadow-gold/20 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Researching...' : 'Get Research Guide'}
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-3">
          <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Refined Topic</p>
            <p className="text-[13px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{result.topic_refined}</p>
          </div>

          <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Research Question</p>
            <p className="text-[12px] text-slate-700 dark:text-[#CBD5E1] italic">{result.research_question}</p>
          </div>

          <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1.5">Search Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {result.keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-medium">{kw}</span>
              ))}
            </div>
          </div>

          <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1.5">Search Strategies</p>
            <ul className="space-y-1.5">
              {result.search_strategies.map((s, i) => (
                <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8]">
                  <span className="font-medium text-slate-800 dark:text-[#E2E8F0]">{s.strategy}:</span> {s.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Databases</p>
              <ul className="space-y-1">
                {result.recommended_databases.map((d, i) => (
                  <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8]">
                    <span className="font-medium text-slate-800 dark:text-[#E2E8F0]">{d.name}</span> — {d.what_for}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F8F9FB] dark:bg-white/[0.03] rounded-lg p-3 border border-slate-100 dark:border-white/[0.06]">
              <p className="text-[10px] font-medium text-slate-500 dark:text-[#6B7A99] uppercase tracking-wider mb-1">Next Steps</p>
              <ul className="space-y-1">
                {result.next_steps.map((s, i) => (
                  <li key={i} className="text-[11px] text-slate-600 dark:text-[#94A3B8] flex items-start gap-1.5">
                    <span className="text-gold mt-0.5">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gold/5 rounded-lg p-3 border border-gold/10">
            <p className="text-[10px] font-medium text-gold uppercase tracking-wider mb-1">Citation Tip</p>
            <p className="text-[11px] text-slate-600 dark:text-[#94A3B8]">{result.citation_tips}</p>
          </div>
        </div>
      )}
    </SectionCard>
  )
}
