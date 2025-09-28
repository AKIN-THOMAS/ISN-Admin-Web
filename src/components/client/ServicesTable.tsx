import React, { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Pagination from "@/components/Pagination" 
// import { cn } from "@/lib/utils"
import StatusPill from "@/components/StatusPill"

export type ServiceRow = {
  id: string
  client: string
  email: string
  loginName: string
  location: string
  mobile: string
  service: string
  status: "active" | "inactive" | "deactivated"
}

const sampleServices: ServiceRow[] = [
  { id: "1", client: "David", email: "dave@example.com", loginName: "david1", location: "Ikeja", mobile: "0812345678", service: "Internet", status: "active" },
  { id: "2", client: "Mary", email: "mary@example.com", loginName: "mary1", location: "Surulere", mobile: "08011112222", service: "Internet", status: "active" },
  { id: "3", client: "Tony", email: "tony@example.com", loginName: "tony", location: "Lekki", mobile: "08033334444", service: "Email", status: "inactive" },
  { id: "4", client: "Aisha", email: "aisha@example.com", loginName: "aisha", location: "Ikeja", mobile: "08099990000", service: "VPN", status: "active" },
  { id: "5", client: "Luke", email: "luke@example.com", loginName: "luke", location: "GRA", mobile: "08022223333", service: "Internet", status: "deactivated" },
  { id: "6", client: "Sara", email: "sara@example.com", loginName: "sara", location: "Yaba", mobile: "08044445555", service: "Internet", status: "active" },
  // ...add more sample rows as needed
]

const ServicesTable: React.FC<{ onViewClient: (row: ServiceRow) => void }> = ({ onViewClient }) => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "deactivated">("all")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = useMemo(() => {
    return sampleServices.filter(r => {
      const matchesFilter = filter === "all" || r.status === filter
      const q = search.trim().toLowerCase()
      const matchesSearch = !q || (
        r.client.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.loginName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.mobile.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
      )
      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  // reset page on filter/search
  useEffect(() => setPage(1), [search, filter])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-64" />
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="deactivated">Deactivated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left text-sm font-medium">S/N</th>
                <th className="p-2 text-left text-sm font-medium">Client</th>
                <th className="p-2 text-left text-sm font-medium">Email</th>
                <th className="p-2 text-left text-sm font-medium">Login name</th>
                <th className="p-2 text-left text-sm font-medium">Location</th>
                <th className="p-2 text-left text-sm font-medium">Mobile</th>
                <th className="p-2 text-left text-sm font-medium">Service</th>
                <th className="p-2 text-left text-sm font-medium">Status</th>
                <th className="p-2 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r, idx) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="p-2">{r.client}</td>
                  <td className="p-2">{r.email}</td>
                  <td className="p-2">{r.loginName}</td>
                  <td className="p-2">{r.location}</td>
                  <td className="p-2">{r.mobile}</td>
                  <td className="p-2">{r.service}</td>
                  <td className="p-2"><StatusPill status={r.status} /></td>
                  <td className="p-2 flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewClient(r)}>View</Button>
                    <Button size="sm" variant="ghost" aria-label="More">⋮</Button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-muted-foreground">No services found</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination: uses your Pagination component */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
        showSummary
        totalItems={totalItems}
        pageSize={pageSize}
      />
    </div>
  )
}

export default ServicesTable
