import React, { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import BasicTable, { TableColumn, TableRow } from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import UserUsageDetails from './UserUsageDetails'
import DataUsageDetails from './DataUsageDetails'

type UsageTab = 'data' | 'user'
const ITEMS_PER_PAGE = 7

// Column definitions for the Data Usage table
const columns: TableColumn[] = [
  { key: 'sn', label: 'S/N' },
  { key: 'client', label: 'CLIENT' },
  { key: 'internalId', label: 'INTERNAL ID' },
  { key: 'name', label: 'NAME' },
  { key: 'ip', label: 'IP' },
  { key: 'status', label: 'STATUS' },
  { key: 'uptime', label: 'UPTIME' },
  { key: 'dataUsage', label: 'DATA USAGE' },
]


const sampleRawData = [
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.1',
    status: 'Active',
    uptime: '30D; 7HR; 8MINS',
    dataUsage: '2.9TB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.2',
    status: 'Active',
    uptime: '7D; 3HR; 1MIN',
    dataUsage: '1.2TB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.3',
    status: 'Active',
    uptime: '2D; 1HR; 5MINS',
    dataUsage: '3.4TB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.4',
    status: 'Active',
    uptime: '12D; 9HR; 7MINS',
    dataUsage: '800GB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.5',
    status: 'Active',
    uptime: '1D; 2HR; 9MINS',
    dataUsage: '2.1TB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.6',
    status: 'Active',
    uptime: '90D; 1HR; 0MINS',
    dataUsage: '4.7TB',
  },
  {
    client: 'MikroTik',
    internalId: 0,
    name: 'Yaba BTS Router',
    ip: '172.422.77.7',
    status: 'Active',
    uptime: '3D; 12HR; 12MINS',
    dataUsage: '2.9TB',
  },
  // add a few more to demo pagination
  ...Array.from({ length: 12 }).map((_, i) => ({
    client: 'MikroTik',
    internalId: i + 10,
    name: `Router ${i + 10}`,
    ip: `172.422.77.${10 + i}`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    uptime: `${i + 1}D; ${i}HR; ${i * 2}MINS`,
    dataUsage: `${(Math.random() * 5).toFixed(1)}TB`,
  })),
]

const statusPill = (status: string) => {
  const isActive = status.toLowerCase() === 'active'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
        isActive ? 'bg-gray-100' : 'bg-gray-50'
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          isActive ? 'bg-green-500' : 'bg-gray-400'
        )}
      />
      <span className="text-xs text-muted-foreground">{status}</span>
    </span>
  )
}

const HardwareUsage: React.FC = () => {
  const [activeUsageTab, setActiveUsageTab] = useState<UsageTab>('data')
  const [page, setPage] = useState(1)

  // details view state
  const [detailsView, setDetailsView] = useState<null | { type: 'data' | 'user'; row: TableRow }>(null)

  const totalItems = sampleRawData.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  // page -> rows mapping (TableRow)
  const currentRows: TableRow[] = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    const slice = sampleRawData.slice(start, start + ITEMS_PER_PAGE)

    return slice.map((r, idx) => {
      const sn = start + idx + 1
      const dataUsageNode = (
        <div className="flex items-center justify-end gap-4">
          <div className="text-sm font-semibold">{r.dataUsage}</div>
          <button
            // See Stats button here will also be present inside popover for accessibility,
            // but we keep inline 'See Stats' here if design requires it.
            onClick={() => setDetailsView({ type: 'data', row: {
              sn, client: r.client, internalId: r.internalId, name: r.name, ip: r.ip, status: statusPill(r.status), uptime: r.uptime, dataUsage: r.dataUsage, action: { label: 'View', onClick: () => {} }
            } })}
            className="text-sm underline text-muted-foreground"
          >
            See Stats
          </button>
        </div>
      )

      return {
        sn,
        client: r.client,
        internalId: r.internalId,
        name: r.name,
        ip: r.ip,
        status: statusPill(r.status),
        uptime: r.uptime,
        dataUsage: dataUsageNode,
        // keep an action for the BasicTable default if parent doesn't override renderRowActions
        action: { label: 'View', onClick: () => alert(`View ${r.name}`) },
      } as TableRow
    })
  }, [page])

  // open details - called from popover render (see renderRowActions below)
  const openDetails = (type: 'data' | 'user', row: TableRow) => {
    setDetailsView({ type, row })
  }

  // if we are showing a details view, render that and a back button
  if (detailsView) {
    if (detailsView.type === 'data') {
      return (
        <div className="px-2 sm:px-4">
          <DataUsageDetails
            row={detailsView.row}
            onBack={() => setDetailsView(null)}
          />
        </div>
      )
    } else {
      return (
        <div className="px-2 sm:px-4">
          <UserUsageDetails
            row={detailsView.row}
            onBack={() => setDetailsView(null)}
          />
        </div>
      )
    }
  }

  // render list view with top tabs and the table(s)
  return (
    <div className="flex flex-col gap-4">
      {/* top tabs */}
      <div className="px-2 sm:px-4 pt-2 pb-2 flex items-center gap-6 border-b border-transparent">
        <button
          className={cn(
            'pb-2 text-sm font-semibold transition-colors',
            activeUsageTab === 'data'
              ? 'text-red-600 border-b-4 border-red-500'
              : 'text-muted-foreground hover:text-red-600'
          )}
          onClick={() => setActiveUsageTab('data')}
        >
          Data Usage
        </button>

        <button
          className={cn(
            'pb-2 text-sm font-semibold transition-colors',
            activeUsageTab === 'user'
              ? 'text-red-600 border-b-4 border-red-500'
              : 'text-muted-foreground hover:text-red-600'
          )}
          onClick={() => setActiveUsageTab('user')}
        >
          User Usage
        </button>
      </div>

      <div className="px-2 sm:px-4">
        {activeUsageTab === 'data' && (
          <>
            <BasicTable
              // we intentionally hide card title because the top tabs act as title
              title={undefined}
              columns={columns}
              rows={currentRows}
              // override the row actions so the popover uses our handlers
              renderRowActions={(row) => (
                <div className="flex items-center gap-1 justify-end">
                  <button
                    className="text-primary-500 underline text-fine-xs font-semibold hover:text-primary-600 focus:outline-none"
                    onClick={() => (row.action as any)?.onClick?.()}
                    tabIndex={0}
                  >
                    {(row.action as any)?.label ?? 'View'}
                  </button>

                  <div className="relative inline-block">
                   
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          // toggle a small native popover by using a simple prompt — but better: manage per-row open state here if you prefer.
                          // For simplicity we'll offer See Stats and Change to offline.
                          const choice = window.prompt('Type: 1=See Stats, 2=Change to offline, 3=Change stats')
                          if (choice === '1') openDetails('data', row)
                          if (choice === '2') alert('Change to offline: implement handler')
                          if (choice === '3') alert('Change stats: implement handler')
                        }}
                        className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                        aria-label="Open row menu"
                      >
                        <DotsVerticalIcon className="w-4 h-4 text-muted-foreground ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            />

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
          </>
        )}

        {activeUsageTab === 'user' && (
          <>
            {/* User usage table: reuse the same columns but tailor them to user usage if necessary */}
            <BasicTable
              title={undefined}
              columns={columns}
              rows={currentRows}
              renderRowActions={(row) => (
                <div className="flex items-center gap-1 justify-end">
                  <button
                    className="text-primary-500 underline text-fine-xs font-semibold hover:text-primary-600 focus:outline-none"
                    onClick={() => (row.action as any)?.onClick?.()}
                    tabIndex={0}
                  >
                    {(row.action as any)?.label ?? 'View'}
                  </button>

                  <div className="relative inline-block">
                    <button
                      onClick={() => openDetails('user', row)}
                      className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                      aria-label="Open user details"
                    >
                      <DotsVerticalIcon className="w-4 h-4 text-muted-foreground ml-1" />
                    </button>
                  </div>
                </div>
              )}
            />

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
          </>
        )}
      </div>
    </div>
  )
}

export default HardwareUsage