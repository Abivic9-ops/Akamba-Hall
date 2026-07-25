'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/ui/section-card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { create_announcement, delete_announcement } from '@/lib/actions/announcements'
import { Megaphone, Plus, Trash2, Pin, CheckCircle2 } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  body: string
  category: string
  isPinned: boolean
  publishedAt: string
}

const CATEGORIES = ['GENERAL', 'EVENT', 'CLOSURE', 'ERESOURCE', 'POLICY', 'CAMPAIGN', 'WORKSHOP', 'ACQUISITION']

interface Props {
  announcements: Announcement[]
}

export { LibraryHeadAnnouncementsClient }

function LibraryHeadAnnouncementsClient({ announcements }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', body: '', category: 'GENERAL',
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

  async function handleDelete(id: string) {
    if (!confirm('Delete this announcement?')) return
    try {
      await delete_announcement(id)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to delete')
    }
  }

  const categoryColor: Record<string, string> = {
    general: 'bg-slate-100 text-slate-600',
    event: 'bg-blue-100 text-blue-600',
    closure: 'bg-red-100 text-red-600',
    eresource: 'bg-purple-100 text-purple-600',
    policy: 'bg-amber-100 text-amber-600',
    campaign: 'bg-emerald-100 text-emerald-600',
    workshop: 'bg-cyan-100 text-cyan-600',
    acquisition: 'bg-indigo-100 text-indigo-600',
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#E8A63C]/10 text-[#E8A63C] flex items-center justify-center">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Announcements</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Create and manage library announcements</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> New Announcement
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <SectionCard title={`All Announcements (${announcements.length})`} icon={Megaphone}>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {a.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{a.title}</h3>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColor[a.category] || 'bg-slate-100 text-slate-600'}`}>
                      {a.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#6B7A99] line-clamp-2">{a.body}</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">
                    {new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(a.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-8">No announcements yet</p>
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
