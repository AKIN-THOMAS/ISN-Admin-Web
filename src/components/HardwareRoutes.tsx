import React, { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import BasicTable, { TableColumn, TableRow } from '@/components/BasicTable'
import Pagination from '@/components/Pagination'

type RoutesSubTab = 'all' | 'online' | 'offline' | 'inactive'
const ITEMS_PER_PAGE = 7

const columns: TableColumn[] = [
  { key: 'client', label: 'Client', hasDropdown: true },
  { key: 'internalId', label: 'Internal ID', hasDropdown: true },
  { key: 'name', label: 'Name', hasDropdown: true },
  { key: 'ip', label: 'IP', hasDropdown: true },
  { key: 'osVersion', label: 'OS Version', hasDropdown: true },
  { key: 'fwVersion', label: 'FW Version', hasDropdown: true },
  { key: 'status', label: 'Status', hasDropdown: true },
  { key: 'uptime', label: 'Up Time', hasDropdown: true },
]

// type RawRoute = {
//   client: string
//   internalId: number
//   name: string
//   ip: string
//   osVersion: string
//   fwVersion: string
//   status: 'Active' | 'Inactive' | 'Offline' | 'Maintenance'
//   uptime: string
// }

// sample rows for each subtab (replace with real data)
const allRows: TableRow[] = [
   {
    client: 'MikroTik',
    internalId: 12,
    name: 'PPP Router',
    ip: '172.22.1.1',
    osVersion: 'v7.6',
    fwVersion: 'r1.2',
    status: 'Active',
    uptime: '30D; 7HR; 8MINS',
    action: { label: 'View', onClick: () => alert('View DNS') }
  },
  {
    client: 'MikroTik',
    internalId: 8,
    name: 'Hotspot Router',
    ip: '172.22.1.2',
    osVersion: 'v7.5',
    fwVersion: 'r1.0',
    status: 'Inactive',
    uptime: '12D; 4HR; 10MINS',
    action: { label: 'View', onClick: () => alert('View DNS') }
  },
  {
    client: 'MikroTik',
    internalId: 15,
    name: 'DHCP Router',
    ip: '172.22.1.3',
    osVersion: 'v6.49',
    fwVersion: 'r1.1',
    status: 'Offline',
    uptime: '5D; 2HR; 3MINS',
    action: { label: 'View', onClick: () => alert('View DNS') }
  },
  {
    client: 'MikroTik',
    internalId: 5,
    name: 'DNS Router',
    ip: '172.22.1.4',
    osVersion: 'v7.1',
    fwVersion: 'r1.3',
    status: 'Maintenance',
    uptime: '1D; 6HR; 55MINS',
    action: { label: 'View', onClick: () => alert('View DNS') }
  },

  ...Array.from({ length: 12 }).map((_, i) => ({
    client: `Service ${i + 10}`,
    internalId: Math.floor(Math.random() * 30),
    name: 2000 + i,
    ip: Math.floor(Math.random() * 5),
    osVersion: `v${Math.floor(Math.random() * 3)}`,
    fwVersion: Math.floor(Math.random() * 28),
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    uptime: `${i + 1}D; ${i}HR; ${i * 2}MINS`,
    action: { label: 'View', onClick: () => alert(`View Service ${i + 10}`) },
  })) as TableRow[],
]

// const statusPill = (status: string) => {
//   const colors: Record<string, string> = {
//     Active: 'bg-green-500',
//     Inactive: 'bg-gray-400',
//     Offline: 'bg-red-500',
//     Maintenance: 'bg-yellow-500',
//   }

//   return (
//     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
//       <span className={cn('w-2 h-2 rounded-full', colors[status] || 'bg-gray-300')} />
//       <span className="text-xs text-muted-foreground">{status}</span>
//     </span>
//   )
// }

// subset filtering to demo different tab data
const onlineRows = allRows.filter((_, idx) => idx % 3 !== 0).slice(0, 10)
const offlineRows = allRows.filter((_, idx) => idx % 3 === 0).slice(0, 6)
const inactiveRows = allRows.slice(0, 4).map((r, i) => ({ ...r, service: `${r.service} (inactive ${i + 1})` }))

const HardwareRoutes: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<RoutesSubTab>('all')

  // pagination state per tab (so switching tabs preserves page)
  const [pageMap, setPageMap] = useState<Record<RoutesSubTab, number>>({
    all: 1,
    online: 1,
    offline: 1,
    inactive: 1,
  })

  const setPageFor = (tab: RoutesSubTab, p: number) =>
    setPageMap(prev => ({ ...prev, [tab]: p }))

  // which rows correspond to the active subtab
  const rowsForActiveTab = useMemo(() => {
    switch (activeSubTab) {
      case 'online':
        return onlineRows
      case 'offline':
        return offlineRows
      case 'inactive':
        return inactiveRows
      case 'all':
      default:
        return allRows
    }
  }, [activeSubTab])

  const currentPage = pageMap[activeSubTab] ?? 1
  const totalItems = rowsForActiveTab.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return rowsForActiveTab.slice(start, start + ITEMS_PER_PAGE)
  }, [rowsForActiveTab, currentPage])

  return (
    <div className="flex flex-col gap-4">
          {/* Subtabs row */}
          <div className="px-2 sm:px-4 pt-2 pb-2 flex flex-wrap md:flex-nowrap gap-2">
      {[
        { key: "all", label: "All routes" },
        { key: "online", label: "Online routes" },
        { key: "offline", label: "Offline routes" },
        { key: "inactive", label: "Inactive routes" },
      ].map((tab) => (
        <button
          key={tab.key}
          className={cn(
            "w-full md:w-auto px-4 py-2 rounded text-btn-base font-semibold transition-colors",
            activeSubTab === tab.key
              ? "bg-primary-500 text-white shadow"
              : "bg-transparent text-muted-foreground hover:text-primary-500"
          )}
          onClick={() => setActiveSubTab(tab.key as any)}
          aria-selected={activeSubTab === tab.key}
        >
          {tab.label}
        </button>
      ))}
    </div>


      {/* Table + pagination area */}
      <div className="px-2 sm:px-4">
        <BasicTable
          title={activeSubTab === 'all' ? 'All Routes' : activeSubTab === 'online' ? 'Online Routes' : activeSubTab === 'offline' ? 'Offline Routes' : 'Inactive Routes'}
          columns={columns}
          rows={currentRows}
        />

        {/* pagination for the active subtab — keeps pages per-tab in state */}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setPageFor(activeSubTab, p)}
            siblingCount={1}
            boundaryCount={1}
            showSummary={true}
            totalItems={totalItems}
            pageSize={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  )
}

export default HardwareRoutes
