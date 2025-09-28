import BasicTable, { TableColumn, TableRow } from '@/components/BasicTable'

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
]

const MikroTikTable = () => (
  <BasicTable
    title="MikroTik - Basic Services"
    columns={columns}
    rows={rows}
  />
)

export default MikroTikTable