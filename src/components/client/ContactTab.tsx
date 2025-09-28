// src/components/clients/ClientsTab.tsx
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Pagination from "@/components/Pagination"
import { cn } from "@/lib/utils"

type ClientRow = {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "deactivated"
}

const sampleData: ClientRow[] = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  { id: "3", name: "Michael Brown", email: "mike@example.com", status: "active" },
  { id: "4", name: "Alice Johnson", email: "alice@example.com", status: "deactivated" },
  { id: "5", name: "Alice Johnson", email: "alice@example.com", status: "deactivated" },
  { id: "6", name: "Alice Johnson", email: "alice@example.com", status: "deactivated" },
  
]

// ✅ status pill helper
const statusPill = (status: string) => {
  const isActive = status.toLowerCase() === "active"
  const isInactive = status.toLowerCase() === "inactive"
  const isDeactivated = status.toLowerCase() === "deactivated"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        isActive
          ? "bg-green-100 text-green-700"
          : isInactive
          ? "bg-yellow-100 text-yellow-700"
          : isDeactivated
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-600"
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isActive
            ? "bg-green-500"
            : isInactive
            ? "bg-yellow-500"
            : isDeactivated
            ? "bg-red-500"
            : "bg-gray-400"
        )}
      />
      <span className="text-xs">{status}</span>
    </span>
  )
}

const ClientsTab: React.FC<{ onViewClient: (c: ClientRow) => void }> = ({
  onViewClient,
}) => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<
    "all" | "active" | "inactive" | "deactivated"
  >("all")
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 5

  // ✅ Filter + search
  const filtered = sampleData.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Pagination
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const isSelected = (id: string) => selected.includes(id)

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      {selected.length > 0 ? (
        <div className="flex items-center justify-between bg-muted/40 p-3 rounded-md">
          <span className="text-sm font-medium">
            {selected.length} selected
          </span>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              Delete
            </Button>
            <Button variant="outline" size="sm">
              Deactivate
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:w-64"
          />
          <Select
            value={filter}
            onValueChange={(
              val: "all" | "active" | "inactive" | "deactivated"
            ) => {
              setFilter(val)
              setPage(1)
            }}
          >
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="deactivated">Deactivated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left text-sm font-medium">Select</th>
                <th className="p-2 text-left text-sm font-medium">Name</th>
                <th className="p-2 text-left text-sm font-medium">Email</th>
                <th className="p-2 text-left text-sm font-medium">Status</th>
                {/* <th className="p-2 text-left text-sm font-medium">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr
                  key={c.id}
                  className={cn(
                    "border-t transition-colors",
                    isSelected(c.id)
                      ? "bg-primary/10"
                      : selected.length > 0
                      ? "opacity-60"
                      : ""
                  )}
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={isSelected(c.id)}
                      onChange={() => toggleSelect(c.id)}
                    />
                  </td>
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{statusPill(c.status)}</td>
                  <td className="p-2 flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewClient(c)}
                    >
                        View
                    </Button>
                    <Button size="sm" variant="ghost">
                        ⋮
                    </Button>
                    </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-muted-foreground"
                  >
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {filtered.length > pageSize && (
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalPages={Math.ceil(filtered.length / pageSize)}
        onPageChange={setPage}
        showSummary
        totalItems={filtered.length}
      />
    )}
    </div>
  )
}

export default ClientsTab
