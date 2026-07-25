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
import { create_book, delete_book } from '@/lib/actions/books'
import { BookPlus, BookOpen, Search, Trash2, CheckCircle2 } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  isbn?: string | null
  category?: string | null
  year?: number | null
  description?: string | null
  coverUrl?: string | null
  totalCopies: number
  availableCopies: number
  loanedCopies: number
  status: string
}

interface Props {
  books: Book[]
  stats: { totalBooks: number; totalCopies: number; availableCopies: number; loanedCopies: number }
}

export { LibraryHeadCatalogueClient }

function LibraryHeadCatalogueClient({ books, stats }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', author: '', isbn: '', category: '', year: '', copies: '1', description: '',
  })

  const filtered = books.filter((b) => {
    if (!search) return true
    const q = search.toLowerCase()
    return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || (b.isbn ?? '').toLowerCase().includes(q)
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await create_book({
        title: form.title,
        author: form.author,
        isbn: form.isbn || undefined,
        category: form.category || undefined,
        year: form.year ? parseInt(form.year) : undefined,
        copies: parseInt(form.copies) || 1,
        description: form.description || undefined,
      })
      setSuccess('Book created successfully')
      setOpen(false)
      setForm({ title: '', author: '', isbn: '', category: '', year: '', copies: '1', description: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create book')
    }
  }

  async function handleDelete(bookId: string) {
    if (!confirm('Are you sure you want to remove this book?')) return
    try {
      await delete_book(bookId)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to delete book')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
              <BookPlus className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Manage Books</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Add, view, and manage the book catalogue</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <BookPlus className="h-4 w-4 mr-1.5" /> Add Book
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Books', value: stats.totalBooks },
            { label: 'Total Copies', value: stats.totalCopies },
            { label: 'Available', value: stats.availableCopies },
            { label: 'On Loan', value: stats.loanedCopies },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-4">
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <SectionCard title="Book Catalogue" icon={Search}>
          <Input placeholder="Search by title, author, or ISBN..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Title</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Author</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Category</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">ISBN</th>
                  <th className="text-center py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Copies</th>
                  <th className="text-right py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((book) => (
                  <tr key={book.id} className="border-b border-slate-50 dark:border-white/[0.04] hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white max-w-[250px] truncate">{book.title}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-[#94A3B8] max-w-[180px] truncate">{book.author}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant="info">{book.category || 'N/A'}</Badge>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] text-xs font-mono">{book.isbn || '—'}</td>
                    <td className="py-2.5 px-3 text-center text-slate-700 dark:text-[#94A3B8]">{book.totalCopies}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(book.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="h-10 w-10 mx-auto mb-2 text-slate-200 dark:text-white/10" />
              <p className="text-sm font-medium">No books found</p>
            </div>
          )}
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Book title" />
              </div>
              <div className="space-y-1.5">
                <Label>Author *</Label>
                <Input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>ISBN</Label>
                  <Input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} placeholder="978-..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Year</Label>
                  <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Science, Business..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Copies</Label>
                  <Input type="number" min="1" value={form.copies} onChange={(e) => setForm({ ...form, copies: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isPending} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">
                  {isPending ? 'Creating...' : 'Create Book'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
