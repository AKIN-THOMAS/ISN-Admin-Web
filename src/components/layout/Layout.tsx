import { ReactNode, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

return (
    <div className="h-screen bg-background">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <div className={cn(
        'flex flex-col transition-all duration-300 ease-in-out',
        'lg:ml-64' // Always show sidebar on large screens
      )}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default Layout