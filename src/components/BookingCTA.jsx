import BookCourtButton from './BookCourtButton'

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-flame py-10">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ball/30 blur-3xl" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Ready to Play?</h2>
          <p className="mt-1 text-sm text-white/90">
            Reserve your court in a few clicks and spend more time doing what you love.
          </p>
        </div>
        <BookCourtButton className="shrink-0 rounded-full bg-ball px-6 py-2.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:shadow-xl" />
      </div>
    </section>
  )
}