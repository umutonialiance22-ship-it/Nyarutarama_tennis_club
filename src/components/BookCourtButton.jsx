import useBookCourt from '../hooks/useBookCourt'
import { useLang } from '../context/LanguageContext'

export default function BookCourtButton({ className = '', children, onClick, ...rest }) {
  const bookCourt = useBookCourt()
  const { t } = useLang()

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
      {children ?? t('nav.bookCourt')}
    </button>
  )
}