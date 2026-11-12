import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getCurrentUser, logoutRequest } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Ask the backend who is signed in. Returns the user, or null.
  const refresh = useCallback(async () => {
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