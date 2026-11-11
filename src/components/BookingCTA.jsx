import { Link } from 'react-router-dom'

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-flame py-20">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ball/30 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">Ready to Play?</h2>
        <p className="mt-4 text-white/90">
          Reserve your court in a few clicks and spend more time doing what you love.
        </p>
        <Link
          to="/book"
          className="mt-8 inline-block rounded-full bg-ball px-9 py-4 font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Book a Court
        </Link>
      </div>
    </section>
  )
}