import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, MapPin, Tag } from 'lucide-react'

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <Link href="/search" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Search
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="bg-slate-100 rounded-xl aspect-[2/3] flex items-center justify-center border shadow-sm">
            <BookOpen className="h-20 w-20 text-slate-300" />
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <Tag className="h-4 w-4" /> Textbook
            </div>
            <h1 className="text-3xl font-bold text-foreground">Advanced Physics 101</h1>
            <p className="text-lg text-muted-foreground">By Dr. John Smith, Jane Doe</p>
          </div>

          <div className="flex flex-wrap gap-4 py-4 border-y">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">ISBN</span>
              <span className="font-medium text-foreground">978-3-16-148410-0</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Publisher</span>
              <span className="font-medium text-foreground">Oxford University Press</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Year</span>
              <span className="font-medium text-foreground">2025</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-green-50 text-green-800 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 font-semibold text-green-700">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Available
            </div>
            <p className="text-sm">2 copies currently available on the shelf.</p>
            <div className="flex items-center gap-2 text-sm mt-2 font-medium">
              <MapPin className="h-4 w-4" />
              Science Section - A2
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <Button size="lg" className="flex-1">Log in to Place Hold</Button>
            <Button size="lg" variant="outline">Add to List</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
