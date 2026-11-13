import { useState } from 'react'
import SmartImage from './SmartImage'
import { club } from '../data/clubData'
import useBookCourt from '../hooks/useBookCourt'

export default function CourtCard({ court }) {
  const bookCourt = useBookCourt()
  const [showCall, setShowCall] = useState(false)

  const handleBook = () => {
    // VIP court: show the "call operations manager" option
    if (court.vip) {
      setShowCall(!showCall)
      return
    }
   // General courts: same role-aware logic, logged-out visitors land on Register
    bookCourt({ target: `/courts?court=${court.id}`, loggedOutPage: '/register' })
  }
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-flame/20 hover:ring-flame/40">
      {/* Photo */}
      <div className="relative">
        <SmartImage
          src={court.image}
          alt={`${court.name} - ${court.category}`}
          label={`${court.name} photo`}
          className="h-52 w-full"
          imgClassName="transition duration-700 ease-out group-hover:scale-110"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow transition duration-500 group-hover:scale-105 ${
            court.vip ? 'bg-ball text-night' : 'bg-white text-night'
          }`}
        >
          {court.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-night transition group-hover:text-flame">
          {court.name}
        </h3>
        <p className="mt-2 text-sm text-night/70">{court.description}</p>

        <dl className="mt-5 space-y-2 border-t border-black/5 pt-4">
          {court.info.map((i) => (
            <div key={i.label} className="flex justify-between text-sm">
              <dt className="text-night/50">{i.label}</dt>
              <dd className="font-medium text-flame-dark">{i.value}</dd>
            </div>
          ))}
        </dl>

        {/* Book area */}
        <div className="mt-auto pt-6">
          {court.vip && showCall ? (
            <div className="rounded-xl bg-ball/30 p-4 text-center ring-1 ring-ball">
              <p className="text-sm text-night/70">
                VIP court bookings are arranged with our Operations Manager.
              </p>
              <a
                href={club.contact.phoneHref}
                className="mt-3 block rounded-full bg-night px-5 py-3 text-sm font-semibold text-white transition hover:bg-flame"
              >
                 Call Operations Manager
              </a>
              <p className="mt-2 text-xs text-night/50">
                {club.contact.name} · {club.contact.phoneDisplay}
              </p>
              <button
                onClick={() => setShowCall(false)}
                className="mt-2 text-xs text-night/50 underline hover:text-flame"
              >
                Close
              </button>
            </div>
          ) : (
            <button
               onClick={handleBook}
               className={`mx-auto flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition hover:shadow-lg ${
               court.vip
               ? 'bg-ball text-night hover:shadow-ball/50'
               : 'bg-flame text-white hover:bg-flame-dark hover:shadow-flame/40'
               }`}
               >
               Book {court.name}
               <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          )}
        </div>
      </div>

      {/* Growing bar on hover */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-flame transition-all duration-500 group-hover:w-full" />
    </article>
  )
}