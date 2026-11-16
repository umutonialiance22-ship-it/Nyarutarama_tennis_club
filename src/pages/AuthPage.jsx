import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { club } from '../data/clubData'
import { resolveDestination } from '../utils/role'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LoginForm from '../auth/components/LoginForm'
import RegisterForm from '../auth/components/RegisterForm'

const COPY = {
  register: {
    title: 'Create your account',
    text: 'Join us and make booking your next tennis session easier.',
  },
}

export default function AuthPage({ mode = 'login' }) {
  const { user, loading } = useAuth()
  const { t } = useLang()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-flame/30 border-t-flame" />
      </div>
    )
  }

  if (user) return <Navigate to={resolveDestination(user, from)} replace />

  const switchTo = (m) => navigate(`/${m}`, { replace: true, state: location.state })

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 sm:px-8">
        <header className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt={`${club.name} logo`} className="h-11 w-11 object-contain" />
            <span className="hidden font-display text-sm font-bold text-night sm:inline sm:text-lg">{club.name}</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/" className="text-sm font-medium text-night/70 transition hover:text-flame">
              {t('← Back to Home')}
            </Link>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <div role="tablist" aria-label={t('Login or register')} className="grid grid-cols-2 rounded-full bg-cream p-1 ring-1 ring-black/5">
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
                  {m === 'login' ? t('Login') : t('Register')}
                </button>
              ))}
            </div>

            {mode === 'register' && (
              <>
                <h1 className="mt-7 font-display text-3xl font-semibold text-night">{t(COPY.register.title)}</h1>
                <p className="mb-6 mt-2 text-sm text-night/60">{t(COPY.register.text)}</p>
              </>
            )}

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
        </div>
      </main>
    </div>
  )
}