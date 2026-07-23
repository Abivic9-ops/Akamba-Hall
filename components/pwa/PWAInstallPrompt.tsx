'use client'

import { useEffect, useState } from 'react'
import { Download, X, Share, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    // Don't show if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    if (standalone) {
      setIsInstalled(true)
      return
    }

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(ios)

    // Check if user dismissed before (session-based, not permanent)
    const dismissed = sessionStorage.getItem('pwa-install-dismissed')
    if (dismissed) return

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/', updateViaCache: 'none' })
        .catch((err) => console.warn('[PWA] SW registration failed:', err))
    }

    // Catch the install prompt for non-iOS
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show our custom banner after a short delay for good UX
      setTimeout(() => setShow(true), 2500)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // On iOS, show after a short delay
    if (ios) {
      setTimeout(() => setShow(true), 2500)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    setInstalling(true)
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
      setShow(false)
    }
    setInstalling(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    sessionStorage.setItem('pwa-install-dismissed', '1')
  }

  if (isInstalled) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1A3B] via-[#0F2350] to-[#0B1A3B]" />
            {/* Subtle shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

            <div className="relative p-4">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                aria-label="Dismiss install prompt"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 pr-6">
                {/* App icon */}
                <div className="h-12 w-12 rounded-xl bg-[#E8A63C]/15 border border-[#E8A63C]/20 flex items-center justify-center shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/starehe-logo.png" alt="Akamba Hall" className="h-8 w-8 object-contain" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white leading-tight">
                    Akamba Hall Library
                  </p>
                  <p className="text-[12px] text-white/50 mt-0.5 leading-tight">
                    Add to your home screen for quick access
                  </p>
                </div>
              </div>

              {isIOS ? (
                /* iOS instruction */
                <div className="mt-3 flex items-start gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
                  <Share className="h-4 w-4 text-[#E8A63C] shrink-0 mt-0.5" />
                  <p className="text-[12px] text-white/70 leading-relaxed">
                    Tap the <span className="font-semibold text-white">Share</span> button, then{' '}
                    <span className="inline-flex items-center gap-0.5 font-semibold text-white">
                      <Plus className="h-3 w-3" /> Add to Home Screen
                    </span>
                  </p>
                </div>
              ) : (
                /* Android / Desktop install button */
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-[#E8A63C] hover:bg-[#D4922A] text-[#0B1A3B] text-[13px] font-semibold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                >
                  <Download className="h-4 w-4" />
                  {installing ? 'Installing…' : 'Install App'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
