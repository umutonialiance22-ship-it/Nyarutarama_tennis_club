import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { club } from '../data/clubData'
import GoogleButton from '../auth/components/GoogleButton'
import Notice from '../auth/components/Notice'
import LoginForm from '../auth/components/LoginForm'
import RegisterForm from '../auth/components/RegisterForm'

const COPY = {
  login: {
    title: 'Welcome back!',
    text: 'Log in to access court availability and manage your bookings.',
  },
  register: {
    title: 'Create your account',
    text: 'Join us and make booking your next tennis session easier.',
  },
}

export default function AuthPage({ mode = 'login' }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from
  const [authMethod, setAuthMethod] = useState(location.state?.registered ? 'email' : null)
  const [googleNotice, setGoogleNotice] = useState(false)

  // Wait until we know whether someone is already signed in
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-flame/30 border-t-flame" />
      </div>
    )
  }

  // Already signed in: send them on their way
 if (user) return <Navigate to={resolveDestination(user, from)} replace />

  const switchTo = (m) => {
    setAuthMethod(null)
    setGoogleNotice(false)
    navigate(`/${m}`, { replace: true, state: location.state })
  }

  const chooseEmail = () => {
    setGoogleNotice(false)
    setAuthMethod('email')
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="flex min-h-screen flex-col px-4 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Club logo" className="h-11 w-11 object-contain" />
            <span className="font-display text-sm font-bold text-night sm:text-lg">{club.name}</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-night/70 transition hover:text-flame">
            ← Back to Home
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            {/* Tabs */}
            <div role="tablist" aria-label="Login or register" className="grid grid-cols-2 rounded-full bg-cream p-1 ring-1 ring-black/5">
              {['login', 'register'].map((m) => (
                <button
                  key={m}
                  role="tab"
                  type="button"
                  aria-selected={mode === m}
                  onClick={() => switchTo(m)}
                  className={`rounded-full py-2.5 text-sm font-semibold transition ${
                    mode === m ? 'bg-flame text-white shadow' : 'text-night/50 hover:text-night'
                  }`}
                >
                  {m === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            <h1 className="mt-7 font-display text-3xl font-semibold text-night">{COPY[mode].title}</h1>
            <p className="mb-6 mt-2 text-sm text-night/60">{COPY[mode].text}</p>

            {authMethod === 'email' ? (
              <div>
                <button
                  type="button"
                  onClick={() => setAuthMethod(null)}
                  className="mb-5 text-sm font-medium text-flame-dark hover:underline"
                >
                  Back to sign-in options
                </button>
                {mode === 'login' ? (
                  <LoginForm
                    key="login"
                    from={from}
                    registered={location.state?.registered}
                    prefillEmail={location.state?.email}
                    onSwitch={switchTo}
                  />
                ) : (
                  <RegisterForm key="register" from={from} onSwitch={switchTo} />
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <GoogleButton onClick={() => setGoogleNotice(true)} />
                <button
                  type="button"
                  onClick={chooseEmail}
                  className="flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-night transition hover:bg-cream hover:shadow-sm"
                >
                  Continue with email
                </button>
                {googleNotice && (
                  <Notice type="info">
                    Google sign-in is not available yet. Continue with email to use your account.
                  </Notice>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}