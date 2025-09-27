import React, { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type RouterRow = {
  id: number
  client: string
  internalId: string
  name: string
  ip: string
  status: "active" | "inactive" | "offline"
}

// Dummy data for now
const dummyRouters: RouterRow[] = [
  { id: 1, client: "Client A", internalId: "INT-001", name: "Router Alpha", ip: "192.168.1.1", status: "active" },
  { id: 2, client: "Client B", internalId: "INT-002", name: "Router Beta", ip: "192.168.1.2", status: "inactive" },
  { id: 3, client: "Client C", internalId: "INT-003", name: "Router Gamma", ip: "192.168.1.3", status: "offline" },
  { id: 4, client: "Client D", internalId: "INT-004", name: "Router Delta", ip: "192.168.1.4", status: "active" },
  { id: 5, client: "Client E", internalId: "INT-005", name: "Router Epsilon", ip: "192.168.1.5", status: "inactive" },
]

const ITEMS_PER_PAGE = 5

const OthersRoutes: React.FC = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "offline">("all")
  const [page, setPage] = useState(1)

  // Filter + search logic
  const filteredData = useMemo(() => {
    let rows = [...dummyRouters]
    if (filter !== "all") {
      rows = rows.filter((row) => row.status === filter)
    }
    if (search.trim()) {
      rows = rows.filter(
        (row) =>
          row.client.toLowerCase().includes(search.toLowerCase()) ||
          row.name.toLowerCase().includes(search.toLowerCase()) ||
          row.ip.toLowerCase().includes(search.toLowerCase())
      )
    }
    return rows
  }, [search, filter])

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <Card className="rounded-2xl shadow-sm border">
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Search + Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Input
            placeholder="Search by client, name or IP..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1) // reset pagination on search
            }}
            className="sm:w-64"
          />
          <Select
            value={filter}
            onValueChange={(val: "all" | "active" | "inactive" | "offline") => {
              setFilter(val)
              setPage(1) // reset pagination on filter
            }}
          >
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Client</th>
                <th className="px-4 py-2 text-left font-semibold">Internal ID</th>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                <th className="px-4 py-2 text-left font-semibold">IP</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30">
                    <td className="px-4 py-2">{row.client}</td>
                    <td className="px-4 py-2">{row.internalId}</td>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.ip}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${
                            row.status === "active"
                              ? "bg-green-100 text-green-700"
                              : row.status === "inactive"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted-foreground">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <div className="text-sm">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OthersRoutes
