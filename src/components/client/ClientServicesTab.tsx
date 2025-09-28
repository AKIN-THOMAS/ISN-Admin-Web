// src/components/clients/ClientServices.tsx
import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import StatusPill from "@/components/StatusPill"

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
  services?: Service[]
  onEdit?: (service: Service) => void
}

function formatDate(iso?: string) {
  if (!iso) return "—"
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  } catch {
    return iso
  }
}

// sample fallback data (unchanged from previous)
const sampleServices: Service[] = [
  {
    id: "2155",
    name: "Internet - David",
    type: "Internet",
    totalPrice: "26,000.00 NGN incl. VAT",
    tariff: "Home_User_10Mbps(1:1)",
    connectedFrom: "2025-07-31",
    invoicingPeriod: "Monthly (31/7/2025)",
    contractValidTill: "---",
    details: {
      SPEED: "10.50 / 10.50 Mbit/s",
      ROUTER: "IKEJA GRA BTS RTR (20.20.51.1) Mikrotik",
      "INSTALLATION ADDRESS": "No 5, Oba Dosunmu Street, 100271 GRA, Ikeja plot 73",
      DETAILS: "26,000.00 NGN - Service Price",
      "INVOICE SEPARATELY": "---",
      "CLIENT IP ADDRESS": "20.20.51.22",
      MASK: "255.255.255.0 (/24) (Ikeja GRA LAN)",
      GATEWAY: "20.20.51.1",
      "PRIMARY DNS": "127.0.0.1",
      "SECONDARY DNS": "192.168.1.1",
      "CLIENT MAC ADDRESS": "---",
      "END DEVICE MAC ADDRESS": "---",
      "END DEVICE HARDWARE": "---",
      "CREATED BY": "Felix Suleiman - 31/7/2025",
      "LAST MODIFIED": "---",
      LABELS: "---",
      "END LINKS ASSOCIATED WITH THE SERVICE": "---",
    },
  }
]

const SummaryCard: React.FC<{ title: string; value: React.ReactNode }> = ({ title, value }) => (
  <div className="border rounded-md p-3 bg-white">
    <div className="text-xs uppercase tracking-wider text-red-600 font-semibold">{title}</div>
    <div className="mt-2 font-medium">{value}</div>
  </div>
)

const CompactServiceCard: React.FC<{ service: Service; onEdit?: (s: Service) => void }> = ({ service, onEdit }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h4 className="text-md font-semibold">{service.name ?? `${service.type} — ${service.id}`}</h4>
          <div className="text-xs text-muted-foreground mt-1">ID - {service.id}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit?.(service)}>Edit</Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <SummaryCard title="Total price" value={<div className="text-sm">{service.totalPrice}</div>} />
        <SummaryCard title="Tariff" value={<div className="text-sm">{service.tariff}</div>} />
        <SummaryCard title="Connected from" value={<div className="text-sm">{formatDate(service.connectedFrom)} </div>} />
        <SummaryCard title="Invoicing period" value={<div className="text-sm">{service.invoicingPeriod ?? "—"}</div>} />
        <SummaryCard title="Contract valid till" value={<div className="text-sm">{service.contractValidTill ?? "—"}</div>} />
      </div>
        {/* long details list */}
          <div className="mt-6 border rounded-md bg-white">
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(service.details).map(([label, val]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">{label}</span>
                    <span className="mt-2 text-sm text-muted-foreground">{val ?? "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </CardContent>
  </Card>
)

const ClientServices: React.FC<Props> = ({ client, services = sampleServices, onEdit }) => {
  // subTab: 'all' or 'internet' — keep 'all' behavior unchanged, internet will be empty placeholder
  const [subTab, setSubTab] = useState<"all" | "internet">("all")

  const internetService = useMemo(() => services.find(s => s.type.toLowerCase() === "internet" || (s.name && s.name.toLowerCase().includes("internet"))), [services])

  const clientTotal = useMemo(() => {
    if (!services || services.length === 0) return "—"
    return services[0].totalPrice
  }, [services])

  return (
    <div className="space-y-6 py-5 px-4">
      {/* top two pill tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSubTab("all")}
          className={cn(
            "px-4 py-1 rounded-full text-sm font-semibold transition-colors",
            subTab === "all"
              ? "bg-red-600 text-white shadow"
              : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
          )}
        >
          All Services
        </button>

        <button
          onClick={() => setSubTab("internet")}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            subTab === "internet"
              ? "bg-red-50 text-red-600 border border-red-100"
              : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
          )}
        >
          Internet
        </button>
      </div>

      {/* monthly payment card (unchanged) */}
      <div className="max-w-md">
        <div className="rounded-md bg-gray-50 border p-4">
          <div className="text-xs text-muted-foreground">Client's total monthly payment</div>
          <div className="mt-2 text-lg font-semibold">{clientTotal}</div>
          <div className="text-sm text-muted-foreground mt-1">(excl. VAT)</div>
        </div>
      </div>

      {/* ALL SERVICES: keep the previous content exactly as it was */}
      {subTab === "all" && (
        <div className="space-y-4">
          {services.map(s => (
            <CompactServiceCard key={s.id} service={s} onEdit={onEdit} />
          ))}
        </div>
      )}

      {/* INTERNET: empty for now (placeholder) */}
      {subTab === "internet" && (
        <div className="rounded-md border p-6 bg-white text-muted-foreground">
          {/* intentionally left empty for now — fill later */}
        </div>
      )}
    </div>
  )
}

export default ClientServices
