// src/components/client/NewContactForm.tsx
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

type NewContactFormProps = {
  onCancel: () => void
  onCreate: (data: any) => void
}

const NewContactForm: React.FC<NewContactFormProps> = ({ onCancel, onCreate }) => {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    mobile: "",
    location: "",
    serviceType: "",
    connectionMode: "",
    bandwidthPlan: "",
    sharedPlan: "",
    streetAddress: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(formData) // send data up to ClientsPage
    toast({
      title: "Contact Created",
      description: `${formData.firstName} ${formData.lastName} has been added successfully.`,
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              placeholder="Telephone"
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Input
              placeholder="Mobile"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />

            <Select onValueChange={(val) => handleChange("location", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mainland">Mainland BTS</SelectItem>
                <SelectItem value="island">Island BTS</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleChange("serviceType", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internet">Internet Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Select onValueChange={(val) => handleChange("connectionMode", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Connection Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internet">Internet Service</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleChange("bandwidthPlan", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Bandwidth Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10mbps">10 Mbps</SelectItem>
                <SelectItem value="20mbps">20 Mbps</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(val) => handleChange("sharedPlan", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Shared Plan?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shared20">Shared plan - 20 Mbps</SelectItem>
                <SelectItem value="shared50">Shared plan - 50 Mbps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-black text-white">
              Create
            </Button>
            <Button type="button" variant="destructive" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewContactForm
