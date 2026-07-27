'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Sparkles, Send, X, MessageCircle, ArrowUp } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

export function AiChatWidget() {
  const [mounted, set_mounted] = useState(false)
  const [open, set_open] = useState(false)
  const [messages, set_messages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Hello! I am your library AI assistant. Ask me about books, loans, citations, study plans, or anything library-related.' },
  ])
  const [input, set_input] = useState('')
  const [thinking, set_thinking] = useState(false)
  const messages_end_ref = useRef<HTMLDivElement>(null)
  const input_ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => set_mounted(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  useEffect(() => {
    if (open) input_ref.current?.focus()
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || thinking) return
    set_input('')
    set_messages(prev => [...prev, { role: 'user', text }])
    set_thinking(true)
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      set_messages(prev => [...prev, { role: 'assistant', text: data.reply ?? 'Sorry, I could not process that.' }])
    } catch {
      set_messages(prev => [...prev, { role: 'assistant', text: 'Network error. Please try again.' }])
    } finally {
      set_thinking(false)
    }
  }, [input, thinking])

  if (!mounted) return null

  return (
    <>
      {/* chat panel */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[70vh] bg-white dark:bg-[#0E1F3F] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/[0.08] flex flex-col z-[9998] overflow-hidden">
          {/* header */}
          <div className="shrink-0 px-4 py-3 bg-gradient-to-r from-[#0B1A3B] to-[#1A3A6E] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">Library AI</p>
                <p className="text-[11px] text-white/50">Ask anything about the library</p>
              </div>
            </div>
            <button onClick={() => set_open(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#1747D6] text-white rounded-br-md'
                    : 'bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-[#E2E8F0] rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-slate-100 dark:bg-white/[0.06] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-[#6B7A99] animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-[#6B7A99] animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-[#6B7A99] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messages_end_ref} />
          </div>

          {/* input */}
          <div className="shrink-0 px-3 pb-3 pt-1">
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2"
            >
              <input
                ref={input_ref}
                type="text"
                value={input}
                onChange={(e) => set_input(e.target.value)}
                placeholder="Ask about books, loans, citations..."
                className="flex-1 bg-transparent text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#4B5775] outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="h-8 w-8 rounded-lg bg-[#1747D6] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#1439B8] transition-colors cursor-pointer shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* floating trigger */}
      <button
        onClick={() => set_open(!open)}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] h-14 w-14 rounded-full bg-gradient-to-br from-[#0B1A3B] to-[#1A3A6E] text-white shadow-[0_4px_20px_rgba(11,26,59,0.4)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
      >
        {open ? (
          <ArrowUp className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>
    </>
  )
}
