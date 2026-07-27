'use client'

import { useState } from 'react'
import { Sparkles, BookOpen, FileText, CalendarDays, BookMarked, RotateCcw, X, Users, BarChart3, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface ToolDef {
  id: string
  label: string
  icon: typeof BookOpen
  color: string
}

const studentTools: ToolDef[] = [
  { id: 'summary', label: 'Book Summary', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'citation', label: 'Citation', icon: FileText, color: 'text-blue-500' },
  { id: 'study-plan', label: 'Study Plan', icon: CalendarDays, color: 'text-purple-500' },
  { id: 'reading-list', label: 'Reading List', icon: BookMarked, color: 'text-rose-500' },
  { id: 'renewal', label: 'Renewal Help', icon: RotateCcw, color: 'text-sky-500' },
]

const staffTools: ToolDef[] = [
  { id: 'summary', label: 'Book Summary', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'citation', label: 'Citation', icon: FileText, color: 'text-blue-500' },
  { id: 'research', label: 'Research Assistant', icon: MessageCircle, color: 'text-purple-500' },
  { id: 'ask-ai', label: 'Ask AI', icon: Sparkles, color: 'text-gold' },
]

const deskTools: ToolDef[] = [
  { id: 'renewal', label: 'Renewal Help', icon: RotateCcw, color: 'text-sky-500' },
  { id: 'summary', label: 'Book Summary', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'patron-help', label: 'Patron Help', icon: Users, color: 'text-blue-500' },
  { id: 'ask-ai', label: 'Ask AI', icon: Sparkles, color: 'text-gold' },
]

const executiveTools: ToolDef[] = [
  { id: 'summary', label: 'Book Summary', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'citation', label: 'Citation', icon: FileText, color: 'text-blue-500' },
  { id: 'oversight', label: 'Oversight Report', icon: BarChart3, color: 'text-purple-500' },
  { id: 'ask-ai', label: 'Ask AI', icon: Sparkles, color: 'text-gold' },
]

const libraryHeadTools: ToolDef[] = [
  { id: 'summary', label: 'Book Summary', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'citation', label: 'Citation', icon: FileText, color: 'text-blue-500' },
  { id: 'management', label: 'Management Help', icon: BarChart3, color: 'text-purple-500' },
  { id: 'ask-ai', label: 'Ask AI', icon: Sparkles, color: 'text-gold' },
]

function getToolsForPath(pathname: string): ToolDef[] {
  if (pathname.startsWith('/staff/')) return staffTools
  if (pathname.startsWith('/desk/')) return deskTools
  if (pathname.startsWith('/executive/')) return executiveTools
  if (pathname.startsWith('/library-head/')) return libraryHeadTools
  return studentTools
}

export function PortalAiToolbar() {
  const [expanded, set_expanded] = useState(false)
  const pathname = usePathname()
  const tools = getToolsForPath(pathname)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden">
      {expanded && (
        <div className="bg-white/95 dark:bg-[#0E1F3F]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/[0.08] px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] font-medium text-slate-800 dark:text-[#E2E8F0]">AI Tools</p>
            <button onClick={() => set_expanded(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-ai-tool', { detail: tool.id }))
                  set_expanded(false)
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-[#F8F9FB] dark:bg-white/[0.03] text-[12px] font-medium text-slate-700 dark:text-[#CBD5E1] hover:border-gold/30 hover:bg-gold/5 transition-all shrink-0 cursor-pointer"
              >
                <tool.icon className={`h-3.5 w-3.5 ${tool.color}`} />
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!expanded && (
        <div className="flex justify-end p-4">
          <button
            onClick={() => set_expanded(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-[#0B1A3B] text-[13px] font-medium shadow-lg shadow-gold/30 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            AI Tools
          </button>
        </div>
      )}
    </div>
  )
}
