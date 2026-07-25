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
import { create_event, delete_event } from '@/lib/actions/events'
import { CalendarCheck, Plus, Trash2, MapPin, Users, CheckCircle2 } from 'lucide-react'

interface Event {
  id: string
  title: string
  description?: string | null
  venue?: string | null
  startTime: string
  endTime: string
  category: string
  maxAttendees?: number | null
}

const CATEGORIES = ['GENERAL', 'WORKSHOP', 'FAIR', 'MEETING', 'CLUB', 'TRAINING']

interface Props {
  events: Event[]
}

export { LibraryHeadEventsClient }

function LibraryHeadEventsClient({ events }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    title: '', description: '', venue: '', category: 'GENERAL',
    startDate: '', startTime: '', endDate: '', endTime: '',
    maxAttendees: '',
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const start = new Date(`${form.startDate}T${form.startTime || '09:00'}`)
      const end = new Date(`${form.endDate}T${form.endTime || '17:00'}`)
      await create_event({
        title: form.title,
        description: form.description || undefined,
        venue: form.venue || undefined,
        startTime: start,
        endTime: end,
        maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : undefined,
      })
      setSuccess('Event created successfully')
      setOpen(false)
      setForm({ title: '', description: '', venue: '', category: 'GENERAL', startDate: '', startTime: '', endDate: '', endTime: '', maxAttendees: '' })
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create event')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this event?')) return
    try {
      await delete_event(id)
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
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">Events</h1>
              <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Create and manage library events</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white hover:bg-[#0B1B3D]/90">
            <Plus className="h-4 w-4 mr-1.5" /> New Event
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> {success}
          </div>
        )}

        <SectionCard title={`All Events (${events.length})`} icon={CalendarCheck}>
          <div className="space-y-3">
            {events.map((ev) => {
              const isPast = new Date(ev.endTime) < new Date()
              return (
                <div key={ev.id} className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${isPast ? 'bg-slate-50/30 dark:bg-white/[0.01] border-slate-100 dark:border-white/[0.04] opacity-60' : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-100 dark:border-white/[0.06]'}`}>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{ev.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-[#6B7A99]">
                      <span>{new Date(ev.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(ev.endTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      {ev.venue && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.venue}</span>}
                      {ev.maxAttendees && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.maxAttendees} max</span>}
                    </div>
                    {ev.description && <p className="text-xs text-slate-400 dark:text-white/30 mt-1 line-clamp-1">{ev.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={isPast ? 'neutral' : 'info'}>{ev.category}</Badge>
                    <Button variant="destructive" size="icon-xs" onClick={() => handleDelete(ev.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )
            })}
            {events.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-8">No events yet</p>
            )}
          </div>
        </SectionCard>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="space-y-1.5">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Start Date *</Label>
                  <Input type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Start Time</Label>
                  <Input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>End Date *</Label>
                  <Input type="date" required value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>End Time</Label>
                  <Input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Venue</Label>
                  <Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="AVR, Boardroom..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Max Attendees</Label>
                  <Input type="number" min="1" value={form.maxAttendees} onChange={(e) => setForm({ ...form, maxAttendees: e.target.value })} placeholder="30" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Event description..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0B1B3D] dark:bg-[#5B9BD5] text-white">Create Event</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
