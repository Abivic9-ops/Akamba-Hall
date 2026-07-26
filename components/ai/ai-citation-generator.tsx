'use client'

import { useState } from 'react'
import { BookOpen, Copy, Check, Loader2, Sparkles } from 'lucide-react'

const STYLES = ['APA', 'MLA', 'Chicago', 'Harvard', 'Vancouver']
const TYPES = ['book', 'journal', 'website', 'chapter']

export function AiCitationGenerator() {
  const [form, set_form] = useState({ title: '', author: '', year: '', style: 'APA', type: 'book', source: '' })
  const [citation, set_citation] = useState('')
  const [loading, set_loading] = useState(false)
  const [copied, set_copied] = useState(false)

  async function handle_generate() {
    if (!form.title || !form.author) return
    set_loading(true)
    set_citation('')
    try {
      const res = await fetch('/api/ai/citation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      set_citation(data.citation ?? '')
    } catch {
      set_citation('Failed to generate citation.')
    } finally {
      set_loading(false)
    }
  }

  async function handle_copy() {
    await navigator.clipboard.writeText(citation)
    set_copied(true)
    setTimeout(() => set_copied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-[#13285A] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm overflow-hidden">
      <div className="px-7 py-5 bg-gradient-to-r from-[#0B1A3B] to-[#13285A] flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gold/20 flex items-center justify-center">
          <BookOpen className="h-4.5 w-4.5 text-gold" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-white">Citation Generator</h3>
          <p className="text-[11px] text-white/50">Format references in any style — powered by AI</p>
        </div>
      </div>

      <div className="p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input
            placeholder="Title *"
            value={form.title}
            onChange={(e) => set_form({ ...form, title: e.target.value })}
            className="px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
          />
          <input
            placeholder="Author *"
            value={form.author}
            onChange={(e) => set_form({ ...form, author: e.target.value })}
            className="px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
          />
          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => set_form({ ...form, year: e.target.value })}
            className="px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
          />
          <input
            placeholder="Publisher / Journal / URL"
            value={form.source}
            onChange={(e) => set_form({ ...form, source: e.target.value })}
            className="px-4 py-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 dark:text-[#6B7A99] font-medium">Style:</span>
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => set_form({ ...form, style: s })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  form.style === s
                    ? 'bg-gold/15 text-gold shadow-sm shadow-gold/10'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-[#6B7A99] hover:bg-slate-200 dark:hover:bg-white/[0.08]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 dark:text-[#6B7A99] font-medium">Type:</span>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => set_form({ ...form, type: t })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize transition-all cursor-pointer ${
                  form.type === t
                    ? 'bg-gold/15 text-gold shadow-sm shadow-gold/10'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-[#6B7A99] hover:bg-slate-200 dark:hover:bg-white/[0.08]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handle_generate}
          disabled={!form.title || !form.author || loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A3B] rounded-xl text-[13px] font-semibold transition-all shadow-sm shadow-gold/20 hover:shadow-md hover:shadow-gold/30 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? 'Generating...' : 'Generate Citation'}
        </button>

        {citation && (
          <div className="relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-4">
            <p className="text-[13px] text-slate-800 dark:text-[#E2E8F0] leading-relaxed pr-8">{citation}</p>
            <button
              onClick={handle_copy}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Copy citation"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
