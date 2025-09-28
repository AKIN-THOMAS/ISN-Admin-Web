import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StatusPill from "../StatusPill"
import ClientServices from "./ClientServicesTab"
import ClientStatistics from "./ClientStatistics"
import EmptyState from "../common/EmptyState"
import EditContactForm from "./EditContactInfo"

type ClientRow = {
  id: string
  name: string
  email: string
  status: string
  staffId?: string
  phone?: string
  address?: string
  createdAt?: string
  lastLogin?: string
}

const tabs = [
  { key: "info", label: "Information" },
  { key: "services", label: "Services" },
  { key: "statistics", label: "Statistics" },
  { key: "cancellations", label: "Cancellations" },
  { key: "history", label: "History" },
]

const ClientDetail: React.FC<{ client: ClientRow; onBack: () => void }> = ({
  client,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState("info")
  const [editing, setEditing] = useState(false)

   if (editing) {
    return (
      <EditContactForm
        client={client}
        onCancel={() => setEditing(false)}
        onSave={(updated) => {
          console.log("Updated client:", updated)
          setEditing(false)
          onBack() // go back to list after save
        }}
      />
    )
  }


  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        ← Back to Clients
      </Button>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={cn(
              "px-4 py-2 font-semibold transition-colors border-b-2",
              activeTab === tab.key
                ? "text-red-500 border-red-500"
                : "text-muted-foreground border-transparent hover:text-red-500"
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "info" && (
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Header with Edit + Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <StatusPill status={client.status} />
              <Button variant="outline"
              onClick={() => setEditing(true)}
              >
                Edit Information
              </Button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Detail label="Name" value={client.name} />
              <Detail label="Email" value={client.email} />
              <Detail label="Staff ID" value={client.staffId ?? "—"} />
              <Detail label="Phone" value={client.phone ?? "—"} />
              <Detail label="Address" value={client.address ?? "—"} />
              <Detail label="Created At" value={client.createdAt ?? "—"} />
              <Detail label="Last Login" value={client.lastLogin ?? "—"} />
              <Detail label="Status" value={<StatusPill status={client.status} />} />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "services" && (
        <Card>
          <ClientServices client={client} onEdit={(s) => {
          // open edit modal or route to edit page
          console.log("edit service", s)
        }}  />
        </Card>
      )}
      {activeTab === "statistics" && (
        <Card>
           <ClientStatistics
              client={client}
              // service={internetService} // pass the internet Service object
              onEdit={(s) => console.log("edit service", s)}
              onSeeDataUsage={(s) => {
                // show DataUsageDetails or navigate to the Usage view
                console.log("open data usage for", s)
              }}
            />
        </Card>
      )}
      {activeTab === "cancellations" && (
        <Card>
          <EmptyState
            title="No cancellations"
            description="This client has no cancellation records."
          />
        </Card>
      )}
      {activeTab === "history" && (
        <Card>
          <EmptyState
            title="No cancellations"
            description="This client has no cancellation records."
          />
        </Card>
      )}
    </div>
  )
}

const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-lg font-medium">{value}</div>
  </div>
)

export default ClientDetail
