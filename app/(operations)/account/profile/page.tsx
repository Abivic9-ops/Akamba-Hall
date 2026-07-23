'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'
import { update_profile_action, type UserProfile } from '@/lib/actions/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { role_display_names, role_badge_colors } from '@/lib/types/role'
import type { Role } from '@/lib/types/role'
import {
  User, Mail, Hash, Shield, Calendar, Save, Loader2,
  AlertTriangle, CheckCircle2, ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, role } = useAuth()
  const [full_name, set_full_name] = useState('')
  const [student_id, set_student_id] = useState('')
  const [error, set_error] = useState<string | null>(null)
  const [success, set_success] = useState(false)
  const [loading, set_loading] = useState(false)

  useEffect(() => {
    if (user) {
      set_full_name(user.fullName ?? '')
      set_student_id(user.studentId ?? '')
    }
  }, [user])

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    set_loading(true)
    set_error(null)
    set_success(false)

    const result = await update_profile_action(user.id, {
      fullName: full_name,
      studentId: student_id,
    })

    if (!result.success) {
      set_error(result.error ?? 'Failed to update profile.')
      set_loading(false)
      return
    }

    set_success(true)
    set_loading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224] flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] animate-spin" />
      </div>
    )
  }

  const display_role = role ? role_display_names[role as Role] : 'User'
  const badge = role ? role_badge_colors[role as Role] : { bg: 'bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06]', text: 'text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8]' }
  const initials = (user.fullName ?? 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] dark:bg-[#071224]">
      <div className="max-w-[640px] mx-auto px-6 py-10">
        {/* back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] font-light hover:text-slate-600 dark:hover:text-slate-300 dark:text-[#94A3B8] dark:hover:text-slate-300 dark:text-[#94A3B8] transition-colors mb-6">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>

        {/* header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="h-16 w-16 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[16px] font-medium text-white shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-[22px] font-light text-[#0B1A3B] dark:text-white dark:text-white">{user.fullName ?? 'User'}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.bg} ${badge.text}`}>
                {display_role}
              </span>
              <span className="text-[12px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] font-light">{user.email}</span>
            </div>
          </div>
        </div>

        {/* profile form */}
        <div className="rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] p-6 mb-6">
          <h2 className="text-[16px] font-light text-[#0B1A3B] dark:text-white dark:text-white mb-5">Personal Information</h2>

          <form onSubmit={handle_submit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="prof-name" className="text-[13px] font-light text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Full Name
              </Label>
              <Input
                id="prof-name"
                value={full_name}
                onChange={(e) => set_full_name(e.target.value)}
                className="h-11 bg-slate-50/80 dark:bg-white/[0.04] dark:bg-white/[0.04] border-slate-200 dark:border-white/10 dark:border-white/10 rounded-xl text-[14px] font-light focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[13px] font-light text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Email Address
              </Label>
              <Input
                value={user.email ?? ''}
                disabled
                className="h-11 bg-slate-50/80 dark:bg-white/[0.04] dark:bg-white/[0.04] border-slate-200 dark:border-white/10 dark:border-white/10 rounded-xl text-[14px] font-light text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="prof-sid" className="text-[13px] font-light text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] flex items-center gap-2">
                <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Student / Staff ID
              </Label>
              <Input
                id="prof-sid"
                value={student_id}
                onChange={(e) => set_student_id(e.target.value)}
                className="h-11 bg-slate-50/80 dark:bg-white/[0.04] dark:bg-white/[0.04] border-slate-200 dark:border-white/10 dark:border-white/10 rounded-xl text-[14px] font-light focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[13px] font-light text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Role
              </Label>
              <Input
                value={display_role}
                disabled
                className="h-11 bg-slate-50/80 dark:bg-white/[0.04] dark:bg-white/[0.04] border-slate-200 dark:border-white/10 dark:border-white/10 rounded-xl text-[14px] font-light text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-[13px] font-light text-slate-600 dark:text-[#94A3B8] dark:text-[#94A3B8] flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]" />
                Member Since
              </Label>
              <Input
                value={new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                disabled
                className="h-11 bg-slate-50/80 dark:bg-white/[0.04] dark:bg-white/[0.04] border-slate-200 dark:border-white/10 dark:border-white/10 rounded-xl text-[14px] font-light text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <p className="text-[12px] font-light">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <p className="text-[12px] font-light">Profile updated successfully.</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-medium text-[13px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 shadow-lg shadow-navy/20 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </div>

        {/* account info */}
        <div className="rounded-2xl border border-slate-100 dark:border-white/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] p-6">
          <h2 className="text-[16px] font-light text-[#0B1A3B] dark:text-white dark:text-white mb-4">Account Details</h2>
          <div className="space-y-3">
            {[
              { label: 'User ID', value: user.id.slice(0, 8) + '...' },
              { label: 'Status', value: user.status },
              { label: 'Member Type', value: user.memberType },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-[13px] text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] font-light">{item.label}</span>
                <span className="text-[13px] text-slate-700 dark:text-[#E2E8F0] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
