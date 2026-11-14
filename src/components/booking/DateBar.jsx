import { addDays, formatLong, toISODate } from '../../utils/dates'

const btn =
  'rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-night transition hover:border-flame hover:text-flame disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:text-night'

export default function DateBar({ date, onChange }) {
  const today = toISODate(new Date())

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <label htmlFor="booking-date" className="text-sm font-medium text-night/70">
        Date
      </label>
      <input
        id="booking-date"
        type="date"
        min={today}
        value={date}
        onChange={(e) => e.target.value && onChange(e.target.value)}
        className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-night outline-none focus:border-flame focus:ring-2 focus:ring-flame/25"
      />
      <button type="button" className={btn} onClick={() => onChange(today)}>
        Today
      </button>
      <button type="button" className={btn} aria-label="Previous day" disabled={date <= today} onClick={() => onChange(addDays(date, -1))}>
        ‹
      </button>
      <button type="button" className={btn} aria-label="Next day" onClick={() => onChange(addDays(date, 1))}>
        ›
      </button>
      <p className="w-full text-sm font-semibold text-night sm:ml-auto sm:w-auto">{formatLong(date)}</p>
    </div>
  )
}