export default function ImagePlaceholder({ label = 'Photo placeholder', className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-flame via-flame-dark to-night text-white/80 ${className}`}
      role="img"
      aria-label={label}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M21 16l-5-5-8 9" />
      </svg>
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  )
}