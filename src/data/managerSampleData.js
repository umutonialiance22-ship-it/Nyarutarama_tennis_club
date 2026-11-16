import { addDays, toISODate } from '../utils/dates'

const today = toISODate(new Date())
const yesterday = addDays(today, -1)
const tomorrow = addDays(today, 1)

export const sampleCustomers = [
  { id: 1, name: 'Grace Uwase', email: 'grace.uwase@example.com', phone: '0780 000 101', membership: 'Regular', status: 'Active' },
  { id: 2, name: 'Eric Mugisha', email: 'eric.mugisha@example.com', phone: '0780 000 102', membership: 'Regular', status: 'Active' },
  { id: 3, name: 'Patrick Nshuti', email: 'patrick.nshuti@example.com', phone: '0780 000 103', membership: 'VIP', status: 'Active' },
  { id: 4, name: 'Aline Ingabire', email: 'aline.ingabire@example.com', phone: '0780 000 104', membership: 'Regular', status: 'Active' },
  { id: 5, name: 'Diane Mukamana', email: 'diane.mukamana@example.com', phone: '0780 000 105', membership: 'VIP', status: 'Active' },
  { id: 6, name: 'Jean Claude Habimana', email: 'jc.habimana@example.com', phone: '0780 000 106', membership: 'VIP', status: 'Active' },
  { id: 7, name: 'Sandrine Uwimana', email: 'sandrine.uwimana@example.com', phone: '0780 000 107', membership: 'Regular', status: 'Active' },
  { id: 8, name: 'Olivier Niyonzima', email: 'olivier.niyonzima@example.com', phone: '0780 000 108', membership: 'Regular', status: 'Inactive' },
  { id: 9, name: 'Claudine Mutesi', email: 'claudine.mutesi@example.com', phone: '0780 000 109', membership: 'Regular', status: 'Active' },
  { id: 10, name: 'David Kagabo', email: 'david.kagabo@example.com', phone: '0780 000 110', membership: 'Regular', status: 'Active' },
]

export const sampleBookings = [
  { id: 1, customer: 'Grace Uwase', court: 2, date: today, hour: 7, status: 'Confirmed' },
  { id: 2, customer: 'Eric Mugisha', court: 3, date: today, hour: 8, status: 'Confirmed' },
  { id: 3, customer: 'Patrick Nshuti', court: 1, date: today, hour: 9, status: 'Confirmed' },
  { id: 4, customer: 'Aline Ingabire', court: 2, date: today, hour: 10, status: 'Confirmed' },
  { id: 5, customer: 'Diane Mukamana', court: 3, date: today, hour: 16, status: 'Confirmed' },
  { id: 6, customer: 'Jean Claude Habimana', court: 1, date: today, hour: 17, status: 'Confirmed' },
  { id: 7, customer: 'Sandrine Uwimana', court: 2, date: today, hour: 18, status: 'Confirmed' },
  { id: 8, customer: 'Olivier Niyonzima', court: 3, date: today, hour: 19, status: 'Cancelled' },
  { id: 9, customer: 'Claudine Mutesi', court: 2, date: today, hour: 19, status: 'Confirmed' },
  { id: 10, customer: 'David Kagabo', court: 2, date: yesterday, hour: 8, status: 'Confirmed' },
  { id: 11, customer: 'Grace Uwase', court: 3, date: yesterday, hour: 17, status: 'Confirmed' },
  { id: 12, customer: 'Eric Mugisha', court: 2, date: tomorrow, hour: 8, status: 'Confirmed' },
  { id: 13, customer: 'Patrick Nshuti', court: 1, date: tomorrow, hour: 10, status: 'Confirmed' },
  { id: 14, customer: 'Aline Ingabire', court: 3, date: tomorrow, hour: 18, status: 'Cancelled' },
]

export const sampleCoaches = [
  { id: 1, name: 'MUHIRE Joshua', email: '', phone: '0780 752 398', status: 'Active' },
  { id: 2, name: 'Alphonse HABIMANA', email: '', phone: '0788 826 240', status: 'Active' },
  { id: 3, name: 'Emmanuel MUGENZI', email: '', phone: '0789 221 677', status: 'Active' },
]