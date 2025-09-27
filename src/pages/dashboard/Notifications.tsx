import React, { useMemo, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BellIcon, TrashIcon } from '@radix-ui/react-icons'

type NotificationType = 'info' | 'warning' | 'error' | 'success'

export type Notification = {
  id: string
  title: string
  body: string
  type: NotificationType
  createdAt: string // ISO string
  read: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Firmware Available',
    body: 'Firmware v7.2.1 is available for the device Yaba BTS Router. Click to schedule an update.',
    type: 'info',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    title: 'High Bandwidth Usage',
    body: 'Device Router-14 exceeded the bandwidth threshold (95%) in the last hour.',
    type: 'warning',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    title: 'Device Offline',
    body: 'Router-07 has been offline for 12 minutes. Please check connectivity.',
    type: 'error',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  },
  {
    id: 'n4',
    title: 'Monthly Report Ready',
    body: 'Your monthly system usage report is ready for download.',
    type: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    read: true,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `n_extra_${i}`,
    title: `Sample notification ${i + 1}`,
    body: `This is a sample notification body for item ${i + 1}. Replace with API content.`,
    type: i % 3 === 0 ? 'info' : i % 3 === 1 ? 'warning' : 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * (i + 10)).toISOString(),
    read: i % 2 === 0,
  })) as Notification[],
]

// Utility functions
function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function typeBadge(type: NotificationType) {
  const map: Record<NotificationType, string> = {
    info: 'bg-blue-100 text-blue-700',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-700',
    success: 'bg-green-100 text-green-700',
  }
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', map[type])}>
      {type}
    </span>
  )
}

// Hook to detect desktop vs mobile
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768) // Tailwind md breakpoint
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return isDesktop
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications])

  const filtered = useMemo(() => {
    return filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  }, [filter, notifications])

  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null)
      return
    }
    // only auto-select on desktop
    if (isDesktop && (!selectedId || !filtered.some(n => n.id === selectedId))) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId, isDesktop])

  const selected = useMemo(() => notifications.find(n => n.id === selectedId) ?? null, [notifications, selectedId])

  // Handlers
  const openNotification = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
    setSelectedId(id)
  }
  const markAsUnread = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: false } : n)))
  }
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    setSelectedId(prev => (prev === id ? null : prev))
  }
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }
  const clearAll = () => {
    setNotifications([])
    setSelectedId(null)
  }

  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold py-4">Notifications</h1>
      <Card className="w-full">
        <CardContent className="flex flex-col md:flex-row gap-6">
          {/* Left: list */}
          <div className={cn(
            "md:w-80 md:min-w-[260px] md:border-r md:pr-4 py-3",
            selected && !isDesktop && "hidden" // hide list on mobile when a message is open
          )}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BellIcon className="w-4 h-4" />
                <span className="font-semibold">Notifications</span>
                <span className="text-xs text-muted-foreground">({notifications.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                  onClick={markAllRead}
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </button>
                <button
                  className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                  onClick={clearAll}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* filters */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setFilter('all')}
                className={cn('px-3 py-2 rounded text-sm font-medium',
                  filter === 'all' ? 'bg-primary-500 text-white' : 'bg-transparent text-muted-foreground hover:text-primary-500')}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={cn('px-3 py-2 rounded text-sm font-medium relative',
                  filter === 'unread' ? 'bg-primary-500 text-white' : 'bg-transparent text-muted-foreground hover:text-primary-500')}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-red-600 text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* list */}
            <div className="space-y-1 overflow-y-auto max-h-[60vh] pr-2">
              {filtered.length === 0 && (
                <div className="text-sm text-muted-foreground py-4">No notifications</div>
              )}
              {filtered.map(n => {
                const active = selectedId === n.id
                return (
                  <button
                    key={n.id}
                    onClick={() => openNotification(n.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md flex items-start gap-3',
                      active ? 'bg-gray-50' : 'hover:bg-gray-50'
                    )}
                  >
                    <div className="flex-shrink-0">
                      <div className={cn('w-2.5 h-2.5 rounded-full mt-1', n.read ? 'bg-transparent' : 'bg-red-500')} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(n.createdAt)}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.body}</div>
                      <div className="mt-2 flex items-center gap-2">
                        {typeBadge(n.type)}
                        {!n.read && <span className="text-xs text-red-600 font-medium">New</span>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: detail */}
          <div className={cn("flex-1 min-w-0", !selected && !isDesktop && "hidden")}>
            {/* Mobile: back button */}
            {!isDesktop && selected && (
              <button
                onClick={() => setSelectedId(null)}
                className="mb-3 text-sm text-primary-600 underline"
              >
                ← Back to list
              </button>
            )}

            <div className="flex items-center justify-between mb-4 py-3">
              <div>
                <h3 className="text-sm text-muted-foreground">Message</h3>
                <div className="text-lg font-semibold">{selected ? selected.title : 'Select a notification'}</div>
              </div>
              <div className="flex items-center gap-2">
                {selected && (
                  <>
                    <button
                      onClick={() => markAsUnread(selected.id)}
                      className="text-sm px-3 py-1 rounded hover:bg-gray-100"
                    >
                      Mark unread
                    </button>
                    <button
                      onClick={() => deleteNotification(selected.id)}
                      className="text-sm px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-md border p-6 bg-white min-h-[260px]">
              {!selected && (
                <div className="text-sm text-muted-foreground">No message selected. Click any message on the left to read it here.</div>
              )}
              {selected && (
                <article className="prose prose-sm max-w-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">{formatDate(selected.createdAt)}</div>
                      <h4 className="text-lg font-semibold mt-1">{selected.title}</h4>
                    </div>
                    <div className="text-right">{typeBadge(selected.type)}</div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">{selected.body}</div>
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => alert('Open related item - implement')}
                      className="px-3 py-2 rounded bg-primary-500 text-white text-sm"
                    >
                      Open related
                    </button>
                    <button
                      onClick={() => alert('Snooze - implement')}
                      className="px-3 py-2 rounded border text-sm"
                    >
                      Snooze
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Notifications
