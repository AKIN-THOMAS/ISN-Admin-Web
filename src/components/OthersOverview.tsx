import React from 'react'
import type { TableRow } from '@/components/BasicTable'

interface Props {
  row?: TableRow
  onBack: () => void
}

const OthersOverview: React.FC<Props> = ({ row }) => {
  // safely resolve values even if row is undefined
  const name =
    (row && (row.name as string)) ??
    (row && (row.client as string)) ??
    'Device'

  // dataUsage may be a simple string or a React node in other places; handle both
  const dataUsage =
    row && typeof row.dataUsage === 'string'
      ? (row.dataUsage as string)
      : row && row.dataUsage && typeof row.dataUsage !== 'string'
      ? null
      : '—'

  return (
    <div className="space-y-6">
      {/* top heading + stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xs text-muted-foreground uppercase">This Month</div>
          <div className="text-xl sm:text-2xl font-bold">{dataUsage ?? '48.3TB'}</div>
          <div className="text-sm text-muted-foreground">of 100TB - SystemWide Usage</div>
        </div>
      </div>

      {/* small KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <div className="text-xs text-muted-foreground uppercase">Today's usage</div>
          <div className="text-xl sm:text-2xl font-semibold">2.4TB</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase">This week</div>
          <div className="text-xl sm:text-2xl font-semibold">9.8TB</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase">This month</div>
          <div className="text-xl sm:text-2xl font-semibold">48.3TB</div>
          <div className="text-xs sm:text-sm text-muted-foreground">(of 100TB - SystemWide Usage)</div>
        </div>
      </div>

      {/* date / controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
        <div className="text-sm text-muted-foreground">Showing details for</div>
        <div className="px-3 py-2 border rounded text-sm w-fit">Jul 30 2025 - Aug 10 2025</div>

        <div className="sm:ml-4">
          <select className="border px-3 py-2 rounded text-sm w-full sm:w-auto">
            <option>Use Date picker</option>
            <option>Monthly</option>
            <option>Day</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      {/* Chart placeholder (swap out for Recharts/Chart.js) */}
      <div className="rounded-lg border p-4 sm:p-6 bg-white">
        <div className="text-xs text-muted-foreground mb-4">(Chart placeholder)</div>
        <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-white to-gray-50 rounded-lg flex items-center justify-center text-muted-foreground">
          <svg width="90%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
            <rect width="100%" height="100%" fill="none" />
            <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="10,240 80,200 160,220 240,160 320,170 400,150 480,180 560,140 640,160 720,120" />
            <polyline fill="none" stroke="#f59e0b" strokeWidth="3" points="10,200 80,160 160,180 240,140 320,200 400,220 480,200 560,170 640,190 720,170" />
          </svg>
        </div>
      </div>

      {/* bottom summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-12 gap-4">
        <div>
          <div className="text-xs text-muted-foreground uppercase">Usage details for duration</div>
          <div className="text-xl sm:text-2xl font-semibold">34.6TB</div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground uppercase">Average connected clients</div>
          <div className="text-xl sm:text-2xl font-semibold">210</div>
        </div>
      </div>
    </div>
  )
}

export default OthersOverview
