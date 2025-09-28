import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from "@/components/Pagination"
import DataUsageDetails from "@/components/hardware/DataUsageDetails"

// Define row type for this table
interface UsageRow {
  id: string
  client: string
  name: string
  ip: string
  usage: string
  status: "online" | "offline" | "inactive"
}

// Dummy data
const sampleUsage: UsageRow[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `u_${i}`,
  client: `Client ${i + 1}`,
  name: `Router-${i + 1}`,
  ip: `192.168.1.${i + 10}`,
  usage: `${(Math.random() * 50 + 10).toFixed(1)} TB`,
  status: i % 3 === 0 ? "online" : i % 3 === 1 ? "offline" : "inactive",
}))

const OthersUsage: React.FC = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")
  const [page, setPage] = useState(1)
  const pageSize = 8
  const [selectedRow, setSelectedRow] = useState<UsageRow | null>(null)

  // filter + search
  const filtered = useMemo(() => {
    return sampleUsage.filter((row) => {
      const matchesSearch =
        row.client.toLowerCase().includes(search.toLowerCase()) ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.ip.includes(search)
      return matchesSearch
    })
  }, [search])

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page])

  if (selectedRow) {
    return <DataUsageDetails row={selectedRow as any} onBack={() => setSelectedRow(null)} />
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Input
            placeholder="Search usage..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="sm:w-60"
          />

          <Select
            value={filter}
            onValueChange={(val: "daily" | "weekly" | "monthly" | "yearly") => {
              setFilter(val)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted text-left">
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">IP Address</th>
                <th className="px-3 py-2">Usage</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} className="border-t hover:bg-muted/50">
                  <td className="px-3 py-2">{row.client}</td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.ip}</td>
                  <td className="px-3 py-2">{row.usage}</td>
                  <td className="px-3 py-2 capitalize">{row.status}</td>
                  <td className="px-3 py-2 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRow(row)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No usage data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > pageSize && (
          <Pagination
            currentPage={page}
            pageSize={pageSize}
            totalPages={filtered.length}
            onPageChange={setPage}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default OthersUsage
