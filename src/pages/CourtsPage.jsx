import { useEffect, useState } from 'react'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import DateBar from '../components/booking/DateBar'
import AvailabilityTable from '../components/booking/AvailabilityTable'
import BookingDialog from '../components/booking/BookingDialog'
import Notice from '../auth/components/Notice'
import { bookingConfig, club, courts } from '../data/clubData'
import { createBooking, getBookings, isDemoMode } from '../services/bookingService'
import { formatLong, pad, toISODate } from '../utils/dates'

const hours = Array.from(
  { length: bookingConfig.closeHour - bookingConfig.openHour },
  (_, i) => bookingConfig.openHour + i
)

export default function CourtsPage() {
  const [date, setDate] = useState(() => toISODate(new Date()))
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [slot, setSlot] = useState(null)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError('')
    getBookings(date)
      .then((data) => !ignore && setBookings(data))
      .catch((err) => {
        if (ignore) return
        setBookings([])
        setError(err.message)
      })
      .finally(() => !ignore && setLoading(false))
    return () => {
      ignore = true
    }
  }, [date, reloadKey])

  const changeDate = (d) => {
    setSuccess('')
    setDate(d)
  }

  const handleConfirm = async () => {
    try {
      await createBooking({ court: slot.court.id, date, hour: slot.hour })
    } catch (err) {
      setReloadKey((k) => k + 1) // refresh in case the slot was taken meanwhile
      throw err
    }
    setSuccess(`Booked ${slot.court.name} on ${formatLong(date)} at ${pad(slot.hour)}.`)
    setSlot(null)
    setReloadKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-cream">
      <AppNavbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-flame">Courts</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-night sm:text-4xl">Court Availability</h1>
        <p className="mt-2 text-night/60">
          Open daily {club.hours[0].time}. Pick a free slot to book your court.
        </p>

        <div className="mt-6 space-y-4">
          {isDemoMode && (
            <Notice type="info">Demo mode: these are sample bookings for previewing the design only.</Notice>
          )}
          <DateBar date={date} onChange={changeDate} />
          {success && <Notice type="success">{success}</Notice>}
          {error && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1">
                <Notice type="error">{error}</Notice>
              </div>
              <button
                onClick={() => setReloadKey((k) => k + 1)}
                className="rounded-full bg-flame px-5 py-2 text-sm font-semibold text-white hover:bg-flame-dark"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        <div className={`mt-4 transition ${loading ? 'opacity-50' : ''}`} aria-busy={loading}>
          <AvailabilityTable
            date={date}
            hours={hours}
            courts={courts}
            bookings={bookings}
            disabled={loading || Boolean(error)}
            onSelect={(court, hour) => setSlot({ court, hour })}
          />
        </div>

        {/* Legend */}
        <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-night/70">
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border border-black/15 bg-white" /> Free
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-red-500" /> Booked
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-green-500" /> Your booking
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-black/10" /> Past
          </li>
        </ul>
      </main>

      <Footer />

      {slot && (
        <BookingDialog slot={slot} date={date} onClose={() => setSlot(null)} onConfirm={handleConfirm} />
      )}
    </div>
  )
}