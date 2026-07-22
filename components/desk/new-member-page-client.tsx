'use client'

import { useState } from 'react'
import { UserPlus, ChevronRight, ChevronLeft, Check, Users, AlertCircle } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'

const steps = ['Personal Info', 'Membership Details', 'Review & Confirm']

const recentRegistrations = [
  { id: 1, name: 'Wanjiku Kamau', email: 'wanjiku.kamau@akamba.ac.ke', role: 'Student', date: '22 Jul 2026', status: 'Active' },
  { id: 2, name: 'Otieno Ochieng', email: 'otieno.o@akamba.ac.ke', role: 'Staff', date: '21 Jul 2026', status: 'Active' },
  { id: 3, name: 'Amina Hassan', email: 'amina.h@akamba.ac.ke', role: 'Student', date: '21 Jul 2026', status: 'Pending' },
  { id: 4, name: 'Kipchoge Korir', email: 'kipchoge.k@akamba.ac.ke', role: 'Student', date: '20 Jul 2026', status: 'Active' },
]

interface FormData {
  fullName: string
  email: string
  phone: string
  dob: string
  studentId: string
  role: string
  memberType: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  dob?: string
  studentId?: string
  role?: string
  memberType?: string
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  studentId: '',
  role: '',
  memberType: '',
}

export function NewMemberPageClient() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: FormErrors = {}

    if (stepIndex === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.dob.trim()) newErrors.dob = 'Date of birth is required'
    } else if (stepIndex === 1) {
      if (!formData.studentId.trim()) newErrors.studentId = 'Student/Staff ID is required'
      if (!formData.role) newErrors.role = 'Role is required'
      if (!formData.memberType) newErrors.memberType = 'Member type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 2))
    }
  }

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FB]">
        <div className="max-w-[1200px] mx-auto p-6 space-y-5">
          <SectionCard title="Registration Complete" icon={Check}>
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Member Registered Successfully</h3>
              <p className="text-[13px] text-slate-500 mt-2">
                <strong>{formData.fullName}</strong> has been registered as a {formData.memberType} member.
              </p>
              <p className="text-[12px] text-slate-400 mt-1">Card Reference: AKB-{Math.floor(1000 + Math.random() * 9000)}</p>
              <button
                onClick={() => { setSubmitted(false); setFormData(initialFormData); setStep(0) }}
                className="mt-6 px-6 py-2 bg-[#2563EB] text-white rounded-lg text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                Register Another Member
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Recent Registrations" icon={Users}>
            <div className="space-y-0">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-[13px] font-medium text-slate-800">{reg.name}</p>
                    <p className="text-[11px] text-slate-400">{reg.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="info">{reg.role}</Badge>
                    <Badge variant={reg.status === 'Active' ? 'success' : 'warning'}>{reg.status}</Badge>
                    <span className="text-[11px] text-slate-400">{reg.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-[1200px] mx-auto p-6 space-y-5">

        <SectionCard title="Register New Member" icon={UserPlus}>
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2">
              {steps.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-colors ${
                      i < step ? 'bg-emerald-500 text-white' :
                      i === step ? 'bg-[#2563EB] text-white' :
                      'bg-slate-200 text-slate-500'
                    }`}>
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className={`text-[10px] mt-1 whitespace-nowrap ${i === step ? 'text-[#2563EB] font-medium' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-px w-16 mb-5 ${i < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Personal Info */}
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => updateField('fullName', e.target.value)}
                    placeholder="e.g. Wanjiku Kamau"
                    className={`w-full h-10 px-3 rounded-lg border ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="e.g. wanjiku@akamba.ac.ke"
                    className={`w-full h-10 px-3 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    placeholder="e.g. +254 712 345 678"
                    className={`w-full h-10 px-3 rounded-lg border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => updateField('dob', e.target.value)}
                    className={`w-full h-10 px-3 rounded-lg border ${errors.dob ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  />
                  {errors.dob && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.dob}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Membership Details */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Student / Staff ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={e => updateField('studentId', e.target.value)}
                    placeholder="e.g. AKM-2026-0142"
                    className={`w-full h-10 px-3 rounded-lg border ${errors.studentId ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  />
                  {errors.studentId && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.studentId}</p>}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={e => updateField('role', e.target.value)}
                    className={`w-full h-10 px-3 rounded-lg border ${errors.role ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  >
                    <option value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Library Assistant">Library Assistant</option>
                    <option value="Admin Staff">Admin Staff</option>
                  </select>
                  {errors.role && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.role}</p>}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1">Member Type</label>
                  <select
                    value={formData.memberType}
                    onChange={e => updateField('memberType', e.target.value)}
                    className={`w-full h-10 px-3 rounded-lg border ${errors.memberType ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-colors`}
                  >
                    <option value="">Select type</option>
                    <option value="Standard">Standard (5 books, 14 days)</option>
                    <option value="Premium">Premium (10 books, 21 days)</option>
                    <option value="Lifetime">Lifetime (Unlimited)</option>
                  </select>
                  {errors.memberType && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.memberType}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.fullName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Email</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.email || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Phone</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Date of Birth</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.dob || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Student/Staff ID</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.studentId || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Role</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.role || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Member Type</p>
                    <p className="text-[13px] font-medium text-slate-800 mt-1">{formData.memberType || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">Status</p>
                    <Badge variant="success" dot>Active</Badge>
                  </div>
                </div>
                <p className="text-[12px] text-slate-400 text-center">Please review the details above before submitting.</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-1.5 px-4 h-9 rounded-lg text-[13px] font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
              {step < 2 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 h-9 rounded-lg text-[13px] font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
                >
                  Continue <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-1.5 px-5 h-9 rounded-lg text-[13px] font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  <Check className="h-3.5 w-3.5" /> Confirm & Register
                </button>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Registrations" icon={Users}>
          <div className="space-y-0">
            {recentRegistrations.map((reg) => (
              <div key={reg.id} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-[13px] font-medium text-slate-800">{reg.name}</p>
                  <p className="text-[11px] text-slate-400">{reg.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="info">{reg.role}</Badge>
                  <Badge variant={reg.status === 'Active' ? 'success' : 'warning'}>{reg.status}</Badge>
                  <span className="text-[11px] text-slate-400">{reg.date}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  )
}
