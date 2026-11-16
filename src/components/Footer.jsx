import { Link } from 'react-router-dom'
import { club, navLinks } from '../data/clubData'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

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
          <p className="mt-4 text-sm">{t('Tennis, fitness and wellness in the heart of Kigali, for players of every level.')}</p>
          <p className="mt-3 text-sm italic text-ball/80">{t('hero.tagline')}</p>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">{t('Quick Links')}</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.key}>
                <a href={l.href} className="transition hover:text-ball">
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">{t('Contact')}</h4>
          <ul className="space-y-2 text-sm">
            <li>{club.address}</li>
            <li>
              <a href={club.contact.phoneHref} className="transition hover:text-ball">
                {club.contact.phoneDisplay}
              </a>
            </li>
            <li>{t('{hours}, 7 days a week', { hours: t('booking.hours') })}</li>
            <li>
              <a href={club.instagram} target="_blank" rel="noreferrer" className="transition hover:text-ball">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display font-semibold text-white">{t('Legal')}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy" className="transition hover:text-ball">
                {t('Privacy Policy')}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-ball">
                {t('Terms & Conditions')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {club.name}. {t('All rights reserved.')}
      </div>
    </footer>
  )
}