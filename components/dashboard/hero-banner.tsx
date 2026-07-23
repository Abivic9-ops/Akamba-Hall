'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    eyebrow: 'THIS WEEK AT AKAMBA',
    headline: ['Study Smart, Lead', 'Stronger'],
    description: 'Join our AI Literacy Week sessions and level up your academic game.',
    cta1: { label: 'View Events', href: '#' },
    cta2: { label: 'Join a Study Group', href: '#' },
  },
  {
    eyebrow: 'READING CHALLENGE',
    headline: ['Read More,', 'Achieve More'],
    description: 'Complete 10 books this term and earn the Gold Reader badge.',
    cta1: { label: 'View Progress', href: '#' },
    cta2: { label: 'Browse Catalogue', href: '#' },
  },
  {
    eyebrow: 'NEW ACQUISITIONS',
    headline: ['Fresh Titles', 'Just Arrived'],
    description: 'Explore 50+ new books added to the Akamba Hall collection this month.',
    cta1: { label: 'See New Books', href: '#' },
    cta2: { label: 'Reserve a Copy', href: '#' },
  },
  {
    eyebrow: 'SPACE RESERVATIONS',
    headline: ['Book Your', 'Study Space'],
    description: 'Reserve reading seats, the AVR, or the boardroom for your next session.',
    cta1: { label: 'Book Now', href: '#' },
    cta2: { label: 'View Schedule', href: '#' },
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-navy shadow-lg" style={{ minHeight: 315 }}>
      {/* background image placeholder — gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-mid" />

      {/* dark gradient overlay: left opaque → right transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14]/90 via-[#0B0D14]/60 to-transparent" />

      {/* content */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-10 lg:py-14" style={{ minHeight: 315 }}>
        <div className="max-w-lg">
          <span className="inline-block text-[13px] font-medium uppercase tracking-widest text-[#F4B63D] mb-3">
            {slide.eyebrow}
          </span>

          <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] font-medium text-white leading-[1.1] mb-4 font-serif">
            {slide.headline.map((line, i) => (
              <span key={i}>
                {line}
                {i < slide.headline.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p className="text-[16px] lg:text-[18px] text-white/70 leading-relaxed mb-6 max-w-md">
            {slide.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={slide.cta1.href}
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-[14px] font-medium shadow-lg hover:shadow-xl transition-all"
            >
              {slide.cta1.label}
            </a>
            <a
              href={slide.cta2.href}
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-white/30 text-white text-[14px] font-medium hover:bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 transition-all"
            >
              {slide.cta2.label}
            </a>
          </div>
        </div>
      </div>

      {/* arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === current ? 'bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]' : 'bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
