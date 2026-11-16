import { request } from './authService'
import { toISODate } from '../utils/dates'

// Same DEV-only preview switch as before (never active in production builds)
const DEMO = import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE === 'true'

// Adjust to your Django URLs
const ENDPOINTS = {
  list: '/api/notifications/',
  markRead: (id) => `/api/notifications/${id}/read/`,
  markAll: '/api/notifications/mark-all-read/',
}

/*
  Expected GET response (a list):
  [{ "id": 5, "type": "booking_cancelled_by_staff", "is_read": false,
     "created_at": "2026-11-14T10:00:00Z",
     "data": { "court": 2, "date": "2026-11-15", "hour": 10, "reason": "maintenance" } }]
  Types: booking_confirmed, booking_cancelled, booking_cancelled_by_staff, vip_assigned, vip_removed
  Django creates these (and sends the matching email) when the event happens.
*/
function normalize(data) {
  const list = Array.isArray(data) ? data : data?.results || []
  return list.map((n) => ({
    id: n.id,
    type: n.type,
    read: Boolean(n.is_read),
    createdAt: n.created_at,
    data: n.data || {},
  }))
}

/* ------- demo data (preview only) ------- */
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const ago = (min) => new Date(Date.now() - min * 60000).toISOString()
const today = toISODate(new Date())

let demoList = [
  { id: 'n2', type: 'booking_cancelled_by_staff', read: false, createdAt: ago(25), data: { court: 2, date: today, hour: 10, reason: 'maintenance' } },
  { id: 'n1', type: 'booking_confirmed', read: true, createdAt: ago(180), data: { court: 2, date: today, hour: 10 } },
]

export function demoAddNotification({ type, data }) {
  demoList = [{ id: `n${Date.now()}`, type, read: false, createdAt: new Date().toISOString(), data }, ...demoList]
}

export async function getNotifications() {
  if (DEMO) {
    await wait(150)
    return [...demoList]
  }
  return normalize(await request(ENDPOINTS.list))
}

export async function markNotificationRead(id) {
  if (DEMO) {
    demoList = demoList.map((n) => (n.id === id ? { ...n, read: true } : n))
    return
  }
  await request(ENDPOINTS.markRead(id), { method: 'POST' })
}

export async function markAllNotificationsRead() {
  if (DEMO) {
    demoList = demoList.map((n) => ({ ...n, read: true }))
    return
  }
  await request(ENDPOINTS.markAll, { method: 'POST' })
}