import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { club } from '../data/clubData'
import { resolveDestination } from '../utils/role'
import SmartImage from '../components/SmartImage'
import LanguageSwitcher from '../components/LanguageSwitcher'
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
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[1fr_1.1fr]">
      <aside className="sticky top-0 hidden h-screen p-4 lg:block">
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-night">
          <SmartImage
            src="/images/hero.jpg"
            alt="Nyarutarama Tennis Club"
            label="Photo"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/40 to-night/20" />
          <div className="absolute inset-x-0 bottom-0 p-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-ball">{club.name}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-white">
              {t('Your next game starts here.')}
            </h2>
            <p className="mt-3 max-w-sm text-sm italic text-white/75">{t('hero.tagline')}</p>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col px-4 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Club logo" className="h-11 w-11 object-contain" />
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

            <h1 className="mt-7 font-display text-3xl font-semibold text-night">{t(COPY[mode].title)}</h1>
            <p className="mb-6 mt-2 text-sm text-night/60">{t(COPY[mode].text)}</p>

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