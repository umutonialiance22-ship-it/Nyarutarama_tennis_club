import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import CourtsPage from './pages/CourtsPage'
import Placeholder from './pages/Placeholder'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToHash from './components/ScrollToHash'
import PreviewBar from './components/PreviewBar'
import ManagerLayout from './components/manager/ManagerLayout'
import OverviewPage from './pages/manager/OverviewPage'
import BookingsPage from './pages/manager/BookingsPage'
import ManagerCourtsPage from './pages/manager/ManagerCourtsPage'
import CustomersPage from './pages/manager/CustomersPage'
import CoachesPage from './pages/manager/CoachesPage'
import { ROLES } from './utils/role'

export default function App() {
  return (
    <>
      <ScrollToHash />
      <PreviewBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />

        <Route
          path="/courts"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.COACH, ROLES.OPERATIONS_MANAGER]}>
              <CourtsPage />
            </ProtectedRoute>
          }
        />

        {/* Operations Manager area (no link in the public navigation) */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={[ROLES.OPERATIONS_MANAGER]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="courts" element={<ManagerCourtsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="coaches" element={<CoachesPage />} />
        </Route>

        <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
        <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Routes>
    </>
  )
}