import { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from '@/store'
import { fetchDashboardStart, fetchDashboardSuccess } from '@/store/slices/dashboardSlice'
import { cn } from '@/lib/utils'
import OverviewTab from '@/components/maindash/OverviewTab'
import NetworkTab from '@/components/maindash/NetworkTab'


const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<'overview' | 'network'>('overview')
  const leftRef = useRef<HTMLDivElement>(null)
  const [containerHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    dispatch(fetchDashboardStart())
    setTimeout(() => {
      dispatch(fetchDashboardSuccess({}))
    }, 1000)
  }, [dispatch])


  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* Tabs */}
      <div className="px-4 sm:px-6 pt-6 pb-6 flex flex-col items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div>
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
            activeTab === 'network'
              ? 'bg-primary-500 text-white shadow'
              : 'bg-transparent text-muted-foreground hover:text-primary-500'
          )}
          onClick={() => setActiveTab('network')}
          aria-selected={activeTab === 'network'}
        >
          Network
        </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <OverviewTab leftRef={leftRef} containerHeight={containerHeight} />
      ) : (
        <NetworkTab />
      )}
    </div>
  )
}

export default Dashboard