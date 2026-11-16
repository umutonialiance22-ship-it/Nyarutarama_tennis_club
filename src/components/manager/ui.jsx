import { useLang } from '../../context/LanguageContext'
import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon'

export const inputCls =
  'w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-night outline-none transition focus:border-flame focus:ring-2 focus:ring-flame/25'

export const thCls = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider'

/* ---------- Modal + confirm ---------- */
export function Modal ({ title, onClose, children, size = 'max-w-md' }) {const { t } = useLang()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[90vh] w-full overflow-y-auto ${size} rounded-3xl bg-white p-6 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-night">{title}</h2>
          <button onClick={onClose} aria-label={t('Close')} className="text-night/40 transition hover:text-flame">
            <Icon name="close" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export function ConfirmDialog({ title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }) {
  const { t } = useLang()
  return (
    <Modal title={title} onClose={onCancel} size="max-w-sm">
      <p className="text-sm text-night/70">{message}</p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-full border border-night/20 py-2.5 text-sm font-semibold text-night transition hover:border-flame hover:text-flame"
        >
          {t('Go back')}
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 rounded-full py-2.5 text-sm font-semibold text-white transition ${
            danger ? 'bg-red-600 hover:bg-red-700' : 'bg-flame hover:bg-flame-dark'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

/* ---------- Badges ---------- */
const BADGES = {
  Confirmed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-700',
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-black/10 text-night/60',
  Invited: 'bg-amber-100 text-amber-800',
  VIP: 'bg-ball text-night',
  Regular: 'bg-black/5 text-night/70',
  'In use now': 'bg-red-100 text-red-700',
  'Available now': 'bg-green-100 text-green-800',
  'Closed now': 'bg-black/10 text-night/60',
}

export function StatusBadge({ status }) {
  const { t } = useLang()
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${BADGES[status] || BADGES.Regular}`}>
      {t(status)}
    </span>
  )
}

/* ---------- Page header + search ---------- */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-night sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-night/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function SearchBox({ value, onChange, placeholder, label }) {
  return (
    <div className="relative">
      <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-night/40" />
      <input
        type="search"
        aria-label={label || placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputCls} pl-9`}
      />
    </div>
  )
}

/* ---------- Sorting ---------- */
export function useSort(rows, initialKey, initialDir = 'asc', getters = {}) {
  const [sort, setSort] = useState({ key: initialKey, dir: initialDir })

  const sorted = useMemo(() => {
    const get = (r) => (getters[sort.key] ? getters[sort.key](r) : r[sort.key])
    return [...rows].sort((a, b) => {
      const x = get(a)
      const y = get(b)
      const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))
      return sort.dir === 'asc' ? c : -c
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, sort])

  const toggle = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  return { sorted, sort, toggle }
}

export function SortHeader({ label, k, sort, toggle }) {
  const active = sort.key === k
  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      className={thCls}
    >
      <button type="button" onClick={() => toggle(k)} className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-flame">
        {label}
        <span className={`text-[10px] ${active ? 'text-flame' : 'text-night/25'}`}>
          {active ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  )
}