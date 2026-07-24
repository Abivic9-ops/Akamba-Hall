'use client'

import { useState, useEffect } from 'react'
import {
  get_role_requests,
  approve_role_request,
  reject_role_request,
  revoke_role_promotion,
} from '@/lib/actions/role-requests'
import { role_display_names, role_badge_colors } from '@/lib/types/role'
import {
  CheckCircle2, XCircle, Clock, RotateCcw,
  Loader2, User, Filter, ChevronRight,
} from 'lucide-react'

interface RequestItem {
  id: string
  requestedRole: string
  reason: string | null
  status: string
  reviewNote: string | null
  createdAt: Date | string
  reviewedAt: Date | string | null
  user: { id: string; fullName: string | null; studentId: string | null; role: string; memberType: string }
  reviewedBy: { id: string; fullName: string | null } | null
}

const statusTabs = [
  { key: 'PENDING', label: 'Pending', icon: Clock, color: 'text-amber-600' },
  { key: 'APPROVED', label: 'Approved', icon: CheckCircle2, color: 'text-emerald-600' },
  { key: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'text-red-500' },
  { key: 'REVOKED', label: 'Revoked', icon: RotateCcw, color: 'text-slate-500' },
] as const

export function ApprovalQueueClient() {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>('PENDING')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [reviewNote, setReviewNote] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    loadRequests()
  }, [activeTab])

  async function loadRequests() {
    setLoading(true)
    const data = await get_role_requests(activeTab as any)
    setRequests(data as RequestItem[])
    setLoading(false)
  }

  async function handleApprove(requestId: string) {
    setActionLoading(requestId)
    const result = await approve_role_request(requestId, reviewNote || undefined)
    if (result.success) {
      await loadRequests()
    }
    setActionLoading(null)
    setReviewNote('')
    setExpandedId(null)
  }

  async function handleReject(requestId: string) {
    setActionLoading(requestId)
    const result = await reject_role_request(requestId, reviewNote || undefined)
    if (result.success) {
      await loadRequests()
    }
    setActionLoading(null)
    setReviewNote('')
    setExpandedId(null)
  }

  async function handleRevoke(requestId: string) {
    if (!confirm('Are you sure you want to revoke this promotion? The user will lose access to their current portal.')) return
    setActionLoading(requestId)
    const result = await revoke_role_promotion(requestId)
    if (result.success) {
      await loadRequests()
    }
    setActionLoading(null)
    setExpandedId(null)
  }

  const pendingCount = requests.filter(r => r.status === 'PENDING').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#0B1A3B] dark:text-white tracking-tight">
          Approval Queue
        </h1>
        <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-1">
          Review and manage role promotion requests from students and staff.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statusTabs.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              activeTab === key
                ? 'border-[#D4A017] bg-[#D4A017]/5 ring-1 ring-[#D4A017]/20'
                : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              activeTab === key ? 'bg-[#D4A017]/15' : 'bg-slate-100 dark:bg-white/5'
            }`}>
              <Icon className={`h-5 w-5 ${activeTab === key ? 'text-[#D4A017]' : color}`} />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-[#0B1A3B] dark:text-white">{label}</p>
              <p className="text-[11px] text-slate-400">requests</p>
            </div>
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 text-slate-300 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-12 text-center">
            <Clock className="h-12 w-12 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-[14px] font-medium text-slate-400">No {activeTab.toLowerCase()} requests</p>
          </div>
        ) : (
          requests.map((req) => {
            const badge = role_badge_colors[req.requestedRole as keyof typeof role_badge_colors] ?? { bg: 'bg-slate-50', text: 'text-slate-600' }
            const isExpanded = expandedId === req.id

            return (
              <div
                key={req.id}
                className="bg-white dark:bg-[#0E1F3F] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden"
              >
                {/* Request Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="h-11 w-11 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[14px] font-semibold text-[#0B1A3B] dark:text-white truncate">
                        {req.user.fullName ?? 'Unknown User'}
                      </p>
                      <span className="text-[11px] text-slate-400">{req.user.studentId}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text}`}>
                        {role_display_names[req.requestedRole as keyof typeof role_display_names] ?? req.requestedRole}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-1">
                      Requested {new Date(req.createdAt).toLocaleDateString()}
                      {req.user.memberType === 'STUDENT' ? ' · Student' : ' · Staff'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {req.status === 'PENDING' && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
                        Pending
                      </span>
                    )}
                    {req.status === 'APPROVED' && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
                        Approved
                      </span>
                    )}
                    {req.status === 'REJECTED' && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-500">
                        Rejected
                      </span>
                    )}
                    {req.status === 'REVOKED' && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        Revoked
                      </span>
                    )}
                    <ChevronRight className={`h-4 w-4 text-slate-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-white/[0.06] px-5 py-4 space-y-4">
                    {req.reason && (
                      <div>
                        <p className="text-[12px] font-medium text-slate-500 mb-1">Reason</p>
                        <p className="text-[13px] text-[#0B1A3B] dark:text-slate-200 bg-slate-50 dark:bg-white/[0.03] rounded-lg px-3 py-2">
                          {req.reason}
                        </p>
                      </div>
                    )}

                    {req.reviewNote && (
                      <div>
                        <p className="text-[12px] font-medium text-slate-500 mb-1">Review Note</p>
                        <p className="text-[13px] text-[#0B1A3B] dark:text-slate-200 italic">
                          &ldquo;{req.reviewNote}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Actions for pending requests */}
                    {req.status === 'PENDING' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[12px] font-medium text-slate-500 mb-1 block">
                            Review Note (optional)
                          </label>
                          <input
                            type="text"
                            value={actionLoading === req.id ? reviewNote : ''}
                            onChange={(e) => setReviewNote(e.target.value)}
                            placeholder="Add a note for the requester..."
                            className="w-full bg-slate-50/80 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-[13px] text-[#0B1A3B] dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleApprove(req.id)}
                            disabled={actionLoading === req.id}
                            className="h-9 px-5 rounded-lg bg-emerald-500 text-white text-[13px] font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {actionLoading === req.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            disabled={actionLoading === req.id}
                            className="h-9 px-5 rounded-lg bg-red-50 text-red-600 text-[13px] font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Revoke action for approved requests */}
                    {req.status === 'APPROVED' && (
                      <button
                        onClick={() => handleRevoke(req.id)}
                        disabled={actionLoading === req.id}
                        className="h-9 px-5 rounded-lg bg-amber-50 text-amber-600 text-[13px] font-semibold hover:bg-amber-100 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Revoke Promotion
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
