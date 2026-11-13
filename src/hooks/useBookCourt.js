import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { resolveDestination } from '../utils/role'

export default function useBookCourt() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  return useCallback(
    ({ target = '/courts', loggedOutPage = '/login' } = {}) => {
      if (loading) return // still checking whether someone is signed in

      // Logged out: go to login/register and remember where they wanted to go
      if (!user) {
        navigate(loggedOutPage, { state: { from: target } })
        return
      }

      // Logged in: customer -> /courts, coach -> /coach, manager -> /manager
      navigate(resolveDestination(user, target))
    },
    [user, loading, navigate]
  )
}