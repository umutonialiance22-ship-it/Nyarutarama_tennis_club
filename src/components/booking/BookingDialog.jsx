import { useEffect, useState } from 'react'
import { club } from '../../data/clubData'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { formatLong, pad } from '../../utils/dates'
import { canBookVip } from '../../utils/role'
import Notice from '../../auth/components/Notice'
import { errorText } from '../../utils/errors'

export default function BookingDialog({ slot, date, onClose, onConfirm }) {
  const { user } = useAuth()
  const { t, locale } = useLang()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { court, hour } = slot

  const label = t('court.n', { n: court.id })
  const dateText = formatLong(date, locale)
  const mustCall = court.vip && !canBookVip(user) // VIP court and this person is not VIP

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !submitting && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, submitting])

  const handleConfirm = async () => {
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      await onConfirm()
    } catch (err) {
      setError(errorText(err, t))
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => !submitting && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {mustCall ? (
          <>
            <h2 id="booking-title" className="font-display text-2xl font-semibold text-night">
              {t('dialog.vipTitle', { court: label })}
            </h2>
            <p className="mt-3 text-sm text-night/70">
              {t('dialog.vipText', { time: pad(hour), date: dateText })}
            </p>
            <a
              href={club.contact.phoneHref}
              className="mt-5 block rounded-full bg-night px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-flame"
            >
               {t('court.callManager')}
            </a>
            <p className="mt-2 text-center text-xs text-night/50">
              {club.contact.name} · {club.contact.phoneDisplay}
            </p>
            <button onClick={onClose} className="mt-4 block w-full text-center text-sm text-night/60 hover:text-flame">
              {t('dialog.close')}
            </button>
          </>
        ) : (
          <>
            <h2 id="booking-title" className="font-display text-2xl font-semibold text-night">
              {t('dialog.confirmTitle')}
            </h2>
            <dl className="mt-4 space-y-2 rounded-2xl bg-cream p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-night/60">{t('dialog.court')}</dt>
                <dd className="font-semibold text-night">{label}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-night/60">{t('dialog.date')}</dt>
                <dd className="text-right font-semibold capitalize text-night">{dateText}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-night/60">{t('dialog.time')}</dt>
                <dd className="font-semibold text-night">
                  {pad(hour)} - {pad(hour + 1)}
                </dd>
              </div>
            </dl>

            {error && (
              <div className="mt-4">
                <Notice type="error">{error}</Notice>
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={onClose}
                disabled={submitting}
                className="flex-1 rounded-full border border-night/20 py-3 text-sm font-semibold text-night transition hover:border-flame hover:text-flame disabled:opacity-50"
              >
                {t('dialog.cancel')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ball py-3 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40 disabled:opacity-60"
              >
                {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />}
                {submitting ? t('dialog.booking') : t('dialog.confirm')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}