import { Link } from 'react-router-dom'
import { club, navLinks } from '../data/clubData'

export default function Footer() {
  return (
    <footer className="bg-night text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1">
              <img src="/logo.png" alt="Club logo" className="h-full w-full object-contain" />
            </span>
            <span className="font-display font-bold text-white">{club.name}</span>
          </div>
          <p className="mt-4 text-sm">{club.shortDescription}</p>
          <p className="mt-3 text-sm italic text-ball/80">{club.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition hover:text-ball">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{club.address}</li>
            <li>
              <a href={club.contact.phoneHref} className="transition hover:text-ball">{club.contact.phoneDisplay}</a>
            </li>
            <li>{club.hours[0].time}, 7 days a week</li>
            <li>
              <a href={club.instagram} target="_blank" rel="noreferrer" className="transition hover:text-ball">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="transition hover:text-ball">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition hover:text-ball">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {club.name}. All rights reserved.
      </div>
    </footer>
  )
}