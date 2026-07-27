import { Sparkles, BookOpen, Search, CalendarDays, BookMarked, RotateCcw, Lightbulb, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tools Guide | Akamba Hall Library',
}

const tools = [
  {
    icon: Search,
    title: 'AI Book Recommendations',
    description: 'Get personalized book suggestions based on your interests, course, and reading history. Appears on your catalogue page — just scroll down after searching.',
    where: 'Go to Catalogue',
    href: '/student/catalogue',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: BookOpen,
    title: 'AI Book Summary',
    description: 'Hover any book card and click the gold AI button for an instant summary with key takeaways, reading level, and similar books.',
    where: 'Go to Catalogue',
    href: '/student/catalogue',
    color: 'bg-emerald-50 text-emerald-500',
  },
  {
    icon: CalendarDays,
    title: 'AI Study Plan Generator',
    description: 'Create a structured weekly study plan tailored to your courses and exam timeline. Found in the Resources section under Study Help.',
    where: 'Go to Resources',
    href: '/resources#study-help',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Lightbulb,
    title: 'AI Citation Generator',
    description: 'Format references in APA, MLA, Chicago, Harvard, or Vancouver. Just enter book details and get a properly formatted citation instantly.',
    where: 'Go to Resources',
    href: '/resources#study-help',
    color: 'bg-amber-50 text-amber-500',
  },
  {
    icon: BookMarked,
    title: 'AI Reading List',
    description: 'Tell us what you are interested in and get a curated list of 6 books with reasons why each one is worth your time.',
    where: 'Go to Resources',
    href: '/resources#study-help',
    color: 'bg-rose-50 text-rose-500',
  },
  {
    icon: RotateCcw,
    title: 'AI Renewal & Booking Help',
    description: 'Need help renewing a loan or booking a study room? Hover a loan card and click the AI button, or ask in the chat widget.',
    where: 'Go to Catalogue',
    href: '/student/catalogue',
    color: 'bg-sky-50 text-sky-500',
  },
]

export default function AiToolsGuidePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] p-6 space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0B1A3B] to-[#1A3A6E] rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <h1 className="text-[28px] font-bold">AI Tools Guide</h1>
        </div>
        <p className="text-[15px] text-white/70 max-w-2xl leading-relaxed mb-4">
          Akamba Hall Library uses AI to help you discover books, generate citations, plan your studies,
          and get instant answers. Here is where to find each tool.
        </p>
        <div className="flex items-center gap-2 text-[13px] text-white/50">
          <MessageCircle className="h-4 w-4" />
          <span>You can also ask the AI chat widget (bottom-right) for help with any of these tools.</span>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-6">
        <h2 className="text-[16px] font-semibold text-slate-800 dark:text-[#E2E8F0] mb-3">How AI Access Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F8F9FB] dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[12px] font-semibold text-gold mb-1">Primary — Contextual</p>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">AI actions appear directly on book cards and loan views. Hover a book and click the gold AI button.</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8F9FB] dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[12px] font-semibold text-gold mb-1">Secondary — Chat Widget</p>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">The floating chat button (bottom-right) handles everything conversationally. Just type what you need.</p>
          </div>
          <div className="p-4 rounded-lg bg-[#F8F9FB] dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06]">
            <p className="text-[12px] font-semibold text-gold mb-1">Tertiary — Quick Toolbar</p>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">On mobile, the bottom toolbar gives one-tap access to any AI tool when you know what you want.</p>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, i) => (
          <div key={i} className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-6">
            <div className="flex items-start gap-4">
              <div className={`h-10 w-10 rounded-full ${tool.color} flex items-center justify-center shrink-0`}>
                <tool.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-slate-800 dark:text-[#E2E8F0]">{tool.title}</h3>
                <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] leading-relaxed mt-1">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-[11px] font-medium hover:bg-gold/20 transition-all"
                >
                  {tool.where} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
