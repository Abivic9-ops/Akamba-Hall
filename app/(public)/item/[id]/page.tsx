import Link from 'next/link'
import { ArrowLeft, BookOpen, MapPin, Tag, Calendar, ExternalLink, Download } from 'lucide-react'
import prisma from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      copies: { orderBy: { barcode: 'asc' } },
    },
  })

  if (!book) notFound()

  const totalCopies = book.copies.length
  const availableCopies = book.copies.filter((c) => c.status === 'AVAILABLE').length
  const isAvailable = availableCopies > 0
  const hasContent = !!(book.contentText || book.contentUrl)

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <Link href="/search" className="inline-flex items-center gap-2 text-[13px] text-slate-500 dark:text-[#6B7A99] hover:text-[#2563EB] dark:hover:text-[#5B9BD5] transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Search
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 flex-shrink-0">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={book.title} className="w-full max-w-[320px] aspect-[2/3] object-cover rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-sm" />
            ) : (
              <div className="w-full max-w-[320px] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#0E1F3F] dark:to-[#13285A] rounded-xl aspect-[2/3] flex items-center justify-center border border-slate-100 dark:border-white/[0.08]">
                <BookOpen className="h-20 w-20 text-slate-300 dark:text-white/10" />
              </div>
            )}

            <div className="mt-4 space-y-3">
              {book.contentUrl && (
                <a
                  href={book.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              )}
              {hasContent && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[12px] font-medium">
                  <BookOpen className="h-3.5 w-3.5" /> Readable content available
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              {book.category && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#2563EB]/10 text-[#2563EB] mb-2">
                  <Tag className="h-3 w-3" /> {book.category}
                </span>
              )}
              <h1 className="text-[28px] font-medium text-slate-900 dark:text-[#E2E8F0] leading-tight">{book.title}</h1>
              <p className="text-[16px] text-slate-500 dark:text-[#6B7A99] mt-1">By {book.author}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {book.isbn && (
                <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-3">
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">ISBN</p>
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] mt-0.5">{book.isbn}</p>
                </div>
              )}
              {book.year && (
                <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-3">
                  <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Year</p>
                  <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] mt-0.5">{book.year}</p>
                </div>
              )}
              <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-3">
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Copies</p>
                <p className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] mt-0.5">{totalCopies}</p>
              </div>
              <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-3">
                <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] uppercase tracking-wider">Available</p>
                <p className={`text-[14px] font-medium mt-0.5 ${isAvailable ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {availableCopies}
                </p>
              </div>
            </div>

            {book.description && (
              <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-5">
                <h3 className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] mb-2">Description</h3>
                <p className="text-[14px] text-slate-500 dark:text-[#6B7A99] leading-relaxed">{book.description}</p>
              </div>
            )}

            {isAvailable ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <p className="text-[14px] font-medium text-emerald-700 dark:text-emerald-400">Available</p>
                  <p className="text-[12px] text-emerald-600 dark:text-emerald-400/80">{availableCopies} cop{availableCopies === 1 ? 'y' : 'ies'} on the shelf</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div>
                  <p className="text-[14px] font-medium text-amber-700 dark:text-amber-400">All copies on loan</p>
                  <p className="text-[12px] text-amber-600 dark:text-amber-400/80">Place a hold to reserve the next available copy.</p>
                </div>
              </div>
            )}

            {book.copies.length > 0 && (
              <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-5">
                <h3 className="text-[14px] font-medium text-slate-800 dark:text-[#E2E8F0] mb-3">Copy Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {book.copies.map((copy) => (
                    <div key={copy.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/[0.04] rounded-lg border border-slate-100 dark:border-white/[0.06]">
                      <div className={`h-2 w-2 rounded-full ${copy.status === 'AVAILABLE' ? 'bg-emerald-500' : copy.status === 'LOANED' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-mono text-slate-600 dark:text-[#B9C2D8]">{copy.barcode ?? 'No barcode'}</p>
                        {copy.shelfLocation && (
                          <p className="text-[11px] text-slate-400 dark:text-[#6B7A99] flex items-center gap-1">
                            <MapPin className="h-2.5 w-2.5" /> {copy.shelfLocation}
                          </p>
                        )}
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        copy.status === 'AVAILABLE' ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
                        copy.status === 'LOANED' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' :
                        'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      }`}>
                        {copy.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {book.contentText && (
              <div className="bg-white dark:bg-[#13285A] rounded-xl border border-slate-100 dark:border-white/[0.08] p-6">
                <h3 className="text-[15px] font-medium text-slate-800 dark:text-[#E2E8F0] mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#2563EB]" /> Read Content
                </h3>
                <div className="prose prose-slate dark:prose-invert max-w-none text-[14px] leading-relaxed text-slate-600 dark:text-[#B9C2D8] whitespace-pre-wrap">
                  {book.contentText}
                </div>
              </div>
            )}

            <Link href="/login">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] text-white text-[14px] font-medium hover:bg-[#1D4ED8] transition-colors">
                Log in to Place Hold
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
