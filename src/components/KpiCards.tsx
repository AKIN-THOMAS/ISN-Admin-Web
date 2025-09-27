// import totalusersIcon from '@/assets/images/totalusers.svg'
// import activeUsersIcon from '@/assets/images/activeusers.svg'
// import offlineUsersIcon from '@/assets/images/offlineusers.svg'
// import offlineRoutersIcon from '@/assets/images/offlinerouters.svg'
// import { Card, CardContent } from './ui/card'

// const KpiCards = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
//               <Card className="h-full flex flex-col">
//                 <div className="flex flex-col items-end justify-between space-y-2 pb-2 p-4">
//                   <button className="text-base font-semibold text-[#808080]">
//                     Show All
//                   </button>
//                 </div>
//                 <CardContent className="flex-1 flex items-center">
//                   <div className="flex flex-wrap items-center w-full">
//                     <img
//                       src={totalusersIcon}
//                       alt="Total Users"
//                       className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 mr-4 flex-shrink-0"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <p className="text-ls text-muted-foreground">Total Users</p>
//                       <p className="text-3xl font-bold inline-flex items-center gap-2 flex-wrap break-words">
//                         123456
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//              <Card className="h-full flex flex-col">
//                 <div className="flex flex-col items-end justify-between space-y-2 pb-2 p-4">
//                   <button className="text-base font-semibold text-[#808080]">
//                     Show All
//                   </button>
//                 </div>
//                 <CardContent className="flex-1 flex items-center">
//                   <div className="flex flex-wrap items-center w-full">
//                     <img
//                       src={activeUsersIcon}
//                       alt="Active Users"
//                       className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 mr-4 flex-shrink-0"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <p className="text-ls text-muted-foreground">Active Users</p>
//                       <p className="text-3xl font-bold inline-flex items-center gap-2 flex-wrap break-words">
//                         123456
//                         <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-green-500 text-white">
//                           20%
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="h-full flex flex-col">
//                 <div className="flex flex-col items-end justify-between space-y-2 pb-2 p-4">
//                   <button className="text-base font-semibold text-[#808080]">
//                     Show All
//                   </button>
//                 </div>
//                 <CardContent className="flex-1 flex items-center">
//                   <div className="flex flex-wrap items-center w-full">
//                     <img
//                       src={offlineUsersIcon}
//                       alt="Active Users"
//                       className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 mr-4 flex-shrink-0"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <p className="text-ls text-muted-foreground">Offline Users</p>
//                       <p className="text-3xl font-bold inline-flex items-center gap-2 flex-wrap break-words">
//                         123456
//                         <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
//                           20%
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="h-full flex flex-col">
//                 <div className="flex flex-col items-end justify-between space-y-2 pb-2 p-4">
//                   <button className="text-base font-semibold text-[#808080]">
//                     Show All
//                   </button>
//                 </div>
//                 <CardContent className="flex-1 flex items-center">
//                   <div className="flex flex-wrap items-center w-full">
//                     <img
//                       src={offlineRoutersIcon}
//                       alt="Active Users"
//                       className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 mr-4 flex-shrink-0"
//                     />
//                     <div className="min-w-0 flex-1">
//                       <p className="text-ls text-muted-foreground">Offline Routers</p>
//                       <p className="text-3xl font-bold inline-flex items-center gap-2 flex-wrap break-words">
//                         123456
//                         <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
//                           80%
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//   )
// }

// export default KpiCards

import React from 'react'
import { Card, CardContent } from './ui/card'

interface KpiCardProps {
  icon: string
  alt: string
  label: string
  value: string | number
  badgeValue?: string | number
  badgeColor?: string // e.g. 'bg-green-500'
  onShowAll?: () => void
}

const KpiCards: React.FC<KpiCardProps> = ({
  icon,
  alt,
  label,
  value,
  badgeValue,
  badgeColor,
  onShowAll,
}) => (
  <Card className="h-full flex flex-col">
    <div className="flex flex-col items-end justify-between space-y-2 pb-2 p-4">
      <button
        className="text-base font-semibold text-[#808080]"
        onClick={onShowAll}
        type="button"
      >
        Show All
      </button>
    </div>
    <CardContent className="flex-1 flex items-center">
      <div className="flex flex-wrap items-center w-full">
        <img
          src={icon}
          alt={alt}
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 mr-4 flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-ls text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold inline-flex items-center gap-2 flex-wrap break-words">
            {value}
            {badgeValue !== undefined && (
              <span
                className={`ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold text-white ${badgeColor ?? ''}`}
              >
                {badgeValue}
              </span>
            )}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default KpiCards