// src/pages/ClientsPage.tsx
"use client"
import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ClientsTab from "@/components/client/ContactTab"
import ClientDetail from "@/components/client/ContactDetails"
import ServicesTable from "@/components/client/ServicesTable"
import StatisticsTable from "@/components/client/StatisticsTable"
import DeactivatedTable from "@/components/client/DeactivatedTable"
import NewContactForm from "@/components/client/NewContact"
import { useToast } from "@/components/ui/use-toast"

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

const ClientsPage: React.FC = () => {
  const [viewingClient, setViewingClient] = useState<any | null>(null)
  const [creatingClient, setCreatingClient] = useState(false)
  const [clients, setClients] = useState<ClientRow[]>([])
  const { toast } = useToast()

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      {/* Page Title + Button */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        {!creatingClient && (
          <button
            className="rounded-lg px-6 py-3 bg-white text-black text-sm md:text-base font-medium shadow-sm border w-full md:w-auto"
            type="button"
            onClick={() => setCreatingClient(true)}
          >
            New Client
          </button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clients" className="flex-1">
        {/* Responsive Tabs List */}
        <div className="overflow-x-auto">
          <TabsList className="flex w-max md:w-full space-x-2 md:space-x-4">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="deactivated">Deactivated</TabsTrigger>
          </TabsList>
        </div>

        {/* Clients Tab */}
        <TabsContent value="clients">
          {creatingClient ? (
            <NewContactForm
              onCancel={() => setCreatingClient(false)}
              onCreate={(data) => {
                const newClient: ClientRow = {
                  id: String(clients.length + 1),
                  name: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  status: "active",
                  phone: data.telephone,
                  address: data.streetAddress,
                }
                setClients((prev) => [...prev, newClient])
                toast({
                  title: "Client Created",
                  description: `${newClient.name} was added successfully.`,
                })
                setCreatingClient(false)
              }}
            />
          ) : !viewingClient ? (
            <ClientsTab onViewClient={(c) => setViewingClient(c as ClientRow)} />
          ) : (
            <ClientDetail client={viewingClient} onBack={() => setViewingClient(null)} />
          )}
        </TabsContent>

        {/* Service Tab */}
        <TabsContent value="service">
          {!viewingClient ? (
            <ServicesTable onViewClient={(c) => setViewingClient(c)} />
          ) : (
            <ClientDetail client={viewingClient} onBack={() => setViewingClient(null)} />
          )}
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          {!viewingClient ? (
            <StatisticsTable onViewClient={(c) => setViewingClient(c)} />
          ) : (
            <ClientDetail client={viewingClient} onBack={() => setViewingClient(null)} />
          )}
        </TabsContent>

        {/* Deactivated Tab */}
        <TabsContent value="deactivated">
          {!viewingClient ? (
            <DeactivatedTable onViewClient={(c) => setViewingClient(c)} />
          ) : (
            <ClientDetail client={viewingClient} onBack={() => setViewingClient(null)} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ClientsPage
