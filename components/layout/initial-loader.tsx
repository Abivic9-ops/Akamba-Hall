'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const loadingMessages = [
  "Opening the library doors...",
  "Dusting off the bookshelves...",
  "Finding the coolest books...",
  "Preparing your reading spot...",
  "Almost ready!"
]

export function InitialLoader() {
  const [loading, setLoading] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    // Hide the loader after the app has hydrated and a small delay
    const totalDuration = 3000 // 3 seconds splash screen for kids to enjoy
    
    // Cycle messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1 < loadingMessages.length ? prev + 1 : prev))
    }, totalDuration / loadingMessages.length)

    const timer = setTimeout(() => {
      setLoading(false)
    }, totalDuration)
    
    return () => {
      clearTimeout(timer)
      clearInterval(messageInterval)
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center font-poppins selection:bg-[#0B1A3B] selection:text-white overflow-hidden h-[100dvh]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Background"
          fill
          sizes="100vw"
          quality={60}
          fetchPriority="high"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0 bg-white/85 backdrop-blur-sm" />

      {/* Custom Keyframes for Playful Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cross-left-right {
          0%, 100% { transform: translateX(-40px) rotate(-5deg) scale(1); z-index: 20; }
          25% { z-index: 20; transform: translateX(0px) rotate(0deg) scale(1.1); }
          50% { transform: translateX(40px) rotate(5deg) scale(1); z-index: 10; }
          75% { z-index: 10; transform: translateX(0px) rotate(0deg) scale(0.9); }
        }
        @keyframes cross-right-left {
          0%, 100% { transform: translateX(40px) rotate(5deg) scale(1); z-index: 10; }
          25% { z-index: 10; transform: translateX(0px) rotate(0deg) scale(0.9); }
          50% { transform: translateX(-40px) rotate(-5deg) scale(1); z-index: 20; }
          75% { z-index: 20; transform: translateX(0px) rotate(0deg) scale(1.1); }
        }
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes walk-across {
          0% { transform: translateX(-150vw); }
          100% { transform: translateX(150vw); }
        }
        @keyframes bounce-walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-md">
        
        {/* Animated Logos with Floating Effect */}
        <div 
          className="relative w-24 h-20 sm:w-40 sm:h-28 mb-4 sm:mb-8 flex justify-center items-center"
          style={{ animation: 'float-up-down 4s ease-in-out infinite' }}
        >
          <div 
            className="absolute"
            style={{ animation: 'cross-left-right 3.5s ease-in-out infinite' }}
          >
            <Image
              src="/images/starehe-preview.png"
              alt="Starehe Preview"
              width={96}
              height={96}
              quality={75}
              fetchPriority="high"
              className="object-contain drop-shadow-lg w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-lg sm:rounded-2xl p-1 sm:p-2"
              priority
            />
          </div>
          <div 
            className="absolute"
            style={{ animation: 'cross-right-left 3.5s ease-in-out infinite' }}
          >
            <Image
              src="/pwa-icon.png"
              alt="PWA Logo"
              width={96}
              height={96}
              quality={75}
              fetchPriority="high"
              className="object-contain drop-shadow-lg w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28"
              priority
            />
          </div>
        </div>
        
        {/* Titles with vibrant pop */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-[#0B1A3B] mb-0.5 sm:mb-2 text-center drop-shadow-md tracking-tight">
          Akamba Hall
        </h1>
        <p className="text-amber-500 text-base sm:text-xl md:text-2xl text-center mb-6 sm:mb-12 font-medium sm:font-bold tracking-wide drop-shadow-sm">
          Library
        </p>

        {/* Playful Loading Dots */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 animate-bounce shadow-md" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></div>
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-[#0B1A3B] animate-bounce shadow-md" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></div>
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-blue-400 animate-bounce shadow-md" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></div>
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-amber-400 animate-bounce shadow-md" style={{ animationDelay: '450ms', animationDuration: '0.8s' }}></div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="h-6 sm:h-8 flex items-center justify-center mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-lg md:text-xl font-medium sm:font-bold text-[#1a2b4c] text-center transition-all duration-300 ease-in-out transform">
            {loadingMessages[messageIndex]}
          </h2>
        </div>

        {/* Fun Progress Bar */}
        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner drop-shadow-sm border border-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-[#0B1A3B] rounded-full"
            style={{ 
              animation: 'progress-fill 3s ease-out forwards'
            }}
          />
        </div>
      </div>

      {/* Students Animation */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 overflow-hidden h-12 sm:h-20 pointer-events-none z-10 flex items-center justify-center opacity-90">
        <div 
          className="flex gap-3 sm:gap-6 whitespace-nowrap"
          style={{ animation: 'walk-across 5s linear infinite' }}
        >
          <span className="text-2xl sm:text-4xl" style={{ animation: 'bounce-walk 0.5s ease-in-out infinite' }}>👩‍🎓</span>
          <span className="text-2xl sm:text-4xl" style={{ animation: 'bounce-walk 0.5s ease-in-out infinite 0.1s' }}>👨‍🎓</span>
          <span className="text-2xl sm:text-4xl" style={{ animation: 'bounce-walk 0.5s ease-in-out infinite 0.2s' }}>📚</span>
          <span className="text-2xl sm:text-4xl" style={{ animation: 'bounce-walk 0.5s ease-in-out infinite 0.3s' }}>🏃‍♀️</span>
          <span className="text-2xl sm:text-4xl" style={{ animation: 'bounce-walk 0.5s ease-in-out infinite 0.15s' }}>🏃‍♂️</span>
        </div>
      </div>
    </div>
  )
}
