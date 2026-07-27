'use client'

import { useState, useTransition } from 'react'
import { Database, Plus, Trash2, Pencil, Loader2, ExternalLink } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { create_digital_resource, update_digital_resource, delete_digital_resource } from '@/lib/actions/resources'

interface Resource {
  id: string; title: string; provider: string; description: string | null;
  url: string | null; iconUrl: string | null; category: string | null;
}

export function AdminDigitalResourcesClient({ resources, userId }: { resources: Resource[]; userId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ title: '', provider: '', description: '', url: '', category: 'Presentations' })

  function resetForm() {
    setForm({ title: '', provider: '', description: '', url: '', category: 'Presentations' })
    setEditing(null)
    setShowForm(false)
    setError('')
  }

  function startEdit(r: Resource) {
    setForm({ title: r.title, provider: r.provider, description: r.description ?? '', url: r.url ?? '', category: r.category ?? 'Presentations' })
    setEditing(r)
    setShowForm(true)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    startTransition(async () => {
      try {
        if (editing) {
          await update_digital_resource(editing.id, { ...form, url: form.url || '#' })
          setSuccess('Resource updated successfully')
        } else {
          await create_digital_resource({ ...form, url: form.url || '#', addedById: userId })
          setSuccess('Resource created successfully')
        }
        resetForm()
        window.location.reload()
      } catch (err: any) {
        setError(err.message || 'Failed to save resource')
      }
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this digital resource?')) return
    startTransition(async () => {
      await delete_digital_resource(id)
      window.location.reload()
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Digital Resources</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{resources.length} resource{resources.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true) }} className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
            <Plus className="h-4 w-4 mr-1.5" /> Add Resource
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <span>{success}</span>
          </div>
        )}

        <SectionCard title="All Digital Resources" icon={Database}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resources.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 p-4 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{r.title}</h3>
                    {r.category && <Badge variant="info">{r.category}</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#6B7A99]">{r.provider}</p>
                  {r.description && <p className="text-xs text-slate-400 dark:text-white/30 mt-1 line-clamp-2">{r.description}</p>}
                  {r.url && r.url !== '#' && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#5B9BD5] mt-1 hover:underline">
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => startEdit(r)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors text-slate-400 hover:text-slate-600">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(r.id)} disabled={pending} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500 disabled:opacity-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {resources.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-8 col-span-2">No digital resources yet</p>
            )}
          </div>
        </SectionCard>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit Resource' : 'Add Resource'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Title *</Label>
                  <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Resource name" />
                </div>
                <div className="space-y-1.5">
                  <Label>Provider *</Label>
                  <Input required value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} placeholder="Provider name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Presentations, Journals..." />
                </div>
                <div className="space-y-1.5">
                  <Label>URL</Label>
                  <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit" disabled={pending || !form.title || !form.provider} className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                  {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                  {editing ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
