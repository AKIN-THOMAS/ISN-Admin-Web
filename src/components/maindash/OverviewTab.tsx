import React from 'react'
import KpiCards from '../KpiCards'
import RouterStats from './RouterStats'
import ServerStats from './ServerStats'
import MikroTik from './MikroTik'
import totalusersIcon from '@/assets/images/totalusers.svg'
import activeUsersIcon from '@/assets/images/activeUsers.svg'
import offlineUsersIcon from '@/assets/images/offlineusers.svg'
import offlineRoutersIcon from '@/assets/images/offlinerouters.svg'

interface OverviewProps {
  leftRef: React.RefObject<HTMLDivElement>;
  containerHeight?: number;
}

const OverviewTab: React.FC<OverviewProps> = ({ leftRef, containerHeight }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row flex-1 px-4 sm:px-6 pb-6 gap-6 w-full overflow-auto">
        <div
          ref={leftRef}
          className="flex flex-col flex-1 min-w-0"
          style={containerHeight && window.innerWidth >= 1024 ? { height: containerHeight } : {}}
        >
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <KpiCards
                icon={totalusersIcon}
                alt="Total Users"
                label="Total Users"
                value={123456}
                onShowAll={() => {/* handle show all */}}
              />
              <KpiCards
                icon={activeUsersIcon}
                alt="Active Users"
                label="Active Users"
                value={123456}
                badgeValue="20%"
                badgeColor="bg-green-500"
                onShowAll={() => {/* handle show all */}}
              />
              <KpiCards
                icon={offlineUsersIcon}
                alt="Offline Users"
                label="Offline Users"
                value={123456}
                badgeValue="20%"
                badgeColor="bg-red-500"
                onShowAll={() => {/* handle show all */}}
              />
              <KpiCards
                icon={offlineRoutersIcon}
                alt="Offline Routers"
                label="Offline Routers"
                value={123456}
                badgeValue="80%"
                badgeColor="bg-red-500"
                onShowAll={() => {/* handle show all */}}
              />
            </div>
            <RouterStats />
          </div>
        </div>
        <ServerStats />
      </div>
      <MikroTik />
    </>
        
  )
}

export default OverviewTab