import useBookCourt from '../hooks/useBookCourt'

export default function BookCourtButton({ className = '', children = 'Book a Court', onClick, ...rest }) {
  const bookCourt = useBookCourt()

  return (
    <button
      type="button"
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        bookCourt()
      }}
      className={className}
    >
      {children}
    </button>
  )
}