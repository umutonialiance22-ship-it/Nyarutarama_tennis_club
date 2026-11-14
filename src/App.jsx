import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import CourtsPage from './pages/CourtsPage'
import Placeholder from './pages/Placeholder'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToHash from './components/ScrollToHash'
import { ROLES } from './utils/role'

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />

        <Route
          path="/courts"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <CourtsPage />
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
    </>
  )
}