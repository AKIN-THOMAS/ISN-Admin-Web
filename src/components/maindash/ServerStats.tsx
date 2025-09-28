import { useLayoutEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const ServerStats = () => {
    const rightRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined)
    
    useLayoutEffect(() => {
        // Set both columns to the max of their heights (for perfect alignment)
        const syncHeight = () => {
          if (leftRef.current && rightRef.current) {
            const left = leftRef.current.scrollHeight
            const right = rightRef.current.scrollHeight
            setContainerHeight(Math.max(left, right))
          }
        }
        syncHeight()
        window.addEventListener('resize', syncHeight)
        return () => window.removeEventListener('resize', syncHeight)
      }, [])
    
  return (
    <div
          ref={rightRef}
          className="flex flex-col w-full lg:w-[331px] lg:min-w-[331px]"
          style={
            window.innerWidth >= 1024
              ? { height: containerHeight ? containerHeight : 'auto' }
              : {}
          }
        >
          <Card className="flex-1 h-[50%] min-h-[240px] lg:min-h-[331px] lg:h-80 justify-center px-4 py-2 rounded-lg" 
          style={{
                background: 'linear-gradient(135deg, #BC0003 0%, #560001 100%)',
              }}>
            <CardHeader>
              <CardTitle className="text-white">Server Stats</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="h-full w-full grid grid-cols-1 gap-10 text-white text-fine-sm">
                {[
                  { label: 'Uptime', value: '13d 19:44:33' },
                  { label: 'Kernel', value: 'Debian 12.11 - linux 6.1.0-21-amd64' },
                  { label: 'CPU Type', value: 'Intel Xeon E5-2670' },
                  { label: 'CPU Cores', value: '4' },
                  { label: 'Total Memory', value: '15900MB' },
                  { label: 'Swap', value: '0MB' },
                  { label: 'Interface IP Address', value: 'inet 127.0.0.1/8' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-start justify-center min-w-0">
                    <span className="font-medium mb-1" style={{ color: '#f0f0f0' }}>{item.label}</span>
                    <span className="font-mono truncate max-w-full break-all text-base">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            {/* </div> */}
          </Card>
          </div>
  )
}

export default ServerStats


