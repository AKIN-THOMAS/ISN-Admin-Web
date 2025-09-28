import React from "react"
import { Card, CardContent } from "@/components/ui/card"

const activityRows = [
  { id: 1, activity: "Logged in", date: "2025-09-20 10:23 AM" },
  { id: 2, activity: "Updated settings", date: "2025-09-22 04:11 PM" },
  { id: 3, activity: "Added new admin", date: "2025-09-25 08:45 AM" },
]

const otherAdmins = [
  { id: 1, name: "Jane Smith", activity: "Deleted user", date: "2025-09-25 09:15 AM" },
  { id: 2, name: "Mike Johnson", activity: "Reset password", date: "2025-09-24 07:12 PM" },
]

const ActivityLogTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">This Admin’s Activities</h3>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Activity</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {activityRows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="py-2">{row.activity}</td>
                  <td className="py-2">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Other Admins’ Activities</h3>
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Admin</th>
                <th className="py-2">Activity</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {otherAdmins.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="py-2">{row.name}</td>
                  <td className="py-2">{row.activity}</td>
                  <td className="py-2">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ActivityLogTab
