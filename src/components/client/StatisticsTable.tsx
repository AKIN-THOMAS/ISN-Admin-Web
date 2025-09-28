import React, { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Pagination from "@/components/Pagination"
// import { cn } from "@/lib/utils"
import StatusPill from "@/components/StatusPill"

export type StatsRow = {
  id: string
  client: string
  email: string
  loginName: string
  location: string
  dataUsage: string
  bandwidth: string
  status: "active" | "inactive" | "deactivated"
}

const sampleStats: StatsRow[] = [
  { id: "1", client: "David", email: "dave@example.com", loginName: "david1", location: "Ikeja", dataUsage: "2.4TB", bandwidth: "10Mbps", status: "active"},
  { id: "2", client: "Mary", email: "mary@example.com", loginName: "mary1", location: "Surulere", dataUsage: "1.1TB", bandwidth: "5Mbps", status: "active"},
  { id: "3", client: "Tony", email: "tony@example.com", loginName: "tony", location: "Lekki", dataUsage: "500GB", bandwidth: "2Mbps", status: "inactive"},
  { id: "4", client: "Aisha", email: "aisha@example.com", loginName: "aisha", location: "Ikeja", dataUsage: "3.8TB", bandwidth: "15Mbps", status: "active"},
  { id: "5", client: "Luke", email: "luke@example.com", loginName: "luke", location: "GRA", dataUsage: "0.0TB", bandwidth: "0Mbps", status: "deactivated"},
  { id: "6", client: "Sara", email: "sara@example.com", loginName: "sara", location: "Yaba", dataUsage: "720GB", bandwidth: "8Mbps", status: "active"},
]

const StatisticsTable: React.FC<{ onViewClient: (row: StatsRow) => void }> = ({ onViewClient }) => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "deactivated">("all")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = useMemo(() => {
    return sampleStats.filter(r => {
      const matchesFilter = filter === "all" || r.status === filter
      const q = search.trim().toLowerCase()
      const matchesSearch = !q || (
        r.client.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.loginName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.dataUsage.toLowerCase().includes(q) ||
        r.bandwidth.toLowerCase().includes(q)
      )
      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  useEffect(() => setPage(1), [search, filter])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [page, totalPages])

  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Input placeholder="Search statistics..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-64" />
        <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
          <SelectTrigger className="sm:w-44"><SelectValue placeholder="Filter status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="deactivated">Deactivated</SelectItem>
          </SelectContent>
        </Select>
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
                <th className="p-2 text-left text-sm font-medium">Data Usage</th>
                <th className="p-2 text-left text-sm font-medium">Bandwidth</th>
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
                  <td className="p-2">{r.dataUsage}</td>
                  <td className="p-2">{r.bandwidth}</td>
                  <td className="p-2"><StatusPill status={r.status} /></td>
                  <td className="p-2 flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewClient(r)}>View</Button>
                    <Button size="sm" variant="ghost" aria-label="More">⋮</Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">No records found</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

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

export default StatisticsTable
