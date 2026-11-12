export default function TextField({ label, id, error, hint, endAdornment, ...props }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-night">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-night outline-none transition placeholder:text-night/35 focus:ring-2 ${
            endAdornment ? 'pr-12' : ''
          } ${
            error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-black/10 focus:border-flame focus:ring-flame/25'
          }`}
          {...props}
        />
        {endAdornment && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endAdornment}</div>}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-night/50">
          {hint}
        </p>
      ) : null}
    </div>
  )
}