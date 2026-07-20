'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { update_password_action } from '@/lib/actions/auth'
import {
  ArrowRight, Eye, EyeOff, AlertTriangle, Loader2,
  CheckCircle2, ArrowLeft,
} from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [new_password, set_new_password] = useState('')
  const [confirm_password, set_confirm_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [error, set_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)
  const [success, set_success] = useState(false)

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    set_error(null)

    if (new_password !== confirm_password) {
      set_error('Passwords do not match.')
      return
    }

    if (new_password.length < 6) {
      set_error('Password must be at least 6 characters.')
      return
    }

    set_loading(true)

    const result = await update_password_action(new_password)

    if (!result.success) {
      set_error(result.error ?? 'Failed to update password. Please try again.')
      set_loading(false)
      return
    }

    set_success(true)
    set_loading(false)
  }

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      {/* left panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071B4A] via-[#0B1F52] to-[#0B1829]">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover opacity-15 mix-blend-overlay" priority />
        </div>
      </div>

      {/* right panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 sm:px-12 lg:px-16">
        <div className="w-full max-w-[400px]">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-[12px] text-slate-400 font-light hover:text-slate-600 transition-colors mb-6">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h2 className="text-[26px] font-light text-[#0B1A3B] tracking-tight">Password Updated</h2>
              <p className="text-slate-400 text-[14px] font-light mt-2 leading-relaxed">
                Your password has been changed successfully. You can now sign in with your new password.
              </p>
              <Button
                onClick={() => router.push('/login')}
                className="mt-8 h-12 px-8 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] transition-all gap-2 cursor-pointer"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-[30px] font-light text-[#0B1A3B] tracking-tight">New Password</h2>
                <p className="text-slate-400 text-[14px] font-light mt-1.5">
                  Enter your new password below.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <form onSubmit={handle_submit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="new-pw" className="text-[13px] font-light text-slate-600">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-pw"
                        type={show_password ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={new_password}
                        onChange={(e) => set_new_password(e.target.value)}
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

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="confirm-pw" className="text-[13px] font-light text-slate-600">Confirm Password</Label>
                    <Input
                      id="confirm-pw"
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

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl font-medium text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 shadow-lg shadow-navy/20 cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Update Password
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
