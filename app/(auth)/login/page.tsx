'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, CalendarCheck, QrCode, BarChart3,
  Globe, Shield, MessageCircle, HelpCircle, Bug,
  Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown,
} from 'lucide-react'
import { LoginForm } from '@/components/forms/LoginForm'

const features = [
  {
    icon: BookOpen,
    title: 'Extensive Library Collection',
    desc: 'Thousands of books, journals, past papers and digital learning materials.',
  },
  {
    icon: CalendarCheck,
    title: 'Reserve Study Spaces',
    desc: 'Book discussion rooms, reading areas and AV facilities with ease.',
  },
  {
    icon: QrCode,
    title: 'Smart QR Access',
    desc: 'Quick borrowing, returning and library entry using secure QR authentication.',
  },
  {
    icon: BarChart3,
    title: 'Track Your Progress',
    desc: 'Monitor loans, reservations, fines, borrowing history and recommendations.',
  },
]

type auth_tab = 'qr' | 'student' | 'email'

export default function LoginPage() {
  const [active_tab, set_active_tab] = useState<auth_tab>('student')

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <div className="flex flex-1 min-h-0">
        {/* ─── LEFT PANEL — Branding ────────────────────────── */}
        <div className="hidden lg:flex w-[38%] relative overflow-hidden">
          {/* background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#071B4A] via-[#0B1F52] to-[#0B1829]">
            <Image
              src="/images/hero-bg.png"
              alt=""
              fill
              className="object-cover opacity-20 mix-blend-overlay"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col w-full p-10 xl:p-14">
            {/* logo + institution */}
            <div className="flex items-center gap-4 mb-14">
              <div className="relative h-14 w-12 shrink-0">
                <Image src="/images/starehe-logo.png" alt="Starehe Boys' Centre" fill className="object-contain drop-shadow-lg" />
              </div>
              <div>
                <p className="text-white font-bold text-[15px] leading-tight tracking-wide">STAREHE BOYS' CENTRE</p>
                <p className="text-white/80 text-[13px] font-medium">Akamba Hall Library</p>
                <p className="text-[#D4A017] text-[10px] font-semibold tracking-widest mt-0.5">Knowledge &bull; Character &bull; Leadership</p>
              </div>
            </div>

            {/* hero */}
            <div className="mb-10">
              <h1 className="text-white text-[34px] xl:text-[40px] font-extrabold leading-[1.15] font-[var(--font-poppins)]">
                Your Gateway to{' '}
                <span className="text-[#D4A017]">Knowledge &amp; Excellence</span>
              </h1>
              <p className="text-white/50 text-[14px] leading-relaxed mt-5 max-w-md">
                Access books, digital resources, study spaces, academic support, and innovative library
                services — all from one intelligent platform designed to help every Starehean succeed.
              </p>
            </div>

            {/* features */}
            <div className="flex flex-col gap-3 mb-8">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.1] transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-[#D4A017]/15 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-[#D4A017]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-[13px] font-bold leading-tight">{f.title}</p>
                    <p className="text-white/40 text-[11px] leading-snug mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* quote card */}
            <div className="mt-auto p-5 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.06]">
              <span className="text-[#D4A017] text-2xl font-serif leading-none">&ldquo;</span>
              <p className="text-white/70 text-[12px] leading-relaxed italic mt-1">
                The more that you read, the more things you will know. The more that you learn,
                the more places you will go.
              </p>
              <p className="text-white/40 text-[11px] font-semibold mt-2">— Dr. Seuss</p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL — Auth ───────────────────────────── */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-[480px]">
              {/* language selector */}
              <div className="flex justify-end mb-6">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-[11px] font-medium text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer">
                  <Globe className="h-3.5 w-3.5" />
                  English
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* mobile logo */}
              <div className="flex lg:hidden items-center gap-3 mb-8">
                <div className="relative h-10 w-9 shrink-0">
                  <Image src="/images/starehe-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                  <p className="text-[#0B1A3B] font-bold text-[13px] leading-tight">STAREHE BOYS&apos; CENTRE</p>
                  <p className="text-slate-400 text-[10px]">Akamba Hall Library</p>
                </div>
              </div>

              {/* welcome */}
              <div className="mb-6">
                <h2 className="text-[28px] font-extrabold text-[#0B1A3B] font-[var(--font-poppins)]">
                  Welcome Back!
                </h2>
                <p className="text-slate-500 text-[14px] mt-1.5">
                  Sign in to continue to your Akamba Hall Library Portal.
                </p>
              </div>

              {/* info banner */}
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3.5 mb-6">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[12px] text-blue-700 leading-relaxed">
                  Use your official Student ID, Staff ID or QR Card to securely access your library account.
                </p>
              </div>

              {/* auth tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl mb-6">
                {([
                  { id: 'qr' as auth_tab, label: 'QR Code', icon: QrCode },
                  { id: 'student' as auth_tab, label: 'Student ID', icon: BookOpen },
                  { id: 'email' as auth_tab, label: 'Email', icon: Mail },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => set_active_tab(tab.id)}
                    className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                      active_tab === tab.id
                        ? 'bg-white text-[#0B1A3B] shadow-sm'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoginForm mode={active_tab} />
                </motion.div>
              </AnimatePresence>

              {/* quick login options */}
              <div className="mt-8">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Login Options</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'Student Login', role: 'student', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700', icon: '🎓' },
                    { label: 'Staff Login', role: 'staff', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700', icon: '👨‍🏫' },
                    { label: 'Executive Login', role: 'executive', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700', icon: '⚡' },
                    { label: 'Library Staff', role: 'library_staff', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700', icon: '📚' },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => set_active_tab('student')}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl ${btn.color} transition-all hover:shadow-sm cursor-pointer text-left`}
                    >
                      <span className="text-xl">{btn.icon}</span>
                      <div>
                        <p className="text-[12px] font-bold leading-tight">{btn.label}</p>
                        <p className="text-[10px] opacity-60 mt-0.5">Sign in with ID</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* help + security row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {/* help card */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-white">
                  <p className="text-[13px] font-bold text-slate-800 mb-1">Need Help?</p>
                  <p className="text-[11px] text-slate-400 mb-3">We&apos;re here to assist you.</p>
                  <div className="space-y-2">
                    {[
                      { icon: MessageCircle, label: 'Ask a Librarian', desc: 'Chat with our team' },
                      { icon: HelpCircle, label: 'Help Centre', desc: 'FAQs and guides' },
                      { icon: Bug, label: 'Report an Issue', desc: 'Something wrong?' },
                    ].map((item) => (
                      <a key={item.label} href="#" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50">
                          <item.icon className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold text-slate-700">{item.label}</p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                        <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-slate-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* security card */}
                <div className="flex flex-col gap-3">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <p className="text-[13px] font-bold text-blue-800">Secure &amp; Private</p>
                    </div>
                    <p className="text-[11px] text-blue-600 leading-relaxed">
                      Your credentials are encrypted and protected using enterprise-grade security.
                    </p>
                  </div>

                  {/* create account */}
                  <div className="p-4 rounded-2xl border border-slate-100 bg-white text-center">
                    <p className="text-[12px] text-slate-500">Don&apos;t have an account?</p>
                    <Link href="/register" className="text-[13px] font-bold text-[#0B1A3B] hover:text-[#D4A017] transition-colors inline-flex items-center gap-1 mt-1">
                      Create Account <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* footer status cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
                {[
                  { icon: Clock, label: 'Library Hours', value: 'Mon–Fri 7:30–6:00', sub: 'Sat 8:00–1:00' },
                  { icon: CalendarCheck, label: 'Today', value: 'Open', sub: 'Closes 6:00 PM' },
                  { icon: MapPin, label: 'Visit Us', value: 'Akamba Hall', sub: 'Starehe Boys\' Centre' },
                  { icon: Phone, label: 'Contact', value: 'Call or Email', sub: 'We respond fast' },
                ].map((card) => (
                  <div key={card.label} className="p-3 rounded-2xl border border-slate-100 bg-white text-center">
                    <card.icon className="h-4 w-4 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">{card.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{card.value}</p>
                    <p className="text-[9px] text-slate-400">{card.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── GLOBAL FOOTER ────────────────────────────────── */}
      <footer className="shrink-0 bg-[#071B4A] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/40 text-[11px]">
          &copy; 2026 Starehe Boys&apos; Centre &mdash; Akamba Hall Library
        </p>
        <div className="flex items-center gap-4 text-[11px] text-white/40">
          <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
          <span className="text-white/15">|</span>
          <a href="#" className="hover:text-white/70 transition-colors">Terms of Use</a>
          <span className="text-white/15">|</span>
          <a href="#" className="hover:text-white/70 transition-colors">Help Centre</a>
        </div>
      </footer>
    </div>
  )
}
