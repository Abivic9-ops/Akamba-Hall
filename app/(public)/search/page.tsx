import { Suspense } from 'react'
import { SearchPageContent } from './search-content'

export default function CatalogueSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
