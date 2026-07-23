'use client'

import { useState, useCallback, useEffect } from 'react'
import { CreditCard, Download, Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { renderQRWithOverlay } from '@/lib/utils/qr-overlay'

interface QRCardProps {
  label: string
  memberId: string
  userName: string
  status: 'Active' | 'Suspended'
  qrCodeUrl?: string
  cardRef?: string
}

export function QRCard({ label, memberId, userName, status, qrCodeUrl, cardRef }: QRCardProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const [viewing, set_viewing] = useState(false)
  const [downloading, set_downloading] = useState(false)
  const [overlaidUrl, set_overlaidUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!qrCodeUrl || !cardRef) return
    let cancelled = false
    renderQRWithOverlay(qrCodeUrl, cardRef).then((url) => {
      if (!cancelled) set_overlaidUrl(url)
    })
    return () => { cancelled = true }
  }, [qrCodeUrl, cardRef])

  const displayUrl = overlaidUrl ?? qrCodeUrl

  const handleDownload = useCallback(async () => {
    if (!displayUrl) return
    set_downloading(true)

    try {
      // Create a canvas to compose the full card image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = 800
      canvas.height = 1000

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 800, 1000)
      grad.addColorStop(0, '#1E3A6E')
      grad.addColorStop(0.5, '#1A3060')
      grad.addColorStop(1, '#14264D')
      ctx.fillStyle = grad
      ctx.roundRect(0, 0, 800, 1000, 32)
      ctx.fill()

      // White card area for QR
      ctx.fillStyle = '#FFFFFF'
      ctx.roundRect(100, 60, 600, 600, 20)
      ctx.fill()

      // Draw QR code image (already has text overlay)
      const qrImg = await loadImage(displayUrl)
      ctx.drawImage(qrImg, 180, 100, 440, 440)

      // Card ref text under QR
      ctx.fillStyle = '#94A3B8'
      ctx.font = '28px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(cardRef ?? memberId, 400, 620)

      // User initials circle
      ctx.fillStyle = 'rgba(255,255,255,0.1)'
      ctx.beginPath()
      ctx.arc(400, 720, 36, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 22px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(initials, 400, 728)

      // User name
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '500 30px sans-serif'
      ctx.fillText(userName, 400, 800)

      // Member ID
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '24px sans-serif'
      ctx.fillText(memberId, 400, 840)

      // Status dot
      ctx.fillStyle = status === 'Active' ? '#34D399' : '#F87171'
      ctx.beginPath()
      ctx.arc(360, 900, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.font = '22px sans-serif'
      ctx.fillText(status, 400, 907)

      // Trigger download
      const link = document.createElement('a')
      link.download = `akamba-hall-qr-${cardRef ?? memberId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // Fallback: download just the QR code
      const link = document.createElement('a')
      link.download = `akamba-hall-qr-${cardRef ?? memberId}.png`
      link.href = displayUrl ?? qrCodeUrl ?? ''
      link.click()
    } finally {
      set_downloading(false)
    }
  }, [displayUrl, qrCodeUrl, cardRef, memberId, userName, status, initials])

  return (
    <>
      <div className="bg-gradient-to-br from-[#1E3A6E] via-[#1A3060] to-[#14264D] rounded-xl p-5 shadow-lg text-white h-full min-h-[400px] flex flex-col">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-white/70" />
            <span className="text-[13px] font-medium text-white">{label}</span>
          </div>
          <span className="text-[11px] text-white/40 cursor-help" title="Show this QR code at the library desk or entrance to verify your membership.">
            ⓘ
          </span>
        </div>

        {/* QR code */}
        <div className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-xl p-3 flex items-center justify-center mb-4 flex-1">
          <div className="w-full max-w-[160px] aspect-square rounded-lg flex items-center justify-center overflow-hidden">
            {displayUrl ? (
              <Image
                src={displayUrl}
                alt={`QR Code for ${memberId}`}
                width={160}
                height={160}
                className="w-full h-full object-contain"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-slate-100 dark:bg-white/[0.06] dark:bg-white/[0.06] rounded-lg flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* user info */}
        <div className="text-center mb-3">
          <div className="h-8 w-8 rounded-full bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 flex items-center justify-center text-[12px] font-medium text-white mx-auto mb-1.5">
            {initials}
          </div>
          <p className="text-[14px] font-medium text-white">{userName}</p>
          <p className="text-[12px] text-white/50">{memberId}</p>
        </div>

        {/* status */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <span className={`h-2 w-2 rounded-full ${status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className="text-[12px] font-normal text-white/70">{status}</span>
        </div>

        {/* actions */}
        <div className="flex gap-2 mt-auto">
          <button
            type="button"
            onClick={() => set_viewing(true)}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-white/20 text-[12px] font-medium text-white hover:bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading || !qrCodeUrl}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg border border-white/20 text-[12px] font-medium text-white hover:bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F]/10 transition-colors cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Download
          </button>
        </div>
      </div>

      {/* ── Full-screen QR Viewer Modal ──────────────── */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => set_viewing(false)}
        >
          <div
            className="bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <p className="text-[16px] font-medium text-[#0B1A3B] dark:text-white dark:text-white">Your QR Access Card</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99] mt-1">Show this at the library entrance</p>
            </div>
            <div className="flex justify-center mb-4">
              {displayUrl && (
                <Image
                  src={displayUrl}
                  alt={`QR Code for ${memberId}`}
                  width={280}
                  height={280}
                  className="rounded-xl"
                  unoptimized
                />
              )}
            </div>
            <div className="text-center mb-4">
              <p className="text-[14px] font-medium text-[#0B1A3B] dark:text-white dark:text-white">{userName}</p>
              <p className="text-[13px] text-slate-400 dark:text-[#6B7A99] dark:text-[#6B7A99]">{memberId}</p>
              {cardRef && (
                <p className="text-[11px] text-slate-300 mt-1">Card: {cardRef}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                disabled={downloading || !displayUrl}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-[#0B1A3B] text-white text-[13px] font-medium hover:bg-[#13285A] transition-colors cursor-pointer disabled:opacity-50"
              >
                {downloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download
              </button>
              <button
                onClick={() => set_viewing(false)}
                className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-white/10 dark:border-white/10 text-slate-500 dark:text-[#6B7A99] dark:text-[#6B7A99] text-[13px] font-medium hover:bg-slate-50 dark:hover:bg-white/[0.04] dark:bg-white/[0.04] dark:hover:bg-white dark:bg-[#0E1F3F]/[0.04] dark:bg-white/[0.04] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
