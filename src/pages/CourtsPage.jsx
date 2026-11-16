import { useEffect, useState } from 'react'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import DateBar from '../components/booking/DateBar'
import AvailabilityTable from '../components/booking/AvailabilityTable'
import BookingDialog from '../components/booking/BookingDialog'
import CancelBookingDialog from '../components/booking/CancelBookingDialog'
import ContextMenu from '../components/booking/ContextMenu'
import Notice from '../auth/components/Notice'
import { useLang } from '../context/LanguageContext'
import { useNotifications } from '../context/NotificationContext'
import { bookingConfig, courts } from '../data/clubData'
import { cancelBooking, createBooking, getBookings, isDemoMode } from '../services/bookingService'
import { formatLong, pad, toISODate } from '../utils/dates'
import { errorText } from '../utils/errors'

const hours = Array.from(
  { length: bookingConfig.closeHour - bookingConfig.openHour },
  (_, i) => bookingConfig.openHour + i
)

export default function CourtsPage() {
  const { t, locale } = useLang()
  const { refresh: refreshNotifications } = useNotifications()

  const [date, setDate] = useState(() => toISODate(new Date()))
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [slot, setSlot] = useState(null)
  const [menu, setMenu] = useState(null) // { booking, x, y }
  const [cancelTarget, setCancelTarget] = useState(null)
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
        setError(errorText(err, t))
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
      setReloadKey((k) => k + 1)
      throw err
    }
    setSuccess(
      t('booking.bookedOk', {
        court: t('court.n', { n: slot.court.id }),
        date: formatLong(date, locale),
        time: pad(slot.hour),
      })
    )
    setSlot(null)
    setReloadKey((k) => k + 1)
    refreshNotifications() // the "booking confirmed" notification appears in the bell
  }

  const handleCancel = async () => {
    const target = cancelTarget
    try {
      await cancelBooking(target.id)
    } catch (err) {
      setReloadKey((k) => k + 1)
      throw err
    }
    setSuccess(
      t('booking.cancelledOk', {
        court: t('court.n', { n: target.court }),
        date: formatLong(date, locale),
        time: pad(target.hour),
      })
    )
    setCancelTarget(null)
    setReloadKey((k) => k + 1)
    refreshNotifications()
  }

  return (
    <div className="min-h-screen bg-cream">
      <AppNavbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-flame">{t('booking.label')}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-night sm:text-4xl">{t('booking.title')}</h1>
        <p className="mt-2 text-night/60">{t('booking.open', { hours: t('booking.hours') })}</p>

        <div className="mt-6 space-y-4">
          {isDemoMode && <Notice type="info">{t('booking.demo')}</Notice>}
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
                {t('booking.retry')}
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
            onCancel={setCancelTarget}
            onMenu={(booking, x, y) => setMenu({ booking, x, y })}
          />
        </div>

        {/* Legend */}
        <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-night/70">
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded border border-black/15 bg-white" /> {t('booking.free')}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-red-500" /> {t('booking.booked')}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-green-500" /> {t('booking.yours')}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-4 w-4 rounded bg-black/10" /> {t('booking.past')}
          </li>
        </ul>
        <p className="mt-3 text-center text-xs text-night/50">{t('booking.tip')}</p>
      </main>

      <Footer />

      {slot && <BookingDialog slot={slot} date={date} onClose={() => setSlot(null)} onConfirm={handleConfirm} />}

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          onCancelBooking={() => {
            setCancelTarget(menu.booking)
            setMenu(null)
          }}
        />
      )}

      {cancelTarget && (
        <CancelBookingDialog
          booking={cancelTarget}
          date={date}
          courtName={t('court.n', { n: cancelTarget.court })}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleCancel}
        />
      )}
    </div>
  )
}