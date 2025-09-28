import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import EditProfileForm from "@/components/profile/EditProfileForm"

const ProfileTab: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    staffId: "ADM001",
    department: "IT & Network Operations",
  })

  if (isEditing) {
    return (
      <EditProfileForm
        profile={profile}
        onCancel={() => setIsEditing(false)}
        onSave={(updated) => {
          setProfile(updated)
          setIsEditing(false)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/120?img=5"
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">Staff ID: {profile.staffId}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{profile.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{profile.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Staff ID</span>
              <span className="font-medium">{profile.staffId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium">{profile.department}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Password</span>
              <span className="font-medium">••••••••••</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Two-Factor Authentication</span>
              <span className="font-medium text-green-600">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recovery Email</span>
              <span className="font-medium">recovery@example.com</span>
            </div>
          </div>
          <Button variant="outline" className="mt-2">Update Security</Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">Account Actions</h3>
          <p className="text-sm text-muted-foreground">
            Manage or deactivate your account.
          </p>
          <div className="flex gap-3">
            <Button variant="outline">Suspend Account</Button>
            <Button variant="destructive">Deactivate Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileTab
