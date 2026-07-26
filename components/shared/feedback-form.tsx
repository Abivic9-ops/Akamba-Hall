'use client'

import { MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { submit_feedback } from '@/lib/actions/feedback'

interface Props {
  portal: string
}

export function FeedbackForm({ portal }: Props) {
  const [title, set_title] = useState('')
  const [description, set_description] = useState('')
  const [category, set_category] = useState('GENERAL')
  const [submitted, set_submitted] = useState(false)
  const [error, set_error] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    set_error('')
    startTransition(async () => {
      const result = await submit_feedback({ title, description, category, portal })
      if (result.success) {
        set_submitted(true)
        setTimeout(() => {
          set_title('')
          set_description('')
          set_submitted(false)
        }, 3000)
      } else {
        set_error(result.error || 'Failed to submit feedback')
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Submit Feedback</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Report issues or share suggestions</p>
          </div>
        </div>

        <SectionCard title="New Report" icon={MessageSquare}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>
              <h3 className="text-[15px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-1">Thank you!</h3>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99]">Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 text-[13px] text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-1.5">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => set_title(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => set_category(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
                >
                  <option value="GENERAL">General</option>
                  <option value="BOOK_DAMAGE">Book Damage</option>
                  <option value="FACILITY">Facility</option>
                  <option value="EQUIPMENT">Equipment</option>
                  <option value="MEMBER_CONDUCT">Member Conduct</option>
                  <option value="LATE_RETURN">Late Return</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-700 dark:text-[#E2E8F0] mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => set_description(e.target.value)}
                  placeholder="Provide details about your feedback..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="h-9 px-6 rounded-lg bg-[#5B9BD5] text-white text-[13px] font-medium hover:bg-[#4A8AC4] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                {isPending ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
