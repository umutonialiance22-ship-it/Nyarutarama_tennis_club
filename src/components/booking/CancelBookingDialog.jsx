import { useEffect, useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { formatLong, pad } from '../../utils/dates'
import Notice from '../../auth/components/Notice'

export default function CancelBookingDialog({ booking, date, courtName, onClose, onConfirm }) {
  const { t, locale } = useLang()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => !submitting && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-title"
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="cancel-title" className="font-display text-2xl font-semibold text-night">
          {t('dialog.cancelTitle')}
        </h2>
        <dl className="mt-4 space-y-2 rounded-2xl bg-cream p-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-night/60">{t('dialog.court')}</dt>
            <dd className="font-semibold text-night">{courtName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-night/60">{t('dialog.date')}</dt>
            <dd className="text-right font-semibold capitalize text-night">{formatLong(date, locale)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-night/60">{t('dialog.time')}</dt>
            <dd className="font-semibold text-night">
              {pad(booking.hour)} - {pad(booking.hour + 1)}
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
            {t('dialog.keep')}
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
            {submitting ? t('dialog.cancelling') : t('dialog.cancelBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}