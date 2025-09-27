import React from "react"
import { Card, CardContent } from "@/components/ui/card"

const RolesTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Personal Roles</h3>
          <ul className="text-sm mt-2 list-disc pl-4">
            <li>Super Admin</li>
            <li>Can manage admins</li>
            <li>Full system access</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Admin Roles</h3>
          <p className="text-sm mt-2">
            Assigned permissions for other admins.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default RolesTab
