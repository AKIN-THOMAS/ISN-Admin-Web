// import KpiCards from './KpiCards'
import totalRoutersIcon from '@/assets/images/totalRouters.svg'
import onlineRoutersIcon from '@/assets/images/onlineRouters.svg'
import offlineUsersIcon from '@/assets/images/offlineRouters2.svg'
import inactiveRoutersIcon from '@/assets/images/inactiveRouters.svg'
import KpiCards from '../KpiCards'

const HardwareOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
       <KpiCards
            icon={totalRoutersIcon}
            alt="Total Users"
            label="Total Users"
            value={123456}
            onShowAll={() => {/* handle show all */}}
        />
        <KpiCards
            icon={onlineRoutersIcon}
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
            icon={inactiveRoutersIcon}
            alt="Offline Routers"
            label="Offline Routers"
            value={123456}
            badgeValue="80%"
            badgeColor="bg-red-500"
            onShowAll={() => {/* handle show all */}}
        />
    </div>
  )
}

export default HardwareOverview