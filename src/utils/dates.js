export function toISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function fromISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(iso, n) {
  const d = fromISODate(iso)
  d.setDate(d.getDate() + n)
  return toISODate(d)
}

export function formatLong(iso) {
  return fromISODate(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const pad = (hour) => `${String(hour).padStart(2, '0')}:00`

// A slot is "past" once its start time has passed
export function isPastSlot(iso, hour) {
  const slot = fromISODate(iso)
  slot.setHours(hour, 0, 0, 0)
  return slot <= new Date()
}