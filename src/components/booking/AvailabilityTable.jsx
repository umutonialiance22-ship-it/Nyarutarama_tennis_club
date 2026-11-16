import { useLang } from '../../context/LanguageContext'
import { isPastSlot, pad } from '../../utils/dates'

function Cell({ booking, past, disabled, onSelect, onCancel, onMenu, t }) {
  const base = 'flex h-12 w-full items-center justify-center text-[11px] font-semibold sm:h-14 sm:text-xs'

  if (booking?.mine) {
    if (past) return <div className={`${base} bg-green-500/60 text-white`}>{t('booking.yours')}</div>
    return (
      <button
        type="button"
        disabled={disabled}
        title={t('booking.cancelHint')}
        onClick={() => onCancel(booking)}
        onContextMenu={(e) => {
          e.preventDefault()
          onMenu(booking, e.clientX, e.clientY)
        }}
        className={`${base} bg-green-500 text-white transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-night disabled:cursor-not-allowed`}
      >
        {t('booking.yours')}
      </button>
    )
  }
  if (booking) return <div className={`${base} bg-red-500 text-white`}>{t('booking.booked')}</div>
  if (past) return <div className={`${base} bg-black/5 text-night/25`}>-</div>

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`${base} bg-white font-medium text-night/40 transition hover:bg-ball/50 hover:text-night focus-visible:bg-ball/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:hover:bg-white`}
    >
      {t('booking.free')}
    </button>
  )
}

export default function AvailabilityTable({ date, hours, courts, bookings, disabled, onSelect, onCancel, onMenu }) {
  const { t } = useLang()
  const lookup = new Map(bookings.map((b) => [`${b.court}-${b.hour}`, b]))

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] table-fixed border-collapse">
          <thead>
            <tr className="bg-flame text-white">
              <th scope="col" className="w-16 px-2 py-3 text-left text-xs font-semibold sm:w-20">
                {t('booking.time')}
              </th>
              {courts.map((c) => (
                <th key={c.id} scope="col" className="px-2 py-3 text-center text-sm font-semibold">
                  {t('court.n', { n: c.id })}
                  {c.vip && (
                    <span className="ml-1.5 rounded-full bg-ball px-2 py-0.5 text-[10px] font-bold text-night">VIP</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h} className="border-t border-black/5">
                <th scope="row" className="bg-cream px-2 text-left text-xs font-semibold text-night sm:text-sm">
                  {pad(h)}
                </th>
                {courts.map((c) => (
                  <td key={c.id} className="border-l border-black/5 p-0">
                    <Cell
                      booking={lookup.get(`${c.id}-${h}`)}
                      past={isPastSlot(date, h)}
                      disabled={disabled}
                      onSelect={() => onSelect(c, h)}
                      onCancel={onCancel}
                      onMenu={onMenu}
                      t={t}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}