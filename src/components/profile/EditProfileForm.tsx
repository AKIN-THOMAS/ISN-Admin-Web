import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Profile {
  name: string
  email: string
  phone: string
  staffId: string
  department: string
}

interface Props {
  profile: Profile
  onCancel: () => void
  onSave: (updated: Profile) => void
}

const EditProfileForm: React.FC<Props> = ({ profile, onCancel, onSave }) => {
  const [form, setForm] = useState(profile)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <div className="grid gap-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <Input
            name="staffId"
            value={form.staffId}
            onChange={handleChange}
            placeholder="Staff ID"
          />
          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EditProfileForm
