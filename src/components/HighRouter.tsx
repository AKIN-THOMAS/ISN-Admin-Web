import BasicTable, { TableColumn, TableRow } from './BasicTable'

const columns: TableColumn[] = [
  { key: 'service', label: 'Service' },
  { key: 'total', label: 'Total', hasDropdown: true },
  { key: 'defaultPort', label: 'Default Port', hasDropdown: true },
  { key: 'changedPorts', label: 'Changed Ports', hasDropdown: true },
  { key: 'withoutIpPort', label: 'Without IP Port', hasDropdown: true },
  { key: 'withIpPort', label: 'With IP Port', hasDropdown: true },
  { key: 'ispadMin', label: 'ISPAD MIN', hasDropdown: true },
]

const rows: TableRow[] = [
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
  }
]


const HighRouter = () => {
  return (
    <div>
    <BasicTable
        title="High Router CPU Load"
        columns={columns}
        rows={rows}
    />
    {/* <div className="flex-1 py-10" />
        <div className="flex justify-end mt-6">
            <button
                className="rounded-lg px-4 py-2 bg-white text-black text-btn-base font-medium shadow-sm"
                type="button"
            >
                View Detailed View
            </button>
        </div>    */}
    </div>
  )
}

export default HighRouter