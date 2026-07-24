'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { lookup_qr_user, qr_sign_in_action } from '@/lib/actions/auth'
import {
  ArrowRight, Eye, EyeOff, AlertTriangle, Loader2,
  CheckCircle2, ArrowLeft, QrCode, User,
} from 'lucide-react'

export default function QRLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="h-8 w-8 animate-spin text-[#D4A017]" /></div>}>
      <QRLoginContent />
    </Suspense>
  )
}

function QRLoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const ref = searchParams.get('ref')

  const [step, set_step] = useState<'loading' | 'not-found' | 'confirm' | 'error'>(() => ref ? 'loading' : 'not-found')
  const [fullName, set_fullName] = useState('')
  const [cardRef, set_cardRef] = useState('')
  const [password, set_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [login_error, set_login_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)

  useEffect(() => {
    if (!ref) return

    let cancelled = false
    lookup_qr_user(ref).then((result) => {
      if (cancelled) return
      if (result.found) {
        set_fullName(result.fullName ?? '')
        set_cardRef(result.cardRef ?? '')
        set_step('confirm')
      } else {
        set_step('not-found')
      }
    })

    return () => { cancelled = true }
  }, [ref])

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    if (!ref) return

    set_loading(true)
    set_login_error(null)

    const result = await qr_sign_in_action({ cardRef: ref, password })

    if (!result.success) {
      set_login_error(result.error ?? 'Sign in failed. Please try again.')
      set_loading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* ─── LEFT PANEL ───────────────────────────── */}
      <div className="hidden lg:flex w-[38%] relative overflow-hidden min-h-screen shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071B4A] via-[#0B1F52] to-[#0B1829]">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-overlay" priority />
        </div>

        <div className="relative z-10 flex flex-col w-full px-16 py-14">
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

          <div className="mb-12">
            <h1 className="text-white text-[40px] xl:text-[46px] font-light leading-[1.1] tracking-tight">
              QR Code{' '}
              <span className="text-[#D4A017] font-medium">Login</span>
            </h1>
            <p className="text-white/40 text-[15px] font-light leading-relaxed mt-6 max-w-lg">
              Enter your password to securely access your library account.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-[#D4A017]/10 flex items-center justify-center shrink-0">
                <QrCode className="h-4 w-4 text-[#D4A017]" />
              </div>
              <p className="text-white/70 text-[14px] font-light">Secure QR based authentication</p>
            </div>
            <p className="text-white/30 text-[13px] font-light leading-relaxed">
              Your QR code identifies your account. Only your password can grant access — keeping your data safe even if someone else scans your code.
            </p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ──────────────────────────── */}
      <div className="w-full lg:w-[62%] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16 py-10">
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

            <AnimatePresence mode="wait">
              {/* ── Loading ──────────────────────────── */}
              {step === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <Loader2 className="h-8 w-8 text-[#D4A017] animate-spin mx-auto mb-4" />
                  <p className="text-[14px] text-slate-400 font-light">Verifying QR card...</p>
                </motion.div>
              )}

              {/* ── Not Found ───────────────────────── */}
              {step === 'not-found' && (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-center py-16"
                >
                  <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                  <h2 className="text-[28px] font-light text-[#0B1A3B] tracking-tight">Invalid QR Code</h2>
                  <p className="text-slate-400 text-[14px] font-light mt-3 leading-relaxed max-w-sm mx-auto">
                    This QR code is not recognized or has been deactivated. Please contact the library desk for assistance.
                  </p>
                  <Link href="/login">
                    <Button className="mt-8 h-12 px-8 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] transition-all gap-2 cursor-pointer">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Sign In
                    </Button>
                  </Link>
                </motion.div>
              )}

              {/* ── Password Confirmation ────────────── */}
              {step === 'confirm' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Link href="/login" className="text-[12px] text-slate-400 font-light hover:text-slate-600 transition-colors">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                    <p className="text-[12px] text-slate-400 font-light">QR Login</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-[30px] font-light text-[#0B1A3B] tracking-tight">Confirm Identity</h2>
                    <p className="text-slate-400 text-[14px] font-light mt-1.5">
                      Enter your password to access the portal.
                    </p>
                  </div>

                  {/* User info card */}
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-[#0B1A3B] flex items-center justify-center text-[13px] font-medium text-white shrink-0">
                      {initials || <User className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-[#0B1A3B] truncate">{fullName}</p>
                      <p className="text-[12px] text-slate-400">{cardRef}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 ml-auto shrink-0" />
                  </div>

                  {/* Password form */}
                  <div className="rounded-2xl border border-slate-100 bg-white p-6">
                    <form onSubmit={handle_submit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="qr-pw" className="text-[13px] font-light text-slate-600">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="qr-pw"
                            type={show_password ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => set_password(e.target.value)}
                            className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 pr-11 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                            required
                            autoComplete="current-password"
                            autoFocus
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

                      {login_error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5"
                        >
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                          <p className="text-[12px] font-light">{login_error}</p>
                        </motion.div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 shadow-lg shadow-navy/20 cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>

                  <p className="text-[12px] text-slate-400 font-light text-center mt-4">
                    Not your account?{' '}
                    <Link href="/login" className="font-medium text-blue-500 hover:underline">
                      Use a different login method
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
