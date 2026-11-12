import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />
      <Route path="/book" element={<Placeholder title="Book a Court" />} />
      <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
      <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
    </Routes>
  )
}