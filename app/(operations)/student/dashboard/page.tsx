export default function student_placeholder() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 max-w-md w-full text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
          <span className="text-2xl">📚</span>
        </div>
        <h2 className="text-[18px] font-bold text-slate-900 font-[var(--font-poppins)]">Student Dashboard</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          This dashboard is coming soon. You will be able to browse the catalogue, manage your loans, and view your reading history.
        </p>
      </div>
    </div>
  )
}
