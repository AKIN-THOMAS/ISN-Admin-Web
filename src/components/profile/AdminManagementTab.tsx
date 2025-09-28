import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const adminRows = [
  { id: 1, name: "John Doe", staffId: "ADM001", role: "Super Admin", email: "john@example.com" },
  { id: 2, name: "Jane Smith", staffId: "ADM002", role: "Admin", email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", staffId: "ADM003", role: "Moderator", email: "mike@example.com" },
]

const AdminManagementTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Search admins..." className="w-1/3" />
          <select className="border px-3 py-2 rounded text-sm">
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Moderator</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Staff ID</th>
                <th className="py-2">Role</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {adminRows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">{row.staffId}</td>
                  <td className="py-2">{row.role}</td>
                  <td className="py-2">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminManagementTab
