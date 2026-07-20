'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight, Eye, EyeOff, AlertTriangle, Upload,
  QrCode, Loader2, CheckCircle2,
} from 'lucide-react'

interface login_form_props {
  mode: 'qr' | 'student' | 'email'
}

export function LoginForm({ mode }: login_form_props) {
  const [identifier, set_identifier] = useState('')
  const [password, set_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [remember, set_remember] = useState(false)
  const [error, set_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)
  const [qr_scanning, set_qr_scanning] = useState(false)
  const file_ref = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const supabase = createClient()
  const is_preview = supabase === null

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()

    if (is_preview) {
      router.push('/')
      return
    }

    set_loading(true)
    set_error(null)

    let email: string

    if (mode === 'email') {
      email = identifier
    } else {
      email = identifier.includes('@') ? identifier : `${identifier}@akambahall.local`
    }

    const { error: auth_error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })

    if (auth_error) {
      set_error(auth_error.message)
      set_loading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  function handle_qr_upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    set_qr_scanning(true)
    // simulate QR decode delay
    setTimeout(() => {
      set_qr_scanning(false)
      // In production, decode QR here and set identifier
      set_identifier('QR-DECODED-ID')
    }, 1500)
  }

  const placeholders: Record<string, { id: string; pw: string }> = {
    qr: { id: 'Scan or upload your QR card', pw: '••••••••' },
    student: { id: 'e.g. 11876 or your admission number', pw: '••••••••' },
    email: { id: 'e.g. john@starehe.org', pw: '••••••••' },
  }

  return (
    <form onSubmit={handle_submit} className="flex flex-col gap-4">
      {/* preview mode banner */}
      {is_preview && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <span className="text-[12px] font-bold text-amber-800 block">UI Preview Mode</span>
            <span className="text-[11px] text-amber-700 leading-snug">
              Supabase not configured. Click Sign In to preview the dashboard.
            </span>
          </div>
        </div>
      )}

      {/* QR mode */}
      {mode === 'qr' && (
        <div className="flex flex-col items-center gap-5 py-4">
          <p className="text-[13px] font-semibold text-slate-700">Scan your QR Code</p>
          <p className="text-[12px] text-slate-400 -mt-3">Position your QR card inside the frame.</p>

          {/* animated scan frame */}
          <div className="relative h-48 w-48 rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50/50 flex items-center justify-center overflow-hidden">
            {/* corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#0B1A3B] rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#0B1A3B] rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#0B1A3B] rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#0B1A3B] rounded-br-2xl" />

            {/* scan line animation */}
            {qr_scanning && (
              <motion.div
                className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                animate={{ y: [-70, 70, -70] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {qr_scanning ? (
              <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-300">
                <QrCode className="h-12 w-12" />
                <span className="text-[11px]">No QR detected</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <input
            ref={file_ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handle_qr_upload}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 border-dashed border-slate-200 text-slate-600 font-semibold text-[13px] hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all gap-2 cursor-pointer"
            onClick={() => file_ref.current?.click()}
            disabled={qr_scanning}
          >
            <Upload className="h-4 w-4" />
            Upload QR Image
          </Button>

          <p className="text-[11px] text-slate-400 text-center">
            Having trouble?{' '}
            <button type="button" onClick={() => {}} className="text-blue-500 font-semibold hover:underline cursor-pointer">
              Use Student ID Login
            </button>
          </p>
        </div>
      )}

      {/* student / email mode */}
      {mode !== 'qr' && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-id" className="text-[13px] font-semibold text-[#0B1A3B]">
              {mode === 'student' ? 'Student / Staff ID' : 'Email Address'}
            </Label>
            <div className="relative">
              <Input
                id="login-id"
                placeholder={placeholders[mode].id}
                value={identifier}
                onChange={(e) => set_identifier(e.target.value)}
                className="h-12 bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                required={!is_preview}
                disabled={is_preview}
                autoComplete={mode === 'email' ? 'email' : 'username'}
              />
              {identifier && !is_preview && (
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="login-pw" className="text-[13px] font-semibold text-[#0B1A3B]">
                Password
              </Label>
              <Link href="/forgot-password" className="text-[11px] text-blue-500 font-semibold hover:underline">
                Forgot credentials?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="login-pw"
                type={show_password ? 'text' : 'password'}
                placeholder={placeholders[mode].pw}
                value={password}
                onChange={(e) => set_password(e.target.value)}
                className="h-12 bg-slate-50 border-slate-200 rounded-xl text-[14px] pr-10 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
                required={!is_preview}
                disabled={is_preview}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => set_show_password(!show_password)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {show_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </>
      )}

      {/* error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <p className="text-[12px] font-medium">{error}</p>
        </motion.div>
      )}

      {/* submit button */}
      {mode !== 'qr' && (
        <Button
          type="submit"
          className="w-full h-12 rounded-2xl font-bold text-[14px] bg-[#0B1A3B] text-white hover:bg-[#13285A] active:scale-[0.98] transition-all gap-2 mt-1 shadow-lg shadow-navy/20 cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : is_preview ? (
            <>
              <Eye className="h-4 w-4" />
              Preview Dashboard
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      )}

      {/* remember me (student/email modes only) */}
      {mode !== 'qr' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => set_remember(e.target.checked)}
                className="sr-only peer"
              />
              <div className="h-4 w-4 rounded border-2 border-slate-300 peer-checked:border-[#D4A017] peer-checked:bg-[#D4A017] transition-colors flex items-center justify-center">
                {remember && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
            </div>
            <span className="text-[12px] text-slate-500 group-hover:text-slate-700 transition-colors">
              Remember this device
            </span>
          </label>
        </div>
      )}
    </form>
  )
}
