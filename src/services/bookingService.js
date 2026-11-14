import { request, ApiError } from './authService'

// DEV-ONLY preview: set VITE_DEMO_MODE=true in .env to see sample bookings without a backend.
// It can never be on in a production build.
const DEMO = import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE === 'true'
export const isDemoMode = DEMO

// Adjust to your Django URLs
const ENDPOINTS = {
  availability: '/api/bookings/availability/', // GET ?date=YYYY-MM-DD
  create: '/api/bookings/', // POST
}

/*
  Expected GET response (a list), one item per booked hour:
  [{ "id": 12, "court": 2, "start_time": "08:00", "is_mine": false }, ...]
  The backend decides "is_mine" from the logged-in user and should NOT send other people's names.
*/
function normalize(data) {
  const list = Array.isArray(data) ? data : data?.results || []
  return list.map((b) => ({
    id: b.id,
    court: Number(b.court),
    hour: parseInt(String(b.start_time).slice(0, 2), 10),
    mine: Boolean(b.is_mine),
  }))
}

/* ------- demo data (preview only) ------- */
const demoStore = {}
function demoDay(date) {
  if (!demoStore[date]) {
    demoStore[date] = [
      { id: `${date}-a`, court: 2, hour: 8, mine: false },
      { id: `${date}-b`, court: 3, hour: 10, mine: false },
      { id: `${date}-c`, court: 1, hour: 17, mine: false },
      { id: `${date}-d`, court: 2, hour: 17, mine: true },
    ]
  }
  return demoStore[date]
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getBookings(date) {
  if (DEMO) {
    await wait(250)
    return [...demoDay(date)]
  }
  const data = await request(`${ENDPOINTS.availability}?date=${encodeURIComponent(date)}`)
  return normalize(data)
}

// Django must validate everything again: login, opening hours, past times, VIP rule, double booking.
export async function createBooking({ court, date, hour }) {
  if (DEMO) {
    await wait(400)
    const day = demoDay(date)
    if (day.some((b) => b.court === court && b.hour === hour)) {
      throw new ApiError('That slot was just taken. Please choose another time.', 409)
    }
    day.push({ id: `${date}-${court}-${hour}`, court, hour, mine: true })
    return
  }
  await request(ENDPOINTS.create, {
    method: 'POST',
    body: { court, date, start_time: `${String(hour).padStart(2, '0')}:00` },
  })
}