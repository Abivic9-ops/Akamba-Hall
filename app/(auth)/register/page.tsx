'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { sign_up_action } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight, Eye, EyeOff, AlertTriangle, Loader2,
  CheckCircle2, ArrowLeft, BookOpen, Clock, QrCode,
} from 'lucide-react'

const benefits = [
  { icon: BookOpen, text: 'Browse and borrow from thousands of books and digital resources' },
  { icon: Clock, text: 'Reserve study rooms and reading spaces in advance' },
  { icon: QrCode, text: 'Use QR-based check-in for fast, contactless library access' },
]

export default function RegisterPage() {
  const supabase = createClient()
  const is_preview = supabase === null

  const [full_name, set_full_name] = useState('')
  const [email, set_email] = useState('')
  const [admission_number, set_admission_number] = useState('')
  const [password, set_password] = useState('')
  const [confirm_password, set_confirm_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [agreed, set_agreed] = useState(false)
  const [error, set_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)
  const [success, set_success] = useState(false)

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    set_error(null)

    if (password !== confirm_password) {
      set_error('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      set_error('Password must be at least 6 characters.')
      return
    }
    if (!agreed) {
      set_error('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    set_loading(true)

    if (is_preview) {
      set_success(true)
      set_loading(false)
      return
    }

    const result = await sign_up_action({ fullName: full_name, email, studentId: admission_number, password })

    if (!result.success) {
      set_error(result.error ?? 'Registration failed. Please try again.')
      set_loading(false)
      return
    }

    set_success(true)
    set_loading(false)
  }

  /* ─── Success State ───────────────────────────── */
  if (success) {
    return (
      <div className="min-h-screen w-full flex bg-white">
        <div className="hidden lg:flex w-[38%] relative overflow-hidden min-h-screen shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#071B4A] via-[#0B1F52] to-[#0B1829]">
            <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-overlay" priority />
          </div>
        </div>
        <div className="w-full lg:w-[62%] flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-[440px] text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-[28px] font-light text-[#0B1A3B] tracking-tight">Account Created</h2>
            <p className="text-slate-400 text-[14px] font-light mt-3 leading-relaxed">
              {is_preview
                ? 'Preview mode — registration simulated. You can now sign in.'
                : 'We sent a confirmation email to your inbox. Verify your email, then sign in to start using the library.'}
            </p>
            <Link href="/login">
              <Button className="mt-8 h-12 px-8 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] transition-all gap-2 cursor-pointer">
                Go to Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Registration Form ───────────────────────── */
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* ─── LEFT PANEL ──────────────────────────── */}
      <div className="hidden lg:flex w-[38%] relative overflow-hidden min-h-screen shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071B4A] via-[#0B1F52] to-[#0B1829]">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-overlay" priority />
        </div>

        <div className="relative z-10 flex flex-col w-full px-16 py-14">
          {/* logo */}
          <div className="flex items-center gap-4 mb-16">
            <div className="relative h-14 w-12 shrink-0">
              <Image src="/images/starehe-logo.png" alt="Starehe Boys' Centre" fill className="object-contain drop-shadow-lg" />
            </div>
            <div>
              <p className="text-white font-medium text-[16px] tracking-wide">STAREHE BOYS&apos; CENTRE</p>
              <p className="text-white/60 text-[13px] font-light">Akamba Hall Library</p>
              <p className="text-[#D4A017] text-[11px] font-light tracking-[0.2em] mt-1">KNOWLEDGE &middot; CHARACTER &middot; LEADERSHIP</p>
            </div>
          </div>

          {/* hero */}
          <div className="mb-12">
            <h1 className="text-white text-[40px] xl:text-[46px] font-light leading-[1.1] tracking-tight">
              Join the{' '}
              <span className="text-[#D4A017] font-medium">Library Community</span>
            </h1>
            <p className="text-white/40 text-[15px] font-light leading-relaxed mt-6 max-w-lg">
              Set up your account in under a minute. It is free for all Starehe students and staff.
            </p>
          </div>

          {/* benefits container */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-auto">
            <p className="text-white/30 text-[11px] font-medium tracking-[0.15em] uppercase mb-4">What you get</p>
            <ul className="flex flex-col gap-4">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-lg bg-[#D4A017]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon className="h-4 w-4 text-[#D4A017]" />
                  </div>
                  <p className="text-white/70 text-[14px] font-light leading-relaxed">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* testimonial */}
          <div className="mt-10">
            <p className="text-white/30 text-[13px] font-light italic leading-relaxed">
              &ldquo;Creating my account took less than a minute. I immediately started reserving study spaces.&rdquo;
            </p>
            <p className="text-white/20 text-[11px] font-light mt-2">— Starehe Student</p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ──────────────────────────── */}
      <div className="w-full lg:w-[62%] flex flex-col">
        <div className="flex-1 flex flex-col items-center px-8 sm:px-12 lg:px-16 py-10">
          <div className="w-full max-w-[440px]">
            {/* mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div className="relative h-10 w-9 shrink-0">
                <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-[#0B1A3B] font-medium text-[13px]">STAREHE BOYS&apos; CENTRE</p>
                <p className="text-slate-400 text-[11px] font-light">Akamba Hall Library</p>
              </div>
            </div>

            {/* back */}
            <Link href="/login" className="inline-flex items-center gap-1.5 text-[12px] text-slate-400 font-light hover:text-slate-600 transition-colors mb-6">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Sign In
            </Link>

            {/* header */}
            <div className="mb-6">
              <h2 className="text-[30px] font-light text-[#0B1A3B] tracking-tight">Create Account</h2>
              <p className="text-slate-400 text-[14px] font-light mt-1.5">
                Fill in your details below. It only takes a moment.
              </p>
            </div>

            {/* ── Form Card ───────────────────────── */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 mb-4">
              <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3 mb-4">
                <QrCode className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-blue-700 font-light leading-snug">
                  Your <span className="font-medium">QR Access Card</span> will be generated automatically upon registration.
                </p>
              </div>
              <form onSubmit={handle_submit} className="flex flex-col gap-4">
                {/* personal info section */}
                <div>
                  <p className="text-[11px] font-medium text-slate-400 tracking-[0.1em] uppercase mb-3">Personal Information</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-name" className="text-[13px] font-light text-slate-600">Full Name</Label>
                      <Input
                        id="reg-name"
                        placeholder="e.g. John Kamau"
                        value={full_name}
                        onChange={(e) => set_full_name(e.target.value)}
                        className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-email" className="text-[13px] font-light text-slate-600">Email Address</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="john@starehe.org"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-sid" className="text-[13px] font-light text-slate-600">Admission Number</Label>
                      <Input
                        id="reg-sid"
                        placeholder="e.g. 11876"
                        value={admission_number}
                        onChange={(e) => set_admission_number(e.target.value)}
                        className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* divider */}
                <div className="h-px bg-slate-100" />

                {/* security section */}
                <div>
                  <p className="text-[11px] font-medium text-slate-400 tracking-[0.1em] uppercase mb-3">Security</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-pw" className="text-[13px] font-light text-slate-600">Password</Label>
                      <div className="relative">
                        <Input
                          id="reg-pw"
                          type={show_password ? 'text' : 'password'}
                          placeholder="At least 6 characters"
                          value={password}
                          onChange={(e) => set_password(e.target.value)}
                          className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 pr-11 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                          required
                          minLength={6}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => set_show_password(!show_password)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                        >
                          {show_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="reg-cpw" className="text-[13px] font-light text-slate-600">Confirm Password</Label>
                      <Input
                        id="reg-cpw"
                        type={show_password ? 'text' : 'password'}
                        placeholder="Repeat your password"
                        value={confirm_password}
                        onChange={(e) => set_confirm_password(e.target.value)}
                        className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>

                {/* error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-[12px] font-light">{error}</p>
                  </motion.div>
                )}

                {/* terms */}
                <label className="flex items-start gap-2.5 cursor-pointer group -mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => set_agreed(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#D4A017] cursor-pointer mt-0.5"
                  />
                  <span className="text-[11px] text-slate-400 font-light leading-relaxed group-hover:text-slate-600 transition-colors">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-blue-500 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="font-medium text-blue-500 hover:underline">Privacy Policy</a>
                  </span>
                </label>

                {/* submit */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 shadow-lg shadow-navy/20 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* sign in link */}
            <div className="text-center">
              <p className="text-[13px] text-slate-400 font-light">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-[#0B1A3B] hover:text-[#D4A017] transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="shrink-0 border-t border-slate-100 px-8 py-3 flex items-center justify-between">
          <p className="text-slate-400 text-[11px] font-light">
            Mon–Fri 7:30 AM – 6:00 PM &middot; Sat 8:00 AM – 1:00 PM
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-light">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Help</a>
          </div>
        </div>
      </div>
    </div>
  )
}
