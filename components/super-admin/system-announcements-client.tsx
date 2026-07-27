'use client'

import { Bell, Search, Pin, Plus, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { SectionCard } from '@/components/ui/section-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { create_announcement, delete_announcement } from '@/lib/actions/announcements'

interface Announcement {
  id: string
  title: string
  body: string
  category: string
  isPinned: boolean
  publishedAt: string
}

function format_date(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

const CATEGORIES = ['GENERAL', 'EVENT', 'CLOSURE', 'ERESOURCE', 'POLICY', 'CAMPAIGN', 'WORKSHOP', 'ACQUISITION']

const category_colors: Record<string, string> = {
  general: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]',
  GENERAL: 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#6B7A99]',
  academic: 'bg-blue-50 text-blue-600',
  event: 'bg-emerald-50 text-emerald-600',
  EVENT: 'bg-emerald-50 text-emerald-600',
  alert: 'bg-red-50 text-red-500',
  CLOSURE: 'bg-red-50 text-red-500',
  maintenance: 'bg-amber-50 text-amber-600',
  ERESOURCE: 'bg-purple-100 text-purple-600',
  POLICY: 'bg-amber-100 text-amber-600',
  CAMPAIGN: 'bg-emerald-100 text-emerald-600',
  WORKSHOP: 'bg-cyan-100 text-cyan-600',
  ACQUISITION: 'bg-indigo-100 text-indigo-600',
}

export function SystemAnnouncementsClient({ announcements }: { announcements: Announcement[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, set_search] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', body: '', category: 'GENERAL',
  })

  const filtered = announcements.filter((a) => {
    if (!search) return true
    const q = search.toLowerCase()
    return a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await create_announcement({
        title: form.title,
        body: form.body,
        category: form.category as any,
      })
      setSuccess('Announcement created successfully')
      setOpen(false)
      setForm({ title: '', body: '', category: 'GENERAL' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create announcement')
    }
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this announcement?')) return
    startTransition(async () => {
      try {
        await delete_announcement(id)
        router.refresh()
      } catch (err: any) {
        alert(err.message || 'Failed to delete')
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">System Announcements</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage system-wide announcements</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> New Announcement
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <span>{success}</span>
          </div>
        )}

        <SectionCard title={`Announcements (${filtered.length})`} icon={Bell}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => set_search(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#6B7A99] focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] text-center py-8">No announcements found</p>
            ) : (
              filtered.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl border border-slate-100 dark:border-white/[0.06] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {a.isPinned && <Pin className="h-3 w-3 text-amber-500 shrink-0" />}
                      <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{a.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${category_colors[a.category] ?? category_colors.general}`}>
                        {a.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-[#6B7A99] line-clamp-2 mb-1">{a.body}</p>
                    <p className="text-[11px] text-slate-400 dark:text-[#6B7A99]">{format_date(a.publishedAt)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500 disabled:opacity-50 shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Announcement</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Body *</Label>
                <Textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Announcement content..." rows={5} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isPending} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">
                  {isPending ? 'Publishing...' : 'Publish'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
