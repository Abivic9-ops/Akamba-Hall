'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/ui/section-card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { create_eresource, delete_eresource } from '@/lib/actions/resources'
import { Globe, Plus, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react'

interface EResource {
  id: string
  title: string
  provider: string
  description?: string | null
  url: string
  category?: string | null
}

interface Props {
  eresources: EResource[]
}

export { LibraryHeadEResourcesClient }

function LibraryHeadEResourcesClient({ eresources }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', provider: '', description: '', url: '', category: '',
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await create_eresource({
        title: form.title,
        provider: form.provider,
        description: form.description,
        url: form.url,
        category: form.category,
      })
      setSuccess('E-Resource added successfully')
      setOpen(false)
      setForm({ title: '', provider: '', description: '', url: '', category: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create e-resource')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this e-resource?')) return
    try {
      await delete_eresource(id)
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
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">E-Resources</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage online databases and digital resources</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> Add E-Resource
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <SectionCard title={`E-Resources (${eresources.length})`} icon={Globe}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {eresources.map((r) => (
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
                <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(r.id)} className="shrink-0">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {eresources.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-8 col-span-2">No e-resources yet</p>
            )}
          </div>
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add E-Resource</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Resource name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Provider *</Label>
                  <Input required value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} placeholder="Provider name" />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Journals, Databases..." />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>URL *</Label>
                <Input required type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">Add Resource</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
