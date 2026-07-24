export default function OfflinePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#0B1A3B] px-6 text-center font-poppins selection:bg-amber-500 selection:text-white">
      <div className="w-16 h-16 mb-6 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728M16.95 7.05a7 7 0 010 9.9M15.536 8.464a5 5 0 010 7.072M14.121 9.879a3 3 0 010 4.243M12 12a1 1 0 100-2 1 1 0 000 2z" />
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">No Internet Connection</h1>
      <p className="text-white/70 max-w-sm leading-relaxed mb-8">
        Dear Staff and Students, you are currently offline. Please check your Wi-Fi or cellular network to access the Akamba Hall Library System.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2.5 bg-amber-500 text-[#0B1A3B] font-semibold rounded-lg hover:bg-amber-400 transition-colors shadow-lg active:scale-95"
      >
        Retry Connection
      </button>
    </div>
  )
}
