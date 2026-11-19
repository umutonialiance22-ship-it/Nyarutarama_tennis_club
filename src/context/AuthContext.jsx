import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getCurrentUser, logoutRequest } from '../services/authService'
import { DEMO_ENABLED, PREVIEW_MODE } from '../config'

const AuthContext = createContext(null)

// Sample users for the prototype only. Never used when connected to the real backend.
const PREVIEW_USERS = {
  visitor: null,
  customer: { full_name: 'Demo Customer', role: 'CUSTOMER', is_vip: false },
  vip: { full_name: 'Demo VIP Customer', role: 'CUSTOMER', is_vip: true },
  manager: { full_name: 'Rudashirikaka Aimable', role: 'OPERATIONS_MANAGER' },
}

function initialPreviewRole() {
  try {
    const saved = sessionStorage.getItem('previewRole')
    if (saved && saved in PREVIEW_USERS) return saved
  } catch {
    /* storage unavailable */
  }
  if (import.meta.env.VITE_DEMO_ROLE === 'OPERATIONS_MANAGER') return 'manager'
  if (import.meta.env.VITE_DEMO_VIP === 'true') return 'vip'
  return PREVIEW_MODE ? 'manager' : 'customer'
}

export function AuthProvider({ children }) {
  const [realUser, setRealUser] = useState(null)
  const [realLoading, setRealLoading] = useState(!DEMO_ENABLED)
  const [previewRole, setRole] = useState(initialPreviewRole)

  const setPreviewRole = (role) => {
    setRole(role)
    try {
      sessionStorage.setItem('previewRole', role)
    } catch {
      /* ignore */
    }
  }

  const user = DEMO_ENABLED ? PREVIEW_USERS[previewRole] : realUser
  const loading = DEMO_ENABLED ? false : realLoading

  // Ask the backend who is signed in. Returns the user, or null.
  const refresh = useCallback(async () => {
    if (DEMO_ENABLED) return PREVIEW_USERS[previewRole]
    try {
      const me = await getCurrentUser()
      setRealUser(me)
      return me
    } catch {
      setRealUser(null)
      return null
    } finally {
      setRealLoading(false)
    }
  }, [previewRole])

  useEffect(() => {
    refresh()
  }, [refresh])

  const logout = async () => {
    if (DEMO_ENABLED) {
      setPreviewRole('visitor')
      return
    }
    try {
      await logoutRequest()
    } finally {
      setRealUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout, previewRole, setPreviewRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}