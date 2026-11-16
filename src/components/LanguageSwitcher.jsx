import { useLang } from '../context/LanguageContext'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLang()

  return (
    <div role="group" aria-label="Language" className={`inline-flex rounded-full bg-black/5 p-0.5 text-xs font-semibold ${className}`}>
      {['en', 'fr'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            lang === l ? 'bg-flame text-white' : 'text-night/60 hover:text-night'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}