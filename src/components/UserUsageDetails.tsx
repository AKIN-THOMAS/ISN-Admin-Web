import React from 'react'
import type { TableRow } from '@/components/BasicTable'

interface Props {
  row: TableRow
  onBack: () => void
}

const UserUsageDetails: React.FC<Props> = ({ row, onBack }) => {
  const deviceName = (row.name as string) ?? (row.client as string) ?? 'Device'
  // sample per-user rows (replace with API)
  const userRows = [
    { username: 'alice', uploads: '120GB', downloads: '400GB', total: '520GB' },
    { username: 'bob', uploads: '90GB', downloads: '310GB', total: '400GB' },
    { username: 'charlie', uploads: '50GB', downloads: '200GB', total: '250GB' },
  ]

  return (
    <div>
      <button onClick={onBack} className="text-sm underline text-muted-foreground mb-2">← Back</button>

      <h2 className="text-xl font-semibold mb-4">{deviceName} — User Usage</h2>

      <div className="rounded-lg border p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-muted-foreground">
              <th className="py-2">User</th>
              <th className="py-2">Upload</th>
              <th className="py-2">Download</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {userRows.map(u => (
              <tr key={u.username} className="border-t">
                <td className="py-3">{u.username}</td>
                <td className="py-3">{u.uploads}</td>
                <td className="py-3">{u.downloads}</td>
                <td className="py-3 font-semibold">{u.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUsageDetails
