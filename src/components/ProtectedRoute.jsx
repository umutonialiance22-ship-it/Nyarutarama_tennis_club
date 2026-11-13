import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { homeForUser, normalizeRole } from '../utils/role'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-flame/30 border-t-flame" />
      </div>
    )
  }

  // Not signed in: go to login and remember this page
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  // Signed in but wrong role: send them to their own area
  if (allowedRoles && !allowedRoles.includes(normalizeRole(user))) {
    return <Navigate to={homeForUser(user)} replace />
  }

  return children
}