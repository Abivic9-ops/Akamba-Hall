'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { LoginForm } from '@/components/forms/LoginForm'
import { FadeIn } from '@/components/motion'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC]">
      {/* Left side (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-32 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition" aria-label="Back to home">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Home
        </Link>

        <div className="w-full max-w-md mx-auto">
          <FadeIn direction="up" duration={0.6}>
            <div className="mb-10 text-center">
              <div className="mx-auto h-16 w-14 relative mb-6">
                <Image src="/images/starehe-logo.png" alt="Starehe Logo" fill className="object-contain" />
              </div>
              <h1 className="text-[32px] font-extrabold text-[#0B1B3D]">Welcome Back</h1>
              <p className="text-[16px] text-[#5B6376] mt-2">Log in to your Akamba Hall Library account</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="up" duration={0.6}>
            <LoginForm />
          </FadeIn>
        </div>
      </div>

      {/* Right side (Image) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0B1829]">
        <Image src="/images/hero-bg.png" alt="Library Background" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/80 to-transparent" />
        <FadeIn direction="right" delay={0.3} duration={0.8}>
          <div className="absolute bottom-16 left-16 right-16">
            <h2 className="text-[40px] font-extrabold text-white leading-tight mb-4">
              Your gateway to <br /><span className="text-gold">knowledge and innovation.</span>
            </h2>
            <p className="text-white/60 text-[17px] max-w-lg leading-relaxed">
              Access thousands of physical and digital resources, book study spaces, and manage your academic journey.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
