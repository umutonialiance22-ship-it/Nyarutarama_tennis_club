import { Link, useOutletContext } from 'react-router-dom'
import { courts } from '../../data/clubData'
import { useLang } from '../../context/LanguageContext'
import { formatLong, pad, toISODate } from '../../utils/dates'
import { SLOTS_PER_COURT, confirmedFor, courtLabel, liveState } from '../../utils/managerHelpers'
import { StatusBadge, thCls } from '../../components/manager/ui'
import Icon from '../../components/manager/Icon'

export default function OverviewPage() {
  const { bookings, customers, firstName } = useOutletContext()
  const { t, locale } = useLang()
  const today = toISODate(new Date())

  const todays = bookings.filter((b) => b.date === today)
  const confirmed = todays.filter((b) => b.status === 'Confirmed')
  const totalSlots = courts.length * SLOTS_PER_COURT

  const stats = [
    { label: 'Total bookings today', value: todays.length, note: t('{n} cancelled', { n: todays.length - confirmed.length }) },
    { label: 'Available court slots', value: totalSlots - confirmed.length, note: t('of {n} slots', { n: totalSlots }) },
    { label: 'Occupied court slots', value: confirmed.length, note: t('confirmed bookings') },
    { label: 'Registered customers', value: customers.length, note: t('{n} VIP', { n: customers.filter((c) => c.membership === 'VIP').length }) },
  ]

  const preview = [...todays].sort((a, b) => a.hour - b.hour).slice(0, 6)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-night sm:text-3xl">{t('Welcome back, {name}', { name: firstName })}</h1>
        <p className="mt-1 text-sm font-medium capitalize text-flame">{formatLong(today, locale)}</p>
        <p className="mt-1 text-sm text-night/60">{t("Here's an overview of today's club activities.")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-night/60">{t(s.label)}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-night">{s.value}</p>
            <p className="mt-1 text-xs text-night/45">{s.note}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-3 p-5">
          <h2 className="font-display text-lg font-semibold text-night">{t("Today's bookings")}</h2>
          <Link to="/manager/bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-flame-dark hover:underline">
            {t('View all bookings')} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-cream text-night/60">
              <tr>
                <th className={thCls}>{t('Customer')}</th>
                <th className={thCls}>{t('Court')}</th>
                <th className={thCls}>{t('Time')}</th>
                <th className={thCls}>{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {preview.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-night/50">{t('No bookings today.')}</td>
                </tr>
              )}
              {preview.map((b) => (
                <tr key={b.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium text-night">{b.customer}</td>
                  <td className="px-4 py-3 text-night/70">{t('court.n', { n: b.court })}</td>
                  <td className="px-4 py-3 text-night/70">{pad(b.hour)} - {pad(b.hour + 1)}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-night">{t('Courts today')}</h2>
          <Link to="/manager/courts" className="inline-flex items-center gap-1 text-sm font-semibold text-flame-dark hover:underline">
            {t('Manage courts')} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {courts.map((c) => {
            const list = confirmedFor(bookings, c.id, today)
            return (
              <div key={c.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-semibold text-night">{t('court.n', { n: c.id })}</p>
                    <p className="text-xs text-night/50">{t(courtLabel(c))}</p>
                  </div>
                  <StatusBadge status={liveState(list)} />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full rounded-full bg-flame" style={{ width: `${(list.length / SLOTS_PER_COURT) * 100}%` }} />
                </div>
                <p className="mt-2 text-xs text-night/60">{t('{a} of {b} hours booked today', { a: list.length, b: SLOTS_PER_COURT })}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}