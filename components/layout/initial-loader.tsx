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
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center font-poppins selection:bg-[#0B1A3B] selection:text-white overflow-hidden">
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
      `}} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-md">
        
        {/* Animated Logos with Floating Effect */}
        <div 
          className="relative w-40 h-28 mb-8 flex justify-center items-center"
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
              className="object-contain drop-shadow-lg w-24 h-24 bg-white rounded-2xl p-2"
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
              className="object-contain drop-shadow-lg w-24 h-24"
              priority
            />
          </div>
        </div>
        
        {/* Titles with vibrant pop */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1A3B] mb-2 text-center drop-shadow-md tracking-tight">
          Akamba Hall
        </h1>
        <p className="text-amber-500 text-xl sm:text-2xl text-center mb-12 font-bold tracking-wide drop-shadow-sm">
          Library
        </p>

        {/* Playful Loading Dots */}
        <div className="flex gap-3 mb-6">
          <div className="w-4 h-4 rounded-full bg-amber-400 animate-bounce shadow-md" style={{ animationDelay: '0ms', animationDuration: '0.8s' }}></div>
          <div className="w-4 h-4 rounded-full bg-[#0B1A3B] animate-bounce shadow-md" style={{ animationDelay: '150ms', animationDuration: '0.8s' }}></div>
          <div className="w-4 h-4 rounded-full bg-blue-400 animate-bounce shadow-md" style={{ animationDelay: '300ms', animationDuration: '0.8s' }}></div>
          <div className="w-4 h-4 rounded-full bg-amber-400 animate-bounce shadow-md" style={{ animationDelay: '450ms', animationDuration: '0.8s' }}></div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="h-8 flex items-center justify-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#1a2b4c] text-center transition-all duration-300 ease-in-out transform">
            {loadingMessages[messageIndex]}
          </h2>
        </div>

        {/* Fun Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner drop-shadow-sm border border-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-[#0B1A3B] rounded-full"
            style={{ 
              animation: 'progress-fill 3s ease-out forwards'
            }}
          />
        </div>
      </div>
    </div>
  )
}
