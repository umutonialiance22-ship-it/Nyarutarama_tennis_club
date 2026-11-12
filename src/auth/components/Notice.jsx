const STYLES = {
  error: 'bg-red-50 text-red-700 ring-red-200',
  success: 'bg-green-50 text-green-800 ring-green-200',
  info: 'bg-ball/25 text-night ring-ball',
}

export default function Notice({ type = 'info', children }) {
  if (!children) return null
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`rounded-xl px-4 py-3 text-sm ring-1 ${STYLES[type]}`}
    >
      {children}
    </div>
  )
}