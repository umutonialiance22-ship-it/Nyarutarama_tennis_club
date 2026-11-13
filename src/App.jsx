import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Placeholder from './pages/Placeholder'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './utils/role'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />

      {/* Protected pages (placeholders until we build them) */}
      <Route
        path="/courts"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
            <Placeholder title="Court Availability" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coach"
        element={
          <ProtectedRoute allowedRoles={[ROLES.COACH]}>
            <Placeholder title="Coach Dashboard" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
            <Placeholder title="Manager Dashboard" />
          </ProtectedRoute>
        }
      />

      <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
      <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
    </Routes>
  )
}