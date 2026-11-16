import { formatLong, pad } from './dates'

// The backend sends a type + data. The text is built here, so it follows the chosen language.
export function describe(n, t, locale) {
  const d = n.data || {}
  const vars = {
    court: d.court ? t('court.n', { n: d.court }) : '',
    date: d.date ? formatLong(d.date, locale) : '',
    time: d.hour != null ? `${pad(d.hour)} - ${pad(d.hour + 1)}` : '',
    reason: d.reason ? t(`reason.${d.reason}`) : '',
  }
  return {
    title: t(`notif.${n.type}.title`),
    message: t(`notif.${n.type}.message`, vars),
  }
}

export function timeAgo(iso, t) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 1) return t('notif.justNow')
  if (mins < 60) return t('notif.minAgo', { n: mins })
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return t('notif.hAgo', { n: hrs })
  return t('notif.dAgo', { n: Math.round(hrs / 24) })
}