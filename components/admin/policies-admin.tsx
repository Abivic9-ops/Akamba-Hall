'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/ui/section-card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { create_policy, delete_policy } from '@/lib/actions/policies'
import { ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react'

interface Policy {
  id: string
  title: string
  description: string
  category: string
  documentUrl?: string | null
  createdAt: string
}

const CATEGORIES = ['GENERAL', 'BORROWING', 'LATE_RETURN', 'ROOM_BOOKING', 'ERESOURCE', 'INCIDENT', 'CONDUCT']

const categoryColor: Record<string, string> = {
  general: 'bg-slate-100 text-slate-600',
  borrowing: 'bg-blue-100 text-blue-600',
  late_return: 'bg-red-100 text-red-600',
  room_booking: 'bg-emerald-100 text-emerald-600',
  eresource: 'bg-purple-100 text-purple-600',
  incident: 'bg-amber-100 text-amber-600',
  conduct: 'bg-cyan-100 text-cyan-600',
}

interface Props {
  policies: Policy[]
}

export { LibraryHeadPoliciesClient }

function LibraryHeadPoliciesClient({ policies }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', description: '', category: 'GENERAL',
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await create_policy({
        title: form.title,
        description: form.description,
        category: form.category,
      })
      setSuccess('Policy created successfully')
      setOpen(false)
      setForm({ title: '', description: '', category: 'GENERAL' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create policy')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Archive this policy?')) return
    try {
      await delete_policy(id)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to delete')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Policies</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage library policies and guidelines</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> New Policy
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <SectionCard title={`All Policies (${policies.length})`} icon={ShieldCheck}>
          <div className="space-y-3">
            {policies.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColor[p.category] || 'bg-slate-100 text-slate-600'}`}>
                      {p.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#6B7A99] line-clamp-2">{p.description}</p>
                </div>
                <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {policies.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-8">No policies yet</p>
            )}
          </div>
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Policy</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Policy title" />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Description *</Label>
                <Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Full policy text..." rows={6} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">Create Policy</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
