'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Sparkles, ArrowUp, Send, X, Loader2, Pencil, Trash2, Copy, RotateCcw } from 'lucide-react'
import { useAuth } from '@/lib/contexts/auth-context'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const PUBLIC_SUGGESTIONS = [
  'What are the library hours?',
  'Find books on leadership',
  'Help me with APA citation',
  'Recommend a book',
]

const AUTH_SUGGESTIONS = [
  'Recommend books for me',
  'Book a space',
  'Generate citation',
  'Study plan',
  'Renew my books',
]

function get_greeting(user: { fullName?: string | null; studentId?: string | null } | null): string {
  const h = new Date().getHours()
  const time = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  const name = user?.fullName?.split(' ')[0] ?? 'there'
  return `${time}, ${name}. I am Akamba Hall:your library assistant and advisor. How can I help you today?`
}

export function AiChatWidget() {
  const { user } = useAuth()
  const [open, set_open] = useState(false)
  const [messages, set_messages] = useState<Message[]>([])
  const [input, set_input] = useState('')
  const [loading, set_loading] = useState(false)
  const [scroll_visible, set_scroll_visible] = useState(false)
  const panel_ref = useRef<HTMLDivElement>(null)
  const input_ref = useRef<HTMLTextAreaElement>(null)
  const messages_end_ref = useRef<HTMLDivElement>(null)
  const [mounted, set_mounted] = useState(false)
  const [editing_id, set_editing_id] = useState<string | null>(null)
  const [edit_text, set_edit_text] = useState('')
  const [copied_id, set_copied_id] = useState<string | null>(null)

  const is_authenticated = !!user

  useEffect(() => {
    set_mounted(true)
  }, [])

  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: get_greeting(user),
        timestamp: new Date(),
      }
      set_messages([greeting])
    }
  }, [open, messages.length, user])

  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const onScroll = () => set_scroll_visible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scroll_to_top = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handle_copy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text)
    set_copied_id(id)
    setTimeout(() => set_copied_id(null), 1500)
  }, [])

  const handle_start_edit = useCallback((id: string, content: string) => {
    set_editing_id(id)
    set_edit_text(content)
  }, [])

  const handle_save_edit = useCallback((id: string) => {
    if (!edit_text.trim()) return
    set_messages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: edit_text.trim() } : m))
    )
    set_editing_id(null)
    set_edit_text('')
  }, [edit_text])

  const handle_cancel_edit = useCallback(() => {
    set_editing_id(null)
    set_edit_text('')
  }, [])

  const handle_delete = useCallback((id: string) => {
    set_messages((prev) => {
      const idx = prev.findIndex((m) => m.id === id)
      if (idx === -1) return prev
      if (prev[idx].role === 'user') {
        if (idx + 1 < prev.length && prev[idx + 1].role === 'assistant') {
          return prev.filter((_, i) => i !== idx && i !== idx + 1)
        }
        return prev.filter((_, i) => i !== idx)
      }
      return prev.filter((_, i) => i !== idx)
    })
  }, [])

  const handle_unsend = useCallback((id: string) => {
    set_messages((prev) => {
      const idx = prev.findIndex((m) => m.id === id)
      if (idx === -1) return prev
      const pair = idx + 1 < prev.length && prev[idx + 1].role === 'assistant' ? [idx, idx + 1] : [idx]
      return prev.filter((_, i) => !pair.includes(i))
    })
  }, [])

  const handle_send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const user_msg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    set_messages((prev) => [...prev, user_msg])
    set_input('')
    set_loading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, user_msg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode: is_authenticated ? 'authenticated' : 'public',
          user: is_authenticated
            ? {
                name: user?.fullName,
                studentId: user?.studentId,
                role: user?.memberType,
              }
            : null,
        }),
      })

      if (!res.ok) throw new Error('Failed to get response')

      const data = await res.json()
      const assistant_msg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response ?? 'I could not process that request. Please try again.',
        timestamp: new Date(),
      }
      set_messages((prev) => [...prev, assistant_msg])
    } catch {
      const error_msg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or call +254 727 531 001 for assistance.',
        timestamp: new Date(),
      }
      set_messages((prev) => [...prev, error_msg])
    } finally {
      set_loading(false)
    }
  }, [input, loading, messages, is_authenticated, user])

  const handle_keydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handle_send()
    }
  }

  const suggestions = is_authenticated ? AUTH_SUGGESTIONS : PUBLIC_SUGGESTIONS

  if (!mounted) return null

  return (
    <>
      {/* Floating Cylinder — vertical pill container */}
      <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-center p-1.5 gap-1.5 rounded-full bg-white/90 dark:bg-[#13285A]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/30 group/cyl">
        {scroll_visible && (
          <div className="relative">
            <button
              onClick={scroll_to_top}
              className="h-11 w-11 rounded-full bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:bg-slate-200 dark:hover:bg-white/[0.1] hover:text-slate-800 dark:hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-2 rounded-xl bg-[#0B1A3B] dark:bg-[#1A3368] text-white text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/cyl:opacity-100 transition-opacity duration-200 shadow-lg z-[10000]">
              Scroll to top
            </span>
          </div>
        )}
        <div className="relative">
          <button
            onClick={() => set_open((prev) => !prev)}
            className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              open
                ? 'bg-slate-800 dark:bg-[#0E1F3F] text-white shadow-inner'
                : 'bg-gradient-to-br from-[#E8A63C] to-[#D4922A] text-[#0B1A3B] hover:scale-105 shadow-md shadow-gold/20'
            }`}
            aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
          </button>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-2 rounded-xl bg-[#0B1A3B] dark:bg-[#1A3368] text-white text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/cyl:opacity-100 transition-opacity duration-200 shadow-lg z-[10000]">
            {open ? 'Close chat' : 'Chat with Akamba AI Assistant'}
          </span>
        </div>
      </div>

      {/* Chat Panel */}
      {open && (
        <div
          ref={panel_ref}
          className="fixed bottom-20 right-4 z-[9998] w-[calc(100vw-32px)] max-w-[400px] h-[min(calc(100vh-100px),580px)] bg-white dark:bg-[#0E1F3F] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/[0.08] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="shrink-0 px-5 py-4 bg-gradient-to-r from-[#0B1A3B] to-[#13285A] flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gold/20 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-semibold text-white">Akamba AI</h3>
              <p className="text-[11px] text-white/50">
                {is_authenticated ? `Hi ${user?.fullName?.split(' ')[0] ?? 'there'}` : 'Library Assistant'}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`group/msg flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="relative max-w-[85%]">
                    {editing_id === msg.id ? (
                      <div className="bg-[#0B1A3B] dark:bg-gold/20 rounded-2xl rounded-br-sm p-2">
                        <textarea
                          value={edit_text}
                          onChange={(e) => set_edit_text(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handle_save_edit(msg.id)
                            }
                            if (e.key === 'Escape') handle_cancel_edit()
                          }}
                          className="w-full resize-none bg-white/10 rounded-xl px-3 py-2 text-[13px] text-white placeholder:text-white/40 focus:outline-none border border-white/20"
                          rows={3}
                          autoFocus
                        />
                        <div className="flex gap-1.5 mt-1.5 justify-end">
                          <button
                            onClick={handle_cancel_edit}
                            className="text-[11px] px-2.5 py-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handle_save_edit(msg.id)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-gold text-[#0B1A3B] hover:bg-gold-hover transition-colors cursor-pointer font-medium"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-[#0B1A3B] dark:bg-gold/20 text-white dark:text-[#E2E8F0] px-4 py-2.5 rounded-2xl rounded-br-sm text-[13px] leading-relaxed">
                          {msg.content}
                        </div>
                        <div className="absolute -bottom-8 right-0 flex gap-0.5 opacity-0 group-hover/msg:opacity-100 transition-opacity z-10">
                          <button
                            onClick={() => handle_start_edit(msg.id, msg.content)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handle_copy(msg.id, msg.content)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
                            title={copied_id === msg.id ? 'Copied!' : 'Copy'}
                          >
                            {copied_id === msg.id ? (
                              <span className="text-[9px] font-medium text-emerald-400">✓</span>
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                          <button
                            onClick={() => handle_unsend(msg.id)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-white/40 hover:text-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
                            title="Unsend"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handle_delete(msg.id)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative max-w-[85%]">
                    <div className="bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-[#E2E8F0] px-4 py-2.5 rounded-2xl rounded-bl-sm text-[13px] leading-relaxed">
                      {msg.content}
                    </div>
                    <div className="absolute -bottom-8 left-0 flex gap-0.5 opacity-0 group-hover/msg:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => handle_copy(msg.id, msg.content)}
                        className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title={copied_id === msg.id ? 'Copied!' : 'Copy'}
                      >
                        {copied_id === msg.id ? (
                          <span className="text-[9px] font-medium text-emerald-500">✓</span>
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-sm">
                  <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messages_end_ref} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="shrink-0 px-4 pb-3 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { set_input(s); input_ref.current?.focus() }}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#94A3B8] hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 px-4 pb-4 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-end gap-2">
              <textarea
                ref={input_ref}
                value={input}
                onChange={(e) => set_input(e.target.value)}
                onKeyDown={handle_keydown}
                placeholder="Ask me anything about the library..."
                rows={1}
                className="flex-1 resize-none bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#4B5775] focus:outline-none focus:border-gold/40 transition-colors max-h-20"
              />
              <button
                onClick={handle_send}
                disabled={!input.trim() || loading}
                className="h-10 w-10 rounded-xl bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#0B1A3B] transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
              {input.trim() && (
                <button
                  onClick={() => set_input('')}
                  className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] flex items-center justify-center text-slate-400 dark:text-[#4B5775] hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer shrink-0"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  )
}
