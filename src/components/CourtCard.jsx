import { useState } from 'react'
import SmartImage from './SmartImage'
import { club } from '../data/clubData'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import useBookCourt from '../hooks/useBookCourt'
import { canBookVip } from '../utils/role'

export default function CourtCard({ court }) {
  const bookCourt = useBookCourt()
  const { user } = useAuth()
  const { t } = useLang()
  const [showCall, setShowCall] = useState(false)

  const label = t('court.n', { n: court.id })
  const category = court.vip ? t('court.vip') : t('court.general')

  const handleBook = () => {
    // VIP court: only VIP customers (and the manager) can book it themselves
    if (court.vip && !canBookVip(user)) {
      setShowCall(!showCall)
      return
    }
    bookCourt({ target: `/courts?court=${court.id}`, loggedOutPage: '/register' })
  }

  return (
    <article className="group relative aspect-[6/5] overflow-hidden rounded-[1.5rem] bg-night shadow-md ring-1 ring-black/5 transition duration-500 hover:shadow-2xl">
      <SmartImage
        src={court.image}
        alt={`${label} - ${category}`}
        label={`${label} photo`}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 transition duration-500 group-hover:-translate-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/70">{category}</p>
        <h3 className="mt-1 font-display text-3xl font-semibold text-white">{label}</h3>

        {court.vip && showCall ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href={club.contact.phoneHref}
              className="rounded-full bg-ball px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-night transition hover:shadow-lg hover:shadow-ball/40"
            >
               {t('court.callManager')}
            </a>
            <button
              onClick={() => setShowCall(false)}
              className="text-xs uppercase tracking-[0.15em] text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              {t('court.close')}
            </button>
          </div>
        ) : (
          <button
            onClick={handleBook}
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ball transition-all hover:gap-3 hover:text-white"
          >
            {t('court.book')} <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </article>
  )
}