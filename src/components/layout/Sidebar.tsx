import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  MenuIcon, 
  Bell, 
  User, 
  Settings,
  X,
  ChevronDown,
  NetworkIcon
} from 'lucide-react';
import sideLogo from '@/assets/images/isn-logo-113.png';

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients', 
    icon: Users,
    badge: '1,247',
  },
  {
    title: 'Hardware',
    href: '/dashboard/hardware',
    icon: NetworkIcon,
  },
  {
    title: 'Others',
    href: '/dashboard/others',
    icon: MenuIcon,
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    badge: '12',
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
];

const Sidebar = ({ open, onOpenChange }: AdminSidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  // dispatch(logout())
  // navigate(ROUTES.AUTH.LOGIN)

  const isItemActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-white/80 dark:bg-black/80 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 z-50 h-full w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <img src={sideLogo} alt="ISN Logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Admin Portal</span>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="h-6 w-6 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-10 p-4">
          {navigationItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    'text-sidebar-foreground'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown className={cn(
                      'h-4 w-4 transition-transform',
                      expandedItems.includes(item.title) && 'rotate-180'
                    )} />
                  </div>
                </button>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isItemActive(item.href)
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      isItemActive(item.href)
                        ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground'
                        : 'bg-primary text-primary-foreground'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
              
              {/* Submenu items */}
              {item.children && expandedItems.includes(item.title) && (
                <div className="ml-6 mt-1 space-y-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      to={child.href}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isItemActive(child.href)
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <child.icon className="mr-3 h-4 w-4" />
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

            <div className="absolute bottom-0 left-0 w-full px-4 pb-4">
            <button
              onClick={() => {
                // dispatch(logout());
                // navigate(ROUTES.AUTH.LOGIN);
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-btn-base font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              aria-label="Logout"
            >
              <Settings className="h-4 w-4" />
              <span>Logout</span>
            </button>

            <div className="mt-4 flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
              <img
                src={ '/assets/images/default-avatar.png'}
                alt={ 'User'}
                className="h-9 w-9 rounded-full object-cover border border-sidebar-border"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sidebar-foreground text-fine">{'Admin User'}</span>
                <span className="text-fine-xs text-sidebar-muted">{'Administrator'}</span>
              </div>
            </div>
          </div>
        </nav>

       
      </aside>
    </>
  );
};

export default Sidebar;