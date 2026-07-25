import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

export type UploadFolder =
  | 'akamba/covers'
  | 'akamba/avatars'
  | 'akamba/events'
  | 'akamba/announcements'
  | 'akamba/documents'
  | 'akamba/equipment'
  | 'akamba/e-resources'

export async function uploadToCloudinary(
  file: string | Buffer,
  folder: UploadFolder = 'akamba/covers',
  options?: { public_id?: string; transformation?: object[] }
): Promise<{ url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(
    typeof file === 'string' ? file : `data:application/octet-stream;base64,${file.toString('base64')}`,
    {
      folder,
      resource_type: 'auto',
      ...options,
    }
  )
  return { url: result.secure_url, public_id: result.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export async function uploadImage(
  file: string | Buffer,
  folder: UploadFolder = 'akamba/covers',
  options?: { width?: number; height?: number; crop?: string; quality?: string }
): Promise<{ url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(
    typeof file === 'string' ? file : `data:image/png;base64,${file.toString('base64')}`,
    {
      folder,
      resource_type: 'image',
      transformation: options
        ? [{ width: options.width, height: options.height, crop: options.crop ?? 'fill', quality: options.quality ?? 'auto' }]
        : undefined,
    }
  )
  return { url: result.secure_url, public_id: result.public_id }
}

export async function uploadDocument(
  file: string | Buffer,
  folder: UploadFolder = 'akamba/documents',
  filename?: string
): Promise<{ url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(
    typeof file === 'string' ? file : `data:application/pdf;base64,${file.toString('base64')}`,
    {
      folder,
      resource_type: 'raw',
      public_id: filename,
    }
  )
  return { url: result.secure_url, public_id: result.public_id }
}

export function getCloudinaryPublicId(url: string): string | null {
  const match = url.match(/\/v\d+\/(.+)\.\w+$/)
  return match ? match[1] : null
}
