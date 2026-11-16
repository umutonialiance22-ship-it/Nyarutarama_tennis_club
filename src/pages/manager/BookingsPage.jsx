import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { courts } from '../../data/clubData'
import { useLang } from '../../context/LanguageContext'
import { formatShort, isPastSlot, pad, toISODate } from '../../utils/dates'
import {
  Modal,
  PageHeader,
  SearchBox,
  SortHeader,
  StatusBadge,
  inputCls,
  thCls,
  useSort,
} from '../../components/manager/ui'
import NewBookingModal from '../../components/manager/NewBookingModal'
import Icon from '../../components/manager/Icon'

const REASONS = [
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'schedule_change', label: 'Schedule change' },
  { value: 'customer_request', label: 'Customer request' },
  { value: 'other', label: 'Other' },
]
const reasonLabel = (v) => REASONS.find((r) => r.value === v)?.label

const GETTERS = {
  date: (r) => r.date + pad(r.hour),
  court: (r) => r.court,
  customer: (r) => r.customer.toLowerCase(),
  status: (r) => r.status,
}

function CancelModal({ booking, onClose, onConfirm }) {
  const { t, locale } = useLang()
  const [reason, setReason] = useState('maintenance')
  const [note, setNote] = useState('')

  return (
    <Modal title={t('Cancel this booking?')} onClose={onClose} size="max-w-sm">
      <p className="text-sm text-night/70">
        {booking.customer}, {t('court.n', { n: booking.court })}, {formatShort(booking.date, locale)}, {pad(booking.hour)} - {pad(booking.hour + 1)}.
      </p>

      <label htmlFor="cancel-reason" className="mt-4 block text-sm font-medium text-night">{t('Reason')}</label>
      <select id="cancel-reason" value={reason} onChange={(e) => setReason(e.target.value)} className={`${inputCls} mt-1.5`}>
        {REASONS.map((r) => (
          <option key={r.value} value={r.value}>{t(r.label)}</option>
        ))}
      </select>

      <label htmlFor="cancel-note" className="mt-4 block text-sm font-medium text-night">{t('Note (optional)')}</label>
      <textarea id="cancel-note" rows={2} maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} className={`${inputCls} mt-1.5 resize-none`} />

      <p className="mt-3 text-xs text-night/50">
        {t('The customer will be notified by email and in the app. The booking stays in the list as Cancelled.')}
      </p>

      <div className="mt-5 flex gap-3">
        <button onClick={onClose} className="flex-1 rounded-full border border-night/20 py-2.5 text-sm font-semibold text-night hover:border-flame hover:text-flame">
          {t('Go back')}
        </button>
        <button onClick={() => onConfirm(reason, note.trim())} className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
          {t('Cancel booking')}
        </button>
      </div>
    </Modal>
  )
}

export default function BookingsPage() {
  const { bookings, setBookings, addBooking, customers, notify } = useOutletContext()
  const { t, locale } = useLang()
  const today = toISODate(new Date())

  const [query, setQuery] = useState('')
  const [date, setDate] = useState(today)
  const [court, setCourt] = useState('all')
  const [status, setStatus] = useState('all')
  const [toCancel, setToCancel] = useState(null)
  const [creating, setCreating] = useState(false)

  const rows = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (!date || b.date === date) &&
          (court === 'all' || b.court === Number(court)) &&
          (status === 'all' || b.status === status) &&
          b.customer.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [bookings, date, court, status, query]
  )
  const { sorted, sort, toggle } = useSort(rows, 'date', 'asc', GETTERS)

  const confirmCancel = (reason, note) => {
    setBookings((prev) => prev.map((b) => (b.id === toCancel.id ? { ...b, status: 'Cancelled', reason, note } : b)))
    notify('success', t('Booking cancelled. {name} will be notified by email and in the app (demo: nothing was sent).', { name: toCancel.customer }))
    setToCancel(null)
  }

  const subtitle =
    date === today
      ? t("Showing today's bookings on all courts.")
      : date
        ? t('Showing {date}.', { date: formatShort(date, locale) })
        : t('Showing all dates.')

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('Bookings')}
        subtitle={subtitle}
        action={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-ball px-5 py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
          >
            <Icon name="plus" className="h-4 w-4" /> {t('New booking')}
          </button>
        }
      />

      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:grid-cols-2 xl:grid-cols-4">
        <SearchBox value={query} onChange={setQuery} placeholder={t('Search customer name')} />
        <div className="flex gap-2">
          <input type="date" aria-label={t('Filter by date')} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          {date && (
            <button onClick={() => setDate('')} className="shrink-0 rounded-xl border border-black/10 px-3 text-xs font-semibold text-night/70 hover:border-flame hover:text-flame">
              {t('All dates')}
            </button>
          )}
        </div>
        <select aria-label={t('Filter by court')} value={court} onChange={(e) => setCourt(e.target.value)} className={inputCls}>
          <option value="all">{t('All courts')}</option>
          {courts.map((c) => (
            <option key={c.id} value={c.id}>{t('court.n', { n: c.id })}</option>
          ))}
        </select>
        <select aria-label={t('Filter by status')} value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
          <option value="all">{t('All statuses')}</option>
          <option value="Confirmed">{t('Confirmed')}</option>
          <option value="Cancelled">{t('Cancelled')}</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-cream text-night/60">
              <tr>
                <SortHeader label={t('Customer')} k="customer" sort={sort} toggle={toggle} />
                <SortHeader label={t('Court')} k="court" sort={sort} toggle={toggle} />
                <SortHeader label={t('Date')} k="date" sort={sort} toggle={toggle} />
                <th className={thCls}>{t('Time')}</th>
                <SortHeader label={t('Status')} k="status" sort={sort} toggle={toggle} />
                <th className={thCls}>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-night/50">{t('No bookings match your filters.')}</td>
                </tr>
              )}
              {sorted.map((b) => {
                const canCancel = b.status === 'Confirmed' && !isPastSlot(b.date, b.hour)
                return (
                  <tr key={b.id} className="border-t border-black/5 transition hover:bg-cream/60">
                    <td className="px-4 py-3 font-medium text-night">{b.customer}</td>
                    <td className="px-4 py-3 text-night/70">{t('court.n', { n: b.court })}</td>
                    <td className="px-4 py-3 text-night/70">{formatShort(b.date, locale)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-night/70">{pad(b.hour)} - {pad(b.hour + 1)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                      {b.status === 'Cancelled' && b.reason && (
                        <p className="mt-1 text-xs text-night/50" title={b.note || ''}>{t(reasonLabel(b.reason))}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {canCancel ? (
                        <button onClick={() => setToCancel(b)} className="text-sm font-semibold text-red-600 hover:underline">
                          {t('Cancel')}
                        </button>
                      ) : (
                        <span className="text-night/30">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {toCancel && <CancelModal booking={toCancel} onClose={() => setToCancel(null)} onConfirm={confirmCancel} />}

      {creating && (
        <NewBookingModal
          customers={customers}
          bookings={bookings}
          onClose={() => setCreating(false)}
          onCreate={(data) => {
            addBooking(data)
            setCreating(false)
          }}
        />
      )}
    </div>
  )
}