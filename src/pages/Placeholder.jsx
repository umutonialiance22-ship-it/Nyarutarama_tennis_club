import { Link } from 'react-router-dom'

export default function Placeholder({ title }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-night px-6 text-center text-white">
      <h1 className="font-display text-4xl font-bold text-flame">{title}</h1>
      <p className="text-white/70">This page will be developed in a later phase.</p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-ball px-6 py-3 font-semibold text-night transition hover:brightness-95"
      >
        Back to Home
      </Link>
    </div>
  )
}