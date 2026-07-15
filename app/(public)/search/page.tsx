import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function CatalogueSearchPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Catalogue Search</h1>
          <p className="text-muted-foreground">Find books, journals, and digital resources.</p>
        </div>
        
        <div className="flex gap-2 p-4 bg-slate-50 border rounded-2xl shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by title, author, subject, or keyword..." 
              className="pl-12 h-12 bg-white text-base rounded-xl"
              autoFocus
            />
          </div>
          <Button className="h-12 px-8 rounded-xl font-semibold">Search</Button>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Search className="h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Enter a search term</h3>
          <p className="text-sm text-slate-500 max-w-sm mt-2">
            You can search our entire database of physical and digital materials. Try searching for "Machine Learning" or "History".
          </p>
        </div>
      </div>
    </div>
  )
}
