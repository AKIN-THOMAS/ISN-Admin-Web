import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  loading: boolean
  showSplash: boolean
  notifications: Notification[]
  modals: {
    [key: string]: boolean
  }
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: number
  read: boolean
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  loading: false,
  showSplash: true,
  notifications: [],
  modals: {},
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state: UIState) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state: UIState, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state: UIState, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    addNotification: (state: UIState, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      }
      state.notifications.unshift(notification)
    },
    markNotificationAsRead: (state: UIState, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n: Notification) => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    removeNotification: (state: UIState, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n: Notification) => n.id !== action.payload)
    },
    clearAllNotifications: (state: UIState) => {
      state.notifications = []
    },
    openModal: (state: UIState, action: PayloadAction<string>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state: UIState, action: PayloadAction<string>) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state: UIState) => {
      state.modals = {}
    },
    hideSplash: (state: UIState) => {
      state.showSplash = false
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setLoading,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearAllNotifications,
  openModal,
  closeModal,
  closeAllModals,
  hideSplash,
} = uiSlice.actions

export default uiSlice.reducer