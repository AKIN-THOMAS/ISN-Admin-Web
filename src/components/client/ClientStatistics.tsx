// src/components/clients/ClientStatistics.tsx
import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import StatusPill from "@/components/StatusPill"
// import { cn } from "@/lib/utils"

type Client = {
  id: string
  name: string
  status: string
}

type Service = {
  id: string
  name?: string
  type: string
  totalPrice: string
  tariff: string
  connectedFrom?: string
  invoicingPeriod?: string
  contractValidTill?: string
  details: Record<string, string | number | null>
}

interface Props {
  client: Client
  service?: Service
  onEdit?: (s: Service) => void
  onSeeDataUsage?: (s: Service) => void
}

const sampleService: Service = {
  id: "2155",
  type: "Internet",
  name: "Internet - David",
  totalPrice: "26,000.00 NGN incl. VAT (24,186.05 NGN excl. VAT)",
  tariff: "Home_User_10Mbps(1:1)",
  connectedFrom: "2025-07-31",
  invoicingPeriod: "Monthly (31/7/2025)",
  contractValidTill: "---",
  details: {
    "DOWNLOAD SPEED": "10.50 Mbit/s",
    "UPLOAD SPEED": "10.50 Mbit/s",
    "BASIC SPEED": "10.50 / 10.50 Mbit/s",
    ROUTER: "IKEJA GRA BTS RTR (20.20.51.1) Mikrotik",
    "INSTALLATION ADDRESS": "No 5, Oba Dosunmu Street, 100271 GRA, Ikeja plot 73",
    "CLIENT IP ADDRESS": "20.20.51.22",
    "CLIENT MAC ADDRESS": "---",
    "TELEPHONE, MOBILE": "08141212414, 07012344321",
    "EMAIL ADDRESS": "dave@gmail.com",
    "ACCESS POINT": "---",
    "END DEVICES": "--- (IP not specified)",
    "CREATED BY": "Felix Suleiman - 31/7/2025",
    "CLIENT END DEVICE": "---",
    "LAST CHANGE": "---",
    "LABELS": "---",
    "DATA PER MONTH": "480.00 B / 0.00B",
  },
}

function formatDate(iso?: string) {
  if (!iso) return "—"
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  } catch {
    return iso
  }
}

/** small SVG copy icon */
const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M16 3H7a2 2 0 0 0-2 2v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9" y="7" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/** up-down signal icon */
const SignalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12h3l3-8 4 16 3-10 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/** Graph placeholder (nice looking simple lines — replace with real chart lib) */
const GraphPlaceholder: React.FC = () => (
  <div className="rounded-md border p-4 bg-white">
    <svg viewBox="0 0 800 260" preserveAspectRatio="none" className="w-full h-64">
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      {/* grid lines */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={40} x2={760} y1={40 + i*36} y2={40 + i*36} stroke="#eef2f7" strokeWidth={1} />
      ))}
      {/* months labels */}
      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i) => (
        <text key={m} x={60 + i*60} y={240} fontSize={12} fill="#94a3b8" textAnchor="middle">{m}</text>
      ))}
      {/* download line (blue) */}
      <polyline fill="none" stroke="#3b82f6" strokeWidth={3} points="60,190 120,160 180,150 240,140 300,160 360,150 420,170 480,155 540,165 600,150 660,145 720,130" />
      {/* upload line (orange) */}
      <polyline fill="none" stroke="#f59e0b" strokeWidth={3} points="60,170 120,150 180,140 240,120 300,145 360,135 420,160 480,140 540,155 600,140 660,135 720,125" />
    </svg>
  </div>
)

const SummaryCard: React.FC<{ title: string; value: React.ReactNode }> = ({ title, value }) => (
  <div className="border rounded-md p-3 bg-white">
    <div className="text-xs uppercase tracking-wider text-red-600 font-semibold">{title}</div>
    <div className="mt-2 font-medium">{value}</div>
  </div>
)

const ClientStatistics: React.FC<Props> = ({ client, service = sampleService, onEdit, onSeeDataUsage }) => {
  const [copied, setCopied] = useState(false)
  const [period, setPeriod] = useState<"monthly" | "daily" | "weekly" | "yearly">("monthly")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(service.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // silent fail
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    }
  }

  const detailEntries = useMemo(() => Object.entries(service.details), [service])

  return (
    <div className="space-y-6 py-5 px-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Internet Statistics</h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <div>ID - {service.id}</div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
              aria-label="Copy service id"
            >
              <CopyIcon className="text-muted-foreground" />
              <span className="sr-only">Copy ID</span>
            </button>
            {copied && <span className="text-xs text-green-600">Copied!</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSeeDataUsage?.(service)}
            className="px-3 py-1 rounded border border-red-600 text-red-600 hover:bg-red-50 text-sm"
          >
            See Data Usage
          </button>

          <Button variant="outline" onClick={() => onEdit?.(service)}>Edit</Button>

          <button
            type="button"
            className="p-2 rounded border hover:bg-gray-100"
            title="Signal"
            onClick={() => console.log("signal clicked")}
          >
            <SignalIcon />
          </button>
        </div>
      </div>

      {/* main card with graph, summaries and details */}
      <Card>
        <CardContent className="p-6">
          {/* Graph area with period select */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">(Mbps)</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" />Download</span>
                  <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500" />Upload</span>
                </div>

                <select
                  aria-label="Period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="border px-3 py-1 rounded text-sm"
                >
                  <option value="monthly">Monthly</option>
                  <option value="daily">Day</option>
                  <option value="weekly">Weekly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <GraphPlaceholder />
          </div>

          {/* 5 summary cards below graph */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <SummaryCard title="Total Price" value={<div className="text-sm">{service.totalPrice}</div>} />
            <SummaryCard title="Tariff" value={<div className="text-sm">{service.tariff}</div>} />
            <SummaryCard title="Connected from" value={<div className="text-sm">{formatDate(service.connectedFrom)}</div>} />
            <SummaryCard title="Invoicing period" value={<div className="text-sm">{service.invoicingPeriod ?? "—"}</div>} />
            <SummaryCard title="Contract valid till" value={<div className="text-sm">{service.contractValidTill ?? "—"}</div>} />
          </div>

          {/* details list ( ~17 items ) */}
          <div className="mt-6">
            <div className="border rounded-md bg-white">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {detailEntries.map(([label, val]) => (
                    <div key={label} className="flex flex-col">
                      <div className="text-xs text-red-600 font-semibold uppercase tracking-wide">{label}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{val ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientStatistics
