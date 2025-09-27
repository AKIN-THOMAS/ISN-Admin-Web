import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import OthersOverview from '@/components/OthersOverview'
import OthersRoutes from '@/components/OthersRoutes'
import OthersUsage from '@/components/OthersUsage'
import type { TableRow } from '@/components/BasicTable'

const Others: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'usage'>('overview')
  const [detailsView, setDetailsView] = useState<null | { type: 'data' | 'user'; row: TableRow }>(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div>
        <h1 className="text-3xl font-bold px-5">Data Usage</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 pt-6 pb-2 flex items-center gap-4">
        <button
          className={cn(
            'px-4 py-2 rounded text-btn-base font-semibold transition-colors',
            activeTab === 'overview'
              ? 'bg-primary-500 text-white shadow'
              : 'bg-transparent text-muted-foreground hover:text-primary-500'
          )}
          onClick={() => setActiveTab('overview')}
          aria-selected={activeTab === 'overview'}
        >
          Overview
        </button>

        <button
          className={cn(
            'px-4 py-2 rounded text-btn-base font-semibold transition-colors',
            activeTab === 'routes'
              ? 'bg-primary-500 text-white shadow'
              : 'bg-transparent text-muted-foreground hover:text-primary-500'
          )}
          onClick={() => setActiveTab('routes')}
          aria-selected={activeTab === 'routes'}
        >
          Routes
        </button>

        <button
          className={cn(
            'px-4 py-2 rounded text-btn-base font-semibold transition-colors',
            activeTab === 'usage'
              ? 'bg-primary-500 text-white shadow'
              : 'bg-transparent text-muted-foreground hover:text-primary-500'
          )}
          onClick={() => setActiveTab('usage')}
          aria-selected={activeTab === 'usage'}
        >
          Usage
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6 pb-6 flex-1">
        {activeTab === 'overview' && (
          <OthersOverview
            // pass row if detailsView exists, otherwise undefined
            row={detailsView ? detailsView.row : undefined}
            onBack={() => setDetailsView(null)}
          />
        )}

        {activeTab === 'routes' && <OthersRoutes />}

        {activeTab === 'usage' && <OthersUsage />}
      </div>
    </div>
  )
}

export default Others
