// src/components/StatusPill.tsx
import React from "react"
import { cn } from "@/lib/utils"

interface StatusPillProps {
  status: string
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const isActive = status.toLowerCase() === "active"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isActive ? "bg-green-500" : "bg-gray-400"
        )}
      />
      {status}
    </span>
  )
}

export default StatusPill
