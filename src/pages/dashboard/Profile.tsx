import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ProfileTab from "@/components/profile/ProfileTab"
import RolesTab from "@/components/profile/RolesTab"
import AdminManagementTab from "@/components/profile/AdminManagementTab"
import ActivityLogTab from "@/components/profile/ActivityLogTab"

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "roles" | "admin" | "activity"
  >("profile")
    
  return (
    <div className="flex flex-col min-h-screen bg-background p-6 space-y-6">
      {/* Top Profile Section */}
      <div className="flex items-center gap-6">
        <img
          src="https://via.placeholder.com/100"
          alt="Admin"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-sm text-muted-foreground">Staff ID: ADM001</p>
          <Button className="mt-2" variant="outline">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 border-b pb-2">
        {[
          { key: "profile", label: "Profile" },
          { key: "roles", label: "Roles & Management" },
          { key: "admin", label: "Admin Management" },
          { key: "activity", label: "Activity Log" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={cn(
              "w-full md:w-auto px-4 py-2 rounded font-semibold text-sm transition-colors",
              activeTab === tab.key
                ? "bg-primary-500 text-white shadow"
                : "bg-transparent text-muted-foreground hover:text-primary-500"
            )}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "roles" && <RolesTab />}
        {activeTab === "admin" && <AdminManagementTab />}
        {activeTab === "activity" && <ActivityLogTab />}
      </div>
    </div>
  )
}

export default Profile
