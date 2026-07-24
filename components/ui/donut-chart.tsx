'use client'

interface Segment {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  segments: Segment[]
  centerValue: number
  centerLabel: string
  size?: number
}

export function DonutChart({ segments, centerValue, centerLabel, size = 100 }: DonutChartProps) {
  const outerR = 40
  const innerR = 28
  const cx = 50
  const cy = 50
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1

  const paths = segments.map((seg, index) => {
    const accumulated = segments.slice(0, index).reduce((sum, s) => sum + s.value, 0)
    const fraction = seg.value / total
    const startAngle = (accumulated / total) * 2 * Math.PI - Math.PI / 2
    const endAngle = ((accumulated + seg.value) / total) * 2 * Math.PI - Math.PI / 2

    const largeArc = fraction > 0.5 ? 1 : 0

    const outerX1 = cx + outerR * Math.cos(startAngle)
    const outerY1 = cy + outerR * Math.sin(startAngle)
    const outerX2 = cx + outerR * Math.cos(endAngle)
    const outerY2 = cy + outerR * Math.sin(endAngle)
    const innerX1 = cx + innerR * Math.cos(endAngle)
    const innerY1 = cy + innerR * Math.sin(endAngle)
    const innerX2 = cx + innerR * Math.cos(startAngle)
    const innerY2 = cy + innerR * Math.sin(startAngle)

    if (fraction === 0) return null

    const d = [
      `M ${outerX1} ${outerY1}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerX2} ${outerY2}`,
      `L ${innerX1} ${innerY1}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerX2} ${innerY2}`,
      'Z',
    ].join(' ')

    return <path key={seg.label} d={d} fill={seg.color} />
  })

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" width={size} height={size} className="shrink-0">
        {paths}
        <text x={cx} y={cy - 2} textAnchor="middle" className="text-[16px] font-bold fill-slate-900">
          {centerValue}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" className="text-[7px] fill-slate-400">
          {centerLabel}
        </text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.filter(s => s.value > 0).map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[12px] text-slate-600">{seg.label}</span>
            <span className="text-[12px] font-medium text-slate-800 ml-auto">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
