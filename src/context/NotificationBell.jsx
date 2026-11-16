import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { useNotifications } from '../context/NotificationContext'
import { describe, timeAgo } from '../utils/notificationText'

export default function NotificationBell() {
  const { items, unread, markRead, markAll } = useNotifications()
  const { t, locale } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t('notif.open')}
        aria-expanded={open}
        className="relative rounded-full p-2 text-night/70 transition hover:bg-black/5 hover:text-flame"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[11px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-3 top-16 z-50 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
            <h2 className="font-display text-base font-semibold text-night">{t('notif.title')}</h2>
            {unread > 0 && (
              <button onClick={markAll} className="text-xs font-semibold text-flame-dark hover:underline">
                {t('notif.markAll')}
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-night/50">{t('notif.empty')}</p>
          ) : (
            <ul className="max-h-96 divide-y divide-black/5 overflow-y-auto">
              {items.map((n) => {
                const { title, message } = describe(n, t, locale)
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => markRead(n.id)}
                      className={`block w-full px-4 py-3 text-left transition hover:bg-cream ${n.read ? '' : 'bg-flame/5'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-night">{title}</p>
                        {!n.read && (
                          <span className="shrink-0 rounded-full bg-ball px-2 py-0.5 text-[10px] font-bold uppercase text-night">
                            {t('notif.new')}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-night/70">{message}</p>
                      <p className="mt-1 text-xs text-night/40">{timeAgo(n.createdAt, t)}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}