'use client'

import { Package, ArrowRight } from 'lucide-react'
import { FadeIn, ScaleOnHover } from '@/components/motion'

export default function CatalogueManagementPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto pb-20">
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center gap-2 bg-[#0B1A3B]/5 text-[#0B1A3B] dark:text-white dark:text-white text-[12px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            Catalogue
          </span>
        </div>
        <h1 className="text-[32px] font-extrabold text-[#0B1B3D] tracking-tight">Item Management</h1>
        <p className="text-[#5B6376] text-[16px] mt-2">Manage the library catalogue, inventory, and digital resources.</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ScaleOnHover>
          <div className="mt-8 bg-white dark:bg-[#0E1F3F] dark:bg-[#0E1F3F] border border-[#E4E7EE] dark:border-white/10 dark:border-white/10 rounded-[20px] p-10 text-center flex flex-col items-center justify-center min-h-[400px] hover:shadow-lg hover:border-gold/30 transition-all duration-300">
            <div className="h-16 w-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-5">
              <Package className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="text-[20px] font-bold text-[#101828]">Catalogue Module</h2>
            <p className="text-[#5B6376] text-[15px] max-w-md mx-auto mt-3 leading-relaxed">
              This view is a placeholder and will be built out in the upcoming phases. The catalogue module will include item creation, editing, categorization, and inventory management.
            </p>
            <div className="flex items-center gap-2 mt-6 text-gold text-[14px] font-semibold">
              Coming soon <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </ScaleOnHover>
      </FadeIn>
    </div>
  )
}
