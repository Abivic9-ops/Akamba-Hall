import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center px-4">
      <h1 className="text-8xl font-bold text-[#0B1829] mb-4">404</h1>
      <p className="text-2xl font-semibold text-[#0B1829] mb-2">Page not found</p>
      <p className="text-[#A8B4C4] mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="bg-[#F5A623] text-[#0B1829] font-bold py-2 px-6 rounded-lg hover:bg-[#E8931A] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
