import Link from 'next/link'
import { 
  BookOpen, FileText, RefreshCw, User, CheckCircle2, 
  ArrowUp, UserPlus, Shield, FileCheck, Database, 
  List, Link as LinkIcon, Trash2, Settings, AlertTriangle, 
  Info, ShieldCheck, Server, HardDrive, Cpu, Calendar,
  ChevronDown, Archive, ToggleLeft
} from 'lucide-react'

// Simple SVG line chart
const LineChartSvg = () => (
  <svg className="w-full h-[220px]" viewBox="0 0 800 220" preserveAspectRatio="none">
    <defs>
      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <path d="M0,150 L100,130 L200,160 L300,140 L400,140 L500,80 L600,120 L700,130 L800,125 L800,220 L0,220 Z" fill="url(#blueGradient)" />
    <path d="M0,150 L100,130 L200,160 L300,140 L400,140 L500,80 L600,120 L700,130 L800,125" fill="none" stroke="#3b82f6" strokeWidth="3" />
    <circle cx="100" cy="130" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="200" cy="160" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="300" cy="140" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="400" cy="140" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="500" cy="80" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="600" cy="120" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="700" cy="130" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    <circle cx="800" cy="125" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
    
    <g className="text-[10px] fill-slate-400 font-sans">
      <text x="0" y="210">Jun 20</text>
      <text x="130" y="210">Jun 21</text>
      <text x="260" y="210">Jun 22</text>
      <text x="390" y="210">Jun 23</text>
      <text x="520" y="210">Jun 24</text>
      <text x="650" y="210">Jun 25</text>
      <text x="760" y="210">Jun 26</text>
      
      <text x="0" y="30">1K</text>
      <text x="0" y="80">750</text>
      <text x="0" y="130">500</text>
      <text x="0" y="180">250</text>
    </g>
    <line x1="30" y1="25" x2="800" y2="25" stroke="#f1f5f9" strokeWidth="1" />
    <line x1="30" y1="75" x2="800" y2="75" stroke="#f1f5f9" strokeWidth="1" />
    <line x1="30" y1="125" x2="800" y2="125" stroke="#f1f5f9" strokeWidth="1" />
    <line x1="30" y1="175" x2="800" y2="175" stroke="#f1f5f9" strokeWidth="1" />
  </svg>
)

export default function SuperAdminDashboard() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-6">
      
      {/* MAIN COLUMN */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-2">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight">Welcome back, Super Admin 👋</h1>
            <p className="text-slate-500 font-medium text-[13px] mt-1">Here's what's happening across the Akamba Hall Library System.</p>
          </div>
          
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#0B1B3D]">System Status</span>
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-600 bg-white">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div> All Systems Operational
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#0B1B3D]">Date Range</span>
              <div className="flex items-center justify-between gap-3 text-[12px] font-bold text-[#0B1B3D] bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm min-w-[200px]">
                <span>June 20 - June 26, 2026</span>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">1,246</span>
                <span className="text-[10px] font-bold text-[#0B1B3D] mt-1">Total Members</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 8.5% this week</span>
              <Link href="#" className="h-6 w-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition"><ArrowUp className="h-3 w-3 rotate-45" /></Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">8,462</span>
                <span className="text-[10px] font-bold text-[#0B1B3D] mt-1">Total Items</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 4.2% this week</span>
              <Link href="#" className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition"><ArrowUp className="h-3 w-3 rotate-45" /></Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">3,257</span>
                <span className="text-[10px] font-bold text-[#0B1B3D] mt-1">Transactions</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5"><ArrowUp className="h-3 w-3" /> 6.1% this week</span>
              <Link href="#" className="text-[10px] font-bold text-orange-500 hover:underline">View report &rarr;</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">24</span>
                <span className="text-[10px] font-bold text-[#0B1B3D] mt-1">Active Staff</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-[10px] font-medium text-slate-400">No change</span>
              <Link href="#" className="h-6 w-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 transition"><ArrowUp className="h-3 w-3 rotate-45" /></Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4 group">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#0B1B3D] leading-none">99.8%</span>
                <span className="text-[10px] font-bold text-[#0B1B3D] mt-1">System Uptime</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-2">
              <span className="text-[10px] font-medium text-slate-400">Last 30 days</span>
              <Link href="#" className="text-[10px] font-bold text-red-500 hover:underline">View status &rarr;</Link>
            </div>
          </div>

        </div>

        {/* CHARTS ROW */}
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* System Overview Line Chart */}
          <div className="flex-[2] bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px] text-[#0B1B3D]">System Overview</h3>
              <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-600 flex items-center gap-2 cursor-pointer">
                Last 7 Days <ChevronDown className="h-3 w-3" />
              </div>
            </div>

            <div className="flex gap-6 mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#0B1B3D]">2,145</span>
                <span className="text-[11px] text-slate-500">Logins</span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><ArrowUp className="h-2 w-2 mr-0.5"/> 12.5%</span>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#0B1B3D]">1,324</span>
                <span className="text-[11px] text-slate-500">New Members</span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><ArrowUp className="h-2 w-2 mr-0.5"/> 9.3%</span>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#0B1B3D]">2,876</span>
                <span className="text-[11px] text-slate-500">Items Borrowed</span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><ArrowUp className="h-2 w-2 mr-0.5"/> 7.8%</span>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-[#0B1B3D]">1,145</span>
                <span className="text-[11px] text-slate-500">Bookings Made</span>
                <span className="text-[10px] font-bold text-emerald-500 flex items-center"><ArrowUp className="h-2 w-2 mr-0.5"/> 11.2%</span>
              </div>
            </div>

            <div>
              <LineChartSvg />
            </div>
          </div>

          {/* User Distribution Donut */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-6">User Distribution</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative flex-1 flex items-center justify-center">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1d4ed8" strokeWidth="12" strokeDasharray="180 250" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="12" strokeDasharray="40 250" strokeDashoffset="-185" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="6 250" strokeDashoffset="-230" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="6 250" strokeDashoffset="-240" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#94a3b8" strokeWidth="12" strokeDasharray="18 250" strokeDashoffset="-250" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-[#0B1B3D]">1,246</span>
                  <span className="text-[10px] text-slate-500 font-medium">Total Members</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-700"></div><span className="text-[#0B1B3D] font-bold">Students</span></div>
                  <span className="text-slate-500">892 (71.6%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[#0B1B3D] font-bold">Staff</span></div>
                  <span className="text-slate-500">198 (15.9%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[#0B1B3D] font-bold">Executives</span></div>
                  <span className="text-slate-500">32 (2.6%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[#0B1B3D] font-bold">Leadership</span></div>
                  <span className="text-slate-500">28 (2.2%)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div><span className="text-[#0B1B3D] font-bold">Others</span></div>
                  <span className="text-slate-500">96 (7.7%)</span>
                </div>
              </div>
            </div>

            <div className="mt-auto text-right">
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View full breakdown &rarr;</Link>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div>
          <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            
            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-200 transition group">
              <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">Add New User</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-200 transition group">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">Assign Role</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-orange-200 transition group">
              <div className="h-10 w-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">Create Policy</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-200 transition group">
              <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">System Backup</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-purple-200 transition group">
              <div className="h-10 w-10 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <List className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">View Audit Logs</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-200 transition group">
              <div className="h-10 w-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <LinkIcon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">Manage Integrations</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-200 transition group">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trash2 className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">Clear Cache</span>
            </div>

            <div className="flex-1 min-w-[120px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-purple-200 transition group">
              <div className="h-10 w-10 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#0B1B3D] text-center">System Settings</span>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* System Health */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[15px] text-[#0B1B3D]">System Health</h3>
              <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View details</Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Database className="h-4 w-4" />
                  <span className="text-[12px] font-bold text-[#0B1B3D]">Database</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                </div>
                <span className="text-[10px] text-slate-500">Response time: 45ms</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Server className="h-4 w-4" />
                  <span className="text-[12px] font-bold text-[#0B1B3D]">Server</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                </div>
                <span className="text-[10px] text-slate-500">Uptime: 99.98%</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <HardDrive className="h-4 w-4" />
                  <span className="text-[12px] font-bold text-[#0B1B3D]">Storage</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                </div>
                <span className="text-[10px] text-slate-500">Used: 42% (256 GB free)</span>
              </div>
              
              <div className="flex justify-between items-center pb-1">
                <div className="flex items-center gap-3 text-slate-600">
                  <Cpu className="h-4 w-4" />
                  <span className="text-[12px] font-bold text-[#0B1B3D]">API Services</span>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-2 py-0.5 rounded-full">Healthy</span>
                </div>
                <span className="text-[10px] text-slate-500">All services running</span>
              </div>
            </div>
          </div>

          {/* Top Circulated Items */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-5">Top Circulated Items</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-400 w-4">1</span>
                  <div className="h-10 w-8 bg-slate-900 rounded flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <span className="text-[4px] text-white/50 text-center font-serif leading-tight">DEEP<br/>WORK</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0B1B3D] leading-tight">Deep Work</span>
                    <span className="text-[10px] text-slate-500">Cal Newport</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-extrabold text-[#0B1B3D]">142</span>
                  <span className="text-[9px] text-slate-400">Loans</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-400 w-4">2</span>
                  <div className="h-10 w-8 bg-amber-50 rounded flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <span className="text-[4px] text-amber-900 text-center font-serif leading-tight">ATOMIC<br/>HABITS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0B1B3D] leading-tight">Atomic Habits</span>
                    <span className="text-[10px] text-slate-500">James Clear</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-extrabold text-[#0B1B3D]">118</span>
                  <span className="text-[9px] text-slate-400">Loans</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-400 w-4">3</span>
                  <div className="h-10 w-8 bg-orange-600 rounded flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <span className="text-[4px] text-white text-center font-serif leading-tight">THE 5 AM<br/>CLUB</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0B1B3D] leading-tight">The 5 AM Club</span>
                    <span className="text-[10px] text-slate-500">Robin Sharma</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-extrabold text-[#0B1B3D]">96</span>
                  <span className="text-[9px] text-slate-400">Loans</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-400 w-4">4</span>
                  <div className="h-10 w-8 bg-[#fdfaf5] rounded flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <span className="text-[4px] text-slate-900 text-center font-serif leading-tight">THINKING<br/>FAST...</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0B1B3D] leading-tight">Thinking, Fast and Slow</span>
                    <span className="text-[10px] text-slate-500">Daniel Kahneman</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-extrabold text-[#0B1B3D]">84</span>
                  <span className="text-[9px] text-slate-400">Loans</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-slate-400 w-4">5</span>
                  <div className="h-10 w-8 bg-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                    <span className="text-[4px] text-white/50 text-center font-serif leading-tight">CLEAN<br/>CODE</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0B1B3D] leading-tight">Clean Code</span>
                    <span className="text-[10px] text-slate-500">Robert C. Martin</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-extrabold text-[#0B1B3D]">72</span>
                  <span className="text-[9px] text-slate-400">Loans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Database & Backups */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col">
            <h3 className="font-bold text-[15px] text-[#0B1B3D] mb-5">Database & Backups</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Last Backup</span>
                    <span className="text-[10px] text-slate-500">June 26, 2026 - 02:00 AM</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Status: Successful</span>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[12px] text-[#0B1B3D]">Next Scheduled Backup</span>
                    <span className="text-[10px] text-slate-500">June 27, 2026 - 02:00 AM</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500">Auto backup enabled</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400">Total Backups</span>
                <span className="text-[15px] font-extrabold text-[#0B1B3D]">48</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400">Successful</span>
                <span className="text-[15px] font-extrabold text-[#0B1B3D]">47</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-red-400">Failed</span>
                <span className="text-[15px] font-extrabold text-red-500">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0 mt-0 lg:mt-[52px]">
        
        {/* System Alerts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[15px] text-[#0B1B3D]">System Alerts</h3>
            <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <div className="h-8 w-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Database Backup Failed</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-red-50 text-red-600 text-[9px] font-bold px-1.5 rounded">High</span>
                  <span className="text-[9px] text-slate-400">June 26, 2026 - 02:15 AM</span>
                </div>
                <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Investigate &rarr;</Link>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center shrink-0">
                <Archive className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Low Stock Alert</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 rounded">Medium</span>
                  <span className="text-[9px] text-slate-500">12 items are below threshold</span>
                </div>
                <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View items &rarr;</Link>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">New App Update Available</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 rounded">Info</span>
                  <span className="text-[9px] text-slate-500">v2.4.1 is ready to deploy</span>
                </div>
                <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Update &rarr;</Link>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">System Maintenance Scheduled</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 rounded">Info</span>
                  <span className="text-[9px] text-slate-500">June 30, 2026 - 12:00 AM</span>
                </div>
                <Link href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View schedule &rarr;</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent System Activity */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[15px] text-[#0B1B3D]">Recent System Activity</h3>
            <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">View all</Link>
          </div>
          
          <div className="flex flex-col gap-5 relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-100"></div>
            
            <div className="flex gap-4 relative z-10">
              <div className="h-8 w-8 bg-white border border-slate-200 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">User Role Updated</span>
                  <span className="text-[9px] font-bold text-slate-400">10:24 AM</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">James Mwangi (STA-0008) role changed by Super Admin</span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="h-8 w-8 bg-white border border-slate-200 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <UserPlus className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">New Member Added</span>
                  <span className="text-[9px] font-bold text-slate-400">09:45 AM</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Daniel Otieno (STU-2410092) added by Librarian Assistant</span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="h-8 w-8 bg-white border border-slate-200 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Backup Completed</span>
                  <span className="text-[9px] font-bold text-slate-400">06:00 AM</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">System backup completed successfully by System</span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="h-8 w-8 bg-white border border-slate-200 text-red-500 rounded-full flex items-center justify-center shrink-0">
                <FileCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Policy Updated</span>
                  <span className="text-[9px] font-bold text-slate-400">Yesterday</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Booking Policy was updated by Super Admin</span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="h-8 w-8 bg-white border border-slate-200 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <ToggleLeft className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[12px] text-[#0B1B3D] leading-tight">Feature Flag Enabled</span>
                  <span className="text-[9px] font-bold text-slate-400">Yesterday</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">New Hold Expiry feature enabled by Super Admin</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
