import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../services/notificationService'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([])
      return
    }
    try {
      setItems(await getNotifications())
    } catch {
      /* keep what we already have */
    }
  }, [user])

  // Load when someone signs in, then check again every minute
  useEffect(() => {
    refresh()
    if (!user) return
    const id = setInterval(refresh, 60000)
    return () => clearInterval(id)
  }, [refresh, user])

  const markRead = async (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    try {
      await markNotificationRead(id)
    } catch {
      /* will be corrected on the next refresh */
    }
  }

  const markAll = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
    try {
      await markAllNotificationsRead()
    } catch {
      /* will be corrected on the next refresh */
    }
  }

  const unread = items.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider value={{ items, unread, refresh, markRead, markAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}