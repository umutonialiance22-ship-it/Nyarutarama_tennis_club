import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { courts } from '../../data/clubData'
import { useLang } from '../../context/LanguageContext'
import { formatLong, isPastSlot, pad, toISODate } from '../../utils/dates'
import { HOURS, SLOTS_PER_COURT, confirmedFor, courtLabel, liveState } from '../../utils/managerHelpers'
import { PageHeader, StatusBadge, inputCls } from '../../components/manager/ui'
import NewBookingModal from '../../components/manager/NewBookingModal'
import Icon from '../../components/manager/Icon'

export default function ManagerCourtsPage() {
  const { bookings, customers, addBooking } = useOutletContext()
  const { t, locale } = useLang()
  const navigate = useNavigate()
  const today = toISODate(new Date())
  const [date, setDate] = useState(today)
  const [prefill, setPrefill] = useState(null) // { court, date, hour }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('Courts')}
        subtitle={t('Daily schedule for {date}.', { date: formatLong(date, locale) })}
        action={
          <button
            onClick={() => navigate('/courts')}
            className="inline-flex items-center gap-2 rounded-full bg-ball px-5 py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
          >
            {t('Open Court Availability')} <Icon name="arrow" className="h-4 w-4" />
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <label htmlFor="court-date" className="text-sm font-medium text-night/70">{t('Date')}</label>
        <input id="court-date" type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className={`${inputCls} max-w-[200px]`} />
        {date !== today && (
          <button onClick={() => setDate(today)} className="text-sm font-semibold text-flame-dark hover:underline">{t('booking.today')}</button>
        )}
        <p className="w-full text-xs text-night/50 sm:ml-auto sm:w-auto">{t('Click a free hour to book it for a customer.')}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {courts.map((c) => {
          const list = confirmedFor(bookings, c.id, date)
          const byHour = new Map(list.map((b) => [b.hour, b]))
          const sorted = [...list].sort((a, b) => a.hour - b.hour)
          return (
            <section key={c.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-semibold text-night">{t('court.n', { n: c.id })}</h2>
                  <p className="text-sm text-night/50">{t(courtLabel(c))}</p>
                </div>
                {date === today ? <StatusBadge status={liveState(list)} /> : null}
              </div>
              <p className="mt-3 text-sm text-night/70">{t('{a} of {b} hours booked', { a: list.length, b: SLOTS_PER_COURT })}</p>

              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {HOURS.map((h) => {
                  const b = byHour.get(h)
                  const chip = String(h).padStart(2, '0')
                  if (b) {
                    return (
                      <span key={h} title={`${pad(h)} - ${b.customer}`} className="rounded-lg bg-red-500 py-1.5 text-center text-xs font-semibold text-white">
                        {chip}
                      </span>
                    )
                  }
                  if (isPastSlot(date, h)) {
                    return <span key={h} className="rounded-lg bg-black/5 py-1.5 text-center text-xs font-semibold text-night/25">{chip}</span>
                  }
                  return (
                    <button
                      key={h}
                      type="button"
                      title={`${pad(h)} - ${t('free')}`}
                      onClick={() => setPrefill({ court: c.id, date, hour: h })}
                      className="rounded-lg border border-black/10 bg-white py-1.5 text-center text-xs font-semibold text-night/60 transition hover:border-flame hover:bg-ball/40 hover:text-night"
                    >
                      {chip}
                    </button>
                  )
                })}
              </div>

              <ul className="mt-4 space-y-1.5 border-t border-black/5 pt-3 text-sm">
                {sorted.length === 0 && <li className="text-night/50">{t('No bookings.')}</li>}
                {sorted.map((b) => (
                  <li key={b.id} className="flex justify-between gap-3">
                    <span className="text-night/60">{pad(b.hour)} - {pad(b.hour + 1)}</span>
                    <span className="truncate font-medium text-night">{b.customer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {prefill && (
        <NewBookingModal
          customers={customers}
          bookings={bookings}
          prefill={prefill}
          onClose={() => setPrefill(null)}
          onCreate={(data) => {
            addBooking(data)
            setPrefill(null)
          }}
        />
      )}
    </div>
  )
}