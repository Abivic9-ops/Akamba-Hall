'use client'

import { useState } from 'react'
import {
  update_user_role,
  update_user_status,
  type UserListItem,
} from '@/lib/actions/users'
import {
  appoint_library_head,
  revoke_library_head,
} from '@/lib/actions/role-requests'
import { all_roles, role_display_names, role_badge_colors, type Role } from '@/lib/types/role'
import {
  Users, Shield, ChevronDown, Check,
  AlertTriangle, Search, ArrowUpDown,
  Crown, RotateCcw, Loader2,
} from 'lucide-react'

interface Props {
  users: UserListItem[]
  currentUserId: string
}

export default function UserManagement({ users: initialUsers, currentUserId }: Props) {
  const [users, setUsers] = useState(initialUsers)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')
  const [appointingUserId, setAppointingUserId] = useState<string | null>(null)

  const filtered = users.filter((u) => {
    const matchesSearch =
      search === '' ||
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.studentId?.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  function startEditing(user: UserListItem) {
    setEditingUserId(user.id)
    setSelectedRole(user.role)
    setMessage(null)
  }

  function cancelEditing() {
    setEditingUserId(null)
    setSelectedRole('')
  }

  async function saveRole(userId: string) {
    setSaving(true)
    setMessage(null)

    const result = await update_user_role(userId, selectedRole)

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: selectedRole as Role } : u))
      )
      setMessage({ type: 'success', text: 'Role updated successfully.' })
      setEditingUserId(null)
      setSelectedRole('')
    } else {
      setMessage({ type: 'error', text: result.error ?? 'Failed to update role.' })
    }

    setSaving(false)
  }

  async function toggleStatus(userId: string, currentStatus: string) {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    const result = await update_user_status(userId, newStatus)

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      )
    }
  }

  async function handleAppointHead(userId: string) {
    setAppointingUserId(userId)
    setMessage(null)

    const result = await appoint_library_head(userId)

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: 'LIBRARY_HEAD' as Role } : u))
      )
      setMessage({ type: 'success', text: 'Staff member appointed as Library Head.' })
    } else {
      setMessage({ type: 'error', text: result.error ?? 'Failed to appoint Library Head.' })
    }
    setAppointingUserId(null)
  }

  async function handleRevokeHead(userId: string) {
    setAppointingUserId(userId)
    setMessage(null)

    const result = await revoke_library_head(userId)

    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: 'STAFF' as Role } : u))
      )
      setMessage({ type: 'success', text: 'Library Head appointment revoked. User returned to Staff portal.' })
    } else {
      setMessage({ type: 'error', text: result.error ?? 'Failed to revoke Library Head.' })
    }
    setAppointingUserId(null)
  }

  return (
    <div className="space-y-6">
      {/* feedback message */}
      {message && (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[14px] font-normal ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-red-50 text-red-700 border border-red-100'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A63C]/30 focus:border-[#E8A63C] transition-all"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none h-11 pl-11 pr-8 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8A63C]/30 focus:border-[#E8A63C] transition-all cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            {all_roles.map((r) => (
              <option key={r} value={r}>
                {role_display_names[r]}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* user table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-[12px] font-normal text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-3 text-[12px] font-normal text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-[12px] font-normal text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-[12px] font-normal text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="text-right px-6 py-3 text-[12px] font-normal text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-[15px] text-slate-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const isEditing = editingUserId === user.id
                  const isSelf = user.id === currentUserId
                  const badge = role_badge_colors[user.role] ?? { bg: 'bg-slate-50', text: 'text-slate-600' }

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      {/* user info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <Users className="h-4 w-4 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-normal text-slate-800 truncate">
                              {user.fullName ?? 'Unnamed'}
                              {isSelf && (
                                <span className="ml-1.5 text-[12px] text-slate-400 font-light">(you)</span>
                              )}
                            </p>
                            <p className="text-[13px] text-slate-400 truncate">
                              {user.email ?? 'No email'}
                              {user.studentId && ` · ${user.studentId}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* role */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="relative">
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              className="appearance-none w-full pl-3 pr-8 py-2 rounded-lg border border-[#E8A63C] bg-white text-[13px] font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8A63C]/30"
                            >
                              {all_roles.map((r) => (
                                <option key={r} value={r}>
                                  {role_display_names[r]}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                          </div>
                        ) : (
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[13px] font-normal ${badge.bg} ${badge.text}`}>
                            {role_display_names[user.role]}
                          </span>
                        )}
                      </td>

                      {/* status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[13px] font-normal ${
                            user.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-600'
                              : user.status === 'SUSPENDED'
                                ? 'bg-red-50 text-red-600'
                                : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* joined */}
                      <td className="px-6 py-4">
                        <span className="text-[14px] text-slate-500">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* actions */}
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveRole(user.id)}
                              disabled={saving}
                              className="h-8 px-4 rounded-lg bg-[#E8A63C] text-white text-[13px] font-normal hover:bg-[#d49535] transition-colors disabled:opacity-50"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEditing}
                              disabled={saving}
                              className="h-8 px-4 rounded-lg bg-slate-100 text-slate-600 text-[13px] font-normal hover:bg-slate-200 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            {!isSelf && (
                              <>
                                {/* Appoint / Revoke Library Head */}
                                {(user.role === 'STAFF' || user.role === 'LIBRARY_HEAD') && (
                                  <>
                                    {user.role === 'STAFF' ? (
                                      <button
                                        onClick={() => handleAppointHead(user.id)}
                                        disabled={appointingUserId === user.id}
                                        className="h-8 px-4 rounded-lg bg-sky-50 text-sky-600 text-[13px] font-normal hover:bg-sky-100 transition-colors disabled:opacity-50"
                                        title="Appoint as Library Head"
                                      >
                                        {appointingUserId === user.id ? (
                                          <Loader2 className="h-3.5 w-3.5 inline mr-1 animate-spin" />
                                        ) : (
                                          <Crown className="h-3.5 w-3.5 inline mr-1" />
                                        )}
                                        Appoint Head
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleRevokeHead(user.id)}
                                        disabled={appointingUserId === user.id}
                                        className="h-8 px-4 rounded-lg bg-amber-50 text-amber-600 text-[13px] font-normal hover:bg-amber-100 transition-colors disabled:opacity-50"
                                        title="Revoke Library Head appointment"
                                      >
                                        {appointingUserId === user.id ? (
                                          <Loader2 className="h-3.5 w-3.5 inline mr-1 animate-spin" />
                                        ) : (
                                          <RotateCcw className="h-3.5 w-3.5 inline mr-1" />
                                        )}
                                        Revoke Head
                                      </button>
                                    )}
                                  </>
                                )}
                                <button
                                  onClick={() => startEditing(user)}
                                  className="h-8 px-4 rounded-lg bg-slate-100 text-slate-600 text-[13px] font-normal hover:bg-slate-200 transition-colors"
                                  title="Change role"
                                >
                                  <Shield className="h-3.5 w-3.5 inline mr-1" />
                                  Role
                                </button>
                                <button
                                  onClick={() => toggleStatus(user.id, user.status)}
                                  className={`h-8 px-4 rounded-lg text-[13px] font-normal transition-colors ${
                                    user.status === 'ACTIVE'
                                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                  }`}
                                  title={user.status === 'ACTIVE' ? 'Suspend user' : 'Activate user'}
                                >
                                  {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* footer count */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[13px] text-slate-400">
            Showing {filtered.length} of {users.length} users
          </p>
        </div>
      </div>
    </div>
  )
}
