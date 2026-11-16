import { useEffect } from 'react'
import { useLang } from '../../context/LanguageContext'

export default function ContextMenu({ x, y, onCancelBooking, onClose }) {
  const { t } = useLang()

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('click', onClose)
    window.addEventListener('resize', onClose)
    window.addEventListener('scroll', onClose, true)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('click', onClose)
      window.removeEventListener('resize', onClose)
      window.removeEventListener('scroll', onClose, true)
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const left = Math.min(x, window.innerWidth - 220)
  const top = Math.min(y, window.innerHeight - 70)

  return (
    <div role="menu" style={{ left, top }} className="fixed z-[70] w-52 rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/10">
      <button
        role="menuitem"
        onClick={onCancelBooking}
        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
      >
        {t('booking.cancelMenu')}
      </button>
    </div>
  )
}