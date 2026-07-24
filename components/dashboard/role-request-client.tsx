'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Send, CheckCircle2, XCircle, Clock, AlertTriangle,
  Loader2, Briefcase, GraduationCap, ChevronRight, Info
} from 'lucide-react'
import {
  submit_role_request,
  get_my_role_requests,
} from '@/lib/actions/role-requests'
import { getPromotableRoles } from '@/lib/config/role-requests'

interface RequestItem {
  id: string
  requestedRole: string
  reason: string | null
  status: string
  reviewNote: string | null
  createdAt: Date | string
  reviewedAt: Date | string | null
  reviewedBy: { id: string; fullName: string | null } | null
}

export function RoleRequestClient({ baseRole }: { baseRole: 'STUDENT' | 'STAFF' }) {
  const [roles, setRoles] = useState<{ role: string; label: string; portal: string }[]>([])
  const [selectedRole, setSelectedRole] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [loadingRequests, setLoadingRequests] = useState(true)

  useEffect(() => {
    setRoles(getPromotableRoles(baseRole))
    loadRequests()
  }, [baseRole])

  async function loadRequests() {
    setLoadingRequests(true)
    const data = await get_my_role_requests()
    setRequests(data as RequestItem[])
    setLoadingRequests(false)
  }

  async function handleSubmit() {
    if (!selectedRole) {
      setError('Please select a role to request.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    const result = await submit_role_request({ requestedRole: selectedRole, reason: reason || undefined })

    if (!result.success) {
      setError(result.error ?? 'Failed to submit request.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setSelectedRole('')
    setReason('')
    setLoading(false)
    await loadRequests()
  }

  const pendingRequest = requests.find(r => r.status === 'PENDING')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#0B1A3B] dark:text-white tracking-tight">
          Role Request
        </h1>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          {baseRole === 'STUDENT'
            ? 'Request a position on the Circulation Desk team.'
            : 'Request a role upgrade to serve in the library.'}
        </p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl px-4 py-3">
        <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
        <div className="text-[13px] text-blue-700 dark:text-blue-300 leading-relaxed">
          <p className="font-medium mb-1">How it works</p>
          <p>Select a role below and submit your request. The Library Head will review and either approve or reject your application. If approved, you will be moved to the new portal and lose access to your current one.</p>
        </div>
      </div>

      {/* Current Status */}
      {pendingRequest && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-[14px] font-semibold text-amber-800 dark:text-amber-300">
                Request Pending
              </p>
              <p className="text-[12px] text-amber-600 dark:text-amber-400 mt-0.5">
                You have a pending request for <span className="font-medium">{pendingRequest.requestedRole}</span>.
                The Library Head will review it soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Request Form */}
      <div className="bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 space-y-6">
        <h2 className="text-[16px] font-bold text-[#0B1A3B] dark:text-white">
          Submit a New Request
        </h2>

        {/* Available Roles */}
        <div className="space-y-3">
          <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
            Select the role you are requesting:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roles.map(({ role, label, portal }) => (
              <button
                key={role}
                onClick={() => { setSelectedRole(role); setError(null) }}
                disabled={!!pendingRequest || loading}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedRole === role
                    ? 'border-[#D4A017] bg-[#D4A017]/5 ring-1 ring-[#D4A017]/30'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  selectedRole === role ? 'bg-[#D4A017]/15 text-[#D4A017]' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                }`}>
                  {baseRole === 'STUDENT' ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#0B1A3B] dark:text-white">{label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{portal}</p>
                </div>
                {selectedRole === role && <CheckCircle2 className="h-5 w-5 text-[#D4A017] shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
            Reason (optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why are you requesting this role? Briefly describe your interest and qualifications."
            rows={3}
            disabled={!!pendingRequest || loading}
            className="w-full bg-slate-50/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] text-[#0B1A3B] dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors resize-none disabled:opacity-50"
          />
        </div>

        {/* Error / Success */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p className="text-[13px]">{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <p className="text-[13px]">Your request has been submitted successfully. The Library Head will review it shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading || !!pendingRequest || !selectedRole}
          className="h-11 px-6 rounded-xl font-semibold text-[13px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
          ) : (
            <><Send className="h-4 w-4" /> Submit Request</>
          )}
        </Button>
      </div>

      {/* Request History */}
      <div className="bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 space-y-4">
        <h2 className="text-[16px] font-bold text-[#0B1A3B] dark:text-white">
          Request History
        </h2>

        {loadingRequests ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <p className="text-[13px] text-slate-400 text-center py-8">No requests yet.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02]">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                  req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' :
                  req.status === 'PENDING' ? 'bg-amber-100 text-amber-600' :
                  req.status === 'REJECTED' ? 'bg-red-100 text-red-500' :
                  'bg-slate-100 text-slate-400'
                }`}>
                  {req.status === 'APPROVED' ? <CheckCircle2 className="h-4 w-4" /> :
                   req.status === 'PENDING' ? <Clock className="h-4 w-4" /> :
                   <XCircle className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0B1A3B] dark:text-white">
                    {req.requestedRole}
                    {req.status === 'APPROVED' && ' — Approved'}
                    {req.status === 'PENDING' && ' — Pending Review'}
                    {req.status === 'REJECTED' && ' — Rejected'}
                    {req.status === 'REVOKED' && ' — Revoked'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Submitted {new Date(req.createdAt).toLocaleDateString()}
                    {req.reviewedBy && ` · Reviewed by ${req.reviewedBy.fullName}`}
                  </p>
                  {req.reviewNote && (
                    <p className="text-[11px] text-slate-500 mt-1 italic">"{req.reviewNote}"</p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
