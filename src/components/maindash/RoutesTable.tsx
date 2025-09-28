import React, { useMemo, useState } from 'react'
import BasicTable, { TableRow, TableColumn } from '@/components/BasicTable'
import Pagination from '@/components/Pagination'

const ITEMS_PER_PAGE = 7

const columns: TableColumn[] = [
  { key: 'service', label: 'Service' },
  { key: 'total', label: 'Total', hasDropdown: true },
  { key: 'defaultPort', label: 'Default Port', hasDropdown: true },
  { key: 'changedPorts', label: 'Changed Ports', hasDropdown: true },
  { key: 'withoutIpPort', label: 'Without IP Port', hasDropdown: true },
  { key: 'withIpPort', label: 'With IP Port', hasDropdown: true },
  { key: 'ispadMin', label: 'ISPAD MIN', hasDropdown: true },
]

const sampleRows: TableRow[] = [
  {
    service: 'PPP',
    total: 12,
    defaultPort: 1701,
    changedPorts: 2,
    withoutIpPort: 3,
    withIpPort: 9,
    ispadMin: 1,
    action: {
      label: 'View',
      onClick: () => alert('View PPP details'),
    },
  },
  {
    service: 'Hotspot',
    total: 8,
    defaultPort: 8080,
    changedPorts: 1,
    withoutIpPort: 2,
    withIpPort: 6,
    ispadMin: 0,
    action: {
      label: 'View',
      onClick: () => alert('View Hotspot details'),
    },
  },
  {
    service: 'DHCP',
    total: 15,
    defaultPort: 67,
    changedPorts: 3,
    withoutIpPort: 5,
    withIpPort: 10,
    ispadMin: 2,
    action: {
      label: 'View',
      onClick: () => alert('View DHCP details'),
    },
  },
  // ... duplicate some rows to demo pagination
  ...Array.from({ length: 16 }).map((_, i) => ({
    service: `Device ${i + 4}`,
    total: Math.floor(Math.random() * 50),
    defaultPort: 1000 + i,
    changedPorts: Math.floor(Math.random() * 10),
    withoutIpPort: Math.floor(Math.random() * 5),
    withIpPort: Math.floor(Math.random() * 45),
    ispadMin: Math.floor(Math.random() * 3),
    action: {
      label: 'View',
      onClick: () => alert(`View Device ${i + 4}`),
    },
  })) as TableRow[],
]

const RoutesTable: React.FC = () => {
  const [page, setPage] = useState(1)

  const totalItems = sampleRows.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  const currentRows = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return sampleRows.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  return (
    <div>
      <BasicTable title="All Routes" columns={columns} rows={currentRows} />

      {/* Pagination block below the table */}
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
          siblingCount={1}
          boundaryCount={1}
          showSummary={true}
          totalItems={totalItems}
          pageSize={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  )
}

export default RoutesTable
