import React from 'react'
import RouterStats from './RouterStats'
import NetworkMiktoTik from './NetworkMiktoTik'
import MikroTikTable from './MikroTikTable'
import HighRouter from './HighRouter'

const NetworkTab:  React.FC = () => {
  return (
    <div className="flex flex-col gap-6 m-4">
        <RouterStats />
        <NetworkMiktoTik />
        <MikroTikTable />
        <HighRouter />
    </div>
  )
}

export default NetworkTab