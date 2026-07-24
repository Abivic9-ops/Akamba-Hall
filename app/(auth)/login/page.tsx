'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CalendarCheck, QrCode, BarChart3, Shield, ArrowLeft, ExternalLink } from 'lucide-react'
import { LoginForm } from '@/components/forms/LoginForm'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://akambahall.vercel.app'

const features = [
  { icon: BookOpen, text: 'Access thousands of books, journals, past papers and digital materials' },
  { icon: CalendarCheck, text: 'Reserve study rooms, reading areas and AV facilities in seconds' },
  { icon: QrCode, text: 'Borrow and return books with secure QR-based authentication' },
  { icon: BarChart3, text: 'Track your loans, reservations, fines and reading history in real time' },
]

type auth_tab = 'email' | 'student' | 'qr'

export default function LoginPage() {
  const [active_tab, set_active_tab] = useState<auth_tab>('email')
  const [is_pwa, set_is_pwa] = useState(false)

  useEffect(() => {
    set_is_pwa(
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    )
  }, [])

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#071224] transition-colors duration-300">
      {/* ─── LEFT PANEL ───────────────────────────── */}
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
              Your Gateway to{' '}
              <span className="text-[#D4A017] font-medium">Knowledge &amp; Excellence</span>
            </h1>
            <p className="text-white/40 text-[15px] font-light leading-relaxed mt-6 max-w-lg">
              Access books, digital resources, study spaces, and academic support — all from one
              intelligent platform designed for every Starehean.
            </p>
          </div>

          {/* features container */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 mb-auto">
            <p className="text-white/30 text-[11px] font-medium tracking-[0.15em] uppercase mb-4">What you can do</p>
            <ul className="flex flex-col gap-3">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3.5">
                  <div className="h-8 w-8 rounded-lg bg-[#D4A017]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon className="h-4 w-4 text-[#D4A017]" />
                  </div>
                  <p className="text-white/70 text-[14px] font-light leading-relaxed">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* quote */}
          <div className="mt-10">
            <p className="text-white/30 text-[13px] font-light italic leading-relaxed">
              &ldquo;The more that you read, the more things you will know. The more that you learn,
              the more places you will go.&rdquo;
            </p>
            <p className="text-white/20 text-[11px] font-light mt-2">— Dr. Seuss</p>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ──────────────────────────── */}
      <div className="w-full lg:w-[62%] flex flex-col">
        <div className="flex-1 flex flex-col items-center px-8 sm:px-12 lg:px-16 py-10">
          <div className="w-full max-w-[440px]">
            {/* back to home pill + theme toggle row */}
            <div className="flex items-center justify-between mb-8">
              {is_pwa ? (
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 text-[13px] text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Visit Website
                </a>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 text-[13px] text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 transition-all"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Home
                </Link>
              )}
              <ThemeToggle size="sm" />
            </div>

            {/* mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div className="relative h-10 w-9 shrink-0">
                <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div>
                <p className="text-[#0B1A3B] dark:text-white font-medium text-[13px]">STAREHE BOYS&apos; CENTRE</p>
                <p className="text-slate-400 text-[11px] font-light">Akamba Hall Library</p>
              </div>
            </div>

            {/* welcome */}
            <div className="mb-6">
              <h2 className="text-[30px] font-light text-[#0B1A3B] dark:text-white tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 text-[14px] font-light mt-1.5">
                Sign in to your Akamba Hall Library account.
              </p>
            </div>

            {/* info banner */}
            <div className="flex items-start gap-3 bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.06] rounded-xl px-4 py-3 mb-6">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-[12px] text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Use your Student/Staff ID or Email to access your library account.
              </p>
            </div>

            {/* auth tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100/80 dark:bg-white/[0.05] rounded-xl mb-6">
              {([
                { id: 'email' as auth_tab, label: 'Email' },
                { id: 'student' as auth_tab, label: 'Student / Staff' },
                { id: 'qr' as auth_tab, label: 'QR Code' },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => set_active_tab(tab.id)}
                  className={`relative py-2.5 rounded-lg text-[13px] font-light transition-all cursor-pointer ${
                    active_tab === tab.id
                      ? 'bg-white dark:bg-[#13285A] text-[#0B1A3B] dark:text-white shadow-sm'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  {active_tab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4A017] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* login form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active_tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <LoginForm mode={active_tab} on_switch_tab={(t) => set_active_tab(t)} />
              </motion.div>
            </AnimatePresence>

            {/* create account */}
            <div className="mt-6 text-center">
              <p className="text-[13px] text-slate-400 font-light">
                New to the library?{' '}
                <Link href="/register" className="font-medium text-[#0B1A3B] dark:text-[#E8A63C] hover:text-[#D4A017] transition-colors">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="shrink-0 border-t border-slate-100 dark:border-white/[0.06] px-8 py-3 flex items-center justify-between">
          <p className="text-slate-400 dark:text-slate-500 text-[11px] font-light">
            Mon–Fri 7:30 AM – 6:00 PM &middot; Sat 8:00 AM – 1:00 PM
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-light">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Help</a>
          </div>
        </div>
      </div>
    </div>
  )
}
