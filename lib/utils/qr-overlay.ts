'use client'

/**
 * Renders a QR code data URL with a centered text badge (admission number).
 * Returns a new data URL with the overlay drawn on top of the QR code.
 */
export async function renderQRWithOverlay(
  qrDataUrl: string,
  text: string,
): Promise<string> {
  const img = await loadImage(qrDataUrl)
  const size = img.naturalWidth || img.width

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return qrDataUrl

  ctx.drawImage(img, 0, 0, size, size)

  const badgeSize = Math.round(size * 0.28)
  const badgeX = (size - badgeSize) / 2
  const badgeY = (size - badgeSize) / 2
  const cornerRadius = Math.round(badgeSize * 0.18)

  ctx.fillStyle = '#FFFFFF'
  ctx.shadowColor = 'rgba(0,0,0,0.10)'
  ctx.shadowBlur = 6
  ctx.shadowOffsetY = 2
  roundRect(ctx, badgeX, badgeY, badgeSize, badgeSize, cornerRadius)
  ctx.fill()
  ctx.shadowColor = 'transparent'

  ctx.fillStyle = '#0B1A3B'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const fontSize = Math.round(badgeSize * 0.22)
  ctx.font = `600 ${fontSize}px sans-serif`
  ctx.fillText(text, size / 2, size / 2)

  return canvas.toDataURL('image/png')
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
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
