import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const RouterStats = () => {
  return (
    <div>
        <Card className="mt-4 flex-1">
            <CardHeader>
            <CardTitle className='flex justify-between items-center'>
                <h2>Router Statistics</h2>
                <div className="flex flex-col items-end justify-between space-y-2 pb-2">
                <span className="text-base font-semibold text-[#808080]">
                    Show All
                </span>
                </div>
            </CardTitle>
            <CardDescription>
                Overview of router health and connectivity.
            </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center h-[50%]">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-9 flex-1">
                {[
                    { label: 'Total', value: 1},
                    { label: 'Offline', value: 11 }, 
                    { label: 'Online', value: 61 },
                    { label: 'Inactive', value: 10 },
                    { label: 'Errors', value: 1 },
                    { label: 'Manually Edited Mangle', value: 3 },
                    { label: 'Emergency Mode', value: 1 },
                    { label: 'Up-to-date Configuration', value: 5 },
                    { label: 'Out-of-date Configuration', value: 7 },
                    { label: 'Custom', value: 6 }
                ].map((item) => (
                    <div
                    key={item.label}
                    className="flex flex-col items-center justify-center border border-border bg-muted rounded-lg shadow-sm min-w-0 h-full py-2"
                    style={{ borderWidth: 1 }}
                    >
                    <span className="text-fine-xs text-muted-foreground truncate break-all text-center w-full max-w-full overflow-hidden">{item.label}</span>
                    <span className="text-xl font-bold mt-1">{item.value}</span>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default RouterStats