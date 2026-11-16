export default function Icon({ name, className = 'h-4 w-4' }) {
  const common = `shrink-0 ${className}`

  const icons = {
    dashboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 13.5h7V4H4v9.5Zm9 6.5h7V11h-7v9Zm0-15.5V4h7v4.5h-7Z" />
      </svg>
    ),
    bookings: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M7 4.5h10a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" />
      </svg>
    ),
    courts: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 10h17M9 5v14M15 5v14" />
      </svg>
    ),
    customers: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M16.5 18.5a4.5 4.5 0 0 0-9 0" />
        <circle cx="12" cy="8.5" r="3.5" />
        <path d="M18 18.5a4 4 0 0 0-2.5-3.7M6 18.5a4 4 0 0 1 2.5-3.7" />
      </svg>
    ),
    coaches: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm-6 16a6 6 0 1 1 12 0" />
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M10 17v2.5A1.5 1.5 0 0 0 11.5 21h7A1.5 1.5 0 0 0 20 19.5v-15A1.5 1.5 0 0 0 18.5 3h-7A1.5 1.5 0 0 0 10 4.5V7" />
        <path d="M15 12H4m0 0 3-3m-3 3 3 3" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M5 12h12m0 0-4-4m4 4-4 4" />
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <circle cx="11" cy="11" r="5.5" />
        <path d="m16 16 4 4" />
      </svg>
    ),
  }

  return icons[name] || null
}
