'use client'

import { useState, useTransition } from 'react'
import { Database, Plus, Trash2, Pencil, Loader2, ExternalLink } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { create_digital_resource, update_digital_resource, delete_digital_resource } from '@/lib/actions/resources'

interface Resource {
  id: string; title: string; provider: string; description: string | null;
  url: string | null; iconUrl: string | null; category: string | null;
}

export function AdminDigitalResourcesClient({ resources, userId }: { resources: Resource[]; userId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [pending, startTransition] = useTransition()
  const [form, setForm] = useState({ title: '', provider: '', description: '', url: '', category: 'Presentations' })

  function resetForm() {
    setForm({ title: '', provider: '', description: '', url: '', category: 'Presentations' })
    setEditing(null)
    setShowForm(false)
  }

  function startEdit(r: Resource) {
    setForm({ title: r.title, provider: r.provider, description: r.description ?? '', url: r.url ?? '', category: r.category ?? 'Presentations' })
    setEditing(r)
    setShowForm(true)
  }

  function handleSubmit() {
    startTransition(async () => {
      if (editing) {
        await update_digital_resource(editing.id, { ...form, url: form.url || '#' })
      } else {
        await create_digital_resource({ ...form, url: form.url || '#', addedById: userId })
      }
      resetForm()
      window.location.reload()
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
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
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
          <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
            <Plus className="h-4 w-4" /> Add Resource
          </button>
        </div>

        {showForm && (
          <SectionCard title={editing ? 'Edit Resource' : 'Add Resource'} icon={Plus}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'title', label: 'Title', placeholder: 'AI Literacy Slides' },
                { key: 'provider', label: 'Provider', placeholder: 'Starehe AI Club' },
                { key: 'category', label: 'Category', placeholder: 'Presentations' },
                { key: 'url', label: 'URL (optional)', placeholder: 'https://...' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[12px] font-medium text-slate-600 dark:text-[#94A3B8] mb-1 block">{field.label}</label>
                  <input
                    value={(form as Record<string, string>)[field.key] ?? ''}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-[12px] font-medium text-slate-600 dark:text-[#94A3B8] mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What this resource contains..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSubmit} disabled={pending || !form.title || !form.provider} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50">
                {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null} {editing ? 'Update' : 'Create'}
              </button>
              <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#E2E8F0] text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors">Cancel</button>
            </div>
          </SectionCard>
        )}

        <SectionCard title="All Digital Resources" icon={Database}>
          <div className="space-y-2">
            {resources.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Database className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{r.title}</p>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{r.provider} &middot; {r.category ?? 'Uncategorized'}</p>
                </div>
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#5B9BD5] hover:text-[#4A8AC4] flex items-center gap-1 shrink-0">
                    <ExternalLink className="h-3 w-3" /> Link
                  </a>
                )}
                <button onClick={() => startEdit(r)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors text-slate-400 hover:text-slate-600">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(r.id)} disabled={pending} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500 disabled:opacity-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
