import React, { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Pagination from "@/components/Pagination"
import StatusPill from "@/components/StatusPill"

export type DeactRow = {
  id: string
  client: string
  email: string
  loginName: string
  location: string
  mobile: string
  status: "deactivated"
}

const sampleDeactivated: DeactRow[] = [
  { id: "d1", client: "Old1", email: "old1@example.com", loginName: "old1", location: "GRA", mobile: "08000000001", status: "deactivated" },
  { id: "d2", client: "Old2", email: "old2@example.com", loginName: "old2", location: "Ikeja", mobile: "08000000002", status: "deactivated" },
  { id: "d3", client: "Old3", email: "old3@example.com", loginName: "old3", location: "Lekki", mobile: "08000000003", status: "deactivated" },
  // add more if desired
]

const DeactivatedTable: React.FC<{ onViewClient: (row: DeactRow) => void }> = ({ onViewClient }) => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return sampleDeactivated.filter(r => {
      return !q || (
        r.client.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.loginName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.mobile.toLowerCase().includes(q)
      )
    })
  }, [search])

  useEffect(() => setPage(1), [search])

  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [page, totalPages])

  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Input placeholder="Search deactivated clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-64" />
        {/* no status filter on deactivated table */}
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
                  <td className="p-2"><StatusPill status={r.status} /></td>
                  <td className="p-2 flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewClient(r)}>View</Button>
                    <Button size="sm" variant="ghost" aria-label="More">⋮</Button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">No deactivated clients found</td></tr>
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

export default DeactivatedTable
