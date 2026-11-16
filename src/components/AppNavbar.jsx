import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import NotificationBell from '../context/NotificationBell'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { club } from '../data/clubData'
import { normalizeRole } from '../utils/role'

const LINKS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.courts', to: '/courts' },
  { key: 'nav.tariffs', to: '/#tariffs' },
  { key: 'nav.contact', to: '/#contact' },
]

export default function AppNavbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLang()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const links =
    normalizeRole(user) === 'OPERATIONS_MANAGER' ? [{ key: 'nav.dashboard', to: '/manager' }, ...LINKS] : LINKS
  const firstName = String(user?.full_name || user?.fullName || user?.name || user?.email || '').split(' ')[0]

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      /* the session is cleared on our side either way */
    }
    navigate('/', { replace: true })
  }

  const linkClass = (to) =>
    `text-base font-light tracking-wide transition hover:text-flame ${
      !to.includes('#') && to === pathname ? 'font-medium text-flame' : 'text-night/70'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Club logo" className="h-11 w-11 object-contain" />
          <span className="font-display text-sm font-bold text-night sm:text-lg">{club.name}</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.key}>
              <Link to={l.to} className={linkClass(l.to)}>
                {t(l.key)}
              </Link>
            </li>
          ))}
          {firstName && <li className="text-sm text-night/60">{t('nav.hi', { name: firstName })}</li>}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <NotificationBell />
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="rounded-full border border-night/20 px-5 py-2 text-sm font-semibold text-night transition hover:border-flame hover:text-flame"
            >
              {t('nav.logout')}
            </button>
          </li>
        </ul>

        {/* Mobile / tablet */}
        <div className="flex items-center gap-1 lg:hidden">
          <NotificationBell />
          <button className="rounded-md p-2 text-night" onClick={() => setOpen(!open)} aria-label={t('nav.menu')} aria-expanded={open}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.key}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-3 font-medium text-night/80 hover:text-flame">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 block w-full rounded-full border border-night/20 py-3 text-center font-semibold text-night"
          >
            {t('nav.logout')}
          </button>
        </div>
      )}
    </header>
  )
}