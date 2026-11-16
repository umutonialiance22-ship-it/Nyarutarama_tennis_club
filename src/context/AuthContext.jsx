import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getCurrentUser, logoutRequest } from '../services/authService'

const AuthContext = createContext(null)

// DEV-ONLY preview: lets you see logged-in pages before Django exists.
// import.meta.env.DEV is false in production builds, so this can never run live.
const DEMO = import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE === 'true'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Ask the backend who is signed in. Returns the user, or null.
  const refresh = useCallback(async () => {
    if (DEMO) {
        
      const me =
       import.meta.env.VITE_DEMO_ROLE === 'OPERATIONS_MANAGER'
        ? { full_name: 'Rudashirikaka Aimable', role: 'OPERATIONS_MANAGER' }
        : { full_name: 'Demo Customer', role: 'CUSTOMER', is_vip: import.meta.env.VITE_DEMO_VIP === 'true' }
      setUser(me)
      setLoading(false)
      return me
    }
    try {
      const me = await getCurrentUser()
      setUser(me)
      return me
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const logout = async () => {
    try {
      await logoutRequest()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}