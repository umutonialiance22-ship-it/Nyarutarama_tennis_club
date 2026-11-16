import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookCourtButton from './BookCourtButton'
import LanguageSwitcher from './LanguageSwitcher'
import NotificationBell from '../context/NotificationBell'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { club, navLinks } from '../data/clubData'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLang()
  const close = () => setOpen(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      /* the session is cleared on our side either way */
    }
    close()
  }

  const linkCls = 'text-base font-light tracking-wide text-night/70 transition hover:text-flame'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="/#home" className="flex items-center gap-3" onClick={close}>
          <img src="/logo.png" alt={`${club.name} logo`} className="h-11 w-11 object-contain" />
          <span className="font-display text-sm font-bold text-night sm:text-lg">{club.name}</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 xl:flex">
          {navLinks.map((l) => (
            <li key={l.key}>
              <a href={l.href} className={linkCls}>
                {t(l.key)}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <button onClick={handleLogout} className={linkCls}>
                {t('nav.logout')}
              </button>
            ) : (
              <Link to="/login" className={linkCls}>
                {t('nav.login')}
              </Link>
            )}
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          {user && (
            <li>
              <NotificationBell />
            </li>
          )}
          <li>
            <BookCourtButton className="rounded-full bg-ball px-5 py-2 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ball/40" />
          </li>
        </ul>

        {/* Mobile / tablet */}
        <div className="flex items-center gap-1 xl:hidden">
          {user && <NotificationBell />}
          <button
            className="rounded-md p-2 text-night"
            onClick={() => setOpen(!open)}
            aria-label={t('nav.menu')}
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-6 pt-2 xl:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.key}>
                <a href={l.href} onClick={close} className="block py-3 font-medium text-night/80 hover:text-flame">
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li>
              {user ? (
                <button onClick={handleLogout} className="block w-full py-3 text-left font-medium text-night/80 hover:text-flame">
                  {t('nav.logout')}
                </button>
              ) : (
                <Link to="/login" onClick={close} className="block py-3 font-medium text-night/80 hover:text-flame">
                  {t('nav.login')}
                </Link>
              )}
            </li>
          </ul>
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
          <BookCourtButton
            onClick={close}
            className="mt-4 block w-full rounded-full bg-ball py-3 text-center font-semibold text-night"
          />
        </div>
      )}
    </header>
  )
}