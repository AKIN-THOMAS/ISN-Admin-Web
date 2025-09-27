import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'


const NetworkMiktoTik = () => {
 return (
    <div className="w-full px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MikroTik - Overview</CardTitle>
                <CardDescription>
                Summary of MikroTik device performance and status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                    <div className="w-full">
                        <div className="table w-full border-separate border-spacing-0">
                            <div className="table-row border-b border-border">
                                <div className="table-cell py-2 text-fine text-muted-foreground">
                                Latest Version
                                </div>
                                <div className="table-cell py-2">
                                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                                    7.19.2
                                    </span>
                                </div>
                            </div>
                            <div className="table-row border-b border-border">
                                <div className="table-cell py-2 text-fine text-muted-foreground">
                                    Online
                                    </div>
                                    <div className="table-cell py-2">
                                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                                    72
                                    </span>
                                </div>
                            </div>
                            {/* Row: Number of MikroTik */}
                            <div className="table-row border-b border-border">
                                <div className="table-cell py-2 text-fine text-muted-foreground">
                                    Number of MikroTik
                                    </div>
                                    <div className="table-cell py-2">
                                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                                    61
                                    </span>
                                </div>
                            </div>
                            {/* Row: Offline */}
                            <div className="table-row border-b border-border">
                                <div className="table-cell py-2 text-fine text-muted-foreground">
                                    Offline
                                    </div>
                                    <div className="table-cell py-2">
                                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                                    11
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Spacer to push the button to the bottom */}
                        <div className="flex-1 py-10" />
                        <div className="flex justify-end mt-6">
                            <button
                                className="rounded-lg px-4 py-2 bg-white text-black text-btn-base font-medium shadow-sm"
                                type="button"
                            >
                                View Detailed View
                            </button>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>MikroTik - Other Services</CardTitle>
              <CardDescription>
                Additional MikroTik services and integrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full">
              <div className="w-full">
                <div className="table w-full border-separate border-spacing-0">
                {/* Row: Latest Version */}
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                  Socks
                  </div>
                  <div className="table-cell py-2">
                  <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                    0
                  </span>
                  </div>
                </div>
                {/* Row: Online */}
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                  Web Proxy
                  </div>
                  <div className="table-cell py-2">
                  <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                    0
                  </span>
                  </div>
                </div>
                {/* Row: Number of MikroTik */}
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                  Packet Sniffer
                  </div>
                  <div className="table-cell py-2">
                  <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                    0
                  </span>
                  </div>
                </div>
                {/* Row: Offline */}
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                    SNMP
                  </div>
                  <div className="table-cell py-2">
                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                      11
                    </span>
                  </div>
                </div>
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                    Bandwidth Test Server
                  </div>
                  <div className="table-cell py-2">
                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                      11
                    </span>
                  </div>
                </div>
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                    PPTP
                  </div>
                  <div className="table-cell py-2">
                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                      2
                    </span>
                  </div>
                </div>
                <div className="table-row border-b border-border">
                  <div className="table-cell py-2 text-fine text-muted-foreground">
                    I2TP
                  </div>
                  <div className="table-cell py-2">
                    <span className="ml-2 rounded px-2 py-0.5 text-fine-xs font-semibold bg-red-500 text-white">
                      4
                    </span>
                  </div>
                </div>
                
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        className="rounded-lg px-4 py-2 bg-white text-black text-btn-base font-medium shadow-sm"
                        type="button"
                    >
                        View Detailed View
                    </button>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
  )
}

export default NetworkMiktoTik