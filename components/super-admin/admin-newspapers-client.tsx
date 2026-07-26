'use client'

import { useState, useTransition } from 'react'
import { Newspaper, Plus, Trash2, Pencil, Loader2, Globe, X } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { create_newspaper, update_newspaper, delete_newspaper } from '@/lib/actions/newspapers'

interface NewspaperItem {
  id: string; title: string; publisher: string; category: string;
  frequency: string; language: string; url: string | null;
  description: string | null; isActive: boolean; createdAt: string;
}

export function AdminNewspapersClient({ newspapers }: { newspapers: NewspaperItem[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<NewspaperItem | null>(null)
  const [pending, startTransition] = useTransition()
  const [form, setForm] = useState({ title: '', publisher: '', category: 'National', frequency: 'Daily', language: 'English', url: '', description: '' })

  function resetForm() {
    setForm({ title: '', publisher: '', category: 'National', frequency: 'Daily', language: 'English', url: '', description: '' })
    setEditing(null)
    setShowForm(false)
  }

  function startEdit(n: NewspaperItem) {
    setForm({ title: n.title, publisher: n.publisher, category: n.category, frequency: n.frequency, language: n.language, url: n.url ?? '', description: n.description ?? '' })
    setEditing(n)
    setShowForm(true)
  }

  function handleSubmit() {
    startTransition(async () => {
      const data = { ...form, url: form.url || undefined, description: form.description || undefined }
      if (editing) {
        await update_newspaper(editing.id, data)
      } else {
        await create_newspaper(data)
      }
      resetForm()
      window.location.reload()
    })
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this newspaper?')) return
    startTransition(async () => {
      await delete_newspaper(id)
      window.location.reload()
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Newspapers</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{newspapers.length} publication{newspapers.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
            <Plus className="h-4 w-4" /> Add Newspaper
          </button>
        </div>

        {showForm && (
          <SectionCard title={editing ? 'Edit Newspaper' : 'Add Newspaper'} icon={Plus}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'title', label: 'Title', placeholder: 'Daily Nation' },
                { key: 'publisher', label: 'Publisher', placeholder: 'Nation Media Group' },
                { key: 'category', label: 'Category', placeholder: 'National' },
                { key: 'frequency', label: 'Frequency', placeholder: 'Daily' },
                { key: 'language', label: 'Language', placeholder: 'English' },
                { key: 'url', label: 'Website URL', placeholder: 'https://nation.africa' },
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
                  placeholder="Brief description of the publication..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-[13px] text-slate-800 dark:text-[#E2E8F0] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5B9BD5]/30 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleSubmit} disabled={pending || !form.title || !form.publisher} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50">
                {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null} {editing ? 'Update' : 'Create'}
              </button>
              <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-[#E2E8F0] text-[13px] font-medium hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-colors">Cancel</button>
            </div>
          </SectionCard>
        )}

        <SectionCard title="All Newspapers" icon={Newspaper}>
          <div className="space-y-2">
            {newspapers.map((n) => (
              <div key={n.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/[0.04] rounded-xl transition-colors">
                <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Newspaper className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] truncate">{n.title}</p>
                  <p className="text-[12px] text-slate-400 dark:text-[#6B7A99]">{n.publisher} &middot; {n.category} &middot; {n.frequency}</p>
                </div>
                {n.url && (
                  <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#5B9BD5] hover:text-[#4A8AC4] flex items-center gap-1 shrink-0">
                    <Globe className="h-3 w-3" /> Link
                  </a>
                )}
                <button onClick={() => startEdit(n)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors text-slate-400 hover:text-slate-600">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(n.id)} disabled={pending} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500 disabled:opacity-50">
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
