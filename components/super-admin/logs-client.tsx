'use client'

import { FileText, AlertTriangle, Info, XCircle } from 'lucide-react'
import { SectionCard } from '@/components/ui/section-card'

interface LogEntry {
  id: string
  level: string
  source: string
  message: string
  detail: string
  timestamp: string
}

interface LogsClientProps {
  logs: LogEntry[]
  overdueCount: number
}

const levelConfig: Record<string, { Icon: typeof Info; color: string; bg: string }> = {
  ERROR: { Icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
  WARN: { Icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  INFO: { Icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
}

export function LogsClient({ logs, overdueCount }: LogsClientProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#071224]">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B9BD5]/10 text-[#5B9BD5] flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0B1B3D] dark:text-[#E2E8F0] tracking-tight">System Logs</h1>
            <p className="text-[12px] text-slate-500 dark:text-[#6B7A99]">Application and error logs</p>
          </div>
        </div>

        {overdueCount > 0 && (
          <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-[13px] text-amber-700 dark:text-amber-300">
              {overdueCount} overdue loan{overdueCount !== 1 ? 's' : ''} detected
            </span>
          </div>
        )}

        <SectionCard title="System Activity Logs" icon={FileText}>
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-10 w-10 text-slate-300 dark:text-[#6B7A99] mb-3" />
              <p className="text-[14px] text-slate-500 dark:text-[#6B7A99]">No log entries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Level</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Source</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Message</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Detail</th>
                    <th className="text-left py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => {
                    const lc = levelConfig[log.level] ?? levelConfig.INFO
                    const LIcon = lc.Icon
                    return (
                      <tr key={log.id} className="border-b border-slate-50 dark:border-white/[0.04] last:border-0">
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${lc.bg} ${lc.color}`}>
                            <LIcon className="h-3 w-3" />
                            {log.level}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[12px] text-slate-600 dark:text-[#E2E8F0]">{log.source}</td>
                        <td className="py-2.5 px-3 text-slate-800 dark:text-[#E2E8F0] font-medium">{log.message}</td>
                        <td className="py-2.5 px-3 text-slate-500 dark:text-[#6B7A99] max-w-[250px] truncate">{log.detail}</td>
                        <td className="py-2.5 px-3 text-slate-400 dark:text-[#6B7A99] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
