export default function staff_placeholder() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 font-[var(--font-poppins)]">Staff Dashboard</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          This dashboard is coming soon. Staff tools for managing library operations will be available here.
        </p>
      </div>
    </div>
  )
}
