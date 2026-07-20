'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { reset_password_action } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft, ArrowRight, AlertTriangle, Loader2,
  CheckCircle2, Mail,
} from 'lucide-react'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const is_preview = supabase === null

  const [email, set_email] = useState('')
  const [error, set_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)
  const [sent, set_sent] = useState(false)

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    set_error(null)
    set_loading(true)

    if (is_preview) {
      set_sent(true)
      set_loading(false)
      return
    }

    const result = await reset_password_action(email)

    if (!result.success) {
      set_error(result.error ?? 'Failed to send reset email. Please try again.')
      set_loading(false)
      return
    }

    set_sent(true)
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

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-7 w-7 text-blue-500" />
              </div>
              <h2 className="text-[26px] font-light text-[#0B1A3B] tracking-tight">Check Your Email</h2>
              <p className="text-slate-400 text-[14px] font-light mt-2 leading-relaxed">
                {is_preview
                  ? 'Preview mode — reset email simulated.'
                  : <>We sent a password reset link to <span className="font-medium text-slate-600">{email}</span></>}
              </p>
              <p className="text-slate-400 text-[12px] font-light mt-4">
                Didn&apos;t receive the email?{' '}
                <button onClick={() => set_sent(false)} className="font-medium text-blue-500 hover:underline cursor-pointer">
                  Try again
                </button>
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-[30px] font-light text-[#0B1A3B] tracking-tight">Reset Password</h2>
                <p className="text-slate-400 text-[14px] font-light mt-1.5">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <form onSubmit={handle_submit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="reset-email" className="text-[13px] font-light text-slate-600">Email Address</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="john@starehe.org"
                      value={email}
                      onChange={(e) => set_email(e.target.value)}
                      className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                      required
                      autoComplete="email"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Reset Link
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
