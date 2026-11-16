import { bookingConfig } from '../data/clubData'

export const courtLabel = (court) => (court.vip ? 'VIP Court' : 'Regular Court')

export const SLOTS_PER_COURT = bookingConfig.closeHour - bookingConfig.openHour
export const HOURS = Array.from({ length: SLOTS_PER_COURT }, (_, i) => bookingConfig.openHour + i)

export const confirmedFor = (bookings, courtId, date) =>
  bookings.filter((b) => b.court === courtId && b.date === date && b.status === 'Confirmed')

// Live state for today's list of confirmed bookings
export function liveState(list) {
  const h = new Date().getHours()
  if (h < bookingConfig.openHour || h >= bookingConfig.closeHour) return 'Closed now'
  return list.some((b) => b.hour === h) ? 'In use now' : 'Available now'
}