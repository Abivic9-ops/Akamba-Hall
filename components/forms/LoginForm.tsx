'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import jsQR from 'jsqr'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { sign_in_action } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowRight, Eye, EyeOff, AlertTriangle, Upload,
  QrCode, Loader2, CheckCircle2,
} from 'lucide-react'

interface login_form_props {
  mode: 'email' | 'student' | 'qr'
  on_switch_tab?: (tab: 'email' | 'student' | 'qr') => void
}

export function LoginForm({ mode, on_switch_tab }: login_form_props) {
  const [identifier, set_identifier] = useState('')
  const [password, set_password] = useState('')
  const [show_password, set_show_password] = useState(false)
  const [remember, set_remember] = useState(false)
  const [error, set_error] = useState<string | null>(null)
  const [loading, set_loading] = useState(false)
  const [qr_scanning, set_qr_scanning] = useState(false)
  const [qr_found, set_qr_found] = useState(false)
  const file_ref = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const supabase = createClient()
  const is_preview = supabase === null

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault()
    if (is_preview) { router.push('/'); return }

    set_loading(true)
    set_error(null)

    const result = await sign_in_action({
      identifier,
      password,
      mode: mode as 'email' | 'student',
    })

    if (!result.success) {
      set_error(result.error ?? 'Sign in failed. Please try again.')
      set_loading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  /* Decode QR from uploaded image and redirect to /qr-login */
  const handle_qr_upload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    set_qr_scanning(true)
    set_error(null)

    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        set_qr_scanning(false)
        set_error('Failed to read QR image.')
        return
      }

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, canvas.width, canvas.height)

      if (code?.data) {
        set_qr_found(true)
        try {
          const url = new URL(code.data)
          const ref = url.searchParams.get('ref')
          if (ref) {
            router.push(`/qr-login?ref=${encodeURIComponent(ref)}`)
            return
          }
        } catch {
          // Not a valid URL — treat raw data as a card reference
          router.push(`/qr-login?ref=${encodeURIComponent(code.data.trim())}`)
          return
        }
        set_qr_scanning(false)
        set_error('QR code does not contain a valid login link.')
      } else {
        set_qr_scanning(false)
        set_error('No QR code detected in the image. Try a clearer photo.')
      }
    }

    img.onerror = () => {
      set_qr_scanning(false)
      set_error('Failed to load the image.')
    }

    img.src = URL.createObjectURL(file)
    // reset file input so the same file can be re-selected
    e.target.value = ''
  }, [router])

  /* ─── QR MODE ────────────────────────────────── */
  if (mode === 'qr') {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex flex-col items-center gap-5">
          <div className="text-center">
            <p className="text-[16px] font-light text-[#0B1A3B]">Scan your QR Code</p>
            <p className="text-[13px] text-slate-400 font-light mt-1">Point your camera at the QR card, or upload an image.</p>
          </div>

          <div className="relative h-44 w-44 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-7 h-7 border-t-[3px] border-l-[3px] border-[#0B1A3B] rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-7 h-7 border-t-[3px] border-r-[3px] border-[#0B1A3B] rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-[#0B1A3B] rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-7 h-7 border-b-[3px] border-r-[3px] border-[#0B1A3B] rounded-br-xl" />

            {qr_scanning && (
              <motion.div
                className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                animate={{ y: [-65, 65, -65] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {qr_scanning ? (
              <Loader2 className="h-9 w-9 text-blue-400 animate-spin" />
            ) : qr_found ? (
              <CheckCircle2 className="h-11 w-11 text-emerald-400" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-300">
                <QrCode className="h-11 w-11" />
                <span className="text-[11px] font-light">No QR detected</span>
              </div>
            )}
          </div>

          {/* error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5 w-full"
            >
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <p className="text-[12px] font-light">{error}</p>
            </motion.div>
          )}

          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] text-slate-300 font-light">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <input ref={file_ref} type="file" accept="image/*" className="hidden" onChange={handle_qr_upload} />
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-xl border-slate-200 text-slate-500 font-light text-[13px] hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500 transition-all gap-2 cursor-pointer"
            onClick={() => file_ref.current?.click()}
            disabled={qr_scanning}
          >
            <Upload className="h-4 w-4" />
            Upload QR Image
          </Button>

          <p className="text-[12px] text-slate-400 font-light text-center">
            Having trouble?{' '}
            <button type="button" onClick={() => on_switch_tab?.('student')} className="font-medium text-blue-500 hover:underline cursor-pointer">
              Use Student ID
            </button>
          </p>
        </div>
      </div>
    )
  }

  /* ─── EMAIL / STUDENT MODE ───────────────────── */
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <form onSubmit={handle_submit} className="flex flex-col gap-4">
        {/* preview banner */}
        {is_preview && (
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-medium text-amber-800 block">UI Preview Mode</span>
              <span className="text-[11px] text-amber-700 font-light leading-snug">
                Supabase not configured. Click Sign In to preview the dashboard.
              </span>
            </div>
          </div>
        )}

        {/* identifier */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-id" className="text-[13px] font-light text-slate-600">
            {mode === 'email' ? 'Email Address' : 'Student / Staff ID'}
          </Label>
          <div className="relative">
            <Input
              id="login-id"
              type={mode === 'email' ? 'email' : 'text'}
              placeholder={mode === 'email' ? 'john@starehe.org' : 'e.g. 11876'}
              value={identifier}
              onChange={(e) => set_identifier(e.target.value)}
              className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
              required={!is_preview}
              disabled={is_preview}
              autoComplete={mode === 'email' ? 'email' : 'username'}
            />
            {identifier && !is_preview && (
              <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
            )}
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="login-pw" className="text-[13px] font-light text-slate-600">
              Password
            </Label>
            <Link href="/forgot-password" className="text-[12px] text-blue-400 font-light hover:text-blue-500 hover:underline transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="login-pw"
              type={show_password ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              className="h-12 bg-slate-50/80 border-slate-200 rounded-xl text-[14px] font-light placeholder:text-slate-300 pr-11 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-colors"
              required={!is_preview}
              disabled={is_preview}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => set_show_password(!show_password)}
              aria-label={show_password ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
            >
              {show_password ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
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

        {/* remember */}
        <label className="flex items-center gap-2.5 cursor-pointer group -mt-1">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => set_remember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-[#D4A017] cursor-pointer"
          />
          <span className="text-[12px] text-slate-400 font-light group-hover:text-slate-600 transition-colors">
            Remember this device
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
      </form>
    </div>
  )
}
