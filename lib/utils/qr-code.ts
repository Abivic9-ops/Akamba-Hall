import QRCode from 'qrcode'
import { getBaseUrl } from '@/lib/utils/base-url'

/**
 * Generates the login URL encoded in a QR code.
 * Format: {baseUrl}/qr-login?ref={cardRef}
 */
export function buildQRLoginUrl(cardRef: string): string {
  const base = getBaseUrl()
  return `${base}/qr-login?ref=${encodeURIComponent(cardRef)}`
}

/**
 * Generates a QR code as a PNG data URL string.
 */
export async function generateQRCodeDataURL(cardRef: string): Promise<string> {
  const url = buildQRLoginUrl(cardRef)
  return QRCode.toDataURL(url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#0B1A3B',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}

/**
 * Generates a QR code as an SVG string.
 */
export async function generateQRCodeSVG(cardRef: string): Promise<string> {
  const url = buildQRLoginUrl(cardRef)
  return QRCode.toString(url, {
    type: 'svg',
    width: 400,
    margin: 2,
    color: {
      dark: '#0B1A3B',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}

/**
 * Generates a QR code as a PNG Buffer (for download).
 */
export async function generateQRCodeBuffer(cardRef: string): Promise<Buffer> {
  const url = buildQRLoginUrl(cardRef)
  return QRCode.toBuffer(url, {
    width: 400,
    margin: 2,
    color: {
      dark: '#0B1A3B',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'H',
  })
}
