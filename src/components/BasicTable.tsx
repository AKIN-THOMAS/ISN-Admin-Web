import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

export interface TableColumn {
  key: string
  label: string
  hasDropdown?: boolean
}

export interface TableRowAction {
  label: string
  onClick: () => void
}

type TableCell = React.ReactNode | string | number | boolean

// NOTE: we allow any dynamic keys to be TableCell or TableRowAction (for legacy reasons).
// We will always treat `action` specially (narrowed at render time).
export interface TableRow {
  [key: string]: TableCell | TableRowAction
  action?: TableRowAction
}

interface BasicTableProps {
  title?: string
  columns: TableColumn[]
  rows: TableRow[]
  className?: string
  // optionally allow custom render for the right-most action cell
  renderRowActions?: (row: TableRow, rowIndex: number) => React.ReactNode
}

const DropdownIcon: React.FC = () => (
  <svg
    className="inline ml-1 w-3 h-3 text-muted-foreground"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function isTableRowAction(v: any): v is TableRowAction {
  return !!v && typeof v === 'object' && 'label' in v && typeof v.onClick === 'function'
}

const BasicTable: React.FC<BasicTableProps> = ({
  title,
  columns,
  rows,
  className,
  renderRowActions,
}) => {
  // state for which row's menu is open (index). null = none
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)

  return (
    <Card className={cn('w-full', className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              {/* header: no visible bottom border per your request */}
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'py-2 px-2 text-fine font-semibold text-muted-foreground bg-transparent',
                    // do NOT render border here; only rows will have borders below them
                    ''
                  )}
                >
                  <span className="flex items-center gap-1 select-none">
                    {col.label}
                    {col.hasDropdown && <DropdownIcon />}
                  </span>
                </th>
              ))}
              <th className="py-2 px-2 bg-transparent" />
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columns.map(col => {
                  const raw = row[col.key]
                  // if raw is an action-like object, skip rendering it in the column cell
                  if (isTableRowAction(raw)) {
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'py-3 px-2 text-fine',
                          idx === rows.length - 1 ? '' : 'border-b border-gray-200'
                        )}
                      />
                    )
                  }
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        'py-3 px-2 text-fine',
                        idx === rows.length - 1 ? '' : 'border-b border-gray-200'
                      )}
                    >
                      {/* render primitives / ReactNode values directly */}
                      {raw as React.ReactNode}
                    </td>
                  )
                })}

                {/* action column */}
                <td
                  className={cn(
                    'py-3 px-2 text-right min-w-[80px] relative',
                    idx === rows.length - 1 ? '' : 'border-b border-gray-200'
                  )}
                >
                  {renderRowActions ? (
                    renderRowActions(row, idx)
                  ) : (
                    <>
                      {row.action && isTableRowAction(row.action) && (
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            className="text-primary-500 underline text-fine-xs font-semibold hover:text-primary-600 focus:outline-none"
                            onClick={row.action.onClick}
                            tabIndex={0}
                          >
                            {row.action.label}
                          </button>

                          {/* 3-dots icon toggles a small inline popover */}
                          <div className="relative inline-block">
                            <button
                              onClick={() =>
                                setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                              }
                              aria-expanded={openMenuIndex === idx}
                              aria-controls={`row-menu-${idx}`}
                              className="p-1 rounded hover:bg-gray-100 focus:outline-none"
                            >
                              <DotsVerticalIcon className="w-4 h-4 text-muted-foreground ml-1" />
                            </button>

                            {openMenuIndex === idx && (
                              <div
                                id={`row-menu-${idx}`}
                                role="menu"
                                className="absolute right-0 mt-1 z-10 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                              >
                                <div className="py-1">
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                    onClick={() => {
                                      setOpenMenuIndex(null)
                                      // default action: show stats — you may override by renderRowActions
                                      if (row.action) row.action.onClick()
                                    }}
                                  >
                                    See stats
                                  </button>
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                    onClick={() => {
                                      setOpenMenuIndex(null)
                                      // implement change to offline logic in parent via renderRowActions override
                                      console.log('Change to offline (implement handler)')
                                    }}
                                  >
                                    Change to offline
                                  </button>
                                  <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                                    onClick={() => {
                                      setOpenMenuIndex(null)
                                      console.log('Change stats (implement handler)')
                                    }}
                                  >
                                    Change stats
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default BasicTable
export type { TableCell }
