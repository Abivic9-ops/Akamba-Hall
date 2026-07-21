'use client'

import {
  CreditCard, Camera, Edit3, Save, Star,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const mockProfile = {
  fullName: 'Victor Otieno',
  email: 'victor.otieno@starehe.ac.ke',
  studentId: 'SBC-2024-0142',
  memberType: 'STUDENT',
  joinDate: '12 Jan 2024',
  membership: {
    tier: 'Gold Reader',
    points: 1240,
    nextTier: 'Platinum Scholar',
    nextTierPoints: 2000,
  },
  stats: {
    totalLoans: 47,
    currentLoans: 3,
    reservations: 2,
    eventsAttended: 8,
  },
}

export function ProfilePageClient() {
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(mockProfile.fullName)
  const [email, setEmail] = useState(mockProfile.email)

  const tierProgress = (mockProfile.membership.points / mockProfile.membership.nextTierPoints) * 100

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-6">

        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-medium text-slate-900">My Profile</h1>
            <p className="text-[15px] text-slate-500 mt-1">
              View and manage your library account details and membership information.
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-slate-200 text-[14px] font-normal text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* profile card */}
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[24px] font-normal text-white">
                  VO
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white hover:bg-[#1D4ED8] transition-colors">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <h2 className="text-[18px] font-medium text-slate-900 mt-3">{mockProfile.fullName}</h2>
              <p className="text-[13px] text-slate-500">{mockProfile.email}</p>
              <Badge variant="info" className="mt-2">{mockProfile.membership.tier}</Badge>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {Object.entries(mockProfile.stats).map(([key, value]) => (
                <div key={key} className="text-center p-3 rounded-lg bg-slate-50">
                  <p className="text-[20px] font-medium text-slate-900">{value}</p>
                  <p className="text-[12px] text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* details */}
          <div className="lg:col-span-2 space-y-6">

            {/* personal info */}
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="text-[16px] font-medium text-slate-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] text-slate-500 mb-1 block">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                  ) : (
                    <p className="text-[15px] text-slate-800">{mockProfile.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="text-[13px] text-slate-500 mb-1 block">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                  ) : (
                    <p className="text-[15px] text-slate-800">{mockProfile.email}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] text-slate-500 mb-1 block">Student ID</label>
                    <p className="text-[15px] text-slate-800">{mockProfile.studentId}</p>
                  </div>
                  <div>
                    <label className="text-[13px] text-slate-500 mb-1 block">Member Since</label>
                    <p className="text-[15px] text-slate-800">{mockProfile.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* membership tier */}
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-medium text-slate-900">Membership Tier</h3>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-[14px] text-slate-600">{mockProfile.membership.tier}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-slate-500">
                    {mockProfile.membership.points} / {mockProfile.membership.nextTierPoints} points
                  </span>
                  <span className="text-[13px] text-slate-500">
                    {mockProfile.membership.nextTierPoints - mockProfile.membership.points} points to {mockProfile.membership.nextTier}
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                    style={{ width: `${tierProgress}%` }}
                  />
                </div>
              </div>

              <p className="text-[13px] text-slate-400">
                Earn points by borrowing books, attending events, and participating in library programs.
              </p>
            </div>

            {/* QR card info */}
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="text-[16px] font-medium text-slate-900 mb-4">QR Access Card</h3>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-slate-800">{mockProfile.studentId}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[13px] text-slate-500">Active — Use at library entrance</span>
                  </div>
                </div>
                <button className="h-9 px-4 rounded-lg border border-slate-200 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
