'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/ui/section-card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { create_course, delete_course } from '@/lib/actions/resources'
import { GraduationCap, Plus, Trash2, CheckCircle2 } from 'lucide-react'

interface Course {
  id: string
  code: string
  name: string
  department: string
  formLevel: number | null
  materialCount: number
  instructor?: string | null
}

interface Props {
  courses: Course[]
}

export { LibraryHeadCoursesClient }

function LibraryHeadCoursesClient({ courses }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    code: '', name: '', department: '', formLevel: '1', instructor: '',
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await create_course({
        code: form.code,
        name: form.name,
        department: form.department,
        formLevel: parseInt(form.formLevel),
        instructor: form.instructor || undefined,
      })
      setSuccess('Course added successfully')
      setOpen(false)
      setForm({ code: '', name: '', department: '', formLevel: '1', instructor: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create course')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this course?')) return
    try {
      await delete_course(id)
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
            <div className="h-10 w-10 rounded-xl bg-[#E8A63C]/10 text-[#E8A63C] flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Courses</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Manage academic courses linked to the library</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> Add Course
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <SectionCard title={`All Courses (${courses.length})`} icon={GraduationCap}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Code</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Name</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Department</th>
                  <th className="text-center py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Form</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Instructor</th>
                  <th className="text-center py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Materials</th>
                  <th className="text-right py-2 px-3 font-medium text-slate-500 dark:text-[#6B7A99]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 dark:border-white/[0.04] hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-mono text-xs text-[#5B9BD5] font-semibold">{c.code}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">{c.name}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant="info">{c.department}</Badge>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-700 dark:text-[#94A3B8]">Form {c.formLevel ?? '—'}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-[#94A3B8]">{c.instructor || '—'}</td>
                    <td className="py-2.5 px-3 text-center text-slate-700 dark:text-[#94A3B8]">{c.materialCount}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {courses.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-8">No courses yet</p>
          )}
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Course Code *</Label>
                  <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="PHY 401" />
                </div>
                <div className="space-y-1.5">
                  <Label>Form Level *</Label>
                  <Select value={form.formLevel} onChange={(e) => setForm({ ...form, formLevel: e.target.value })}>
                    <option value="1">Form 1</option>
                    <option value="2">Form 2</option>
                    <option value="3">Form 3</option>
                    <option value="4">Form 4</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Course Name *</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Advanced Physics" />
              </div>
              <div className="space-y-1.5">
                <Label>Department *</Label>
                <Input required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Science, Business..." />
              </div>
              <div className="space-y-1.5">
                <Label>Instructor</Label>
                <Input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Mr. John Doe" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">Add Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
