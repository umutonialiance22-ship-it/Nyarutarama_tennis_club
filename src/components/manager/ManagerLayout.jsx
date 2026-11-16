import { useCallback, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { club } from '../../data/clubData'
import { sampleBookings, sampleCoaches, sampleCustomers } from '../../data/managerSampleData'
import { formatShort, pad } from '../../utils/dates'
import Icon from '../../components/manager/Icon'
import LanguageSwitcher from '../../components/LanguageSwitcher'

const NAV = [
  { label: 'Dashboard', to: '/manager', icon: 'dashboard', end: true },
  { label: 'Bookings', to: '/manager/bookings', icon: 'bookings' },
  { label: 'Courts', to: '/manager/courts', icon: 'courts' },
  { label: 'Customers', to: '/manager/customers', icon: 'customers' },
  { label: 'Coaches', to: '/manager/coaches', icon: 'coaches' },
]

export default function ManagerLayout() {
  const { user, logout } = useAuth()
  const { t, locale } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // Sample data lives here so every section shares it
  const [bookings, setBookings] = useState(sampleBookings)
  const [customers, setCustomers] = useState(sampleCustomers)
  const [coaches, setCoaches] = useState(sampleCoaches)

  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const notify = useCallback((type, message) => {
    setToast({ type, message })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 3500)
  }, [])

  // Manager books on behalf of a customer
  const addBooking = useCallback(
    ({ customer, court, date, hour }) => {
      setBookings((prev) => [
        ...prev,
        { id: Date.now(), customer: customer.name, court, date, hour, status: 'Confirmed' },
      ])
      notify(
        'success',
        t('Booking created for {name}: {court}, {date}, {time} (demo: nothing was sent).', {
          name: customer.name,
          court: t('court.n', { n: court }),
          date: formatShort(date, locale),
          time: `${pad(hour)} - ${pad(hour + 1)}`,
        })
      )
    },
    [notify, t, locale]
  )

  const firstName = String(user?.full_name || user?.fullName || user?.name || 'Rudashirikaka').split(' ')[0]

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      /* session is cleared on our side either way */
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-cream">
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-night text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1">
            <img src="/logo.png" alt="Club logo" className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold leading-tight">{club.name}</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ball">{t('Staff area')}</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3" aria-label={t('Manager navigation')}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl border-l-4 px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'border-ball bg-white/10 text-white'
                    : 'border-transparent text-white/65 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon name={item.icon} />
              {t(item.label)}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <LanguageSwitcher className="!bg-white/10 [&_button:not([aria-pressed=true])]:!text-white/70" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/5 hover:text-white"
          >
            <Icon name="logout" />
            {t('Logout')}
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-black/5 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} aria-label={t('Open menu')} className="rounded-md p-1 text-night">
            <Icon name="menu" className="h-6 w-6" />
          </button>
          <span className="font-display text-sm font-semibold text-night">{t('Manager Dashboard')}</span>
        </header>

        <main className="px-4 py-6 sm:px-8 lg:py-8">
          <p className="mb-5 inline-block rounded-full bg-ball/40 px-3 py-1 text-xs font-medium text-night">
            {t('Preview with sample data. Nothing here is saved.')}
          </p>
          <Outlet
            context={{ bookings, setBookings, addBooking, customers, setCustomers, coaches, setCoaches, notify, firstName }}
          />
        </main>
      </div>

      {toast && (
        <div
          role="status"
          className={`fixed right-4 top-4 z-[90] max-w-sm rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}