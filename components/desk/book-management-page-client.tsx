'use client'

import { useMemo, useState } from 'react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  BookOpen, Search, Plus, Edit3, Copy, AlertTriangle, Filter, X,
} from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  copies: number
  available: number
  shelfLocation: string
}

const categories = ['All', 'Science', 'Technology', 'Commerce', 'Humanities']

export function BookManagementPageClient({ books }: { books: Book[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newIsbn, setNewIsbn] = useState('')
  const [newCategory, setNewCategory] = useState('Science')
  const [newCopies, setNewCopies] = useState('1')
  const [newShelf, setNewShelf] = useState('')

  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory
    return matchesSearch && matchesCategory
  }), [activeCategory, books, search])

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1B3D] tracking-tight">Book Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, and manage the library&apos;s book catalog.</p>
        </div>

        <SectionCard title="Book Management" icon={BookOpen}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <Button size="sm" className="gap-1.5" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {showAddForm ? 'Cancel' : 'Add New Book'}
            </Button>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {showAddForm && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-4">
              <h3 className="text-[13px] font-bold text-slate-800 mb-3">Add New Book</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">Title</label>
                  <Input placeholder="Book title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="h-9" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">Author</label>
                  <Input placeholder="Author name" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="h-9" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">ISBN</label>
                  <Input placeholder="978-..." value={newIsbn} onChange={(e) => setNewIsbn(e.target.value)} className="h-9" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  >
                    {categories.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">Copies</label>
                  <Input type="number" min="1" value={newCopies} onChange={(e) => setNewCopies(e.target.value)} className="h-9" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-500">Shelf Location</label>
                  <Input placeholder="e.g. A3-01" value={newShelf} onChange={(e) => setNewShelf(e.target.value)} className="h-9" />
                </div>
              </div>
              <Button className="mt-3" size="sm">Save Book</Button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ISBN</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-center py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Copies</th>
                  <th className="text-center py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Available</th>
                  <th className="text-left py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Shelf</th>
                  <th className="text-right py-2.5 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-medium text-[13px] text-slate-800 max-w-[200px] truncate">{book.title}</td>
                    <td className="py-3 px-3 text-[12px] text-slate-600">{book.author}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-500 font-mono">{book.isbn}</td>
                    <td className="py-3 px-3">
                      <Badge variant="info">{book.category}</Badge>
                    </td>
                    <td className="py-3 px-3 text-center text-[13px] font-bold text-slate-700">{book.copies}</td>
                    <td className="py-3 px-3 text-center text-[13px] font-bold text-slate-700">{book.available}</td>
                    <td className="py-3 px-3 text-[12px] text-slate-600 font-mono">{book.shelfLocation || 'N/A'}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                          <Edit3 className="h-3 w-3" /> Edit
                        </Button>
                        <Button variant="ghost" size="xs" className="gap-1 text-[11px]">
                          <Copy className="h-3 w-3" /> Copies
                        </Button>
                        <Button variant="ghost" size="xs" className="gap-1 text-[11px] text-red-500 hover:text-red-600 hover:bg-red-50">
                          <AlertTriangle className="h-3 w-3" /> Damaged
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBooks.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400">No books match your search.</div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
