import { useMemo, useState } from 'react'
import { Modal, SearchBox, inputCls } from './ui'
import { useLang } from '../../context/LanguageContext'
import { courts } from '../../data/clubData'
import { isPastSlot, pad, toISODate } from '../../utils/dates'
import { HOURS } from '../../utils/managerHelpers'

export default function NewBookingModal({ customers, bookings, prefill = {}, onClose, onCreate }) {
  const { t } = useLang()
  const today = toISODate(new Date())

  const [query, setQuery] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [court, setCourt] = useState(prefill.court ?? 2)
  const [date, setDate] = useState(prefill.date ?? today)
  const [hour, setHour] = useState(prefill.hour != null ? String(prefill.hour) : '')
  const [error, setError] = useState('')

  // Only active customers, searchable by name, email or phone
  const options = useMemo(() => {
    const q = query.trim().toLowerCase()
    const digits = q.replace(/\s/g, '')
    return customers.filter(
      (c) =>
        c.status === 'Active' &&
        (!q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(digits))
    )
  }, [customers, query])

  // Free hours for this court and date (not booked, not in the past)
  const freeHours = useMemo(
    () =>
      HOURS.filter(
        (h) =>
          !isPastSlot(date, h) &&
          !bookings.some((b) => b.status === 'Confirmed' && b.court === Number(court) && b.date === date && b.hour === h)
      ),
    [bookings, court, date]
  )

  const customer = customers.find((c) => c.id === Number(customerId))
  const hourValue = freeHours.includes(Number(hour)) ? String(hour) : ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!customer) return setError(t('Please choose a customer.'))
    if (hourValue === '') return setError(t('Please choose a time.'))
    onCreate({ customer, court: Number(court), date, hour: Number(hourValue) })
  }

  return (
    <Modal title={t('Book for a customer')} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-night">{t('Customer')}</label>
          <SearchBox value={query} onChange={setQuery} placeholder={t('Search by name, email or phone')} />
          <select
            aria-label={t('Customer')}
            value={customerId}
            onChange={(e) => {
              setCustomerId(e.target.value)
              setError('')
            }}
            className={`${inputCls} mt-2`}
          >
            <option value="">{t('Choose a customer')}</option>
            {options.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.phone}
                {c.membership === 'VIP' ? ' · VIP' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nb-court" className="mb-1.5 block text-sm font-medium text-night">{t('Court')}</label>
            <select id="nb-court" value={court} onChange={(e) => setCourt(e.target.value)} className={inputCls}>
              {courts.map((c) => (
                <option key={c.id} value={c.id}>
                  {t('court.n', { n: c.id })}
                  {c.vip ? ' (VIP)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nb-date" className="mb-1.5 block text-sm font-medium text-night">{t('Date')}</label>
            <input id="nb-date" type="date" min={today} value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="nb-time" className="mb-1.5 block text-sm font-medium text-night">{t('Time')}</label>
          <select id="nb-time" value={hourValue} onChange={(e) => { setHour(e.target.value); setError('') }} className={inputCls}>
            <option value="">{t('Choose a time')}</option>
            {freeHours.map((h) => (
              <option key={h} value={h}>
                {pad(h)} - {pad(h + 1)}
              </option>
            ))}
          </select>
          {freeHours.length === 0 && <p className="mt-1.5 text-xs text-red-600">{t('No free times left on this court for this date.')}</p>}
        </div>

        {Number(court) === 1 && customer && customer.membership !== 'VIP' && (
          <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {t('Note: {name} is not a VIP member.', { name: customer.name })}
          </p>
        )}
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <p className="text-xs text-night/50">{t('The customer will be notified by email and in the app.')}</p>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-night/20 py-2.5 text-sm font-semibold text-night hover:border-flame hover:text-flame">
            {t('Cancel')}
          </button>
          <button type="submit" className="flex-1 rounded-full bg-ball py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40">
            {t('Create booking')}
          </button>
        </div>
      </form>
    </Modal>
  )
}