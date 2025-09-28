import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Inbox } from "lucide-react"

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description = "This section doesn’t have any data to display right now.",
  actionLabel,
  onAction,
}) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/20 rounded-2xl shadow-none">
      <CardContent className="flex flex-col items-center justify-center text-center p-12 gap-4">
        <Inbox className="w-12 h-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>

        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-2">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default EmptyState
