import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { DEMO_ENABLED } from '../config'

const ROLES = [
  { id: 'visitor', key: 'preview.visitor', to: '/' },
  { id: 'customer', key: 'preview.customer', to: '/courts' },
  { id: 'vip', key: 'preview.vip', to: '/courts' },
  { id: 'manager', key: 'preview.manager', to: '/manager' },
]

export default function PreviewBar() {
  const { previewRole, setPreviewRole } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()

  if (!DEMO_ENABLED) return null

  return (
    <div className="fixed inset-x-2 bottom-2 z-[95] flex flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-night/95 px-3 py-2 text-xs text-white shadow-2xl ring-1 ring-white/10 backdrop-blur sm:inset-x-auto sm:right-3 sm:max-w-md">
      <span className="w-full text-center font-semibold text-ball">{t('preview.title')}</span>
      <span className="text-white/50">{t('preview.view')}:</span>
      {ROLES.map((r) => (
        <button
          key={r.id}
          aria-pressed={previewRole === r.id}
          onClick={() => {
            setPreviewRole(r.id)
            navigate(r.to)
          }}
          className={`rounded-full px-2.5 py-1 font-semibold transition ${
            previewRole === r.id ? 'bg-flame text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          {t(r.key)}
        </button>
      ))}
      <button
        onClick={() => window.location.reload()}
        className="rounded-full border border-white/20 px-2.5 py-1 font-semibold text-white/80 transition hover:border-flame hover:text-flame"
      >
        {t('preview.reset')}
      </button>
    </div>
  )
}