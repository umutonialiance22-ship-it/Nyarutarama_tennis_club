import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { club } from '../data/clubData'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courts', to: '/courts' },
  { label: 'Tariffs', to: '/#tariffs' },
  { label: 'Contact', to: '/#contact' },
]

export default function AppNavbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className={linkClass(l.to)}>
                {l.label}
              </Link>
            </li>
          ))}
          {firstName && <li className="text-sm text-night/60">Hi, {firstName}</li>}
          <li>
            <button
              onClick={handleLogout}
              className="rounded-full border border-night/20 px-5 py-2 text-sm font-semibold text-night transition hover:border-flame hover:text-flame"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-night md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-3 font-medium text-night/80 hover:text-flame">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="mt-3 block w-full rounded-full border border-night/20 py-3 text-center font-semibold text-night"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  )
}