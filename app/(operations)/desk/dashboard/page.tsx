import { requireRole } from '@/lib/auth/roleGuard'

export default async function desk_placeholder() {
  await requireRole(['ASSISTANT', 'CAPTAIN', 'PREFECT'])

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
          <span className="text-2xl">🖥️</span>
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 font-[var(--font-poppins)]">Desk Dashboard</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          This dashboard is coming soon. Desk operations for check-in, check-out, and member management will be available here.
        </p>
      </div>
    </div>
  )
}
