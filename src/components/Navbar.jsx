import { useState } from 'react'
import { Link } from 'react-router-dom'
import { club, navLinks } from '../data/clubData'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="/#home" className="flex items-center gap-3" onClick={close}>
          <img src="/logo.png" alt="Club logo" className="h-11 w-11 object-contain" />
          <span className="font-display text-sm font-bold text-night sm:text-lg">{club.name}</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-base font-light tracking-wide text-night/70 transition hover:text-flame">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/login" className="text-base font-light tracking-wide text-night/70 transition hover:text-flame">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/book"
              className="rounded-full bg-ball px-5 py-2 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ball/40"
            >
              Book a Court
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-night lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={close} className="block py-3 font-medium text-night/80 hover:text-flame">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/login" onClick={close} className="block py-3 font-medium text-night/80 hover:text-flame">
                Login
              </Link>
            </li>
          </ul>
          <Link
            to="/book"
            onClick={close}
            className="mt-3 block rounded-full bg-ball py-3 text-center font-semibold text-night"
          >
            Book a Court
          </Link>
        </div>
      )}
    </header>
  )
}