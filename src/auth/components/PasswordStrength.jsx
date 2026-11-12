import { passwordChecks, passwordStrength } from '../../utils/validation'

const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const COLORS = ['', 'bg-red-500', 'bg-amber-500', 'bg-lime-500', 'bg-green-600']

export default function PasswordStrength({ password }) {
  const level = passwordStrength(password)

  return (
    <div className="mt-3 rounded-xl bg-cream p-3" aria-live="polite">
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-1.5 rounded-full ${i <= level ? COLORS[level] : 'bg-black/10'}`} />
          ))}
        </div>
        <span className="w-12 text-right text-xs font-semibold text-night/70">{LABELS[level]}</span>
      </div>
      <ul className="mt-3 space-y-1">
        {passwordChecks(password).map((c) => (
          <li key={c.label} className={`flex items-center gap-2 text-xs ${c.ok ? 'text-green-700' : 'text-night/50'}`}>
            <span aria-hidden>{c.ok ? '✓' : '○'}</span>
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  )
}