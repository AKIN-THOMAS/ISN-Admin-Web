import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardKPI {
  activeSubscribers: number;
  monthlyRevenue: number;
  networkHealth: number;
  activeTickets: number;
  avgResponseTime: string;
  revenueGrowth: number;
}

export interface RecentActivity {
  id: string;
  type: 'new_subscriber' | 'payment_received' | 'ticket_created' | 'device_connected';
  description: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high';
}

interface DashboardState {
  kpis: DashboardKPI;
  recentActivities: RecentActivity[];
  networkAlerts: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  kpis: {
    activeSubscribers: 1247,
    monthlyRevenue: 125430,
    networkHealth: 98.5,
    activeTickets: 23,
    avgResponseTime: '2.4h',
    revenueGrowth: 12.3,
  },
  recentActivities: [
    {
      id: '1',
      type: 'new_subscriber',
      description: 'New subscriber John Smith registered for Premium Plan',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      type: 'payment_received',
      description: 'Payment of $99 received from customer #1234',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'ticket_created',
      description: 'New support ticket: Connection issues in Sector 7',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      severity: 'high',
    },
  ],
  networkAlerts: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action: PayloadAction<Partial<DashboardState>>) => {
      state.isLoading = false;
      Object.assign(state, action.payload);
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addRecentActivity: (state, action: PayloadAction<RecentActivity>) => {
      state.recentActivities.unshift(action.payload);
      if (state.recentActivities.length > 10) {
        state.recentActivities.pop();
      }
    },
  },
});

export const { 
  fetchDashboardStart, 
  fetchDashboardSuccess, 
  fetchDashboardFailure,
  addRecentActivity 
} = dashboardSlice.actions;
export default dashboardSlice.reducer;